import React, { ChangeEvent, FormEvent, useState } from 'react';
import './LoginForm.scss';
import { Separator } from '../Separator/Separator';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch } from '../../redux/hooks';
import { clearInfo, clearSuccess, setInfo, setSuccess } from '../../redux/notificationReducer';

export const LoginForm = () => {
  const [isPasswordFieldVisible, setIsPasswordFieldVisible] = useState(false);
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

  const onLoginFake = (service: string) => {
    let mesage = '';

    if (service === 'google') {
      mesage = 'It must login with Google somehow :)'
    }

    if (service === 'github') {
      mesage = 'It must login with Github somehow :)'
    }

    dispatch(setInfo(mesage));
      setTimeout(() => {
        dispatch(clearInfo());
      }, 4000);
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isPasswordFieldVisible) {
      setIsEmailTouched(true);
      validateEmail();

      if (!!emailError) {
        return;
      }

      setIsPasswordFieldVisible(true);
    } else {
      setIsPasswordTouched(true);
      const hasEmailError = validateEmail();
      const hasPasswordError = validatePassword();
      
      if (hasEmailError || hasPasswordError) {
        return;
      }
           
      reset();
      dispatch(setSuccess('You signed in!!!'));

      setTimeout(() => {
        dispatch(clearSuccess());
      }, 3000);
    }
  }

  return (
    <form className="login-form form-control" onSubmit={submitHandler}>
      <h1 className="text-primary login-headline">Incode boards</h1>

      <h2 className="form-headline">Log in to your account</h2>

      <div className="btns mb10">
        <button
          className="btn btn-block mr10"
          type="button"
          onClick={() => onLoginFake('google')}
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
          onClick={() => onLoginFake('github')}
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

      {isPasswordFieldVisible && (
        <>
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

          <div className="mb20 text-right">
            <Link to="/forgot-password" className="link">
              <small>Forgot your password?</small>
            </Link>
          </div>
        </>
      )}

      <button type="submit" className="btn btn-primary btn-block mb10">
        Log in to Incode boards
      </button>

      <div>
        <small>You do not have an account in Incode boards? </small>
        <Link to="/register" className="link">
          <small>Sign up</small>
        </Link>
      </div>      
    </form>
  );
}
