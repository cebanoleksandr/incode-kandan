import React from 'react';
import './RegisterPage.scss';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';

export const RegisterPage = () => {
  return (
    <div className="register">
      <RegisterForm />
    </div>
  );
}
