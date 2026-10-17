import { Link } from "react-router-dom";
import { useShop } from "../../state/ShopContext";
import ProductSection from "../../components/ProductSection";
import HeroBooks from "../../components/HeroBooks";
import Icon from "../../components/Icon";

export default function Home() {
  const { books } = useShop();
  return (
    <main id="main-content">
      <section className="container hero w-[min(1280px,_calc(100%_-_96px))] grid grid-cols-[1.07fr_1fr] min-h-[451px] mt-[25px] bg-[color:#f2f6f5] overflow-hidden relative mx-auto rounded-[12px] wide:w-[min(1320px,_calc(100%_-_140px))] wide:min-h-[490px] compact:w-[calc(100%_-_64px)] tablet:w-[calc(100%_-_48px)] tablet:grid-cols-[1.1fr_1fr] tablet:min-h-[405px] mobile:w-[calc(100%_-_36px)] mobile:mt-[17px] mobile:grid-cols-[1fr] mobile:min-h-0 mobile:rounded-[9px] [&_h1]:text-[49px] [&_h1]:leading-[1.22] [&_h1]:tracking-[-2px] [&_h1]:text-[color:#24434b] [&_h1]:font-[750] [&_h1_em]:not-italic [&_h1_em]:text-[color:var(--blue)] [&_h1_em]:relative [&_h1_em:after]:content-[''] [&_h1_em:after]:absolute [&_h1_em:after]:h-[5px] [&_h1_em:after]:bottom-[1px] [&_h1_em:after]:left-0 [&_h1_em:after]:right-0 [&_h1_em:after]:bg-[color:#9fd0df] [&_h1_em:after]:[transform:rotate(-2deg)] [&_h1_em:after]:rounded-full wide:[&_h1]:text-[54px] compact:[&_h1]:text-[43px] tablet:[&_h1]:text-[36px] tablet:[&_h1]:tracking-[-1.5px] mobile:[&_h1]:text-[37px] mobile:[&_h1]:leading-[1.2] mobile:[&_h1]:tracking-[-1.6px] mobile:[&_h1_em:after]:h-[3px] mobile:[&_h1_em:after]:bottom-0">
        <div className="hero-copy pt-[55px] pr-0 pb-[39px] pl-[43px] z-[2] [&_>_.eyebrow]:text-[9px] [&_>_.eyebrow]:tracking-[1.5px] [&_>_.eyebrow]:mb-5 [&_>_p]:text-[12px] [&_>_p]:leading-[1.9] [&_>_p]:text-[color:#7c8c90] [&_>_p]:mt-5 wide:pt-[66px] wide:pl-[55px] compact:pl-[30px] tablet:pt-[43px] tablet:pr-0 tablet:pb-8 tablet:pl-[26px] tablet:[&_>_.eyebrow]:text-[7px] tablet:[&_>_.eyebrow]:tracking-[1.1px] tablet:[&_>_p]:text-[10px] mobile:pt-[31px] mobile:pb-0 mobile:px-[25px] mobile:[&_>_.eyebrow]:text-[7px] mobile:[&_>_.eyebrow]:tracking-[1px] mobile:[&_>_.eyebrow]:mb-[15px] mobile:[&_>_p]:text-[11px] mobile:[&_>_p]:mt-4 mobile:[&_>_p]:leading-[1.8] mobile:[&_>_p]:max-w-[350px]">
          <span className="eyebrow block text-[10px] font-bold tracking-[1.7px] text-[color:var(--blue)] mb-3">
            <span className="small-line inline-block w-5 h-[1px] bg-[color:currentColor] mr-2.5 [vertical-align:middle]" />{" "}
            SƏNİN HEKAYƏN BURADAN BAŞLAYIR
          </span>
          <h1>
            Bir kitab aç.
            <br />
            Yeni bir <em>dünya</em> kəşf et.
          </h1>
          <p>
            İlham verən kitablar, xəyal gücünü böyüdən oyuncaqlar.
            <br className="desktop-break mobile:hidden" /> Özün və sevdiklərin
            üçün kiçik bir sevinc tap.
          </p>
          <div className="hero-actions flex items-center mt-[27px] gap-[25px] [&_.button]:text-[11px] [&_.button]:min-h-[45px] [&_.button]:px-[19px] tablet:mt-[23px] tablet:gap-[17px] tablet:[&_.button]:text-[10px] tablet:[&_.button]:min-h-[41px] tablet:[&_.button]:px-3.5 tablet:[&_.button]:gap-2.5 mobile:mt-5 mobile:gap-[22px] mobile:[&_.button]:text-[10px] mobile:[&_.button]:min-h-[42px] mobile:[&_.button]:px-4">
            <Link
              className="button button-primary inline-flex items-center justify-center min-h-[49px] text-[13px] font-[650] leading-[1.6] [transition:background_0.2s,_transform_0.2s] whitespace-normal bg-[color:var(--blue)] text-white py-[13px] px-[23px] border border-[color:transparent] border-solid rounded-[7px] gap-4 [&:hover]:[transform:translateY(-1px)] [&:hover]:bg-[color:var(--blue-dark)]"
              to="/books"
            >
              Kitabları kəşf et <Icon name="arrow" size={19} />
            </Link>
            <Link
              className="hero-secondary flex items-center text-[10px] font-semibold text-[color:#48676e] gap-1.5 tablet:text-[9px] mobile:text-[9px]"
              to="/best-seller"
            >
              Ən çox sevilənlər <Icon name="chevron" size={16} />
            </Link>
          </div>
        </div>
        <div className="hero-visual relative min-w-0 [background:radial-gradient(ellipse_at_50%_55%,_#d9e8e2_0,_transparent_64%)] mobile:h-[290px] mobile:mt-[7px] mobile:[background:radial-gradient(ellipse_at_50%_60%,_#d9e8e2_0,_transparent_65%)]">
          <div className="hero-orbit orbit-one absolute left-[51%] top-[50%] [transform:translate(-50%,_-50%)] w-[355px] h-[355px] border border-[color:#d5e2dc] border-solid rounded-full wide:w-[385px] wide:h-[385px] compact:w-[325px] compact:h-[325px] tablet:w-[270px] tablet:h-[270px] mobile:w-60 mobile:h-60 mobile:top-[52%]" />
          <div className="hero-orbit orbit-two absolute left-[51%] top-[50%] [transform:translate(-50%,_-50%)] w-[430px] h-[430px] opacity-[0.6] border border-[color:#d5e2dc] border-dashed rounded-full wide:w-[465px] wide:h-[465px] compact:w-[385px] compact:h-[385px] tablet:w-[330px] tablet:h-[330px] mobile:w-[290px] mobile:h-[290px] mobile:top-[52%]" />
          <span className="hero-spark spark-one absolute z-[4] text-[color:#b29b68] top-[82px] right-[16%] text-[29px] [transform:rotate(15deg)] tablet:[&.spark-one]:right-[8%] tablet:[&.spark-one]:top-[83px] tablet:[&.spark-one]:text-[23px] tablet:[&.spark-two]:bottom-[62px] tablet:[&.spark-two]:right-[5%] tablet:[&.spark-two]:text-[30px] mobile:[&.spark-one]:right-[14%] mobile:[&.spark-one]:top-8 mobile:[&.spark-one]:text-[23px] mobile:[&.spark-two]:bottom-[51px] mobile:[&.spark-two]:right-[10%] mobile:[&.spark-two]:text-[27px]">
            ✦
          </span>
          <span className="hero-spark spark-two absolute z-[4] text-[color:#789e99] bottom-[70px] right-[9%] text-[40px] tablet:[&.spark-one]:right-[8%] tablet:[&.spark-one]:top-[83px] tablet:[&.spark-one]:text-[23px] tablet:[&.spark-two]:bottom-[62px] tablet:[&.spark-two]:right-[5%] tablet:[&.spark-two]:text-[30px] mobile:[&.spark-one]:right-[14%] mobile:[&.spark-one]:top-8 mobile:[&.spark-one]:text-[23px] mobile:[&.spark-two]:bottom-[51px] mobile:[&.spark-two]:right-[10%] mobile:[&.spark-two]:text-[27px]">
            ✧
          </span>
          <span className="hero-caption absolute left-[50%] [transform:translateX(-50%)] top-9 text-[8px] tracking-[2.4px] text-[color:#6e9095] whitespace-nowrap tablet:text-[6px] tablet:tracking-[1.6px] mobile:top-[13px] mobile:text-[6px]">
            SƏHİFƏLƏR ARASINDA İTİR...
          </span>
          <HeroBooks />
          <div className="hero-sticker absolute left-[9%] bottom-[60px] z-[4] flex items-center bg-[color:#fffffff0] shadow-[0_5px_20px_#3b62680b] [transform:rotate(-6deg)] text-[color:var(--blue)] py-3 px-[15px] border border-[color:#fff] border-solid rounded-[9px] gap-[9px] [&_span]:text-[8px] [&_span]:leading-[1.7] [&_span]:text-[color:#7a8e94] [&_strong]:font-semibold [&_strong]:text-[color:#395d68] wide:bottom-[60px] compact:left-[3%] tablet:bottom-[53px] tablet:py-[9px] tablet:px-[11px] mobile:left-[12%] mobile:bottom-[39px] mobile:py-2 mobile:px-[11px] mobile:gap-2 mobile:[&_svg]:w-[17px] mobile:[&_span]:text-[7px]">
            <Icon name="book" size={21} />
            <span>
              Yeni favoritini
              <br />
              <strong>tapmağın vaxtıdır</strong>
            </span>
          </div>
          <span className="hero-visual-bottom absolute bottom-6 left-[50%] [transform:translateX(-50%)] text-[9px] text-[color:#7e999d] tracking-[0.3px] whitespace-nowrap tablet:text-[8px] mobile:bottom-[15px] mobile:text-[7px]">
            Seç, oxu, yenidən kəşf et.
          </span>
        </div>
      </section>
      <section className="container category-section w-[min(1280px,_calc(100%_-_96px))] pt-[49px] pb-[18px] mx-auto wide:w-[min(1320px,_calc(100%_-_140px))] compact:w-[calc(100%_-_64px)] tablet:w-[calc(100%_-_48px)] tablet:pt-[37px] mobile:w-[calc(100%_-_36px)] mobile:pt-[31px] mobile:pb-1.5">
        <div className="section-heading flex justify-between items-end mb-[30px] gap-6 [&_p]:text-[color:var(--muted)] [&_p]:text-[13px] [&_p]:mt-[9px] [&_>_.text-link]:mb-[5px] tablet:[&_h2]:text-[25px] mobile:mb-[21px] mobile:items-end mobile:gap-3 mobile:[&_.eyebrow]:text-[8px] mobile:[&_.eyebrow]:tracking-[1.1px] mobile:[&_.eyebrow]:mb-[9px] mobile:[&_h2]:text-[22px] mobile:[&_h2]:tracking-[-0.7px] mobile:[&_p]:text-[10px] mobile:[&_p]:mt-2 mobile:[&_>_.text-link]:text-[9px] mobile:[&_>_.text-link]:mb-[3px] mobile:[&_>_.text-link]:gap-1.5 mobile:[&_.text-link_svg]:w-3.5">
          <div>
            <span className="eyebrow block text-[10px] font-bold tracking-[1.7px] text-[color:var(--blue)] mb-3">
              MARAĞININ ARDINCA GET
            </span>
            <h2>Sənin dünyan hansıdır?</h2>
          </div>
          <Link
            to="/books"
            className="text-link inline-flex items-center text-[12px] text-[color:var(--blue)] font-[650] whitespace-nowrap gap-[11px] [&:hover]:text-[color:var(--blue-dark)]"
          >
            Bütün kateqoriyalar <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="category-grid grid grid-cols-[repeat(4,_1fr)] gap-4 tablet:gap-[11px] mobile:grid-cols-[repeat(2,_minmax(0,_1fr))] mobile:gap-[11px]">
          {[
            ["Bədii ədəbiyyat", "Hər həyatdan bir hekayə", "book"],
            ["Şəxsi inkişaf", "Özünün yeni versiyası", "sparkles"],
            ["Uşaq kitabları", "Balaca böyük xəyallar", "star"],
            ["Fantastika", "Sərhədsiz xəyal gücü", "gift"],
          ].map(([name, subtitle, icon], index) => (
            <Link
              className={`category-card relative min-h-[119px] pt-[22px] pr-5 pb-[19px] pl-[72px] bg-[color:#eef3ef] flex justify-center flex-col [transition:transform_0.2s] rounded-[8px] [&:hover]:[transform:translateY(-3px)] [&.category-1]:bg-[color:#f6eee3] [&.category-2]:bg-[color:#eaf2f7] [&.category-3]:bg-[color:#f1edf5] [&_strong]:text-[11px] [&_strong]:leading-[1.6] [&_strong]:font-[650] [&_small]:text-[8px] [&_small]:text-[color:#89958c] [&_small]:mt-[5px] compact:pl-[59px] compact:pr-[9px] compact:[&_strong]:text-[10px] compact:[&_small]:text-[7px] tablet:min-h-[130px] tablet:justify-end tablet:py-5 tablet:px-[15px] tablet:[&_small]:text-[8px] mobile:min-h-[97px] mobile:pt-[18px] mobile:pr-3 mobile:pb-[17px] mobile:pl-[58px] mobile:justify-center mobile:[&_strong]:text-[10px] mobile:[&_small]:text-[7px] category-${index}`}
              to={`/books?category=${encodeURIComponent(name)}`}
              key={name}
            >
              <span className="category-symbol absolute left-[22px] top-[34px] text-[color:#668b76] [.category-1_&]:text-[color:#b38d55] [.category-2_&]:text-[color:#6e99b5] [.category-3_&]:text-[color:#9984b1] compact:left-4 compact:[&_svg]:w-[26px] tablet:top-[17px] tablet:left-[15px] mobile:top-[27px] mobile:left-[15px] mobile:[&_svg]:w-[27px]">
                <Icon name={icon} size={30} />
              </span>
              <strong>{name}</strong>
              <small>{subtitle}</small>
              <span className="category-arrow absolute bottom-2.5 right-3 opacity-[0.4] mobile:right-2 mobile:bottom-[7px] mobile:[&_svg]:w-3.5">
                <Icon name="arrow" size={17} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <ProductSection
        eyebrow="RƏFİMİZİN ULDUZLARI"
        title="Ən çox sevilən kitablar"
        description="Oxucuların dönə-dönə qayıtdığı hekayələr."
        products={books.filter((book) => book.bestseller).slice(0, 6)}
        to="/best-seller"
      />
      <ProductSection
        eyebrow="YAXŞI KİTAB, DAHA YAXŞI QİYMƏT"
        title="Qaçırılmayacaq endirimlər"
        products={books.filter((book) => book.originalPrice).slice(0, 6)}
        to="/discounts"
      />
    </main>
  );
}
