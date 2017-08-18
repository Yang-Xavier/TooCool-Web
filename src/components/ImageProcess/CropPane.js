/**
 * Created by yangbingxun on 2017/8/18.
 */

import React from 'react'


export default class CropPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offsetX: 0,
            offsetY: 0,
            width: 100,
            height: 100
        }
    }

    eventEntry(type) {

        if(type == 'touchmove') {

            return btnType => {
                return e => {

                }
            }
        }

        if(type == 'touchstart') {

        }

        if(type == 'touchend' ) {

        }


    }



    render() {
        const cropStyle = {
            top: `${this.state.offsetX}px`,
            left: `${this.state.offsetY}px`,
            width: `${this.state.width}px`,
            height: `${this.state.height}px`
        };

        return(
            <div style={cropStyle} className="crop-pane">
                <section />
                <section />
                <section />
                <section />
            </div>
        )
    }
}