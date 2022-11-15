import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ModalRegister from "./ModalRegister";
import ModalLogin from "./ModalLogin";

const Modal = ({ open = false, handleClose = () => {} }) => {
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setShowModalRegister(false);
        setShowModalLogin(true);
      }, 500);
    }
  }, [open]);
  console.log(showModalLogin);

  const handleRegister = () => {
    setShowModalRegister(true);
    setShowModalLogin(false);
  };
  const handleLogin = () => {
    setShowModalLogin(true);
    setShowModalRegister(false);
  };
  if (typeof document === "undefined") return <div className="modal"></div>;
  return ReactDOM.createPortal(
    <div
      className={`Modal fixed inset-0 z-50 flex items-center justify-center p-5 transition-all ${
        open ? "" : "opacity-0 invisible"
      }`}
    >
      {showModalLogin && (
        <ModalLogin
          handleClose={handleClose}
          handleRegister={handleRegister}
        ></ModalLogin>
      )}
      {showModalRegister && (
        <ModalRegister
          handleClose={handleClose}
          handleLogin={handleLogin}
        ></ModalRegister>
      )}
    </div>,
    document.querySelector("body")
  );
};
Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default Modal;
