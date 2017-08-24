/**
 * Created by yangbingxun on 2017/8/15.
 */

import React from 'react'


export default class HeaderNav extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return(
            <div className="header-nav">
                {this.props.children}
            </div>
        )
    }
}