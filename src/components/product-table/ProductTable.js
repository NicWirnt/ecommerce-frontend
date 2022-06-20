import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductById,
  fetchProductsAction,
} from "../../pages/product/ProductAction";
import { toggleModal } from "../../system-state/systemSlice";
import { ProductDescription } from "../product-form/ProductDescription";

const ProductTable = () => {
  let number = 0;
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState({});
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    //call api to fetch all the cats and set in the store
    dispatch(fetchProductsAction());
  }, []);

  const handleOnDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteProductById(_id));
    }
  };

  const handleOnDescription = (item) => {
    setSelectedProduct(item);
    dispatch(toggleModal());
  };

  return (
    <div>
      <ProductDescription selectedProduct={selectedProduct} />
      {products.length} Products found <hr />
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>QTY</th>
            <th>Price</th>
            <th>Sale Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, i) => (
            <>
              <tr key={item._id}>
                <td>{(number += 1)}</td>
                <td
                  className={
                    item.status == "active" ? "text-success" : "text-danger"
                  }
                >
                  {item.status}
                </td>
                <td>
                  {item.name}{" "}
                  <i
                    className="fa-solid fa-circle-info"
                    onClick={() => handleOnDescription(item)}
                  ></i>
                </td>
                <td>{item.sku}</td>
                <td>{item.catId}</td>
                <td>{item.qty}</td>
                <td>{item.price}</td>
                <td>{item.salesPrice}</td>
                <td>
                  <Button variant="warning">Edit</Button>{" "}
                  <Button
                    title="You can only delete if child category does not exist"
                    variant="danger"
                    onClick={() => handleOnDelete(item._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductTable;
