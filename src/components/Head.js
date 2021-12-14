/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class Head extends PureComponent {
  render() {
    return (
      <div style={{ color: 'white' }}>
        <span style={{ color: 'white', fontWeight: '900', fontSize: 20 }}>welcome</span>
        {
          this.props.isLogin ? (
            <span>
              {' '}
              -
              {' '}
              {this.props.username}
            </span>
          ) : ''
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  username: state.loginReducer.username, isLogin: state.loginReducer.isLogin,
})

export default connect(mapStateToProps, null)(Head)
