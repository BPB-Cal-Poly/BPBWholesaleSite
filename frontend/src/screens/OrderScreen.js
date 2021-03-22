import React from "react";
import {
  Button,
  Select,
  Card,
  Input,
  Form,
  Col,
  InputNumber,
  DatePicker,
  Space,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "../styles/product-list.css";
import { Redirect } from "react-router-dom";
const { Option } = Select;
const { TextArea } = Input;

// let categories = [
//   { id: 1, name: "Pastries" },
//   { id: 2, name: "Rustics" },
// ];

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      // customers: [],
      products: [],
      // businesses: [],
      // username: this.props.username,
      // business: {},
      modelVisible: false,
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
    // this.getBusiness();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getList = () => {
    if (this._isMounted) {
      // let username= this.props.username;
      let categories = this.props.fakeCategories;
      let products = this.props.fakeProducts;
      // let customers = this.props.fakeCustomers;
      // let businesses = this.props.fakeBusinesses;
      this.setState({
        // username: username,
        products: products,
        categories: categories,
        // customers: customers,
        // businesses: businesses,
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
    console.log(products);
    const formItemLayout = {
      labelCol: {
        span: 8,
        offset: 2,
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

    let productForm =
      products.length != 0 ? (
        <Form.Item label="Product">
          <Select
            defaultValue={products[0].name}
            style={{ width: 120 }}
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
      ) : null;

    let productTest =
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
                    // {...formItemLayoutWithLabel }
                    layout="vertical"
                    name={[field.name, "product"]}
                    fieldKey={[field.fieldKey, "product"]}
                    rules={[{ required: true, message: "Missing product" }]}
                  >
                    <Select
                      defaultValue={products[0].name}
                      // style={{ width: 130 }}
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
                    // {...formItemLayoutWithLabel }
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
                  {/* </Input.Group> */}
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
                  // block
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
        <Card className="customer-layout">
          <Form
            {...formItemLayout}
            form={this.form}
          >
            <div className="customer-center">
            <Col span={5} offset={8}>
              <h1>Order</h1>
              </Col>
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
              <Col span={8} offset={8}>
              <h1>Order Detail</h1>
              </Col>
            </div>
          </Form>
          
          <Form name="dynamic_form_nest_item" autoComplete="off">
          <Col span={5} offset={8}>
            {productTest}
            </Col>
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
            <Col span={5} offset={8}>
            <Button type="primary" htmlType="submit" onClick={this.handleOk}
            >
              Add Product
            </Button>
            </Col>
          </Form>
        </Card>
      </div>
    );
  }
}
