import PropTypes from "prop-types";
import { useShop } from "../state/ShopContext";
import { productType } from "../types/product";
import Icon from "./Icon";

export default function FavoriteButton({ product, className = "favorite-button absolute right-2 top-[9px] w-[25px] h-[25px] flex items-center justify-center bg-[color:#ffffffec] text-[color:#87948d] z-[5] rounded-full [&:hover]:text-[color:#c37663] mobile:right-2 mobile:top-2 mobile:w-[26px] mobile:h-[26px]", size = 18 }) {
  const { favorites, toggleFavorite } = useShop();
  const favorite = favorites.some((item) => item.id === product.id);
  const label = favorite ? "Sevimlilərdən çıxar" : "Sevimlilərə əlavə et";
  return (
    <button
      type="button"
      className={`${className} ${favorite ? "is-favorite !text-[color:#bf675a] [&_svg]:[fill:#bf675a20]" : ""}`}
      aria-label={`${product.title} — ${label}`}
      aria-pressed={favorite}
      onClick={() => toggleFavorite(product)}
    >
      <Icon name="heart" size={size} />
    </button>
  );
}

FavoriteButton.propTypes = {
  product: productType.isRequired,
  className: PropTypes.string,
  size: PropTypes.number,
};
