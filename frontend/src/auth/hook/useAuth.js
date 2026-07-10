import { useContext } from "react";
import { Authcontext } from '../auth.context.jsx'
import { login, register, getMe } from "../service/auth.api.js"


export const useAuth = () => {
    const context = useContext(Authcontext);

    const { loading, user , setLoading, setUser } = context;

     const handlelogin = async (username, password) => {
       setLoading(true);
       const response = await login(username, password);
       setUser(response.user);
       setLoading(false);
     };

     const handleregister = async (email, username, password) => {
       setLoading(true);
       const response = await register(email, username, password);
       setUser(response.user);
       setLoading(false);
     };

     const handlegetme = async () => {
       setLoading(true);
       const response = await getMe();
       setUser(response.user);
       setLoading(false);
    };
    
    return {
        user , loading, handlelogin , handleregister , handlegetme
    }

}