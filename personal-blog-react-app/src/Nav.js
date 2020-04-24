import React from 'react';
import './Nav.css'

class AppNav extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {

        let userBar = null;
        if (this.props.userName) {
            userBar = [<li key="newText" onClick={this.props.onNewTextClick}>写文章</li>,
                <li key="username">你好，{this.props.userName}</li>,
                <li key="logoff" onClick={this.props.onRequireLogoff}>注销</li>];
        } else {
            userBar = [<li key="pleaseLogin" onClick={this.props.onRequireLogin}>请登录</li>];
        }

        return (
            <div>
                <div className="AppNav-wrap">
                    <div className="AppNav">
                        <ul style={{padding:0,margin:0}}>
                            <NavPathItem href="/" onClick={this.props.onJumpClick}>首页</NavPathItem>
                            <NavPathItem href="/about" onClick={this.props.onJumpClick}>关于</NavPathItem>
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

    onClick = (e,href) => {
        e.preventDefault();
        this.props.onClick(href);
    }

    render() {
        return (
            <li>
                <a style={{textDecorationLine: "none",color:"inherit"}} href={this.props.href}
                  onClick={(e)=>{ this.onClick(e,this.props.href)}} >{this.props.children}</a>
            </li>
        );
    }
}

export default AppNav;