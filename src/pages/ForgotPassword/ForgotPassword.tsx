import React from 'react';
import './ForgotPassword.scss';
import { ForgotPasswordForm } from '../../components/ForgotPasswordForm/ForgotPasswordForm';

export const ForgotPassword = () => {
  return (
    <div className="forgot-password">
      <ForgotPasswordForm />
    </div>
  );
}