/**
 * Created by yangbingxun on 2017/8/24.
 */

import React from 'react'

export default class WorkPane extends React.Component {

    constructor(props) {
        super(props)

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
        this.props.postCanvas && this.props.postCanvas(cvs, ctx);
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

    componentDidMount() {
        this.props.postOffsetWH && this.props.postOffsetWH(this.refs['pane'].offsetWidth,this.refs['pane'].offsetHeight)
        if(this.props.replace) {
            this.refs['cvs'].parentElement.appendChild(this.props.replace);
            this.refs['cvs'].remove();
        }
    }

    render() {
        const cvsStyle = {width: `${this.props.cvsStyleWidth}px`, height: `${this.props.cvsStyleHeight}px`}

        return(
            <div className="work-pane" ref="pane">
                {
                    this.props.children ||
                    <div style={cvsStyle}  className="container">
                        <canvas
                            ref="cvs"
                            width={this.props.width}
                            height={this.props.height}
                        >
                            你的手机不支持canvas
                        </canvas>
                    </div>
                }
            </div>
        )
    }
}