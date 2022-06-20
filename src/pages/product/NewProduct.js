import React from "react";
import { useEffect } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../category/categoryAction";
import AdminLayout from "../layouts/AdminLayout";

export const NewProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, []);

  console.log(categories);

  return (
    <AdminLayout>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Product Name" />
          </Form.Group>

          <Form.Group as={Col} controlId="">
            <Form.Label>SKU</Form.Label>
            <Form.Control type="text" placeholder="Input SKU" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="">
          <Form.Label>Description</Form.Label>
          <Form.Control placeholder="Input the product description here" />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="">
            <Form.Label>QTY</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="">
            <Form.Label>Category</Form.Label>
            <Form.Select>
              <option>Choose...</option>
              {categories.map((item, i) => {
                <>
                  <option value={item._id}>{item.catName}</option>
                </>;
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="">
            <Form.Label>Price</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </AdminLayout>
  );
};
