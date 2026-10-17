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
    <section className="product-section container">
      <div className="section-heading">
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {to && (
          <Link className="text-link" to={to}>
            Hamısına bax <Icon name="arrow" size={19} />
          </Link>
        )}
      </div>
      <div className="product-grid">
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
