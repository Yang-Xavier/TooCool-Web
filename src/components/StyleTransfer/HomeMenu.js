/**
 * Created by yangbingxun on 2017/8/24.
 */

import React from 'react'

export default class HomeMenu extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return(
            <ul className="home-menu">
                <li>
                    <i/>
                    <label>滤镜</label>
                </li>
                <li>
                    <i/>
                    <label>贴纸文字</label>
                </li>
                <li>
                    <i/>
                    <label>工具箱</label>
                </li>
            </ul>
        )
    }
}