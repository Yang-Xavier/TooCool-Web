/**
 * Created by yangbingxun on 2017/8/8.
 */

import React from 'react';

import page_init_setting from '../utils/page-init';

import AfterStyleTransfer from './StyleTransfer/AfterStyleTransfer'
import CustomStyleTransfer from './StyleTransfer/CustomStyleTransfer'
import StyleTransfer from './StyleTransfer/StyleTransfer'
import HomeSimple from './Home/HomeSimple'

import '../css/page-init.scss'
import '../css/style-process.scss'
import '../css/style-transfer.scss'


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originImg: null,
            resultImg: null,
            protectImg: null,
            showImg: null,
            page: 0,
        }

        this.changePage = this.changePage.bind(this);
        this.changeImg = this.changeImg.bind(this);
    }

    componentDidMount() {
        page_init_setting();
    }

    changePage(page) {
        this.setState({
            page: page
        });
    }

    changeImg(type,img) {

        const newState = this.state;
        if(!newState[type]&& newState[type] != null) {
            return;
        }
        newState[type] = img;

        this.setState(newState);
    }

    getPage() {
        const comProps = {
            changePage: this.changePage,
            changeImg: this.changeImg
        };

        const styleTransferProps = {
            originImg: this.state.originImg,
            resultImg: this.state.resultImg,
            showImg: this.state.showImg
        };


        switch (this.state.page) {
            case 0:
                return <HomeSimple
                    {...comProps}
                />;

            case 1:
                return <StyleTransfer
                    {...comProps}
                    {...styleTransferProps}
                />;

            case 2:
                return <AfterStyleTransfer
                    {...comProps}
                    {...styleTransferProps}
                />;

            case 3:
                return <CustomStyleTransfer
                    {...comProps}
                    {...styleTransferProps}
                />;
        }

    }

    render() {

        return(
            this.getPage()
        )
    }
}
