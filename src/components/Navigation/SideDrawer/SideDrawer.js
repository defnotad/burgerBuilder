import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

const sideDrawer = (props) => {
    const attachedClasses = [classes.SideDrawer];
    if (props.showDrawer) {
        attachedClasses.push(classes.Open);
    } else {
        attachedClasses.push(classes.Close);
    }
    return (
        <Aux>
            <Backdrop show={props.showDrawer} clicked={props.closeDrawer} />
            <div className={attachedClasses.join(' ')}>
                <Logo height='11%' margin="32px" />
                <NavigationItems />
            </div>
        </Aux>
    );
}


export default sideDrawer;