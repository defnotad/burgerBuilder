import React from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: + <strong>{"$" + props.totalPrice.toFixed(2)}</strong></p>
        {controls.map(el =>
            <BuildControl
                key={el.label}
                label={el.label}
                add={() => props.addIngredient(el.type)}
                disabled={props.disabledInfo[el.type]}
                remove={() => props.removeIngredient(el.type)}
            />)}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.purchaseHandler}
        >ORDER NOW
        </button>
    </div>
);


export default buildControls;