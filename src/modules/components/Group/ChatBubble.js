import React, { PropTypes, Component } from 'react'
import colors from '@consts/colors'
import fonts from '@consts/fonts'
import styled from 'styled-components'

const ChatComment = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 10px 15px 10px;
  float: ${props => props.thisUser ? 'right' : 'left'};
`
const Avatar = styled.img`
  width: 36px;
  height: 36px;
  margin-top: 5px;
  border-radius: 50%;
`
const ChatBubble = styled.div`
  padding: 15px 20px;
  border-radius: 5px;
  position: relative;
  min-width: 130px;
`
const MyChatBubble = styled(ChatBubble)`
  margin-right: 15px;
  margin-left: 40px;
  background: ${props => props.thisUser ? colors.primaryLight : colors.primaryDark};
  &::after {
    left: 100%;
    border: solid transparent;
    border-left-color: ${props => props.thisUser ? colors.primaryLight : colors.primaryDark};
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: 10px;
    top: 10px;
  }
`
const OtherChatBubble = styled(ChatBubble)`
  margin-left: 15px;
  margin-right: 0;
  background: ${props => props.thisUser ? colors.primaryLight : colors.primaryDark};
  &::before {
    right: 100%;
    border: solid transparent;
    border-right-color: ${props => props.thisUser ? colors.primaryLight : colors.primaryDark};
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: 10px;
    top: 10px;
  }
`
const Message = styled.p`
  font-size: ${fonts.extraSmall};
  line-height: 1.3em;
  color: white;
  max-width: 375px;
  overflow: hidden;
`
const Name = styled.p`
  font-size: 1rem;
  line-height: 1.3em;
  color: black;
  max-width: 375px;
  overflow: hidden;
`

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static propTypes = {
    thisUser: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
  };

  render() {
    const {
      thisUser,
      name,
      photo,
      message,
    } = this.props

    return (
      <ChatComment thisUser={thisUser}>
        {
          thisUser &&
          <div>
            <MyChatBubble thisUser={thisUser}>
              <Name>
                {name}
              </Name>
              <Message>
                {message}
              </Message>
            </MyChatBubble>
          </div>
        }
        <Avatar src={photo} />
        {
          !thisUser &&
          <div>
            <OtherChatBubble thisUser={thisUser}>
              <Name>
                {name}
              </Name>
              <Message>
                {message}
              </Message>
            </OtherChatBubble>
          </div>
        }
      </ChatComment>
    )
  }
}
