/**
 * Created by yangbingxun on 2017/8/14.
 */

import React from 'react'

export default class HeadNav extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="head-nav">
                { this.props.forward ? <section onTouchStart={this.props.forward} className={"btn return-btn"}/> : <div/> }
                { this.props.next ? <section onTouchStart={this.props.next} className={"btn next-btn"}/> : <div/>}
            </div>
        )
    }
}