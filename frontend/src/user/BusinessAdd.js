import React from "react";
import {
  Button,
  Select,
  Card,
  Input,
  Divider,Form
} from "antd";
import "../styles/product-list.css";

const { Option } = Select;


let fakeBusinesses= [
  { id: 1, name: "business 1" },
  { id: 2, name: "business 2" },
];

let fakePermissions= [
  { id: 1, name: "full" },
  { id: 2, name: "order" },
];

export default class BusinessAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      businesses: [],
      modelVisible: false,
      id: "",
      name: "",
      nickname: "",
      address: ["", "", "", "", ""],
      phone: "",
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
      let fakeCustomers= this.props.fakeCustomers;
      this.setState({
        list: fakeCustomers,
        businesses: fakeBusinesses,
      });
    }
  };

  setName = (name) => {
    this.setState({
      name: name,
    });
  };

  setNickname = (nickname) => {
    this.setState({
      nickname: nickname,
    });
  };

  setAddress1 = (addr) => {
    var curAddr = this.state.address;
    curAddr[0] = addr;
    this.setState({
      address: curAddr,
    });
  };
  setAddress2 = (addr) => {
    var curAddr = this.state.address;
    curAddr[1] = addr;
    this.setState({
      address: curAddr,
    });
  };
  setAddress3 = (addr) => {
    var curAddr = this.state.address;
    curAddr[2] = addr;
    this.setState({
      address: curAddr,
    });
  };
  setCity = (addr) => {
    var curAddr = this.state.address;
    curAddr[3] = addr;
    this.setState({
      address: curAddr,
    });
  };
  setZipCode = (addr) => {
    var curAddr = this.state.address;
    curAddr[4] = addr;
    this.setState({
      address: curAddr,
    });
  };

  setPhone = (phone) => {
    this.setState({
      phone: phone,
    });
  };

  handleOk = () =>{
    this.setState({
      modelVisible:false,
    });
    let newUser = {
      'id':this.state.list.length+1,
      'firstName':this.state.firstName,
      'lastName':this.state.lastName,
      'nickname':this.state.nickname,
      business: this.state.business,
      permission: this.state.permission,
    }
    let newList = this.state.list;
    newList.push(newUser);
    this.setState({
      list:newList,
    });
    this.props.onListChange(this.state.list);
    this.props.history.push('/admin/customer/user/list');
  }



  render() {
    let {list, businesses, permissions, address} = this.state;
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
          <h1>Business</h1>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input name",
              },
            ]}
          >
            <Input
              style={{ width: 120 }}
              value={this.state.name}
              onChange={(e) => {
                this.setName(e.target.value);
              }}
            ></Input>
          </Form.Item>
          <Form.Item label="Nickname">
            <Input
              style={{ width: 120 }}
              value={this.state.nickname}
              onChange={(e) => {
                this.setNickname(e.target.value);
              }}
            ></Input>
          </Form.Item>
          <h1>Address</h1>
          <Form.Item label="Address Line 1">
            <Input
              style={{ width: 250 }}
              value={this.state.address[0]}
              onChange={(e) => {
                this.setAddress1(e.target.value);
              }}
            ></Input>
          </Form.Item>
          <Form.Item label="Address Line 2">
            <Input
              style={{ width: 250 }}
              value={this.state.address[1]}
              onChange={(e) => {
                this.setAddress2(e.target.value);
              }}
            ></Input>
          </Form.Item>
          <Form.Item label="Address Line 3">
            <Input
              style={{ width: 250 }}
              value={this.state.address[2]}
              onChange={(e) => {
                this.setAddress3(e.target.value);
              }}
            ></Input>
          </Form.Item>
          <Form.Item label="City">
            <Input
              style={{ width: 130 }}
              value={this.state.address[3]}
              onChange={(e) => {
                this.setCity(e.target.value);
              }}
            ></Input>
          </Form.Item>
          <Form.Item label="Zipcode">
            <Input
              style={{ width: 120 }}
              value={this.state.address[4]}
              onChange={(e) => {
                this.setZipCode(e.target.value);
              }}
            ></Input>
          </Form.Item>
          <h1>Contact Info</h1>
          <Form.Item label="Phone">
            <Input
              style={{ width: 120 }}
              value={this.state.phone}
              onChange={(e) => {
                this.setPhone(e.target.value);
              }}
            ></Input>
          </Form.Item>
          <h1>Account Settings</h1>
          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 7,
            }}
          >
            <Button type="primary" htmlType="submit"
            // onClick={this.handleOk}
            >
              Add Business
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
    );
  }
}

