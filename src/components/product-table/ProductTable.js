import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryAction,
  fetchCategoriesAction,
} from "../../pages/category/categoryAction";
import { fetchProductAction } from "../../pages/product/productAction";

const ProductTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productStore);

  useEffect(() => {
    //call api to fetch all the cats and set in the store
    dispatch(fetchProductAction());
  }, []);

  return (
    <div>
      Products found <hr />
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Name</th>
            <th>QTY</th>
            <th>Price</th>
            <th>Sales Price</th>
            <th>Sales Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, i) => (
            <tr key={item._id}>
              <td>{i + 1}</td>
              <td
                className={
                  item.status == "active" ? "text-success" : "text-danger"
                }
              >
                {item.status}
              </td>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.price}</td>
              <td>{item.salesprice}</td>
              <td>{item.salesPrice}</td>
              <td>
                <Button variant="warning">Edit</Button>{" "}
                <Button
                  title="You can only delete if child category does not exist"
                  variant="danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductTable;
