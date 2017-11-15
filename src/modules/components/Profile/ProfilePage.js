import React, { Component, PropTypes } from 'react';
import styled from 'styled-components'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import Button from '@globalComponents/DefaultButton'
import fonts from '@fonts'

const ImageWrapper = styled.div`
  width: 80%;
  margin: auto;
`
const Item = styled.div`
  width: 100%;
  text-align: left;
  margin: 8px 0;
  font-size: ${fonts.medium}
`
const Divider = styled.div`
  bottom: 0px;
  background-color: black;
  height: 1px;
`
const Title = styled.div`
  text-align: center;
  width: 100%;
  height: 40px;
  padding-top: 20px;
  font-size: ${fonts.large}
`
const Subtitle = styled.div`
  text-align: center;
  width: 100%;
  height: 40px;
  margin-top: 20px;
  font-size: ${fonts.medium}
`
const ButtonWrapper = styled.div`
  width: 40%;
  display: inline-block;
  float: right;
  position: relative;
  top: -72px;
`

class EventDetailPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirm: false,
    }
  }

  componentWillMount() {
    if (!this.props.activePlace) {
      this.props.returnToPlaces()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.activePlace) {
      this.props.returnToPlaces()
    }
  }

  getText(status) {
    if (status === 'pending') {
      return 'Aprovar usuário'
    } else if (status === 'interested') {
      return 'Confirmar usuário'
    } else if (status === 'confirmed') {
      return 'Remover usuário'
    }
  }

  switchStatus(status, userId, placeId) {
    if (status === 'pending') {
      this.setState({ status, userId, placeId, confirm: true })
    } else {
      this.props.switchStatus(status, userId, placeId)
    }
  }

  newStatus() {
    const { status, userId, placeId } = this.state
    this.setState({ confirm: false })
    this.props.switchStatus(status, userId, placeId)
  }

  render() {
    const {
      place,
      relations,
      switchStatus,
      activePlace,
    } = this.props

    let tags = ''
    if (place) {
      for (const i in place.tags) {
        tags += place.tags[i]
        if (i != (place.tags.length - 1)) {
          tags += ', '
        }
      }
    }

    const actions = [
      <FlatButton
        label="Ok"
        primary
        onTouchTap={() => this.newStatus()}
      />,
    ]

    return (
      <div>
        <Title>Perfil</Title>
        <ImageWrapper />
        <Item>Endereço: { place && place.address }</Item>
        <Item>Preço: { place && place.price }</Item>
        <Item>Vagas: { place && place.slots }</Item>
        <Item>Não é permitido: { tags }</Item>
        <Divider />
        <Subtitle>Membros</Subtitle>
        {
          relations && relations.map(item => (
            <div>
              { item.status !== 'kicked' &&
                <div>
                  <ListItem
                    style={{ padding: '10px 0' }}
                    leftAvatar={<Avatar src={item.photoUrl} />}
                    primaryText={item.name}
                  />
                  <ButtonWrapper>
                    <Button
                      label={this.getText(item.status)}
                      onClick={() => this.switchStatus(item.status, item.key, activePlace)}
                    />
                  </ButtonWrapper>
                  <Divider />
                </div>
              }
            </div>
          ))
        }
        <Dialog
          title={'Cuidado'}
          actions={actions}
          open={this.state.confirm}
          contentStyle={{ width: '400px' }}
          onRequestClose={() => this.newStatus()}
        >
          Você tem certeza que deseja aceitar esse usuário? Será necessário pagar uma taxa de R$2,99
        </Dialog>
      </div>
    )
  }
}

export default (EventDetailPage)
