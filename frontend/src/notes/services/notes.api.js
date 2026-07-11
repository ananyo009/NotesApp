import axios from 'axios';

const api = axios.create({
  baseURL: "https://notes-app-seven-lyart.vercel.app/notesApp/notes",
  withCredentials: true,
});

export async function createnote(title,description){
    const response = await api.post('/create',{
        title,
       description
    })
    return response.data;
}

export async function readnote() {
    const response = await api.get('/read');
    return response.data;
}

export async function deletenote(noteid) {
    const response = await api.delete(`/delete/${noteid}`);
   
    return response.data
}

export async function updatenote(noteid,description) {
    const response = await api.patch(`/partialupdate/${noteid}`, {
        description
    });
    return response.data
}
