import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import {
  postCategoryAction,
  updateCategoryAction,
} from "../../pages/category/categoryAction";
import { MyVerticallyCenteredModal } from "../modal/Modal";

const initialState = {
  status: "",
  parentCatId: "",
  catName: "",
};

export const EditCategory = ({ selectedCat }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(selectedCat);

  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    setForm(selectedCat);
  }, [selectedCat]);

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;

    if (name === "status") {
      value = checked ? "active" : "inactive";
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { _id, parentCatId, catName, status } = form;

    // dispatdh action to update the category
    dispatch(updateCategoryAction({ _id, parentCatId, catName, status }));
  };
  console.log(form);
  return (
    <MyVerticallyCenteredModal title="Edit Category">
      <Form className="py-5" onSubmit={handleOnSubmit}>
        <Row className="g-3">
          <Col md="2">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Status"
              name="status"
              onChange={handleOnChange}
              checked={form.status === "active"}
            />
          </Col>
          <Col md="4">
            <Form.Group controlId="formGridState">
              <Form.Select
                name="parentCatId"
                defaultValue="Choose..."
                onChange={handleOnChange}
              >
                <option value="">.. Select ..</option>
                {categories.map(
                  (item, i) =>
                    !item.parentCatId && (
                      <option
                        key={i}
                        value={item._id}
                        selected={item._id === form.parentCatId}
                      >
                        {item.catName}
                      </option>
                    )
                )}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md="3">
            <Form.Control
              name="catName"
              placeholder="Category Name"
              onChange={handleOnChange}
              required
              value={form.catName}
            />
          </Col>
          <Col md="3">
            <Button type="submit">Update Category</Button>
          </Col>
        </Row>
      </Form>
    </MyVerticallyCenteredModal>
  );
};

export default EditCategory;
