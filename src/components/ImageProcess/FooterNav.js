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
                    <section/>
                    <section>调整</section>
                </div>
                <div onTouchStart={e => this.props.changePage(2)} className="btn icon-paint">
                    <section />
                    <section>涂抹</section>
                </div>
                <div onTouchStart={e => this.props.changePage(3)} className="btn icon-crop">
                    <section />
                    <section>裁剪</section>
                </div>
            </div>
        )
    }
}