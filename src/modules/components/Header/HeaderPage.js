import React, { PropTypes, Component } from 'react'
import Bars from 'react-icons/lib/fa/bars'
import styled from 'styled-components'
import colors from '@colors'
import HeaderInfo from './HeaderInfo'
import Menu from './Menu'

const Wrapper = styled.div`
  height: 100px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
  display: inline-block;
  background-color: ${colors.primaryDark};
`
const HeaderContainer = styled.div`
  height: 100px;
  width: ${props => props.width || null};
  float: ${props => props.float};
`
const CustomBars = styled(Bars)`
  margin: 35px 0 35px 20px;
  cursor: pointer;
  color: white;
`

export default class HeaderMenu extends Component {
  static defaultProps = {}

  static propTypes = {}

  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }

  toggleMenu() {
    this.setState({ showMenu: !this.state.showMenu })
  }

  onMenuClick(route) {
    this.toggleMenu()
    this.redirect(route)
  }

  redirect(r) {
    if (r) this.props.onMenuClick(r)
  }

  render() {
    const {
      changeClub,
      myClubs,
      activeClub,
      headerPlace,
      path,
    } = this.props
    const {
      showMenu,
    } = this.state
    return (
      <Wrapper>
        <HeaderContainer width={'50px'} float={'left'}>
          <CustomBars size={30} onClick={() => this.toggleMenu()} />
        </HeaderContainer>
        <HeaderContainer float={'right'}>
          <HeaderInfo
            name={(headerPlace && headerPlace.address) || null}
            logo={(headerPlace && headerPlace.imageUrl) || null}
          />
        </HeaderContainer>
        <Menu show={showMenu} path={path} onMenuClick={route => this.onMenuClick(route)} />
      </Wrapper>
    )
  }
}
