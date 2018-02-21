import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Max Max',
                address: {
                    street: 'Test Street',
                    postCode: 'GGG HHHH',
                    country: 'UK'
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fast'
        }
        axios.post('/orders.json', order)
            .then((response) => {
                this.setState({
                    loading: false
                })
                this.props.history.push('/');
            }).catch((error) => {
                this.setState({
                    loading: false
                })
            });
        alert('You continue!')

    }

    render () {
        let form = (
            <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your mail" />
                    <input className={classes.Input} type="text" name="street" placeholder="Your street" />
                    <input className={classes.Input} type="text" name="postalCode" placeholder="Your post code" />
                    <Button clicked={this.orderHandler} btnType="Success">ORDER HERE</Button>
                </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;