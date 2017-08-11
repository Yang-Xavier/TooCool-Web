/**
 * Created by yangbingxun on 2017/8/8.
 */
import React from 'react';
import page_init_setting from '../utils/page-init';
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
            <div>
                <CanvasTest/>
            </div>
        )
    }
}
