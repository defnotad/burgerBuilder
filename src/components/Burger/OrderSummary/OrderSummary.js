import React from "react";

import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button"

const orderSummary = (props) => {
    const ingredients = {
        ...props.ingredients
    };

    const ingredientSummary = [];

    for (let key in ingredients) {
        const item =
            <li key={key}>
                <span style={{ textTransform: "capitalize" }}>{key}</span>:
                {ingredients[key]}
            </li>
        ingredientSummary.push(item);
    }

    return (
        <Aux>
            <h3>Your orders</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={props.cancel} btnType='Danger'>CANCEL</Button>
            <Button clicked={props.continue} btnType='Success'>CONTINUE</Button>
        </Aux>
    );
};


export default orderSummary;