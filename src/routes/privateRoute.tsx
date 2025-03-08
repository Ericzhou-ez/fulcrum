import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/user-context";
import Loading from "../components/core/loading";

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
   children,
}) => {
   const { signedIn, loading } = useAuth();

   if (loading) {
      return null;
   }

   return signedIn ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
