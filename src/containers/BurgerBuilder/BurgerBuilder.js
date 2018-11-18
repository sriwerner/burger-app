import React, { Component } from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";   
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.6,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.4
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-1be3c.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            .catch(error => {
                this.setState({error: true})
            })
            })
    }

    updatePurchaseState = (ingredients) => {
       const sum = Object.keys(ingredients)
        .map( itKey => {
            return ingredients[itKey]
        })
        .reduce((acc, val) => {
            return acc + val
        }, 0);
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: oldPrice + priceAddition
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: oldPrice - priceDeduction
        });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
       this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => { 
       this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => { 
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Manu Sabores',
                address: {
                    street: 'TestStreet 1',
                    zipCode: '1429',
                    country: 'Argentina'
                },
                email: 'manuel@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json ', order)
            .then (response => {
                this.setState({loading: false, purchasing: false})
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false})
                console.log(error)
            })
    }

    render() { 
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        
        let burger = this.state.error ? <p>Ingredients can't be loaded </p> : <Spinner />
        if (this.state.ingredients){
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler} 
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />
                </>)
            orderSummary = (<OrderSummary 
                price={this.state.totalPrice}
                ingredients={this.state.ingredients} 
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />);   
            if(this.state.loading){
                orderSummary = <Spinner />
            }
        }
        return (
        <>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </>
    );
    }
}
 
export default withErrorHandler(BurgerBuilder, axios);