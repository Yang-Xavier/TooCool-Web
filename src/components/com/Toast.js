/**
 * Created by yangbingxun on 2017/8/15.
 */

import React from 'react';

import '../../css/toast.scss'

export default class Toast extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timeId : null
        }
    }


    componentWillReceiveProps(nextProps) {
        if(this.state.timeId && nextProps.msg != this.props.msg) {
            clearTimeout(this.state.timeId);
            this.refs['toast'].style.opacity = 1;
        }

        if(this.props.showTime != 'forever') {
            this.setState({
                timeId: setTimeout(() => {
                    this.refs['toast'].style.opacity = 0;
                    this.setState({
                        timeId: null
                    })
                }, parseInt(this.props.showTime) * 1000)
            })
        }
    }

    componentDidMount() {
        if(this.props.showTime != 'forever') {
            this.setState({
                timeId: setTimeout(() => {
                    this.refs['toast'].style.opacity = 0;
                }, parseInt(this.props.showTime) * 1000)
            })
        }
    }


    render() {
        const style = {
            top: this.props.bottom? '': this.props.top|| `3rem`,
            bottom: this.props.bottom
        };

        return(
            <div
                style={style}
                className={`toast ${this.props.forward || 'up'}`}
                ref="toast"
            >
                <section>{this.props.msg}</section>
            </div>
        )
    }
}