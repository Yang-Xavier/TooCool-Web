/**
 * Created by yangbingxun on 2017/8/8.
 */
import React from 'react';

export default class InputTest extends React.Component {
    render() {
        return (
            <div>
                <canvas
                    id="cvs"
                    width={screen.width}
                    height={screen.height}
                ></canvas>
            </div>
        )
    }

    componentDidMount () {
        const cvs = document.querySelector('#cvs');
        const ctx = cvs.getContext('2d');

    }
}