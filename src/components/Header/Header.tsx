import React from 'react';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';

type Props = {
  onOpen: () => void;
}

export const Header: React.FC<Props> = ({ onOpen }) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => isActive ? 'nav__link is-active' : 'nav__link';

  return (
    <div className="header bg-primary">
      <div className="header-container">
        <div className="logo-container">
          <i className="fas fa-bars fa-3x bars" onClick={onOpen}></i>

          <Link to="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiNN944Env4OcBDGL9U0kMgFJ59pAadUbcvD9ZkH2yIg&s"
              className="logo"
              alt=""
            />
          </Link>
        </div>

        <ul className="nav__list">
          <li className="nav__item">
            <NavLink className={getLinkClass} to="/">
              Home
            </NavLink>
          </li>

          <li className="nav__item">
            <NavLink className={getLinkClass} to="/login">
              Login
            </NavLink>
          </li>

          <li className="nav__item">
            <NavLink className={getLinkClass} to="/register">
              Sign up
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
