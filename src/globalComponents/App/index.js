import React, {
  Component,
  PropTypes,
} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#1DAEEB',
  },
})
class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      children,
    } = this.props
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {children}
        </div>
      </MuiThemeProvider>
    );
  }
}
export default App
