import { createContext } from "react";
import { useState } from "react";


export const notecontext = createContext();


export const NotesProvider = ({children}) => {
    const [notes, setNotes] = useState([]);
    const [Loading, setLoading] = useState(false);

   

    return (
        <notecontext.Provider value={{ notes, Loading, setLoading, setNotes}}>
            {children}
        </notecontext.Provider>
    )

}