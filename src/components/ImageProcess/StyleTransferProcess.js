/**
 * Created by yangbingxun on 2017/8/15.
 */

import React from 'react'
import ImageProcessHead from './ImageProcessHead'
import ImageController from './ImageController'
import FooterNav from './FooterNav'
import ImagePane from './ImagePane'
import '../../css/image-process.scss'

import img from '../../images/test/IMG_3793.JPG'

export default class StyleTransferProcess extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return(
            <div className="main-pane">
                <ImageProcessHead />
                <ImagePane
                    img = {img}
                    height = { screen.height - 120}
                />
                <FooterNav />
            </div>
        )
    }
}