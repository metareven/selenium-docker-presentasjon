//This can easily be re-implemented in any of the supported languages. The native bindings for different languages can be found on https://github.com/SeleniumHQ/selenium
//Other wrappers around selenium such as webdriver.io (ecmascript) and capybara (ruby) work fine, but using straight up selenium-webdriver is the easiest for such a small example

//import what you need from the selenium-webdriver
const {Builder, By, Key, until} = require('selenium-webdriver');

//this is the test
async function runTest(browsername, url){
	//instantiate the connection to a browser
	let driver = await new Builder()
	.forBrowser(browsername) //named browsername, which is here either firefox or chrome
	.usingServer('http://localhost:4444/wd/hub') // on the selenium hub you instantiated using docker-compose
	.build(); //let's get ready to rumble
	//If you want something more fancy, like specifying version numbers etc. Read https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Builder.html#withCapabilities
	//Why the selenium guys provide no examples is beyond me. I think this documentation is quite bad tbh
	try{
		await driver.manage().setTimeouts({implicit:5000}) //How to use this is poorly documented, but this makes sure you don't need explicit waits
		await driver.get(url) // get the URL, in this case different kinds of nyan cats
		await driver.sleep(5000) //Sleep to make sure the audience gets to see the webpage
		await driver.get('http://www.google.com') //everyone uses google as an example, so why not me too
		await driver.findElement(By.css('#lst-ib')).sendKeys('do a barrel roll', Key.ENTER) //why the ... did google call their search-field "lst-ib"... wtf? Anyway, uses a CSS selector to get the search field and sends keys to it. Also presses enter
		await driver.sleep(5000) //Sleep to make sure the audience gets to watch the barrel roll animation on google
		
	} finally {
		await driver.quit() //remember to exit! Or else you will have to wait for your session to time out before running the next test
	}
	
	
}

//Run the test on chrome and firefox
const browsers = ['chrome','firefox']
const urls = ['http://www.nyan.cat/', 'http://www.nyan.cat/gb', 'http://www.nyan.cat/technyancolor']

//Promise primase, run the tests concurrently.. kind of...it's all over the network anyway
const promises = []
for(const browser of browsers){
	for(i=0;i<3;i++){
		promises.push(runTest(browser,urls[i]))
	}
}

//wait for the stuff to finish
Promise.all(promises)
.then(() => console.log("that's all folks!"))
.catch(() => console.log("that's all folks!")) //eat the errors. Don't want anything funky to possibly happen during the presentation

