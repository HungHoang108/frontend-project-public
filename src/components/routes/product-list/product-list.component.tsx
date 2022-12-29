import { ChangeEvent } from "react";
import ProductCard from "../../product-card/product-card.component";
import { useAppDispatch } from "../../../hooks/reduxHook";
import {
  sortByCategory,
} from "../../../redux/sort-category-reducer";
import { sortByPrice } from "../../../redux/sort-price-reducer";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortByPrice(e.target.value));
  };
  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortByCategory(e.target.value));
  };
  return (
    <div>
      <div>
        <span>Sort by price</span>
        <select onChange={handleChange} id="sort">
          <option>Sort products</option>
          <option value="price-down">From highest price</option>
          <option value="price-up">From lowest price</option>
        </select>

        <span>Sort by category</span>
        <select onChange={handleCategory}>
          <option value="">All</option>
          <option value="Furniture">Furniture</option>
          <option value="Clothes">Clothes</option>
          <option value="Electronics">Electronics</option>
          <option value="Shoes">Shoes</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <ProductCard title="All Products" productsDisplayed={8} />
    </div>
  );
};

export default ProductList;
