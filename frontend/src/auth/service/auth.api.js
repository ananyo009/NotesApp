import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000/notesApp/auth",
  withCredentials: true,
});

export async function login(username, password) {
        const response = await api.post('/login', { username, password });
    return response.data;
   
}

export async function register(email, username, password) {
    
        const response = await api.post('/register', {
            email,
            username,
            password
        })
    return response.data;
}

export async function getMe() {
    const response = await api.get('/getme');
    return response.data;
}

