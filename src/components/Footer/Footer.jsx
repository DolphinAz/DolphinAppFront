import { Link } from "react-router-dom";
import Brand from "../Brand";
export default function Footer() {
  return (
    <footer className="site-footer bg-[color:#f5f7f7] [border-top-width:1px] [border-top-style:solid] [border-top-color:#edf0f0]">
      <div className="container footer-main w-[min(1280px,_calc(100%_-_96px))] grid grid-cols-[1fr_1fr_1fr] pt-[51px] pb-[43px] mx-auto gap-[65px] wide:w-[min(1320px,_calc(100%_-_140px))] compact:w-[calc(100%_-_64px)] compact:gap-[35px] tablet:w-[calc(100%_-_48px)] tablet:grid-cols-[1.25fr_0.7fr_0.7fr] tablet:gap-[38px] mobile:w-[calc(100%_-_36px)] mobile:grid-cols-[1fr_1fr] mobile:pt-[33px] mobile:pb-[25px] mobile:gap-y-8 mobile:gap-x-[30px] [&_h3]:text-[11px] [&_h3]:tracking-[0] [&_h3]:mb-[19px] [&_>_div:not(:first-child)_>_a:not(.text-link)]:block [&_>_div:not(:first-child)_>_a:not(.text-link)]:text-[10px] [&_>_div:not(:first-child)_>_a:not(.text-link)]:text-[color:#879398] [&_>_div:not(:first-child)_>_a:not(.text-link)]:mb-3 [&_a:hover]:text-[color:var(--blue)] mobile:[&_h3]:text-[11px] mobile:[&_h3]:mb-4 mobile:[&_>_div:not(:first-child)_>_a:not(.text-link)]:text-[10px] mobile:[&_>_div:not(:first-child)_>_a:not(.text-link)]:mb-3">
        <div className="footer-brand [&_>_p]:text-[11px] [&_>_p]:leading-[1.9] [&_>_p]:text-[color:#8a9699] [&_>_p]:max-w-60 [&_>_p]:mt-[19px] mobile:col-span-full mobile:block mobile:[&_>_p]:text-[10px] mobile:[&_>_p]:max-w-[290px] mobile:[&_>_p]:mt-3.5">
          <Brand compact />
          <p>
            Böyük hekayələrə, kiçik sevinclərə və hər yaşda kəşf etməyə
            inananlar üçün.
          </p>
          <span className="footer-signature block font-editorial italic text-[12px] text-[color:#7f9a9c] mt-4 mobile:text-[11px] mobile:mt-[11px]">
            Bir kitab. Min yeni dünya.
          </span>
        </div>
        <div>
          <h3>Kəşf et</h3>
          <Link to="/books">Bütün kitablar</Link>
          <Link to="/best-seller">Ən çox satılanlar</Link>
          <Link to="/discounts">Endirimli məhsullar</Link>
          <Link to="/toys">Oyuncaqlar</Link>
        </div>
        <div>
          <h3>Dolphin</h3>
          <Link to="/about">Haqqımızda</Link>
          <Link to="/contact">Bizimlə əlaqə</Link>
          <Link to="/profile">Hesabım</Link>
          <Link to="/orders">Sifarişlərim</Link>
        </div>
      </div>
      <div className="container footer-bottom w-[min(1280px,_calc(100%_-_96px))] [border-top-width:1px] [border-top-style:solid] [border-top-color:#e5ebec] flex justify-center text-[9px] text-[color:#97a1a4] py-5 mx-auto wide:w-[min(1320px,_calc(100%_-_140px))] compact:w-[calc(100%_-_64px)] tablet:w-[calc(100%_-_48px)] mobile:w-[calc(100%_-_36px)] mobile:text-[8px] mobile:flex-col mobile:py-[17px] mobile:gap-2.5 [&_a]:text-[color:#6f909b]">
        <span>
          © {new Date().getFullYear()} Dolphin. Bütün hüquqlar qorunur.
        </span>
      </div>
    </footer>
  );
}
