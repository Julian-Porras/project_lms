import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { ToastComponent } from "../components/Toast";
import { ROLES } from "../constants/role";
import { useAuth } from "./authContext";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const { user } = useAuth();

  const [toastShow, setToastShow] = useState(false);
  const [message, setMessage] = useState("");
  const [toastStatus, setToastStatus] = useState(200);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const roleBasePathMap = {
    [ROLES.DEVELOPER]: "/dev",
    [ROLES.ADMIN]: "/admin",
  };
  const basePath = roleBasePathMap[user?.role_id] || "/";
  useEffect(() => {
    if (user?.role_id) {
      setBreadcrumbs([
        {
          label: "Dashboard",
          link: `${basePath}/dashboard`,
          active: true,
        },
      ]);
    }
  }, [user?.role_id]);

  const showToast = useCallback((msg, status = 200) => {
    setMessage(msg);
    setToastStatus(status);
    setToastShow(true);
  }, []);

  const hideToast = () => setToastShow(false);

  const resetBreadcrumbs = useCallback(() => {
    setBreadcrumbs([
      {
        label: "Dashboard",
        link: `${basePath}/dashboard`,
        active: true,
      },
    ]);
  }, [basePath]);

  const newBreadcrumb = useCallback(
    (label, path, active = false) => {
      const fullPath = `${basePath}${path}`;
      setBreadcrumbs((prev) => {
        const updated = prev.map((b) => ({ ...b, active: false })); // deactivate all
        return [...updated, { label, link: fullPath, active }];
      });
    },
    [basePath]
  );

  return (
    <UIContext.Provider
      value={{
        showToast,
        hideToast,
        breadcrumbs,
        setBreadcrumbs,
        resetBreadcrumbs,
        newBreadcrumb,
      }}
    >
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
