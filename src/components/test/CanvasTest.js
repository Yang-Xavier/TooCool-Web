/**
 * Created by yangbingxun on 2017/8/9.
 */
/**
 * Created by yangbingxun on 2017/8/8.
 */
import React from 'react';
import DrawIngBoard from '../drawing-board/DrawIngBoard';
import Redo_Undo from '../../utils/redo_undo'
import { resize, crop, readFileAsImg, rotate } from '../../utils/img-process'
import touch from '../../lib/touch-0.2.14'

export default class CanvasTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCvs: false,
            redo_undo: new Redo_Undo(10),
            cvs: null,
            ctx: null,
            img: null,
            originImg: null
        };

        this.getCanvas = this.getCanvas.bind(this)
    }

    getCanvas(cvs,ctx) {
        this.setState({
            cvs: cvs,
            ctx: ctx
        }, this.addListener);

    }

    addListener() {
        const self = this;
        touch.on(this.state.cvs, 'touchmove', e => {
            let touch = e.touches[0];
            let x = touch.pageX - touch.target.offsetLeft,
                y = touch.pageY - touch.target.offsetTop;
            this.state.ctx.fillStyle = 'black';
            this.state.ctx.beginPath();
            this.state.ctx.arc(x,y,10,0,2*Math.PI,true);
            this.state.ctx.fill();
            this.state.ctx.closePath();
        });

        touch.on(this.state.cvs, 'touchend', e => {
            const img = document.createElement('img');
            img.src = this.state.cvs.toDataURL();
            img.onload = e => {
                this.state.redo_undo.push(img);
            }
        })
    }

    rotate() {
        rotate(this.state.originImg, false, 180)
            .then( img => {
                this.setState({
                    img: img
                })
            })
    }

    redo() {
        const history = this.state.redo_undo.redo();
        this.state.ctx.clearRect(0,0,this.state.cvs.width,this.state.cvs.height);
        console.log(this.state.redo_undo);
        history && this.state.ctx.drawImage(history,0,0,this.state.cvs.width,this.state.cvs.height);
    }

    undo() {
        const history = this.state.redo_undo.undo();
        this.state.ctx.clearRect(0,0,this.state.cvs.width,this.state.cvs.height);
        history && this.state.ctx.drawImage(history,0,0,this.state.cvs.width,this.state.cvs.height);
    }

    changeFile(e) {
        const file = e.target.files[0];
        readFileAsImg(file)
            .then( img => {
                this.setState({originImg: img});
                resize(img, screen.width)
                    .then( img2 => {
                        this.setState({img: img2});
                    });
            })
    }

    render() {
        return(
            <div>
                <button
                    onClick={this.redo.bind(this)}
                >撤销</button>
                <button
                    onClick={this.undo.bind(this)}
                >还原</button>
                <input
                    type = "file"
                    onChange = { this.changeFile.bind(this)}
                />
                <button
                    onClick={this.rotate.bind(this)}
                >
                    旋转
                </button>
                <DrawIngBoard
                    width={screen.width}
                    height={screen.height}
                    getCanvas={this.getCanvas}
                    draw = {this.state.img}
                />
            </div>
        )
    }
}
