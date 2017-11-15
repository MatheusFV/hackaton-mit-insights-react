import includes from 'lodash/includes'
import moment from 'moment'
import { objectToArray2 } from './objectToArray'

export const getFirstObjectProperty = (obj, def) => {
  for (const a in obj) {
    if ({}.hasOwnProperty.call(obj, a)) {
      return obj[a];
    }
  }

  return def
}

export const convertDates = (object, fields) => {
  const newObject = {}
  Object.keys(object).forEach((key) => {
    if (includes(fields, key)) {
      newObject[key] = moment(object[key]).isValid() ? new Date(object[key]) : null
    } else {
      newObject[key] = object[key]
    }
  })
  return newObject
}

export const getOptionsSpeakersFromSpeakersObject = speakersObject =>
  speakersObject ? objectToArray2(speakersObject)
    .filter(speaker => speaker.name)
    .map(({ name, companyName, role, imageUrl, key }) => ({
      id: key,
      name,
      companyName,
      role,
      imageUrl,
    })) : []

export const buildSelectableArrayFromObject = (object, {
  labelKey = 'name',
} = {}) =>
  objectToArray2(object)
    .map((item, key) => ({
      label: item[labelKey],
      value: key,
    }))

export const createCallable = f => typeof f === 'function' ? f : () => f
