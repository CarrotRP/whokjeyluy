import { useReducer } from "react";
import { createContext } from "react";

export const LenderContext = createContext();

export const LenderReducer = (state, action) => {
    switch(action.type){
        case 'SET_USER':
            return {user: action.payload};
        case 'LOGOUT':
            return {user: null};
        default:
            return state;
    }
}

export const LenderContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(LenderReducer, {user: null});

    return(
        <LenderContext.Provider value={{...state, dispatch}}>
            {children}
        </LenderContext.Provider>
    );
}