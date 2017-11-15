import React, { PropTypes } from 'react'
import styled from 'styled-components'
import {
  TextField,
} from 'redux-form-material-ui'
import Dropzone from 'react-dropzone'
import Camera from 'react-icons/lib/fa/camera'
import colors from '@consts/colors'
import enviar from '@images/enviar.png';

const StyledTextField = styled(TextField)`
  margin: 5px 0;
`
const StyledDropzone = styled.div`
  width: 40px;
  height: 40px;
  display: inline-flex;
  flex-direction: column;
  margin: 7px 0;
  cursor: pointer;
  position: relative;
  left: -44px;
`
const Wrapper = styled.div`
  position: relative;
  width: 100%;
`
const StyledBox = styled.div`
  float: left;
  display: inline-block;
  width: calc(100% - 40px);
`
const SendContainer = styled.div`
  float: right;
  display: inline-block;
  position: absolute;
  right: 0;
  width: 44px;
  height: 44px;
  margin-top: 5px;
  background-color: ${props => props.websiteType === 'patients' ? colors.mainRed : colors.mainBlue};
  cursor: pointer;
`
const SendImage = styled.img`
  width: 60%;
  height: 60%;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const dropzoneStyle = {
  minHeight: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

class TextSubmitter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: '',
    }
    this.changeCommentText = this.changeCommentText.bind(this);
    this.deleteText = this.deleteText.bind(this);
  }

  changeCommentText(e) {
    this.setState({ commentText: e.target.value })
  }

  deleteText() {
    this.setState({ commentText: '' })
  }

  render() {
    const {
      onTextChange,
      onClickSubmit,
      showImageUploader,
      uploadImage,
      websiteType,
    } = this.props

    const hintStyle = {
      color: colors.mainBlue,
      bottom: '9px',
    }
    const style = {
      backgroundColor: 'white',
      borderRight: 0,
      paddingLeft: 10,
      width: 'calc(100% - 14px)',
      lineHeight: '20px',
      display: 'inline-block',
    }
    if (websiteType === 'patients') {
      style.height = '44px'
    } else {
      style.border = '2px solid'
      style.borderColor = `${colors.mainBlue}`
      style.height = '40px'
    }

    return (
      <Wrapper>
        <StyledBox>
          <StyledTextField
            name="commentText"
            hintText="Escreva aqui"
            hintStyle={hintStyle}
            inputStyle={{ width: 'calc(100% - 40px)' }}
            underlineStyle={{ display: 'none' }}
            style={style}
            onChange={this.changeCommentText}
            value={this.state.commentText}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                onClickSubmit(this.state.commentText)
                this.deleteText()
                ev.preventDefault();
              }
            }}
          />
        </StyledBox>
        {
          showImageUploader &&
          <StyledDropzone>
            <Dropzone
              accept="image/jpeg,image/png,image/gif"
              onDrop={files => uploadImage(files)}
              style={dropzoneStyle}
            >
              <Camera size={20} />
            </Dropzone>
          </StyledDropzone>
        }
        <SendContainer
          websiteType={websiteType}
          onClick={() => {
            onClickSubmit(this.state.commentText)
            this.deleteText()
          }
          }
        >
          <SendImage
            src={enviar}
          />
        </SendContainer>
      </Wrapper>
    )
  }
}

export default (TextSubmitter)
