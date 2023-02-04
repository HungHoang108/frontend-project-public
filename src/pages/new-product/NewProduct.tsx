import { useState } from "react";

import { createProduct } from "../../redux/productReducer";
import { useAppDispatch } from "../../hooks/reduxHook";
import { SubmitHandler, useForm } from "react-hook-form";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface hookForm {
  title: "";
  price: 0;
  description: "";
  categoryId: 0;
  file: FileList;
}

const NewProduct = () => {
  const [status, setStatus] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<hookForm>();

  const onSubmit: SubmitHandler<hookForm> = (data) => {
    const newItemForm = {
      file: data.file[0],
      product: {
        title: data.title,
        price: data.price,
        description: data.description,
        categoryId: data.categoryId,
        images: [],
      },
    };
    dispatch(createProduct(newItemForm));
    setStatus(true);
  };

  const addMoreItem = () => {
    setStatus(false);
  };

  return (
    <div className="addNewProduct-box">
      {status ? (
        <div className="newProduct-response">
          <h3>Your product has been added</h3>
          <button onClick={addMoreItem}>Add more items</button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="newProduct-conntainer"
        >
          <h2>Create a new product</h2>
          <div>
            <label htmlFor="title"></label>
            {errors.title && (
              <i>
                <p>
                  <WarningAmberIcon color="error" sx={{ fontSize: "14px" }} />
                  Title is required
                </p>
              </i>
            )}
            <input
              id="title"
              type="text"
              placeholder="title"
              {...register("title", { required: true })}
            />
          </div>
          <div>
            {errors.price && (
              <i>
                <p>
                  <WarningAmberIcon color="error" sx={{ fontSize: "14px" }} />
                  Price is required
                </p>
              </i>
            )}
            <input
              type="number"
              placeholder="price"
              {...register("price", { required: true })}
            />
          </div>
          <div>
            {errors.categoryId && (
              <i>
                <p>
                  <WarningAmberIcon color="error" sx={{ fontSize: "14px" }} />
                  Category is required
                </p>
              </i>
            )}
            <select
              {...register("categoryId", { required: "Category is required" })}
            >
              <option value="">Choose category</option>
              <option value="1">Clothes</option>
              <option value="2">Electronics</option>
              <option value="3">Furniture</option>
              <option value="4">Shoes</option>
              <option value="5">Others</option>
            </select>
          </div>
          <div>
            {errors.description && (
              <i>
                <p>
                  <WarningAmberIcon color="error" sx={{ fontSize: "14px" }} />
                  Description is required
                </p>
              </i>
            )}
            <textarea
              cols={60}
              rows={10}
              placeholder="Description"
              {...register("description", { required: true })}
            ></textarea>
          </div>
          <div>
            {errors.file && (
              <i>
                <p>
                  <WarningAmberIcon color="error" sx={{ fontSize: "14px" }} />
                  File is required
                </p>
              </i>
            )}
            <span>
              <i>
                <b>Upload images:</b>
              </i>
            </span>
            <input
              type="file"
              multiple
              {...register("file", { required: true })}
            />
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewProduct;
