/**
 * Created by yangbingxun on 2017/8/8.
 */
import React from 'react';
import page_init_setting from './utils/page-init';
import DrawIngBoard from './drawing-board/DrawIngBoard';
import Redo_Undo from './utils/redo&undo'


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCvs: false,
            redo_undo: new Redo_Undo(10),
            cvs: null,
            ctx: null
        }

        this.getCanvas = this.getCanvas.bind(this)
    }

    componentDidMount() {
        page_init_setting();
    }

    getCanvas(cvs,ctx) {
        this.setState({
            cvs: cvs,
            ctx: ctx
        }, this.addListener);

    }

    addListener() {
        const self = this;
        this.state.cvs.addEventListener('touchmove', e => {
            let x = e.changedTouches[0].clientX,
                y = e.changedTouches[0].clientY;
            console.log(e)
            this.state.ctx.fillStyle = 'black';
            this.state.ctx.beginPath();
            this.state.ctx.arc(x,y,10,0,2*Math.PI,true);
            this.state.ctx.fill();
            this.state.ctx.closePath();
        });
        this.state.cvs.addEventListener('touchend', e => {
            // console.log(this.state.cvs.toDataURL());
            // self.redo_undo.push(this.state.cvs.toDataURL());
        })
    }

    checkCvs() {

    }

    redo() {

    }

    undo() {

    }

    render() {
        return(
            <div>
                <button
                >撤销</button>
                <button
                >重做</button>
                <DrawIngBoard
                    width={screen.width}
                    height={screen.height}
                    getCanvas={this.getCanvas}
                />
            </div>
        )
    }
}
