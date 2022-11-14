import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ProductInfo } from "../../components/product-information/ProductInfo";
import { toggleModal } from "../../system-state/systemSlice";
import AdminLayout from "../layouts/AdminLayout";
import { fetchSingleProductAction } from "../product/productAction";

import { getReviewAction } from "./reviewAction";

export const Reviews = () => {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.reviews);
  const { selectedProduct } = useSelector((state) => state.productStore);

  useEffect(() => {
    dispatch(getReviewAction());
  }, []);

  const handleOnProductClick = (productId) => {
    dispatch(fetchSingleProductAction(productId));

    dispatch(toggleModal());
  };

  return (
    <AdminLayout>
      <ProductInfo selectedProduct={selectedProduct} />
      <h3 className="py-3">Reviews by Customer</h3>
      <hr />
      <Table className="stripped">
        <thead>
          <tr>
            <td>#</td>
            <td>Product Name</td>
            <td>Rating</td>
            <td>Review</td>
            <td>Reviewer Name</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {reviews.map((item, i) => (
            <tr>
              <td>{i + 1}</td>
              {/* <td>
                <Button onClick={() => handleOnProductClick(item.productId)}>
                  {item.productId}
                </Button>
              </td> */}
              <td>{item.productName}</td>
              <td>{item.rating}</td>
              <td>{item.review}</td>
              <td>{item.reviewedBy}</td>
              <td>
                <Button variant="warning">Edit</Button>{" "}
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  );
};
