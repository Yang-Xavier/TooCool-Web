/**
 * Created by yangbingxun on 2017/8/18.
 */

import React from 'react'

const CropType = {
    one_one: 0,
    two_one: 1,
    four_three: 2,
    five_three: 3,
    three_five: 4
};

export default class CropPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offsetX: 0,
            offsetY: 0,
            width: 0,
            height: 0,
            resizeInfo: {},
            moveInfo: {},
            cropType: props.cropType,
            timeId: null
        }
    }


    resize(offsetWidth = 0 ,offsetHeight = 0, baseH = true) {
        let dw,dh;
        switch (this.state.cropType) {
            case CropType.one_one :
                dh = baseH? offsetHeight : offsetWidth;
                dw = baseH? offsetHeight :offsetWidth;
                break;
            case CropType.two_one :
                dh = baseH? offsetHeight : offsetWidth / 2;
                dw = baseH? dh * 2 :offsetWidth;
                break;
            case CropType.four_three:
                dh = baseH? offsetHeight : offsetWidth * 3 / 4;
                dw = baseH? dh * 4 / 3 : offsetWidth;
                break;
            case CropType.five_three:
                dh = baseH? offsetHeight : offsetWidth * 3 / 5 ;
                dw = baseH? dh * 5 / 3 : offsetHeight;
                break;
            case CropType.three_five:
                dw = baseH? offsetHeight * 3 / 5 : offsetWidth;
                dh = baseH? offsetHeight : dw * 5 / 3;
                break;
        }

        return this.overstepWHProcess(dw,dh);
    }

    overstepWHProcess(dw, dh) {  //判断长宽越界并处理
        let wh = {
            dw: dw,
            dh: dh
        };
        if(this.refs['crop_pane'].offsetWidth + dw + this.refs['crop_pane'].offsetLeft > this.refs['crop_pane'].parentElement.offsetWidth) {
            let width_d = this.refs['crop_pane'].parentElement.offsetWidth - (this.refs['crop_pane'].offsetWidth + this.refs['crop_pane'].offsetLeft);
            [wh.dw,wh.dh] = this.resize(width_d, dh,false);
        }
        if(this.refs['crop_pane'].offsetHeight + dh + this.refs['crop_pane'].offsetTop > this.refs['crop_pane'].parentElement.offsetHeight) {
            let height_d = this.refs['crop_pane'].parentElement.offsetHeight - (this.refs['crop_pane'].offsetHeight + this.refs['crop_pane'].offsetTop);
            [wh.dw,wh.dh] = this.resize(dw, height_d);
        }
        if(this.refs['crop_pane'].offsetWidth + wh.dw <= 100) {
            wh = {
                dw: 0,
                dh: 0
            };
        }
        if(this.refs['crop_pane'].offsetHeight + wh.dh <= 100) {
            wh = {
                dw: 0,
                dh: 0
            };
        }
        return [wh.dw,wh.dh]
    }

    overstepPositionProcess(dx,dy) { //判断位置越界并处理
        let position = {
            dx: 0,
            dy: 0
        };
        if(
            this.refs['crop_pane'].offsetLeft + dx >= 0 &&
            this.refs['crop_pane'].offsetWidth + dx + this.refs['crop_pane'].offsetLeft <= this.refs['crop_pane'].parentElement.offsetWidth
        ) {
            position.dx = dx;
        }
        if(
            this.refs['crop_pane'].offsetTop + dy >= 0 &&
            this.refs['crop_pane'].offsetHeight + dy + this.refs['crop_pane'].offsetTop <= this.refs['crop_pane'].parentElement.offsetHeight
        ) {
            position.dy = dy;
        }
        return [position.dx, position.dy];
    }

    moveEvents(Etype){
        if(Etype == 'touchmove') {
            return e => {
                let dx = e.touches[0].screenX - this.state.moveInfo.x,
                    dy = e.touches[0].screenY - this.state.moveInfo.y;
                [dx,dy] = this.overstepPositionProcess(dx,dy);

                this.setState({
                    offsetX: this.state.offsetX + dx ,
                    offsetY: this.state.offsetY + dy,
                    moveInfo: {
                        x: e.touches[0].screenX,
                        y: e.touches[0].screenY
                    }
                })
            }
        }

        if(Etype == 'touchstart') {
            return e => {
                this.setState({
                    moveInfo: {
                        x: e.touches[0].screenX,
                        y: e.touches[0].screenY
                    }
                })
            }
        }

        if(Etype == 'touchend' ) {
            return e => {
                this.postCropPaneInfo();
                e.stopPropagation();
            }
        }
    }

    resizeEvents(Etype) {

        if(Etype == 'touchmove') {

            return e => {
                let dw = e.touches[0].screenX - this.state.resizeInfo.x,
                    dh = e.touches[0].screenY - this.state.resizeInfo.y;
                [dw,dh] = this.resize(dw,dh);

                this.setState({
                    width: this.state.width + dw ,
                    height: this.state.height + dh,
                    resizeInfo: {
                        x: e.touches[0].screenX,
                        y: e.touches[0].screenY
                    }
                })
                e.stopPropagation();
            }
        }

        if(Etype == 'touchstart') {
            return e => {

                this.setState({
                    resizeInfo: {
                        x: e.touches[0].screenX,
                        y: e.touches[0].screenY
                    }
                })
            }
        }

        if(Etype == 'touchend' ) {
            return e => {
                this.postCropPaneInfo();
                e.stopPropagation();
            }
        }
    }

    postCropPaneInfo() {
        this.props.setCropPaneInfo && this.props.setCropPaneInfo({
            offsetX: this.state.offsetX.toFixed(0),
            offsetY: this.state.offsetY.toFixed(0),
            width: (this.state.width + 2).toFixed(0),
            height: (this.state.height + 2).toFixed(0)

        })
    }

    changeCropType(cropType) {
        let w,h;
        switch (cropType) {
            case CropType.one_one :
                w = 200;
                h = 200;
                break;
            case CropType.two_one :
                w = 240;
                h = 120;
                break;
            case CropType.four_three:
                w = 240;
                h = 180;
                break;
            case CropType.five_three:
                w = 250;
                h = 180;
                break;
            case CropType.three_five:
                w = 180;
                h = 250;
                break;
        }

        this.setState({
            offsetX: 0,
            offsetY: 0,
            width: w,
            height: h,
            cropType: cropType,
            timeId: setTimeout(() => {
                clearTimeout(this.state.timeId);
                this.setState({
                    timeId: null
                })
            },300)
        })
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.cropType != this.state.cropType)
            this.changeCropType(nextProps.cropType)
    }



    render() {
        const cropStyle = {
            top: `${this.state.offsetY}px`,
            left: `${this.state.offsetX}px`,
            width: `${this.state.width}px`,
            height: `${this.state.height}px`
        };

        const btnStyle = {
            borderWidth: `${this.state.width*0.08}px`,
        };



        return(
            <div
                onTouchStart={this.moveEvents('touchstart')}
                onTouchMove={this.moveEvents('touchmove')}
                onTouchEnd={this.moveEvents('touchend')}
                ref="crop_pane"
                style={cropStyle}
                className={ `crop-pane ${this.state.timeId? 'animation' : ''} `}>
                <section
                    onTouchStart={this.resizeEvents('touchstart')}
                    onTouchMove={this.resizeEvents('touchmove')}
                    onTouchEnd={this.resizeEvents('touchend')}
                    style={btnStyle}
                />
            </div>
        )
    }
}