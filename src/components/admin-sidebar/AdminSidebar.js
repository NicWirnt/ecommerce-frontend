import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../system-state/systemSlice";

export const AdminSidebar = () => {
  const dispatch = useDispatch();
  const { showAdminSideBar } = useSelector((state) => state.system);

  return (
    <>
      {/* <Button variant="primary">
        <i class="fa-solid fa-bars"></i>
      </Button> */}

      <Offcanvas
        show={showAdminSideBar}
        onHide={() => dispatch(toggleSidebar())}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
