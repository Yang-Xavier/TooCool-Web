/**
 * Created by yangbingxun on 2017/8/17.
 */

import React from 'react'
import ImagePane from './ImagePane'
import Toast from '../com/Toast'
import CropPane from '../com/CropPane'
import WorkPane from './WorkPane'
import FooterNav from '../com/FooterNav'
import FooterBar from '../com/FooterBar'

import {crop} from '../../utils/img-process'

export default class StyleCrop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cropType: -1,
            cropPaneInfo: {},
            scale: 0,
            didMount: false,
            isModifiy: false
        };

        this.setCropPaneInfo = this.setCropPaneInfo.bind(this);
        this.setScale = this.setScale.bind(this);
    }


    produceImg() {
        const originImg = document.createElement('img');
        originImg.src = this.props.img;
        return new Promise(res => {
            originImg.onload = e => {
                crop(
                    originImg,
                    (this.state.cropPaneInfo.offsetX / this.state.scale).toFixed(2),
                    (this.state.cropPaneInfo.offsetY / this.state.scale).toFixed(2),
                    (this.state.cropPaneInfo.width / this.state.scale).toFixed(2),
                    (this.state.cropPaneInfo.height / this.state.scale).toFixed(2)
                )
                    .then( img => {
                        this.props.changeShowImg(img.src);
                        this.props.hadCrop();
                        res();
                    })
            }
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

    forwardAnimate() {
        return new Promise(res => {
            this.refs['pane'].style.transform = `translateX(100%)`;
            setTimeout(() => {
                res();
            },600)
        })
    }

    setCropPaneInfo(info) {
        this.setState({
            cropPaneInfo: info,
            isModifiy: true
        })
    }

    changeCropPane(cropType) {
        this.setState({
            cropType: cropType
        })
    }

    setScale(scale) {
        this.setState({
            scale: scale
        })
    }

    componentDidMount() {
        this.setState({
            didMount: true
        })
    }

    render() {
        const animateStyle = {transform : `translateX(100%)`,transition:`all .4s linear`};

        const cropSelect = (
            <ul className="crop-select">
                <li
                    className={this.state.cropType == 0? 'choice':''}
                    onTouchStart={e => {this.changeCropPane(0)}}
                ><i/><label>1:1</label></li>
                <li
                    className={this.state.cropType == 1? 'choice':''}
                    onTouchStart={e => {this.changeCropPane(1)}}
                ><i/><label>1:2</label></li>
                <li
                    className={this.state.cropType == 2? 'choice':''}
                    onTouchStart={e => {this.changeCropPane(2)}}
                ><i/><label>4:3</label></li>
                <li
                    className={this.state.cropType == 3? 'choice':''}
                    onTouchStart={e => {this.changeCropPane(3)}}
                ><i/><label>5:3</label></li>
                <li
                    className={this.state.cropType == 4? 'choice':''}
                    onTouchStart={e => {this.changeCropPane(4)}}
                ><i/><label>3:5</label></li>
            </ul>
        );


        return(
            <div ref="pane" className={`style-process-pane crop ${this.state.didMount? "enter" : ""}`}>
                <WorkPane className="image-label">
                    <ImagePane
                        img = {this.props.img}
                        className = "content-pane mask"
                        postScale = {this.setScale}>
                        <CropPane
                            setCropPaneInfo = {this.setCropPaneInfo}
                            cropType = {this.state.cropType}/>
                    </ImagePane>
                </WorkPane>
                <FooterNav >
                    <FooterBar >
                        {cropSelect}
                    </FooterBar>
                    <ul className="transfer-items">
                        <li onTouchStart = {e => {this.back();}} className="btn icon-back"/>
                        <li className="title">裁剪</li>
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
                    msg="请选择一个尺寸"
                    bottom="7rem"
                    showTime="2"
                    remove={true}
                />
            </div>

        )
    }
}