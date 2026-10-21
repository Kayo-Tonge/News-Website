import { Link } from "react-router-dom";

const categories = [
    "general", "world", "nation", "business", "technology",
    "entertainment", "sports", "science", "health"
];

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <p className="footer-brand">NewsHub</p>
                <p className="footer-blurb">
                    Top headlines from around the world, in one place.
                </p>

                <nav className="footer-nav" aria-label="Categories">
                    <h2 className="footer-heading">Sections</h2>
                    <ul>
                        {categories.map(category => (
                            <li key={category}>
                                <Link to={`/category/${category}`}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <p className="footer-legal">
                    © 2026 NewsHub. A portfolio project.<br />
                    News data provided by GNews.
                </p>
            </div>
        </footer>
    );
}