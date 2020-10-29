import React, { Component } from 'react'

class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    };
    render() {
        return ( 
                <div className="item">
                    <div className="image">
                        <img src="https://www.bentoburo.com/69-thickbox_default/canettes-coca-cola.jpg" alt="png"/>
                    </div>
                    <div className="content">
                        <a className="header"> {this.props.item.name} </a>
                        <div className="meta">
                            <span className="cinema"> {this.props.item.price}$ </span>
                        </div>
                        <div className="description">
                            <p> {this.props.item.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, at ab! Non minima dolorum exercitationem placeat impedit tempora. Necessitatibus, laudantium.</p>
                        </div>
                        <div className="extra">
                            <div className="ui right floated primary button" style={{backgroundColor: "#353a40"}}>
                            Ajouter au panier
                                <i className="right chevron icon"></i>
                            </div>
                            <div className="ui label">Edition Limité</div>
                            <div className="ui label">Acheté 12 fois !</div>
                        </div>
                    </div>
                </div> )
    }
}

export default Item;