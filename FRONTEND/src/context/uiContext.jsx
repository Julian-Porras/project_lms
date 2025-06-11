import { createContext, useContext, useState, useCallback } from "react";
import { ToastComponent } from "../components/Toast";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [toastShow, setToastShow] = useState(false);
  const [message, setMessage] = useState("");
  const [toastStatus, setToastStatus] = useState(200);

  const showToast = useCallback((msg, status = 200) => {
    setMessage(msg);
    setToastStatus(status);
    setToastShow(true);
  }, []);

  const hideToast = () => setToastShow(false);

  return (
    <UIContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastComponent
        message={message}
        show={toastShow}
        setShow={setToastShow}
        toastStatus={toastStatus}
      />
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
