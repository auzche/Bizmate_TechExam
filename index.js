const{Builder, By} = require("selenium-webdriver");
const assert = require("assert");


async function successful_login_logout(){
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("https://www.demoblaze.com/index.html");

//Click Log in from menu
    await driver.findElement(By.linkText("Log in")).click();

    let loginContainer = await driver.findElement(By.id('logInModal'))
    let inputUsername = await loginContainer.findElement(By.id('loginusername'));
    let inputPassword = await loginContainer.findElement(By.id('loginpassword'));
    let btnLogin = driver.findElement(By.xpath("//button[@type='button' and contains(text(),'Log in')]"));

    //Populate input fields
    await inputUsername.sendKeys('kinton1');
    await inputPassword.sendKeys('kinton123');

    //Click Log in button
    await btnLogin.click();

    //Wait for page to load
    await driver.sleep(5 * 1000)

    //Check if User is redirected to Home page.
    let redirectHP = await driver.findElement(By.xpath("//a[@id='nameofuser']")).getAttribute('href');
    assert.strictEqual(redirectHP, 'https://www.demoblaze.com/index.html#');
    console.log('User is redirected to Home page.');

    //Check if username is displayed.
    let userNameDisplay = await driver.findElement(By.xpath("//a[@id='nameofuser']")).getCssValue('display');
    assert.strictEqual(userNameDisplay, 'block');
    console.log('Log in Successful. Username is displayed');

    //Check if Sign Up button is not visible
    await driver.sleep(5 * 1000)
    let checkSignUpVisible = await driver.findElement(By.xpath("//a[contains(text(),'Sign up')]")).getCssValue('display');
    assert.strictEqual(checkSignUpVisible, 'none')
    console.log('Sign Up button is not visible.');

    //Check if Log out menu is visible
    let checkLogOutVisible = await driver.findElement(By.xpath("//a[contains(text(),'Log out')]")).getCssValue('display');
    assert.strictEqual(checkLogOutVisible, 'block');
    console.log('Log out menu is visible.'); 

    //Log out
    await driver.findElement(By.linkText("Log out")).click();
    console.log('User Log out successfully.');
}
successful_login_logout();

