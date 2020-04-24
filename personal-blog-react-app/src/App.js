import React from 'react';
import {PopDialog} from './PopDialog';
import AppNav from "./Nav";
import TextList from "./TextList";
import About from './About';
import Text from "./Text";
import PageSelector from './PageSelector';
import UploadText from './UploadText';

// 每页的文章数量
const itemsPerPage = 10;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: null, // 用户名，同时判断登录状态
            showLoginDialog: false,  // 是否显示登录框
            pageIndex: 1, // 当前列表页
            maxPageIndex: 1, // 列表页最大页
            currentText: null,
            currentTextList: [],
        }

        if (window.location.pathname.match("^/list/\\d+")) {
            this.state.pageIndex = parseInt(window.location.pathname.slice(6));
        }

        this.checkLoginStatus();
        this.checkMaxPageIndex();
    }

    // 检测最大页数
    checkMaxPageIndex = ()=>{
        fetch('/api/articleCount').then(response => response.json()).then(value => {
            let t = parseInt(value);
            if (t > 0) {
                this.setState({maxPageIndex: Math.ceil(t / itemsPerPage)})
            }
        });
    }

    // 检测登录状态
    checkLoginStatus =()=>{
        fetch('/user/login', {credentials: "include"}).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                this.setState({userName: null});
            }
        }).then(json => {
            if (json) {
                this.setState({userName: json.username});
            }
        }).catch(e => {
            console.error("fail to parse json from /user/login");
        });
    }

    switchPage(path, isForceUpdate) {
        console.log("onSwitchPage " + path);
        window.history.pushState(null, '', path);

        if(isForceUpdate){
            this.forceUpdate();
        }
    }

    componentDidMount() {
        window.onpopstate = () => {
            this.forceUpdate();
        }
    }

    componentWillUnmount() {
        window.onpopstate = null;
    }

    onRequireLogin = () => {
        this.setState({showLoginDialog: true});
    }

    onRequireLogoff = () => {
        fetch("/user/logout", {method: "post", credentials: "same-origin"}).then(res => {
            this.setState({userName: null});
        }).catch(e => {
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
                    this.setState({userName: msg.username, showLoginDialog: false});
                } else {
                    this.setState({userName: null});
                    alert("登录失败！");
                }
            }).catch(e => {
            console.error("fail to access /user/login!");
        });
    }

    onLoginClose = () => {
        this.setState({showLoginDialog: false});
    }

    loadTextList = (index, callback) => {
        fetch(`/api/articles?pageIndex=${index}&pageSize=${itemsPerPage}`).then(r => r.json()).then(json => {
            let r2 = json.map(a => {
                return {
                    id: a.id,
                    title: a.title,
                    author: a.author,
                    brief: a.brief,
                    date: new Date(a.createTime),
                    tags: a.tags
                }
            });
            if(callback) callback();
            this.setState({
                currentTextList: r2,
                pageIndex: index,
            });
        }).catch((e) => {
            console.error("fail to parse json from /articles");
        })
    }

    onClickPageSelector = (index) => {
        this.loadTextList(index, () => {
            this.switchPage("/list/" + index, false);
        });
    }

    loadText = (id, callback) => {
        fetch(`/api/article/${id}`)
            .then(response => response.json())
            .then(json => {
                if(callback) callback();
                json.createTime = new Date(json.createTime);
                this.setState({currentText: json});
            }).catch(e => {
            console.log(e);
        });
    }

    onClickTextListItem = (id) => {
        this.loadText(id, () => {
            this.switchPage("/text/" + id, false);
        });
    }

    onTextWantModify = (id)=>{
        this.switchPage("/edit/" + id, true);
    }

    onUpdateOrInsertText = (data) => {
        fetch('/api/article', {
            method: `${data.id>=0?'put':'post'}`, credentials: "same-origin", body: JSON.stringify(data), headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
            .then(response=>{
                if(response.status===200){
                    if(data.id>=0){
                        //update
                        this.loadText(data.id,()=>{
                            this.switchPage(`/text/${data.id}`,false);
                        });

                    }else{
                        //insert
                        response.json().then(json=>{
                            this.setState({currentText:null},()=>{
                                this.switchPage(`/text/${json.id}`,true);
                                this.checkMaxPageIndex();
                            });
                        })
                    }
                }else{
                    alert("fail to update text id="+data.id+" code="+response.status);
                }
            }).catch(e=>{
                alert("network fail!");
        });
    }

    onDeleteText = (id)=>{
        fetch("/api/article/"+id,{
            method:"delete",
            credentials:"same-origin"
        }).then(response=>{
            if(response.status===200){
                window.alert("删除文章成功！");
                this.switchPage("/",true);
                this.loadTextList(1)
            }else{
                window.alert("删除失败！");
            }
        }).catch(e=>{
            window.alert("无法连接到服务器！");
        });
    }

    render() {
        console.log("<App> render!");
        const route = [
            ["^/$", () => {
                console.log("route: index!");
                if(this.state.currentTextList.length === 0 || this.state.pageIndex !== 1) {
                    this.loadTextList(1);
                }
                return (
                    <div>
                        <TextList  data={this.state.currentTextList}
                                   onClick={this.onClickTextListItem}/>
                        <PageSelector maxPage={this.state.maxPageIndex} onClick={this.onClickPageSelector}/>
                    </div>
                );
            }],
            ["^/about$", () => (<About/>)],
            ["^/text/\\d+$", (pathname) => {
                console.log("route: text/id");
                let id = parseInt(pathname.slice(6));
                if(!this.state.currentText) {
                    console.log("current Text不存在， 尝试载入。。。")
                    this.loadText(id);
                }
                return <Text data={this.state.currentText} login={this.state.userName !== null}
                             onModify={this.onTextWantModify} onDeleteText={this.onDeleteText}/>
            }],
            ["^/login$", () => {
                setTimeout(() => {
                    this.setState({showLoginDialog: true});
                    this.switchPage("/",false);
                }, 100);
                return null;
            }],
            ["^/list/\\d+$", (pathname) => {
                console.log("route: list/index");
                let index = parseInt(pathname.slice(6)) || 1;
                if(this.state.currentTextList.length === 0 || this.state.pageIndex !== index) {
                    console.log(`监测到path(${index})和当前页数不一致（${this.state.pageIndex}） 载入列表`)
                    this.loadTextList(index);
                }
                return (
                    <div>
                        <TextList data={this.state.currentTextList} onClick={this.onClickTextListItem}/>
                        <PageSelector maxPage={this.state.maxPageIndex} onClick={this.onClickPageSelector}
                                      cur={this.state.pageIndex}/>
                    </div>
                );
            }],
            ["^/edit$",()=>{
                return <UploadText id={-1} data={{author: this.state.userName}}  onSubmit={this.onUpdateOrInsertText} />
            }],
            ["^/edit/\\d+",(pathname)=>{
                let editId = parseInt(pathname.slice(6));
                let data = this.state.currentText;
                if(!this.state.currentText || this.state.currentText.id !== editId) {
                    this.loadText(editId);
                    data = null
                }
                return (
                    <UploadText id={editId} data={data} onSubmit={this.onUpdateOrInsertText} />
                );

            }]
        ];

        let currentShow = null;

        let r = route.find((arr) => {
            if (window.location.pathname.match(arr[0])) {
                currentShow = arr[1](window.location.pathname);
                return true;
            } else {
                return false;
            }
        });

        if (!r) {
            console.log("fall back to index");
            currentShow= route[0][1](window.location.pathname);
        }

        return (
            <div>
                <AppNav userName={this.state.userName} onRequireLogin={this.onRequireLogin}
                        onRequireLogoff={this.onRequireLogoff} onNewTextClick={()=>{
                            this.switchPage("/edit",true);
                }} onJumpClick={
                    (href)=>{
                        if(href==='/'){
                            this.switchPage("/");
                            this.loadTextList(1);
                        }else{
                            this.switchPage(href,true);
                        }
                    }
                } />
                {currentShow}
                {
                    (this.state.showLoginDialog) && <PopDialog onSubmit={this.onLogin} onClose={this.onLoginClose}/>
                }
                <div style={{height: 40}}> </div>

            </div>

        );
    }
}

export default App;
