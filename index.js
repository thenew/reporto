/**
 * Reporto (ᵔᴥᵔ)
 * takes screenshots using Google chrome puppeteer
 *
 * help: https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-web-scrapping-6bf5979dee3e
 */

const puppeteer = require('puppeteer')
const mkdirp = require('mkdirp')
const argv = require('minimist')(process.argv.slice(2))
const SETTINGS = require('./settings')

async function run() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const today = new Date()
  let directoryName = today.getFullYear()
  +('0' + (today.getMonth() + 1)).slice(-2)
  +('0' + (today.getDate())).slice(-2)
  + '-'
  +('0' + (today.getHours() + 1)).slice(-2)
  +('0' + (today.getMinutes() + 1)).slice(-2)

  console.log(directoryName+'/')

  for (var pageName in SETTINGS.urls) {

    for (var viewport in SETTINGS.viewports) {

      await page.setViewport(SETTINGS.viewports[viewport])
      await page.goto(SETTINGS.urls[pageName])
      await page.waitFor(3000)
      await mkdirp('screenshots/'+directoryName)

      let fileName = pageName+'-'+viewport
      if(argv.tag) {
        fileName += '-'+argv.tag
      }

      fileName += '.png'

      await page.screenshot({path: 'screenshots/'+directoryName+'/'+fileName, fullPage: true})
      console.log(fileName+' saved')
    }
  }

  console.log('Reporto done (ᵔᴥᵔ)')
  process.exit(-1)
}

run()
