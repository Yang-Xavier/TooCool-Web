/**
 * Created by yangbingxun on 2017/8/31.
 */

import React from 'react';
import {imgExtAllow} from '../../utils/Files'
import {ajax} from '../../utils/Network'
import api from '../../utils/API'
import {compressImg} from '../../utils/img-process'

import WaitingAnimation from '../com/WaitingAnimation'

import '../../css/home.scss'

const SelectFileBtn = props => {

    return(
        <div className="select-file-pane">
            <button>
                <i/>
                <label>选择图片</label>
                <input type="file" onChange={props.fileChange}/>
            </button>
        </div>
    )
};

export default class HomeSimple extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wait: false
        }

        this.fileChange = this.fileChange.bind(this);
    }


    fileChange(e) {
        const file = e.target.files[0];
        if(!file) return;
        if(!imgExtAllow(file.name)){
            alert('请选择jpg或者png图片！');
            return;
        };
        this.setState({
            wait: true
        })
        compressImg(file).then(
            newFile => {
                const fData = new FormData();
                fData.append('img', newFile);
                const option = {
                    method: 'post',
                    url: api.fileUpload,
                    data: fData
                };
                ajax(option).then ( result => {
                    if(result && result.data && result.data.img) {
                        this.props.changeImg('originImg', result.data.img);
                        this.props.changeImg('showImg', result.data.img);
                        this.props.changePage(1);
                    }
                    else {
                        const fileReader = new FileReader();
                        fileReader.readAsDataURL(file);
                        fileReader.onload = e => {
                            this.props.changeImg('originImg', e.target.result);
                            this.props.changeImg('showImg', e.target.result);
                            this.props.changePage(1);
                        }
                    }
                });
            }
        )

    }


    render() {

        return(
            <div className="main-pane simple">
                <SelectFileBtn
                    fileChange = {this.fileChange}
                />
                {this.state.wait?<WaitingAnimation/>:null}
            </div>
        )
    }
}
