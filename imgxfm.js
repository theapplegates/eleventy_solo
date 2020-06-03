const sharp = require('sharp')
const globAll = require('glob-all')
const fs = require('fs')
const sizeOf = require('image-size')
const SITEDIR = '_site'
const IMGLNDG = '_site/images'
const directory = 'src/images'
const respSizes = [20, 250, 500, 750, 1000, 1250, 1500]
//            was: 20, 300, 450, 600, 750, 900, 1050, 1200, 1350, 1500
var respSizesThis = Array.from(respSizes)

if(!fs.existsSync(SITEDIR)) {
  fs.mkdirSync(SITEDIR)
}
if(!fs.existsSync(IMGLNDG)) {
  fs.mkdirSync(IMGLNDG)
}

files = globAll.sync([
  'src/images/*.jpg',
  'src/images/*.png',
])

files.forEach(file => {
  var dimensions = sizeOf(`${file}`)
  var fileWidth = dimensions.width
  file = file.replace('src/images/','') // losing the directory now, before processing
  var fileExt = file.substring((file.lastIndexOf('.') + 1 ))
  var fileBas = file.slice(0, -4)

  // now, check whether the respSizes array includes the image width; if not,
  // add it to respSizesThis so we create a processed, original-width file, too
  !respSizesThis.includes(fileWidth)
  ? respSizesThis.push(fileWidth)
  : ``
  respSizesThis.forEach(size => {
    fileExt == 'jpg' && size <= fileWidth
    ? sharp(`${directory}/${file}`)
      .jpeg({
        quality: 60,
      })
      .resize({
        width: size,
        withoutEnlargement: true,
      })
      .toFile(`${IMGLNDG}/${fileBas}-${size}.${fileExt}`)
      .then(() => {
        // console.log(`Sharp output ${file} as ${fileBas}-${size}.${fileExt}`)
      })
      .catch(err => {console.log(err + file)})
    : ``
    fileExt == 'png' && size <= fileWidth
    ? sharp(`${directory}/${file}`)
      .png({})
      .resize({
        width: size,
        withoutEnlargement: true,
      })
      .toFile(`${IMGLNDG}/${fileBas}-${size}.${fileExt}`)
      .then(() => {
        // console.log(`Sharp output ${file} as ${fileBas}-${size}.${fileExt}`)
      })
      .catch(err => {console.log(err + file)})
    : ``
    // now, make webp for each, regardless of original file format
    size <= fileWidth    
    ? sharp(`${directory}/${file}`)
      .webp({
        quality: 50,
      })
      .resize({
        width: size,
        withoutEnlargement: true,
      })
      .toFile(`${IMGLNDG}/${fileBas}-${size}.webp`)
      .then(() => {
        // console.log(`Sharp output ${file} as ${fileBas}-${size}.webp`)
      })
      .catch(err => {console.log(err + file)})
    : ``
  })
  // resetting respSizesThis to original ref array (respSizes) so extra values don't keep getting added
  respSizesThis.splice(0,respSizesThis.length)
  respSizesThis = Array.from(respSizes)
})
console.log(`Writing responsive images...`)
