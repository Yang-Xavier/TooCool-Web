/**
 * Created by yangbingxun on 2017/8/17.
 */
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../../css/test.scss'

export default class AnimateTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            a:true
        }
    }


    render() {

        return(
            <div>
            { this.state.a?
                <ReactCSSTransitionGroup
                    transitionName="test"
                    transitionAppear={true}
                    transitionAppearTimeout={1000}
                    transitionEnter={false}
                    transitionLeave={true}
                    transitionLeaveTimeout={1000}
                >
                    <div onTouchStart={e=>{this.setState({a:false})}} style={{color:'#fff', fontSize: '2rem'}}>
                        123
                    </div>
                </ReactCSSTransitionGroup> :
                <ReactCSSTransitionGroup
                    transitionName="test"
                    transitionAppear={true}
                    transitionAppearTimeout={1000}
                    transitionEnter={false}
                    transitionLeave={true}
                    transitionLeaveTimeout={1000}
                >
                    <div onTouchStart={e=>{this.setState({a:true})}} style={{color:'#fff', fontSize: '2rem'}}>
                        <div>321</div>
                    </div>
                </ReactCSSTransitionGroup>

            }
            </div>
        )
    }

}