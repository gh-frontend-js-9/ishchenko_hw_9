class Tamagotchi {
    constructor(food, clean, happiness, health, social, money, decreasingPoint, decreasingInt, maxStats) {
        this.food = food;
        this.clean = clean;
        this.happiness = happiness;
        this.health = health;
        this.social = social;
        this.money = money;
        this.decreasingPoint = decreasingPoint;
        this.decreasingInt = decreasingInt;
        this.maxStats = maxStats;
    }

    getRand(arr){
        let rand = Math.floor(Math.random() * arr.length);
        arr[rand] = this.checkStat(arr[rand], random(10,50));
        return arr[rand];
    }

    getRandId(arr) {
        let rand = Math.floor(Math.random() * arr.length);
        return arr[rand];
    }

    randomHelp(){
        let statArr = [
            this.food,
            this.clean,
            this.happiness,
            this.health,
            this.social,
            this.money
        ]
        let idArr = [
            '.eatProgressBarElem',
            '.washProgressBarElem',
            '.runProgressBarElem',
            '.healthProgressBarElem',
            '.socialProgressBarElem',
            '.moneyProgressBarElem'
        ]
        return generateProgressBar(`${this.getRandId(idArr)}`,this.maxStats,`${this.getRand(statArr)}`)
    }

    eatFood() {
        eat.onclick = () => {
            this.food = this.checkStat(this.food, 30);
            generateProgressBar('.eatProgressBarElem', this.maxStats, this.food);
            this.clean -= 20;
            generateProgressBar('.washProgressBarElem', this.maxStats, this.clean);
        };
    }

    washUp() {
        clean.onclick = () => {
            this.clean = this.checkStat(this.clean, 40);
            generateProgressBar('.washProgressBarElem', this.maxStats, this.clean);
            this.happiness -= 20;
            generateProgressBar('.runProgressBarElem', this.maxStats, this.happiness);
        };
    }

    goWalk() {
        run.onclick = () => {
            this.happiness = this.checkStat(this.happiness, 25);
            generateProgressBar('.runProgressBarElem', this.maxStats, this.happiness);
            this.food -= 10;
            generateProgressBar('.eatProgressBarElem', this.maxStats, this.food);
        };
    }

    //new actions here
    visitDoc(){
        doc.onclick = () => {
            this.health = this.checkStat(this.health,30);
            generateProgressBar('.healthProgressBarElem', this.maxStats, this.health);
            this.money -= 20;
            generateProgressBar('.moneyProgressBarElem', this.maxStats, this.money);
        }
    }

    goToBar(){
        bar.onclick = () => {
            this.social = this.checkStat(this.social,40);
            generateProgressBar('.socialProgressBarElem', this.maxStats, this.social);
            this.food = this.checkStat(this.food,10);
            generateProgressBar('.eatProgressBarElem', this.maxStats, this.food);
            this.money -= 20;
            generateProgressBar('.moneyProgressBarElem', this.maxStats, this.money);
            this.health -= 10;
            generateProgressBar('.healthProgressBarElem', this.maxStats, this.health);
        }
    }

    goToWork(){
        work.onclick = () => {
            this.social -= 20;
            generateProgressBar('.socialProgressBarElem', this.maxStats, this.social);
            this.food -= 10;
            generateProgressBar('.eatProgressBarElem', this.maxStats, this.food);
            this.money = this.checkStat(this.money, 50);
            generateProgressBar('.moneyProgressBarElem', this.maxStats, this.money);
            this.health -= 10;
            generateProgressBar('.healthProgressBarElem', this.maxStats, this.health);
        }
    }

    buyFood() {
        buy.onclick = () => {
            this.food = this.checkStat(this.food, 20);
            generateProgressBar('.eatProgressBarElem', this.maxStats, this.food);
            this.money -= 20;
            generateProgressBar('.moneyProgressBarElem', this.maxStats, this.money);
        }
    }

    startBusiness() {
        business.onclick = () => {
            this.money = this.checkStat(this.money,100);
            generateProgressBar('.moneyProgressBarElem', this.maxStats, this.money);
            this.happiness = this.checkStat(this.happiness,100);
            generateProgressBar('.runProgressBarElem', this.maxStats, this.happiness);
            this.social = this.checkStat(this.social, 20);
            generateProgressBar('.socialProgressBarElem', this.maxStats, this.social);
            this.health -= 100;
            generateProgressBar('.healthProgressBarElem', this.maxStats, this.health);
        }
    }

    checkStat(stat, increaseBy){
        let result = stat + increaseBy;
        return (result > this.maxStats) ? this.maxStats : result
    }

    decreasingInterval(){
        this.intervalRandom = setInterval(this.randomHelp.bind(this), 60000);
        this.intervalAccess = setInterval(this.decrement.bind(this), this.decreasingInt);
        this.intervalStopGame = setInterval(this.stopGame.bind(this),1000);
        buttonControl('none','block');
    }

    decrement() {
        this.food -= this.decreasingPoint;
        generateProgressBar('.eatProgressBarElem', this.maxStats, this.food);
        this.clean -= this.decreasingPoint;
        generateProgressBar('.washProgressBarElem', this.maxStats, this.clean);
        this.happiness -= this.decreasingPoint;
        generateProgressBar('.runProgressBarElem', this.maxStats, this.happiness);
        this.health -= this.decreasingPoint;
        generateProgressBar('.healthProgressBarElem', this.maxStats, this.health);
        this.social -= this.decreasingPoint;
        generateProgressBar('.socialProgressBarElem', this.maxStats, this.social);
        this.money -= this.decreasingPoint;
        generateProgressBar('.moneyProgressBarElem', this.maxStats, this.money);
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

    stopGame(){
        if (this.food < 0 || this.clean < 0 || this.happiness < 0 || this.health < 0 || this.social < 0 || this.money < 0){
            clearInterval(this.intervalRandom);
            clearInterval(this.intervalAccess);
            clearInterval(this.timerAccess);
            buttonControl('block','none');
            alert(`your Tamagotchi existed ${this.time} sec`);
            return clearInterval(this.intervalStopGame);
        }
    }

    initialize(){
        this.eatFood();
        this.washUp();
        this.goWalk();
        this.visitDoc();
        this.goToBar();
        this.goToWork();
        this.buyFood();
        this.startBusiness();
        this.timer();
        this.decreasingInterval();
    }
}


function buttonControl(typeBlock,controlBlock) {
    document.querySelector('#type').style.display = typeBlock;
    document.querySelector('.control-buttons').style.display = controlBlock;
}
buttonControl('block','none');

function generateProgressBar(elemId,max,value){
    return document.querySelector(elemId).innerHTML = `<progress value="${value}" max="${max}"></progress>`;
}

function random(a,b) {
    let rand = a + Math.random() * (b + 1 - a);
    return Math.floor(rand);
}


pug.onclick = function () {
    let pug = new Tamagotchi(random(50,70),random(50,70),random(50,70),random(50,70),random(50,70),random(50,70),5, 5000,70);
    pug.initialize();
    generateProgressBar('.eatProgressBarElem', pug.maxStats, pug.food);
    generateProgressBar('.washProgressBarElem', pug.maxStats, pug.clean);
    generateProgressBar('.runProgressBarElem', pug.maxStats, pug.happiness);
    generateProgressBar('.healthProgressBarElem', pug.maxStats, pug.health);
    generateProgressBar('.socialProgressBarElem', pug.maxStats, pug.social);
    generateProgressBar('.moneyProgressBarElem', pug.maxStats, pug.money);
}

cat.onclick = function () {
    let cat = new Tamagotchi(random(50,100),random(50,100),random(50,100),random(50,100),random(50,100),random(50,100),3, 5000,100);
    cat.initialize();
    generateProgressBar('.eatProgressBarElem', cat.maxStats, cat.food);
    generateProgressBar('.washProgressBarElem', cat.maxStats, cat.clean);
    generateProgressBar('.runProgressBarElem', cat.maxStats, cat.happiness);
    generateProgressBar('.healthProgressBarElem', cat.maxStats, cat.health);
    generateProgressBar('.socialProgressBarElem', cat.maxStats, cat.social);
    generateProgressBar('.moneyProgressBarElem', cat.maxStats, cat.money);
}

ninja.onclick = function () {
    let ninja = new Tamagotchi(random(50,120),random(50,120),random(50,120),random(50,120),random(50,120),random(50,120),7, 7000,150);
    ninja.initialize();
    generateProgressBar('.eatProgressBarElem', ninja.maxStats, ninja.food);
    generateProgressBar('.washProgressBarElem', ninja.maxStats, ninja.clean);
    generateProgressBar('.runProgressBarElem', ninja.maxStats, ninja.happiness);
    generateProgressBar('.healthProgressBarElem', ninja.maxStats, ninja.health);
    generateProgressBar('.socialProgressBarElem', ninja.maxStats, ninja.social);
    generateProgressBar('.moneyProgressBarElem', ninja.maxStats, ninja.money);
}