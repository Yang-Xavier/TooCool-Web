/**
 * Created by yangbingxun on 2017/8/9.
 */

import React from 'react'

export default class DrawIngBoard extends React.Component {
    constructor(props){
        super(props);

    }

    componentDidMount() {
        const cvs = this.refs['cvs'];
        const ctx = cvs.getContext('2d');
        this.props.getCanvas(cvs,ctx);
    }

    render() {
        return(
            <canvas
                ref="cvs"
                width={this.props.width}
                height={this.props.height}
            >
            你的手机不支持canvas
            </canvas>
        )
    }
}