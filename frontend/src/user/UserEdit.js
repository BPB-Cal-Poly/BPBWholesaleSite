import React from "react";
import {
  Button,
  Select,
  Card,
  Input,
  Form
} from "antd";

const { Option } = Select;
let fakeBusinesses= [
  { id: 1, name: "business 1" },
  { id: 2, name: "business 2" },
];

let fakePermissions= [
  { id: 1, name: "full" },
  { id: 2, name: "order" },
];

export default class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      businesses: [],
      permissions: [],
      modelVisible: false,
      id: "",
      firstName: "",
      lastName: "",
      nickname: "",
      business: "business 1",
      permission: "order",
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getList();
    this.getUser();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getUser =()=>{
    let id = this.props.match.params.id;
    var theuser;
    // console.log(this.props.fakeCustomers);
    for (let user of this.props.fakeCustomers){
      if (user.id == id){
        theuser = user;
      }
    }
    if(this._isMounted){
      this.setState({
        firstName: theuser.firstName,
        lastName: theuser.lastName,
        nickname: theuser.nickname,
        business: theuser.business,
        permission: theuser.permissions,
      });
    }

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

  setFirstName = (name) => {
    this.setState({
      firstName: name,
    });
  };

  setLastName = (name) => {
    this.setState({
      lastName: name,
    });
  };

  setNickname = (nickname) => {
    this.setState({
      nickname: nickname,
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
          <h1>User</h1>

          <Form.Item
            label="First Name"
            // name="first name"
            rules={[
              {
                required: true,
                message: "Please input first name",
              },
            ]}
          >
            <Input
              style={{ width: 120 }}
              value={this.state.firstName}
              onChange={(e) => {
                this.setFirstName(e.target.value);
              }}
            ></Input>
          </Form.Item>
          <Form.Item
            label="Last Name"
            // name="last name"
            rules={[
              {
                required: true,
                message: "Please input last name",
              },
            ]}
          >
            <Input
              style={{ width: 120 }}
              value={this.state.lastName}
              onChange={(e) => {
                this.setLastName(e.target.value);
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
