import PropTypes from "prop-types";
export const productType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["book", "toy"]).isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.number.isRequired,
  originalPrice: PropTypes.number,
  bestseller: PropTypes.bool,
  color: PropTypes.string,
  image: PropTypes.string,
  illustration: PropTypes.string,
});
