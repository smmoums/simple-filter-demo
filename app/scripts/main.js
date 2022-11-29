/**
 * The Initial React Setup file
 * ...
 * 
 * === CSS
 * The stylesheets are handled seperately using the gulp sass rather than importing them directly into React.
 * You can find these in the ./app/sass/ folder
 * 
 * == JS
 * All files in here start from this init point for the React Components.
 *  
 * 
 * Firstly we need to import the React JS Library
 */
import React from 'react';
import ReactDOM from 'react-dom';

import Menu from './components/menu';
import Home from './components/home';
import List from './components/list';


/**
 * We can start our initial App here in the main.js file
 */
class App extends React.Component {
    constructor() {
        super();
        sessionStorage.removeItem('goodsList');
        this.state = {
            listData: [],
            loading: false
        }
        this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler(filterString) {
        let goodsList = sessionStorage.getItem('goodsList');
        if (goodsList) {
            this.setState({ filterString });
        } else {
            if (this.state.loading === false) {
                this.setState({ loading: true });
                fetch('/api').then(
                    res => res.text().then(
                        data => {
                            let listData = JSON.parse(data);
                            this.setState({ listData, filterString, loading: false});
                            sessionStorage.setItem('goodsList', listData);
                        }
                    )
                )
            }
        }

    }
    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <div className="App">
                <Menu searchHandler={this.searchHandler} />
                {
                    this.state.listData.length
                        ? <List listData={this.state.listData} filterString={this.state.filterString} />
                        : <Home />
                }


            </div>
        );
    }

}

// Render this out
ReactDOM.render(<App />, document.getElementById('root'));
