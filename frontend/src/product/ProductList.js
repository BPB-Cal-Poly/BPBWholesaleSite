import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, message, Modal, Space, Table } from "antd";
import React from "react";
import "../styles/product-list.css";
const { confirm } = Modal;

let fakeProducts = [
  { id: 1, category: "Pastries", name: "1", nickname: "1" },
  { id: 2, category: "Rustics", name: "2", nickname: "2" },
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
        list: fakeProducts,
      });
    }
  };

  deleteProduct = (id) => {
    let dataProps = {
      id: id,
    };
    confirm({
      title: "Are you sure you want to delete",
      content: "If you press yes, the product will be delete permanently",
      okText: "Yes",
      cancelText: "Cancel",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        const newProducts = fakeProducts.filter(function (product) {
          return product.id != id;
        });
        message.success("Delete Successfully");
        this.setState({
          list: newProducts,
        });
      },
    });
  };

  editProduct= (id) => {
    this.props.history.push("/admin/product/edit/" + id);
  };

  columns = [
    {
      title: "Category",
      dataIndex: "category",
      sorter: {
        compare: (a, b) => a.category - b.category,
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.name - b.name,
      },
    },
    {
      title: "Nickname",
      dataIndex: "nickname",
      sorter: {
        compare: (a, b) => a.nickname - b.nickname,
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
              this.editProduct(record.id);
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.deleteCustomer(record.id);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  render() {
    let { list } = this.state;
    return <Table columns={this.columns} dataSource={list} />;
  }
}
