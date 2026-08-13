import { useContext } from "react";
import { Authcontext } from '../auth.context.jsx'
import { login, register, getMe, logout } from "../service/auth.api.js"


export const useAuth = () => {
    const context = useContext(Authcontext);

    const { loading, user , setLoading, setUser } = context;

  const handlelogin = async (username, password) => {
       
    setLoading(true);
    try {
      const response = await login(username, password);
      setUser(response.user);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
     };

  const handleregister = async (email, username, password) => {
    try {
      setLoading(true);
      const response = await register(email, username, password);
      setUser(response.user);
      setLoading(false);
    }
    catch (err) {
      throw err;
    }
     };

  const handlegetme = async () => {
    try {
         
      setLoading(true);
      const response = await getMe();
      setUser(response.user);
      setLoading(false);
    } catch (err) {
      throw err;
    }
  }

  async function handlelogout() {
    await logout();
  }
    
    return {
        user , loading, handlelogin , handleregister , handlegetme, handlelogout
    }

}