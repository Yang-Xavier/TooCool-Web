/**
 * Created by yangbingxun on 2017/8/17.
 */

import React from 'react'
import ImagePane from './ImagePane'
import Toast from '../com/Toast'
import CropPane from './CropPane'
import {crop} from '../../utils/img-process'

import result_img from '../../images/test/guichu.png'
import protect_img from '../../images/test/IMG_3793.JPG'



const CropType = {
    one_one: 0,
    two_one: 1,
    four_three: 2,
    five_three: 3,
    three_five: 4
};

export default class StyleCrop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cropType: null,
            cropPaneInfo: {},
            scale: 0,
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
                console.log(this.state.cropPaneInfo)
                crop(
                    originImg,
                    (this.state.cropPaneInfo.offsetX / this.state.scale).toFixed(2),
                    (this.state.cropPaneInfo.offsetY / this.state.scale).toFixed(2),
                    (this.state.cropPaneInfo.width / this.state.scale).toFixed(2),
                    (this.state.cropPaneInfo.height / this.state.scale).toFixed(2)
                )
                    .then( img => {
                        this.props.changeShowImg(img.src);
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
        setTimeout(() => {this.refs['pane'].style.transform = `translateX(0px)`},0)
    }

    render() {
        const animateStyle = {transform : `translateX(100%)`,transition:`all .4s linear`};

        const cropSelect = (
            <ul className="crop-select">
                <li
                    className={this.state.cropType == CropType.one_one? 'choice':''}
                    onTouchStart={e => this.changeCropPane(CropType.one_one)}
                ><i/><span>1:1</span></li>
                <li
                    className={this.state.cropType == CropType.two_one? 'choice':''}
                    onTouchStart={e => this.changeCropPane(CropType.two_one)}
                ><i/><span>1:2</span></li>
                <li
                    className={this.state.cropType == CropType.four_three? 'choice':''}
                    onTouchStart={e => this.changeCropPane(CropType.four_three)}
                ><i/><span>4:3</span></li>
                <li
                    className={this.state.cropType == CropType.five_three? 'choice':''}
                    onTouchStart={e => this.changeCropPane(CropType.five_three)}
                ><i/><span>5:3</span></li>
                <li
                    className={this.state.cropType == CropType.three_five? 'choice':''}
                    onTouchStart={e => this.changeCropPane(CropType.three_five)}
                ><i/><span>3:5</span></li>
            </ul>
        );


        return(
            <div style={animateStyle} ref="pane" className="style-process-pane">
                <div className="image-label">
                    <ImagePane
                        height = { screen.height - 120}
                        img = {this.props.img}
                        className = "content-pane mask"
                        postScale = {this.setScale}>
                        <CropPane
                            setCropPaneInfo = {this.setCropPaneInfo}
                            cropType = {this.state.cropType}/>
                    </ImagePane>
                </div>
                <div className="tool-bar">
                    <div className="option">
                        {cropSelect}
                    </div>
                    <div className="menu">
                        <span onTouchStart = {e => {this.back();}} className="forward"/>
                        <span className="title">裁剪</span>
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
                    msg="请选择一个尺寸"
                    bottom="7rem"
                    showTime="2"
                    remove={true}
                />
            </div>

        )
    }
}