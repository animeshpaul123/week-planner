import React from 'react';
import  './cardInpput.css';
import { Button } from 'reactstrap';

const cardInput = (props) => {
    return (
        <div className="cardInput">
            <input placeholder="add title" onChange={props.titleChanged} type="text"/>
            <textarea placeholder="add task" onChange={props.descChanged}></textarea>
            <Button onClick={props.addCard} color="primary">add</Button>
        </div>
    )
}

export default cardInput;