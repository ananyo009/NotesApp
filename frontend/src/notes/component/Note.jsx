import React from 'react'
import '../styles/note.scss'
import { SquarePen } from "lucide-react";
import { Trash2 } from "lucide-react";

const Note = ({ item, idx , deleteNote , updateNote}) => {
  return (
    <div>
      <div className="note">
        <h2>{item?.title}</h2>
        <h3>{item?.description}</h3>
             
          </div>
           <div className='butt'>
        <button className='edit'
          onClick={() => {
          const desc = prompt("enter the description")
          updateNote(item._id, desc);
          }} >
          <SquarePen color="yellow" />
        </button>
        
              <button className='remove' onClick={()=>deleteNote(item._id)}><Trash2 color="red"/></button>
          </div> 
    </div>
  );
}

export default Note