import React, {
  Component,
  PropTypes,
} from 'react';
import MDSpinner from 'react-md-spinner'
import styled from 'styled-components'

const LoadingContainer = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 999998;
  background-color: rgba(${props => props.whiteBackground ? '255, 255, 255, 1' : `0, 0, 0, ${props.opacity}`});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`
const Text = styled.h3`
  font-weight: 100px
`

export default class LoadingOverlay extends Component {
  static defaultProps = {
    opacity: '',
    whiteBackground: false,
  }

  static propTypes = {
    opacity: PropTypes.string,
    whiteBackground: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      opacity,
      whiteBackground,
    } = this.props

    return (
      <LoadingContainer opacity={opacity || null} whiteBackground={whiteBackground}>
        <Loading>
          <MDSpinner
            singleColor="rgb(86, 196, 206)"
            size={68}
          />
        </Loading>
        <Text>Carregando...</Text>
      </LoadingContainer>
    );
  }

}
