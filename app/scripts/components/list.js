import React from 'react';

class List extends React.Component {

    constructor(props) {
        super();
        this.state = {
            goodsList: [],
            filterString: props.filterString || '',
            loading: false,
            loadErr: false
        };
        this.showGoodsList = this.showGoodsList.bind(this);
        this.getGoodsData = this.getGoodsData.bind(this);
    }

    componentDidMount(){
        this.getGoodsData()
    }

    shouldComponentUpdate(props){
        this.state.filterString = props.filterString;
        return true;
    }

    getGoodsData(){
        let goodsJson = sessionStorage.getItem('goodsList');
        if (goodsJson) {
            this.setState( {goodsList: JSON.parse(goodsJson)} );
        }else{
            this.setState({ loading: true });
            fetch('/api').then(
                res => res.text().then(
                    data => {
                        sessionStorage.setItem('goodsList', data);
                        let goodsList = JSON.parse(data);
                        this.setState( {goodsList,  loading: false} );
                    }
                ),
                err => {
                    this.setState( {loading: false, loadErr: true} );
                    console.log(err)
                }
            )    
        }
    }

    showGoodsList(){
        const result =[];console.log(this.state.goodsList)
        this.state.goodsList.map(
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
        
        return (<ul className='goodsListContainer'>
                {
                    result.length> 0 ? result : <div className='emptyResult'>no matching goods found ... </div>
                }
            </ul>);
    }

    goodMatchHandler(goodData, filterString){
        let ifMatch = false;
        // check goods name
        if( goodData.name.toLowerCase().indexOf( filterString.toLowerCase()) > -1 ) ifMatch = true;
        // check tags
        goodData.tags.map(
            tag => {
                if(tag.indexOf( filterString.toLowerCase()) > -1 ){
                    ifMatch = true;
                } 
            }
        )
        return ifMatch;
    }

    render(){
        let warningMSG;
        if(this.state.loading) warningMSG = 'loading data, please waite for a second';
        if(this.state.loadErr) warningMSG = 'failed to get info, please try refresh later';
        return (
            <section id="searchList">
                {warningMSG || this.showGoodsList()}
            </section>
        ) 
    } 
}

module.exports = List;