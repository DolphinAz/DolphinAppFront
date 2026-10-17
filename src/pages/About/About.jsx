import { Link } from "react-router-dom";
import Icon from "../../components/Icon";
import aboutImage from "../../assets/images/about-image.jpg";
export default function About() {
  return (
    <main id="main-content" className="container standard-page w-[min(1280px,_calc(100%_-_96px))] pt-12 pb-[75px] min-h-[55vh] mx-auto wide:w-[min(1320px,_calc(100%_-_140px))] compact:w-[calc(100%_-_64px)] tablet:w-[calc(100%_-_48px)] mobile:w-[calc(100%_-_36px)] mobile:pt-[30px] mobile:pb-[50px] [&_>_.section-heading]:mb-[38px] mobile:[&_h1]:text-[31px] mobile:[&_h1]:tracking-[-1px] mobile:[&_>_.section-heading]:items-start mobile:[&_>_.section-heading]:flex-col mobile:[&_>_.section-heading]:mb-7 mobile:[&_>_.section-heading]:gap-5 mobile:[&_>_.section-heading_p]:text-[11px] mobile:[&_>_.section-heading_>_.text-link]:text-[11px]">
      <section className="about-layout grid grid-cols-[1fr_1fr] items-center gap-[75px] [&_h1]:text-[39px] [&_h1]:leading-[1.3] [&_h1]:mb-[25px] [&_p]:text-[13px] [&_p]:text-[color:#84969c] [&_p]:mt-[17px] [&_.lead]:text-[17px] [&_.lead]:text-[color:#587780] [&_.button]:mt-[25px] tablet:gap-10 tablet:[&_h1]:text-[33px] mobile:grid-cols-[1fr] mobile:gap-[30px] mobile:[&_h1]:text-[34px] mobile:[&_h1]:mb-[21px] mobile:[&_p]:text-[12px] mobile:[&_.lead]:text-[16px] mobile:[&_.button]:text-[11px] mobile:[&_.button]:mt-[22px]">
        <div>
          <span className="eyebrow block text-[10px] font-bold tracking-[1.7px] text-[color:var(--blue)] mb-3">BİZİM HEKAYƏMİZ</span>
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
          <Link className="button button-primary inline-flex items-center justify-center min-h-[49px] text-[13px] font-[650] leading-[1.6] [transition:background_0.2s,_transform_0.2s] whitespace-normal bg-[color:var(--blue)] text-white py-[13px] px-[23px] border border-[color:transparent] border-solid rounded-[7px] gap-4 [&:hover]:[transform:translateY(-1px)] [&:hover]:bg-[color:var(--blue-dark)]" to="/books">
            Kolleksiyamıza bax <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="about-image h-[450px] relative overflow-hidden bg-[color:#dfeae6] rounded-[12px] [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:[filter:brightness(0.7)] [&_span]:absolute [&_span]:bottom-[35px] [&_span]:left-[35px] [&_span]:text-[30px] [&_span]:text-white [&_span]:leading-[1.4] [&_span]:font-editorial tablet:h-[415px] mobile:h-[300px] mobile:[&_span]:text-[29px] mobile:[&_span]:bottom-[26px] mobile:[&_span]:left-[25px]">
          <img src={aboutImage} alt="Kitablar və kəşf dünyası" />
          <span>
            Bir kitab.
            <br />
            <em>Min yeni dünya.</em>
          </span>
        </div>
      </section>
      <div className="about-values grid grid-cols-[repeat(3,_1fr)] pt-[65px] gap-[45px] [&_>_div]:[border-top-width:1px] [&_>_div]:[border-top-style:solid] [&_>_div]:[border-top-color:var(--line)] [&_>_div]:py-[25px] [&_>_div]:px-0 [&_svg]:text-[color:#7d9b8c] [&_svg]:mb-4 [&_h2]:text-[18px] [&_h2]:tracking-[-0.4px] [&_p]:text-[11px] [&_p]:text-[color:#8a9ba2] [&_p]:mt-3 mobile:grid-cols-[1fr] mobile:pt-[30px] mobile:gap-[5px] mobile:[&_>_div]:pt-[25px] mobile:[&_>_div]:pb-5 mobile:[&_h2]:text-[20px] mobile:[&_p]:text-[11px] mobile:[&_p]:mt-[9px]">
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
