import React from "react";
import "../styles/order-selection.css";
export default class OrderSelectiosnScreen extends React.Component {
  today = new Date().toLocaleDateString();
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      //----order----
      type: "",
      date: this.today,
      address: "",
      phone: "",
      //----order detail----
      orders: [],
      deliver: "",
      note: "",
      type: "",
      subtotal: 0,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getList();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getList = () => {
    if (this._isMounted) {
      let categories = this.props.fakeCategories;
      let products = this.props.fakeProducts;
      this.setState({
        products: products,
        categories: categories,
      });
    }
  };

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
