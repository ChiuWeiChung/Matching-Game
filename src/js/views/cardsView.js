const template = document.querySelector('.card__template');
const timeElement = document.querySelector('.timer');
const timer = document.querySelector('.timer');



export const renderLoading = () => {
    template.innerHTML = `<div class="loader">Loading...</div>`;
}
export const renderError = (error) => {
    template.innerHTML = `<h1 style=color:orangered>${error}</h1>`;
}

export const initTemplate = () => {
    template.innerHTML = ``;
    timeElement.innerHTML = "";
}


export const clearTimer = (idArr) => {
    console.log(idArr);
    while (idArr.length) {
        clearTimeout(idArr.pop());
    }
}

export const renderCards = collection => {
    const loopTime = collection.length;
    for (let i = 0; i < loopTime; i++) {
        let card = collection.splice(Math.floor(Math.random() * collection.length), 1)
        let markup = `
            <div class="card-${i + 1} card">
                <div class="card__side card__side--front">
                    <img src=${card[0].url} alt="">
                </div>
                <div class="card__side card__side--back">
                </div>
            </div>
            `;
        template.insertAdjacentHTML('beforeend', markup)
    }
}

export const renderModal = (level, topic) => {
    let markup = `
        <div class="card__modal">
            <h1>${level.toUpperCase()} MODE</h1>
            <h3>${topic.toUpperCase()} TOPIC</h3>
            <button class="modal__button startBtn">Start</button>
        </div>`;

    template.insertAdjacentHTML('afterbegin', markup);
    return document.querySelector('.startBtn');
}

export const removeModal = (btn) => {
    const modal = document.querySelector('.card__modal');
    if (modal) modal.classList.toggle('dismiss');
    // SartButton can only be clicked once
    document.querySelector('.startBtn').removeEventListener('click', btn)
}

export const renderWinningModal = () => {
    const modal = document.querySelector('.card__modal');
    modal.classList.add('delay');
    modal.classList.toggle('dismiss');
    modal.innerHTML = `
        <h1>Congratulations!</h1>
        <button class="modal__button restartBtn">Restart <img src='img/loop2.png' style=width:1.2rem></button>
        `
}

export const flipAllCards = () => {
    const allCards = document.querySelectorAll('.card');
    if (allCards.length) {
        allCards.forEach((el) => {
            el.children[0].classList.toggle('flipfrontcard')
            el.children[1].classList.toggle('flipbackcard')
        })
    };
    return allCards;
}

export const flipChoosedCard = (choosedCard) => {
    choosedCard[0].classList.toggle('flipfrontcard')
    choosedCard[1].classList.toggle('flipbackcard')
}

export const renderTimer = (timerId,showingTime) => {
    return new Promise((resolve) => {
        for (let i = showingTime; i >= 0; i--) {
            const id = setTimeout(() => {
                timer.innerText = i;
                // =====when time's up, flip over all cards=====
                if (i === 0) {
                    timer.innerText = '';
                    const allCards = flipAllCards();
                    resolve(allCards)
                }
            }, 1000 * (showingTime - i));
            timerId.push(id)
        }

    })
}
