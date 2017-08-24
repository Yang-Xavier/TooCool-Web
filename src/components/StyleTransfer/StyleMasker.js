/**
 * Created by yangbingxun on 2017/8/20.
 */

import React from 'react'
import ImagePane from './ImagePane'
import DrawImgBoard from '../ImageProcess/DrawIngBoard'
import WorkPane from './WorkPane'
import FooterNav from '../com/FooterNav'
import FooterBar from '../com/FooterBar'
import WaitingAnimation from '../com/WaitingAnimation'


import touch from 'touchjs'

import api from '../../utils/API'
import {ajax} from '../../utils/Network'



const dataURLtoBlob = (dataurl) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

export default class StyleMasker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scale: 0,
            isModifiy: false,
            imgNode: null,
            didMount: false,
            cvs: null,
            ctx: null,
            cvsInfo: {},
            drawInfo: {
                lineWidth: 40,
                lx: 0,
                ly: 0
            },
            timeIds: {
                point: null
            },
            pointSize: 1,
            fluxInfo: {
                opacity: 1,
                percent: 100,
                lx: 0
            }
        };

        this.setScale = this.setScale.bind(this);
        this.getImgNode = this.getImgNode.bind(this);
        this.getCanvas = this.getCanvas.bind(this);
    }

    forwardAnimate() {
        return new Promise(res => {
            this.setState({
                didMount: false
            });
            setTimeout(() => {
                res();
            },600)
        })
    }

    produceImg() {
        this.setState({
            wait:true
        });
        const imgData = this.state.cvs.toDataURL();
        const img = document.createElement('img');
        const cvs = document.createElement('canvas');
        const ctx = cvs.getContext('2d');
        img.src = this.props.originImg;
        return new Promise(res => {
            img.onload = e => {
                cvs.width = img.naturalWidth;
                cvs.height = img.naturalHeight;
                ctx.drawImage(img, 0, 0);
                img.src = imgData;
                img.onload = e => {
                    ctx.drawImage(img, 0, 0);
                    const blob = dataURLtoBlob(cvs.toDataURL());
                    const fData = new FormData();
                    fData.append('img', blob);
                    const option = {
                        method: 'post',
                        url: api.fileUpload,
                        data: fData
                    };
                    ajax(option).then( result => {
                        this.props.changeShowImg(result.data.img);
                        res();
                    })

                }
            }
        })

    }

    setScale(scale) {
        this.setState({
            scale: scale
        })
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

    addCvsEvents() {

        touch.on(this.state.cvs, 'touchstart', e => {
            if(!this.state.cvsInfo.pageX) {
                let info = this.getDomOnPageXY(this.state.cvs);
                this.state.cvsInfo.pageX = info[0];
                this.state.cvsInfo.pageY = info[1];
            }

            let touch = e.touches[0];
            this.state.drawInfo.lx = ((touch.pageX - this.state.cvsInfo.pageX) * this.state.scale ).toFixed(0);
            this.state.drawInfo.ly = ((touch.pageY - this.state.cvsInfo.pageY) * this.state.scale ).toFixed(0);
            this.setState({
                isModifiy: true
            })
        });

        touch.on(this.state.cvs, 'touchmove', e => {
            let touch = e.touches[0];
            let x = ((touch.pageX - this.state.cvsInfo.pageX) * this.state.scale).toFixed(0),
                y = ((touch.pageY - this.state.cvsInfo.pageY) * this.state.scale).toFixed(0);
            this.state.ctx.globalCompositeOperation="destination-out";
            this.state.ctx.beginPath();
            this.state.ctx.lineWidth = (this.state.drawInfo.lineWidth * this.state.scale).toFixed(0);
            this.state.ctx.strokeStyle = `rgba(0,0,0,${this.state.fluxInfo.opacity})`;
            this.state.ctx.lineCap = 'round';
            this.state.ctx.moveTo(this.state.drawInfo.lx,this.state.drawInfo.ly);
            this.state.ctx.lineTo(x,y);
            this.state.ctx.stroke();
            this.state.drawInfo.lx = x;
            this.state.drawInfo.ly = y;
        });

    }

    fluxSelectEvents(eventType) {
        if(eventType == 'touchstart') {

            return e => {
                this.state.fluxInfo.lx = e.touches[0].pageX;
            }
        }

        if(eventType == 'touchmove') {

            return e => {
                const parentWidth = this.refs['select-btn'].parentElement.offsetWidth;
                const dp = (e.touches[0].pageX - this.state.fluxInfo.lx) * 2 / parentWidth;
                let np = this.state.fluxInfo.opacity + parseFloat(dp);
                if(np >= 1) np = 1;
                if(np <= 0) np = 0;
                this.setState({
                    fluxInfo: {
                        lx: e.touches[0].pageX,
                        opacity: np,
                        percent: (np * 100).toFixed(0)
                    }
                })

            }
        }

    }

    ctxInit() {
        this.state.ctx.clearRect(0, 0, this.state.cvs.width, this.state.cvs.height);
        const img = document.createElement('img');
        img.src = this.props.resultImg;
        img.onload = e => {
            this.state.ctx.drawImage(img, 0 ,0, this.state.cvs.width, this.state.cvs.height)
        }
    }

    getDomOnPageXY(dom) {
        const {top,left} = dom.getBoundingClientRect();
        return [left,top];
    }

    getImgNode(imgNode) {
        this.setState({
            imgNode: imgNode,
        },() => {
            this.state.cvs.width = this.state.imgNode.naturalWidth || this.state.imgNode.width;
            this.state.cvs.height = this.state.imgNode.naturalHeight || this.state.imgNode.height;
            this.setState({
                ctx: this.state.cvs.getContext('2d'),
            },() => {
                this.addCvsEvents();
                this.ctxInit();
            });
        });

    }

    getCanvas(cvs) {
        this.setState({
            cvs: cvs
        })
    }

    changePointSize(sizeType) {
        this.setState({
            pointSize: sizeType
        });
        this.state.drawInfo.lineWidth = sizeType * 25;
    }

    componentDidUpdate() {

    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                didMount: true
            });
        },0);
    }

    render() {

        return(
            <div  ref="pane" className={`style-process-pane masker ${this.state.didMount? "enter" : ""}`}>
                <WorkPane >
                    <ImagePane
                        img = {this.props.originImg}
                        postScale = {this.setScale}
                        postImgNode = {this.getImgNode}
                    >
                        <DrawImgBoard
                            postCanvas = {this.getCanvas}
                        />
                    </ImagePane>
                </WorkPane>
                <FooterNav className="tool-bar masker-tool">
                    <FooterBar className="option">
                        <ul className="pen-choice">
                            <li
                                onTouchStart={e => {this.changePointSize(1)}}
                                className={` ${this.state.pointSize == 1 ? 'choice' : ''}`}>
                                <div/>
                                <i/>
                            </li>
                            <li
                                onTouchStart={e => {this.changePointSize(2)}}
                                className={` ${this.state.pointSize == 2 ? 'choice' : ''}`}>
                                <div/>
                                <i/>
                            </li>
                            <li
                                onTouchStart={e => {this.changePointSize(3)}}
                                className={` ${this.state.pointSize == 3 ? 'choice' : ''}`}>
                                <div/>
                                <i/>
                            </li>
                            <li
                                onTouchStart={e => {this.changePointSize(4)}}
                                className={` ${this.state.pointSize == 4 ? 'choice' : ''}`}>
                                <div/>
                                <i/>
                            </li>
                        </ul>
                        <div className="flux">
                            <div className="label">
                                <span>{`${parseFloat(this.state.fluxInfo.percent)}%`}</span>
                            </div>
                            <div ref="select-btn" className="select">
                                <div className="road"/>
                                <div
                                    className="btn"
                                    style={{left: `${parseFloat(this.state.fluxInfo.percent)*0.75}%`}}
                                    onTouchStart={this.fluxSelectEvents('touchstart')}
                                    onTouchMove={this.fluxSelectEvents('touchmove')}
                                />
                            </div>
                        </div>
                        <div className="model">模板</div>
                    </FooterBar>
                    <ul className="transfer-items">
                        <li
                            onTouchStart = {e => {this.back();}}
                            className="btn icon-back"/>
                        <li className="title">遮罩</li>
                        <li
                            onTouchStart={e => {
                                if(this.state.isModifiy) {
                                    this.saveAndBack();
                                } else {
                                    this.back();
                                }
                            }
                            }
                            className="btn icon-check"/>
                    </ul>
                </FooterNav>
                {this.state.wait? <WaitingAnimation/>:null}
            </div>
        )
    }
}

