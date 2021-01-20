import React from "react";
import { List, Button, Row, Col, Modal, message } from "antd";
import ReactDOM from "react-dom";

import {
    ExclamationCircleOutlined
  } from "@ant-design/icons";
import "../styles/product-list.css";
const {confirm} = Modal;

let fakeProduct = [
    { id: 1, name: "1", nickname: "1" },
    { id: 2, name: "2", nickname: "2" },
  ];

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getList();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getList = () => {

    if (this._isMounted) {
      this.setState({
        list: fakeProduct,
      });
    }
  };


  search(tar, arr){
    for (var i=0; i < arr.length; i++) {
        if (arr[i].id === tar) {
            return i;
        }
    }
}

  deleteProduct = (id) => {
      let dataProps = {
          'id':id,
      }
      confirm({
          title:'Are you sure you want to delete',
          content:'If you press yes, the product will be delete permanently',
          okText:'Yes',
          cancelText:'Cancel',
          icon: <ExclamationCircleOutlined />,
          onOk:()=>{
            fakeProduct.splice(this.search(id, fakeProduct), 1);
            message.success('Delete Successfully');
            this.setState({
                list: fakeProduct,
              });
          }
      });
  }

  render() {
    let { list } = this.state;
    return (
      <div>
        <List
          header={
            <Row className="list-div">
              <Col span={4}>
                <b>Category</b>
              </Col>
              <Col span={6}>
                <b>Name</b>
              </Col>
              <Col span={6}>
                <b>Nickname</b>
              </Col>
              <Col span={6}>
                <b>Operation</b>
              </Col>
            </Row>
          }
          bordered
          dataSource={list}
          renderItem={(item) => (
            <List.Item>
              <Row className="list-div">
                <Col span={4}>{item.id}</Col>
                <Col span={6}>{item.name}</Col>
                <Col span={6}>{item.nickname}</Col>
                <Col span={6}>
                  <Button
                    type="primary"
                    onClick={() => {
                    //   this.updateProduct(item.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      this.deleteProduct(item.id);
                    }}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            </List.Item>
          )}
        ></List>
      </div>
      // <div>Products</div>
    );
  }
}
