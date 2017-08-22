/**
 * Created by yangbingxun on 2017/8/16.
 */

import React from 'react';
import StyleTransferProcess from '../ImageProcess/StyleTransferProcess';
import StyleAdjust from '../ImageProcess/StyleAdjust';
import StyleCrop from '../ImageProcess/StyleCrop';
import StyleMasker from '../ImageProcess/StyleMasker';

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
            originImg: result_img,
            showImg: result_img,
            historyStack: new SaveStack(10),
            couldRedo: false,
            couldUndo: false,
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
                    originImg={origin_img}
                    resultImg={result_img}
                    protectImg={protect_img}
                    changeShowImg={this.changeShowImg}
                />;
                break;
            case 2:
                return <StyleCrop
                    changePage={this.changePage}
                    img={result_img}
                    changeShowImg={this.changeShowImg}
                />;
                break;
            case 3:
                return <StyleMasker
                    changePage={this.changePage}
                    changeShowImg={this.changeShowImg}
                    originImg={origin_img}
                    resultImg={result_img}
                />
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
