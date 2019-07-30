import React from 'react';
import  './cardInpput.css';
import { Button } from 'reactstrap';

const cardInput = (props) => {
    const inputData = props.input
    let valid = true
    if (inputData.name.valid && inputData.desc.valid) {
        valid = false
    }
    let style1 = {}, style2 = {}
    if (inputData.name.touched) {
        style1 = { background: inputData.name.valid ? '#b7e2d3' : '#e4c2bf'}
    }
    if (inputData.desc.touched) {
        style2 = { background: inputData.desc.valid ? '#b7e2d3' : '#e4c2bf'}
    }
    return (
        <div className="cardInput">
            <input placeholder="add title" onChange={props.titleChanged} type="text" value={props.iValue} style={style1}/>
            <textarea placeholder="add task" onChange={props.descChanged} value={props.tValue} style={style2}></textarea>
            <Button onClick={props.addCard} color="primary" disabled={valid}>add</Button>
        </div>
    )
}

export default cardInput;