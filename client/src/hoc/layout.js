import React from 'react'
import './layout.css'
const layout = (props) => {
    return (
        <div className="dashboard">
            <p className="dash-heading">Weeks Planner</p>
            <div className="dash-wrapper">{props.children}</div>
        </div>
    )
}

export default layout;