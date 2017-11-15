import React, {
  Component,
  PropTypes,
} from 'react';
import { Provider } from 'react-redux';
import Routes from '@modules/routes'

/**
 * Aqui instanciamos componentes que não são renderizados no DOM
 * Como os providers de tema e da store do redux
 * Finalmente, renderizamos nossas rotas
 */

export default class Root extends Component {
  static defaultProps = {}

  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  render() {
    const {
      store,
      history,
    } = this.props

    return (
      <Provider store={store}>
        <Routes
          history={history}
        />
      </Provider>
    );
  }

}
