import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, message, Modal, Space, Table } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import "../styles/product-list.css";
const { confirm } = Modal;

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      expandedRowKeys: [],
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
      let fakeProducts = this.props.fakeProducts;
      let fakeCategories = this.props.fakeCategories
      this.setState({
        list: fakeProducts,
        categories: fakeCategories,
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
        const newProducts = this.state.list.filter(function (product) {
          return product.id !== id;
        });
        message.success("Delete Successfully");
        this.setState({
          list: newProducts,
        });
      },
    });
  };

  editProduct = (id) => {
    this.props.history.push("/admin/product/edit/" + id);
  };

  columns = [
    {
      title: "Category",
      dataIndex: "category",
      sorter: {
        compare: (a, b) => a.category.localeCompare(b.category),
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
    },
    {
      title: "When to Bake",
      dataIndex: "when",
      sorter: {
        compare: (a, b) => a.when - b.when,
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: {
        compare: (a, b) => a.price - b.price,
      },
    },
    {
      title: "Weight",
      dataIndex: "weight",
      sorter: {
        compare: (a, b) => a.weight - b.weight,
      },
    },

    {
      title: "Action",
      key: "x",
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
              this.deleteProduct(record.id);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  expandedRowRender = (record) => {
    const columns = [
      {
        title: "Nickname",
        dataIndex: "nickname",
        fixed: "left",
        sorter: {
          compare: (a, b) => a.nickname.localeCompare(b.nickname),
        },
      },
      {
        title: "Pack Size",
        dataIndex: "packsize",
        sorter: {
          compare: (a, b) => a.packsize - b.packsize,
        },
      },
      {
        title: "When to Bake",
        dataIndex: "when",
        sorter: {
          compare: (a, b) => a.when - b.when,
        },
      },
      {
        title: "Dough",
        dataIndex: "dough",
        sorter: {
          compare: (a, b) => a.dough.localeCompare(b.dough),
        },
      },
      {
        title: "Baked Where",
        dataIndex: "where",
        sorter: {
          compare: (a, b) => a.where.localeCompare(b.where),
        },
      },

      {
        title: "Cutoff",
        dataIndex: "cutoff",
        sorter: {
          compare: (a, b) => a.cutoff - b.cutoff,
        },
      },
      {
        title: "Description",
        dataIndex: "description",
        sorter: {
          compare: (a, b) => a.description.localeCompare(b.description),
        },
      },
    ];

    const list = [];
    list[0] = this.state.list[record.id - 1];
    return (
      <Table
        columns={columns}
        dataSource={list}
        pagination={false}
        size="small"
        scroll={{ x: 1000 }}
      />
    );
  };

  render() {
    let { list } = this.state;
    return (
      <div>
        <Table
          columns={this.columns}
          expandedRowRender={this.expandedRowRender}
          dataSource={list}
          sticky={true}
          rowKey="id"
        />
        <div className="add-button">
          <Button
            type="primary"
          >
            <Link to="/admin/product/add">Add Product</Link>
          </Button>
          </div>
      </div>
    );
  }
}
