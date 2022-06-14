import { useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { postCategoryAction } from "../../pages/category/categoryAction";

const initialState = {
  status: "inactive",
  parentCatId: "",
  catName: "",
};

export const CategoryForm = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState(initialState);

  const { categories } = useSelector((state) => state.category);

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
    const parentCatId = form.parentCatId ? form.parentCatId : undefined;
    dispatch(postCategoryAction({ ...form, parentCatId }));
  };

  return (
    <Form className="py-5" onSubmit={handleOnSubmit}>
      <Row className="g-3">
        <Col md="2">
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Status"
            name="status"
            onChange={handleOnChange}
          />
        </Col>
        <Col md="4">
          <Form.Group controlId="formGridState">
            <Form.Select
              name="parentCatId"
              defaultValue="Choose..."
              onChange={handleOnChange}
            >
              <option value="">.. Select parent category ..</option>
              {categories.map(
                (item, i) =>
                  !item.parentCatId && (
                    <option key={i} value={item._id}>
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
          />
        </Col>
        <Col md="3">
          <Button type="submit">Add category</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CategoryForm;
