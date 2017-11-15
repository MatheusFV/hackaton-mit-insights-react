import React, {
  Component,
  PropTypes,
} from 'react';
import styled from 'styled-components'
import fonts from '@fonts'
import colors from '@colors'

const Title = styled.p`
  font-size: ${fonts.extraLarge};
  color: ${colors.primaryDark}
`

class HomePage extends Component {
  componentWillMount() {
    console.log('Inicializei meu componente: ', this.props)
  }

  componentWillReceiveProps(nextProps) {
    console.log('Recebi props: ', nextProps)
  }

  render() {
    const {
      isMobile,
    } = this.props

    console.log('Render: ', this.props)

    return (
      <div>
        <Title>Olá Mundo!</Title>
      </div>
    )
  }
}

HomePage.propTypes = {
  myProps: PropTypes.string,
  setMyNewState: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

HomePage.defaultProps = {
  myProps: 'O estado não está definido',
}

export default (HomePage)
