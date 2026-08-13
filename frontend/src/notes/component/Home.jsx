import React, { useEffect } from 'react'
import '../styles/home.scss'
import { useNote } from '../hooks/useNote.js'
import { useAuth } from '../../auth/hook/useAuth.js'
import { useForm } from 'react-hook-form'
import Note from './Note.jsx'
import { useNavigate } from 'react-router'
  
const Home = () => {

    const { register, handleSubmit, reset } = useForm();

    const { user, handlegetme, handlelogout } = useAuth();
   
    const { handlecreateNote, handlereadnote,handledeletenote, Loading, notes , handleUpdatenote} = useNote();
    
    
    const navigate = useNavigate()
    

     async function create(data) {
       const { title, description } = data;
       await handlecreateNote(title, description);
       reset();
    }
    
    async function deleteNote(noteid) {
        await handledeletenote(noteid);
    }
    
    async function updateNote(noteid,description) {
        await handleUpdatenote(noteid, description);
    }

    async function logoutuser() {
        await handlelogout();
        navigate("/login");
    }
    
    useEffect(() => {
      handlereadnote();
      handlegetme();
    }, []);
   
    
    if (Loading || !notes) {
        return (<h1 style={{color:"white"}}>Loading ...</h1>)
    }



    

    console.log(notes);
    

    return (
        <div className='main'>
            <div className='nav-bar'>
                <div className='nav'>
              <h1>NotesApp</h1>
              <h2>{user?.username} </h2>
                </div> 
                <button  onClick={logoutuser} className="logout">logout</button>
            </div>
         
          <div className='form-container'>
              <form className='form-box' onSubmit={handleSubmit((data)=>create(data))}>
                  <label>Title:</label>
                  <input {...register('title')} type="text" placeholder='enter your title' />
                  <label>Description:</label>
                  <textarea {...register('description')}  placeholder='enter your description' row='5' col='33'></textarea>
                <button className='btn' type="submit">Add note</button>
              </form>

              <div className='notes'>
                  {
                      notes.map((item, idx) => {
                          return <Note key={idx} item={item} idx={idx} deleteNote={deleteNote} updateNote={updateNote} />
                      })
                 }
                </div>

          </div>

      </div>
  )
}

export default Home