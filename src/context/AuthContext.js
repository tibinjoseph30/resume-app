import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  currentUser: null
};

const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
    return (
      <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
        {children}
      </AuthContext.Provider>
    );
  };

export { AuthContext, AuthProvider };