/**
 * Created by yangbingxun on 2017/8/8.
 */
import React from 'react';

export default class InputTest extends React.Component {
    render() {
        return (
            <div>
                <input type="file" onChange={e => {
                    console.log(e.target.files)
                }}/>
            </div>
        )
    }
}