import React from 'react';
import {PopDialog} from './PopDialog';
import AppNav from "./Nav";
import TextList from "./TextList";


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            showLoginDialog: false
        }

        fetch('/user/login', {credentials: "include"}).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                this.setState({userName: null});
                throw null;
            }
        }).then(json => {
            this.setState({userName: json.username});
        });
    }

    onRequireLogin = () => {
        console.log("onRequireLogin()");
        this.setState({showLoginDialog: true});
    }

    onRequireLogoff = () => {
        fetch("/user/logout",{method:"post",credentials:"same-origin"}).then(res=>{
            this.setState({userName: null});
        }).catch(e=>{
            console.error("fail to post /user/logout!");
        });
    }

    onLogin = (msg) => {
        fetch('/user/login', {
            method: "post",
            credentials: 'same-origin',
            headers: {'Content-Type': "application/json; charset=UTF-8"},
            body: JSON.stringify(msg)
        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({userName: msg.username});
                } else {
                    this.setState({userName: null});
                }
            }).catch(e => {
            console.error("fail to access /user/login!");
        });
    }


    render() {

        return (
            <div>
                <AppNav userName={this.state.userName} onRequireLogin={this.onRequireLogin}
                        onRequireLogoff={this.onRequireLogoff}/>
                <TextList/>
                {
                    this.state.showLoginDialog && <PopDialog onSubmit={this.onLogin}/>
                }

            </div>

        );
    }
}

export default App;
