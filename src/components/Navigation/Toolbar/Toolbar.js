import React from 'react';
import classes from './Toolbar.module.css';
import Logo from "../../Logo/Logo";
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuButton from '../../UI/MenuButton/MenuButton';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
       <MenuButton click={props.menuClick}/>
       <Logo />
       <nav className={classes.DesktopOnly}>
          <NavigationItems />
       </nav>
    </header>
);
export default toolbar;