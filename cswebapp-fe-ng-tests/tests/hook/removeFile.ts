/* eslint-disable no-console */
const fs = require('fs')

const path1 = './allure-report'
const path2 = './junit'
const path3 = './playwright-report'
const path4 = './report'
const path5 = './test-results'

try {
  fs.rmSync(path1, { recursive: true, force: true })
  console.log('File removed:', path1)
} catch (err) {
  console.error(err)
}

try {
  fs.rmSync(path2, { recursive: true, force: true })
  console.log('File removed:', path2)
} catch (err) {
  console.error(err)
}

try {
  fs.rmSync(path3, { recursive: true, force: true })
  console.log('File removed:', path3)
} catch (err) {
  console.error(err)
}

try {
  fs.rmSync(path4, { recursive: true, force: true })
  console.log('File removed:', path4)
} catch (err) {
  console.error(err)
}

try {
  fs.rmSync(path5, { recursive: true, force: true })
  console.log('File removed:', path5)
} catch (err) {
  console.error(err)
}
