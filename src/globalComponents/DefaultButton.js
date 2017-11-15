import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import colors from '@colors'
import fonts from '@fonts'

const DefaultButton = ({
  secondary,
  disabled,
  label,
  buttonHeight,
  margin,
  padding,
  onClick,
  onTouchTap,
}) => {
  let disabledColor = colors.primaryLightDisabled
  let backgroundColor = colors.primaryLight
  if (secondary) {
    backgroundColor = colors.primaryDark
    disabledColor = colors.primaryDarkDisabled
  }

  const style = {
    style: {
      width: '100%',
      marginTop: '10px',
      color: 'white',
      fontWeight: 'bold',
      marginBottom: '10px',
      borderRadius: 10,
    },
    buttonStyle: {
      borderRadius: 5,
    },
    overlayStyle: {
      borderRadius: 5,
      color: `${colors.white}`,
    },
    labelStyle: {
      fontWeight: 'bold',
      fontSize: `${fonts.extraSmall} - 2`,
      letterSpacing: '1px',
      color: 'white',
    },
  }

  const defaultButtonHeight = '50px'

  if (margin && margin !== '') {
    style.style.margin = margin
  }
  if (padding && padding !== '') {
    style.labelStyle.padding = padding
  }
  if (buttonHeight && buttonHeight !== '') {
    style.buttonStyle.height = buttonHeight
    style.buttonStyle.lineHeight = buttonHeight
    style.overlayStyle.height = buttonHeight
  } else {
    style.buttonStyle.height = defaultButtonHeight
    style.buttonStyle.lineHeight = defaultButtonHeight
    style.overlayStyle.height = defaultButtonHeight
  }

  return (
    <RaisedButton
      style={style.style}
      backgroundColor={backgroundColor}
      disabledBackgroundColor={disabledColor}
      buttonStyle={style.buttonStyle}
      labelStyle={style.labelStyle}
      overlayStyle={style.overlayStyle}
      disabled={disabled}
      label={label}
      onClick={onClick || undefined}
      onTouchTap={onTouchTap || undefined}
      type={onClick || onTouchTap ? undefined : 'submit'}
    />
  )
}

DefaultButton.propTypes = {
  secondary: PropTypes.bool,
  textTransform: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  buttonHeight: PropTypes.string,
  margin: PropTypes.string,
  onClick: PropTypes.func,
  onTouchTap: PropTypes.func,
};

DefaultButton.defaultProps = {
  secondary: false,
  textTransform: 'none',
  disabled: false,
  label: ' ',
  margin: '',
  buttonHeight: '',
};

export default DefaultButton
