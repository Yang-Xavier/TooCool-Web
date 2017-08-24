/**
 * Created by yangbingxun on 2017/8/24.
 */

import React from 'react'
import ImageProcessHead from '../ImageProcess/ImageProcessHead'
import WorkPane from  './WorkPane'
import ToolMenu from './ToolMenu'
import FootBar from './FootBar'
import ItemList from './ItemList'
import HomeMenu from './HomeMenu'

import fx from 'glfx'

import {resize} from '../../utils/img-process'

import origin_img from '../../images/test/p1.png'
import result_img from '../../images/test/guichu.png'
import protect_img from '../../images/test/IMG_3793.JPG'


const ToolBarType = {
    filter: 1,
    poster: 2,
    process: 3,
    home: 0
};
export default class FilterPane extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cvsWidth: 0,
            cvsHeight: 0,
            naturalWidth: 0,
            naturalHeight: 0,
            fxCanvas: fx.canvas(),
            img: origin_img,
            toolbarType: ToolBarType.home

        };

        this.getWorkPaneShowWH = this.getWorkPaneShowWH.bind(this);

    }


    componentDidMount() {
        const img = document.createElement('img');
        img.src = this.state.img;
        img.onload = e => {
            const texture = this.state.fxCanvas.texture(img);
            this.state.fxCanvas.draw(texture).update();
            this.setState({
                naturalWidth: img.width,
                naturalHeight: img.height
            });
            resize(img, this.state.cvsWidth, this.state.cvsHeight)
                .then(img2 => {
                    this.setState({
                        cvsWidth: img2.width,
                        cvsHeight: img2.height
                    })
                })
        }


    }

    getWorkPaneShowWH(w,h) {
        this.setState({
            cvsWidth: w,
            cvsHeight: h
        })
    }

    getToolBar() {
        switch (this.state.toolbarType) {
            case ToolBarType.filter:
                break;
            case ToolBarType.poster:
                break;
            case ToolBarType.process:
                break;
            default:
            case ToolBarType.home:

                return(
                    <ToolMenu>
                        <ItemList/>
                        <FootBar>
                            <HomeMenu/>
                        </FootBar>
                    </ToolMenu>
                );
                break;
        }

    }



    render() {
        const toolbar = this.getToolBar();


        return(
            <div className="filter-pane main-pane">
                <ImageProcessHead/>
                <WorkPane
                    postOffsetWH = {this.getWorkPaneShowWH}
                    width = {this.state.naturalWidth}
                    height = {this.state.naturalHeight}
                    cvsStyleWidth = {this.state.cvsWidth}
                    cvsStyleHeight = {this.state.cvsHeight}
                    replace = {this.state.fxCanvas}
                />
                {toolbar}
            </div>
        )
    }
}
