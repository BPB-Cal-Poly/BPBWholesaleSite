import React from "react";
import {
  Button,
  Select,
  Card,
  Input,
  Form,
  message,
  InputNumber,
  DatePicker,
  Space,
  List,
} from "antd";
import ProForm, { ModalForm } from "@ant-design/pro-form";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "../styles/order-screen.css";
import { Redirect } from "react-router-dom";
const { Option } = Select;
const { TextArea } = Input;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      //----order details---
      date: "",
      deliver: "",
      address: "",
      phone: "",
      note: "",
      orders: [],
      method: "",
      type: "",
      subtotal: 0,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getList();
    this.setOrderList();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setOrderList = () => {
    let orders = [];
    for (let theproduct of this.props.fakeProducts) {
      orders.push({ product: theproduct.name, quantity: 0 });
    }
    this.setState({
      orders,
    });
  };

  getList = () => {
    if (this._isMounted) {
      let categories = this.props.fakeCategories;
      let products = this.props.fakeProducts;
      this.setState({
        products: products,
        categories: categories,
      });
    }
  };

  setDeliverDate = (date) => {
    this.setState({
      deliverDate: date,
    });
  };

  setAddress = (addr) => {
    this.setState({
      address: addr,
    });
  };

  setPhone = (phone) => {
    this.setState({
      phone: phone,
    });
  };

  setNote = (note) => {
    this.setState({
      note: note,
    });
  };

  addToOrder = (values) => {
    this.setOrderQuantity(values.quantity, values.product)
    const newProducts = this.state.products;
    for (let theproduct of this.props.fakeProducts) {
      if (theproduct.name === values.product) {
        newProducts.push(theproduct);
      }
    }
    this.setState({
      products: newProducts,
    });
  };

  deleteFromOrders = (item) => {
    this.setOrderQuantity(0, item.name)
    const newProducts = this.state.products.filter((prod) => {
      return prod.id !== item.id;
    });
    message.success("Delete Successfully");
    this.setState({
      products: newProducts,
    });
  };

  setOrderQuantity = (quantity, name) => {
    let newOrders = this.state.orders;
    newOrders.find((x, i) => {
      if (x.product === name){
        newOrders[i].quantity = quantity;
      }
    })
    this.setState({
      orders: newOrders,
    });
  };

  getQuantity = (product) => {
    return this.state.orders.find(x => x.product === product).quantity;
  };

  getSubtotal = () => {
    let subtotal = 0;
    for (let theproduct of this.state.orders) {
      if (theproduct.quantity !== 0) {
        subtotal += theproduct.quantity * this.state.products.find(x => x.name === theproduct.product).price;
      }
    }
    return subtotal.toFixed(2);

  }

  getQuantityLength = (product) => {
    let quantity = this.getQuantity(product.name);
    return quantity.toString().length; 
  }

  handleOk = () => {
    this.setState({
      modelVisible: false,
    });
    let newProduct = {
      id: this.state.list.length + 1,
      name: this.state.name,
      nickname: this.state.nickname,
      note: this.state.note,
      category: this.state.category,
      packsize: this.state.packsize,
      dough: this.state.dough,
      where: this.state.where,
      when: this.state.when,
      price: this.state.price,
      weight: this.state.weight,
      cutoff: this.state.cutoff,
    };
    let newList = this.state.list;
    newList.push(newProduct);
    this.setState({
      list: newList,
    });
    this.props.onListChange(this.state.list);

    this.props.history.push("/admin/product/list");
  };

  render() {
    let { products, orders, note } = this.state;

    //notAddedProducts are the products not in the gallery view (they are all in by default
    //but user might delete them and want to add later);
    let notAddedProducts = this.props.fakeProducts.filter(
      (value) => !products.includes(value)
    );
    let business = this.props.business;

    const formItemLayout = {
      labelCol: {
        span: 6,
        // offset: 2,
      },
      wrapperCol: {
        span: 14,
      },
    };

    let addressForm = business ? (
      <Form.Item label="Deliver address">
        <Select
          defaultValue={business.addresses[0]}
          style={{ width: 300 }}
          onSelect={this.setAddress}
        >
          {business.addresses.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </Form.Item>
    ) : null;

    // let productsForm =
    //   products.length !== 0 ? (
    //     <Form.List name="products">
    //       {(fields, { add, remove }) => (
    //         <>
    //           {fields.map((field) => (
    //             <Space
    //               key={field.key}
    //               style={{ display: "flex", marginBottom: 8 }}
    //               align="baseline"
    //             >
    //               <Form.Item
    //                 {...field}
    //                 label="Product"
    //                 layout="vertical"
    //                 name={[field.name, "product"]}
    //                 fieldKey={[field.fieldKey, "product"]}
    //                 rules={[{ required: true, message: "Missing product" }]}
    //               >
    //                 <Select
    //                   defaultValue={products[0].name}
    //                   style={{ width: 130 }}
    //                   onSelect={this.setCategory}
    //                 >
    //                   {products.map((item) => (
    //                     <Option key={item.id} value={item.name}>
    //                       {item.name}
    //                       {" $"}
    //                       {item.price}
    //                     </Option>
    //                   ))}
    //                 </Select>
    //               </Form.Item>
    //               <Form.Item
    //                 {...field}
    //                 label="Quantity"
    //                 name={[field.name, "quantity"]}
    //                 fieldKey={[field.fieldKey, "quantity"]}
    //                 rules={[{ required: true, message: "Missing quantity" }]}
    //               >
    //                 <InputNumber
    //                   noStyle
    //                   min={1}
    //                   style={{ width: 120 }}
    //                   onChange={(e) => {
    //                     this.setWhen(e);
    //                   }}
    //                 />
    //               </Form.Item>
    //               {fields.length > 1 ? (
    //                 <MinusCircleOutlined
    //                   className="dynamic-delete-button"
    //                   onClick={() => remove(field.name)}
    //                 />
    //               ) : null}
    //             </Space>
    //           ))}
    //           <Form.Item>
    //             <Button
    //               type="dashed"
    //               onClick={() => add()}
    //               icon={<PlusOutlined />}
    //             >
    //               Add product
    //             </Button>
    //           </Form.Item>
    //         </>
    //       )}
    //     </Form.List>
    //   ) : null;

    return (
      <div>
        <div className="customer-center">
          <Card className="customer-layout">
            <Form {...formItemLayout} form={this.form}>


              <h1>Order</h1>
              <Form.Item
                label="Delivery Day"
                name="deliverDate"
                rules={[
                  {
                    required: true,
                    message: "Please select deliver date",
                  },
                ]}
              >
                <DatePicker
                  onChange={(date, dateString) => {
                    this.setDeliverDate(dateString);
                  }}
                />
              </Form.Item>
              {addressForm}
              <Form.Item label="Phone number">
                <Input
                  style={{ width: 120 }}
                  value={business ? business.phone : null}
                  onChange={(e) => {
                    this.setPhone(e.target.value);
                  }}
                ></Input>
              </Form.Item>


              <h1>Order Detail</h1>
              {notAddedProducts.length !== 0 ? (
                <Form.Item>
                  <ModalForm
                    title="Product Info"
                    width={250}
                    trigger={
                      <Button type="primary">
                        <PlusOutlined />
                        Add Product
                      </Button>
                    }
                    modalProps={{
                      onCancel: () => console.log("run"),
                    }}
                    submitter={{
                      searchConfig: {
                        submitText: "Add",
                        resetText: "Cancel",
                      },
                    }}
                    onFinish={async (values) => {
                      console.log(values);
                      this.addToOrder(values);
                      message.success("Product added");
                      return true;
                    }}
                  >
                    <Form.Item
                      label="Product"
                      name="product"
                      layout="vertical"
                      initialValue={
                        notAddedProducts.length !== 0
                          ? notAddedProducts[0].name
                          : "Select Product"
                      }
                      rules={[{ required: true, message: "Missing product" }]}
                    >
                      <Select style={{ width: 140 }} onSelect={this.setProduct}>
                        {notAddedProducts.map((item) => (
                          <Option key={item.id} value={item.name}>
                            {item.name}
                            {" $"}
                            {item.price}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Quantity"
                      name="quantity"
                      rules={[{ required: true, message: "Missing quantity" }]}
                    >
                      <InputNumber min={1} style={{ width: 120 }} />
                    </Form.Item>
                  </ModalForm>
                </Form.Item>
              ) : null}
              {products.length !== 0 ? (
                <div className="products customer-center">
                  <List
                    dataSource={products}
                    renderItem={(item) => (
                      <div className="product">
                        <div className="product-preview">
                          <div className="thumbnail">
                            <img src="https://s.cdpn.io/24822/sidebar-cupcake.png" />
                          </div>
                          <div className="product-paper">
                            <div className="product-name">{item.name}</div>
                            <div className="product-price">
                              {"$ " + item.price}
                            </div>
                          </div>
                          <div className="product-quantity" style={{width: `${this.getQuantityLength(item)+1}em`}}>
                            x
                            <InputNumber
                              bordered={false}
                              min={0}
                              defaultValue={this.getQuantity(item.name)}
                              value={this.getQuantity(item.name)}
                              onChange={(e) => {
                                this.setOrderQuantity(e, item.name);
                              }}
                              style={{ width: '100%' }}
                            ></InputNumber>
                          </div>
                        </div>
                        <div className="product-interactions">
                          <div
                            className="button del"
                            onClick={() => {
                              this.deleteFromOrders(item);
                            }}
                          >
                            x
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </div>
              ) : null}
              <Form.Item label="Special Note" {...formItemLayout}>
                <TextArea
                  style={{ width: "300px" }}
                  autoSize={{ minRows: 3, maxRows: 6 }}
                  value={note}
                  onChange={(e) => {
                    this.setNote(e.target.value);
                  }}
                ></TextArea>
              </Form.Item>



              <h1>Order Summary</h1>
              <h2 className="customer-center border-box">subtotal: $
              {this.getSubtotal()}
              </h2>
              <List
                grid={{ gutter: 20, column: 1 }}
                dataSource={orders}
                renderItem={(item) =>
                  item.quantity !== 0 ? (
                    <List.Item>
                      <List.Item.Meta
                        title={item.product+ " x" + item.quantity}
                      />
                    </List.Item>
                  ) : null
                }
              />
            <div className="add-button">
              <Button
                type="default"
                htmlType="submit"
                onClick={this.handleOk}
                shape="round"
              >
                Order
              </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}
