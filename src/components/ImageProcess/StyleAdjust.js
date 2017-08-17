/**
 * Created by yangbingxun on 2017/8/15.
 */

import React from 'react'
import ImagePane from './ImagePane'
import Toast from '../com/Toast'
import '../../css/image-process.scss'

import origin_img from '../../images/test/p1.png'
import result_img from '../../images/test/guichu.png'
import other_img from '../../images/test/IMG_3793.JPG'

export default class StyleAdjust extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isProtect: false,
            opacity: 1
        }

    }

    switch_protect() {
        this.setState({
            isProtect: !this.state.isProtect
        })
    }

    control_opacity() {
        const self = this;
        let startX;
        const Event = {
            'touchmove': e => {
                let decent = e.touches[0].clientX - startX;
                decent = (decent/150).toFixed(2);
                let newOpacity = self.state.opacity - decent;
                if(newOpacity <= 0) {
                    newOpacity =0;
                }
                if(newOpacity >= 1) {
                    newOpacity = 1
                }
                self.setState({
                    opacity: newOpacity
                });
                startX = e.touches[0].clientX;
            },
            'touchstart': e => {
               startX =  e.touches[0].clientX;
            }
        };

        return Event
    }

    render() {
        return(
            <div className="style-process-pane ">
                <div className="image-label">
                    <ImagePane height = { screen.height - 120} img={origin_img}/>
                    <ImagePane
                        events={this.control_opacity()}
                        style={{
                            display: this.state.isProtect? 'block' : 'none',
                            opacity: this.state.opacity
                        }}
                        height = { screen.height - 120}
                        className="content-pane mask"
                        img={other_img}/>
                    <ImagePane
                        events={this.control_opacity()}
                        style={{
                            display: !this.state.isProtect? 'block' : 'none',
                            opacity: this.state.opacity
                        }}
                        height = { screen.height - 120}
                        className="content-pane mask"
                        img={result_img}/>

                </div>
                <div className="tool-bar">
                    <div className="option">
                        <span className="switch">
                            <section
                                onTouchStart={e => this.switch_protect()}
                                style={{transform: `translateX(${this.state.isProtect? 1.5 : 0}rem)`}}
                                className="switch-btn">
                                {this.state.isProtect ? 'on' : 'off'}
                            </section>
                            <sectoin className="switch-road"/>
                        </span>
                        <span className="title">颜色保护</span>
                    </div>
                    <div className="menu">
                        <span className="forward"/>
                        <span className="title">调整</span>
                        <span className="check"/>
                    </div>
                </div>
                <Toast
                    msg="左右滑动试试看"
                    showTime="3"
                    forward="down"
                />
                <Toast
                    msg={`${(this.state.opacity * 100).toFixed(0)}%`}
                    showTime="3"
                    bottom="8rem"
                />
            </div>
        )
    }
}