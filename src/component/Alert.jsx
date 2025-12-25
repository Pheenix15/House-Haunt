import React from "react";
import { useAlert } from "../Context/AlertContext";
import './Alert.css'

const Alert = () => {
  const { successAlert, failAlert } = useAlert();

  return (
    <div className="alert">
      {successAlert && (
        <div className="success-alert" >
          {successAlert}
        </div>
      )}
      {failAlert && (
        <div className="fail-alert" >
          {failAlert}
        </div>
      )}
    </div>
  );
};

export default Alert;
