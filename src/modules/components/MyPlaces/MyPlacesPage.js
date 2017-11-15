import React, { Component, PropTypes } from 'react';
import styled from 'styled-components'
import Button from '@globalComponents/DefaultButton'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`
const PostsWrapper = styled.div`
  margin-top: 20px;
`
const ButtonWrapper = styled.div`
  margin: 0 80px;
`
const Divider = styled.div`
  bottom: 0px;
  background-color: black;
  height: 1px;
`

class MyPlacesPage extends Component {
  render() {
    const {
      owners,
      uid,
      goToNewPlace,
      setPlace,
    } = this.props
    const filteredOwner = owners && owners.filter(owner => owner.key === uid)[0]
    const array = []
    for (const i in filteredOwner) {
      if (i !== 'key') {
        filteredOwner[i].key = i
        array.push(filteredOwner[i])
      }
    }
    return (
      <Wrapper>
        <ButtonWrapper>
          <Button label="Criar Place" onClick={() => goToNewPlace()} />
        </ButtonWrapper>
        <PostsWrapper>
          {
            array && array.map(item => (
              <div>
                <ListItem
                  onClick={() => setPlace(item.key)}
                  style={{ padding: '10px 0' }}
                  leftAvatar={<Avatar src={item.imageUrl} />}
                  primaryText={item.address}
                  secondaryText={item.price}
                />
                <Divider />
              </div>
              ))
          }
        </PostsWrapper>
      </Wrapper>
    )
  }
}

export default (MyPlacesPage)
