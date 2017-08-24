/**
 * Created by yangbingxun on 2017/8/15.
 */

import React from 'react'
import HeaderNav from '../com/HeaderNav'
import HeadItems from './HeadItems'

import {imgExtAllow} from '../../utils/Files'
import {compressImg} from '../../utils/img-process'
import {ajax} from '../../utils/Network'
import api from '../../utils/API'

import FileSelectToBase64 from '../com/FileSelectToBase64'


export default class CustomStyleTransfer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originImg: props.originImg,
            styleImg: null,
            isDoing: false
        };

        this.setOriginImg = this.setOriginImg.bind(this);
        this.setStyleImg = this.setStyleImg.bind(this);
        this.beginCombine = this.beginCombine.bind(this);

        this.originImgFile = null;
        this.styleImgFile = null;

        this.taskId = null;
        this.pollingTime = 500;
    }

    forward() {
        this.props.changePage(1);
    }

    setOriginImg(e) {
        const img = e.target.files[0];
        if(!imgExtAllow(img.name)){
            alert('请选择jpg或者png图片！');
            return;
        };
        this.originImgFile = img;
        const fread = new FileReader();
        fread.readAsDataURL(img);
        fread.onload = (e) => {
            this.setState({
                originImg: fread.result
            })
        }

    }

    setStyleImg(e) {
        const img = e.target.files[0];
        if(!imgExtAllow(img.name)){
            alert('请选择jpg或者png图片！');
            return;
        };
        this.styleImgFile = img;
        const fread = new FileReader();
        fread.readAsDataURL(img);
        fread.onload = (e) => {
            this.setState({
                styleImg: fread.result
            })
        }
    }

    beginCombine() {
        if(!this.styleImgFile) {
            alert('请选择一张风格图!');
            return;
        }

        this.setState({isDoing:true});
        this.postImages()
            .then(this.sendToCombine.bind(this))
            .then(this.pollingAsk.bind(this))
            .then(result => {
                this.props.changeImg('resultImg',result);
                this.props.changeImg('originImg',this.state.originImg);
                this.props.changeImg('showImg',result);
                this.props.changePage(2);
            })
    }

    postImages() {
        const files = {};
        if(this.originImgFile) {
            files.originImg = this.originImgFile;
        }
        files.styleImg = this.styleImgFile;
        const fData = new FormData();
        let newFile = {};
        return new Promise( g_res => {
            const hasOrigin = !!files.originImg;
            const all = [compressImg(files.styleImg),hasOrigin?compressImg(files.originImg):Promise.resolve()];
            Promise.all(all).then( values  => {
                if(hasOrigin) {
                    newFile.originImg = values[1];
                }
                newFile.styleImg = values[0];
                for(let key in newFile) {
                    fData.append(key, newFile[key]);
                }
                const option = {
                    method: 'post',
                    url: api.fileUpload,
                    data: fData
                };
                const {originImg,styleImg} = this.state;
                const images = {originImg,styleImg};
                ajax(option).then( res => {
                    Object.assign(images, res.data);
                    this.setState({...images});
                    g_res(images);
                })
            });
        })
    }

    sendToCombine(images) {
        let data = [];
        data.push(`originalPic=${images.originImg}`);
        data.push(`stylePic=${images.styleImg}`);

        const option = {
            method: 'post',
            url: api.customStyleTransfer,
            data: data.join('&'),
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        return ajax(option).then( result => {
            this.taskId = result.data.id;
        });
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
        };

        return new Promise( res => {
            timerId = setInterval(() => pollingFun(res), this.pollingTime);
        });
    }

    render() {
        const DoingStyle = {opacity: `${this.state.isDoing?0.5:1}`};

        return(
            <div className={"main-pane"}>
                <HeaderNav>
                    <HeadItems back = {e => this.forward()}/>
                </HeaderNav>
                <div className="container">
                    <div className="title">
                        风格合成
                    </div>
                    <div className="origin-label">
                        <div className="image-select">
                            <span
                                style={this.state.originImg?{backgroundImage: `url(${this.state.originImg})`}:{}}
                                className="img-block origin-img">
                                <input
                                    type = "file"
                                    onChange = {this.setOriginImg}
                                />
                            </span>
                            <span className="icon plus"/>
                            <span
                                style={this.state.styleImg?{backgroundImage: `url(${this.state.styleImg})`}:{}}
                                className="img-block style-img">
                                <input
                                    type = "file"
                                    onChange = {this.setStyleImg}
                                />
                            </span>

                        </div>
                        <div className="info-label">
                            <div style={DoingStyle} className="btn option" onTouchStart={this.state.isDoing?null:this.beginCombine}>
                                {this.state.isDoing?'正在合成':'开始合成'}
                            </div>
                            <div className="info-bar">
                                {this.state.isDoing?'此次合成大约30秒':''}
                            </div>
                        </div>
                    </div>
                    <div className="back-home-label">
                        <div className="go-home">
                            <div className="btn">
                                <i className="icon-home"/>
                                <label>返回首页</label>
                            </div>
                            <div className="slogan">
                                <div>
                                    <div>生活从此toocool!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}