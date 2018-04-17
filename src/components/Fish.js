import React from "react";
import {formatPrice} from "../helpers";

class Fish extends React.Component {
  render() {
      const { image, name, price, desc, status }= this.props.details;
      const isAvailable = status === 'available';
    return (
        <li className="menu-fish">
            <img src={image} alt={name}/>
            <h3 className="fish-name">
                {name}
                {/* Utilizamos la funcion formatPrice que se encuentra en helpers y le pasamos el valos price*/}
                <span className="price">{formatPrice(price)}</span>
                
            </h3>
            <p>{desc}</p>
            <button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)}>
                {isAvailable ? "Add To Order" : "Sold Out!"}
            </button>
        </li>
    );
  }
}

export default Fish;