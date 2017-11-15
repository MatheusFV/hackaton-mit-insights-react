import colors from '@consts/colors'
import fonts from '@consts/fonts'

const MIN_HEIGHT = 330

export default {
  inputField: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
  },
  secondaryButton: {
    backgroundColor: colors.primaryDark,
    borderRadius: 10,
  },
  label: {
    textTransform: 'none',
  },
  title: {
    fontSize: fonts.medium,
    textAlign: 'center',
    margin: '0 0 30px 0',
    fontWeight: 'normal',
  },
  container: {
    width: '100%',
    minHeight: MIN_HEIGHT,
    height: 'auto',
    display: 'inline-flex',
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  dropzone: {
    minHeight: MIN_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px dashed',
    cursor: 'pointer',
    textAlign: 'center',
    marginBottom: 10,
    position: 'relative',
    zIndex: 0,
  },
  instruction: {
    textAlign: 'center',
    fontSize: 12,
  },
  icon: {
    width: 60,
    height: 60,
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  absoluteCenter: {
    margin: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    zIndex: 9999,
  },
  progress: {
    width: '100%',
  },
}
