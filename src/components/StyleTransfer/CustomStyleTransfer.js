/**
 * Created by yangbingxun on 2017/8/15.
 */

import React from 'react'
import HeadNav from './HeadNav'
import '../../css/custom-style-transfer.scss'

export default class CustomStyleTransfer extends React.Component {
    constructor(props) {
        super(props);

    }

    forward() {
        console.log(f)
    }


    render() {
        return(
            <div className={"main-pane"}>
                <HeadNav forward = {this.forward}/>
                <div className="title">
                    风格合成
                </div>
                <div className="origin-label">
                    <span className="img-block origin-img"/>
                    <span className="icon plus"/>
                    <span className="img-block style-img"/>

                    <div className="btn option">
                        开始合成
                    </div>
                    <div className="info-bar">
                        此次合成大约1分钟
                    </div>
                </div>

                <div className="btn go-home">
                    <i/>
                    <label>返回首页</label>
                </div>
            </div>
        )
    }
}