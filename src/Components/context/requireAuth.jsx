import React from "react";
import { UserContext } from "./contextAuth";
import { Navigate } from "react-router-dom";



const RequireAuth = (props) => {

    const { auth } = React.useContext(UserContext);
    if (auth) {
        return props.children;
    }
        return <Navigate to="*" replace={true} />
};

export default RequireAuth;