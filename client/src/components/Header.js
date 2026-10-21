import { Link } from "react-router-dom";

const Header = () => (
    <header className="site-header">
        <Link className="brand" to="/" aria-label="דף הבית של ספריית בין הדפים">
            <span className="brand-mark" aria-hidden="true">ב</span>
            <span className="brand-copy">
                <strong>בין הדפים</strong>
                <span>הספרייה הקהילתית</span>
            </span>
        </Link>
        <span className="header-note">הספרייה פתוחה א׳–ה׳</span>
    </header>
);

export default Header;
