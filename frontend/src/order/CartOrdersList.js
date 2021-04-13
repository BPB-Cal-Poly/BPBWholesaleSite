import React from "react";
import { Button, Modal, message, Table, Space } from "antd";
import { Link } from "react-router-dom";

import { ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;

let fakeOrders = [
  {
    id: 1,
    name: "John Brown",
    date: "2020-02-09",
  },
  {
    id: 2,
    name: "Jim Green",
    date: "2020-02-09",
  },
  {
    id: 3,
    name: "Joe Black",
    date: "2020-02-07",
  },
  {
    id: 4,
    name: "Addy Red",
    date: "2020-02-02",
  },
];

export default class CartOrdersList extends React.Component {
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
        list: fakeOrders,
      });
    }
  };

  deleteOrder = (id) => {
    let dataProps = {
      id: id,
    };
    confirm({
      title: "Are you sure you want to delete",
      content: "If you press yes, the Order will be delete permanently",
      okText: "Yes",
      cancelText: "Cancel",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        const newOrders = fakeOrders.filter(function (order) {
          return order.id !== id;
        });
        message.success("Delete Successfully");
        this.setState({
          list: newOrders,
        });
      },
    });
  };

  editOrder = (id) => {
    this.props.history.push("/admin/standing-order/edit/" + id);
  };
  columns = [
    {
      title: "Purchase Order",
      dataIndex: "id",
      sorter: {
        compare: (a, b) => a.id - b.id,
      },
    },
    {
      title: "Date of Delivery",
      dataIndex: "date",
      sorter: {
        compare: (a, b) => a.date.localeCompare(b.date),
      },
    },
    {
      title: "Action",
      id: "action",
      dataIndex: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              this.editOrder(record.id);
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.deleteOrder(record.id);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  render() {
    let { list } = this.state;
    return (
      <div>
        <Table columns={this.columns} dataSource={list} />;
        <div className="add-button">
          <Button
            type="primary"
          >
            <Link to="/admin/cart-order/add">Add Cart Order</Link>
          </Button>
          </div>
      </div>
    );
  }
}
