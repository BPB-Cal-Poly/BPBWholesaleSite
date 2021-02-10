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
import CustomerList from "./user/CustomerList";
import EditCustomer from "./user/EditCustomer";
import StandingOrders from "./order/StandingOrders";
import CartOrders from "./order/CartOrders";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;
export default class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <Sider width={250} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            // defaultOpenKeys={["sub1"]}
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
              <Menu.Item key="cartOrderList"><Link to="/admin/cart-order/list">
                  View/Edit Order List
                </Link></Menu.Item>
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
              <Menu.Item key="productAdd">Add Product</Menu.Item>
            </SubMenu>
            <SubMenu key="/customers" icon={<UserOutlined />} title="Customers">
              <Menu.Item key="customerList">
                <Link to="/admin/customer/list">View/Edit Customer List</Link>
              </Menu.Item>
              <Menu.Item key="customerAdd">Add Customer</Menu.Item>
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
            <Breadcrumb.Item>admin</Breadcrumb.Item>
            <Switch>
              <Route path="/admin/product/list">
                <Breadcrumb.Item>products</Breadcrumb.Item>
              </Route>
              <Route path="/admin/customer/list">
                <Breadcrumb.Item>customers</Breadcrumb.Item>
              </Route>
              <Route path="/admin/standing-order/list">
                <Breadcrumb.Item>standing orders</Breadcrumb.Item>
              </Route>
              <Route path="/admin/cart-order/list">
                <Breadcrumb.Item>cart orders</Breadcrumb.Item>
              </Route>
              <Route path="/admin/main">
                <Breadcrumb.Item>main</Breadcrumb.Item>
              </Route>
            </Switch>
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
                path="/admin/customer/list"
                exact
                component={CustomerList}
              />
              <Route
                path="/admin/customer/edit/:id"
                exact
                component={EditCustomer}
              />
              <Route
                path="/admin/standing-order/list"
                exact
                component={StandingOrders}
              />
              <Route
                path="/admin/cart-order/list"
                exact
                component={CartOrders}
              />
              <Route path="/admin/main">Here is the admin portal</Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
