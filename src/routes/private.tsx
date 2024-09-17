import type * as React from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute(props: { children: React.ReactNode }) {
  return localStorage.getItem("userID") ? (
    props.children
  ) : (
    <Navigate to="/login" />
  );
}
