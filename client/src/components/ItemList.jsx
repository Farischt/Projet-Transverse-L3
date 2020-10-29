import React, { Component } from 'react'
import axios from 'axios'

import Item from './Item'

class ItemList extends Component{
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            axiosInProgress: true,
        }
    }

    componentDidMount = async () => {
        const res = await axios.get('/api/item/');
        this.setState({ items: [...this.state.items, ...res.data]});
        this.setState({ axiosInProgress: false })
    }

    render() {
        return (
            <div className="ui divided items"> 
                {this.state.axiosInProgress ?   
                    <div class="ui active centered inline loader"></div>
                  : this.state.items.map(item => {
                            return (<Item key={item._id} item={item}/>)
                })}
            </div>
        )
    }
}

export default ItemList