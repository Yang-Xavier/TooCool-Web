/**
 * Created by yangbingxun on 2017/8/15.
 */

import React from 'react'
import ImagePane from '../ImageProcess/ImagePane'
import Toast from '../com/Toast'

export default class StyleAdjust extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isProtect: false,
            opacity: 1,
            load: false,
            isModifiy: false
        }
    }

    switch_protect() {
        this.setState({
            isProtect: !this.state.isProtect,
            isModifiy: true
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
                self.setState({
                    isModifiy: true
                })
            },
            'touchstart': e => {
               startX =  e.touches[0].clientX;
            }
        };

        return Event
    }

    produceImg() {
        const alphaImg = this.state.isProtect? this.props.protectImg : this.props.resultImg;
        const img1 = document.createElement('img');
        const img2 = document.createElement('img');

        img1.src = this.props.originImg;
        img2.src = alphaImg;

        return Promise.all([
            new Promise(res=> {img1.onload = e=> {res()}}),
            new Promise(res=> {img2.onload = e=> {res()}})
        ]).then(res => {
            const cvs = document.createElement('canvas');
            cvs.width = img1.width;
            cvs.height = img1.height;
            const ctx = cvs.getContext('2d');

            ctx.drawImage(img1, 0, 0, img1.width, img1.height);
            ctx.globalAlpha = this.state.opacity;
            ctx.drawImage(img2, 0, 0, img1.width, img1.height);
            this.props.changeShowImg(cvs.toDataURL());
        });
    }

    back() {
        this.forwardAnimate()
            .then( r => {
                this.props.changePage(0)
            })
    }

    saveAndBack() {
        this.produceImg().then(r => {
            this.forwardAnimate()
                .then( r => {
                    this.props.changePage(0)
                })
        });

    }

    forwardAnimate() {
        return new Promise(res => {
            this.refs['pane'].style.transform = `translateX(100%)`;
            setTimeout(() => {
                res();
            },600)
        })
    }

    componentDidMount() {
        setTimeout(() => {this.refs['pane'].style.transform = `translateX(0px)`},0)
    }

    render() {
        const animateStyle = {transform : `translateX(100%)`,transition:`all .4s linear`};

        return(
            <div style={animateStyle} ref="pane" className="style-process-pane">
                <div className="image-label">
                    <ImagePane
                        height = { screen.height - 120}
                        img={this.props.originImg}
                        className="content-pane mask"
                    />
                    <ImagePane
                        events={this.control_opacity()}
                        styles={{
                            display: this.state.isProtect? 'block' : 'none',
                            opacity: this.state.opacity
                        }}
                        height = { screen.height - 120}
                        className="content-pane mask"
                        img={this.props.protectImg}/>
                    <ImagePane
                        events={this.control_opacity()}
                        styles={{
                            display: !this.state.isProtect? 'block' : 'none',
                            opacity: this.state.opacity
                        }}
                        height = { screen.height - 120}
                        className="content-pane mask"
                        img={this.props.resultImg}/>

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
                        <span onTouchStart={e => {this.back();}} className="forward"/>
                        <span className="title">调整</span>
                        <span onTouchStart={e => {
                            if(this.state.isModifiy) {
                                this.saveAndBack();
                            } else {
                                this.back();
                            }

                        }} className="check"/>
                    </div>
                </div>
                <Toast
                    msg="左右滑动试试看"
                    showTime="2"
                    forward="down"
                    top="3rem"
                />
                <Toast
                    msg={`${(this.state.opacity * 100).toFixed(0)}%`}
                    showTime="2"
                    bottom="8rem"
                />
            </div>
        )
    }
}

