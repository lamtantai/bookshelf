import { replace, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import useUser from "../features/authentication/hooks/useUser";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login", { replace: "true" });
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return;

  if (isAuthenticated) return children;
}
