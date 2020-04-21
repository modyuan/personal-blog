import React from 'react';
import './TextList.css'

class TextList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        fetch("/articles?pageIndex=1&pageSize=10").then(response=> response.json()).then(json=>{
            let r2 = json.map(a => {
                return {
                    title: a.title,
                    author: a.author,
                    brief : a.brief,
                    date : new Date(a.createTime),
                    tags: a.tags
                }
            });
            this.setState({
                data: r2
            });
        }).catch( (e)=>{
            console.error(e);
        })
    }


    render() {
        let r = this.state.data.map(e=>{
            return (<TextListItem title={e.title} brief={e.brief} author={e.author} date={e.date} />);
        });
        return ( r );
    }
}

class TextListItem extends React.Component{
    render() {
        return (
            <div className="TextListItem">
                <h1>
                    {this.props.title}
                </h1>
                <div role="brief">
                    {this.props.brief}
                </div>
                <div style={{display:"flex", justifyContent:"space-between"}}>
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