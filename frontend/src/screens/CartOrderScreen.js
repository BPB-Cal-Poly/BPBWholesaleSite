import React from "react";
import {
  Button,
  Select,
  Card,
  Input,
  Form,
  Radio,
  message,
  InputNumber,
  DatePicker,
  Col,
  Modal,
  Row,
  List,
} from "antd";
import MediaQuery from "react-responsive";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { ModalForm} from "@ant-design/pro-form";
import { PlusOutlined } from "@ant-design/icons";
import "../styles/order-screen.css";
const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;
const shipping = 2;
export default class CartOrderScreen extends React.Component {
  today = new Date().toLocaleDateString();
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      //----order----
      date: this.today,
      address: "",
      phone: "",
      //----order detail----
      orders: [],
      deliver: "",
      note: "",
      subtotal: 0,
      total: 0
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getList();
    // this.setOrderList();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.fakeProducts !== state.products) {
      return {
        products: props.fakeProducts,
      };
    }
    if (props.fakeCategories !== state.categories) {
      return {
        categories: props.fakeCategories,
      };
    }
    if (props.business !== state.business) {
      if (state.address == "") {
        return {
          address: props.business.addresses[0],
        };
      } else if (state.phone == "") {
        return {
          phone: props.business.phone
        };
      }
    }
    return null;
  }

  getList = () => {
    if (this._isMounted) {
      let orders = [];
      if (this.props.location.state != null) {
        orders = this.props.location.state.orders;
      };
      console.log(orders)
      let categories = this.props.fakeCategories;
      let products = this.props.fakeProducts;
      this.setState({
        products: products,
        categories: categories,
      });

      if (orders != null && orders.length != 0) {
        for (let order of orders) {
          let size = 0;
          for (let key in order) {
            if (order.hasOwnProperty(key) && key!= "product") {
              size += order[key]
            }
          }
            let product = {product: order.product, quantity: size}
            this.addToOrder(product)
        }
      }
    }
  };

  setDeliverDate = (date) => {
    this.setState({
      date,
    });
  };

  setAddress = (addr) => {
    this.setState({
      address: addr,
    });
  };

  setPhone = (phone) => {
    this.setState({
      phone: phone,
    });
  };

  setNote = (note) => {
    this.setState({
      note: note,
    });
  };

  setDeliver = (deliver) => {
    this.setState({
      deliver,
    });
  };

  addToOrder = (values) => {
    let newOrders = this.state.orders;
    newOrders.push({ product: values.product });
    this.setOrderQuantity(values.quantity, values.product, newOrders);
    this.setSubtotal();
  };

  deleteFromOrders = (item) => {
    this.setOrderQuantity(0, item.product, this.state.orders);
    this.setSubtotal();
  };

  setOrderQuantity = (quantity, name, newOrders) => {
    let index = newOrders.findIndex((x) => x.product === name);
    newOrders[index].quantity = quantity;
    if (quantity == 0) {
      newOrders = newOrders.filter((prod) => {
        return prod.product != name;
      });
    }
    this.setState({
      orders: newOrders,
    });
  };

  getQuantity = (product) => {
    return this.state.orders.find((x) => x.product === product).quantity;
  };

  getPrice = (product) => {
    return this.state.products.find((x) => x.name === product).price;
  };

  setSubtotal = () => {
    let subtotal = 0;
    for (let theproduct of this.state.orders) {
      if (theproduct.quantity !== 0) {
        subtotal +=
          theproduct.quantity *
          this.state.products.find((x) => x.name === theproduct.product).price;
      }
    }
    this.setState({
      subtotal,
      total: this.getTotal()
    });
  };

  getSubtotal = () => {
    let subtotal = this.state.subtotal.toFixed(2);
    return subtotal != null ? subtotal : 0
  };

  getTotal = () => {
    let total = this.state.subtotal + shipping;
    total = total.toFixed(2);
    return total != null ? total : 0;
  };

  getQuantityLength = (product) => {
    let quantity = this.getQuantity(product.product);
    if (quantity != null) {
      return quantity.toString().length;
    }
    return 0;
  };

  revertToStandingOrder = () => {
    confirm({
      title: "Are you sure you want to revert to standing order?",
      content: "After reverting, your quantity information will be cleared",
      okText: "Yes",
      cancelText: "Cancel",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        this.props.history.push({
          pathname:"/standing-order",
          state:{
              orders:this.state.orders
           }
         });
      },
    });
  };


  onFinish = async () => {
    let orders = this.state.orders.filter((x) => x.quantity !== 0);
    if (orders.length === 0) {
      message.error("Please add at least one item to the order");
    } else {
      let newOrder = {
        date: this.state.date,
        address: this.state.address,
        phone: this.state.phone,
        orders: orders,
        deliver: this.state.deliver,
        note: this.state.note,
        subtotal: this.state.subtotal,
        total: this.state.total
      };
      message.success("Order placed");
      window.location.reload();
    }
  };

  orderContainProduct(name) {
    let orderHasProduct = false;
    for (var i = 0; i < this.state.orders.length; i++) {
      if (this.state.orders[i].product === name) {
        orderHasProduct = true;
        break;
      }
    }
    return orderHasProduct;
  }

  render() {
    let { products, orders, note } = this.state;

    //notAddedProducts are the products not in the gallery view (they are all in by default
    //but user might delete them and want to add later);
    // let notAddedProducts = this.props.fakeProducts.filter(
    //   (value) => !products.includes(value)
    // );
    let notAddedProducts = this.props.fakeProducts.filter(
      (value) => !this.orderContainProduct(value.name)
    );
    let business = this.props.business;

    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };

    let addressForm =
      business && this.state.deliver === "delivery" ? (
        <Form.Item label="Deliver address">
          <Select
            defaultValue={business.addresses[0]}
            style={{ width: 300 }}
            onSelect={this.setAddress}
          >
            {business.addresses.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ) : null;


      console.log(orders)

    let productCom = (
      <List
        dataSource={orders}
        renderItem={(item) => (
          <div className="product">
            <div className="product-preview">
              <div className="thumbnail">
                <img
                  src="https://s.cdpn.io/24822/sidebar-cupcake.png"
                  alt={item.product}
                />
              </div>
              <div className="product-paper">
                <div className="product-name">{item.product}</div>
                <div className="product-price">
                  {"$ " + this.getPrice(item.product)}
                </div>
              </div>
              <div
                className="product-quantity"
                style={{
                  width: `${this.getQuantityLength(item) + 1}em`,
                }}
              >
                x
                <InputNumber
                  bordered={false}
                  min={0}
                  defaultValue={this.getQuantity(item.product)}
                  value={this.getQuantity(item.product)}
                  onChange={(e) => {
                    this.setOrderQuantity(e, item.product, orders);
                    this.setSubtotal();
                  }}
                ></InputNumber>
              </div>
            </div>
            <div className="product-interactions">
              <div
                className="button del"
                onClick={() => {
                  this.deleteFromOrders(item);
                }}
              >
                x
              </div>
            </div>
          </div>
        )}
      />
    );

    const dateFormat = "MM/DD/YYYY";
    return (
      <div className="main-container">
        <div className="customer-center">
          <Card className="card-transparent">
            <Form {...formItemLayout} form={this.form} onFinish={this.onFinish}>
              <h1>Cart Order</h1>

              <Form.Item
                label="Delivery Method"
                name="deliver"
                rules={[
                  {
                    required: true,
                    message: "Please pick a delivery method",
                  },
                ]}
              >
                <Radio.Group
                  onChange={(e) => {
                    this.setDeliver(e.target.value);
                  }}
                >
                  <Radio value="delivery">Delivery</Radio>
                  <Radio value="Slo">Pickup SLO</Radio>
                  <Radio value="Atascadero">Pickup Atascadero</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={
                  this.state.deliver === "delivery" || this.state.deliver === ""
                    ? "Delivery Day"
                    : "Pickup Day"
                }
                name="deliverDate"
                initialValue={moment(this.today, dateFormat)}
                rules={[
                  {
                    required: true,
                    message: "Please select deliver date",
                  },
                ]}
              >
                <DatePicker
                  format={dateFormat}
                  showToday={true}
                  onChange={(date, dateString) => {
                    this.setDeliverDate(dateString);
                  }}
                />
              </Form.Item>
              {addressForm}
              <Form.Item
                label="Phone number"
                name="phone"
                initialValue={business ? business.phone : null}
                rules={[
                  {
                    required: true,
                    message: "Please input phone number",
                  },
                ]}
              >
                <Input
                  style={{ width: 120 }}
                  value={business ? business.phone : null}
                  onChange={(e) => {
                    this.setPhone(e.target.value);
                  }}
                ></Input>
              </Form.Item>

              <h1>Order Detail</h1>
              {notAddedProducts.length !== 0 ? (
                <Form.Item>
                  <ModalForm
                    title="Product Info"
                    width={250}
                    trigger={
                      <Button type="primary">
                        <PlusOutlined />
                        Add Product
                      </Button>
                    }
                    modalProps={{
                      onCancel: () => console.log("canceled"),
                    }}
                    submitter={{
                      searchConfig: {
                        submitText: "Add",
                        resetText: "Cancel",
                      },
                    }}
                    onFinish={async (values) => {
                      this.addToOrder(values);
                      message.success("Product added");
                      return true;
                    }}
                  >
                    <Form.Item
                      label="Product"
                      name="product"
                      layout="vertical"
                      initialValue={
                        notAddedProducts.length !== 0
                          ? notAddedProducts[0].name
                          : "Select Product"
                      }
                      rules={[{ required: true, message: "Missing product" }]}
                    >
                      <Select style={{ width: 140 }} onSelect={this.setProduct}>
                        {notAddedProducts.map((item) => (
                          <Option key={item.id} value={item.name}>
                            {item.name}
                            {" $"}
                            {item.price}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Quantity"
                      name="quantity"
                      rules={[{ required: true, message: "Missing quantity" }]}
                    >
                      <InputNumber min={1} style={{ width: 120 }} />
                    </Form.Item>
                  </ModalForm>
                </Form.Item>
              ) : null}
              {orders.length !== 0 ? (
                <div>
                  <MediaQuery minDeviceWidth={666}>
                    <div
                      className="products customer-center"
                      style={{
                        height: `${Math.ceil(orders.length/3) * 20}em`,
                      }}
                    >
                      {productCom}
                    </div>
                  </MediaQuery>
                  <MediaQuery minDeviceWidth={466} maxDeviceWidth={665}>
                    <div
                      className="products customer-center"
                      style={{
                        height: `${Math.ceil(orders.length/2) * 20}em`,
                      }}
                    >
                      {productCom}
                    </div>
                  </MediaQuery>
                  <MediaQuery minDeviceWidth={426} maxDeviceWidth={465}>
                    <div
                      className="products customer-center"
                      style={{
                        height: `${Math.ceil(orders.length/2) * 17}em`,
                      }}
                    >
                      {productCom}
                    </div>
                  </MediaQuery>
                  <MediaQuery maxDeviceWidth={425}>
                    <div
                      className="products customer-center"
                      style={{
                        height: `${Math.ceil(orders.length/2) * 15}em`,
                      }}
                    >
                      {productCom}
                    </div>
                  </MediaQuery>
                </div>
              ) : null}
              <Form.Item label="Special Note" {...formItemLayout}>
                <TextArea
                  style={{ width: "300px" }}
                  autoSize={{ minRows: 3, maxRows: 6 }}
                  value={note}
                  onChange={(e) => {
                    this.setNote(e.target.value);
                  }}
                ></TextArea>
              </Form.Item>

              <h1>Order Summary</h1>
              {orders.length !== 0 ? (
                <List
                  grid={{ gutter: 20, column: 1 }}
                  dataSource={orders}
                  renderItem={(item) =>
                    item.quantity !== 0 ? (
                      <Col span={6} className="align-right">
                        <List.Item>
                          <List.Item.Meta
                            title={item.product + " x" + (item.quantity != null ? item.quantity : 0)}
                          />
                        </List.Item>
                      </Col>
                    ) : null
                  }
                />
              ) : null}
              <div className="border-box" style={{ marginBottom: "24px" }}>
                <h2>
                  <Row>
                    <Col span={12} className="align-right">
                      Subtotal:&nbsp;
                    </Col>
                    <Col span={12}>${this.getSubtotal()}</Col>
                  </Row>
                  <Row>
                    <Col span={12} className="align-right">
                      Delivery:&nbsp;
                    </Col>
                    <Col span={12}>${shipping}</Col>
                  </Row>
                  <Row>
                    <Col span={12} className="align-right">
                      Total:&nbsp;
                    </Col>
                    <Col span={12}>${this.getTotal()}</Col>
                  </Row>
                </h2>
              </div>
              <div className="revert-button">
                <Button
                  type="default"
                  form={this.form}
                  onClick={this.revertToStandingOrder}
                  shape="round"
                >
                  Revert to standing order
                </Button>
                </div>
              <div className="add-button">
                <Button
                  type="default"
                  htmlType="submit"
                  shape="round"
                >
                  Order
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}
