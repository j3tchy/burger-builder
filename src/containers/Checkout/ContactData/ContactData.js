import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';

import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false

            },
            postCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 6
                },
                valid: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: 'fast',
                        displayValue: 'fastest'
                    },{
                        value: 'cheapest',
                        displayValue: 'cheapest'
                    }]
                },
                value: ''
            }
        },
        loading: false
    }

    checkValidity(value, rules) {
        // This means that each rules has to be true for form to be valid
        let isValid = true;

        // if required validation is required, step into if statement
        if (rules.required) {
            // if value is not empty then isValid is set to true however, this doesnt
            // make the whole form valid as statements below are still making it false
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            // if value length is equal or more than minLength then isValid is set to true however, this doesnt
            // make the whole form valid as statements below are still making it false
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            // if value length is equal or more than minLength then isValid is set to true however, this doesnt
            // make the whole form valid as statements below are still making it false
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // Clone the initial state. Objects are not cloned by default, only a ref to the original is made
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        // Clone deeper into the object based on key made available via inputIdentifier
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        // Change value property to value from input box
        updatedFormElement.value = event.target.value;

        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)

        // Place new amended object back into initially cloned object based on key
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        console.log(updatedFormElement);

        // Set state of orderForm using newly updatedOrderForm
        this.setState({
            orderForm: updatedOrderForm
        });
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            
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
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }


        let form = (
            <form>
                    {formElementsArray.map((formElement) => {
                        return <Input
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value} />
                    })}
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