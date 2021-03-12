import React from "react";
import { Card, Input, message, Button, Menu, Breadcrumb } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import ApiUrl from "../config/api_url";
import ReactDOM from "react-dom";
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
    axios({
      method: "post",
      url: ApiUrl.USER_LOGIN,
      data: dataProps,
    }).then((res) => {
      console.log(res.data);
      let data = res.data.data;
      if (res.data.code == 0) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("username", data.username);
        const { history } = this.props;
        history.push({ pathname: "/admin" });
      } else {
        message.error("Password do not match");
      }
    });
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
          <br />
          <br />
          <Button
            type="primary"
            
            style={{ backgroundColor: "#642626", borderColor: "#642626", width: '100px', float: 'right' }}
            block
            onClick={this.checkLogin}
          >
            
            <a href="/signup">Sign up</a>
          </Button>
        </Card>
      </div>
    );
  }
}

// export default withAuthenticator(Login);
