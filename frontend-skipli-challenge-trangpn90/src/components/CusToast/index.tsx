import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../../contexts/GlobalContext";

const CusToast = (): React.ReactElement => {
  const { state, setState } = useGlobalContext();

  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast
        onClose={() =>
          setState((preState) => ({ ...preState, isShowToast: false }))
        }
        show={state.isShowToast === undefined ? false : state.isShowToast}
        delay={4600}
        autohide
        bg={state.typeToast?.toLowerCase() || "primary"}
      >
        <Toast.Header>
          <FontAwesomeIcon icon={faNewspaper} className="me-2" />
          <strong className="me-auto">Notifications</strong>
        </Toast.Header>
        <Toast.Body>{state.contentToast}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CusToast;
