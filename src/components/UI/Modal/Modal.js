import React, { Component } from 'react';
import classes from './Modal.css';

import Backdrop from '../Backdrop/Backdrop';

import Aux from '../../../hoc/Aux/Aux';

class modal extends Component {
    shouldComponentUpdate (nextProps, nextState) {
        console.log(nextProps.show, this.props.show);
        if (nextProps.show !== this.props.show || nextProps.children !== this.props.children) {
            return true;
        }

        return false;
    }

    componentWillUpdate () {
        console.log('[Moda] will update')
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show}
                    clicked={this.props.modalClosed} />
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default modal;