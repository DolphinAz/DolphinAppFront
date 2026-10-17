import { productType } from "../../types/product";
import { Link } from "react-router-dom";
import { useShop } from "../../state/ShopContext";
import { money } from "../../state/store";
import Cover from "../Cover";
import Icon from "../Icon";
import FavoriteButton from "../FavoriteButton";

export default function ProductCard({ product }) {
  const { addToCart } = useShop();
  const discount =
    product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;
  return (
    <article className="product-card min-w-0 relative rounded-[6px] [&:hover_.product-cover]:[transform:translateY(-3px)_rotate(-1deg)]">
      <div className="product-artwork relative bg-[color:#f4f4f0] aspect-[0.79] overflow-hidden py-[22px] px-[21px] rounded-[8px] [&_>_a]:h-full [&_>_a]:block [&:has(.toy-cover)]:p-2 wide:py-6 wide:px-[25px] compact:py-[22px] compact:px-4 tablet:py-[25px] tablet:px-[22px] mobile:aspect-[0.79] mobile:py-6 mobile:px-[23px]">
        <Link
          to={`/detail/${product.id}`}
          aria-label={`${product.title} — ətraflı`}
        >
          <Cover product={product} />
        </Link>
        {discount > 0 ? (
          <span className="product-badge sale-badge absolute left-[9px] top-2.5 z-[5] text-[8px] font-[650] tracking-[0.2px] bg-[color:#c87756] text-white py-1 px-1.5 rounded-[4px] mobile:text-[7px]">−{discount}%</span>
        ) : product.bestseller ? (
          <span className="product-badge bestseller-badge absolute left-[9px] top-2.5 z-[5] text-[8px] font-[650] tracking-[0.2px] bg-[color:#e5ece4] text-[color:#567a5d] py-1 px-1.5 rounded-[4px] mobile:text-[7px]">Bestseller</span>
        ) : null}
        <FavoriteButton product={product} />
      </div>
      <div className="product-information pt-3.5 pb-0 px-0 [&_h3]:text-[12px] [&_h3]:tracking-[-0.2px] [&_h3]:leading-[1.55] [&_h3]:mt-1.5 [&_h3]:font-bold [&_h3]:min-h-[37px] [&_h3]:[display:-webkit-box] [&_h3]:[-webkit-line-clamp:2] [&_h3]:[-webkit-box-orient:vertical] [&_h3]:overflow-hidden [&_h3_a:hover]:text-[color:var(--blue)] wide:[&_h3]:text-[13px] tablet:[&_h3]:text-[12px] mobile:pt-3 mobile:[&_h3]:text-[12px] mobile:[&_h3]:min-h-[37px] mobile:[&_h3]:mt-[5px]">
        <span className="product-category text-[color:#8f9b9c] text-[8px] block tracking-[0.3px] mobile:text-[8px]">{product.category}</span>
        <h3>
          <Link to={`/detail/${product.id}`}>{product.title}</Link>
        </h3>
        <p className="product-author text-[9px] text-[color:#8b959b] mt-[3px] whitespace-nowrap overflow-hidden text-ellipsis min-h-4 mobile:text-[9px]">{product.author}</p>
        <div className="product-bottom flex items-center justify-between mt-3 gap-[7px] mobile:mt-2.5">
          <div className="product-prices flex [align-items:baseline] flex-wrap gap-1.5 [&_strong]:text-[12px] [&_strong]:font-bold [&_strong]:whitespace-nowrap [&_del]:text-[8px] [&_del]:text-[color:#9aa3a5] [&_del]:whitespace-nowrap compact:gap-1 compact:[&_strong]:text-[11px] compact:[&_del]:text-[8px] tablet:[&_strong]:text-[13px] mobile:[&_strong]:text-[13px] mobile:[&_del]:text-[9px]">
            <strong>{money(product.price)}</strong>
            {discount > 0 && <del>{money(product.originalPrice)}</del>}
          </div>
          <button
            type="button"
            className="add-button flex justify-center items-center shrink-0 w-[29px] h-[29px] text-[color:var(--blue)] [transition:all_0.2s] border border-[color:#e5edef] border-solid rounded-[6px] [&:hover]:bg-[color:var(--blue)] [&:hover]:text-white [&:hover]:border-[color:var(--blue)] mobile:w-[30px] mobile:h-[30px]"
            aria-label={`${product.title} — səbətə əlavə et`}
            onClick={() => addToCart(product)}
          >
            <Icon name="plus" size={19} />
          </button>
        </div>
      </div>
    </article>
  );
}

ProductCard.propTypes = { product: productType.isRequired };
