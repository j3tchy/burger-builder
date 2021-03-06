import React, { Component } from 'react';
import Aux from '../Aux/Aux';

import classes from './Layout.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDraw: false
    }
    
    sideDrawerCloseHandler = () => {
        this.setState({
            showSideDraw: false
        })
    }

    sideDrawerOpenHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDraw: !prevState.showSideDraw
            }
        })
    }

    render () {
        return (
            <Aux>
                <div>
                    <Toolbar open={this.sideDrawerOpenHandler} />
                    <SideDrawer open={this.state.showSideDraw} closed={this.sideDrawerCloseHandler}/>
                    Backdrop
                </div>
    
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;