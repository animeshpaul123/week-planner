import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div style={{cursor: "pointer"}}
            onClick={props.openSideDrawer}>MENU</div>
       <nav className={classes.DesktopOnly}>
            <NavigationItems />
       </nav>
    </header>
);

export default toolbar;