/**
 * Created by yangbingxun on 2017/8/29.
 */

import React from 'react'

import '../../css/WaitAnimation.scss'

export default class WaitingAnimation extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return(
            <div className="waiting-label">
                <div className="animation"></div>
                <div className="bg"></div>
            </div>
        )
    }
}