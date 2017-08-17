/**
 * Created by yangbingxun on 2017/8/16.
 */

import React from 'react'
import StyleTransferProcess from '../ImageProcess/StyleTransferProcess'

export default class StyleTransferResult extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pageIndex: 0
        }
    }

    changePage(index) {
        this.setState({
            pageIndex: index
        })
    }

    page(index) {
        switch (index) {
            case 1:
                return(
                    <StyleTransferResult
                        changePage={this.changePage}
                    />
                )
            case 0:
            default:
                return (
                    <StyleTransferProcess
                        changePage={this.changePage}
                    />
                )
        }
    }


    render() {
        return(
            <div>
                { this.page(this.state.pageIndex) }
            </div>
        )
    }
}
