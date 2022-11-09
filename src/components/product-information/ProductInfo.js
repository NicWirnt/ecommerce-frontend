import React, { useState } from "react";
import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { MyVerticallyCenteredModal } from "../modal/Modal";

export const ProductInfo = ({ selectedProduct }) => {
  const [data, setData] = useState(selectedProduct);

  useEffect(() => {
    setData(selectedProduct);
  }, [selectedProduct]);

  return (
    <MyVerticallyCenteredModal title="Product Information">
      <ListGroup variant="flush">
        <ListGroup.Item>{data._id}</ListGroup.Item>
        <ListGroup.Item>{data.name}</ListGroup.Item>
        <ListGroup.Item>{data.description}</ListGroup.Item>
        <ListGroup.Item>{data.catId}</ListGroup.Item>
        <ListGroup.Item>{data.qty}</ListGroup.Item>
        <ListGroup.Item>{data.price}</ListGroup.Item>
      </ListGroup>
    </MyVerticallyCenteredModal>
  );
};
