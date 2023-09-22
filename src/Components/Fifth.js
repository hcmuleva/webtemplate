import React from 'react';
import './Card.css';

const Fifth = () => {
  return (
    <div className="card">
      <div className="row">
        {/* First Row */}
        <img src="./hariprofile.jpg" alt="Doctor" className="circle-img" />
        <div className="content">
          <h5>Oliver Patterson, MD</h5>
          <p className="specialization">Family Medicine</p>
          <p className="address">
            Pacific Coast Medical Associates - <br />
            800 Welch Rd, Palo Alto, CA 94304
          </p>
          <p>Languages: English</p>
        </div>
        <div className="additional-content">
          <p className='Date'><b>Date</b> : Sep 21, Thursday</p>
          <button className="light-button">8:30pm</button>
          <br />
          <a href="/" className="blue-link">More Appointments</a>
        </div>
      </div>
    </div>
  );
};

export default Fifth;
