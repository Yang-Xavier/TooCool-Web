/**
 * Created by yangbingxun on 2017/8/14.
 */

import React from 'react'
import HeaderNav from '../com/HeaderNav'
import HeadItems from './HeadItems'
import ImagePane from './ImagePane'
import WorkPane from './WorkPane'
import FooterNav from '../com/FooterNav'
import WaitingAnimation from '../com/WaitingAnimation'

import IScroll from 'iscroll'

import StyleSrc from '../../images/StyleImgSrc'

import {ajax} from '../../utils/Network'
import api from '../../utils/API'

import {compressImg} from '../../utils/img-process'


import custom from '../../images/icon/style/custom.png'

let styleImgList = [];
for(let key in StyleSrc) {
    styleImgList.push({
        key: key,
        src:StyleSrc[key]
    });

}

export default class StyleTransfer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            originImg: props.originImg,
            resultImg: props.resultImg,
            showImg: props.showImg,
            waiting: false,
        },

        this.back = this.back.bind(this);
        this.next = this.next.bind(this);
        this.goToCustom = this.goToCustom.bind(this);

        this.taskId = null;
        this.pollingTime = 500;
        this.resultCache = {};
        this.touchMove = false;
    }

    back() {
        this.props.changePage(0);
    }

    next() {
        const {originImg, resultImg, showImg} = this.state;
        this.props.changeImg('originImg', originImg);
        this.props.changeImg('resultImg', resultImg);
        this.props.changeImg('showImg', showImg);
        this.props.changePage(2);
    }

    formatList() {
        let list = [];
        styleImgList.forEach((styleImg, index) =>
            list.push(
                <li key={styleImg.key}>
                    <section
                        style={{backgroundImage: `url(${styleImg.src})`}}
                        onTouchMove={e => (this.touchMove = true)}
                        onTouchEnd={e => this.getChoice(styleImg.key)}
                    />
                </li>
            )
        );

        list.unshift(
            <li key={0}>
                <section
                    style={{backgroundImage: `url(${custom})`}}
                    onTouchStart={this.goToCustom}
                />
            </li>
        )


        return list;
    }

    goToCustom() {
        this.props.changePage(3);
    }

    styleTransfer(key) {
        if(this.resultCache[key]) {
            this.setState({
                showImg: this.resultCache[key],
                waiting: false
            })
        } else {
            const data = [];
            data.push(`originalPic=${this.state.originImg}`);
            data.push(`model_name=${key}`);

            const option = {
                method: 'post',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: api.modelStyleTransfer,
                data: data.join('&')
            };

            ajax(option).then( result => {
                try {
                    this.taskId= result.data.id;
                    this.pollingAsk().then(res => {
                        this.setState({
                            showImg: res,
                            resultImg: res,
                            waiting: false
                        })
                        this.resultCache[key] = res;
                    })
                } catch (e) {
                    return;
                }
            })
        }
    }

    pollingAsk() {
        let timerId = null;
        const pollingFun = (res) => {
            const option = {
                url: `${api.queryTask}${this.taskId}`
            };
            ajax(option).then( result => {
                if(result.data) {
                    clearInterval(timerId);
                    res(result.data.result);
                }
            });
        }
        return new Promise( res => {
            timerId = setInterval(() => pollingFun(res), this.pollingTime);
        });
    }




    getChoice(key) {
        if(!this.touchMove) {
            this.setState({
                waiting: true
            })
            this.touchMove = false;
            this.styleTransfer(key);
        }
        else {
            this.touchMove = false;
        }


    }

    componentDidMount() {
        const scroll = new IScroll(this.refs.selectLabel, { scrollX: true, freeScroll: true })
    }

    render() {
        const styleList = this.formatList();

        return(
            <div className={"main-pane"}>
                <HeaderNav>
                    <HeadItems back = {this.back} next={this.next}/>
                </HeaderNav>
                <WorkPane>
                    <ImagePane img = {this.state.showImg}>
                    </ImagePane>
                </WorkPane>
                <FooterNav>
                    <div className={"select-style-label"} ref={"selectLabel"} >
                        <ul style={{width: `${styleList.length * 70 }px`}}>
                            {styleList}
                        </ul>
                    </div>
                </FooterNav>
                {this.state.waiting? <WaitingAnimation/> : null}

            </div>
        )
    }
}