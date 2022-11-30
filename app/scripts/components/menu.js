/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor(props) {
        super();
        this.filterInputRef = React.createRef();
        this.state = {
            showingSearch: false,
            searchHandler: props.searchHandler
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        this.setState({
            showingSearch: !this.state.showingSearch
        });
        setTimeout( _=> this.filterInputRef.current.focus())
    }

    clearFilter(e){
        e.preventDefault();
        
        this.filterInputRef.current.value = '';
        this.state.searchHandler('');
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(event) {
        this.state.searchHandler(event.currentTarget.value);
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#/products" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#/products" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                            <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                                <input ref={this.filterInputRef} type="text" onKeyUp={(e) => this.onSearch(e)} />
                                <a onClick={(e) => this.clearFilter(e)}>
                                    <i className="material-icons close">close</i>
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>

            </header>
        );
    }


}

// Export out the React Component
module.exports = Menu;