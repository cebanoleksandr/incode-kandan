import React, { useState } from 'react';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { clearError, clearInfo, clearSuccess, clearWarning } from './redux/notificationReducer';
import { Sidebar } from './components/Sidebar/Sidebar';
import { BackDrop } from './components/BackDrop/BackDrop';

export const App = () => {
  const { error, success, info, warning } = useAppSelector(state => state.notification);
  const [isSidebar, setIsSidebar] = useState(false);
  const dispatch = useAppDispatch();

  const onClose = () => {
    setIsSidebar(false);
  }

  const onOpen = () => {
    setIsSidebar(true);
  }

  const closeNotificationHandler = (type: string) => {
    switch (type) {
      case 'success':
        dispatch(clearSuccess());
        break;
      case 'error':
        dispatch(clearError());
        break;
      case 'warning':
        dispatch(clearWarning());
        break;
      case 'info':
        dispatch(clearInfo());
        break;
    
      default:
        break;
    }
  }

  return (
    <div className="app">
      <Header onOpen={onOpen} />
      <Sidebar isSidebar={isSidebar} onClose={onClose} />
      {isSidebar && <BackDrop onClick={onClose} />}

      <div className="container">
        <Outlet />
      </div>

      {!!success && (
        <div className="badge badge-success notification">
          {success} 
          <i className="fa fa-times-circle fa-lg close" onClick={() => closeNotificationHandler('success')}></i>
        </div>
      )}

      {!!error && (
        <div className="badge badge-danger notification">
          {error}
          <i className="fa fa-times-circle fa-lg close-danger" onClick={() => closeNotificationHandler('error')}></i>
        </div>
      )}

      {!!info && (
        <div className="badge badge-primary notification">
          {info}
          <i className="fa fa-times-circle fa-lg close" onClick={() => closeNotificationHandler('info')}></i>
        </div>
      )}

      {!!warning && (
        <div className="badge badge-warning notification">
          {warning}
          <i className="fa fa-times-circle fa-lg close" onClick={() => closeNotificationHandler('warning')}></i>
        </div>
      )}
    </div>
  );
}
