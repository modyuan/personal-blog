import React from 'react';
import './Nav.css'

class AppNav extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {

        let userBar = null;
        if (this.props.userName) {
            userBar = [<li key="username">你好，{this.props.userName}</li>,
                <li key="logoff" onClick={this.props.onRequireLogoff}>注销</li>];
        } else {
            userBar = [<li key="pleaseLogin" onClick={this.props.onRequireLogin}>请登录</li>];
        }

        return (
            <div>
                <div className="AppNav-wrap">
                    <div className="AppNav">
                        <ul>
                            <NavPathItem href="/">首页</NavPathItem>
                            <NavPathItem href="/about">关于</NavPathItem>
                        </ul>
                        <div style={{display: "flex", justifyContent: "flex-end"}}>
                            {userBar}
                        </div>
                    </div>
                </div>
                <div className="AppNav-place"/>
            </div>

        );
    }
}


class NavPathItem extends React.Component {

    onClick = (e) => {
        e.preventDefault();
        window.history.pushState(null, '', this.props.href);
        if(window.onpopstate)
            window.onpopstate();
    }

    render() {
        return (
            <li>
                <a style={{textDecorationLine: "none",color:"inherit"}} href={this.props.href}
                   onClick={this.onClick}>{this.props.children}</a>
            </li>
        );
    }
}

export default AppNav;