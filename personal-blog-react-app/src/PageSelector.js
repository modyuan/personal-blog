import React from "react";
import './PageSelector.css'

class PageSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cur: parseInt(this.props.cur) || 1
        }
    }

    onClick= (index)=>{
        if(index>0) {
            this.setState({cur: parseInt(index)});
            if(this.props.onClick){
                this.props.onClick(index);
            }
        }else if(index===-2){
            //prev
            this.setState((prev,props)=>{
                let i = prev.cur;
                if(i+1 <= props.maxPage){
                    if(props.onClick){
                        props.onClick(i+1);
                    }
                    return {cur: i+1};
                }
            });
        }else{
            //next
            this.setState((prev,props)=>{
                let i = prev.cur;
                if(i-1 >=1){
                    if(props.onClick){
                        props.onClick(i-1);
                    }
                    return {cur: i-1};
                }
            });

        }
    }

    render() {
        const max = parseInt(this.props.maxPage);
        let cc = [];
        for (let i = 1; i <= max; i++) cc.push(i);
        let li = cc.map((i) => (
            <li className={`${(this.state.cur === i) ? 'PageSelectorCur' : null}`} onClick={()=>{this.onClick(i)}} key={i}>
                {i}
            </li>
        ));

        return (
            <div style={{display: "flex", justifyContent: "center"}}>
                <div className="PageSelector">
                    <ul>
                        <li onClick={()=>{this.onClick(-1)}}>&lt;</li>
                        {li}
                        <li onClick={()=>{this.onClick(-2)}}>&gt;</li>
                    </ul>
                </div>
            </div>
        );
    }
}


export default PageSelector;