/* eslint-disable array-callback-return */
/* eslint-disable no-useless-escape */
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import style from '../Authenticate.module.scss';
import Input from '../../../componente/Input/Input';
import Button from '../../../componente/Buton/Buton';

import { ReactComponent as View } from '../../../assets/icons/view.svg';
import { ReactComponent as ViewOff } from '../../../assets/icons/view-off.svg';

import useAuth from '../../../hooks/useAuth';
import useStateProvider from '../../../hooks/useStateProvider';
import {users} from '../../../assets/users/users';

export default function LoginForm() {
  const { setUser } = useAuth();

  const { setAlert } = useStateProvider();

  const navigate = useNavigate();

  // const { setUser } = useAuth();
  const [passwordShown, setPasswordShown] = useState(true);

  // form values
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  // error states
  const [emailError, setEmailError] = useState(null);
  const [pwdError, setPwdError] = useState(null);

  const handleEmailError = (e) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(e) === false) {
      setEmailError('Adresa de email invalidă!');
    } else {
      setEmailError('');
    }
  };

  const handlePwdError = (e) => {
    if (e.length < 5) {
      setPwdError('Parola trebuie să aibă cel puțin 5 caractere');
    } else setPwdError('');
  };

  const handleLogin = async () => {
    try {
      if (emailError === '' && pwdError === '') {
        let auth = false;
        if (pwd.length > 4) {
          users.map(user => {
            if (user.email === email && user.parola === pwd) {
              auth = true;
              setUser(user);
              sessionStorage.setItem('userId', user?.id);
              sessionStorage.setItem('user', JSON.stringify(user));
              setAlert({
                type: 'success',
                message: 'Conectare cu succes!',
              });
              navigate('/');
            }
          })
          if (!auth)
            setAlert({
              type: 'danger',
              message: 'Conectare eșuată',
            });
          //setUser()
          // const response = await login(email, pwd);
          // if (response.status === 200) {
          //   setUser(response.data);
          //   localStorage.setItem('userId', response?.data.id);
          //   setUserId(response?.data.id);
          //   setAlert({
          //     type: 'success',
          //     message: 'Login successfully',
          //   });
          //   navigate('/');
          // }
        }
      } else {
        if (emailError !== '') handleEmailError('');
        if (pwdError !== '') handlePwdError('');
        setAlert({
          type: 'danger',
          message: 'Completați corect toate câmpurile obligatorii.',
        });
      }
    } catch (error) {
      console.log(error, 'error');
      setAlert({
        type: 'danger',
        message: 'Something went wrong! Check your credentials',
      });
    }
  };

  const passToggleHandler = () => {
    setPasswordShown(!passwordShown);
  };


  // test login handlers
  // const handleTestLoginUser = () => {
  //   try {
  //     localStorage.setItem('token', resp.token);
  //     localStorage.setItem('role', resp.role);
  //     localStorage.setItem('userId', resp.id);
  //     setUser({
  //       email: resp.email,
  //       parola: resp.parola,
  //       id: resp.id,
  //       role: resp.role,
  //       token: resp.token,
  //       fullName: resp.name,
  //       photo: resp.photo,
  //     });
  //     navigate('/');
  //     // fetchUser();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleTestLoginAdmin = () => {
  //   try {
  //     localStorage.setItem('token', resp.token);
  //     localStorage.setItem('role', resp.role);
  //     localStorage.setItem('userId', resp.id);
  //     setUser({
  //       email: resp.email,
  //       parola: resp.parola,
  //       id: resp.id,
  //       role: resp.role,
  //       token: resp.token,
  //       fullName: resp.name,
  //       photo: resp.photo,
  //     });
  //     navigate('/');
  //     window.location.reload();
  //     // fetchUser();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className={style.containerAuth}>
      <div className={style.contentContainerForm}>
        <div className={style.form}>
          <div className={style.formTitle}>
            <h4 className={style.title}>Conectare</h4>
            <p className={style.subTitle}>Introduceți detaliile contului</p>
          </div>

          <div className={style.formInput}>
            {/* email */}
            {emailError && <div className={style.authError}>{emailError}</div>}
            <Input
              label='Email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleEmailError(e.target.value);
              }}
              type='email'
              placeholder={'Email'}
              required
            />

            {/* password */}
            {pwdError && <div className={style.authError}>{pwdError}</div>}
            <Input
              label='Parola'
              id='password'
              name='password'
              value={pwd}
              onChange={(e) => {
                setPwd(e.target.value);
                handlePwdError(e.target.value);
              }}
              type={passwordShown ? 'password' : 'text'}
              placeholder={'Parola'}
              icon={passwordShown ? <View /> : <ViewOff />}
              onIconClick={passToggleHandler}
              required
            />
          </div>
        </div>
      </div>

      <div className={style.contentContainerAuthOptions}>
        <div className={style.contentContainerButtons}>
          <Button
            variant='primary'
            label='Conectare'
            onClick={handleLogin}
          />
        </div>
      </div>
    </div>
  );
}
