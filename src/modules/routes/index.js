import React, {
  PropTypes,
} from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { ConnectedRouter } from 'react-router-redux'

// PAGINAS A SEREM RENDERIZADAS
// favor manter em ordem alfabetica
import App from '@globalComponents/App';
import AlertDialog from '@containers/AlertDialog'
import CentralContainer from '@globalComponents/CentralContainer'
import Home from '@containers/Home'
import HeaderMenu from '@containers/Header'
import SignIn from '@containers/SignIn'
import SignUp from '@containers/SignUp'
import MyPlaces from '@containers/MyPlaces'
import NewPlace from '@containers/NewPlace'
import Profile from '@containers/Profile'
// import Group from '@containers/Group'

// // Funções para validar o acesso de rotas caso o usuário esta logado/deslogado
// const userIsAuthenticated = connectedRouterRedirect({
//   redirectPath: '/convidado/inicio',
//   authenticatedSelector: state => state.auth.get('logged'),
//   wrapperDisplayName: 'UserIsAuthenticated',
// })
// const userIsNotAuthenticated = connectedRouterRedirect({
//   redirectPath: (state, ownProps) => '/home',
//   allowRedirectBack: false,
//   authenticatedSelector: state => !state.auth.get('logged'),
//   wrapperDisplayName: 'UserIsNotAuthenticated',
// })

const RedirectToStart = () => (
  <Redirect to="/convidado/inicio" />
)

// Grupo de rotas autenticadas
const AuthenticatedRoutes = () => (
  <div>
    <HeaderMenu />
    <AlertDialog />
    <CentralContainer>
      <Route path="/home" exact component={Home} />
      <Route path="/my-places" exact component={MyPlaces} />
      <Route path="/new-place" exact component={NewPlace} />
      <Route path="/perfil" exact component={Profile} />
      {/* <Route path="/group" exact component={Group} /> */}
    </CentralContainer>
  </div>
)

// Grupo de rotas não autenticadas
const UnauthenticatedRoutes = () => (
  <CentralContainer>
    <Route path={'/convidado/inicio'} component={SignIn} />
    <Route path={'/convidado/cadastro'} component={SignUp} />
  </CentralContainer>
)

export default class Routes extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }
  render() {
    const {
      history,
    } = this.props
    return (
      <ConnectedRouter history={history}>
        <RouteNest path="/" component={App}>
          <Route path="/" exact component={RedirectToStart} />
          <Switch>
            <Route path="/convidado" component={UnauthenticatedRoutes} />
            <Route path="/" component={AuthenticatedRoutes} />
          </Switch>
        </RouteNest>
      </ConnectedRouter>
    )
  }
}

const RouteNest = props => (
  <Route
    exact={props.exact}
    path={props.path}
    render={p => <props.component {...p} children={props.children} />}
  />
)
