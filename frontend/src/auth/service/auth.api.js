import axios from 'axios';

const api = axios.create({
  baseURL: "https://notes-app-seven-lyart.vercel.app/notesApp",
  withCredentials: true,
});

export async function login(username, password) {
    try {
        const response = await api.post('/login', { username, password });
        return response.data;
    }
    catch (err) {
        throw err;
    }
   
}

export async function register(email, username, password) {
    try {
        const response = await api.post('/register', {
            email,
            username,
            password
        })
        return response.data;
    }
        catch(err) {
        throw err;
        }
}

export async function getMe() {
    const response = await api.get('/getme');
    return response.data;
}

export async function logout() {
  const response = await api.get("/logout");
  return response.data;
}

