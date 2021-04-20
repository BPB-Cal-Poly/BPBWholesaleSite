import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UsergroupAddOutlined,
  DesktopOutlined,
  SettingOutlined,
  ShopOutlined,
  DollarOutlined,
  BarsOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

import { Route, Switch, Link } from "react-router-dom";
import ProductList from "./product/ProductList";
import ProductEdit from "./product/ProductEdit";
import UserList from "./user/UserList";
import BusinessList from "./user/BusinessList";
import UserEdit from "./user/UserEdit";
import UserAdd from "./user/UserAdd";
import BusinessAdd from "./user/BusinessAdd";
import StandingOrdersList from "./order/StandingOrdersList";
import StandingOrdersEdit from "./order/StandingOrdersEdit";
import CartOrdersList from "./order/CartOrdersList";
import CartOrdersEdit from "./order/CartOrdersEdit";
import ProductAdd from "./product/ProductAdd";
import './styles/admin.css';
const { Content, Sider } = Layout;
const { SubMenu } = Menu;

export default class OrderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fakeCategories: [],
      fakeProducts: [],
      fakeBusinesses: [],
      fakeCustomers : [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log("get in admin");
    if (props.fakeProducts !== state.fakeProducts) {
      console.log("fakeproduct change");
      return {
        fakeProducts: props.fakeProducts,
      };
    }
    if (props.fakeCategories !== state.fakeCategories) {
      console.log("fakecat change");
      return {
        fakeCategories: props.fakeCategories,
      };
    }
    if (props.fakeBusinesses !== state.fakeBusinesses) {
      console.log("fakebus change");
      return {
        fakeBusinesses: props.fakeBusinesses,
      };
    }
    if (props.fakeCustomers !== state.fakeCustomers) {
      console.log("fakecus change");
      return {
        fakeCustomers: props.fakeCustomers,
      };
    }

    return null;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getList = () => {
    if (this._isMounted) {
      let fakeProducts = this.props.fakeProducts;
      let fakeCategories = this.props.fakeCategories;
      let fakeBusinesses = this.props.fakeBusinesses;
      this.setState({
        fakeProducts: fakeProducts,
        fakeCategories: fakeCategories,
        fakeBusinesses: fakeBusinesses
      });
    }
  };

  handleProductChange = (fakeProducts) => {
    this.setState({ fakeProducts });
  };

  handleUserChange = (fakeCustomers) => {
    this.setState({ fakeCustomers });
  };

  render() {
    let pathnames = this.props.location.pathname.split("/");
    let category = pathnames[2];
    var sub_category, id, customer_category;
    switch (category) {
      case "customer":
        category = "Customer";
        customer_category = pathnames[3];
        break;
      case "product":
        category = "Product";
        break;
      case "standing-order":
        category = "Standing Orders";
        break;
      case "cart-order":
        category = "Cart Orders";
        break;
      default:
        category = "Main";
    }
    if (pathnames.length > 2) {
      sub_category = pathnames[3];
      if (category === "Customer") {
        sub_category = pathnames[4];
      }
      switch (sub_category) {
        case "list":
          sub_category = "List";
          break;
        case "edit":
          sub_category = "Edit";
          break;
        case "add":
          sub_category = "Add";
          break;
        default:
          break;
      }
    }
    if (pathnames.length > 3) {
      let id = pathnames[4];
    }
    return (
      <Layout>
        <Sider width={250} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="/main" icon={<DesktopOutlined />}>
              <Link to="/admin/main">Admin</Link>
            </Menu.Item>
            <Menu.Item
              key="/cartOrders"
              icon={<BarsOutlined />}
              title="Cart Orders"
            >
              <Link to="/admin/cart-order/list">Cart Orders</Link>
            </Menu.Item>
            <Menu.Item
              key="/standingOrders"
              icon={<DatabaseOutlined />}
              title="Standing Orders"
            >
              <Link to="/admin/standing-order/list">Standing Orders</Link>
            </Menu.Item>
            <Menu.Item key="/products" icon={<ShopOutlined />} title="Products">
              <Link to="/admin/product/list">Products</Link>
            </Menu.Item>
            <SubMenu key="/customers" icon={<UsergroupAddOutlined />} title="Customers">
              <Menu.Item key="userList">
                <Link to="/admin/customer/user/list">Users</Link>
              </Menu.Item>
              <Menu.Item key="businessList">
                <Link to="/admin/customer/business/list">Businesses</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="/billing"
              icon={<DollarOutlined />}
              title="Billing"
            ></SubMenu>
            <Menu.Item key="/setting" icon={<SettingOutlined />}>
              Setting
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>{category}</Breadcrumb.Item>
            <Breadcrumb.Item>
              {customer_category ? customer_category : null}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {sub_category ? sub_category : null}
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id ? id : null}</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: "0 16px",
              minHeight: 300,
              backgroundColor: 'white'
            }}
          >
            <Switch>
              <Route
                path="/admin/product/list"
                exact
                render={(props) => (
                  <ProductList
                    {...props}
                    fakeProducts={this.state.fakeProducts}
                    fakeCategories={this.state.fakeCategories}
                  />
                )}
              />
              <Route
                path="/admin/product/edit/:id"
                exact
                render={(props) => (
                  <ProductEdit
                    {...props}
                    fakeProducts={this.state.fakeProducts}
                    fakeCategories={this.state.fakeCategories}
                    onListChange={this.handleProductChange}
                  />
                )}
              />
              <Route
                path="/admin/product/add"
                exact
                render={(props) => (
                  <ProductAdd
                    {...props}
                    fakeProducts={this.state.fakeProducts}
                    fakeCategories={this.state.fakeCategories}
                    onListChange={this.handleProductChange}
                  />
                )}
              />
              <Route
                path="/admin/customer/user/list"
                exact
                render={(props) => (
                  <UserList
                    {...props}
                    fakeCustomers={this.state.fakeCustomers}
                  />
                )}
              />
              <Route
                path="/admin/customer/business/list"
                exact
                render={(props) => (
                  <BusinessList
                    {...props}
                    // fakeCustomers={this.state.fakeCustomers}
                    fakeBusinesses={this.state.fakeBusinesses}
                  />
                )}
              />
              <Route
                path="/admin/customer/user/edit/:id"
                exact
                render={(props) => (
                  <UserEdit
                    {...props}
                    fakeCustomers={this.state.fakeCustomers}
                    onListChange={this.handleUserChange}
                  />
                )}
              />
              <Route
                path="/admin/customer/user/add"
                exact
                render={(props) => (
                  <UserAdd
                    {...props}
                    fakeCustomers={this.state.fakeCustomers}
                    onListChange={this.handleUserChange }
                  />
                )}
              />
              <Route
                path="/admin/customer/business/add"
                exact
                render={(props) => (
                  <BusinessAdd
                    {...props}
                    fakeCustomers={this.state.fakeCustomers}
                    onListChange={this.handleUserChange }
                  />
                )}
              />
              <Route
                path="/admin/standing-order/list"
                exact
                render={(props) => (
                  <StandingOrdersList
                    {...props}
                    fakeCustomers={this.state.fakeCustomers}
                    onListChange={this.handleListChange}
                  />
                )}
                // component={StandingOrdersList}
              />
              <Route
                path="/admin/standing-order/edit"
                exact
                component={StandingOrdersEdit}
              />
              <Route
                path="/admin/cart-order/list"
                exact
                component={CartOrdersList}
              />
              <Route
                path="/admin/cart-order/edit"
                exact
                component={CartOrdersEdit}
              />
              <Route path="/admin/main">Here is the admin portal</Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
