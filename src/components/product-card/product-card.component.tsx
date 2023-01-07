import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { ProductCardList } from "../../types/product-cardlist";
import Button from "../button/button.component";
import { deleteItem } from "../../redux/products-reducer";
import { deleteProduct } from "../../redux/products-reducer";
import ProductEditForm from "../product-editing-form/productEdit-form.component";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import "./product-card.component.styles.scss";

const ProductCard = ({ title, productsDisplayed, productList }: ProductCardList) => {
  const dispatch = useAppDispatch();
  const sortCategory = useAppSelector((state) => state.SortReducer);

  const [role, setRole] = useState("");
  const [popup, setPopup] = useState(false);
  const [popupId, setPopupId] = useState(0);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    userRole && setRole(userRole);
  }, []);

  const sortByCategoryArray = () => {
    if (!sortCategory) {
      return productList;
    }

    const isCategoryExist = productList.find(
      (item) => item.category.name === sortCategory
    );
    if (isCategoryExist) {
      return productList.filter((item) => item.category.name === sortCategory);
    } else {
      return productList;
    }
  };

  return (
    <>
      <div className="products">
        {sortByCategoryArray()
          .slice(1, productsDisplayed)
          .map((product) => (
            <div key={product.id} className="products-card">
              <img src={product.images[0]} />
              <div className="products-title-price">
                <h4>{product.title}</h4>
                <span>{product.price} $</span>
              </div>
              <div className="product-card-button">
                <div>
                  <Button
                    id={product.id}
                    itemName={product.title}
                    image={product.images[0]}
                    price={product.price}
                    amount={1}
                  />
                </div>
                <div className="card-button_edit_deletebox">
                  {role === "admin" && (
                    <button
                      className="edit-delete-button"
                      onClick={() => {
                        const id = product.id;
                        dispatch(deleteProduct(id));
                        dispatch(deleteItem(id));
                      }}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </button>
                  )}
                  {role === "admin" && (
                    <button
                      className="edit-delete-button"
                      onClick={() => {
                        setPopup(true);
                        setPopupId(product.id);
                      }}
                    >
                      <ModeEditOutlinedIcon />
                    </button>
                  )}
                </div>
              </div>

              {popupId === product.id && (
                <ProductEditForm
                  open={popup}
                  onClose={() => setPopup(false)}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                  id={product.id}
                />
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default ProductCard;
