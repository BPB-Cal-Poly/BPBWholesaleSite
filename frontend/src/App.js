import React from "react";
import { Route, Redirect, Link, Switch } from "react-router-dom";
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
import "antd/dist/antd.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogined: false,
      username: "",
      userType: "",
      fakeProducts: [
        {
          id: 1,
          name: "Waffle",
          nickname: "waffle",
          description:
            "this is desciption for waffle this is desciption for waffle this is desciption for waffle this is desciption for waffle this is desciption for waffle",
          category: "Pastries",
          packsize: 10,
          dough: "Baguette",
          where: "SLO",
          when: 1,
          price: 3,
          weight: 10,
          cutoff: 2,
        },
        {
          id: 2,
          name: "Cupcake",
          nickname: "cupcake",
          description: "this is desciption for cupcake",
          category: "Rustics",
          packsize: 8,
          dough: "Croissant",
          where: "SLO",
          when: 2,
          price: 10,
          weight: 8,
          cutoff: 0,
        },
        {
          id: 3,
          name: "Croissant",
          nickname: "croissant",
          description: "this is desciption for croissant",
          category: "Pastries",
          packsize: 10,
          dough: "Baguette",
          where: "SLO",
          when: 2,
          price: 4,
          weight: 11,
          cutoff: 4,
        },
        {
          id: 4,
          name: "Pie",
          nickname: "pie",
          description: "this is desciption for pie",
          category: "Rustics",
          packsize: 8,
          dough: "Croissant",
          where: "SLO",
          when: 0,
          price: 3,
          weight: 9,
          cutoff: 5,
        },
      ],
      fakeCustomers : [
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
      fakeBusinesses: [
        {
          id: 1,
          name: "Business 1",
          addresses:["111 S OK street", "112 S OK street"],
          phone: "(666) 666-6666",
          nickname: "1",
        },
        {
          id: 2,
          name: "Business 2",
          addresses: ["122 W This street","123 W This street"],
          phone: "(555) 555-5555",
          nickname: "2",
        },
      ],
      fakeCategories: [
        { id: 1, name: "Pastries" },
        { id: 2, name: "Rustics" },
      ],
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

  getBusiness = () =>{
    // console.log("getting business for "+ this.state.username);
    var thebusiness;
    for(let customer of this.state.fakeCustomers){
      // console.log("customer is "+ customer.username);
      if (customer.username === this.state.username){
        thebusiness = customer.business;
      }
    }
    // console.log("thebusiness is "+ thebusiness);
    for(let business of this.state.fakeBusinesses){
      if(business.name === thebusiness){
        return business;
      }
    }
  }

  render() {
    let { isLogined, username, userType } = this.state;
    console.log("app username is " + username);
    let popMenuAdmin = (
      <Menu
        onClick={(p) => {
          if (p.key === "logout") {
            clearToken();
            this.updateUser();
            this.props.history.push("/");
          } else if (p.key === "admin") {
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
          if (p.key === "logout") {
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
      userType === "admin" ? (
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
                this._isMounted && this.state.userType !== "admin" ? (
                  <Redirect
                    to={{
                      pathname: "/login",
                      state: { from: props.location },
                    }}
                  />
                ) : (
                  <Admin
                    {...props}
                    fakeCustomers={this.state.fakeCustomers}
                    fakeProducts={this.state.fakeProducts}
                    fakeCategories={this.state.fakeCategories}
                    fakeBusinesses={this.state.fakeBusinesses}
                  />
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
                  userType === "admin" ? <Redirect
                  to={{
                    pathname: "/admin/main",
                    state: { from: props.location },
                  }}
                />:
                  <OrderScreen
                    {...props}
                    fakeCategories={this.state.fakeCategories}
                    fakeProducts={this.state.fakeProducts}
                    business={this.getBusiness()}
                  />
                )
              }
            ></Route>
          </Switch>
        </main>
        <footer className="row center">This is footer</footer>
      </div>
    );
  }
}

export default App;
