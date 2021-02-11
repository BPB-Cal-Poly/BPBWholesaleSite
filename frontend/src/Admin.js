import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  DesktopOutlined,
  SettingOutlined,
  ShopOutlined,
  DollarOutlined,
  BarsOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import "./styles/layout.css";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import ProductList from "./product/ProductList";
import ProductEdit from "./product/ProductEdit";
import CustomerList from "./user/CustomerList";
import CustomerEdit from "./user/CustomerEdit";
import CustomerAdd from "./user/CustomerAdd";
import StandingOrdersList from "./order/StandingOrdersList";
import StandingOrdersEdit from "./order/StandingOrdersEdit";
import CartOrdersList from "./order/CartOrdersList";
import CartOrdersEdit from "./order/CartOrdersEdit";
import ProductAdd from "./product/ProductAdd";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;
export default class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let pathnames = this.props.location.pathname.split("/");
    let category = pathnames[2];
    var sub_category, id;

    switch (category) {
      case "customer":
        category = "Customer";
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
            <SubMenu
              key="/cartOrders"
              icon={<BarsOutlined />}
              title="Cart Orders"
            >
              <Menu.Item key="cartOrderList">
                <Link to="/admin/cart-order/list">View/Edit Order List</Link>
              </Menu.Item>
              <Menu.Item key="cartOrderAdd">Add Cart Order</Menu.Item>
            </SubMenu>
            <SubMenu
              key="/standingOrders"
              icon={<DatabaseOutlined />}
              title="Standing Orders"
            >
              <Menu.Item key="standingOrderList">
                <Link to="/admin/standing-order/list">
                  View/Edit Order List
                </Link>
              </Menu.Item>
              <Menu.Item key="standingOrderAdd">Add Standing Order</Menu.Item>
            </SubMenu>
            <SubMenu key="/products" icon={<ShopOutlined />} title="Products">
              <Menu.Item key="productList">
                <Link to="/admin/product/list">View/Edit Product List</Link>
              </Menu.Item>
              <Menu.Item key="productAdd">
                <Link to="/admin/product/add">Add Product</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="/customers" icon={<UserOutlined />} title="Customers">
              <Menu.Item key="customerList">
                <Link to="/admin/customer/list">View/Edit Customer List</Link>
              </Menu.Item>
              <Menu.Item key="customerAdd">
                <Link to="/admin/customer/add">Add Customer</Link>
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
              {sub_category ? sub_category : null}
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id ? id : null}</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: "0 16px",
              minHeight: 280,
            }}
          >
            <Switch>
              <Route path="/admin/product/list" exact component={ProductList} />
              <Route
                path="/admin/product/edit/:id"
                exact
                component={ProductEdit}
              />
              <Route path="/admin/product/add" exact component={ProductAdd} />
              <Route
                path="/admin/customer/list"
                exact
                component={CustomerList}
              />
              <Route
                path="/admin/customer/edit/:id"
                exact
                component={CustomerEdit}
              />
              <Route path="/admin/customer/add" exact component={CustomerAdd} />
              <Route
                path="/admin/standing-order/list"
                exact
                component={StandingOrdersList}
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
