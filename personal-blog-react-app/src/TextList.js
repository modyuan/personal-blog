import React from 'react';
import './TextList.css'
import './Common.css'

class TextList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            index: this.props.index
        }
        this.fetchDate();
    }

    fetchDate= ()=>{
        const index = parseInt(this.props.index);
        const size = parseInt(this.props.size);
        fetch(`/api/articles?pageIndex=${index}&pageSize=${size}`).then(response => response.json()).then(json => {
            let r2 = json.map(a => {
                return {
                    id : a.id,
                    title: a.title,
                    author: a.author,
                    brief: a.brief,
                    date: new Date(a.createTime),
                    tags: a.tags
                }
            });
            this.setState({
                data: r2,
                index: this.props.index
            });
        }).catch((e) => {
            console.error("fail to parse json from /articles");
        })
    }


    render() {

        console.log("render TextList!")

        if(this.props.index !== this.state.index){
            this.fetchDate();
        }
        let r = this.state.data.map(e => {
            return (<TextListItem title={e.title} brief={e.brief} author={e.author} date={e.date} id={e.id} key={e.id}/>);
        });
        return (
            <div style={{width: 1000,margin:"0 auto"}}>
                {r}
            </div>
        );
    }
}

class TextListItem extends React.Component {
    onClick=()=>{
        if(this.props.id) {
            window.history.pushState(null, '', '/text/' + this.props.id);
            if(window.onpopstate){
                window.onpopstate();
            }else{
                console.log("onpopstate do not exist!");
            }
        }
    }
    render() {
        return (
            <div className="TextListItem Card" onClick={this.onClick}>
                <h1 style={{cursor:"pointer"}}>
                    {this.props.title}
                </h1>
                <div name="brief">
                    {this.props.brief}
                </div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div></div>
                    <div>
                        {this.props.author} 发布于 {this.props.date.toLocaleString()}
                    </div>
                </div>
            </div>
        );
    }
}

export default TextList;