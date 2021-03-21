import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Dropdown, Menu, message } from "antd";
import HomeScreen from "./screens/HomeScreen";
import Login from "./user/Login";
import Admin from "./Admin";
import { isLogined, getUsername, getUserType, clearToken } from "./utils";
// import { withAuthenticator } from "aws-amplify-react";
import "antd/dist/antd.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogined: false,
      username: "",
      userType: "",
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.updateUser();
  }

  updateUser = () => {
      this.setState({
        username: getUsername(),
        userType: getUserType(),
        isLogined: isLogined(),
      });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  popMenuAdmin = (
    <Menu
      onClick={(p) => {
        if (p.key == "logout") {
          clearToken();
          this.updateUser();;
          this.props.history.push("/");
        }
        else if (p.key == "admin"){
          this.props.history.push("/admin");
        } 
        else {
          message.info(p.key);
        }
      }}
    >
      <Menu.Item key="admin">admin</Menu.Item>
      <Menu.Item key="account">account</Menu.Item>
      <Menu.Item key="logout">logout</Menu.Item>
    </Menu>
  );

  popMenuCustomer = (
    <Menu
      onClick={(p) => {
        if (p.key == "logout") {
          clearToken();
          this.updateUser();
          this.props.history.push("/");
        } else {
          message.info(p.key);
        }
      }}
    >
      <Menu.Item key="account">account</Menu.Item>
      <Menu.Item key="logout">logout</Menu.Item>
    </Menu>
  );
  render() {
    let dropdown = this.state.userType == "admin" ? (
      <Dropdown overlay={this.popMenuAdmin} className="nav-item">
        <div>
          <span>Hello, {this.state.username}</span>
        </div>
      </Dropdown>
    ) : (
      <Dropdown overlay={this.popMenuCustomer} className="nav-item">
        <div>
          <span>Hello, {this.state.username}</span>
        </div>
      </Dropdown>
    );
    let header = this.state.username ? (
      <header>
        <div>
          <a className="brand" href="/">
            Back Porch Bakery
          </a>
        </div>
        <div className="nav">
          <a href="/cart" className="nav-item">
            cart
          </a>
          {dropdown}
          <a href="/admin" className="nav-item">
            admin
          </a>
        </div>
      </header>
    ) : (
      <header className="row">
        <div>
          <a className="brand" href="/">
            Back Porch Bakery
          </a>
        </div>
        <div className="nav">
          <a href="/cart" className="nav-item">
            cart
          </a>
          <a href="/login" className="nav-item">
            login
          </a>

          <a href="/admin" className="nav-item">
            admin
          </a>
        </div>
      </header>
    );
    return (
      <div className="grid-container">
        {header}
        <main>
          <BrowserRouter>
            <Route path="/admin" component={Admin}></Route>
            <Route
              path="/login"
              exact
              render={(props) => (
                <Login {...props} onUserChange={this.updateUser} />
              )}
            ></Route>
            <Route path="/" component={HomeScreen} exact></Route>
          </BrowserRouter>
        </main>
        <footer className="row center">This is footer</footer>
      </div>
    );
  }
}

export default App;
