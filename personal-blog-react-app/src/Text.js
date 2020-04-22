import React from 'react';
import './Text.css'
import './Common.css'
import './markdown.css'
import showdown from 'showdown';
import showdownHighlight from 'showdown-highlight';

class Text extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title : '',
            author: '',
            tags: '',
            content: '',
            createTime: new Date(0),
            renderedContent:''
        }

        fetch(`/api/article/${this.props.id}`)
            .then(response=> response.json())
            .then(json=>{
                let converter = new showdown.Converter({extensions: [showdownHighlight]});
                converter.setOption('strikethrough',true)
                converter.setOption('tasklists',true)
                converter.setOption('openLinksInNewWindow:',true)

                json.createTime = new Date(json.createTime);
                json.renderedContent = converter.makeHtml(json.content);
                console.log(json);
                this.setState(json);
            }).catch(e=>{
                console.log(e);
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        window.MathJax.typeset(); // 渲染Latex数学公式
    }

    render() {

        return (
            <div style={{width:1000,margin:"0 auto"}}>
                <div className="Card">
                    <h1 style={{margin:"0", textAlign:"center"}}>{this.state.title}</h1>
                    <div style={{display:"flex",justifyContent:"flex-end",fontSize:10,color:"#aaa"}}>
                        <div>
                            {this.state.author} 创建于 { this.state.createTime.Format("yyyy-MM-dd HH:mm:ss")}
                        </div>
                    </div>
                </div>
                <div className="Card markdown" style={{padding:"20px 40px"}}   dangerouslySetInnerHTML={{__html: this.state.renderedContent}} >
                </div>
            </div>
        );
    }
}

export default Text;