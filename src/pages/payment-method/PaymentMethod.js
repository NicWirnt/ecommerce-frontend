import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { PaymentMethodForm } from "../../components/payment-method-form/PaymentMethodForm";
import { PaymentMethodTable } from "../../components/payment-method-table/PaymentMethodTable";
import { toggleModal } from "../../system-state/systemSlice";
import AdminLayout from "../layouts/AdminLayout";

export const PaymentMethod = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  const handleOnDisplayModal = () => {
    setShowForm(true);
    dispatch(toggleModal());
  };

  return (
    <AdminLayout>
      {showForm && <PaymentMethodForm />}
      <Row>
        <Col className="mb-2 mt-2">
          <h2>Payment Methods</h2>
        </Col>
      </Row>
      <Row>
        <Col
          className="text-end"
          variant="primary"
          onClick={handleOnDisplayModal}
        >
          <Button>
            <i className="fas fa-plus-circle"></i> Add New Payment Method
          </Button>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <PaymentMethodTable showForm={showForm} setShowForm={setShowForm} />
        </Col>
      </Row>
    </AdminLayout>
  );
};
