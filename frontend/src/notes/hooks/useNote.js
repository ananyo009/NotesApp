import { useContext } from "react";
import { notecontext } from '../notes.context.jsx'
import {readnote ,createnote, deletenote, updatenote} from '../services/notes.api.js'



export const useNote = () => {
    const context = useContext(notecontext);
    const { setLoading, setNotes, Loading , notes } = context;

     async function handlecreateNote(title, description) {
       setLoading(true);
       try {
         const response = await createnote(title, description);
         setNotes(prevnote => prevnote ? [response, ...prevnote] : [response]);
       } catch (err) {
         console.error('Create note failed:', err);
       } finally {
         setLoading(false);
       }
     }

     async function handlereadnote() {
       setLoading(true);
       try {
         const response = await readnote();
         setNotes(response?.note ? response.note.reverse() : []);
       } catch (err) {
         console.error('Read notes failed:', err);
         setNotes([]);
       } finally {
         setLoading(false);
       }
     }
  
  async function handledeletenote(noteid) {
    setLoading(true);
    try {
      await deletenote(noteid);
      handlereadnote()
    } catch (err) {
      console.error('Delete note failed:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdatenote(noteid,description) {
    setLoading(true);
    try {
      await updatenote(noteid,description);
      handlereadnote();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
    


    return {
        handlecreateNote, handlereadnote, Loading, notes, handledeletenote, handleUpdatenote
    }
}



