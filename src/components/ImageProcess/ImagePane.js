/**
 * Created by yangbingxun on 2017/8/14.
 */

import React from 'react'
import { readUrlToImg, resize } from '../../utils/img-process'
import touch from '../../lib/touch-0.2.14'

export default class ImagePane extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imgData: {},
            width: 0,
            height: 0
        }
    }


    componentDidMount() {
        for(let k in this.props.events) {
            touch.on(this.refs['img_label'], k ,this.props.events[k])
        }
        readUrlToImg(this.props.img)
            .then( img2 => {
                resize(img2, this.props.width, this.props.height)
                    .then( img3 => {
                        this.setState({
                            imgData: img3.src,
                            width: img3.width / 2,
                            height: img3.height / 2
                        })
                    })
            });


    }

    render() {

        return (
            <div style={this.props.style || {}} className={this.props.className || "content-pane"}>
                <img
                    ref='img_label'
                    src={this.state.imgData}
                    width={this.state.width}
                    height={this.state.height}
                    style={{
                        width: `${this.state.width}px`,
                        height: `${this.state.height}px`
                    }}
                />
                { this.props.children || '' }
            </div>
        )
    }
}