import React from "react";
import {
  Button,
  Select,
  Card,
  Input,
  Divider,Form
} from "antd";
import { LocationSearch } from "../utils/LocationSearch";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { FormComponentProps } from "antd/lib/form/Form";
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
      permissions: [],
      modelVisible: false,
      id: "",
      name: "",
      nickname: "",
      address: "",
      permission: "order",
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
        permissions: fakePermissions,
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

  setAddress = (addr) => {
    this.setState({
      address: addr,
    });
  };

  setBusiness = (business) => {
    this.setState({
      business: business,
    });
  };

  setPermission = (permission) => {
    this.setState({
      permission: permission,
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

  handleAddressChange = (address) => {
    this.setState({
        address: address,
      });
  };

  handleAddressSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        return getLatLng(results[0]);
      })
      .then((latLng) => {
        console.log('Success', latLng);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };


  render() {
    let {list, businesses, permissions} = this.state;
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
          <Form.Item label="Address">
            <Input
              style={{ width: 120 }}
              value={this.state.address}
              onChange={(e) => {
                this.setAddress(e.target.value);
              }}
            ></Input>
          </Form.Item>
          <Form.Item label="Address1" initialValue=""
                rules= {[{ required: false }]}>
       
                <LocationSearch
                  address={this.state.address}
                  onChange={this.handleAddressChange}
                  onAddressSelect={this.handleAddressSelect}
                />

        
          </Form.Item>
          <Form.Item
            label="Business"
          >
            <Select
              defaultValue="business 1"
              style={{ width: 120 }}
              onSelect={this.setBusiness}
            >
              {businesses.map((item) => (
                <Option key={item.id} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Permission"
          >
            <Select
              defaultValue="order"
              style={{ width: 120 }}
              onSelect={this.setPermission}
            >
              {permissions.map((item) => (
                <Option key={item.id} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 7,
            }}
          >
            <Button type="primary" htmlType="submit"
            onClick={this.handleOk}>
              Add User
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
    );
  }
}

