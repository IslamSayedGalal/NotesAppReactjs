import React, { useEffect, useState } from 'react';
import { Frown } from 'react-feather';
import ExModal from '../Components/Modal/Modal';
import Nav from '../Components/Navbar/Nav';
import SingleNote from '../Components/SingleNote/SingleNote';
import { useSelector } from 'react-redux';
import './Home.css';

const Home = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const globalState = useSelector((state)=>state);


  // useEffect to fetch data from localStorage
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('myNotes')) || []);
  }, [])

  // function to refresh The site and fetch data
  const refresher = () => {
    setData(JSON.parse(localStorage.getItem("myNotes")) || []);
  }

  return (
    globalState.toggleColor.toggleColor?
    <div>
      <Nav setShowModal={setShowModal} data={data} setData={setData} refresher={refresher} />
      <div className="HomeSection">
      {showModal &&
        <ExModal showModal={showModal} setShowModal={setShowModal} refresher={refresher} />
      }

      {/* notes */}
      <div className='row justify-content-between mx-0 p-5'>
        {data.length > 0 ?
          data.map((item, i) => (
            <SingleNote key={item.id} item={item} refresher={refresher} />
          ))
          :
          <h1 className='text-center display-1 fw-light text-seconday my-5'>
            <Frown size={100} /> No Notes. Create new one.
          </h1>
        }
      </div>
    </div>
    </div>
    :
    <div className='bg-dark'>
    <Nav setShowModal={setShowModal} data={data} setData={setData} refresher={refresher} />
    <div className="HomeSection">
    {showModal &&
      <ExModal showModal={showModal} setShowModal={setShowModal} refresher={refresher} />
    }

    {/* notes */}
    <div className='row justify-content-between mx-0 p-5'>
      {data.length > 0 ?
        data.map((item, i) => (
          <SingleNote key={item.id} item={item} refresher={refresher} />
        ))
        :
        <h1 className='text-center display-1 fw-light text-seconday my-5'>
          <Frown size={100} /> No Notes. Create new one.
        </h1>
      }
    </div>
  </div>
  </div>
  )
}

export default Home;