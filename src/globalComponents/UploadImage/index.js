/* global document */
/* global Image */
import React, {
  Component,
  PropTypes,
} from 'react';
import Dropzone from 'react-dropzone'

import Upload from 'material-ui/svg-icons/file/file-upload'
import ReactCrop from 'react-image-crop'
import Button from '@globalComponents/DefaultButton.js'
import styles from '@globalComponents/UploadImage/styles'
import loadImage from 'blueimp-load-image'
import { reduceImageSize } from '@helpers/reduceImageSize'

class FileUpload extends Component {
  static defaultProps = {
    aspectRatio: undefined,
    minHeight: undefined,
    minWidth: undefined,
  }
  static propTypes = {
    paddingLeft: PropTypes.string,
    aspectRatio: PropTypes.number,
    minHeight: PropTypes.number,
    minWidth: PropTypes.number,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    const preview = null
    this.state = {
      idle: !preview,
      success: !!preview,
      error: false,
      finalized: false,
      crop: {
        width: 100,
        height: 100,
      },
      preview,
    };
    this._cropAfterLoad = this._cropAfterLoad.bind(this)
    this._handleConfirmUpload = this._handleConfirmUpload.bind(this)
    this._handleCancelCrop = this._handleCancelCrop.bind(this)
    this._handleChooseAnotherImage = this._handleChooseAnotherImage.bind(this)
  }

  _loadImage(src, callback) {
    let image = new Image();
    image.crossOrigin = 'none'
    image.src = this.state.preview;
    image.onload = () => {
      callback(image);
      image = null;
    };
  }

  _cropAfterLoad(loadedImg, crop) {
    if (crop.width === 0 || crop.height === 0) {
      return
    }
    const imageWidth = loadedImg.naturalWidth;
    const imageHeight = loadedImg.naturalHeight;
    const cropX = (crop.x / 100) * imageWidth;
    const cropY = (crop.y / 100) * imageHeight;
    const cropWidth = (crop.width / 100) * imageWidth;
    const cropHeight = (crop.height / 100) * imageHeight;
    const canvas = document.createElement('canvas');
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(loadedImg, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
    if (!canvas.toBlob) {
      this.setState({
        croppedPreviewBlob: canvas.msToBlob(),
        hasCropResultImage: true,
      })
    } else {
      canvas.toBlob((croppedPreviewBlob) => {
        this.setState({
          croppedPreviewBlob,
          hasCropResultImage: true,
        })
      })
    }
  }

  _handleConfirmUpload() {
    const {
      croppedPreviewBlob,
      file,
    } = this.state
    if (croppedPreviewBlob) this._uploadFile(croppedPreviewBlob)
    else this._uploadFile(file)
  }

  _handleCompleteCrop = (crop) => {
    this._loadImage(this.state.preview, loadedImage => this._cropAfterLoad(loadedImage, crop))
    crop.width = crop.width || 100
    this.setState({
      crop,
    })
  }

  _renderPreview() {
    const {
      preview,
      crop,
      isCroping,
    } = this.state
    const {
      aspectRatio,
      minHeight,
      minWidth,
    } = this.props

    if (!preview) return null

    return (
      <ReactCrop
        src={preview}
        disabled={!isCroping}
        minHeight={minHeight}
        minWidth={minWidth}
        onComplete={this._handleCompleteCrop}
        onImageLoaded={this._handleCompleteCrop}
        style={{
          backgroundColor: 'red',
        }}
        crop={{
          aspect: aspectRatio,
          ...crop,
        }}
      />
    )
  }

  _onFilesDrop = (files) => {
    const file = files[0]
    if (!file) {
      this.setState({ error: true })
    } else {
      loadImage.parseMetaData(file, (data) => {
        const orientation = data.exif && data.exif.get('Orientation');
        if (orientation) {
          loadImage(file.preview, (img) => {
            img.toBlob((blob) => {
              this.setState({
                idle: false,
                success: false,
                error: false,
                isCroping: true,
                preview: window.URL.createObjectURL(blob),
                fileType: file.type,
                file,
              })
            })
          },
          { orientation },
        )
        } else {
          this.setState({
            idle: false,
            success: false,
            error: false,
            isCroping: true,
            preview: file.preview,
            fileType: file.type,
            file,
          })
        }
      })
    }
  }

  _uploadFile(file) {
    const { fileType } = this.state
    reduceImageSize(file, fileType).then((reducedFile) => {
      this.setState({
        finalized: true,
        isCroping: false,
      })
      this.props.onSave(reducedFile)
    })
  }

  _renderUploadIcon() {
    const {
      idle,
    } = this.state

    if (!idle) return null

    return (
      <div style={styles.absoluteCenter}>
        <span>
          <Upload
            style={Object.assign({}, styles.icon, styles.uploadIcon)}
            color="#d3d3d3"
          />
        </span>
      </div>
    )
  }

  _resetState() {
    this.setState({
      idle: true,
      success: false,
      error: false,
      preview: null,
      finalized: false,
      croppedPreviewUrl: null,
      croppedPreviewBlob: null,
      crop: {
        width: 100,
        height: 100,
      },
      isCroping: false,
      hasCropResultImage: false,
    })
    this.props.onCancel()
  }

  _handleChooseAnotherImage() {
    this._resetState()
  }
  _handleCancelCrop() {
    this._resetState()
  }

  _getInstruction() {
    const {
      isCroping,
      success,
      error,
    } = this.state

    if (isCroping) {
      return {
        text: 'Selecione a área para fazer o recorte',
      }
    }
    if (success) {
      return {
        text: 'Pronto, sua imagem foi armazenada!',
      }
    }
    if (error) {
      return {
        text: 'Formato de imagem inválido, tente novamente',
      }
    }
    return {
      text: this.props.mainInstructionText || 'Clique ou arraste para selecionar uma imagem',
    }
  }

  render() {
    const {
      preview,
      hasCropResultImage,
      success,
      finalized,
    } = this.state
    const {
      paddingLeft,
      isMobile,
    } = this.props

    const instruction = this._getInstruction()

    if (paddingLeft) {
      styles.container.paddingLeft = paddingLeft
    }
    if (isMobile) {
      styles.container.width = '80%'
      styles.container.paddingLeft = '10%'
    }

    return (
      <div style={styles.container}>
        {
          !finalized &&
          <p style={styles.title}>{instruction.text}</p>
        }
        <Dropzone
          accept="image/jpeg,image/png"
          onDrop={this._onFilesDrop}
          disableClick={!!preview}
          style={styles.dropzone}
        >
          {this._renderPreview()}
          {this._renderUploadIcon()}
        </Dropzone>
        {
          !finalized && !hasCropResultImage &&
          <Button
            label="CANCELAR"
            onTouchTap={this._handleCancelCrop}
            secondary
          />
        }
        {
          (hasCropResultImage && !success) && !finalized &&
          <Button
            label="Cancelar"
            secondary
            labelStyle={styles.label}
            onTouchTap={this._handleCancelCrop}
          />
        }
        {
          (success || finalized || (preview && !hasCropResultImage)) &&
          <Button
            label="Escolher Outra imagem"
            secondary
            labelStyle={styles.label}
            onTouchTap={this._handleChooseAnotherImage}
          />
        }
        {
          (success || preview) && !finalized &&
          <Button
            label="Salvar"
            primary
            labelStyle={styles.label}
            onTouchTap={this._handleConfirmUpload}
          />
        }
      </div>
    );
  }
}

export default FileUpload
