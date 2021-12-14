/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import './App.css'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import Head from './components/Head'
import Nav from './components/Nav'
import Bottom from './components/Bottom'
// import mainRoutes from './routes/mainRoutes'
import GoodsList from './components/GoodsList'
import ShopCar from './components/ShopCar'
import Login from './components/Login'
import Detail from './components/Detail'
import UserPage from './components/UserPage'

const {
  Header, Footer, Sider, Content,
} = Layout

class App extends PureComponent {
  render() {
    // console.log(this)
    return (
      <div style={{ height: '100%' }}>
        <Layout className="container">
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}><Head /></Header>
          <Layout className="mainPage">
            <Sider
              style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 64,
              }}
            >
              <Nav />
            </Sider>
            <Content style={{ marginLeft: 200, marginTop: 64 }}>
              <Switch>
                <Route exact path="/goodlist" component={GoodsList} />
                <Route
                  exact
                  path="/login"
                  render={() => {
                    if (this.props.isLogin) {
                      return <Redirect to="/userpage" />
                    }
                    return <Login />
                  }}
                />
                <Route
                  exact
                  path="/userpage"
                  render={() => {
                    if (this.props.isLogin) {
                      return <UserPage />
                    }
                    return <Redirect to="/login" />
                  }}
                />
                <Route
                  exact
                  path="/shopcar"
                  render={() => {
                    if (this.props.isLogin) {
                      return <ShopCar />
                    }
                    return <Redirect to="/login" />
                  }}
                />
                <Route exact path="/goodlist/detail/:title" component={Detail} />
                <Redirect to="/goodlist" from="/" />
                {/* {
                  mainRoutes.map(item=>
                    <Route key={item} path={item.path} component={item.component}></Route>
                  )
                } */}
              </Switch>
            </Content>
          </Layout>
          <Footer className="footer">
            <Bottom />
          </Footer>
          {/* 全局的请求加载效果 */}
          {
            this.props.isLoading ? <div className="isloading">Loading</div> : ''
          }
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.loginReducer.isLogin,
  isLoading: state.globalLoadingReducer.isLoading,
})

export default connect(mapStateToProps, null)(App)
