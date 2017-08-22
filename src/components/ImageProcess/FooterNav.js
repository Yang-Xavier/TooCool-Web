/**
 * Created by yangbingxun on 2017/8/15.
 */

import React from 'react'

export default class FooterNav extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {

        return(
            <div className="foot-nav">
                <div  onTouchStart={e => this.props.changePage(1)}  className="btn icon-adjust">
                    <i />
                    <label>调整</label>
                </div>
                <div onTouchStart={e => this.props.changePage(2)} className="btn icon-crop">
                    <i />
                    <label>裁剪</label>
                </div>
                <div onTouchStart={e => this.props.changePage(3)} className="btn icon-paint">
                    <i />
                    <label>涂抹</label>
                </div>
            </div>
        )
    }
}