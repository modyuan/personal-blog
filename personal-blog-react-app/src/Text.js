import React from 'react';
import './Text.css'
import './Common.css'
import './markdown.css'
import showdown from 'showdown';
import showdownHighlight from 'showdown-highlight';

class Text extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        window.MathJax.typeset(); // 渲染Latex数学公式
        // 使用自己的扫描代替MathJax的全局扫描，这样可以一遍渲染出最后结果，而不用先渲染markdown，再渲染公式
    }

    deleteText = (id) => {
        let c = window.confirm(`《${this.props.data.title}》\n确定要删除文章吗？`);
        if (c && this.props.onDeleteText) {
            this.props.onDeleteText(id);
        }
    }

    render() {
        if (!this.props.data) {
            return <div style={{width: 1000, margin: "0 auto"}}></div>
        }
        let converter = new showdown.Converter({extensions: [showdownHighlight]});
        converter.setFlavor('github');
        let renderedContent = converter.makeHtml(this.props.data.content);


        let modifyButton, deleteButton;
        if (this.props.login) {
            modifyButton = (
                <button onClick={() => (this.props.onModify(this.props.data.id))}
                        className="cmd-button">
                    修改
                </button>);
            deleteButton = (
                <button onClick={() => {
                    this.deleteText(this.props.data.id)
                }} className="cmd-button">删除</button>
            );

        }

        return (
            <div style={{width: 1000, margin: "0 auto"}}>
                <div className="Card">
                    <h1 style={{margin: "0", textAlign: "center"}}>{this.props.data.title}</h1>
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        fontSize: 10,
                        color: "#aaa"
                    }}>
                        {deleteButton}
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