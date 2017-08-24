/**
 * Created by yangbingxun on 2017/8/14.
 */

import React from 'react'
import touch from 'touchjs'

import {resize} from '../../utils/img-process'


export default class ImagePane extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            img: null,
            width: 0,
            height: 0,
            scale: 0
        }
    }


    // componentWillReceiveProps(nextProps) {
    //     // const img = this.refs['img'];
    //     // img.src = nextProps.img;
    //     //
    //     // if(img.complete) {
    //     //     this.postImg(img);
    //     //     this.resize(img);
    //     // } else {
    //     //     img.onload = e => {
    //     //         this.postImg(img);
    //     //         this.resize(img);
    //     //     }
    //     // }
    // }

    componentWillMount() {

    }

    componentDidMount() {
        for(let key in this.props.events) {
            touch.on(this.refs['img'], key, this.props.events[key])
        }
        const img = this.refs['img'];

        if(img.complete) {
            this.postImg(img);
            this.resize(img);
        } else {
            img.onload = e => {
                this.postImg(img);
                this.resize(img);
            }
        }
    }

    postImg(img) {
        this.props.postWH && this.props.postWH(img.width, img.height);
        this.props.postImgNode && this.props.postImgNode(img);
    }

    resize(img) {
        const container = this.refs['container'];
        const {width, height} = resize(img, container.offsetWidth, container.offsetHeight, true);
        this.setState({
            width: width,
            height: height,
            scale: (img.naturalWidth || img.width) / width
        },() =>{this.props.postScale && this.props.postScale(this.state.scale)})
    }

    render() {
        const wh = {width: `${this.state.width}px`, height: `${this.state.height}px`};
        const styles = this.props.styles ? Object.assign({}, this.props.styles, wh): wh;

        return (
            <div ref={"container"} className="container">
                <div style={styles} ref="img-label" className="img-label">
                    <img ref="img" src={this.props.img}/>
                    {this.props.children}
                </div>
            </div>
        )
    }
}