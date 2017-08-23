/**
 * Created by yangbingxun on 2017/8/20.
 */

import React from 'react'
import ImagePane from '../ImageProcess/ImagePane'
import DrawImgBoard from '../ImageProcess/DrawIngBoard'
import touch from 'touchjs'

import origin_img from '../../images/test/p1.png'
import result_img from '../../images/test/guichu.png'
import protect_img from '../../images/test/IMG_3793.JPG'



export default class StyleMasker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scale: 0,
            isModifiy: false,
            imgNode: null,
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
            this.refs['pane'].style.transform = `translateX(100%)`;
            setTimeout(() => {
                res();
            },600)
        })
    }

    produceImg() {
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
                    this.props.changeShowImg(cvs.toDataURL());
                    res();
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

        this.ctxInit();

        touch.on(this.state.cvs, 'touchstart', e => {
            let touch = e.touches[0];
            this.state.drawInfo.lx = ((touch.pageX - this.state.cvsInfo.pageX) / this.state.scale ).toFixed(0);
            this.state.drawInfo.ly = ((touch.pageY - this.state.cvsInfo.pageY) / this.state.scale ).toFixed(0);
            this.setState({
                isModifiy: true
            })
        });

        touch.on(this.state.cvs, 'touchmove', e => {
            let touch = e.touches[0];
            let x = ((touch.pageX - this.state.cvsInfo.pageX) / this.state.scale ).toFixed(0),
                y = ((touch.pageY - this.state.cvsInfo.pageY) / this.state.scale ).toFixed(0);
            this.state.ctx.globalCompositeOperation="destination-out";
            this.state.ctx.beginPath();
            this.state.ctx.lineWidth = (this.state.drawInfo.lineWidth / this.state.scale).toFixed(0);
            this.state.ctx.strokeStyle = `rgba(0,0,0,${this.state.fluxInfo.opacity})`;
            this.state.ctx.lineCap = 'round';
            this.state.ctx.moveTo(this.state.drawInfo.lx,this.state.drawInfo.ly);
            this.state.ctx.lineTo(x,y);
            this.state.ctx.stroke();
            this.state.ctx.closePath();
            this.state.drawInfo.lx = x;
            this.state.drawInfo.ly = y;
        });

        // touch.on(this.state.cvs, 'touchend', e => {
        //
        // })
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
                const dp = (e.touches[0].pageX - this.state.fluxInfo.lx) / parentWidth;
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
        img.src = result_img//this.props.resultImg;
        img.onload = e => {
            this.state.ctx.drawImage(img,0 ,0)
        }
    }

    getDomOnPageXY() {
        let x = 0,y = 0;
        let getX = (dom) => {
            x+= dom.offsetLeft;
            y+= dom.offsetTop;
            if(dom.parentElement) return getX(dom.parentElement);
            else return[x,y]
        };

        return getX;
    }

    getImgNode(imgNode) {
        this.setState({
            imgNode: imgNode,
        });
        this.state.cvs.width = this.state.imgNode.naturalWidth;
        this.state.cvs.height = this.state.imgNode.naturalHeight;
        const cvsInfo = this.getDomOnPageXY()(this.state.cvs);
        this.setState({
            ctx: this.state.cvs.getContext('2d'),
            cvsInfo: {
                pageX: cvsInfo[0],
                pageY: cvsInfo[1]
            }
        },() => {
            this.addCvsEvents();
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

    componentDidMount() {
        setTimeout(() => {this.refs['pane'].style.transform = `translateX(0px)`},0);
    }

    render() {
        const animateStyle = {transform : `translateX(100%)`,transition:`all .4s linear`};

        return(
            <div style={animateStyle} ref="pane" className="style-process-pane">
                <div className="image-label masker-pane">
                    <ImagePane
                        height = { screen.height - 120}
                        img = {origin_img}
                        className = "content-pane mask"
                        postScale = {this.setScale}
                        postImgNode = {this.getImgNode}>
                    <DrawImgBoard
                        postCanvas = {this.getCanvas}
                    />
                    </ImagePane>
                </div>
                <div className="tool-bar masker-tool">
                    <div className="option">
                        <div className="title flux">
                            <div className="label">
                                <span>{`${parseFloat(this.state.fluxInfo.percent)}%`}</span>
                            </div>
                            <div ref="select-btn" className="select">
                                <div className="road"/>
                                <div
                                    className="btn"
                                    style={{left: `${parseFloat(this.state.fluxInfo.percent)*0.80}%`}}
                                    onTouchStart={this.fluxSelectEvents('touchstart')}
                                    onTouchMove={this.fluxSelectEvents('touchmove')}
                                />
                            </div>
                        </div>
                        <div>
                            <ul>
                                <li
                                    onTouchStart={e => {this.changePointSize(1)}}
                                    className={`c1 ${this.state.pointSize == 1 ? 'animated' : ''}`}>
                                    <div/>
                                    <i/>
                                </li>
                                <li
                                    onTouchStart={e => {this.changePointSize(2)}}
                                    className={`c2 ${this.state.pointSize == 2 ? 'animated' : ''}`}>
                                    <div/>
                                    <i/>
                                </li>
                                <li
                                    onTouchStart={e => {this.changePointSize(3)}}
                                    className={`c3 ${this.state.pointSize == 3 ? 'animated' : ''}`}>
                                    <div/>
                                    <i/>
                                </li>
                                <li
                                    onTouchStart={e => {this.changePointSize(4)}}
                                    className={`c4 ${this.state.pointSize == 4 ? 'animated' : ''}`}>
                                    <div/>
                                    <i/>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div className="title model">模板</div>
                        </div>
                    </div>
                    <div className="menu">
                        <span
                            onTouchStart = {e => {this.back();}}
                            className="forward"/>
                        <span className="title">遮罩</span>
                        <span
                            onTouchStart={e => {
                                if(this.state.isModifiy) {
                                    this.saveAndBack();
                                } else {
                                    this.back();
                                }
                            }}
                            className="check"/>
                    </div>
                </div>
            </div>
        )
    }
}