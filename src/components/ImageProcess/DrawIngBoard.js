/**
 * Created by yangbingxun on 2017/8/9.
 */

import React from 'react'

export default class DrawIngBoard extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            cvs: null,
            ctx: null
        }

    }

    componentDidUpdate() {
        if(this.props.draw)
            this.drawing(this.props.draw);
    }

    componentDidMount() {
        const cvs = this.refs['cvs'];
        const ctx = cvs.getContext('2d');
        this.setState({
            cvs: cvs,
            ctx: ctx
        });
        this.props.postCanvas && this.props.postCanvas(cvs,ctx);
        if(this.props.draw) {
            if(this.props.draw.x) {
                this.drawing(this.props.draw.img, this.props.draw.x, this.props.draw.y)
            } else {
                this.drawing(this.props.draw);
            }
        }

    }

    drawing(img) {
        const x = (this.state.cvs.width - img.width) ;
        const y = (this.state.cvs.height - img.height) ;
        this.state.ctx.drawImage(img, x, y);
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