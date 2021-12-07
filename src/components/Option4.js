import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Button} from 'antd'
import {logoutAction} from '../redux/actions/actions'

class Option4 extends Component {
  render() {
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <span>{this.props.username}-您已登录！</span>
          <Button danger onClick={() =>this.props.logout()}>退出</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state=>{
  return {username:state.loginReducer.username}
}

const mapDispatchToProps = dispatch =>{
  return {
    logout:()=>{dispatch(logoutAction())}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Option4)