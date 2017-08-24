/**
 * Created by yangbingxun on 2017/8/24.
 */

import React from 'react'

export default class FootBar extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return(
            <div className="footer-bar">
                {this.props.children}
            </div>
        )
    }
}