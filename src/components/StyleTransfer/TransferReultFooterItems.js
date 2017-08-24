/**
 * Created by yangbingxun on 2017/8/15.
 */

import React from 'react'

export default class TransferReultFooterItems extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {

        return(
            <ul className="transfer-items">
                <li  onTouchStart={e => this.props.changePage(1)}  className="btn ">
                    <i className="icon-adjust"/>
                    <label>调整</label>
                </li>
                <li onTouchStart={e => this.props.changePage(2)} className="btn ">
                    <i className="icon-paint"/>
                    <label>涂抹</label>
                </li>
                <li onTouchStart={e => this.props.changePage(3)} className="btn ">
                    <i className="icon-crop"/>
                    <label>裁剪</label>
                </li>
            </ul>
        )
    }
}