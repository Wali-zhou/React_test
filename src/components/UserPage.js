/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { withRouter } from 'react-router-dom'
import { logoutAction } from '../redux/actions/actions'

class UserPage extends Component {
  logout() {
    window.sessionStorage.clear()
    this.props.logout()
    this.props.history.push('/login')
  }

  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>
            {this.props.username}
            -您已登录！
          </span>
          <Button danger onClick={() => this.logout()}>退出</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ username: state.loginReducer.username })

const mapDispatchToProps = (dispatch) => ({
  logout: () => { dispatch(logoutAction()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserPage))
