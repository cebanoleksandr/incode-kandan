import React from 'react';
import './NotFoundPage.scss';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackHomeBtn = () => {
    navigate('/');
  };

  return (
    <div className="body">
      <div className="text">
        <div>Opps</div>
        <hr></hr>
        <div>Nothing Exist</div>
      </div>

      <div className="back-home">
        <button onClick={handleBackHomeBtn} className="back-home-btn">
          Back home
        </button>
      </div>

      <div className="astronaut">
        <img
          src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png"
          alt=""
          className="src"
        ></img>
      </div>
    </div>
  );
};
