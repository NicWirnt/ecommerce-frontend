import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import {
  deletePaymentMethodAction,
  editPaymentMethodAction,
  fetchPaymentMethodsAction,
} from "../../pages/payment-method/paymentMethodAction";
import { useDispatch, useSelector } from "react-redux";
import { PaymentMethodForm } from "../payment-method-form/PaymentMethodForm";
import { EditPaymentMethodForm } from "../payment-method-form/EditPaymentMethodForm";

export const PaymentMethodTable = ({ showForm, setShowForm }) => {
  const dispatch = useDispatch();

  const { paymentMethods } = useSelector((state) => state.paymentMethod);

  useEffect(() => {
    dispatch(fetchPaymentMethodsAction());
  }, []);

  const handleOnEditForm = (_id) => {
    setShowForm(false);
    dispatch(editPaymentMethodAction(_id));
  };

  return (
    <div>
      {showForm ? <PaymentMethodForm /> : <EditPaymentMethodForm />}
      <div className="mb-2">{paymentMethods.length} Payment methods found!</div>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paymentMethods.length > 0 &&
            paymentMethods.map(({ _id, name, status, description }, i) => {
              return (
                <tr key={_id}>
                  <td>{i + 1}</td>
                  <td>{status}</td>
                  <td>
                    {name}{" "}
                    <i
                      className="fas fa-info-circle text-primary"
                      title={description}
                    ></i>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleOnEditForm(_id)}
                    >
                      <i className="fa-solid fa-pen-to-square" title="Edit"></i>
                    </Button>{" "}
                    <Button variant="danger">
                      <i
                        className="fas fa-trash-alt"
                        title="Delete"
                        onClick={() =>
                          window.confirm(
                            "Are you sure to delete this payment method?"
                          ) && dispatch(deletePaymentMethodAction(_id))
                        }
                      ></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};
