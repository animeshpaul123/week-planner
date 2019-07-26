import React from 'react';
import classes from './Error.module.css';
import errorImg from '../../images/error.svg';

const error = (props) => (
    <div className={classes.error}>
        <p>{props.children}</p>
        <img src={errorImg} alt="error"/>
    </div>
)

export default error;