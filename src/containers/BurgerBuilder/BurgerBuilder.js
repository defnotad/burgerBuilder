import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axiosOrders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const ingredientPrice = INGREDIENT_PRICES[type];
        const updatedPrice = this.state.totalPrice + ingredientPrice;
        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice, purchasable: true });
        console.log(this.state);
    }

    removeIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] - 1;
        if (updatedCount === -1) {
            return;
        }
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const ingredientPrice = INGREDIENT_PRICES[type];
        const updatedPrice = this.state.totalPrice - ingredientPrice;
        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice, purchasable: !(updatedPrice === 4) });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max',
                address: {
                    street: 'Teststreet 1',
                    zip: 413566,
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'Fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.purchaseCancelHandler();
            })
            .catch(err => {
                this.setState({ loading: false });
                console.log(err);
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {
                        this.state.loading ?
                            <Spinner /> :
                            <OrderSummary
                                cancel={this.purchaseCancelHandler}
                                continue={this.purchaseContinueHandler}
                                ingredients={this.state.ingredients}
                                totalPrice={this.state.totalPrice}
                            />
                    }
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    disabledInfo={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    purchasable={this.state.purchasable}
                    purchaseHandler={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);