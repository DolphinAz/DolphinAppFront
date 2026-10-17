import { Link } from "react-router-dom";
import Icon from "../../components/Icon";
export default function ErrorPage() {
  return (
    <main id="main-content" className="container standard-page">
      <div className="empty-state">
        <span className="error-number">404</span>
        <h1>Bu səhifənin hekayəsi hələ yazılmayıb.</h1>
        <p>
          Axtardığın səhifə tapılmadı. Yeni bir kitab kəşf etməyə nə deyirsən?
        </p>
        <Link className="button button-primary" to="/">
          Ana səhifəyə qayıt <Icon name="arrow" size={18} />
        </Link>
      </div>
    </main>
  );
}
