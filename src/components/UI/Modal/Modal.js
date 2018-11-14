import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
        // return true;
    }

    componentDidUpdate() {
        console.log('[Modal] DidUpdate');
    }
    
    render() { 
        return(
            <>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0',
                    }}
                    >
                    {this.props.children}
                </div>
        </>
        )
    }
}
 
export default Modal;

// const modal = (props) => (
//     <>
//        <Backdrop show={props.show} clicked={props.modalClosed} />
//         <div 
//             className={classes.Modal}
//             style={{
//                 transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
//                 opacity: props.show ? '1' : '0',
//             }}
//             >
//             {props.children}
//         </div>
//     </>
// )

// export default modal;