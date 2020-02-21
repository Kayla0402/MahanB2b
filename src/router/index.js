/*
* 当打包构建项目时，js包会变得非常大，影响页面加载，
* 如果我们能把不同的路由对应的组件分割成不同的代码块，然后当路由被访问时才加载对应的组件，更高效
* 1.安装@babel/plugin-syntax-dynamic-import
* 2.babel.config.js中配置该插件
* 3.更改路由的按需加载
* webpackChunkName相同名称的会打包到一起
* 最终build的时候可以看到app.js和chuck.js会变小
* */
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Goods from '../components/goods/Goods'

const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/login/Login')
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Home')
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Welcome')

const Register = () => import(/* webpackChunkName: "register_tips" */ '../components/login/Register')
const RegisterTips = () => import(/* webpackChunkName: "register_tips" */ '../components/login/RegisterTips')
const ResetPass = () => import(/* webpackChunkName: "register_tips" */ '../components/login/ResetPass')

const Users = () => import(/* webpackChunkName: "rights_users" */ '../components/users/Users')
const Rights = () => import(/* webpackChunkName: "rights_users" */ '../components/rights/Rights')
const Roles = () => import(/* webpackChunkName: "rights_users" */ '../components/roles/Roles')

const Categories = () => import(/* webpackChunkName: "categoriese_params" */ '../components/categories/Categories')
// const Params = () => import(/* webpackChunkName: "categoriese_params" */ '../components/params/Params')

const Add = () => import(/* webpackChunkName: "add_goods" */ '../components/goods/Add')
const Goods = () => import(/* webpackChunkName: "add_goods" */ '../components/goods/Goods')

const Demo = () => import(/* webpackChunkName: "add_goods" */ '../components/Demo')
const Search = () => import(/* webpackChunkName: "order" */ '../components/order/Search')
const Reschedule = () => import(/* webpackChunkName: "order" */ '../components/order/Reschedule')
const Refund = () => import(/* webpackChunkName: "order" */ '../components/order/Refund')
const OrderList = () => import(/* webpackChunkName: "order" */ '../components/order/OrderList')

Vue.use(VueRouter)
const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login', component: Login
  },
  {
    path: '/register', component: Register
  },
  {
    path: '/register/tips', component: RegisterTips
  },
  {
    path: '/resetPass', component: ResetPass
  },
  {
    path: '/demo', component: Demo
  },
  // 如果是home路由的话会首先重定向到welcome路由，且Welcome组件去取代Home组件中的路由占位符
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/welcome', component: Welcome },
      { path: '/roles', component: Roles },
      { path: '/rights', component: Rights },
      { path: '/goods', component: Goods },
      { path: '/goods/add', component: Add },
      { path: '/categories', component: Categories },
      { path: '/order/search', component: Search },
      { path: '/order/reschedule', component: Reschedule },
      { path: '/order/refund', component: Refund },
      { path: '/order/orderList', component: OrderList }
    ]
  }

]

const router = new VueRouter({
  routes
})
/*
* 需要用导航守卫监测有没有登录，如果已经登录了则直接放行，否则就跳转至登录页面
* */
router.beforeEach((to, from, next) => {
  /*
  * to 将要访问的路径
  * from 代表从哪个路径跳转而来
  * next 是一个函数，表示放行
  * next() 放行 next('/login')强制跳转至login路由
  * */
  if (to.path === '/login') return next()
  if (to.path === '/register') return next()
  if (to.path === '/register/tips') return next()
  if (to.path === '/resetPass') return next()
  if (to.path === '/demo') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
