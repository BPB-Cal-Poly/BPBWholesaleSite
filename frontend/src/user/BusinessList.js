import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, message, Modal, Space, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";

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
    // this.getList();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  static getDerivedStateFromProps(props, state) {
    console.log("get in admin");
    if (props.fakeBusinesses !== state.fakeBusinesses) {
      console.log("fakebus change");
      return {
        list: props.fakeBusinesses,
      };
    }

    return null;
  }

  deleteBusiness = (id) => {
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

  editBusiness = (id) => {
    this.props.history.push("/admin/customer/business/edit/" + id);
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
        compare: (a, b) => a.nickname.localeCompare(b.nickname),
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: {
        compare: (a, b) => a.phone.localeCompare(b.phone),
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
              this.editBusiness(record.id);
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.deleteBusiness(record.id);
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
            <Link to="/admin/customer/business/add">Add Business</Link>
          </Button>
          </div>
      </div>
    );
  }
}
