/**
 * Created by yangbingxun on 2017/8/15.
 */

import React from 'react'


export default class ImageProcessHead extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return(
            <div className="head-nav">
                <div className="btn icon-back"></div>
                <div className="btn icon-undo"
                     onTouchStart={e =>{ this.props.undo.fn()}}
                ></div>
                <div className="btn icon-redo"
                     onTouchStart={e =>{ this.props.redo.fn()}}
                ></div>
                <div className="btn icon-clear"
                    onTouchStart={e => {this.props.clear()}}
                ></div>
                <div className="btn icon-save"></div>
            </div>
        )
    }
}