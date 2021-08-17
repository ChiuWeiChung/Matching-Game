const modeBtns = document.querySelector('.controller__buttons');
const searchForm = document.querySelector('.topic');


import Cards from './models/Cards';
import * as cardsView from './views/cardsView';

class App {
    cardsCollection = [];
    score = 0;
    timerId = [];
    clickedCards = [];
    topic = 'random';

    constructor() {
        this.fetchCards(this.topic);
        searchForm.addEventListener('submit', this.searchBtnClicker.bind(this));
        modeBtns.addEventListener('click', this.modeBtnsClicker.bind(this))
    }

    searchBtnClicker(e) {
        e.preventDefault();
        let searchKey = e.target.children[1].value;
        e.target.children[1].value = '';
        this.topic = searchKey ? searchKey.trim() : this.topic;
        this.fetchCards(this.topic);
    }


    modeBtnsClicker(e) {
        let checkArr = ['button--easy', 'button--regular', 'button--hard'];
        let className = e.target.classList.value;
        if (checkArr.includes(className)) this.renderTemplate(className.replace('button--', ''));
    }

    async fetchCards(key) {
        try {
            cardsView.renderLoading();
            this.cardsCollection = new Cards();
            await this.cardsCollection.fetchCards(key);
            this.renderTemplate();
        } catch (error) {
            cardsView.renderError(error);
        }
    }

    renderTemplate = (mode = 'easy') => {
        // =====Initilize UI=====
        cardsView.initTemplate();
        // =====Set mode =====
        const collection = this.cardsCollection.setMode(mode);
        this.score = 0;
        // =====Render Cards on Template=====
        cardsView.renderCards(collection);
        // =====Render Modal in front of Cards=====
        const startBtn = cardsView.renderModal(this.cardsCollection.mode.level, this.topic)
        if (startBtn) startBtn.addEventListener('click', this.startBtnClicker)
    }

    startBtnClicker = async () => {
        // =====Init Timer =====
        cardsView.initTimer(this.timerId);
        // =====Remove modal=====
        cardsView.removeModal(this.startBtnClicker);
        // Flip all cards
        cardsView.flipAllCards();
        // =====Flip all cards back after seconds=====
        const allCards = await cardsView.renderTimer(this.timerId);
        // =====Add eventListener to every cards=====
        allCards.forEach(card => card.addEventListener('click', this.cardClicker));
    }

    cardClicker = (e) => {
        if (this.clickedCards.length >= 2) return
        let choosedCard = [...e.target.parentElement.children]
        cardsView.flipChoosedCard(choosedCard);
        this.clickedCards.push(e.target.parentElement);
        e.target.parentElement.removeEventListener('click', this.cardClicker);
        // =====Match Situation=====
        this.checkAnswer()
    }

    checkAnswer() {
        if (this.clickedCards.length === 2) {
            let src1 = this.clickedCards[0].children[0].children[0].src;
            let src2 = this.clickedCards[1].children[0].children[0].src;
            if (src1 !== src2) {
                // Wrong Answer Situation
                this.wrongAnser(this.cardClicker).then(() => {
                    this.clickedCards = [];
                })
            } else {
                // Correct Answer Situation
                this.clickedCards.forEach(el => {
                    setTimeout(function () {
                        el.children[1].classList.add('fadeout');
                    }, 500)
                    el.removeEventListener('click', this.cardClicker)
                })
                this.score += 2;
                this.clickedCards = [];
                this.checkWin();
            }
        }
    }

    checkWin() {
        if (this.score === this.cardsCollection.mode.cardsNumber) {
            cardsView.renderWinningModal();
            const restartBtn = document.querySelector('.restartBtn');
            if (restartBtn) restartBtn.addEventListener('click', this.renderTemplate.bind(this, this.cardsCollection.mode.level))
        }
    }

    wrongAnser(cardClicker) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.clickedCards.forEach(el => {
                    el.addEventListener('click', cardClicker)
                    cardsView.flipChoosedCard(el.children);
                })
                resolve(null)
            }, 800)
        })
    }

}

const app = new App()
window.test = app;