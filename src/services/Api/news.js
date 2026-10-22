const API_BASE = import.meta.env.VITE_API_BASE;

// ---------- back off after a 429 ----------
const BACKOFF_MS = 60 * 1000; // stop sending requests for 1 minute after a 429
let blockedUntil = 0;

function checkResponse(response) {
  if (response.status === 429) {
    blockedUntil = Date.now() + BACKOFF_MS;
  }
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
}

export async function getNews(category, page) {
  const country =
    category === "general" || category === "world" ? "" : "&country=us";

  const response = await fetch(
    `${API_BASE}/top-headlines?category=${category}&page=${page}&lang=en${country}`,
  );

  checkResponse(response);

  const data = await response.json();
  return data.articles;
}

export async function getSearchResults(query, page) {
  const response = await fetch(
    `${API_BASE}/search?q=${encodeURIComponent(query)}&page=${page}&lang=en`,
  );

  checkResponse(response);

  const data = await response.json();
  return data.articles;
}

// ---------- throttle: one real request at a time, spaced out ----------
const MIN_GAP_MS = 1200;
let lastRequest = Promise.resolve();

function throttled(fn) {
  const run = lastRequest.then(() => {
    if (Date.now() < blockedUntil) {
      throw new Error("Rate limited, backing off");
    }
    return fn();
  });
  lastRequest = run
    .catch(() => {})
    .then(() => new Promise((resolve) => setTimeout(resolve, MIN_GAP_MS)));
  return run;
}

// ---------- cache ----------
const CACHE_MS = 3 * 60 * 60 * 1000; // 3 hours (free plan data is delayed 12 hours anyway)
const inFlight = new Map(); // requests currently running

function cached(key, fetcher) {
  // 1. fresh copy saved on the "shelf"? use it, no network call
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const { data, time } = JSON.parse(raw);
      if (Date.now() - time < CACHE_MS) return Promise.resolve(data);
    }
  } catch {
    /* ignore bad cache */
  }

  // 2. same request already running? share it
  if (inFlight.has(key)) return inFlight.get(key);

  // 3. real request (queued and spaced out), saved only if it succeeds
  const request = throttled(fetcher)
    .then((data) => {
      try {
        localStorage.setItem(key, JSON.stringify({ data, time: Date.now() }));
      } catch {
        /* storage full, ignore */
      }
      return data;
    })
    .finally(() => inFlight.delete(key));

  inFlight.set(key, request);
  return request;
}

export function getNewsCached(category, page) {
  return cached(`news:${category}:${page}`, () => getNews(category, page));
}

export function getSearchCached(query, page) {
  const q = query.trim().toLowerCase();
  return cached(`search:${q}:${page}`, () => getSearchResults(q, page));
}
