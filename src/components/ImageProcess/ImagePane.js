/**
 * Created by yangbingxun on 2017/8/14.
 */

import React from 'react'
import touch from 'touchjs'

export default class ImagePane extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            img: null,
            width: 0,
            height: 0
        }
    }


    resize(img, max_width = screen.width, max_height = screen.height) {
        const imgWidth = img.width;
        const imgHeight = img.height;
        let newWidth = 0;
        let newHeight = 0;
        let scale = imgWidth/max_width;
        if(imgHeight / scale > max_height) {
            scale = imgHeight / max_height;
            newWidth = (imgWidth/scale).toFixed(0);
            newHeight = max_height;
        } else {
            newWidth = max_width;
            newHeight = (imgHeight/scale).toFixed(0);
        }

        return {width: newWidth, height: newHeight}
    }

    componentWillReceiveProps(nextProps) {
        const img = document.createElement('img');
        img.src = nextProps.img;
        img.onload = e => {
            const wh = this.resize(img, this.props.width, this.props.height);
            this.setState({
                img: this.props.img,
                width: wh.width,
                height: wh.height
            })
        }
    }

    componentWillMount() {
        const img = document.createElement('img');
        img.src = this.props.img;
        img.onload = e => {
            const wh = this.resize(img, this.props.width, this.props.height);
            this.setState({
                img: this.props.img,
                width: wh.width,
                height: wh.height
            })
        }
    }

    componentDidMount() {
        for(let key in this.props.events) {
            touch.on(this.refs['img_label'], key, this.props.events[key])
        }
        if(this.props.postScale) {
            if (this.refs['img'].complete) {
                let scale = this.refs['img'].offsetWidth / this.refs['img'].naturalWidth;
                this.props.postScale(scale);
            }
            this.refs['img'].onload = e => {
                let scale = this.refs['img'].offsetWidth / this.refs['img'].naturalWidth;
                this.props.postScale(scale);
            }
        }

    }

    render() {
        const styles = this.props.styles || {};

        return (
            <div style={styles} className={this.props.className || "content-pane"}>
                <div
                    ref="img_label"
                    style={{
                        width: `${this.state.width}px`,
                        height: `${this.state.height}px`
                    }}
                >
                    <img
                        ref="img"
                        src={this.props.img}
                    />
                    { this.props.children || '' }
                </div>
            </div>
        )
    }
}