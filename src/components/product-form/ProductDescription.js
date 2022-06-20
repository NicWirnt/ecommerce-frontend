import React, { useEffect } from "react";
import { useState } from "react";
import { MyVerticallyCenteredModal } from "../modal/Modal";

export const ProductDescription = ({ selectedProduct }) => {
  const [description, setDescription] = useState(selectedProduct);

  useEffect(() => {
    setDescription(selectedProduct);
  }, [selectedProduct]);

  return (
    <MyVerticallyCenteredModal title="Product Description">
      {selectedProduct.description}
    </MyVerticallyCenteredModal>
  );
};
