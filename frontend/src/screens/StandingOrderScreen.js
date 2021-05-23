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
  Checkbox,
  Modal,
  Col,
  Row,
  List,
} from "antd";
import MediaQuery from "react-responsive";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import ProForm, { ModalForm } from "@ant-design/pro-form";
import { PlusOutlined } from "@ant-design/icons";
import "../styles/order-screen.css";
import "../styles/standing-order-screen.css";
import { Redirect } from "react-router";
const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;
const shipping = 2;
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default class StandingOrderScreen extends React.Component {
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
      total: 0,
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
          phone: props.business.phone,
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
      }

      let categories = this.props.fakeCategories;
      let products = this.props.fakeProducts;
      this.setState({
        products: products,
        categories: categories,
      });
      if (orders != null && orders.length != 0) {
        for (let order of orders) {
          let product = { product: order.product };
          this.addToOrder(product);
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
    this.setOrderQuantity(values, newOrders);
    this.setSubtotal();
  };
  addDayToOrder(quantity, day, name) {
    let product = { product: name };
    product[day] = quantity;
    this.setOrderQuantity(product, this.state.orders);
    this.setSubtotal();
  }
  deleteFromOrders = (item) => {
    this.setOrderQuantity(0, item.name);
    this.setSubtotal();
  };

  setOrderQuantity = (values, newOrders) => {
    let index = newOrders.findIndex((x) => x.product === values.product);
    for (let day of weekdays) {
      if (values[day] != null) {
        newOrders[index][day] = values[day];
      }
    }
    this.setState({
      orders: newOrders,
    });
  };

  getPrice = (product) => {
    return this.state.products.find((x) => x.name === product).price;
  };

  getQuantity = (product) => {
    return this.state.orders.find((x) => x.product === product).quantity;
  };

  setSubtotal = () => {
    let subtotal = 0;
    for (let theproduct of this.state.orders) {
      for (let day of weekdays) {
        if (theproduct[day] != 0 && theproduct[day] != null) {
          subtotal +=
            theproduct[day] *
            this.state.products.find((x) => x.name === theproduct.product)
              .price;
        }
      }
    }
    this.setState({
      subtotal,
      total: this.getTotal(),
    });
  };

  getSubtotal = () => {
    let subtotal = this.state.subtotal.toFixed(2);
    return subtotal != null ? subtotal : 0;
  };

  getTotal = () => {
    let total = this.state.subtotal + shipping;
    total = total.toFixed(2);
    return total != null ? total : 0;
  };

  getQuantityLength = (product) => {
    let quantity = this.getQuantity(product.name);
    if (quantity != null) {
      return quantity.toString().length;
    }
    return 0;
  };

  revertToCartOrder = () => {
    confirm({
      title: "Are you sure you want to revert to cart order?",
      content:
        "After reverting, your quantity selection for each weekday will be cleared",
      okText: "Yes",
      cancelText: "Cancel",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        this.props.history.push({
          pathname: "/cart-order",
          state: {
            orders: this.state.orders,
          },
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
        total: this.state.total,
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
    let productCom =
      orders.length !== 0 ? (
        <List
          itemLayout="vertical"
          dataSource={orders}
          renderItem={(product) => (
            <div>
              <h3>{product.product} </h3>
              <List
                grid={{
                  gutter: 16,
                  xs: 4,
                  sm: 4,
                  md: 6,
                  lg: 6,
                  xl: 8,
                  xxl: 8,
                }}
                dataSource={weekdays}
                renderItem={(day) => (
                  <div>
                    <Form form={this.form}>
                      <Form.Item label={day} name="day">
                        <InputNumber
                          min={0}
                          style={{ width: 60 }}
                          onChange={(e) => {
                            this.addDayToOrder(e, day, product.product);
                            this.setSubtotal();
                          }}
                          defaultValue={product[day]}
                          value={product[day]}
                          onPressEnter={(e) => {
                            e.preventDefault();
                          }}
                        />
                      </Form.Item>
                    </Form>
                  </div>
                )}
              />
            </div>
          )}
        />
      ) : null;
    const dateFormat = "MM/DD/YYYY";

    function dayInput(day) {
      const item = (
        <Form.Item label={day} name={day}>
          <InputNumber
            min={0}
            style={{ width: 60 }}
            onPressEnter={(e) => {
              e.preventDefault();
            }}
          />
        </Form.Item>
      );
      return item;
    }
    return (
      <div className="main-container">
        <div className="customer-center">
          <Card className="card-transparent">
            <Form {...formItemLayout} form={this.form} onFinish={this.onFinish}>
              <h1>Standing Order</h1>

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
                  onPressEnter={(e) => {
                    e.preventDefault();
                  }}
                ></Input>
              </Form.Item>

              <h1>Order Detail</h1>
              <Form.Item>
                <ModalForm
                  title="Product Info"
                  width={400}
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
                    // layout="vertical"
                    initialValue={
                      notAddedProducts.length !== 0
                        ? notAddedProducts[0].name
                        : "Select Product"
                    }
                    rules={[{ required: true, message: "Missing product" }]}
                  >
                    <Select style={{ width: 140 }}>
                      {notAddedProducts.map((item) => (
                        <Option key={item.id} value={item.name}>
                          {item.name}
                          {" $"}
                          {item.price}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <ProForm.Group>
                    {dayInput("Sun")}
                    {dayInput("Mon")}
                    {dayInput("Tue")}
                    <MediaQuery minDeviceWidth={400}>
                      {dayInput("Wed")}
                    </MediaQuery>
                  </ProForm.Group>
                  <ProForm.Group>
                    <MediaQuery maxDeviceWidth={399}>
                      {dayInput("Wed")}
                    </MediaQuery>

                    {dayInput("Thu")}
                    {dayInput("Fri")}
                    <MediaQuery minDeviceWidth={399}>
                      {dayInput("Sat")}
                    </MediaQuery>
                  </ProForm.Group>
                  <MediaQuery maxDeviceWidth={399}>
                    {dayInput("Sat")}
                  </MediaQuery>
                </ModalForm>
              </Form.Item>

              {products.length !== 0 ? (
                <div>
                  <MediaQuery minDeviceWidth={576}>
                    <div
                      className="products"
                      style={{
                        height: `${orders.length * 10}em`,
                      }}
                    >
                      {productCom}
                    </div>
                  </MediaQuery>
                  <MediaQuery maxDeviceWidth={575}>
                    <div
                      className="standing-products"
                      style={{
                        height: `${orders.length * 15}em`,
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
                  onClick={this.revertToCartOrder}
                  shape="round"
                >
                  Revert to cart order
                </Button>
              </div>
              <div className="add-button">
                <Button
                  type="default"
                  form={this.form}
                  htmlType="submit"
                  // onClick={this.handleOk}
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
