/**
 * Created by yangbingxun on 2017/8/14.
 */

import React from 'react'
import IScroll from 'iscroll'

import custom from '../../images/icon/style/custom.png'
import styleImg from '../../images/test/s.png'
let styleImgList = [];
for(let i = 0 ; i< 10; i++) {
    styleImgList.push(styleImg);
}

export default class StyleSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stepIndex: 0,
        }
    }


    getChoice(index) {
        console.log(index)
    }

    goToCustom() {
        console.log('custom')
    }

    formatList() {
        let list = [];
        styleImgList.forEach((styleImg, index) =>
                list.push(
                    <li key={index + 1}>
                        <section
                            style={{backgroundImage: `url(${styleImg})`}}
                            onClick={e => this.getChoice(index)}
                        />
                    </li>
                )
        );

        list.unshift(
            <li key={0}>
                <section
                    style={{backgroundImage: `url(${custom})`}}
                    onClick={this.goToCustom}
                />
            </li>
        )


        return list
    }

    componentDidMount() {
        const scroll = new IScroll(this.refs.selectLabel, { scrollX: true, freeScroll: true })
    }

    render() {
        const styleList = this.formatList();
        return(
            <div className={"select-style-label"} ref={"selectLabel"} >
                <ul style={{width: `${styleList.length * 70 + 20}px`}}>
                    {this.formatList()}
                </ul>
            </div>
        )
    }
}