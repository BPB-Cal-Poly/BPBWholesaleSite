import React from "react";
import "../styles/order-selection.css";
export default class OrderSelectiosnScreen extends React.Component {
  today = new Date().toLocaleDateString();
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="main-container">
        <div className="customer-center">
          <div className="order-selection-container">
            <div className="order-selection"></div>
            <a className="brand" href="/cart-order">
              <button className="btn">
                <span>CART ORDER</span>
              </button>
            </a>
            <a className="brand" href="/standing-order">
              <button className="btn">
                <span>STANDING ORDER</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
