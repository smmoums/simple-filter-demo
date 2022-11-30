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
import { HashRouter, Routes, Route } from "react-router-dom";
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
        this.setState({ filterString });
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
                <HashRouter>
                    <Routes>
                        
                        <Route path="/" element={<Home/>}/>
                        <Route path="/products" element={<List filterString={this.state.filterString}/>}/>
                        
                    </Routes>
                </HashRouter>
            </div>
        );
    }

}

// Render this out
ReactDOM.render(<App />, document.getElementById('root'));
