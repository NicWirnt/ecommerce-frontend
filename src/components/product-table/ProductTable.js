import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteCategoryAction,
  fetchCategoriesAction,
} from "../../pages/category/categoryAction";
import {
  deleteProductAction,
  fetchProductAction,
} from "../../pages/product/productAction";

const ProductTable = () => {
  const dispatch = useDispatch();
  const [ids, setIds] = useState([]);
  const { products } = useSelector((state) => state.productStore);

  const [displayProduct, setDisplayProduct] = useState([]);

  useEffect(() => {
    //call api to fetch all the cats and set in the store
    !displayProduct.length && dispatch(fetchProductAction());
    setDisplayProduct(products);
  }, [products]);

  const handleOnDelete = () => {
    if (window.confirm("Are you sure you want to delete this products?")) {
      dispatch(deleteProductAction(ids));
      setIds([]);
    }
  };

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;

    if (value === "all") {
      if (checked) {
        const allIds = displayProduct.map((item) => item._id);
        setIds(allIds);
      } else {
        setIds([]);
      }
      return;
    }

    checked
      ? setIds([...ids, value])
      : setIds(ids.filter((id) => id !== value));
  };

  const handleOnFilter = (e) => {
    const value = e.target.value;

    if (!value) {
      setDisplayProduct(products);
    } else {
      setDisplayProduct(products.filter((item) => item.status === value));
    }
  };

  const handleOnChange = (e) => {
    const { value } = e.target;

    setDisplayProduct(
      products.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div style={{ overflowX: "scroll" }} className="mb-5">
      <hr />
      <div className="mt-3 d-flex justify-content-end">
        <Form.Control
          name="search"
          placeholder="Search"
          className="m-3"
          onChange={handleOnChange}
        />

        <Form.Select id="" className="m-3" onChange={handleOnFilter}>
          <option value="">Filter Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Form.Select>
      </div>
      <div>{displayProduct.length} Products found </div>
      <hr />
      <Table striped>
        <thead>
          <tr>
            <th>
              <Form.Check name="status" value="all" onChange={handleOnSelect} />
            </th>
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
          {displayProduct.map((item, i) => (
            <tr key={item._id}>
              <td>
                <Form.Check
                  name="status"
                  id="custom-switch"
                  onChange={handleOnSelect}
                  value={item._id}
                  checked={ids.includes(item._id)}
                />
              </td>
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
              <td>${item.price.toLocaleString()}</td>
              <td>{item.salesPrice || "-"}</td>
              <td>
                {item.salesStartDate
                  ? new Date(item.salesStartDate).toLocaleDateString() +
                    " - " +
                    new Date(item.salesEndDate).toLocaleDateString()
                  : " - "}
              </td>
              <td>
                <Link to={`/product/edit/${item._id}`}>
                  <Button variant="warning">Edit</Button>{" "}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-end">
        {ids.length > 0 && (
          <Button
            title="You can only delete if child category does not exist"
            variant="danger"
            onClick={handleOnDelete}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
