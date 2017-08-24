/**
 * Created by yangbingxun on 2017/8/24.
 */

import React from 'react'

export default class ToolMenu extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return(
            <div className="tool-menu">
                {this.props.children}
            </div>
        )
    }
}