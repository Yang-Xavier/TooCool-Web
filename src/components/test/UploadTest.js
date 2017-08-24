/**
 * Created by yangbingxun on 2017/9/7.
 */

import React from 'react'


export default class UploadTest extends React.Component {

    constructor(props){
        super(props);

        this.file;
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    change(e) {

        this.file = e.target.files[0];


    }

    submit() {

        let formdata = new FormData();

        for(let i = 0 ; i<30; i++) {
            formdata.append('file'+i,this.file);
        }




        let xhr = new XMLHttpRequest();

        xhr.open('POST','/file/upload',true);
        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4) {

                console.log(xhr.responseText);
            }
        }
        xhr.send(formdata)
    }



    render() {


        return(
            <div>
                <input type="file" onChange={this.change}/>
                <button onTouchStart={this.submit}>submit</button>
            </div>
        )
    }
}