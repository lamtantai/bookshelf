import { Outlet } from "react-router-dom";

import ProtectedRoute from "../../../components/ProtectedRoute";

export default function BookshelfLayout() {
  return (
    <div>
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    </div>
  );
}
