import React from "react";
import {
  Button,
  Select,
  Card,
  Input,
  Form,
  message,
  InputNumber,
  DatePicker,
  Space,
  List,
} from "antd";
import ProForm, { ModalForm } from "@ant-design/pro-form";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "../styles/product-list.css";
import "../styles/order-screen.css";
import { Redirect } from "react-router-dom";
const { Option } = Select;
const { TextArea } = Input;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      //----order details---
      date: "",
      deliver: "",
      address: "",
      phone: "",
      note: "",
      orders: [],
      method: "",
      type: "",
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

  setDeliverDate = (date) => {
    this.setState({
      deliverDate: date,
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

  addToOrder = (product) => {
    let newList = this.state.orders;
    newList.push(product);
    this.setState({
      orders: newList,
    });
  };

  handleOk = () => {
    this.setState({
      modelVisible: false,
    });
    let newProduct = {
      id: this.state.list.length + 1,
      name: this.state.name,
      nickname: this.state.nickname,
      note: this.state.note,
      category: this.state.category,
      packsize: this.state.packsize,
      dough: this.state.dough,
      where: this.state.where,
      when: this.state.when,
      price: this.state.price,
      weight: this.state.weight,
      cutoff: this.state.cutoff,
    };
    let newList = this.state.list;
    newList.push(newProduct);
    this.setState({
      list: newList,
    });
    this.props.onListChange(this.state.list);

    this.props.history.push("/admin/product/list");
  };

  render() {
    let { categories, products } = this.state;
    let business = this.props.business;
    // console.log(products);
    const formItemLayout = {
      labelCol: {
        // span: 8,
        // offset: 2,
      },
      wrapperCol: {
        span: 14,
      },
    };

    let addressForm = business ? (
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

    let productsForm =
      products.length != 0 ? (
        <Form.List name="products">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...field}
                    label="Product"
                    layout="vertical"
                    name={[field.name, "product"]}
                    fieldKey={[field.fieldKey, "product"]}
                    rules={[{ required: true, message: "Missing product" }]}
                  >
                    <Select
                      defaultValue={products[0].name}
                      style={{ width: 130 }}
                      onSelect={this.setCategory}
                    >
                      {products.map((item) => (
                        <Option key={item.id} value={item.name}>
                          {item.name}
                          {" $"}
                          {item.price}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="Quantity"
                    name={[field.name, "quantity"]}
                    fieldKey={[field.fieldKey, "quantity"]}
                    rules={[{ required: true, message: "Missing quantity" }]}
                  >
                    <InputNumber
                      noStyle
                      min={1}
                      style={{ width: 120 }}
                      onChange={(e) => {
                        this.setWhen(e);
                      }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add product
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      ) : null;

    return (
      <div>
        <div className="customer-center">
          <Card className="customer-layout">
            <Form {...formItemLayout} form={this.form}>
              <h1>Order</h1>
              <Form.Item
                label="Delivery Day"
                name="deliverDate"
                rules={[
                  {
                    required: true,
                    message: "Please select deliver date",
                  },
                ]}
              >
                <DatePicker
                  onChange={(date, dateString) => {
                    this.setDeliverDate(dateString);
                  }}
                />
              </Form.Item>
              {addressForm}
              <Form.Item label="Phone number">
                <Input
                  style={{ width: 120 }}
                  value={business ? business.phone : null}
                  onChange={(e) => {
                    this.setPhone(e.target.value);
                  }}
                ></Input>
              </Form.Item>
              <h1>Order Detail</h1>
            </Form>

            <Form name="dynamic_form_nest_item" autoComplete="off">
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
                    onCancel: () => console.log("run"),
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
                    initialValue={"Select Product"}
                    rules={[{ required: true, message: "Missing product" }]}
                  >
                    <Select style={{ width: 140 }} onSelect={this.setProduct}>
                      {products.map((item) => (
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
                    <InputNumber noStyle min={1} style={{ width: 120 }} />
                  </Form.Item>
                </ModalForm>
              </Form.Item>
              {this.state.orders.length != 0 ? (
                <List
                  grid={{ gutter: 20, column: 1 }}
                  dataSource={this.state.orders}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={item.product}
                        description={"Quantity: " + item.quantity}
                      />
                    </List.Item>
                  )}
                />
              ) : null}

              <Form.Item label="Special Note" {...formItemLayout}>
                <TextArea
                  style={{ width: "300px" }}
                  autoSize={{ minRows: 3, maxRows: 6 }}
                  value={this.state.note}
                  onChange={(e) => {
                    this.setNote(e.target.value);
                  }}
                ></TextArea>
              </Form.Item>
              <Button
                type="default"
                htmlType="submit"
                onClick={this.handleOk}
                shape="round"
              >
                Order
              </Button>
            </Form>
          </Card>
        </div>
        <ul className="products customer-center">
          {this.state.products.length != 0 ? (
            <List
              dataSource={this.state.products}
              renderItem={(item) => (
                <li className="product">
                  <div className="product-preview">
                    <div className="thumbnail">
                      <img src="https://s.cdpn.io/24822/sidebar-cupcake.png" />
                    </div>
                    <div className="product-paper">
                      <div className="product-name">{item.name}</div>
                      <div className="product-price">{"$ " + item.price}</div>
                    </div>
                    <div className="product-quantity">
                      x0
                    </div>
                  </div>
                  <div className="product-interactions">
                  <div className="button plus">
                    +
                  </div>
                  <div className="button minus">
                    -
                  </div>
                  <div className="button del">
                    x
                  </div>
                  </div>
                </li>
              )}
            />
          ) : null}
        </ul>
      </div>
    );
  }
}
