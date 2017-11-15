import React, { Component, PropTypes } from 'react';
import styled from 'styled-components'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
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
    return (
      <div>
        <Title>Perfil</Title>
        <ImageWrapper />
        <Item>Endereço: { place && place.address }</Item>
        <Item>Preço: { place && place.price }</Item>
        <Item>Vagas: { place && place.slots }</Item>
        <Item>Filtros: { tags }</Item>
        <Divider />
        <Subtitle>Membros</Subtitle>
        {
          relations && relations.map(item => (
            <div>
              <ListItem
                style={{ padding: '10px 0' }}
                leftAvatar={<Avatar src={item.photoUrl} />}
                primaryText={item.name}
              />
              <ButtonWrapper>
                <Button
                  label={this.getText(item.status)}
                  onClick={() => switchStatus(item.status, item.key, activePlace)}
                />
              </ButtonWrapper>
              <Divider />
            </div>
          ))
        }
      </div>
    )
  }
}

export default (EventDetailPage)
