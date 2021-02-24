import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, message, Modal, Space, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "../styles/product-list.css";

const { confirm } = Modal;


export default class BusinessList extends React.Component {
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
      let fakeCustomers= this.props.fakeCustomers;
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
        const newCustomers = this.state.list.filter(function (cus) {
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
      title: "First Name",
      dataIndex: "firstName",
      sorter: {
        compare: (a, b) => a.firstName.localeCompare(b.firstName),
      },
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      sorter: {
        compare: (a, b) => a.lastName.localeCompare(b.lastName),
      },
    },
    {
      title: "Nickname",
      dataIndex: "nickname",
      sorter: {
        compare: (a, b) => a.nickname.localeCompare(b.nickname),
      },
    },
    {
      title: "Business",
      dataIndex: "business",
      sorter: {
        compare: (a, b) => a.business.localeCompare(b.business),
      },
    },
    {
      title: "Permission",
      dataIndex: "permission",
      sorter: {
        compare: (a, b) => a.permission.localeCompare(b.permission),
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
    return (
      <div>
        <Table columns={this.columns} dataSource={list} />
        <div className="add-button">
          <Button
            type="primary"
          >
            <Link to="/admin/customer/user/add">Add User</Link>
          </Button>
          </div>
      </div>
    );
  }
}
