/**
 * Created by yangbingxun on 2017/8/14.
 */

import React from 'react'

export default class HeadItems extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <ul className="style-transfer-head-nav">
                { this.props.back ? <li onTouchStart={this.props.back} ><i className={"icon icon-back"}/></li> : <div/> }
                { this.props.next ? <li onTouchStart={this.props.next} ><i className={"icon icon-next"}/></li> : <div/>}
            </ul>
        )
    }
}