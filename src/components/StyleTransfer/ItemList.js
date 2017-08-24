/**
 * Created by yangbingxun on 2017/8/24.
 */

import React from 'react'

export default class ItemList extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {

        return(
            <div className="item-list">
                {this.props.children}
            </div>
        )
    }
}