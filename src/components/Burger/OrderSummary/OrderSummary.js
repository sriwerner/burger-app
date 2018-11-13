import React, { Component } from 'react';
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
    componentWillUpdate(){
           console.log('[OrderSummary] WillUpdate');
                      
    }
    render() { 
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (<li key={igKey}>
                <span 
                    style={{textTransform: 'capitalize'}}>
                    {igKey}
                </span>: {this.props.ingredients[igKey]}
                </li>)
        });
        return ( 
            <>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button
                    clicked={this.props.purchaseCancelled}
                    btnType='Danger'>CANCEL</Button>
                <Button
                    clicked={this.props.purchaseContinued}
                    btnType='Success'>CONTINUE</Button>
            </>
        );
    }
}
 
export default OrderSummary;

// const orderSummary = (props) => {
//     const ingredientSummary = Object.keys(props.ingredients)
//         .map(igKey => {
//             return (<li key={igKey}>
//                 <span 
//                     style={{textTransform: 'capitalize'}}>
//                     {igKey}
//                 </span>: {props.ingredients[igKey]}
//                 </li>)
//     });
//     return(
//     <>
//        <h3>Your Order</h3>
//        <p>A delicious burger with the following ingredients:</p>
//        <ul>
//           {ingredientSummary}
//        </ul>
//        <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
//        <p>Continue to Checkout?</p>
//        <Button
//         clicked={props.purchaseCancelled}
//         btnType='Danger'>CANCEL</Button>
//        <Button
//         clicked={props.purchaseContinued}
//         btnType='Success'>CONTINUE</Button>
//     </>)
// }

// export default orderSummary;