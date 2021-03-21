import React from "react";
import { BrowserRouter, Route, Redirect, Link, Switch } from "react-router-dom";
import { Dropdown, Menu, message } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
  SafetyCertificateOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";
import OrderScreen from "./screens/OrderScreen";
import Login from "./user/Login";
import Admin from "./Admin";
import { isLogined, getUsername, getUserType, clearToken } from "./utils/utils";
import { ExclamationCircleOutlined } from "@ant-design/icons";
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
    console.log("mount");
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
    console.log("will mount");
    // this.updateUser();
    this._isMounted = false;
  }

  render() {
    let { isLogined, username, userType } = this.state;
    console.log(userType + " " + isLogined);
    let popMenuAdmin = (
      <Menu
        onClick={(p) => {
          if (p.key == "logout") {
            clearToken();
            this.updateUser();
            this.props.history.push("/");
          } else if (p.key == "admin") {
          } else {
            message.info(p.key);
          }
        }}
      >
        <Menu.Item key="admin" icon={<ReconciliationOutlined />}>
          <Link to="/admin/main">admin</Link>
        </Menu.Item>
        <Menu.Item key="account" icon={<SafetyCertificateOutlined />}>
          account
        </Menu.Item>
        <Menu.Item key="logout" icon={<LoginOutlined />}>
          logout
        </Menu.Item>
      </Menu>
    );

    let popMenuCustomer = (
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
        <Menu.Item key="account" icon={<SafetyCertificateOutlined />}>
          account
        </Menu.Item>
        <Menu.Item key="logout" icon={<LoginOutlined />}>
          logout
        </Menu.Item>
      </Menu>
    );
    let dropdown =
      userType == "admin" ? (
        <Dropdown overlay={popMenuAdmin} className="nav-item">
          <div>
            <UserOutlined />
            <span>Hello, {username}</span>
          </div>
        </Dropdown>
      ) : (
        <Dropdown overlay={popMenuCustomer} className="nav-item">
          <div>
            <UserOutlined />
            <span>Hello, {username}</span>
          </div>
        </Dropdown>
      );
    let header = username ? (
      <header>
        <div>
          <a className="brand" href="/">
            Back Porch Bakery
          </a>
        </div>
        <div className="nav">
          <a href="/cart" className="nav-item">
            <ShoppingCartOutlined />
            cart
          </a>
          {dropdown}
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
          <a href="/login" className="nav-item">
            login
          </a>
        </div>
      </header>
    );
    return (
      <div className="grid-container">
        {header}
        <main>
          <Switch>
            <Route
              path="/admin"
              // component={Admin}
              render={(props) =>
                this._isMounted && this.state.userType != "admin" ? (
                  <Redirect
                    to={{
                      pathname: "/login",
                      state: { from: props.location },
                    }}
                  />
                ) : (
                  <Admin {...props} />
                )
              }
            />
            <Route
              path="/login"
              exact
              render={(props) => (
                <Login {...props} onUserChange={this.updateUser} />
              )}
            ></Route>
            <Route
              exact
              path="/"
              render={(props) =>
                this._isMounted && !isLogined ? (
                  <Redirect
                    to={{
                      pathname: "/login",
                      state: { from: props.location },
                    }}
                  />
                ) : (
                  <OrderScreen {...props} />
                )
              }
            ></Route>
            {/* <Route
              exact
              path="/"
              render={(props) => <OrderScreen {...props} />}
            ></Route> */}
          </Switch>
        </main>
        <footer className="row center">This is footer</footer>
      </div>
    );
  }
}

export default App;
