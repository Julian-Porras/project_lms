import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { ToastComponent } from "../components/Toast";
import { ROLES } from "../constants/role";
import { useAuth } from "./authContext";
import { usePrompt } from "../hooks/usePrompt";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const { user } = useAuth();

  const [isBlocking, setIsBlocking] = useState(false);
  const [blockMessage, setBlockMessage] = useState("You have unsaved changes. Are you sure you want to leave?");

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


  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isBlocking) return;
      e.preventDefault();
      e.returnValue = ""; // Required for Chrome
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isBlocking]);

  usePrompt(blockMessage, isBlocking)
  return (
    <UIContext.Provider
      value={{
        showToast,
        hideToast,
        breadcrumbs,
        setBreadcrumbs,
        resetBreadcrumbs,
        newBreadcrumb,
        isBlocking,
        setIsBlocking,
        blockMessage,
        setBlockMessage,
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
