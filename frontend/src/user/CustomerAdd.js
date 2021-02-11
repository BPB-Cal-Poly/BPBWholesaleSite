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
  Divider,Form
} from "antd";
import ReactDOM from "react-dom";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import "../styles/product-list.css";
const { Option } = Select;
let fakeCustomers = [
  { id: 1, name: "11", nickname: "1" },
  { id: 2, name: "22", nickname: "2" },
];

export default class CustomerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      modelVisible: false,
      id: "",
      name: "",
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
      this.setState({
        list: fakeCustomers,
      });
    }
  };

  render() {
    let {list} = this.state;
    return (
      <div className="customer-layout">
        <Card>
          <Form>
            <Form.Item label="test">
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}
