import React from 'react';

import classes from './MenuButton.css';

const MenuButton = (props) => {
    return (
        <button className={classes.MenuButton} onClick={props.open} >
            <div></div>
            <div></div>
            <div></div>
        </button>
    )
}

export default MenuButton;