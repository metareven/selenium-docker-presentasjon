const {Builder, By, Key, until} = require('selenium-webdriver');

async function runTest(browsername, url){
	let driver = await new Builder()
    .forBrowser(browsername)
    .usingServer('http://localhost:4444/wd/hub')
    .build();
	try{
		await driver.manage().setTimeouts({implicit:5000})
		await driver.get(url)
		await driver.sleep(5000)
		await driver.get('http://www.google.com')
		await driver.findElement(By.css('#lst-ib')).sendKeys('do a barrel roll', Key.ENTER)
		await driver.sleep(5000)
		
	} finally {
		await driver.quit()
	}
	
	
}

const browsers = ['chrome','firefox']
const urls = ['http://www.nyan.cat/', 'http://www.nyan.cat/gb', 'http://www.nyan.cat/technyancolor']

const promises = []
for(const browser of browsers){
	for(i=0;i<3;i++){
		promises.push(runTest(browser,urls[i]))
	}
}

Promise.all(promises)
.then(() => console.log("that's all folks!"))
.catch(() => console.log("that's all folks!"))

