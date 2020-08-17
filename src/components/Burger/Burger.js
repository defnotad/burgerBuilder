import React from "react";

import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";
import classes from "./Burger.module.css";

const burger = (props) => {
    const transformedIngredients = [];
    for (let key in props.ingredients) {
        for (let j = 0; j < props.ingredients[key]; j++) {
            transformedIngredients.push(<BurgerIngredient key={key + j} type={key} />);
        }
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;