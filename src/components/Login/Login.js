import React, { useState, useEffect ,useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
 const reducer1 = (state,action) => {
  if(action.type=== 'setEmail')
  {
    return {val:action.val,valid: action.val.includes('@')}
  }
  if(action.type=== 'setValid')
  {
    return {val:state.val,valid: state.val.includes('@')}
  }
  return {val:'',valid: false}
 }
 const reducer2 = (state, action) => {
  if (action.type === 'setPsw') {
    return { val: action.val, valid: action.val.trim().length > 6 };
  }
  if (action.type === 'setValid') {
    return { val: state.val, valid: state.val.trim().length > 6 };
  }
  return { val: '', valid: false };
};

const Login = (props) => {
 // const [enteredEmail, setEnteredEmail] = useState('');
//  const [emailIsValid, setEmailIsValid] = useState();
 // const [enteredPassword, setEnteredPassword] = useState('');
// const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [EmailState, dispatchEmail] = useReducer(reducer1,{val:'',valid: undefined});
  const [pswState,dispatchPsw] = useReducer(reducer2,{val:'',valid:undefined})

 const {valid : x1} = EmailState;
 const {valid : x2} = pswState;
   useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        x1 && x2
      );
     }, 500);

     return () => {
       console.log('CLEANUP');
       clearTimeout(identifier);
    };
   }, [x1, x2]);



  const emailChangeHandler = (event) => {
    dispatchEmail({type:'setEmail',val:event.target.value});
 //   setFormIsValid(event.target.value && pswState.valid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPsw({type:'setPsw',val:event.target.value} );
   // setFormIsValid(event.target.value && EmailState.valid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'setValid',})
  };

  const validatePasswordHandler = () => {
   dispatchPsw({type:'setValid'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(EmailState, pswState);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            EmailState.valid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={EmailState.val}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            pswState.valid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={pswState.val}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
