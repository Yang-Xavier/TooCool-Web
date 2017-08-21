/**
 * Created by yangbingxun on 2017/8/15.
 */

import React from 'react'
import ImageProcessHead from './ImageProcessHead'
import FooterNav from './FooterNav'
import ImagePane from './ImagePane'
import '../../css/image-process.scss'

export default class StyleTransferProcess extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return(
            <div className="main-pane">
                <ImageProcessHead
                    redo={this.props.redo}
                    undo={this.props.undo}
                    clear={this.props.clear}
                />
                <ImagePane
                    styles = {{height: `calc(100% - 2.75rem - 3.3rem - 1rem`}}
                    img = {this.props.showImg}
                    height = { screen.height - 120}
                />
                <FooterNav changePage={this.props.changePage}  />
            </div>
        )
    }
}