import React, { Component } from 'react'
// import React, { useState } from 'react';
import {connect} from 'react-redux'
import { Table,Card,Button,Popconfirm,message } from 'antd';
import {
  addCountAction,
  oddCountAction,
  deleteFromShopCarAction,
  changeSelectedAction,
  changeAllSelectedAction
} from '../redux/actions/actions'

import './Option3.css'

class Option3 extends Component {

  add=(data)=>{
    // console.log(data);
    this.props.add(data)
  }

  odd = (data) => {
    // console.log(data);
    this.props.odd(data)
  }

  delete=(data) => {
    message.success('已成功删除！')
    this.props.delete(data)
  }

  changeSelected=(data,selected)=>{
    this.props.changeSelected(data,selected)
  }

  changeAllSelected=(selected)=>{
    this.props.changeAllSelected(selected)
  }
  
  render() {
    // console.log(this.props)
    const columns = [
      {
        title: 'ID',
        dataIndex: 'key',
        key: 'key',
        // render:(text,record,index)=>`${index+1}`
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '数量',
        dataIndex: 'count',
        key: 'count',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '操作',
        dataIndex: 'key',
        key: 'key',
        render:(key,data)=>
        <div>
          <button onClick={() =>this.odd(data)} style={{marginRight:20}}>-</button>
          <button onClick={() =>this.add(data)} style={{marginLeft:20}}>+</button>
        </div>
      },
      {
        title: '删除',
        dataIndex: 'key',
        key: 'key',
        render:(key,data)=>
        <div>
          <Popconfirm
            placement="left"
            title='你忍心不要我了吗？'
            onConfirm={()=>this.delete(data)}
            okText="滚一边去"
            cancelText="算了"
          >
            {/* <Button danger onClick={() =>this.delete(data)}>删除</Button> */}
            <Button danger>删除</Button>
          </Popconfirm>
        </div>
      },
    ];
    const rowSelection = {
      type:'checkbox',
      // onChange: (selectedRowKeys, selectedRows) => {
      //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      // },
      defaultSelectedRowKeys: this.props.carList.map(item => { 
        if (item.selected === true) { 
          return item.key 
        }return null}),

      onSelect:(record, selected, selectedRows, nativeEvent)=>{
        // console.log(record, selected, selectedRows, nativeEvent);
        this.changeSelected(record,selected)
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log(selected, selectedRows, changeRows);
        this.changeAllSelected(selected)
      }
    };

    return (
      <div>
        <Card className='totalPrice'><div>￥{this.props.carList.filter(item =>item.selected===true).reduce((pre,item)=>pre+(item.count*item.price),0)}</div></Card>
          <Table rowSelection={{
            ...rowSelection,
        }} dataSource={this.props.carList} columns={columns} pagination={{ position: ['bottomCenter'] }}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {carList: state.countReducer}
}

const mapDispatchToProps = (dispatch) => {
  return {
    add:(data)=>{dispatch(addCountAction(data))},
    odd:(data)=>{dispatch(oddCountAction(data))},
    delete:(data)=>{dispatch(deleteFromShopCarAction(data))},
    changeSelected: (data, selected) => { dispatch(changeSelectedAction(data, selected)) },
    changeAllSelected:(selected) => { dispatch(changeAllSelectedAction(selected))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Option3)