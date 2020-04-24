import React from 'react';
import './TextList.css'
import './Common.css'

function TextList(props) {
    console.log("render TextList!");
    let r = null;
    //console.log("TextList data: "+ JSON.stringify(props.data));
    if (props.data) {
        r = props.data.map(e => {
            return (
                <TextListItem title={e.title} brief={e.brief} author={e.author}
                              date={e.date} id={e.id} key={e.id}
                              onClick={() => props.onClick(e.id)}/>
            );
        });
    }
    return (
        <div style={{width: 1000, margin: "0 auto"}}>
            {r}
        </div>
    );
}

function TextListItem(props) {
    return (
        <div className="TextListItem Card" onClick={props.onClick}>
            <h1 style={{cursor: "pointer"}}>
                {props.title}
            </h1>
            <div name="brief">
                {props.brief}
            </div>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <div style={{color:"#aaa"}}>
                    {props.author} 创建于 {props.date.toLocaleString()}
                </div>
            </div>
        </div>
    );

}

export default TextList;