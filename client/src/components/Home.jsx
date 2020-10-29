import React, { Component } from 'react'

import ItemList from './ItemList'
import SearchBar from './SearchBar';

class Home extends Component{
    constructor() {
        super()
        this.state = {
            data: ""
        }
    }

    render() {
        return( 
            <div className="container">
                <SearchBar/>
                <ItemList/>
            </div>
        )
    }
}

export default Home;