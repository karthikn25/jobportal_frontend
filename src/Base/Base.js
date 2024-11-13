import React from 'react';
import './Base.css';
import Topbar from './Topbar/Topbar';
import Sidebar from './Sidebar/Sidebar'


export default function Base({children}) {
  return (
    <div id='whole-content'>
    <div className='row' >
    <div className='col-6' id='sidebar'>
    <Sidebar/>
    </div>
    <div className='col-6' id='main-content'>
    <div className='row' id='topbar'>
    <div className='col'>
    <Topbar/>
    </div>
    </div>
    <div className='row' id='content'>
    <div className='col'>
    {children}
    </div>
    </div>
    </div>
    </div>
    </div>
  )
}
