import React from "react";
import { Card, Input, message, Button} from "antd";
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
      fakeCustomers: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    console.log("mount");
    this.getCustomerList();
    // console.log(this.state.fakeCustomers);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getCustomerList = () => {
    if (this._isMounted) {
      let fakeCustomers = this.props.fakeCustomers;
      this.setState({
        fakeCustomers: fakeCustomers,
      });
    }
  };

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
    console.log(this.state.fakeCustomers);
    for (let user of this.state.fakeCustomers){
        if (user.username === data.username){
            if (user.password === data.password){
                theuser = user;
            }
            else{
                message.error("Password do not match");
                return;
            }        
        }
    }
    if(theuser == null){
        message.error("No user found");
        return;
    }
    setUsername(theuser.username);  
    if (theuser.permission === "admin"){  
        setUserType("admin");
    }
    else{
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
      <div className="login-div">
        <Card
          title="Back Porch Bakery Wholesale"
          bordered={true}
          style={{ width: 400 }}
        >
          <Input
            id="username"
            size="large"
            placeholder="Username (admin0 or user0)"
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
            placeholder="Password (admin0 or user0)"
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
            style={{
              backgroundColor: "#642626",
              borderColor: "#642626",
              width: "100px",
              float: "right",
            }}
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
