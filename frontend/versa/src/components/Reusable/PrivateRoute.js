import { Route } from "react-router";
import Cookies from 'universal-cookie'
const cookies = new Cookies()
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      cookies.get('token')
        ? <Component {...props} />
        : window.location = '/account'
    )} />
)
  
