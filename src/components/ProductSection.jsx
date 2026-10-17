import PropTypes from "prop-types";
import { productType } from "../types/product";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard/ProductCard";
import Icon from "./Icon";

export default function ProductSection({
  eyebrow,
  title,
  description,
  products,
  to,
}) {
  return (
    <section className="product-section container pt-9 pb-[22px] w-[min(1280px,_calc(100%_-_96px))] mx-auto tablet:[&_.product-grid_>_.product-card:nth-child(n_+_5)]:hidden mobile:pt-[30px] mobile:pb-3 mobile:w-[calc(100%_-_36px)] mobile:[&_.product-grid_>_.product-card:nth-child(n_+_5)]:hidden wide:w-[min(1320px,_calc(100%_-_140px))] compact:w-[calc(100%_-_64px)] tablet:w-[calc(100%_-_48px)]">
      <div className="section-heading flex justify-between items-end mb-[30px] gap-6 [&_p]:text-[color:var(--muted)] [&_p]:text-[13px] [&_p]:mt-[9px] [&_>_.text-link]:mb-[5px] tablet:[&_h2]:text-[25px] mobile:mb-[21px] mobile:items-end mobile:gap-3 mobile:[&_.eyebrow]:text-[8px] mobile:[&_.eyebrow]:tracking-[1.1px] mobile:[&_.eyebrow]:mb-[9px] mobile:[&_h2]:text-[22px] mobile:[&_h2]:tracking-[-0.7px] mobile:[&_p]:text-[10px] mobile:[&_p]:mt-2 mobile:[&_>_.text-link]:text-[9px] mobile:[&_>_.text-link]:mb-[3px] mobile:[&_>_.text-link]:gap-1.5 mobile:[&_.text-link_svg]:w-3.5">
        <div>
          {eyebrow && <span className="eyebrow block text-[10px] font-bold tracking-[1.7px] text-[color:var(--blue)] mb-3">{eyebrow}</span>}
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {to && (
          <Link className="text-link inline-flex items-center text-[12px] text-[color:var(--blue)] font-[650] whitespace-nowrap gap-[11px] [&:hover]:text-[color:var(--blue-dark)]" to={to}>
            Hamısına bax <Icon name="arrow" size={19} />
          </Link>
        )}
      </div>
      <div className="product-grid grid grid-cols-[repeat(6,_minmax(0,_1fr))] gap-[22px] compact:gap-[17px] tablet:grid-cols-[repeat(4,_minmax(0,_1fr))] tablet:gap-[22px] mobile:grid-cols-[repeat(2,_minmax(0,_1fr))] mobile:gap-y-[26px] mobile:gap-x-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

ProductSection.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  products: PropTypes.arrayOf(productType).isRequired,
  to: PropTypes.string,
};
