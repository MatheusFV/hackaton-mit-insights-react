/* global document */
/* global Image */
import dataURLtoBlob from 'blueimp-canvas-to-blob'


export const reduceImageSize = (file, type) =>
  new Promise((resolve, reject) => {
    if (type === 'application/pdf') {
      resolve(file)
      return
    }
    // https://github.com/josefrichter/resize/blob/master/public/preprocess.js
    // https://stackoverflow.com/questions/14672746/how-to-compress-an-image-via-javascript-in-the-browser

    // helper Image object
    const max_width = 800
    const max_height = 600

    const image = new Image()
    if (!file.preview) {
      file.preview = window.URL.createObjectURL(file)
    }
    image.src = file.preview

    image.onload = () => {
      const canvas = document.createElement('canvas')
      let width = image.width
      let height = image.height

      // calculate the width and height, constraining the proportions
      if (width > height) {
        if (width > max_width) {
          // height *= max_width / width;
          height = Math.round(height *= max_width / width);
          width = max_width;
        }
      } else if (height > max_height) {
          // width *= max_height / height;
        width = Math.round(width *= max_height / height);
        height = max_height;
      }

      // resize the canvas and draw the image data into it
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0, width, height)
      if (canvas.toBlob) {
        canvas.toBlob((croppedPreviewBlob) => {
          resolve(croppedPreviewBlob)
        })
      } else {
        const myBlob = canvas.msToBlob()
        resolve(myBlob)
      }
    }
  })
