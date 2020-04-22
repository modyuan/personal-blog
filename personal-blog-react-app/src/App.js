import React from 'react';
import {PopDialog} from './PopDialog';
import AppNav from "./Nav";
import TextList from "./TextList";
import About from './About';
import Text from "./Text";
import PageSelector from './PageSelector'

// 每页的文章数量
const itemsPerPage = 10;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            showLoginDialog: false,
            pageIndex: 1,
            maxPageIndex: 1,
            pathname: window.location.pathname,
            currentShow: null
        }

        if(window.location.pathname.match("^/list/\\d+")){
            this.state.pageIndex = parseInt(window.location.pathname.slice(6));
        }

        fetch('/user/login', {credentials: "include"}).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                this.setState({userName: null});
            }
        }).then(json => {
            if(json){ this.setState({userName: json.username});}
        }).catch(e=>{
            console.error("fail to parse json from /user/login");
        });

        fetch('/api/articleCount').then(response=>response.json()).then(value=>{
            let t = parseInt(value);
            if(t>0){
                //console.log(Math.ceil( t/itemsPerPage))
                this.setState({maxPageIndex: Math.ceil( t/itemsPerPage) })
            }
        });


    }

    onSwitchPage(path){
        console.log("onSwitchPage "+ path);
        //this.setState({pathname:path});
        this.forceUpdate();
    }


    componentDidMount() {
        window.onpopstate = ()=>{
            this.onSwitchPage(window.location.pathname);
        }
    }

    componentWillUnmount() {
        window.onpopstate = null;
    }

    onRequireLogin = () => {
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

    onLoginClose=()=>{
        this.setState({showLoginDialog: false});
    }

    onPageChange = (index)=>{
        console.log("want to change page to "+index);
        this.setState({pageIndex: index});
        window.history.pushState(null,'',"/list/"+index);
    }


    render() {
        console.log("main render!");
        const route = [
            ["^/$", ()=>  (
                <div>
                    <TextList index={this.state.pageIndex}  size={itemsPerPage} />
                    <PageSelector maxPage={this.state.maxPageIndex} onClick={this.onPageChange}  />
                </div>
            ) ],
            ["^/about$", ()=> ( <About /> )],
            ["^/text/\\d+$",(pathname)=>{
                let id = parseInt(pathname.slice(6));
                return <Text id={id}/>
            }  ],
            ["^/login$",()=>{
                setTimeout(()=>{
                    this.setState({showLoginDialog:true});
                    window.history.pushState(null,'','/');
                    window.onpopstate();
                },100);
                return null;
            }],
            ["^/list/\\d+$",(pathname)=>{
                let index= parseInt(pathname.slice(6)) || 1;
                if(index !== this.state.pageIndex){
                    setTimeout(()=>{ this.setState({pageIndex:index})},100);
                }
                return (
                    <div>
                        <TextList index={this.state.pageIndex}  size={itemsPerPage} />
                        <PageSelector maxPage={this.state.maxPageIndex} onClick={this.onPageChange} cur={this.state.pageIndex} />
                    </div>
                );
            }]
        ];

        let r = route.find((arr)=>{
            if(window.location.pathname.match(arr[0])){
                this.state.currentShow = arr[1](window.location.pathname);
                return true;
            }else{
                return false;
            }
        });

        if(!r){
            console.log("fall back to index");
            this.state.currentShow = route[0][1](window.location.pathname);
        }

        return (
            <div>
                <AppNav userName={this.state.userName} onRequireLogin={this.onRequireLogin}
                        onRequireLogoff={this.onRequireLogoff}/>
                { this.state.currentShow }
                {
                    (this.state.showLoginDialog) && <PopDialog onSubmit={this.onLogin}  onClose={this.onLoginClose} />
                }
                <div style={{height: 40}}></div>

            </div>

        );
    }
}

export default App;
