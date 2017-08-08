/**
 * Created by yangbingxun on 2017/7/30.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import './css/page-init.scss'
import InputTest from './components/test/InputTest'
let rootElement = document.getElementById('app');

ReactDOM.render(
    <div>
        <InputTest/>
    </div>, rootElement
);