/**
 * Created by yangbingxun on 2017/8/15.
 */

import React from 'react';

import '../../css/toast.scss'

export default class Toast extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timeId : null,
            rmTimeId: null
        }
    }




    componentDidMount() {
        if(this.props.showTime != 'forever') {
            this.setState({
                timeId: setTimeout(() => {
                    this.refs['toast'].style.opacity = 0;
                }, parseInt(this.props.showTime) * 1000)
            })
            if(this.props.remove) {
                this.setState({
                    rmTimeId: setTimeout(() => {
                        this.refs['toast'].remove();
                    }, parseInt(this.props.showTime) * 1000 + 300)
                })
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        clearTimeout(this.state.timeId);
        if(this.state.timeId && nextProps.msg != this.props.msg) {
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

    componentWillUnmount() {
        if(this.state.timeId) {
            clearTimeout(this.state.timeId);
        }
        if(this.state.rmTimeId) {
            clearTimeout(this.state.rmTimeId)
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