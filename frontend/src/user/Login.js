import React from "react";
import { Card, Input, message, Button, Menu, Breadcrumb } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "../styles/login.css";
import axios from "axios";
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
    };
  }

  checkLogin = () => {
    if (!this.state.userName) {
      message.error("Username cannot be  empty");
      return false;
    } else if (!this.state.password) {
      message.error("Password cannot be  empty");
      return false;
    }
    let dataProps = {
      username: this.state.userName,
      password: this.state.password,
    };
  };

  setUserName = (name) => {
    this.setState({
      userName: name,
    });
  };

  setPassword = (pass) => {
    this.setState({
      password: pass,
    });
  };

  render() {
    return (
      <div className="login-div">
        <Card
          title="Back Porch Bakery Wholesale"
          bordered={true}
          style={{ width: 400 }}
        >
          <Input
            id="userName"
            size="large"
            placeholder="Username"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={(e) => {
              this.setUserName(e.target.value);
            }}
          />
          <br />
          <br />
          <Input.Password
            id="password"
            size="large"
            placeholder="Password"
            prefix={<KeyOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={(e) => {
              this.setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button
            type="primary"
            size="large"
            style={{ backgroundColor: "#642626", borderColor: "#642626" }}
            block
            onClick={this.checkLogin}
          >
            Login in
          </Button>
        </Card>
      </div>
    );
  }
}

// export default withAuthenticator(Login);
