import { useContext } from "react";
import {
    Route,
    Redirect,
} from "react-router-dom";
import { AuthContext } from "./context";

export function PrivateRoute({ children, ...rest }) {
    const { user } = useContext(AuthContext);
    
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/SignIn",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}