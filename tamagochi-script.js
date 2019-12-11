class Randomizer {
    static random(a,b) {
        let rand = a + Math.random() * (b + 1 - a);
        return Math.floor(rand);
    }
}

class HtmlElemRenderer {
    static  generateProgressBar(elemId,max,value){
        return document.querySelector(elemId).innerHTML = `<progress value="${value}" max="${max}"></progress>`;
    }
}

class ButtonController {
    static buttonControl(typeBlock,controlBlock) {
        document.querySelector('#type').style.display = typeBlock;
        document.querySelector('.control-buttons').style.display = controlBlock;
    }
}

class Tamagotchi {
    static get EAT_PROGRESS_BAR_NAME() { return '.eatProgressBarElem' };
    static get CLEAN_PROGRESS_BAR_NAME() { return '.washProgressBarElem' };
    static get HAPPY_PROGRESS_BAR_NAME() { return '.runProgressBarElem' };
    static get HEALTH_PROGRESS_BAR_NAME() { return '.healthProgressBarElem' };
    static get SOCIAL_PROGRESS_BAR_NAME() { return '.socialProgressBarElem' };
    static get MONEY_PROGRESS_BAR_NAME() { return '.moneyProgressBarElem' };

    constructor(decreasingPoint, decreasingInt, maxStat) {
        this.decreasingPoint = decreasingPoint;
        this.decreasingInt = decreasingInt;
        this.maxStat = maxStat;

        this.food = Randomizer.random(50, this.maxStat);
        this.clean = Randomizer.random(50, this.maxStat);
        this.happiness = Randomizer.random(50, this.maxStat);
        this.health = Randomizer.random(50, this.maxStat);
        this.social = Randomizer.random(50, this.maxStat);
        this.money = Randomizer.random(50, this.maxStat);
    }

    registerEatFoodHtmlClickEventHandler() {
        eat.onclick = () => {
            this.food = this.returnIncreasedValue(this.food, 30);
            this.clean -= 20;
            this.renderStatBar();
        };
    }

    registerWashUpHtmlClickEventHandler() {
        clean.onclick = () => {
            this.clean = this.returnIncreasedValue(this.clean, 40);
            this.happiness -= 20;
            this.renderStatBar();
        };
    }

    registerGoWalkHtmlClickEventHandler() {
        run.onclick = () => {
            this.happiness = this.returnIncreasedValue(this.happiness, 25);
            this.food -= 10;
            this.renderStatBar();
        };
    }

    //new actions here
    registerVisitDocHtmlClickEventHandler(){
        doc.onclick = () => {
            this.health = this.returnIncreasedValue(this.health,30);
            this.money -= 20;
            this.renderStatBar();
        }
    }

    registerGoToBarHtmlClickEventHandler(){
        bar.onclick = () => {
            this.social = this.returnIncreasedValue(this.social,40);
            this.food = this.returnIncreasedValue(this.food,10);
            this.money -= 20;
            this.health -= 10;
            this.renderStatBar();
        }
    }

    registerGoToWorkHtmlClickEventHandler(){
        work.onclick = () => {
            this.social -= 20;
            this.food -= 10;
            this.money = this.returnIncreasedValue(this.money, 50);
            this.health -= 10;
            this.renderStatBar();
        }
    }

    registerBuyFoodHtmlClickEventHandler() {
        buy.onclick = () => {
            this.food = this.returnIncreasedValue(this.food, 20);
            this.money -= 20;
            this.renderStatBar();
        }
    }

    registerStartBusinessHtmlClickEventHandler() {
        business.onclick = () => {
            this.money = this.returnIncreasedValue(this.money,100);
            this.happiness = this.returnIncreasedValue(this.happiness,100);
            this.social = this.returnIncreasedValue(this.social, 20);
            this.health -= 100;
            this.renderStatBar();
        }
    }

    returnIncreasedValue(stat, increaseBy){
        let result = stat + increaseBy;
        return (result > this.maxStat) ? this.maxStat : result
    }

    decrement() {
        this.food -= this.decreasingPoint;
        this.clean -= this.decreasingPoint;
        this.happiness -= this.decreasingPoint;
        this.health -= this.decreasingPoint;
        this.social -= this.decreasingPoint;
        this.money -= this.decreasingPoint;
    }

    startGame(){
        this.intervalRandom = setInterval(this.randomHelp.bind(this), 60000);
        this.intervalAccess = setInterval(() =>{
            this.decrement();
            this.renderStatBar();
        }, this.decreasingInt);
        this.intervalStopGame = setInterval(this.stopGame.bind(this),1000);
        ButtonController.buttonControl('none','block');
    }

    stopGame(){
        if (this.food < 0 || this.clean < 0 || this.happiness < 0 || this.health < 0 || this.social < 0 || this.money < 0){
            clearInterval(this.intervalRandom);
            clearInterval(this.intervalAccess);
            clearInterval(this.timerAccess);
            ButtonController.buttonControl('block','none');
            alert(`your Tamagotchi existed ${this.time} sec`);
            return clearInterval(this.intervalStopGame);
        }
    }

    renderStatBar() {
        HtmlElemRenderer.generateProgressBar('.eatProgressBarElem', this.maxStat, this.food);
        HtmlElemRenderer.generateProgressBar('.washProgressBarElem', this.maxStat, this.clean);
        HtmlElemRenderer.generateProgressBar('.runProgressBarElem', this.maxStat, this.happiness);
        HtmlElemRenderer.generateProgressBar('.healthProgressBarElem', this.maxStat, this.health);
        HtmlElemRenderer.generateProgressBar('.socialProgressBarElem', this.maxStat, this.social);
        HtmlElemRenderer.generateProgressBar('.moneyProgressBarElem', this.maxStat, this.money);
    }

    timer(){
        this.time = 0;
        let timerOfLive = () => {
            this.time++;
            document.querySelector('#out').innerHTML = this.time;
            this.timerAccess = setTimeout(timerOfLive,1000);
        }
        timerOfLive();
    }

    randomHelp(){
        const statArr = [
            this.food,
            this.clean,
            this.happiness,
            this.health,
            this.social,
            this.money
        ]
        const idArr = [
            Tamagotchi.EAT_PROGRESS_BAR_NAME,
            Tamagotchi.CLEAN_PROGRESS_BAR_NAME,
            Tamagotchi.HAPPY_PROGRESS_BAR_NAME,
            Tamagotchi.HEALTH_PROGRESS_BAR_NAME,
            Tamagotchi.SOCIAL_PROGRESS_BAR_NAME,
            Tamagotchi.MONEY_PROGRESS_BAR_NAME
        ]
        return HtmlElemRenderer.generateProgressBar(`${this.getRandId(idArr)}`,this.maxStat,`${this.getRandStat(statArr)}`)
    }

    getRandStat(arr){
        let rand = Math.floor(Math.random() * arr.length);
        arr[rand] = this.returnIncreasedValue(arr[rand], Randomizer.random(10,50));
        return arr[rand];
    }

    getRandId(arr) {
        let rand = Math.floor(Math.random() * arr.length);
        return arr[rand];
    }

    initialize(){
        this.registerEatFoodHtmlClickEventHandler();
        this.registerWashUpHtmlClickEventHandler();
        this.registerGoWalkHtmlClickEventHandler();
        this.registerVisitDocHtmlClickEventHandler();
        this.registerGoToBarHtmlClickEventHandler();
        this.registerGoToWorkHtmlClickEventHandler();
        this.registerBuyFoodHtmlClickEventHandler();
        this.registerStartBusinessHtmlClickEventHandler();
        this.timer();
        this.startGame();
    }
}


ButtonController.buttonControl('block','none');
pug.onclick = function () {
    let pug = new Tamagotchi(5, 5000, 70);
    pug.initialize();
    pug.renderStatBar();
}

cat.onclick = function () {
    let cat = new Tamagotchi(3, 5000, 100);
    cat.initialize();
    cat.renderStatBar();
}

ninja.onclick = function () {
    let ninja = new Tamagotchi(7, 7000, 150);
    ninja.initialize();
    ninja.renderStatBar();
}