import React, { useState } from 'react';
import { Check, PenTool, Trash } from 'react-feather';
import {Rating} from 'react-simple-star-rating';
import { useSelector } from 'react-redux';
import './SingleNote.css';

const SingleNote=({item, refresher})=> {
  const [rating, setRating] = useState(item.priority === "high" ? true:false);
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(item.content);

  const globalState = useSelector((state)=>state);

  let savedData = JSON.parse(localStorage.getItem("myNotes")) || [];

  const handleDelete = () =>{
    const pass = window.confirm("Are You Sure You Want to Delete this note");

    if(!pass){
      return
    }

    if(savedData.length){
      let newData = savedData.filter((data)=> data.id !== item.id)
      localStorage.setItem("myNotes", JSON.stringify(newData));

      //window.reload();
      refresher();
    }
  }


  const handleEdit = () =>{
    let index = savedData.findIndex((x)=> x.id === item.id);
    savedData[index].content = content;
    localStorage.setItem("myNotes", JSON.stringify(savedData));
    setEdit(false);

    // window.reload;
    refresher();
  }



  const handleRating = () => {
    let rate = !item.priority;
    setRating(rate);
    // other logic
    refresher();
  }

  return (
      globalState.toggleColor.toggleColor ?

      // ----------------------------------- Light Mode ----------------------------
      <div className="px-2 col-lg-3 col-md-4 col-sm-6 h-100 mb-5">
        <div className="card shadow px-2" style={{backgroundColor: `${item.background}`}}>
          <div className="title-div w-100 text-center">
            <div className="priority text-center text-light shadow">
              <p className="text-light fw-light mb-0">Priority</p>
              <Rating onClick={handleRating} ratingValue={rating} iconsCount={1} transition={true} className='star'/>
              {rating?
              <p className="fw-bold text-warning">High</p>
              :
              <p className="text-light">Normal</p>
              }
            </div> 
            <h1 className="fw-light text-light">{item.title}</h1>
          </div>
          <div className="content">
            <textarea className="form-control text-light" disabled={!edit} value={content} onChange={(e)=>setContent(e.target.value)} style={{backgroundColor: `${item.foreground}`}}></textarea>
          </div>
          <section className="d-flex justify-content-between my-2">
            {!edit ?
              <button className="btn btn-outline-warning btn-sm shadow" onClick={()=>setEdit(true)}><PenTool/></button>
              :
              <button className="btn btn-outline-primary btn-sm shadow" onClick={handleEdit}><Check/></button>
            }
            <button className="btn btn-outline-primary btn-sm shadow" onClick={handleDelete}><Trash/></button>
          </section>
        </div>
      </div>

      :
      // ----------------------------------- Dark Mode  ----------------------------

      <div className="px-2 col-lg-3 col-md-4 col-sm-6 h-100 mb-5 ">
      <div className="card shadow px-2" style={{backgroundColor: `${item.background}`}}>
        <div className="title-div w-100 text-center">
          <div className="priority text-center text-light shadow">
            <p className="text-light fw-light mb-0">Priority</p>
            <Rating onClick={handleRating} ratingValue={rating} iconsCount={1} transition={true} className='star'/>
            {rating?
            <p className="fw-bold text-warning">High</p>
            :
            <p className="text-light">Normal</p>
            }
          </div> 
          <h1 className="fw-light text-light">{item.title}</h1>
        </div>
        <div className="content">
          <textarea className="form-control text-light" disabled={!edit} value={content} onChange={(e)=>setContent(e.target.value)} style={{backgroundColor: `${item.foreground}`}}></textarea>
        </div>
        <section className="d-flex justify-content-between my-2">
          {!edit ?
            <button className="btn btn-outline-warning btn-sm shadow" onClick={()=>setEdit(true)}><PenTool/></button>
            :
            <button className="btn btn-outline-primary btn-sm shadow" onClick={handleEdit}><Check/></button>
          }
          <button className="btn btn-outline-primary btn-sm shadow" onClick={handleDelete}><Trash/></button>
        </section>
      </div>
    </div>
  )
}

export default  SingleNote;