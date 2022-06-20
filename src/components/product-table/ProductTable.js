import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryAction,
  fetchCategoriesAction,
} from "../../pages/category/categoryAction";
import { toggleModal } from "../../system-state/systemSlice";
import { EditCategory } from "../category-form/EditCategory";

const ProductTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    //call api to fetch all the cats and set in the store
    dispatch(fetchCategoriesAction());
  }, []);

  const handleOnDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategoryAction(_id));
    }
  };

  const parentCat = categories.filter((item) => !item.parentCatId);
  const childCat = categories.filter((item) => item.parentCatId);

  return (
    <div>
      {categories.length} Categories found <hr />
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {parentCat.map((item, i) => (
            <>
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.catName}</td>
                <td
                  className={
                    item.status == "active" ? "text-success" : "text-danger"
                  }
                >
                  {item.status}
                </td>
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
              {childCat.map((cat, index) => {
                if (cat.parentCatId === item._id) {
                  return (
                    <tr key={cat._id}>
                      <td>{i + 1}</td>
                      <td>➡️{cat.catName}</td>
                      <td
                        className={
                          cat.status == "active"
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {cat.status}
                      </td>
                      <td>
                        <Button variant="warning">Edit</Button>{" "}
                        <Button
                          title="You can only delete if child category does not exist"
                          variant="danger"
                          onClick={() => handleOnDelete(cat._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                }
              })}
            </>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductTable;
