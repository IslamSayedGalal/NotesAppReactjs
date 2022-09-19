// Import All The Data That Used In File
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Plus } from 'react-feather';
import { useSelector } from 'react-redux';
import './Modal.css';




function ExModal({showModal,setShowModal,refresher}) {

  // useState That Used In File 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [background, setBackground] = useState("#F9F5EB");
  const [foreground, setForeground] = useState("#fff");
  const [priority, setPriority] = useState("normal")

  const globalState = useSelector((state)=>state);


  // Function For Handle Addition Operation
  const handleAdd=()=>{
    const savedData = JSON.parse(localStorage.getItem("myNotes")) || []

    if(!title || !content){
        return alert('Title And Content Are Required');
    }
    
    let newData={
        id: Date.now(),
        title,
        content,
        priority,
        background,
        foreground,
        date: new Date().toLocaleDateString()
    }

    savedData.push(newData);
    localStorage.setItem("myNotes", JSON.stringify(savedData));
    setTitle("");
    setContent("");
    setPriority("normal");
    setShowModal(false);
    refresher();
  }


  // Function For Handle Change Colors Operation
  const handleColor=(bg,fg)=>{
    setBackground(bg);
    setForeground(fg);
  }


  // Function For Handle Cancel Operation
  const handleCancel = () =>{
    setTitle("");
    setContent("");
    setPriority("normal");
    setShowModal(false);
  }
  


  return (
    globalState.toggleColor.toggleColor?

    <>
      <Modal show={showModal} onHide={()=>setShowModal(false)}>

        {/* Start Header Section */}
        <Modal.Header closeButton>
          <Modal.Title>Add New Note</Modal.Title>
        </Modal.Header>
        {/* End Header Section */}


        {/* Start Body Section */}
        <Modal.Body>

            {/*Start Input for Title  */}
            <input className="form-control mb-3" placeholder="Enter Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            {/*End Input for Title  */}


            {/* Start POP Menu* For Seclect Priority */}
            <label>Priority</label>
            <select className="form-control mb-3" value={priority} onChange={(e)=>setPriority(e.target.value)}>
                <option value="normal">Normal</option>
                <option value="high">High</option>
            </select>
            {/* End POP Menu* For Seclect Priority */}



            {/* Start TextArea For Message */}
            <textarea className="form-control" style={{height: '180px'}} placeholder="Enter notes...." value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
            {/* End TextArea For Message */}


            {/* Start DropDownButton for Choose Colors Theme */}
            <DropdownButton id="dropdown-basic-button" title="Select Theme">
                <Dropdown.Item href="#/action-1">
                    <div className="d-flex"  onClick={()=>handleColor('#16213E','#0F3460')}>
                        <div className='circle' style={{backgroundColor:'#16213E'}}></div> 
                        <div className='circle mx-3' style={{backgroundColor:'#0F3460'}}></div>
                    </div>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                    <div className="d-flex"  onClick={()=>handleColor('#483838','#42855B')}>
                        <div className='circle' style={{backgroundColor:'#483838'}}></div> 
                        <div className='circle mx-3' style={{backgroundColor:'#42855B'}}></div>
                    </div>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                    <div className="d-flex"  onClick={()=>handleColor('#54BAB9','#9ED2C6')}>
                        <div className='circle' style={{backgroundColor:'#54BAB9'}}></div> 
                        <div className='circle mx-3' style={{backgroundColor:'#9ED2C6'}}></div>
                    </div>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-4">
                    <div className="d-flex"  onClick={()=>handleColor('#A62349','#D07000')}>
                        <div className='circle' style={{backgroundColor:'#A62349'}}></div> 
                        <div className='circle mx-3 shadow' style={{backgroundColor:'#D07000'}}></div>
                        Default
                    </div>
                </Dropdown.Item>
            </DropdownButton>
            {/* End DropDownButton for Choose Colors Theme */}


        </Modal.Body>       
       {/* End Body Section */}



       {/* Start Footer Section */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            <Plus/> Add
          </Button>
        </Modal.Footer>
       {/* End Footer Section */}



      </Modal>
    </>

    :

    <>
    <Modal show={showModal} onHide={()=>setShowModal(false)}>

      {/* Start Header Section */}
      <Modal.Header closeButton className="bg-dark m-0">
        <Modal.Title className="text-light">Add New Note</Modal.Title>
      </Modal.Header>
      {/* End Header Section */}


      {/* Start Body Section */}
      <Modal.Body className="bg-dark border-primary m-0">

          {/*Start Input for Title  */}
          <input className="form-control mb-3 bg-dark text-light border-primary" placeholder="Enter Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
          {/*End Input for Title  */}


          {/* Start POP Menu* For Seclect Priority */}
          <label className="text-light">Priority</label>
          <select className="form-control mb-3 bg-dark text-light border-primary" value={priority} onChange={(e)=>setPriority(e.target.value)}>
              <option value="normal">Normal</option>
              <option value="high">High</option>
          </select>
          {/* End POP Menu* For Seclect Priority */}



          {/* Start TextArea For Message */}
          <textarea className="form-control bg-dark text-light border-primary" style={{height: '180px'}} placeholder="Enter notes...." value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
          {/* End TextArea For Message */}


          {/* Start DropDownButton for Choose Colors Theme */}
          <div className="bg-dark">
          <DropdownButton className="bg-dark" id="dropdown-basic-button" title="Select Theme">
          <div className="bg-dark">
              <Dropdown.Item href="#/action-1" >
                  <div className="d-flex"  onClick={()=>handleColor('#16213E','#0F3460')}>
                      <div className='circle' style={{backgroundColor:'#16213E'}}></div> 
                      <div className='circle mx-3' style={{backgroundColor:'#0F3460'}}></div>
                  </div>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                  <div className="d-flex"  onClick={()=>handleColor('#483838','#42855B')}>
                      <div className='circle' style={{backgroundColor:'#483838'}}></div> 
                      <div className='circle mx-3' style={{backgroundColor:'#42855B'}}></div>
                  </div>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                  <div className="d-flex"  onClick={()=>handleColor('#AfB4FF','#B1E1FF')}>
                      <div className='circle' style={{backgroundColor:'#AfB4FF'}}></div> 
                      <div className='circle mx-3' style={{backgroundColor:'#B1E1FF'}}></div>
                  </div>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-4">
                  <div className="d-flex text-light"  onClick={()=>handleColor('#A62349','#D07000')}>
                      <div className='circle' style={{backgroundColor:'#A62349'}}></div> 
                      <div className='circle mx-3 shadow' style={{backgroundColor:'#D07000'}}></div>
                      Default
                  </div>
              </Dropdown.Item>
          </div>
          </DropdownButton>
          </div>
          {/* End DropDownButton for Choose Colors Theme */}


      </Modal.Body>       
     {/* End Body Section */}



     {/* Start Footer Section */}
      <Modal.Footer className="bg-dark">
        <Button variant="secondary" onClick={handleCancel} className="text-dark">
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAdd} className="text-dark">
          <Plus/> Add
        </Button>
      </Modal.Footer>
     {/* End Footer Section */}



    </Modal>
  </>
    
  );
}

export default ExModal;


