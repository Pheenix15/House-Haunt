import { createContext, useState, useContext, useCallback } from "react";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [successAlert, setSuccessAlert] = useState("");
  const [failAlert, setFailAlert] = useState("");

  const showSuccess = useCallback((message) => {
    setSuccessAlert(message);
    setTimeout(() => setSuccessAlert(""), 5000);  //close after 5s
  }, []);

  const showFail = useCallback((message) => {
    setFailAlert(message);
    setTimeout(() => setFailAlert(""), 5000);
  }, []);

  return (
    <AlertContext.Provider value={{ successAlert, failAlert, showSuccess, showFail }}>
      {children}
    </AlertContext.Provider>
  );
};
