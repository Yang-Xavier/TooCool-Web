/**
 * Created by yangbingxun on 2017/8/16.
 */

import React from 'react';
import StyleTransferProcess from './StyleTransferProcess';
import StyleAdjust from './StyleAdjust';
import StyleCrop from './StyleCrop';
import StyleMasker from './StyleMasker';

import SaveStack from '../../utils/SaveStack'

import '../../css/image-process.scss'

import origin_img from '../../images/test/p1.png'
import result_img from '../../images/test/guichu.png'
import protect_img from '../../images/test/IMG_3793.JPG'

export default class StyleTransferResult extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pageIndex: 0,
            originImg: origin_img,
            resultImg: result_img,
            showImg: result_img,
            protectImg: protect_img,
            historyStack: new SaveStack(10),
            couldRedo: false,
            couldUndo: false,
            hadCrop: false
        };

        this.changePage = this.changePage.bind(this);
        this.changeShowImg = this.changeShowImg.bind(this);
        this.redo = this.redo.bind(this);
        this.undo = this.undo.bind(this);
        this.clearHistoryStack = this.clearHistoryStack.bind(this);
    }

    changePage(index) {
        this.setState({
            pageIndex: index
        })
    }

    changeShowImg(img) {
        this.setState({
            showImg : img
        },() => {
            this.state.historyStack.push(this.state.showImg);
        })
    }



    undo() {
        this.setState({
            showImg: this.state.historyStack.undo(),
            couldUndo: this.state.historyStack.couldUndo()
        })
    }

    redo() {
        this.setState({
            showImg: this.state.historyStack.redo(),
            couldRedo: this.state.historyStack.couldRedo()
        })
    }

    clearHistoryStack() {
        this.setState({
            showImg : this.state.historyStack.getHistory('0')
        })
    }


    componentDidMount() {
        this.state.historyStack.push(this.state.showImg);
    }


    page(index) {
        switch (index) {
            case 1:
                return <StyleAdjust
                    changePage={this.changePage}
                    originImg={this.state.originImg}
                    resultImg={this.state.hadCrop? this.state.resultImg:this.state.showImg}
                    protectImg={this.state.protectImg}
                    changeShowImg={this.changeShowImg}
                />;
                break;
            case 2:
                return <StyleMasker
                    changePage={this.changePage}
                    changeShowImg={this.changeShowImg}
                    originImg={this.state.originImg}
                    resultImg={this.state.hadCrop? this.state.resultImg:this.state.showImg}
                />
                break;
            case 3:
                return <StyleCrop
                    changePage={this.changePage}
                    img={this.state.showImg}
                    changeShowImg={this.changeShowImg}
                />;
                break;
            case 0:
                return null;
        }
    }

    render() {
        return(
            <div>
                <StyleTransferProcess
                    changePage={this.changePage}
                    showImg={this.state.showImg}
                    redo={{could: this.state.couldRedo,fn: this.redo}}
                    undo={{could: this.state.couldUndo,fn: this.undo}}
                    clear={this.clearHistoryStack}
                />
                { this.page(this.state.pageIndex) }
            </div>
        )
    }

}
