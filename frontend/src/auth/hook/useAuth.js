import { useContext } from "react";
import { Authcontext } from '../auth.context.jsx'
import { login, register, getMe, logout } from "../service/auth.api.js"
import { useEffect } from "react";
import axios from "axios";


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
    }
    catch (err) {
      throw err;
    } finally {
      setLoading(false)
    }
     };

  const handlegetme = async () => {
    setLoading(true);
    try {
      const response = await getMe();
      setUser(response.user);
    } catch (err) {
      setUser(null);
      console.error('Get user failed:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handlelogout() {
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setUser(null);
    }
  }
    
    return {
      user,
      loading,
      handlelogin,
      handleregister,
      handlegetme,
      handlelogout,
    };

}