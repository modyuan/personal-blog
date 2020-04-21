import React from 'react';
import './Nav.css'

class AppNav extends React.Component{
    // constructor(props) {
    //     super(props);
    // }

    render() {

        let userBar = null;
        if(this.props.userName){
            userBar = [<li key="username">你好，{this.props.userName}</li>,<li key="logoff" onClick={this.props.onRequireLogoff}  >注销</li>];
        }else{
            userBar = [<li key="pleaseLogin" onClick={this.props.onRequireLogin} >请登录</li>];
        }

        return (
            <div>
                <div className="AppNav-wrap">
                    <div className="AppNav">
                        <ul>
                            <li>首页</li>
                        </ul>
                        <div style={{display:"flex",justifyContent:"flex-end"}}>
                            {userBar}
                        </div>
                    </div>
                </div>
                <div className="AppNav-place" />
            </div>

        );
    }
}

export default AppNav;