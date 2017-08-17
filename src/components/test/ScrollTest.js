/**
 * Created by yangbingxun on 2017/8/14.
 */

import React from 'react'
import IScroll from 'iscroll'

import '../../css/test.scss'

export default class ScrollTest extends React.Component {
    constructor(props) {
        super(props);

    }

    getList() {
        const a = [1,2,3,4,5,6,7,8,9,0];
        return a.map( (b,i) => <li
            key={i}
        >aaa</li>)
    }

    componentDidMount() {
        new IScroll('#wrapper', { scrollX: true, freeScroll: true , scrollY: false})
    }

    render() {
        const a = this.getList();
        return(
            <div id="wrapper">
                <div id="scroller">
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                </div>
            </div>
        )
    }
}