import React, { PropTypes, Component } from 'react'
import styled from 'styled-components'
import TextSubmitter from '@globalComponents/TextSubmitter'
import CommentBubble from '@modules/chat/components/ChatBubble'
import ChatView from 'react-chatview';
import fonts from 'fonts'

const StyledWrapper = styled.div`
  background-color: white;
  height: 640px;
`
const StyledChatView = styled(ChatView)`
  height: 490px;
  margin: 23px 0;
  padding: 0 50px 15px 50px;
`
const NoMessages = styled.p`
  font-style: italic;
  text-align: center;
  margin: 10px 0 50px 0;
`
const Title = styled.div`
  text-align: center;
  width: 100%;
  height: 40px;
  font-size: ${fonts.large}
`

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arraySize: 10,
    };
  }

  componentWillMount() {

  }

  getMoreMessages() {
    const { arraySize } = this.state
    const { comments } = this.props
    return new Promise((resolve, reject) => {
      if (comments.length > arraySize + 10) {
        this.setState({ arraySize: arraySize + 10 });
      } else {
        this.setState({ arraySize: comments.length });
      }
      resolve();
    });
  }

  checkMessage(message) {
    const messageCopy = message
    if (messageCopy.replace(/\s/g, '').length) {
      this.props.addMessage(message)
    }
  }

  render() {
    const {
      addMessageWithImage,
      comments,
      myId,
    } = this.props
    const {
      arraySize,
    } = this.state

    comments.sort((a, b) => a.date - b.date)
    const arrayStart = (comments.length - arraySize) >= 0 ? (comments.length - arraySize) : 0

    return (
      <StyledWrapper>
        <Title>Group</Title>
        <StyledChatView
          flipped
          scrollLoadThreshold={50}
          onInfiniteLoad={() => this.getMoreMessages()}
        >
          {
            comments && comments.slice(arrayStart, comments.length).map((comment) => {
              let thisUser
              if (comment.key === myId) {
                thisUser = true
              } else {
                thisUser = false
              }
              console.log(comment)
              return (
                <CommentBubble
                  thisUser={thisUser}
                  name={comment.name}
                  photo={comment.photoUrl}
                  message={comment.message ? comment.message : null}
                />
              )
            })
          }
          {
            comments.length === 0 &&
            <NoMessages>
              Para iniciar a conversa, escreva uma mensagem!
            </NoMessages>
          }
        </StyledChatView>
        <TextSubmitter
          onClickSubmit={message => this.checkMessage(message)}
          showImageUploader
          uploadImage={files => addMessageWithImage(files)}
          websiteType={websiteType}
        />
      </StyledWrapper>
    )
  }
}
