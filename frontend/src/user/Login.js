import React from "react";
import { Card, Input, message, Button, Form, Checkbox } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import "../styles/login.css";
import { setUsername, setUserType } from "../utils/utils";
import Amplify, { API } from "aws-amplify";
import aws_exports from "../aws-exports";
Amplify.configure(aws_exports);

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      fakeCustomers: [
        {
          id: 1,
          firstName: "first1",
          lastName: "last1",
          username: "user0",
          password: "user0",
          nickname: "1",
          business: "Business 1",
          permission: "customer",
        },
        {
          id: 2,
          firstName: "admin",
          lastName: "0",
          username: "admin0",
          password: "admin0",
          nickname: "admin0",
          business: "Business 2",
          permission: "admin",
        },
      ],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    // this.getCustomerList();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // getCustomerList = () => {
  //   if (this._isMounted) {
  //     let fakeCustomers = this.props.fakeCustomers;
  //     this.setState({
  //       fakeCustomers: fakeCustomers,
  //     });
  //   }
  // };

  async fetchUser(data) {
    const response = await API.get("user", "/user/:username")
      // const response = await API.get("user", "/user")
      .then((response) => {
        console.log(response);
      });
    // this.setState({ list: [...response] });
  }

  getUser(data) {
    var theuser;
    // console.log(data.username);
    for (let user of this.state.fakeCustomers) {
      if (user.username === data.username) {
        if (user.password === data.password) {
          theuser = user;
        } else {
          message.error("Password do not match");
          return;
        }
      }
    }
    if (theuser == null) {
      message.error("No user found");
      return;
    }
    setUsername(theuser.username);
    if (theuser.permission === "admin") {
      setUserType("admin");
    } else {
      setUserType("customer");
    }
    this.props.onUserChange();
    this.props.history.push({ pathname: "/" });
  }

  checkLogin = () => {
    if (!this.state.username) {
      message.error("Username cannot be empty");
      return false;
    } else if (!this.state.password) {
      message.error("Password cannot be empty");
      return false;
    }
    let dataProps = {
      password: this.state.password,
      username: this.state.username,
    };
    this.getUser(dataProps);
    // let dataProps = {
    //         body : {
    //             username: this.state.username
    //         }
    // }
    // this.fetchUser(dataProps);
    // });
  };

  onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  setUserName = (name) => {
    this.setState({
      username: name,
    });
  };

  setPassword = (pass) => {
    this.setState({
      password: pass,
    });
  };

  render() {
    return (
      <div className="main-container">
        <div className="customer-center">
          <div className="order-selection-container">
            <Card
              className="card-transparent"
              title="Back Porch Bakery Wholesale"
              bordered={true}
              style={{ width: 400 }}
            >
              <Form
                name="login-form"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={this.onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username",
                    },
                  ]}
                >
                  <Input
                    id="username"
                    // size="large"
                    placeholder="Username (admin0 or user0)"
                    prefix={
                      <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    onChange={(e) => {
                      this.setUserName(e.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input.Password
                    id="password"
                    placeholder="Password (admin0 or user0)"
                    prefix={
                      <KeyOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    onChange={(e) => {
                      this.setPassword(e.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <a
                    style={{
                      float: "right",
                    }}
                    href="/forgot-password"
                  >
                    Forgot password
                  </a>
                </Form.Item>
                <Button
                  type="primary"
                  // style={{ backgroundColor: "#642626", borderColor: "#642626" }}
                  block
                  onClick={this.checkLogin}
                >
                  Login in
                </Button>
                Or <a href="/signup">register now!</a>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

// export default withAuthenticator(Login);
