/**
 * Created by yangbingxun on 2017/8/17.
 */

import React from 'react'
import ImagePane from './ImagePane'
import Toast from '../com/Toast'
import CropPane from './CropPane'

import result_img from '../../images/test/guichu.png'
import protect_img from '../../images/test/IMG_3793.JPG'



export default class StyleCrop extends React.Component {
    constructor(props) {
        super(props);

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

        const cropSelect = (
            <ul className="crop-select">
                <li><i/><span>1:1</span></li>
                <li><i/><span>2:1</span></li>
                <li><i/><span>4:3</span></li>
                <li><i/><span>5:3</span></li>
                <li><i/><span>3:5</span></li>
            </ul>
        );


        return(
            <div style={animateStyle} ref="pane" className="style-process-pane">
                <div className="image-label">
                    <ImagePane
                        height = { screen.height - 120}
                        img={protect_img}
                        className="content-pane mask"
                    >
                        <CropPane/>
                    </ImagePane>
                </div>
                <div className="tool-bar">
                    <div className="option">
                        {cropSelect}
                    </div>
                    <div className="menu">
                        <span onTouchStart={e => {this.back();}} className="forward"/>
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
                />
            </div>

        )
    }
}