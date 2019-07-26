import React from 'react';
import './button.css'

const button = (props) => (
    <div className="buttons">
        {props.edit ? <p className="edit" onClick={props.edit}>edit</p> : null}
        <p className="remove" onClick={props.remove}>remove</p>
        {props.complete ? <span className="cross" onClick={props.completeClick}>completed?</span> : null}
    </div>
)

export default button;