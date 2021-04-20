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
  Row,
  List,
} from "antd";
import moment from "moment";
import { ModalForm } from "@ant-design/pro-form";
import {  PlusOutlined } from "@ant-design/icons";
import "../styles/order-screen.css";
const { Option } = Select;
const { TextArea } = Input;

const shipping = 2;
export default class CartOrderScreen extends React.Component {
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
      subtotal: 0,
    };
  }
  

  componentDidMount() {
    this._isMounted = true;
    this.getList();
    this.setOrderList();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setOrderList = () => {
    let orders = [];
    for (let theproduct of this.props.fakeProducts) {
      orders.push({ product: theproduct.name, quantity: 0 });
    }
    this.setState({
      orders,
    });
  };

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
    this.setOrderQuantity(values.quantity, values.product);
    const newProducts = this.state.products;
    for (let theproduct of this.props.fakeProducts) {
      if (theproduct.name === values.product) {
        newProducts.push(theproduct);
      }
    }
    this.setState({
      products: newProducts,
    });
    this.setSubtotal();
  };

  deleteFromOrders = (item) => {
    this.setOrderQuantity(0, item.name);
    this.setSubtotal();
    const newProducts = this.state.products.filter((prod) => {
      return prod.id !== item.id;
    });
    message.success("Delete Successfully");
    this.setState({
      products: newProducts,
    });
  };

  setOrderQuantity = (quantity, name) => {
    let newOrders = this.state.orders;
    console.log(quantity, name);
    let index = newOrders.findIndex((x) => x.product === name);
    newOrders[index].quantity = quantity;
    console.log(this.state.orders);
    console.log(newOrders);
    this.setState({
      orders: newOrders,
    });
    // this.setSubtotal();
  };

  getQuantity = (product) => {
    return this.state.orders.find((x) => x.product === product).quantity;
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
    });
  };

  getSubtotal = () => {
    return this.state.subtotal.toFixed(2);
  };

  getTotal = () => {
    let total = this.state.subtotal + shipping;
    return total.toFixed(2);
  };

  getQuantityLength = (product) => {
    let quantity = this.getQuantity(product.name);
    return quantity.toString().length;
  };

  handleOk = () => {
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
        type: this.state.type,
        subtotal: this.state.subtotal,
      };
      console.log(newOrder);
      window.location.reload();
    }
  };

  render() {
    let { products, orders, note } = this.state;

    //notAddedProducts are the products not in the gallery view (they are all in by default
    //but user might delete them and want to add later);
    let notAddedProducts = this.props.fakeProducts.filter(
      (value) => !products.includes(value)
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

    const dateFormat = "MM/DD/YYYY";

    return (
      <div className="main-container">
        <div className="customer-center">
          <Card className="card-transparent">
            <Form {...formItemLayout} form={this.form}>
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
                  // defaultValue={business ? business.phone : null}
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
                      console.log(values);
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
              {products.length !== 0 ? (
                <div className="products customer-center">
                  <List
                    dataSource={products}
                    renderItem={(item) => (
                      <div className="product">
                        <div className="product-preview">
                          <div className="thumbnail">
                            <img src="https://s.cdpn.io/24822/sidebar-cupcake.png" alt={item.name} />
                          </div>
                          <div className="product-paper">
                            <div className="product-name">{item.name}</div>
                            <div className="product-price">
                              {"$ " + item.price}
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
                              defaultValue={this.getQuantity(item.name)}
                              value={this.getQuantity(item.name)}
                              onChange={(e) => {
                                this.setOrderQuantity(e, item.name);
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
              <List
                grid={{ gutter: 20, column: 1 }}
                dataSource={orders}
                renderItem={(item) =>
                  item.quantity !== 0 ? (
                    <Col span={6} className="align-right">
                      <List.Item>
                        <List.Item.Meta
                          title={item.product + " x" + item.quantity}
                        />
                      </List.Item>
                    </Col>
                  ) : null
                }
              />
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
              <div className="add-button">
                <Button
                  type="default"
                  htmlType="submit"
                  onClick={this.handleOk}
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
