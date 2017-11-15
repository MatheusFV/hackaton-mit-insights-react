import React, { PropTypes, Component } from 'react'
import styled from 'styled-components'
import TextSubmitter from '@components/TextSubmitter'
import CommentBubble from '@modules/chat/components/ChatBubble'
import ListItem from '@components/ListItem'
import ChatView from 'react-chatview';
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { formatDate } from '@helpers/dateFormatter.js';

const StyledWrapper = styled.div`
  background-color: white;
  height: 640px;
`
const StyledHeader = styled.div`
  padding: ${props => props.websiteType === 'patients' ? '0 50px' : 0};
`
const StyledChatView = styled(ChatView)`
  height: 490px;
  margin: 23px 0;
  padding: ${props => props.websiteType === 'patients' ? '0 50px 15px 50px' : 0};
`
const NoMessages = styled.p`
  font-style: italic;
  text-align: center;
  margin: 10px 0 50px 0;
`
const customContentStyle = {
  width: '30%',
  minWidth: '220px',
}

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    let showIsBlocked = false
    if (!props.afterSurgeryEnabled) {
      showIsBlocked = true
    }
    this.state = {
      arraySize: 10,
      detailedDescription: [],
      showIsBlocked,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.afterSurgeryEnabled && this.props.afterSurgeryEnabled) {
      this.setState({ showIsBlocked: true })
    }
  }//

  componentWillMount() {
    const { team, chatName, patient, websiteType, clearNotification, goToChat } = this.props
    if (!websiteType || !chatName) {
      goToChat()
    } else if ((websiteType === 'patients' && !team) || (websiteType === 'staff' && !patient)) {
      goToChat()
    }
    clearNotification()
    if (websiteType === 'patients') {
      this.setState({ detailedDescription: [team.teamName, team.institutionName, chatName] })
    } else {
      this.setState({ detailedDescription: [patient.name, chatName] })
    }
  }

  componentWillUnmount() {
    this.props.clearNotification()
  }

  static propTypes = {
    addMessage: PropTypes.func.isRequired,
    addMessageWithImage: PropTypes.func.isRequired,
    clearNotification: PropTypes.func.isRequired,
    goToChat: PropTypes.func.isRequired,
    comments: PropTypes.array,
    chatName: PropTypes.string.isRequired,
    team: PropTypes.object,
    patient: PropTypes.object,
    websiteType: PropTypes.string.isRequired,
    uploadStatus: PropTypes.object.isRequired,
    afterSurgeryEnabled: PropTypes.bool.isRequired,
  };

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
      websiteType,
      uploadStatus,
      goToChat,
      afterSurgeryEnabled,
      chatName,
    } = this.props
    const {
      arraySize,
      detailedDescription,
      showIsBlocked,
    } = this.state

    comments.sort((a, b) => a.date - b.date)
    const arrayStart = (comments.length - arraySize) >= 0 ? (comments.length - arraySize) : 0

    const actions = [
      <FlatButton
        label="Ok"
        secondary
        onTouchTap={() => this.setState({ showIsBlocked: false })}
      />,
    ]
    return (
      <StyledWrapper>
        <StyledHeader websiteType={websiteType}>
          <ListItem
            borderBottom
            smallerVerticalPadding
            detailedDescription={detailedDescription}
          />
        </StyledHeader>
        <StyledChatView
          websiteType={websiteType}
          flipped
          scrollLoadThreshold={50}
          onInfiniteLoad={() => this.getMoreMessages()}
        >
          {
            uploadStatus.uploading &&
            <CommentBubble
              thisUser
              name={uploadStatus.name}
              role={uploadStatus.role}
              time={formatDate((new Date()).getTime())}
              spinner
            />
          }
          {
            comments && comments.slice(arrayStart, comments.length).map((comment) => {
              let thisUser
              if (websiteType === 'patients') {
                if (comment.authorRole === 'patient') {
                  thisUser = true
                } else {
                  thisUser = false
                }
              } else if (comment.authorRole !== 'patient') {
                thisUser = true
              } else {
                thisUser = false
              }
              return (
                <CommentBubble
                  thisUser={thisUser}
                  name={comment.authorName}
                  role={comment.authorRole}
                  type={comment.type}
                  time={formatDate(comment.date)}
                  message={comment.message ? comment.message : null}
                  image={comment.photoUrl ? comment.photoUrl : null}
                />
              )
            })
          }
          {
            comments.length === 0 && !uploadStatus.uploading &&
            <NoMessages>
              Para iniciar a conversa, escreva uma mensagem!
            </NoMessages>
          }
        </StyledChatView>
        {((afterSurgeryEnabled && chatName === 'Pós operatório') || chatName !== 'Pós operatório') && <div style={{ position: 'relative', top: '-20px' }}>
          <TextSubmitter
            onClickSubmit={message => this.checkMessage(message)}
            showImageUploader
            uploadImage={files => addMessageWithImage(files)}
            websiteType={websiteType}
          />
        </div>}
        {websiteType === 'patients' && chatName === 'Pós operatório' && <Dialog
          title="A equipe bloqueou a conversa Pós operatório"
          contentStyle={customContentStyle}
          actions={actions}
          open={showIsBlocked}
          onRequestClose={() => this.setState({ showIsBlocked: false })}
        />}
      </StyledWrapper>
    )
  }
}
