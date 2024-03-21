import React from 'react';
import './LoginPage.scss';
import { LoginForm } from '../../components/LoginForm/LoginForm';

export const LoginPage = () => {
  return (
    <div className="login">
      <LoginForm />
    </div>
  );
}
