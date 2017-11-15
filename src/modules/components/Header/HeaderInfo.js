import React, { PropTypes, Component } from 'react'
import styled from 'styled-components'
import fonts from '@fonts'

const Wrapper = styled.div`
  margin: 20px 0;
`
const Title = styled.p`
  color: white;
  font-size: ${fonts.medium};
  display: inline-block;
  margin: 0;
  line-height: 60px;
  float: left;
  cursor: default;
`
const LogoWrapper = styled.div`
  height: 60px;
  width: 150px;
  display: inline-block;
  margin: 0 20px;
  background-color: white;
  float: right;
  position: relative;
`

const StyledLogo = styled.img`
  max-height: 58px;
  max-width: 148px;
  display: block;
  margin: auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`

export default class HeaderMenu extends Component {
  static defaultProps = {}

  static propTypes = {}

  render() {
    const {
      name,
      logo,
    } = this.props
    return (
      <Wrapper>
        <Title>{name}</Title>
        <LogoWrapper>
          <StyledLogo src={logo} />
        </LogoWrapper>
      </Wrapper>
    )
  }
}
