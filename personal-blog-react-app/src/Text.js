import React from 'react';
import './Text.css'
import './Common.css'
import './markdown.css'
import showdown from 'showdown';
import showdownHighlight from 'showdown-highlight';

class Text extends React.Component {
    constructor(props) {
        super(props);
        
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        window.MathJax.typeset(); // 渲染Latex数学公式
        // 使用自己的扫描代替MathJax的全局扫描，这样可以一遍渲染出最后结果，而不用先渲染markdown，再渲染公式
    }

    render() {
        if(!this.props.data){
            return <div style={{width: 1000, margin: "0 auto"}}></div>
        }
        let converter = new showdown.Converter({extensions: [showdownHighlight]});
        converter.setFlavor('github');
        let renderedContent = converter.makeHtml(this.props.data.content);

        let modifyButton = null;
        if (this.props.data.login)
            modifyButton = (
                <button style={{margin: 10, borderRadius: 3, background: "skyblue", border: "1px solid blue"}}>
                    修改
                </button>)
        
        return (
            <div style={{width: 1000, margin: "0 auto"}}>
                <div className="Card">
                    <h1 style={{margin: "0", textAlign: "center"}}>{this.props.data.title}</h1>
                    <div style={{display: "flex", justifyContent: "flex-end",alignItems:"center", fontSize: 10, color: "#aaa"}}>
                        {modifyButton}
                        <div>
                            {this.props.data.author} 创建于 {this.props.data.createTime.Format("yyyy-MM-dd HH:mm:ss")}
                        </div>
                    </div>
                </div>
                <div className="Card markdown" style={{padding: "20px 40px"}}
                     dangerouslySetInnerHTML={{__html: renderedContent}}>
                </div>
            </div>
        );
    }
}

export default Text;