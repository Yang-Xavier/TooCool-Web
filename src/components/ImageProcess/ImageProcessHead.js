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
                <div className="btn icon-undo"></div>
                <div className="btn icon-redo"></div>
                <div className="btn icon-clear"></div>
                <div className="btn icon-save"></div>
            </div>
        )
    }
}