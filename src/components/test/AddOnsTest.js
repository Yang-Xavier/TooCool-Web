/**
 * Created by yangbingxun on 2017/8/29.
 */

import React from 'react'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import '../../css/test.scss'

export default class AddOnsTest extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            item: 1,
            page: true
        }
    }

    getItem() {
        let a = [];
        for(let i = 0; i < this.state.item; i++) {
            a.push(<div key = {i}>{i}</div>)
        }
        return this.state.page ? a:<div>13123123</div>
    }

    render() {
        const item = this.getItem();

        return(
            <div className="add-ons">
                <button onTouchStart={e => {this.setState({item: this.state.item + 1})}}>add</button>
                <button onTouchStart={e => {this.setState({item: this.state.item - 1})}}>remove</button>
                <button onTouchStart={e => {this.setState({page: !this.state.page})}}>change</button>
                <ReactCSSTransitionGroup
                    classN
                    transitionName = 'test'
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {item}
                </ReactCSSTransitionGroup>
            </div>
        )


    }
}