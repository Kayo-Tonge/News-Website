export default function CategorySection({ label, articles = [] }) {
    const lead = articles.find(article => article.image);
    if (!lead) return null;

    const rest = articles.filter(article => article.id !== lead.id).slice(0, 3);

    return (
        <section className="category-section">
            <h2 className="section-label">{label}</h2>
            <a href={lead.url} className="category-lead">
                <img src={lead.image} alt={lead.title} />
            </a>
            <article className="category-item">
                <a href={lead.url}><h3 className="category-title">{lead.title}</h3></a>
            </article>
            {rest.map(article => (
                <article key={article.id} className="category-item">
                    <a href={article.url}><h3 className="category-title">{article.title}</h3></a>
                </article>
            ))}
        </section>
    );
}