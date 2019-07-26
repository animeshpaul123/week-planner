import React from 'react';
import './card.css'
import Btn from '../UI/button/button'

const card = (props) => {
    let styles = ["card"]
    if (!props.isComplete) {
        styles.push("unComplete-card")
    }
    else {
        styles.push("completed-card")
    }

    let dateNow = new Date(props.date)
    let currentDate = dateNow.toDateString().slice(0, 11)
    return (
        <div className={styles.join(" ")}>
            <h2 className="card-heading">{props.cardHeading} <span className="date">{currentDate}</span></h2>
            <div className="card-desc">
                {props.desc}
            </div>
            {props.editable ? 
                <textarea onKeyDown={props.changed} placeholder="start editing . . ."></textarea> : 
                <Btn completeClick={props.completeClick} complete={!props.isComplete} edit={props.edit} remove={props.remove}/>}
        </div>
    )
}

export default card;