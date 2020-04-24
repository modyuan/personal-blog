import React from "react";
import './UploadText.css'
import './Common.css'

// 上传文章的组件

class UploadText extends React.Component {

    constructor(props) {
        super(props);

        this.refTitle = React.createRef();
        this.refTags = React.createRef();
        this.refContent = React.createRef();
    }

    onSubmit = () => {
        let title = this.refTitle.current.value;
        let tags = this.refTags.current.value;
        let content = this.refContent.current.value;

        let id = this.props.id || -1; // -1 即新的文章

        if (this.props.onSubmit) {
            this.props.onSubmit({
                id: id,
                title: title,
                tags: tags,
                content: content,
                author: this.props.data.author
            });
        }
    }

    render() {
        let title, tags, content;
        if (this.props.data) {
            title = this.props.data.title;
            tags = this.props.data.tags;
            content = this.props.data.content;
        }

        return (
            <div style={{width: 1000, margin: "0 auto"}} className="UploadText">
                <div className="Card">
                    <input name="title" type="text" ref={this.refTitle} defaultValue={title} placeholder="文章标题"/>
                    <div style={{fontSize: 12, color: "#666"}}>
                        <label>标签(逗号分割): </label>
                        <input name="tags" type="text" ref={this.refTags} defaultValue={tags} placeholder="文章标签"/>
                    </div>
                </div>

                <div className="Card">
                    <textarea ref={this.refContent} defaultValue={content} placeholder="请在这里输入markdown"
                              spellcheck="false"/>
                </div>
                <button onClick={this.onSubmit} className="cmd-button">上传</button>
            </div>
        );
    }
}

export default UploadText;