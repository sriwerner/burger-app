import React, { Component } from 'react';
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
        <>
            <Burger />
            <div>Build Controls</div>
        </>
    );
    }
}
 
export default BurgerBuilder;