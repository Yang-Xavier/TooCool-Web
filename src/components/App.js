/**
 * Created by yangbingxun on 2017/8/8.
 */
import React from 'react';
import { Router , Route, IndexRoute, browserHistory} from 'react-router'
import page_init_setting from '../utils/page-init';
// import StyleTransfer from './StyleTransfer/StyleTransfer'
// import CustomStyleTransfer from './StyleTransfer/CustomStyleTransfer'
import StyleMasker from './StyleTransfer/StyleMasker'
// import StyleTransferProcess from './ImageProcess/StyleTransferProcess'

import StyleTransferResult from './StyleTransfer/StyleTransferResult'

import '../css/page-init.scss'


// import ScrollTest from './test/ScrollTest'
// import './utils/event'
// import CanvasTest from './test/CanvasTest'
// import AnimateTest from './test/AnimateTest'


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
                <Route path={"/"} components={StyleTransferResult}></Route>
                {/*<Route path={"/process"} components={}></Route>*/}
                {/*<Route path={"/styletrans"} components={}></Route>*/}
                {/*<Route path={"/stylecustom"} components={}></Route>*/}
                {/*<Route path={"/styletrans/custom"} components={}></Route>*/}
                {/*<Route path={"/canvastest"} components={CanvasTest}/>*/}
            </Router>
        )
    }
}
