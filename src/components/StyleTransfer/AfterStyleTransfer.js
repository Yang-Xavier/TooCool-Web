/**
 * Created by yangbingxun on 2017/8/25.
 */

import React from 'react'

import HeaderNav from '../com/HeaderNav';
import ImagePane from './ImagePane';
import FooterNav from '../com/FooterNav';
import WorkPane from './WorkPane';
import StyleAdjust from './StyleAdjust';
import StyleCrop from './StyleCrop';
import StyleMasker from './StyleMasker';
import ImgProcessHeadItems from './ImgProcessHeadItems';
import TransferReultFooterItems from './TransferReultFooterItems';

import SaveStack from '../../utils/SaveStack';

import touch from 'touchjs'

import {resize} from '../../utils/img-process'

// const originImg = 'http://www.static_xavier.com:8081/static/images/test/p1.png',
// resultImg = 'http://www.static_xavier.com:8081/static/images/test/guichu.png',
// showImg = 'http://www.static_xavier.com:8081/static/images/test/guichu.png'

export default class AfterStyleTransfer extends React.Component {

    constructor(props) {
        super(props);

        const {originImg,resultImg,showImg} = this.props;


        this.state = {
            pageIndex: 0,
            originImg: originImg,
            resultImg: resultImg,
            showImg: showImg,
            protectImg: null,
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
        this.changeImg = this.changeImg.bind(this);
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

    changeShowImg(img) {
        this.setState({
            showImg : img,
            hadCrop: false
        },() => {
            this.state.historyStack.push(this.state.showImg);
        })
    }

    changePage(index) {
        this.setState({
            pageIndex: index
        })
    }

    changeImg(type, img) {
        const newState = this.state;
        newState[type] = img
        this.setState(newState);

    }

    componentDidMount() {
        this.state.historyStack.push(this.state.showImg);
    }

    getPage() {
        switch (this.state.pageIndex) {
            case 1:
                return <StyleAdjust
                    changePage={this.changePage}
                    originImg={this.state.originImg}
                    resultImg={this.state.hadCrop? this.state.resultImg:this.state.showImg}
                    protectImg={this.state.protectImg}
                    changeShowImg={this.changeShowImg}
                    changeImg={this.changeImg}
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
                     hadCrop={() => {this.setState({hadCrop: true})}}
                 />;
                break;
            case 0:
                return null;
        }
    }

    saveImg() {
        const img = document.createElement('img');
        const styles = {
            display:'block',
            position: 'fixed',
            top: '0',
            left: '100%',
            transition:'all .3s linear'

        };
        img.src = this.state.showImg;
        img.onload = e => {
            resize(img).then( nImg => {
                document.body.append(nImg);
                for(let key in styles) {
                    nImg.style[key] = styles[key];
                }
                touch.on(img,'touchstart',(e) => {
                    nImg.style.left = '100%';
                    setTimeout(e => {
                        img.remove();
                    },300)
                });
                setTimeout(() => {
                    nImg.style.left = '0';
                },0)
            })
        }
    }

    render() {

        return(
            <div className="main-pane">
                <HeaderNav>
                    <ImgProcessHeadItems
                        back = {e => {this.props.changePage(1)}}
                        undo = {this.undo}
                        redo = {this.redo}
                        clear = {this.clearHistoryStack}
                        save = {e => this.saveImg()}
                    />
                </HeaderNav>
                <WorkPane>
                    <ImagePane
                        img = {this.state.showImg}
                    />
                </WorkPane>
                <FooterNav>
                    <TransferReultFooterItems
                        changePage = {this.changePage}
                    />
                </FooterNav>
                {this.getPage()}
            </div>
        )

    }
}