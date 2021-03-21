import React from "react";
import { Card, Input, message, Button} from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import "../styles/login.css";
import { setUsername, setUserType } from "../utils/utils";
import Amplify, { API } from "aws-amplify";
import aws_exports from "../aws-exports";
Amplify.configure(aws_exports);
let fakeCustomers = [
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
];
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      username: "",
      password: "",
    };
  }

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
    
    for (let user of fakeCustomers){
        if (user.username == data.username){
            if (user.password == data.password){
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
    if (theuser.permission == "admin"){  
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
