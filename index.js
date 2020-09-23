const { urlencoded } = require("express");
const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));


const crawler = async(name) => {
   try{
    const browser = await puppeteer.launch({headless:true, args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],});
    const page = await browser.newPage();
    await page.goto("https://bit.ly/2Z9XInC",{waitUntil:"load"});
    await page.waitForNavigation();
    await page.waitForSelector(".quantumWizMenuPaperselectDropDown.exportDropDown");
    await page.evaluate(() => {
        const clickButtons = document.querySelectorAll(".quantumWizMenuPaperselectDropDown.exportDropDown");
        console.log(clickButtons);
        clickButtons[0].click();
    });

    await page.waitForSelector("#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(1) > div > div > div.freebirdFormviewerComponentsQuestionSelectRoot > div > div.exportSelectPopup.quantumWizMenuPaperselectPopup.appsMaterialWizMenuPaperselectPopup > div:nth-child(3)");
    
    await page.evaluate(() => {
        // 서울 클릭
        document.querySelector("#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(1) > div > div > div.freebirdFormviewerComponentsQuestionSelectRoot > div > div.exportSelectPopup.quantumWizMenuPaperselectPopup.appsMaterialWizMenuPaperselectPopup > div:nth-child(3)").click();
    });

    await page.evaluate(() => {
        const clickButtons = document.querySelectorAll(".quantumWizMenuPaperselectDropDown.exportDropDown");
        console.log(clickButtons);
        clickButtons[1].click();
    });
    
    await page.waitFor(800);
    await page.waitForSelector("#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(2) > div > div > div.freebirdFormviewerComponentsQuestionSelectRoot > div > div.exportSelectPopup.quantumWizMenuPaperselectPopup.appsMaterialWizMenuPaperselectPopup > div:nth-child(12) > span")
        
    await page.evaluate(()=>{
        document.querySelector("#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(2) > div > div > div.freebirdFormviewerComponentsQuestionSelectRoot > div > div.exportSelectPopup.quantumWizMenuPaperselectPopup.appsMaterialWizMenuPaperselectPopup > div:nth-child(12) > span").click();
        document.querySelector("#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(3) > div > div > div.freebirdFormviewerComponentsQuestionTextRoot > div > div.quantumWizTextinputPaperinputMainContent.exportContent > div > div.quantumWizTextinputPaperinputInputArea > input").focus();
    });
    await page.waitFor(800);
    // await page.waitForSelector("#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(3) > div > div > div.freebirdFormviewerComponentsQuestionTextRoot > div > div.quantumWizTextinputPaperinputMainContent.exportContent > div > div.quantumWizTextinputPaperinputInputArea > input.isFocused");

    // await page.focus("#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(3) > div > div > div.freebirdFormviewerComponentsQuestionTextRoot > div > div.quantumWizTextinputPaperinputMainContent.exportContent > div > div.quantumWizTextinputPaperinputInputArea > input");
    
    await page.type("#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(3) > div > div > div.freebirdFormviewerComponentsQuestionTextRoot > div > div.quantumWizTextinputPaperinputMainContent.exportContent > div > div.quantumWizTextinputPaperinputInputArea > input", name);
    await page.evaluate(() => {
        document.querySelector("#i17").click();
        document.querySelector("#i27").click();
        document.querySelector("#i37").click();
        
        document.querySelector("#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewNavigationNavControls > div.freebirdFormviewerViewNavigationButtonsAndProgress > div > div").click();
    })

    
   }catch(err){
       console.log(err);
   }
}

app.get("/:name",async (req, res) => {
    console.log(req.params);
    await crawler(req.params.name);
    return res.json(req.params);
});

app.listen(8000, () => {console.log("this server listening on 8000")});
