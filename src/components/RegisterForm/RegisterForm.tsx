import React, { ChangeEvent, FormEvent, useState } from 'react';
import './RegisterForm.scss';
import { Separator } from '../Separator/Separator';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch } from '../../redux/hooks';
import { clearInfo, clearSuccess, setInfo, setSuccess } from '../../redux/notificationReducer';

export const RegisterForm = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] =  useState('');
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useAppDispatch();
  const eye = isEyeOpen
    ? 'https://cdn1.iconfinder.com/data/icons/essential-21/128/Eye-512.png'
    : 'https://w7.pngwing.com/pngs/27/357/png-transparent-eye-eyeball-hide-interface-secret-revamp-icon.png';

  const toggleEyeHandler = () => {
    setIsEyeOpen(prev => !prev);
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

  const validateEmail = () => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (pattern.test(email)) {
      setEmailError(prev => '');
      return false;
    } else {
      setEmailError(prev => 'The email should be a valid email format.');
      return true;
    }
  }

  const validatePassword = () => {
    if (password.length >= 8) {
      setPasswordError(prev => '');
      return false;
    } else {
      setPasswordError(prev => `Password should be at least 8 characters.`);
      return true;
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

  const reset = () => {
    setEmail('');
    setPassword('');
  }

  const onRegisterFake = (service: string) => {
    let mesage = '';

    if (service === 'google') {
      mesage = 'It must sign up with Google somehow :)'
    }

    if (service === 'github') {
      mesage = 'It must sign up with Github somehow :)'
    }

    dispatch(setInfo(mesage));
      setTimeout(() => {
        dispatch(clearInfo());
      }, 4000);
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsEmailTouched(true);
    setIsPasswordTouched(true);
    const hasEmailError = validateEmail();
    const hasPasswordError = validatePassword();
    
    if (hasEmailError || hasPasswordError) {
      return;
    }
         
    reset();
    dispatch(setSuccess('You signed up!!!'));

    setTimeout(() => {
      dispatch(clearSuccess());
    }, 4000);
  }

  return (
    <form className="register-form form-control" onSubmit={submitHandler}>
      <h1 className="text-primary register-headline">Incode boards</h1>

      <h2 className="form-headline">Create your account</h2>

      <div className="btns mb10">
        <button
          className="btn btn-block mr10"
          type="button"
          onClick={() => onRegisterFake('google')}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
            className="btn-icon mr10"
            alt=""
          />
          Google
        </button>

        <button
          className="btn btn-block"
          type="button"
          onClick={() => onRegisterFake('github')}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            className="btn-icon mr10"
            alt=""
          />
          Github
        </button>
      </div>

      <Separator />

      <input
        type="email"
        placeholder="Work email"
        className={classNames({
          'error-field': !!emailError
        })}
        value={email}
        onChange={changeEmailHandler}
        onBlur={touchEmailHandler}
      />

      <div className="validation text-left">
        <small>{emailError}</small>
      </div>

      <div className="password-container">
        <input
          type={classNames({
            'text': isEyeOpen,
            'password': !isEyeOpen
          })}
          className={classNames({
            'error-field': !!passwordError
          })}
          placeholder="Password"
          value={password}
          onChange={changePasswordHandler}
          onBlur={touchPasswordHandler}
        />

        <div className="validation text-left">
          <small>{passwordError}</small>
        </div>

        <img
          src={eye}
          className="eye"
          onClick={toggleEyeHandler}
          alt=""
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block mb10">
        Create account in Incode boards
      </button>

      <div>
        <small>You already have an account? </small>
        <Link to="/login" className="link">
          <small>Sign in</small>
        </Link>
      </div>      
    </form>
  );
}
