import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, message, Modal, Space, Table } from "antd";
import React from "react";
import "../styles/product-list.css";

const { confirm } = Modal;

let fakeCustomers = [
  { id: 1, name: "11", nickname: "1" },
  { id: 2, name: "22", nickname: "2" },
];

export default class CustomerList extends React.Component {
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
        list: fakeCustomers,
      });
    }
  };

  deleteCustomer = (id) => {
    let dataProps = {
      id: id,
    };
    confirm({
      title: "Are you sure you want to delete",
      content: "If you press yes, the customer will be delete permanently",
      okText: "Yes",
      cancelText: "Cancel",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        const newCustomers = fakeCustomers.filter(function (cus) {
          return cus.id != id;
        });
        message.success("Delete Successfully");
        this.setState({
          list: newCustomers,
        });
      },
    });
  };

  editCustomer = (id) => {
    this.props.history.push("/admin/customer/edit/" + id);
  };

  columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
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
              this.editCustomer(record.id);
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
