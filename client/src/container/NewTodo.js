import React from 'react';
import CardInput from '../component/cardInput/cardInput';
const newCards = (props) => {
    const {cards, heading, titleChanged, descChanged, addCard, input, iValue, tValue} = props
    const dynamic = () => {
        return titleChanged ? <CardInput input={input}titleChanged={titleChanged}descChanged={descChanged} addCard={addCard} iValue={iValue} tValue={tValue}/> : cards
    }
    return (
        <div className="col-md-3">
            <div className="cards-wrap">
                <h3>{heading}</h3>
                {dynamic()}
            </div>
        </div>
    )
}
export default newCards;