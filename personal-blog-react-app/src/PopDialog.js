import React from 'react';
import "./PopDialog.css"

class PopDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            username: '',
            password: ''
        };
    }

    onSubmit(e){
        e.preventDefault();
        this.setState({
            show: false
        });

        if (this.props.onSubmit) {
            this.props.onSubmit({username: this.state.username, password: this.state.password});
        } else {
            console.warn("onSubmit is not handled!");
        }
    }
    onClose(e){
        e.preventDefault();
        this.setState({
            show:false
        })
    }

    onChange(e){
        //console.log( `${e.target.name} = ${e.target.value}`);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div style={{display: this.state.show?'block':'none'}}>
                <div className="PopDialog-back">
                    <div className="PopDialog">
                        <div onClick={(e)=>{this.onClose(e)}} style={{position:"absolute",right:"12px",top:"12px",width:20,height:20,cursor:"pointer"}}>
                            <svg t="1587447439035" className="icon" viewBox="0 0 1024 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" p-id="1141" width="20" height="20">
                                <path
                                    d="M810.666667 273.493333L750.506667 213.333333 512 451.84 273.493333 213.333333 213.333333 273.493333 451.84 512 213.333333 750.506667 273.493333 810.666667 512 572.16 750.506667 810.666667 810.666667 750.506667 572.16 512z"
                                    p-id="1142" fill="#000000"></path>
                            </svg>
                        </div>
                        <form onSubmit={(e)=>this.onSubmit(e)}>
                            <label style={{"display":"block"}}> 请登录 </label>
                            <input type="text" name='username' placeholder="请输入用户名" value={this.state.username || ''} onChange={(e)=>this.onChange(e)}/>
                            <input type="password" name='password' placeholder="请输入密码" value={this.state.password || ''}  onChange={(e)=>this.onChange(e)}/>
                            <button>登录</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}



export {PopDialog};