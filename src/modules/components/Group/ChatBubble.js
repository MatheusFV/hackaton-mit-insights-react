import React, { PropTypes, Component } from 'react'
import colors from '@consts/colors'
import fonts from '@consts/fonts'
import Clock from 'react-icons/lib/fa/clock-o'
import styled from 'styled-components'
import Lightbox from 'react-images';
import CircularProgress from 'material-ui/CircularProgress';
import { getAvatar } from '@helpers/checkStaff'

const ChatComment = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 10px 15px 10px;
  float: ${props => props.thisUser ? 'right' : 'left'};
`
const Avatar = styled.img`
  width: 36px;
  height: 36px;
  margin-top: 16px;
  border-radius: 50%;
`
const ChatBubble = styled.div`
  padding: ${props => props.type === 'image' ? '1px 0 5px 0' : '20px 25px'};
  border-radius: 5px;
  position: relative;
  min-width: 130px;
`
const MyChatBubble = styled(ChatBubble)`
  margin-right: 15px;
  margin-left: ${props => props.type === 'image' ? '100px' : '40px'};
  background: ${props => props.role === 'patient' ? colors.mainBlue : colors.mainYellow};
  &::after {
    left: 100%;
    border: solid transparent;
    border-left-color: ${props => props.role === 'patient' ? colors.mainBlue : colors.mainYellow};
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
  margin-right: ${props => props.type === 'image' ? '100px' : 0}
  background: ${props => props.role === 'patient' ? colors.mainBlue : colors.mainYellow};
  &::before {
    right: 100%;
    border: solid transparent;
    border-right-color: ${props => props.role === 'patient' ? colors.mainBlue : colors.mainYellow};
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: 10px;
    top: 10px;
  }
`
const MyTime = styled.time`
  font-size: ${fonts.chatDate};
  margin: ${props => props.type === 'image' ? '5px 5px 0 100px' : '5px 5px 0 45px'};
  float: left;
  color: ${props => props.role === 'patient' ? colors.darkerBlue : colors.teamChatTitle};
`
const OtherTime = styled.time`
  font-size: ${fonts.chatDate};
  margin: ${props => props.type === 'image' ? '5px 5px 0 25px' : '5px 5px 0 100px'};
  float: ${props => props.type === 'image' ? 'left' : 'right'};
  color: ${props => props.role === 'patient' ? colors.darkerBlue : colors.teamChatTitle};
`
const Message = styled.p`
  font-size: ${fonts.extraSmall};
  line-height: 1.3em;
  color: white;
  max-width: 375px;
  overflow: hidden;
`
const Image = styled.div`
  background-color: white;
  width: 120px;
  height: 120px;
  margin: 5px auto 0 auto;
  overflow: hidden;
  cursor: pointer;
  border-radius: 5px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const SpinnerWrapper = styled.div`
  width: 70px;
  height: 70px;
  background-color: transparent;
  margin: 5px auto 0 auto;
`

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
    };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
  }

  static propTypes = {
    thisUser: PropTypes.bool,
    time: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.string,
    image: PropTypes.string,
    spinner: PropTypes.bool,
  };

  openLightbox() {
    this.setState({
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      lightboxIsOpen: false,
    });
  }

  render() {
    const {
      thisUser,
      time,
      name,
      type,
      role,
      message,
      image,
      spinner,
    } = this.props
    const {
      lightboxIsOpen,
    } = this.state

    const avatar = getAvatar(role)

    return (
      <ChatComment thisUser={thisUser}>
        {
          thisUser &&
          <div>
            <MyChatBubble role={role} type={type}>
              {
                type === 'text' &&
                <Message>
                  {message}
                </Message>
              }
              {
                type === 'image' &&
                <Image onTouchTap={() => this.openLightbox()} >
                  <img src={image} />
                </Image>
              }
              {
                spinner &&
                <SpinnerWrapper>
                  <CircularProgress color={'white'} size={70} thickness={6} />
                </SpinnerWrapper>
              }
            </MyChatBubble>
            <MyTime role={role} type={type} thisUser>
              <Clock style={{ top: '-1px', position: 'relative', marginRight: '2px' }} />
              {time}
            </MyTime>
          </div>
        }
        {
          !thisUser &&
          <Avatar src={avatar} />
        }
        {
          !thisUser &&
          <div>
            <OtherChatBubble role={role} type={type}>
              {
                type === 'text' &&
                <Message>
                  {message}
                </Message>
              }
              {
                type === 'image' &&
                <Image onTouchTap={() => this.openLightbox()} >
                  <img src={image} />
                </Image>
              }
            </OtherChatBubble>
            <OtherTime type={type} role={role}>
              <Clock style={{ top: '-1px', position: 'relative', marginRight: '2px' }} />
              {time}
            </OtherTime>
          </div>
        }
        {
          image &&
          <Lightbox
            currentImage={0}
            images={[{ key: 0, src: image }]}
            isOpen={lightboxIsOpen}
            onClose={this.closeLightbox}
          />
        }
      </ChatComment>
    )
  }
}
