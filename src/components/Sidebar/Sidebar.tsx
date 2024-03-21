import React, { useState } from 'react';
import './Sidebar.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { AddBoardModal } from '../AddBoardModal/AddBoardModal';
import { BackDrop } from '../BackDrop/BackDrop';

type Props = {
  isSidebar: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<Props> = ({ isSidebar, onClose }) => {
  const [isAddBoardModal, setIsAddBoardModal] = useState(false);

  const onModalClose = () => {
    setIsAddBoardModal(false);
  }

  return (
    <div className={classNames('sidebar', {
      'closed-sidebar': !isSidebar
    })}>
      <i className="fas fa-times-circle fa-lg close-icon" onClick={onClose}></i>
      
      <div className="text-center">
        <img
          src="https://previews.123rf.com/images/rotorania/rotorania2304/rotorania230413594/202835608-cartoon-man-with-happy-expression-3d-render-illustration-square-image.jpg"
          className="ava"
          alt=""
        />  
      </div>

      <h2 className="text-center">Username</h2>

      <button className="btn btn-success btn-block" onClick={() => setIsAddBoardModal(true)}>Add board</button>

      <ul className="sidenav-list">
        <li className="sidenav-item mb10">
          <Link to="/" className="link sidenav-link">Boards</Link>
        </li>

        <li className="sidenav-item mb10">
          <Link to="/login" className="link sidenav-link">Login</Link>
        </li>

        <li className="sidenav-item mb10">
          <Link to="/register" className="link sidenav-link">Register</Link>
        </li>
      </ul>

      {isAddBoardModal && (
        <>
          <AddBoardModal onClose={onModalClose} />
          <BackDrop onClick={onModalClose} />
        </>
      )}
    </div>
  );
}
