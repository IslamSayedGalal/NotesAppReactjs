import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {toggleColor} from '../../store/toggleSlice';
import { Mic, MicOff, Moon, Plus, RefreshCcw, Search, Sun, Trash2, } from 'react-feather';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import logo from '../../assest/Logo.png';
import './Nav.css';

const Nav=({setShowModal, data, setData, refresher})=> {

  const globalState = useSelector((state)=>state);
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] =  useState('');
  const [mic, setMic] =  useState(false);

  const {
    transcript
  } = useSpeechRecognition();
  // Function To Delete All Note Items
  const deleteAll =()=>{
    const pass = window.confirm("Are You Sure You Want To Delete All Notes ?");
    if(!pass){
      return
    }
    localStorage.removeItem("myNotes");
    // Window.location.reload()
    refresher();
  }


  // Function To Show Stored Note Items
  const sortsFunc = (option)=>{
    if(option === "latest"){
      data.sort((x,y)=>x.id-y.id);
    }
    if(option === "oldest"){
      data.sort((x,y)=>y.id-x.id);
    }
    if(option === "high"){
      data.sort((x,y)=> x.priority.localeCompare(y.priority));
    }
    if(option === "normal"){
      data.sort((x,y)=>y.priority.localeCompare(x.priority));
    }
    setData([...data]);
  }


  // Function To Search On Note Items
  const search=(e)=>{
    e.preventDefault();
    let newData;
    if(searchValue){
      newData = data.filter((x)=> x.title.toLowerCase().includes(searchValue.toLowerCase()));
      setData([...newData]);
    }
    else{
      // window.location.reload()
      refresher();
    }
  }

  
useEffect(()=>{
  if(mic === true){
      SpeechRecognition.startListening({continuous: true});
  }else{
    SpeechRecognition.stopListening();
  }
  console.log(transcript.slice(0,-1));
  setSearchValue(transcript.slice(0,-1));
},[mic, transcript]);

  return (
    globalState.toggleColor.toggleColor ?

    // ------------------------------------- Light Mode ---------------------------
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="/"><img src={logo} alt="My Notes"/></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav mb-2 mb-lg-0">
          <li className="nav-item dropdown my-3">
            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" href='/'>
              Sort By:
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href='/' onClick={()=>sortsFunc("latest")}>Latest first</a></li>
              <li><a className="dropdown-item" href='/' onClick={()=>sortsFunc("oldest")}>Oldest first</a></li>
              <li><a className="dropdown-item" href='/' onClick={()=>sortsFunc("high")}>Priority high</a></li>
              <li><a className="dropdown-item" href='/' onClick={()=>sortsFunc("normal")}>Priority normal</a></li>
            </ul>
          </li>
  
          <li className='nav-item mx-2'>
              <button className='nav-link btn btn-sm btn-info text-light px-2 my-3' onClick={()=>{dispatch(toggleColor())}}>{globalState.toggleColor.toggleColor?<Sun/> :<Moon/>}</button>
          </li>

          <li className='nav-item mx-2'>
              <button className='nav-link btn btn-sm btn-info text-light px-2 my-3' onClick={()=>setShowModal(true)}><Plus/></button>
          </li>
          <li className='nav-item mx-2'>
              <button className='nav-link btn btn-sm btn-danger text-light px-2 my-3' onClick={deleteAll}><Trash2/></button>
          </li>
  
        </ul>
        <form className="d-flex" onSubmit={search}>
          {
            mic?
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSearchValue(e.target.value)} value={transcript} />
            :
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSearchValue(e.target.value)} />
          }
          <button className="btn btn-outline-success me-2" type="submit">{searchValue ?<Search/> : <RefreshCcw/>}</button>
          <button className="btn btn-outline-primary" type="submit" onClick={()=>setMic(!mic)}>{mic?<Mic/>: <MicOff/>}</button>
        </form>
      </div>
    </div>
    </nav>
  :


    // ------------------------------------- Dark Mode ----------------------------
    <nav className="navbar navbar-expand-lg navbar-dark" style={{background: "#111111"}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/"><img src={logo} alt="My Notes"/></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item dropdown my-3">
              <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" href='/'>
                Sort By:
              </a>
              <ul className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item text-light" href='/' onClick={()=>sortsFunc("latest")}>Latest first</a></li>
                <li><a className="dropdown-item text-light" href='/' onClick={()=>sortsFunc("oldest")}>Oldest first</a></li>
                <li><a className="dropdown-item text-light" href='/' onClick={()=>sortsFunc("high")}>Priority high</a></li>
                <li><a className="dropdown-item text-light" href='/' onClick={()=>sortsFunc("normal")}>Priority normal</a></li>
              </ul>
            </li>

            <li className='nav-item mx-2'>
                <button className='nav-link btn btn-sm btn-info text-light px-2 my-3' onClick={()=>{dispatch(toggleColor())}}>{globalState.toggleColor.toggleColor?<Sun/> :<Moon/>}</button>
            </li>

            <li className='nav-item mx-2'>
                <button className='nav-link btn btn-sm btn-info text-light px-2 my-3' onClick={()=>setShowModal(true)}><Plus/></button>
            </li>
            <li className='nav-item mx-2'>
                <button className='nav-link btn btn-sm btn-danger text-light px-2 my-3' onClick={deleteAll}><Trash2/></button>
            </li>

          </ul>
          <form className="d-flex" onSubmit={search}>
            {
              mic?
              <input className="form-control me-2 bg-dark text-light border-primary" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSearchValue(e.target.value)} value={transcript} />
              :
              <input className="form-control me-2 bg-dark text-light border-primary" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSearchValue(e.target.value)} />
            }
            <button className="btn btn-outline-success me-2" type="submit">{searchValue ?<Search/> : <RefreshCcw/>}</button>
            <button className="btn btn-outline-primary" type="submit" onClick={()=>setMic(!mic)}>{mic?<Mic/>: <MicOff/>}</button>
          </form>
        </div>
      </div>
    </nav>

)
}

export default Nav;
