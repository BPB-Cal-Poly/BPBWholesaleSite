import React from "react";
import {
  List,
  Button,
  Row,
  Col,
  Modal,
  message,
  Table,
  Space,
  Select,
  Card,
  Input,
  Divider,
  Form,
  InputNumber,
} from "antd";
import ReactDOM from "react-dom";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import "../styles/product-list.css";
const { Option } = Select;
const { TextArea } = Input;

let fakeCategories = [
  { id: 1, name: "Pastries" },
  { id: 2, name: "Rustics" },
];
export default class ProductAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      categories: [],
      modelVisible: false,
      id: "",
      name: "",
      nickname: "",
      description: "",
      category: "Pastries",
      packsize: "",
      dough: "Baguette",
      where: "SLO",
      when: "",
      price: "",
      weight: "",
      cutoff: "",
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
      let fakeProducts = this.props.fakeProducts;
      this.setState({
        list: fakeProducts,
        categories: fakeCategories,
      });
    }
  };

  setProductName = (name) => {
    this.setState({
      name: name,
    });
  };

  setProductNickname = (nickname) => {
    this.setState({
      nickname: nickname,
    });
  };

  setDescription = (description) => {
    this.setState({
      description: description,
    });
  };

  setCategory = (category) => {
    this.setState({
      category: category,
    });
  };

  setPackSize = (size) => {
    this.setState({
      packsize: size,
    });
  };

  setDough = (dough) => {
    this.setState({
      dough: dough,
    });
  };

  setBakedWhere = (where) => {
    this.setState({
      where: where,
    });
  };

  setWhen = (when) => {
    this.setState({
      when: when,
    });
  };

  setPrice = (price) => {
    this.setState({
      price: price,
    });
  };

  setWeight = (weight) => {
    this.setState({
      weight: weight,
    });
  };

  setCutoff = (cutoff) => {
    this.setState({
      cutoff: cutoff,
    });
  };

  handleOk = () =>{
    this.setState({
      modelVisible:false,
    });
    let newProduct = {
      'id':this.state.list.length+1,
      'name':this.state.name,
      'nickname':this.state.nickname,
      'description':this.state.description,
      'category':this.state.category,
      'packsize':this.state.packsize,
      'dough':this.state.dough,
      'where':this.state.where,
      'when':this.state.when,
      'price':this.state.price,
      'weight':this.state.weight,
      'cutoff':this.state.cutoff
    }
    let newList = this.state.list;
    newList.push(newProduct);
    this.setState({
      list:newList,
    });
    this.props.onListChange(this.state.list);
    
    
    this.props.history.push('/admin/product/list');
  }

  render() {
    let { list, categories } = this.state;
    const formItemLayout = {
      labelCol: {
        span: 3,
      },
    };
    return (
      <div className="customer-layout">
        <Card>
          <Form {...formItemLayout}
          form={this.form}>
            <h1>Product</h1>

            <Form.Item
              label="Product Name"
              name="product name"
              rules={[
                {
                  required: true,
                  message: "Please input product name",
                },
              ]}
            >
              <Input
                style={{ width: 120 }}
                value={this.state.name}
                onChange={(e) => {
                  this.setProductName(e.target.value);
                }}
              ></Input>
            </Form.Item>
            <Form.Item label="Nickname">
              <Input
                style={{ width: 120 }}
                value={this.state.nickname}
                onChange={(e) => {
                  this.setProductNickname(e.target.value);
                }}
              ></Input>
            </Form.Item>
            <Form.Item label="Product Description">
              <TextArea
                style={{ width: "300px" }}
                autoSize={{ minRows: 3, maxRows: 6 }}
                value={this.state.description}
                onChange={(e) => {
                  this.setDescription(e.target.value);
                }}
              ></TextArea>
            </Form.Item>
            <h1>Product Settings</h1>
            <Form.Item
              label="Category"
            >
              <Select
                defaultValue="Pastries"
                style={{ width: 120 }}
                onSelect={this.setCategory}
              >
                {categories.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Pack Size">
              <Input
                style={{ width: 120 }}
                value={this.state.packsize}
                onChange={(e) => {
                  this.setPackSize(e.target.value);
                }}
              ></Input>
            </Form.Item>
            <Form.Item label="Primary Dough">
              <Select
                defaultValue="Baguette"
                style={{ width: 120 }}
                onSelect={this.setDough}
              >
                <Option key="Baguette">Baguette</Option>
                <Option key="Croissant">Croissant</Option>
                <Option key="Brioche">Brioche</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Baked Where">
              <Select
                defaultValue="SLO"
                style={{ width: 120 }}
                onSelect={this.setBakedWhere}
              >
                <Option key="SLO">SLO</Option>
                <Option key="Carlton">Carlton</Option>
                <Option key="Split">Split</Option>
              </Select>
            </Form.Item>
            <Form.Item label="When to Bake">
              <InputNumber
                min={0}
                style={{ width: 120 }}
                value={this.state.when}
                onChange={(e) => {
                  this.setWhen(e);
                }}
              />
              <span className="ant-form-text">days</span>
            </Form.Item>
            <Form.Item label="Price($)">
              <InputNumber
                min={0}
                style={{ width: 120 }}
                value={this.state.price}
                onChange={(e) => {
                  this.setPrice(e);
                }}
              />
            </Form.Item>
            <Form.Item label="Weight">
              <InputNumber
                min={0}
                style={{ width: 120 }}
                value={this.state.weight}
                onChange={(e) => {
                  this.setWeight(e);
                }}
              />
              <span className="ant-form-text">g</span>
            </Form.Item>
            <Form.Item label="Order Cutoff">
              <InputNumber
                min={0}
                style={{ width: 120 }}
                value={this.state.cutoff}
                onChange={(e) => {
                  this.setCutoff(e);
                }}
              />
              <span className="ant-form-text">days</span>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 7,
              }}
            >
              <Button type="primary" htmlType="submit"
              onClick={this.handleOk}>
                Add Product
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}
