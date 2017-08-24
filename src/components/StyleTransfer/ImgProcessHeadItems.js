/**
 * Created by yangbingxun on 2017/8/15.
 */

import React from 'react'


export default class ImgProcessHeadItems extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return(
            <ul className="head-nav">
                <li onTouchStart={e => {this.props.back()}}
                    className="btn icon-back"/>
                <li
                    onTouchStart={e => {this.props.undo()}}
                    className="btn icon-undo"/>
                <li
                    onTouchStart={e => {this.props.redo()}}
                    className="btn icon-redo"/>
                <li
                    onTouchStart={e => {this.props.clear()}}
                    className="btn icon-clear"/>
                <li onTouchStart={e => {this.props.save()}}
                    className="btn icon-save"/>
            </ul>
        )
    }
}