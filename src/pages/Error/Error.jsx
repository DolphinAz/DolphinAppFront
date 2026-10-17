import { Link } from "react-router-dom";
import Icon from "../../components/Icon";
export default function ErrorPage() {
  return (
    <main id="main-content" className="container standard-page w-[min(1280px,_calc(100%_-_96px))] pt-12 pb-[75px] min-h-[55vh] mx-auto wide:w-[min(1320px,_calc(100%_-_140px))] compact:w-[calc(100%_-_64px)] tablet:w-[calc(100%_-_48px)] mobile:w-[calc(100%_-_36px)] mobile:pt-[30px] mobile:pb-[50px] [&_>_.section-heading]:mb-[38px] mobile:[&_h1]:text-[31px] mobile:[&_h1]:tracking-[-1px] mobile:[&_>_.section-heading]:items-start mobile:[&_>_.section-heading]:flex-col mobile:[&_>_.section-heading]:mb-7 mobile:[&_>_.section-heading]:gap-5 mobile:[&_>_.section-heading_p]:text-[11px] mobile:[&_>_.section-heading_>_.text-link]:text-[11px]">
      <div className="empty-state min-h-[310px] flex items-center justify-center flex-col text-center py-[50px] px-6 gap-[15px] [&_>_svg]:text-[color:#7fa6b0] [&_>_svg]:mb-[5px] [&_h2]:text-[25px] [&_p]:text-[13px] [&_p]:text-[color:#839098] [&_p]:max-w-[510px] [&_.button]:mt-1.5 [&_h1]:text-[33px] [&_h1]:tracking-[-1px] mobile:min-h-[300px] mobile:py-10 mobile:px-3 mobile:gap-3.5 mobile:[&_h2]:text-[23px] mobile:[&_p]:text-[11px] mobile:[&_h1]:text-[26px] mobile:[&_h1]:leading-[1.4] mobile:[&_>_.button]:text-[11px]">
        <span className="error-number font-heading text-[95px] tracking-[-6px] text-[color:#c3dfe9] font-extrabold mobile:text-[80px]">404</span>
        <h1>Bu səhifənin hekayəsi hələ yazılmayıb.</h1>
        <p>
          Axtardığın səhifə tapılmadı. Yeni bir kitab kəşf etməyə nə deyirsən?
        </p>
        <Link className="button button-primary inline-flex items-center justify-center min-h-[49px] text-[13px] font-[650] leading-[1.6] [transition:background_0.2s,_transform_0.2s] whitespace-normal bg-[color:var(--blue)] text-white py-[13px] px-[23px] border border-[color:transparent] border-solid rounded-[7px] gap-4 [&:hover]:[transform:translateY(-1px)] [&:hover]:bg-[color:var(--blue-dark)]" to="/">
          Ana səhifəyə qayıt <Icon name="arrow" size={18} />
        </Link>
      </div>
    </main>
  );
}
