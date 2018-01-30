import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class orderSummary extends Component {
    // This can be a functional component. Doesnt have to be a class.
    componentWillUpdate () {
        console.log('[OrderSummary] willUpdate');
    }

    render () {
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'captalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>)
        });

        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default orderSummary;