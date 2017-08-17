/**
 * Created by yangbingxun on 2017/8/8.
 */
import React from 'react';
import { Router , Route, IndexRoute, browserHistory} from 'react-router'
import page_init_setting from '../utils/page-init';
import StyleTransfer from './StyleTransfer/StyleTransfer'
import CustomStyleTransfer from './StyleTransfer/CustomStyleTransfer'
import StyleTransferProcess from './ImageProcess/StyleTransferProcess'
import StyleAdjust from './ImageProcess/StyleAdjust'

import '../css/page-init.scss'


import ScrollTest from './test/ScrollTest'
// import './utils/event'

import CanvasTest from './test/CanvasTest'


export default class App extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        page_init_setting();
    }

    render() {
        return(
            <Router history={browserHistory}>
                <Route path={"/"} components={StyleAdjust}></Route>
                {/*<Route path={"/process"} components={}></Route>*/}
                {/*<Route path={"/styletrans"} components={}></Route>*/}
                {/*<Route path={"/stylecustom"} components={}></Route>*/}
                {/*<Route path={"/styletrans/custom"} components={}></Route>*/}
                {/*<Route path={"/canvastest"} components={CanvasTest}/>*/}
            </Router>
        )
    }
}
