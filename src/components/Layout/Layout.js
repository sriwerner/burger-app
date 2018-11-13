import React,  { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = { 
        showSideDrawer: false
     }

    sideDrawerClosedHandler = () => {
       this.setState({showSideDrawer: false})
    }

    menuToggleHandler = (prevState) => {
        // console.log("Estado Anterior" + prevState);
       this.setState({
           showSideDrawer: !prevState
       })
    }

    render() { 
        return ( 
            <>
                <Toolbar menuClick={() => this.menuToggleHandler(this.state.showSideDrawer)}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
         );
    }
}
 
export default Layout;