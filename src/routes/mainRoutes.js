import GoodsList from '../components/GoodsList'
import Login from '../components/Login'
import ShopCar from '../components/ShopCar'

const mainRoutes = [
  {
    path: '/option1',
    component: GoodsList,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/option3',
    component: ShopCar,
  },
]

export default mainRoutes
