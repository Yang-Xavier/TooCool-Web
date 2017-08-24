/**
 * Created by yangbingxun on 2017/8/29.
 */

import React from 'react';

const allowImgFileType = ['png','jpg','jpeg','bmp'];

export default class FileSelectToBase64 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectFile: 0
        }
    }

    change(e) {
        const file = e.target.files[0];
        if(!file){
            return;
        }
        const fileExt = file.name.match(/\.\w+$/)[0].substring(1).toLowerCase();
        let allowUpload = false;
        allowImgFileType.forEach( type => {
            if(fileExt == type) {
                allowUpload = true;
            }
        });
        if(!allowUpload) {
            return;
        }


        this.readFileAsDataUrl(file)
            .then(result => {
                this.postFile(result)
            })

    }

    readFileAsDataUrl (file) {
        const fReader = new FileReader();
        fReader.readAsDataURL(file);
        return new Promise(res => {
            fReader.onload = e => {
                res(e.target.result);
            }
        });

    }

    postFile(fileData) {

        this.props.postDataUrl(fileData)
    }

    open() {
        this.refs['input'].click();
    }

    shouldComponentUpdate(nextProps) {
        if(nextProps.selectFile != this.state.selectFile) {
            this.open();
            this.state.selectFile++;
            return false;
        }

    }

    render() {

        return(
            <input
                ref="input"
                type="file"
                style={{opacity: 0}}
                onChange={e => this.change(e)}
            />
        )
    }
}
