import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";


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
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const ingredientPrice = INGREDIENT_PRICES[type];
        const updatedPrice = this.state.totalPrice + ingredientPrice;
        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });
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
        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });
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
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    disabledInfo={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;