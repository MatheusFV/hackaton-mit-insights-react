import React, { PropTypes, Component } from 'react'
import { ListItem } from 'material-ui/List';
import styled from 'styled-components'
import colors from '@colors'

const Wrapper = styled.div`
  height: 100%;
  position: fixed;
  z-index: 10;
  top: 100px;
  left: 0px;
  width: 0px;
  overflow-x: hidden;
  background-color: white;
  -webkit-transition: all 0.28s ease-out;
  -moz-transition:  all 0.28s ease-out;
  -o-transition: all 0.28s ease-out;
  transition:  all 0.28s ease-out;
  will-change: transform;
`
const EmptyScreen = styled.div`
  height: 100%;
  width: 100%;
  z-index: 9;
  top: 100px;
  left: 0;
  position: fixed;
`

const MenuAnimation = {
  width: '210px',
}
const ListItemStyle = {
  height: '40px',
  lineHeight: '40px',
  paddingLeft: '40px',
}
const ItemSelected = {
  color: 'white',
  backgroundColor: colors.primaryLight,
}

const MenuOptions = [
  { label: "Meus 'places'", route: '/my-places' },
  { label: 'Perfil', route: '/perfil' },
  { label: 'Grupo', route: '/group' },
  { label: 'Notificações', route: '/notifs' },
  { label: 'Configurações', route: '/config' },
]

export default class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'Perfil',
    };
  }

  static defaultProps = {}

  getSelectedMenuTab(path) {
    // caso mais alguma rota deva pintar o menuItem de index 1 como selecionado, basta
    // adicionar no array abaixo
    const index1 = ['/my-places', '/new-place']
    const index2 = ['/profile']
    const index3 = ['/group']
    const index4 = ['/notifs']
    const index5 = ['/config']

    if (path[0] !== '/') path = `/${path}`
    if (index1.indexOf(path) !== -1) return 0
    if (index2.indexOf(path) !== -1) return 1
    if (index3.indexOf(path) !== -1) return 2
    if (index4.indexOf(path) !== -1) return 3
    if (index5.indexOf(path) !== -1) return 4
  }

  onMenuClick(item) {
    this.props.onMenuClick(item.route)
  }

  render() {
    const {
      show,
      path,
    } = this.props
    const selected = this.getSelectedMenuTab(path)
    return (
      <div>
        <Wrapper style={show ? MenuAnimation : null}>
          { MenuOptions.map((item, index) => (
            <ListItem
              primaryText={item.label}
              style={selected === index ? ItemSelected : null}
              innerDivStyle={ListItemStyle}
              onClick={() => this.onMenuClick(item)}
            />
          ))}
        </Wrapper>
        { show ? <EmptyScreen onClick={() => this.props.onMenuClick()} /> : null}
      </div>
    )
  }
}
