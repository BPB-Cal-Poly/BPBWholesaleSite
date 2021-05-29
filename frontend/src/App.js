import React from "react";
import { Route, Redirect, Link, Switch } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import "antd/dist/antd.css";
import "./styles/index.css";
import './styles/app.css';

import CartOrderScreen from "./screens/CartOrderScreen";
import StandingOrderScreen from "./screens/StandingOrderScreen";
import OrderSelectionScreen from "./screens/OrderSelectionScreen";
import Login from "./user/Login";
import Admin from "./Admin";
import { isLogined, getUsername, getUserType, clearToken } from "./utils/utils";

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
          price: 3.99,
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
      fakeBusinesses: [
        {
          id: 1,
          name: "Business 1",
          addresses: ["111 S OK street", "112 S OK street"],
          phone: "(666) 666-6666",
          nickname: "1",
        },
        {
          id: 2,
          name: "Business 2",
          addresses: ["122 W This street", "123 W This street"],
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

  /* update user state as stored in local storage */
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

  /* get business from current user */
  getBusiness = () => {
    var thebusiness;
    for (let customer of this.state.fakeCustomers) {
      if (customer.username === this.state.username) {
        thebusiness = customer.business;
      }
    }
    for (let business of this.state.fakeBusinesses) {
      if (business.name === thebusiness) {
        return business;
      }
    }
  };

  render() {
    let { isLogined, username, userType } = this.state;

    let dropdown =
      userType === "admin" ? (
        <NavDropdown.Item href="/admin/main" className="disabled-text">Admin</NavDropdown.Item>
      ) : null;
    let hello_user = `Hello, ${username}`;
    let navs = username ? (
      <NavDropdown title={hello_user} id="collasible-nav-dropdown" className="disabled-text">
        {dropdown}
        <NavDropdown.Item href="/account" className="disabled-text">Account</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item
          onSelect={() => {
            console.log("selected");
            clearToken();
            this.updateUser();
            this.props.history.push("/");
          }}
          className="disabled-text"
        >
          logout
        </NavDropdown.Item>
      </NavDropdown>
    ) : <Nav.Link href="/login" className="disabled-text">login</Nav.Link>;
    return (
      <div className="grid-container">
        
        <header>
          <Navbar collapseOnSelect expand="lg" bg="custom" variant="custom" sticky="top">
            <Navbar.Brand href="/" className="header-brand disabled-text">BACK PORCH BAKERY</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto"></Nav>
              <Nav>{navs}</Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>


        <main>
          <Switch>
            <Route
              path="/admin"
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
              path="/cart-order"
              render={(props) =>
                this._isMounted && !isLogined ? (
                  <Redirect
                    to={{
                      pathname: "/login",
                      state: { from: props.location },
                    }}
                  />
                ) : (
                  <CartOrderScreen
                    {...props}
                    fakeCategories={this.state.fakeCategories}
                    fakeProducts={this.state.fakeProducts}
                    business={this.getBusiness()}
                  />
                )
              }
            ></Route>

            <Route
              exact
              path="/standing-order"
              render={(props) =>
                this._isMounted && !isLogined ? (
                  <Redirect
                    to={{
                      pathname: "/login",
                      state: { from: props.location },
                    }}
                  />
                ) : (
                  <StandingOrderScreen
                    {...props}
                    fakeCategories={this.state.fakeCategories}
                    fakeProducts={this.state.fakeProducts}
                    business={this.getBusiness()}
                  />
                )
              }
            ></Route>

            <Route
              exact
              path="/"
              render={(props) =>
                userType === "admin" ? (
                  <Redirect
                    to={{
                      pathname: "/admin/main",
                      state: { from: props.location },
                    }}
                  />
                ) : (
                  <OrderSelectionScreen
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
       <footer><Navbar variant="light"> <Navbar.Brand href="/" className="disabled-text">This is footer</Navbar.Brand></Navbar></footer>
      </div>
    );
  }
}

export default App;
