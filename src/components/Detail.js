/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react'
import { Button } from 'antd'
import { withRouter } from 'react-router-dom'

class Detail extends PureComponent {
  render() {
    console.log(this.props)
    return (
      <div>
        <Button onClick={() => { this.props.history.goBack() }}>{'<返回'}</Button>
        <p>{this.props.match.params.title}</p>
        <img style={{ width: 300 }} src={this.props.location.state.imgUrl} alt="" />
      </div>
    )
  }
}

export default withRouter(Detail)
