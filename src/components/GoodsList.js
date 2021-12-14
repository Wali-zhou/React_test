/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import {
  Table, Button, Card, Input, Form, message,
} from 'antd'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import React, { useState, useRef, useEffect } from 'react'
import { addShopCarAction, isloadingAction } from '../redux/actions/actions'
import { getList } from '../service/api'

const { Search } = Input

const GoodsList = function GoodsList(props) {
  const form = useRef()
  let [dataSource, setDataSource] = useState([])

  useEffect(() => {
    props.handleLoading(true)
    getList().then((res) => {
      setDataSource(res.data.list)
    })
      .catch(() => {})
      .finally(() => {
        props.handleLoading(false)
      })
    return () => { setDataSource = () => false }
  }, [])

  function search(keyWord) {
    if (keyWord.trim()) {
      const searchData = dataSource.filter((item) => {
        if (item.name.includes(keyWord) || item.address.includes(keyWord)) {
          return true
        }
        return false
      })
      setDataSource(searchData)
    } else {
      props.handleLoading(true)
      getList().then((res) => {
        setDataSource(res.data.list)
      })
        .catch(() => {})
        .finally(() => {
          props.handleLoading(false)
        })
    }
  }

  function addUser(data) {
    if (dataSource.find((item) => item.key === data.key) === undefined) {
      const newObj = {
        key: data.key,
        name: data.name,
        price: data.price,
        address: data.address,
        selected: true,
      }
      setDataSource([...dataSource, newObj])
      message.success('已添加成功!')
      form.current.resetFields()
    } else {
      message.error('已存在相同的Key，请重试!')
    }
  }

  function addShopCar(data) {
    if (props.isLogin) {
      props.addShopCar(data)
      message.success('添加成功!')
    } else {
      message.warning('请登录后尝试!')
    }
  }

  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      // key: 'key',
      // render:(text,record,index)=>`${index+1}`
    },
    {
      title: '姓名',
      dataIndex: 'name',
      // key: 'name',
      render: (a, b) => <NavLink to={{ pathname: `goodlist/detail/${a}`, state: b }}>{a}</NavLink>,
    },
    {
      title: '价格',
      dataIndex: 'price',
      // key: 'price',
    },
    {
      title: '住址',
      dataIndex: 'address',
      // key: 'address',
    },
    {
      title: '操作',
      dataIndex: 'key',
      // key: 'key',
      render: (key, data) => (
        <Button
          type="primary"
          onClick={() => addShopCar(data)}
        >
          添加购物车
        </Button>
      ),
    },
  ]

  function onFinish(values) {
    // console.log('Success:', values)
    addUser(values)
  }

  return (
    <div>
      {/* 搜索框 */}
      <Card style={{ width: 350, margin: 10 }}>
        <Search
          allowClear
          placeholder="请输入用户名或地址查询"
          onSearch={(value) => search(value)}
          enterButton
          style={{ width: 300, marginRight: 20 }}
        />
      </Card>
      {/* 添加商品框 */}
      <Card style={{ marginLeft: 10, marginBottom: 10 }}>
        <Form
          ref={form}
          layout="inline"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={(values) => onFinish(values)}
          autoComplete="off"
          style={{ marginTop: 20, marginLeft: 20 }}
        >
          <Form.Item
            name="key"
            rules={[
              {
                required: true,
                message: 'Please input your key!',
              },
            ]}
          >
            <Input placeholder="请输入Key" />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="price"
            rules={[
              {
                required: true,
                message: 'Please input your price!',
              },
            ]}
          >
            <Input placeholder="请输入价格" />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: 'Please input your address!',
              },
            ]}
          >
            <Input placeholder="请输入地址" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              添加
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 商品列表框 */}
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ position: ['bottomCenter'] }}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  carList: state.countReducer, isLogin: state.loginReducer.isLogin,
})

const mapDispatchToProps = (dispatch) => ({
  addShopCar: (data) => { dispatch(addShopCarAction(data)) },
  handleLoading: (data) => { dispatch(isloadingAction(data)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(GoodsList)

// import React, { Component } from 'react'
// import {
//   Table, Button, Card, Input, Form, message,
// } from 'antd'
// const { Search } = Input
// import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom'
// import React, { useState, useRef, useEffect } from 'react'
// import { addShopCarAction, isloadingAction } from '../redux/actions/actions'
// import { getList } from '../service/api'
// class GoodsList extends Component {
//   constructor(props) {
//     super(props)
//     this.state = { dataSource: [] }
//     this.form = React.createRef()
//   }

//   componentDidMount() {
//     this.props.handleLoading(true)
//     getList().then((res) => {
//       this.setState({ dataSource: res.data.list })
//     })
//       .catch(() => {})
//       .finally(() => {
//         this.props.handleLoading(false)
//       })
//   }

//   componentWillUnmount() {
//     this.setState = () => false
//   }

//   search(keyWord) {
//     if (keyWord.trim()) {
//       const searchData = this.state.dataSource.filter((item) => {
//         if (item.name.includes(keyWord) || item.address.includes(keyWord)) {
//           return true
//         }
//         return false
//       })
//       this.setState({ dataSource: searchData })
//     } else {
//       this.props.handleLoading(true)
//       getList().then((res) => {
//         this.setState({ dataSource: res.data.list })
//       })
//         .catch(() => {})
//         .finally(() => {
//           this.props.handleLoading(false)
//         })
//     }
//   }

//   addUser(data) {
//     if (this.state.dataSource.find((item) => item.key === data.key) === undefined) {
//       const newObj = {
//         key: data.key,
//         name: data.name,
//         price: data.price,
//         address: data.address,
//         selected: true,
//       }
//       this.setState({ dataSource: [...this.state.dataSource, newObj] })
//       message.success('已添加成功!')
//       this.form.current.resetFields()
//     } else {
//       message.error('已存在相同的Key，请重试!')
//     }
//   }

//   addShopCar(data) {
//     if (this.props.isLogin) {
//       this.props.addShopCar(data)
//       message.success('添加成功!')
//     } else {
//       message.warning('请登录后尝试!')
//     }
//   }

//   render() {
//     // console.log(this.props);
//     const { dataSource } = this.state

//     const columns = [
//       {
//         title: 'Key',
//         dataIndex: 'key',
//         // key: 'key',
//         // render:(text,record,index)=>`${index+1}`
//       },
//       {
//         title: '姓名',
//         dataIndex: 'name',
//         // key: 'name',
//         render: (a) => <NavLink to={`option1/detail/${a}`}>{a}</NavLink>,
//       },
//       {
//         title: '价格',
//         dataIndex: 'price',
//         // key: 'price',
//       },
//       {
//         title: '住址',
//         dataIndex: 'address',
//         // key: 'address',
//       },
//       {
//         title: '操作',
//         dataIndex: 'key',
//         // key: 'key',
//         render: (key, data) => (
//           <Button
//             type="primary"
//             onClick={() => this.addShopCar(data)}
//           >
//             添加购物车
//           </Button>
//         ),
//       },
//     ]

//     const onFinish = (values) => {
//       // console.log('Success:', values);
//       this.addUser(values)
//     }

//     return (
//       <div>
//         <Card style={{ width: 350, margin: 10 }}>
//           <Search
//             allowClear
//             placeholder="请输入用户名或地址查询"
//             onSearch={(value) => this.search(value)}
//             enterButton
//             style={{ width: 300, marginRight: 20 }}
//           />
//         </Card>

//         <Card style={{ marginLeft: 10, marginBottom: 10 }}>
//           <Form
//             ref={this.form}
//             layout="inline"
//             name="basic"
//             labelCol={{
//               span: 8,
//             }}
//             wrapperCol={{
//               span: 16,
//             }}
//             onFinish={onFinish}
//             autoComplete="off"
//             style={{ marginTop: 20, marginLeft: 20 }}
//           >
//             <Form.Item
//               name="key"
//               rules={[
//                 {
//                   required: true,
//                   message: 'Please input your key!',
//                 },
//               ]}
//             >
//               <Input placeholder="请输入Key" />
//             </Form.Item>
//             <Form.Item
//               name="name"
//               rules={[
//                 {
//                   required: true,
//                   message: 'Please input your name!',
//                 },
//               ]}
//             >
//               <Input placeholder="请输入用户名" />
//             </Form.Item>
//             <Form.Item
//               name="price"
//               rules={[
//                 {
//                   required: true,
//                   message: 'Please input your price!',
//                 },
//               ]}
//             >
//               <Input placeholder="请输入价格" />
//             </Form.Item>
//             <Form.Item
//               name="address"
//               rules={[
//                 {
//                   required: true,
//                   message: 'Please input your address!',
//                 },
//               ]}
//             >
//               <Input placeholder="请输入地址" />
//             </Form.Item>

//             <Form.Item
//               wrapperCol={{
//                 offset: 8,
//                 span: 16,
//               }}
//             >
//               <Button type="primary" htmlType="submit">
//                 添加
//               </Button>
//             </Form.Item>
//           </Form>
//         </Card>

//         <Table
//           dataSource={dataSource}
//           columns={columns}
//           pagination={{ position: ['bottomCenter'] }}
//         />
//       </div>
//     )
//   }
// }
