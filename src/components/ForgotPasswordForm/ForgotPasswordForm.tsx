import React, { ChangeEvent, FormEvent, useState } from 'react';
import './ForgotPasswordForm.scss';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { clearSuccess, setSuccess } from '../../redux/notificationReducer';
import { useAppDispatch } from '../../redux/hooks';

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [isEyeOpenConfirm, setIsEyeOpenConfirm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] =  useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isPasswordConfirmTouched, setIsPasswordConfirmTouched] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const eye = isEyeOpen
    ? 'https://cdn1.iconfinder.com/data/icons/essential-21/128/Eye-512.png'
    : 'https://w7.pngwing.com/pngs/27/357/png-transparent-eye-eyeball-hide-interface-secret-revamp-icon.png';
  const eyeConfirm = isEyeOpenConfirm
    ? 'https://cdn1.iconfinder.com/data/icons/essential-21/128/Eye-512.png'
    : 'https://w7.pngwing.com/pngs/27/357/png-transparent-eye-eyeball-hide-interface-secret-revamp-icon.png';

  const toggleEyeHandler = () => {
    setIsEyeOpen(prev => !prev);
  }

  const toggleEyeConfirmHandler = () => {
    setIsEyeOpenConfirm(prev => !prev);
  }

  const backToLoginHandler = () => {
    navigate('/login');
  }

  const changeEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);

    if (isEmailTouched) {
      validateEmail();
    }
  }

  const changePasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    if (isPasswordTouched) {
      validatePassword();
    }
  }

  const changePasswordConfirmHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(event.target.value);

    if (isPasswordConfirmTouched) {
      validatePasswordConfirm();
    }
  }

  const validateEmail = () => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (pattern.test(email)) {
      setEmailError('');
      return false;
    } else {
      setEmailError('The email should be a valid email format.');
      return true;
    }
  }

  const validatePassword = () => {
    if (password.length >= 8) {
      setPasswordError('');
      return false;
    } else {
      setPasswordError(`Password should be at least 8 characters.`);
      return true;
    }
  }

  const validatePasswordConfirm = () => {
    if (password.length < 8) {
      setPasswordConfirmError(`Password should be at least 8 characters.`);
      return true;
    } else if (password !== passwordConfirm) {
      setPasswordConfirmError(`Passwords should be equel`);
      return true;
    } else {
      setPasswordConfirmError('');
      return false;
    }
  }

  const touchEmailHandler = () => {
    setIsEmailTouched(true);
    validateEmail();
  }

  const touchPasswordHandler = () => {
    setIsPasswordTouched(true);
    validatePassword();
  }

  const touchPasswordConfirmHandler = () => {
    setIsPasswordConfirmTouched(true);
    validatePasswordConfirm();
  }

  const reset = () => {
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsEmailTouched(true);
    setIsPasswordTouched(true);
    setIsPasswordConfirmTouched(true);
    const hasEmailError = validateEmail();
    const hasPasswordError = validatePassword();
    const hasPasswordConfirmError = validatePasswordConfirm();

    if (hasEmailError || hasPasswordError || hasPasswordConfirmError) {
      return;
    }

    reset();
    dispatch(setSuccess('Your passport is successfully reset'));

    setTimeout(() => {
      dispatch(clearSuccess());
    }, 4000);
  }

  return (
    <form className="forgot-password-form form-control" onSubmit={submitHandler}>
      <h1 className="text-primary forgot-password-headline">Incode boards</h1>

      <h2 className="form-headline">Reset password</h2>

      <input
        type="email"
        placeholder="Enter your email"
        className={classNames({
          'error-field': !!emailError
        })}
        value={email}
        onChange={changeEmailHandler}
        onBlur={touchEmailHandler}
      />

      <div className="validation text-left">
        <small>{ emailError }</small>
      </div>

      <div className="password-container">
        <input
          id="password"
          type={classNames({
            'text': isEyeOpen,
            'password': !isEyeOpen
          })}
          className={classNames({
            'error-field': !!passwordError
          })}
          placeholder="New password"
          value={password}
          onChange={changePasswordHandler}
          onBlur={touchPasswordHandler}
        />

        <div className="validation text-left">
          <small>{ passwordError }</small>
        </div>

        <img
          src={eye}
          className="eye"
          onClick={toggleEyeHandler}
          alt=""
        />
      </div>

      <div className="password-container">
        <input
          id="confirm-password"
          type={classNames({
            'text': isEyeOpenConfirm,
            'password': !isEyeOpenConfirm
          })}
          className={classNames({
            'error-field': !!passwordConfirmError
          })}
          placeholder="Confirm password"
          value={passwordConfirm}
          onChange={changePasswordConfirmHandler}
          onBlur={touchPasswordConfirmHandler}
        />

        <div className="validation text-left">
          <small>{ passwordConfirmError }</small>
        </div>

        <img
          src={eyeConfirm}
          className="eye"
          onClick={toggleEyeConfirmHandler}
          alt=""
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block mb10">
        Reset password
      </button>

      <button
        type="button"
        className="btn btn-light btn-block"
        onClick={backToLoginHandler}
      >
        Cancel
      </button>
    </form>
  );
}
