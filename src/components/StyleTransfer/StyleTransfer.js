/**
 * Created by yangbingxun on 2017/8/14.
 */

import React from 'react'
import HeadNav from './HeadNav'
import StyleSelect from './StyleSelect'
import ImagePane from '../ImageProcess/ImagePane'
import '../../css/style-trasfer.scss'

import TestImg from '../../images/test/IMG_3793.JPG'

export default class StyleTransfer extends React.Component {
    constructor(props) {
        super(props);

    }

    forward() {
        console.log('f')
    }

    next() {
        console.log('n')
    }

    render() {
        return(
            <div className={"main-pane"}>
                <HeadNav forward={this.forward} next={this.next}/>
                <ImagePane  img={TestImg} height={screen.height - 62}>
                    <div/>
                </ImagePane>
                <StyleSelect/>
            </div>
        )
    }
}