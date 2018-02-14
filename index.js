const puppeteer = require('puppeteer')
const mkdirp = require('mkdirp')
const argv = require('minimist')(process.argv.slice(2))

async function run() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const urls = {
    'HP': 'http://localhost:8080/',
    'PDP': 'http://localhost:8080/eqt-support-adv-shoes/BB1305.html',
  }

  const viewports = {
    'desktop': {
      width: 1425,
      height: 804
    },
    'mobile': {
      width: 375,
      height: 1500,
      deviceScaleFactor: 2,
      isMobile: true
    },
  }

  const today = new Date();
  let directoryName = today.getFullYear()
  +('0' + (today.getMonth() + 1)).slice(-2)
  +('0' + (today.getDate() + 1)).slice(-2)
  + '-'
  +('0' + (today.getHours() + 1)).slice(-2)
  +('0' + (today.getMinutes() + 1)).slice(-2)
  +('0' + (today.getSeconds() + 1)).slice(-2)

  if(argv.tag) {
    directoryName += '-'+argv.tag
  }

  for (var pageName in urls) {

    for (var viewport in viewports) {
      await page.setViewport(viewports[viewport])
      await page.goto(urls[pageName])
      await page.waitFor(3000)
      await mkdirp('screenshots/'+directoryName)
      // await mkdirp('/screenshots/'+directoryName)

      // mkdirp('/screenshots/'+directoryName, (err) => {
        // console.log('err: ', err)
        await page.screenshot({path: 'screenshots/'+directoryName+'/'+pageName+'_'+viewport+'.png', fullPage: true});
        console.log('screenshots/'+pageName+'_'+viewport+'.png');
      // })
    }
  }
}

run()