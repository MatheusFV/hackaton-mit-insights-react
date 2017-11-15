import React, {
  Component,
  PropTypes,
} from 'react';
import styled from 'styled-components'
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import UploadImage from '@globalComponents/UploadImage'
import EditableBanner from '@globalComponents/EditableBanner'
import Button from '@globalComponents/DefaultButton'
import LoadingOverlay from '@globalComponents/LoadingOverlay'
import { normalizeCurrency } from '@helpers/normalizers'
import fonts from '@fonts'
import styles from '@consts/styles'

const Title = styled.div`
  text-align: center;
  width: 100%;
  height: 40px;
  font-size: ${fonts.large}
`
const ImageWrapper = styled.div`
  width: 80%;
  margin: auto;
`

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonName: 'Criar',
      values: [],
      isEditing: true,
    }
  }

  static propTypes = {
    login: PropTypes.func.isRequired,
  };

  handleChange = (event, index, values) => this.setState({ values });

  menuItems(values) {
    return names.map(name => (
      <MenuItem
        key={name}
        insetChildren
        checked={values && values.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
      ));
  }

  render() {
    const {
      createPlace,
      handleSubmit,
      authLoading,
    } = this.props
    const {
      buttonName,
      values,
      isEditing,
      imageURL,
      image,
    } = this.state

    const finishCropping = (reducedImage) => {
      this.setState({
        image: reducedImage,
        imageURL: window.URL.createObjectURL(reducedImage),
        isEditing: false,
      })
    }

    const removeImage = () => {
      this.setState({ image: null, isEditing: false })
    }

    return (
      <div>
        { authLoading && <LoadingOverlay /> }
        <Title>Criar spot</Title>
        <ImageWrapper>
          {isEditing ? <UploadImage
            onSave={reducedFile => finishCropping(reducedFile)}
            onCancel={() => removeImage()}
            aspectRatio={1}
          /> :
          <EditableBanner
            currentBanner={imageURL}
            onClickEdit={() => this.setState({ isEditing: true })}
          />
        }
        </ImageWrapper>

        <form onSubmit={handleSubmit(formValues => createPlace(formValues, values, image || null))}>
          <Field
            name="address"
            style={styles.inputField}
            component={TextField}
            floatingLabelText="Endereço"
          />
          <Field
            name="price"
            style={styles.inputField}
            component={TextField}
            normalize={normalizeCurrency}
            floatingLabelText="Preço"
            hintText="0.00"
          />
          <Field
            name="slots"
            style={styles.inputField}
            component={TextField}
            floatingLabelText="Vagas"
          />
          <SelectField
            multiple
            hintText="Selecione os filtros"
            value={values}
            style={{ width: '100%', marginTop: '20px' }}
            onChange={this.handleChange}
          >
            {this.menuItems(values)}
          </SelectField>
          <Button label={buttonName} />
        </form>
      </div>
    )
  }
}

export default (LoginPage)
