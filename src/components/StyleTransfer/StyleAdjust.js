/**
 * Created by yangbingxun on 2017/8/15.
 */

import React from 'react'
import ImagePane from './ImagePane'
import Toast from '../com/Toast'
import WorkPane from './WorkPane'
import FooterNav from '../com/FooterNav'
import FooterBar from '../com/FooterBar'
import WaitingAnimation from '../com/WaitingAnimation'


import api from '../../utils/API'
import {ajax} from '../../utils/Network'

export default class StyleAdjust extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isProtect: false,
            opacity: 1,
            load: false,
            isModifiy: false,
            didMount: false,
            waiting: false,
            protectImg: props.protectImg
        }

        this.pollingTime = 500;
    }

    switch_protect() {
        if(!this.props.protectImg) {
            this.setState({
                waiting: true
            });
            this.getProtectImg();
        } else {
            this.setState({
                isProtect: !this.state.isProtect,
                isModifiy: true
            })
        }

    }

    getProtectImg() {
        const data = [];

        data.push(`originalPic=${this.props.originImg}`);
        data.push(`renderPic=${this.props.resultImg}`);

        const option = {
            method: 'post',
            url: api.protectColor,
            data: data.join('&'),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        ajax(option).then(result => {
            this.pollingAsk(result.data.id)
                .then((result) => {
                    this.props.changeImg('protectImg',result);
                    this.setState({
                        waiting: false,
                        isProtect: true,
                        isModifiy: true,
                        protectImg: result
                    })
                })
        })
    }

    pollingAsk(taskId) {
        let timerId = null;
        const pollingFun = (res) => {
            const option = {
                url: `${api.queryTask}${taskId}`
            };
            ajax(option).then( result => {
                if(result.data) {
                    clearInterval(timerId);
                    res(result.data.result);
                }
            });
        };
        return new Promise( res => {
            timerId = setInterval(() => pollingFun(res), this.pollingTime);
        });
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
            this.setState({
                didMount: false
            })
            setTimeout(() => {
                res();
            },600)
        })
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                didMount: true
            })
        },0);

    }

    render() {

        return(
            <div ref="pane" className={`style-process-pane adjust ${this.state.didMount? "enter" : ""}`}>
                <div className="images-label">
                    <WorkPane>
                        <ImagePane
                        img={this.props.originImg}
                        styles={{
                            zIndex: 1
                        }}
                        />
                    </WorkPane>
                    <WorkPane>
                        <ImagePane
                            events={this.control_opacity()}
                            styles={{
                                display: this.state.isProtect? 'block' : 'none',
                                opacity: this.state.opacity,
                                zIndex: 999
                            }}
                            img={this.props.protectImg}
                        />
                    </WorkPane>
                    <WorkPane>
                        <ImagePane
                            events={this.control_opacity()}
                            styles={{
                                display: !this.state.isProtect? 'block' : 'none',
                                opacity: this.state.opacity,
                                zIndex: 999
                            }}
                            height = { screen.height - 120}
                            className="content-pane mask"
                            img={this.props.resultImg}/>
                    </WorkPane>
                </div>
                <FooterNav>
                    <FooterBar>
                        <div className = {`switch ${this.state.isProtect? 'on' : 'off'}`}>
                            <section
                                onTouchStart={e => this.switch_protect()}
                                className="switch-btn">
                                {this.state.isProtect ? 'ON' : 'OFF'}
                            </section>
                            <sectoin className="switch-road">
                                <section className="bg"/>
                            </sectoin>
                        </div>
                        <div className="title">颜色保护</div>
                    </FooterBar>

                    <ul className="transfer-items">
                        <li onTouchStart={e => {this.back();}} className="btn icon-back"/>
                        <li className="title">调整</li>
                        <li onTouchStart={e => {
                            if(this.state.isModifiy) {
                                this.saveAndBack();
                            } else {
                                this.back();
                            }

                        }} className="btn icon-check"/>
                    </ul>
                </FooterNav>
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
                {this.state.waiting && <WaitingAnimation/>}
            </div>
        )
    }
}

