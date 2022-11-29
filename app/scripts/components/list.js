import React from 'react';

class List extends React.Component {

    constructor(props) {
        super();
        this.state = {
            listData: props.listData,
            filterString: props.filterString
        };
        this.showFilterGoods = this.showFilterGoods.bind(this);
    }
    shouldComponentUpdate(props){
        this.state.filterString = props.filterString;
        return true;
    }

    showFilterGoods(){
        const result =[];
        this.state.listData.map(
            singleData=>{
                if(this.goodMatchHandler(singleData, this.state.filterString)){
                    singleData.price=parseInt(singleData.price)
                    result.push(
                    <li className='goodItem' key={singleData._id}>
                       <img className="goodPic" src={singleData.picture} ></img>
                       <div className='goodTitle'> {singleData.name}</div>
                       <div className='goodPrice'> ${singleData.price}</div>
                    </li>
                    )
                }
            }
        )
        
        return <ul className='goodsListContainer'>
                {
                    result.length> 0 ? result : <div className='emptyResult'>no matching goods found ... </div>
                }
            </ul>;
    }

    goodMatchHandler(goodData, filterString){
        let ifMatch = false;
        if(goodData.name.toLowerCase().indexOf(filterString.toLowerCase()) > -1) ifMatch = true;
        goodData.tags.map(tag => (tag.indexOf(filterString.toLowerCase()) > -1) ? ifMatch = true : '');
        return ifMatch;
    }

    render(){
        return (
            <section id="searchList">
                {this.showFilterGoods()}
            </section>
        )
        
    } 
}

module.exports = List;