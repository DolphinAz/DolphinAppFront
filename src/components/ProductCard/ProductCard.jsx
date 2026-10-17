import { productType } from "../../types/product";
import { Link } from "react-router-dom";
import { useShop } from "../../state/ShopContext";
import { money } from "../../state/store";
import Cover from "../Cover";
import Icon from "../Icon";

export default function ProductCard({ product }) {
  const { favorites, toggleFavorite, addToCart } = useShop();
  const favorite = favorites.some((item) => item.id === product.id);
  const discount =
    product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;
  return (
    <article className="product-card">
      <div className="product-artwork">
        <Link
          to={`/detail/${product.id}`}
          aria-label={`${product.title} — ətraflı`}
        >
          <Cover product={product} />
        </Link>
        {discount > 0 ? (
          <span className="product-badge sale-badge">−{discount}%</span>
        ) : product.bestseller ? (
          <span className="product-badge bestseller-badge">Bestseller</span>
        ) : null}
        <button
          type="button"
          className={`favorite-button ${favorite ? "is-favorite" : ""}`}
          aria-label={
            favorite
              ? `${product.title} — sevimlilərdən çıxar`
              : `${product.title} — sevimlilərə əlavə et`
          }
          aria-pressed={favorite}
          onClick={() => toggleFavorite(product)}
        >
          <Icon name="heart" size={18} />
        </button>
      </div>
      <div className="product-information">
        <span className="product-category">{product.category}</span>
        <h3>
          <Link to={`/detail/${product.id}`}>{product.title}</Link>
        </h3>
        <p className="product-author">{product.author}</p>
        <div className="product-bottom">
          <div className="product-prices">
            <strong>{money(product.price)}</strong>
            {discount > 0 && <del>{money(product.originalPrice)}</del>}
          </div>
          <button
            type="button"
            className="add-button"
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
