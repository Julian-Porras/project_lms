import { useEffect } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import { useContext } from "react";

export function usePrompt(message, when) {
  const navigator = useContext(NavigationContext).navigator;

  useEffect(() => {
    if (!when) return;

    const push = navigator.push;

    const confirmNavigation = (to, state, method) => {
      const confirmed = window.confirm(message);
      if (confirmed) {
        push.call(navigator, to, state, method);
      }
      // Don't proceed unless confirmed
    };

    navigator.push = function (to, state, method) {
      confirmNavigation(to, state, method);
    };

    return () => {
      navigator.push = push; // Restore original push method
    };
  }, [when, message, navigator]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!when) return;
      e.preventDefault();
      e.returnValue = message;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [when, message]);
}
