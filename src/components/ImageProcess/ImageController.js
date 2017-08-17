/**
 * Created by yangbingxun on 2017/8/15.
 */

import React from 'react'
import ImagePane from './ImagePane'


import img from '../../images/test/IMG_3793.JPG'

export default class ImageController extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <ImagePane
                img = {img}
                height = { screen.height - 120}
            >
            </ImagePane>
        )
    }
}