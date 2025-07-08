import { createContext, useReducer } from "react";

export const UrlContext = createContext();

export const UrlReducer = (state, action) => {
    switch(action.type){
        case 'SET_URL':
            return {url: action.payload};
        default:
            return state;
    }
}

export const UrlContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(UrlReducer, { url: 'http://localhost:3000/user/get-transaction' });

    return(
        <UrlContext.Provider value={{...state, dispatch}}>
            {children}
        </UrlContext.Provider>
    )
}