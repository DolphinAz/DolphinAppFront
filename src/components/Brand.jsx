import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../assets/images/site-logo.png";

export default function Brand({ compact = false, onClick }) {
  return (
    <Link
      className="brand inline-flex w-fit shrink-0 items-center gap-2.5 rounded-lg mobile:gap-2"
      to="/"
      onClick={onClick}
      aria-label="Dolphin — ana səhifə"
    >
      <span
        className={`brand-mark relative block shrink-0 overflow-hidden bg-[color:#94dcfa] shadow-[0_3px_12px_#298eae1a] ring-1 ring-inset ring-[color:#69c6e433] ${compact ? "h-10 w-10 rounded-xl mobile:h-9 mobile:w-9" : "h-12 w-12 rounded-[14px] tablet:h-10 tablet:w-10 tablet:rounded-xl mobile:h-9 mobile:w-9 mobile:rounded-[11px]"}`}
        aria-hidden="true"
      >
        <img
          src={logo}
          alt=""
          width={1254}
          height={1254}
          draggable={false}
          className="h-full w-full scale-[1.28] object-cover"
        />
      </span>
      <span className="brand-wordmark flex flex-col gap-1.5 mobile:gap-[5px]">
        <span className={`font-heading font-extrabold leading-none tracking-[-1.3px] text-[color:#244755] ${compact ? "text-[28px] mobile:text-[24px]" : "text-[32px] tablet:text-[28px] mobile:text-[24px]"}`}>
          dolphin<span className="text-[color:var(--blue)]">.</span>
        </span>
        <span className="pl-px font-sans text-[8px] font-semibold uppercase leading-none tracking-[2.15px] text-[color:#708691] tablet:text-[7px] tablet:tracking-[1.85px] mobile:text-[6px] mobile:tracking-[1.8px]">
          kitab & sevinc
        </span>
      </span>
    </Link>
  );
}

Brand.propTypes = {
  compact: PropTypes.bool,
  onClick: PropTypes.func,
};
