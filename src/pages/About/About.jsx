import { Link } from "react-router-dom";
import Icon from "../../components/Icon";
import aboutImage from "../../assets/images/about-image.jpg";
export default function About() {
  return (
    <main id="main-content" className="container standard-page">
      <section className="about-layout">
        <div>
          <span className="eyebrow">BİZİM HEKAYƏMİZ</span>
          <h1>
            Kitablara sevgi.
            <br />
            Kəşfə açıq bir dünya.
          </h1>
          <p className="lead">
            Dolphin hər yaşda yeni bir şey kəşf etməyin sevincinə inanır.
          </p>
          <p>
            Biz oxumağı gündəlik həyatın sevilən bir hissəsinə çevirmək
            istəyirik. Dünya klassiklərindən müasir hekayələrə, şəxsi inkişafdan
            uşaq kitablarına qədər hər rəfdə yeni bir başlanğıc var.
          </p>
          <p>
            Balaca kəşfçiləri də unutmuruq. Yaradıcı və öyrədici
            oyuncaqlarımızla onların xəyal gücünə yeni yollar açırıq.
          </p>
          <Link className="button button-primary" to="/books">
            Kolleksiyamıza bax <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="about-image">
          <img src={aboutImage} alt="Kitablar və kəşf dünyası" />
          <span>
            Bir kitab.
            <br />
            <em>Min yeni dünya.</em>
          </span>
        </div>
      </section>
      <div className="about-values">
        {[
          [
            "book",
            "Hekayələr birləşdirir",
            "Hər zövq və yaş üçün yeni bir kitab.",
          ],
          [
            "sparkles",
            "Maraq böyüdür",
            "Öyrənmək və kəşf etmək üçün yeni səbəblər.",
          ],
          [
            "heart",
            "Sevinc paylaşılır",
            "Özün və sevdiklərin üçün düşünülmüş seçimlər.",
          ],
        ].map(([icon, title, text]) => (
          <div key={icon}>
            <Icon name={icon} size={28} />
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
