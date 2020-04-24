import React from "react";
import './UploadText.css'
// 上传文章的组件

class  UploadText extends React.Component{

    constructor(props) {
        super(props);

        this.refTitle = React.createRef();
        this.refTags = React.createRef();
        this.refContent = React.createRef();
    }

    onSubmit = ()=>{
        let title = this.refTitle.current.value;
        let tags = this.refTags.current.value;
        let content = this.refContent.current.value;

        if(this.props.onSubmit){
            this.props.onSubmit({title: title, tags: tags, content: content});
        }
    }
    render() {
        return (
            <div style={{width: 1000, margin: "0 auto"}} className="UploadText">
                <input type="text" ref={this.refTitle} placeholder="文章标题" />
                <input type="text" ref={this.refTags} placeholder="文章标签"/>
                <textarea ref={this.refContent}  placeholder="请在这里输入markdown"/>
                <button onClick={this.onSubmit}>上传</button>
            </div>
        );
    }
}