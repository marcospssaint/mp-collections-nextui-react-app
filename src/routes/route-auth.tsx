import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth";


export function RequireAuth({ children }: { children: JSX.Element }) {
  let { signed } = useAuth();
  let location = useLocation();

  if (!signed) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

interface RouteAuthProps {
  children: JSX.Element;
}

export const RouteAuth = ({ children }: RouteAuthProps) => {
  return (
    <>
      <RequireAuth>
        {children}
      </RequireAuth>
    </>
  );
}