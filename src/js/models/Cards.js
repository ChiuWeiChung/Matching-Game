import * as axios from '../axios/axios';

class Cards {
    mode = { level: "easy", cardsNumber: 8, showingTime: 5 };
    cards = [];
    error = null;

    fetchCards(key) {
        return new Promise((resolve, reject) => {
            axios.instance.get(`/?query=${key}`).then(res => {
                if (!res.data.total) throw new Error(`Your search -${key} - did not match any documents.`)
                this.cards = [];
                res.data.results.forEach(el => {
                    this.cards.push({ id: el.id, url: el.urls.thumb });
                    this.cards.push({ id: el.id, url: el.urls.thumb });
                });
                resolve('success')
            }).catch(error => {
                this.error = error.message;
                reject(this.error)
            })

        })
    }


    setMode(mode) {
        this.mode.level = mode;
        this.mode.cardsNumber = 8;
        this.mode.showingTime = 4;


        if (mode === 'regular') {
            this.mode.cardsNumber = 16;
            this.mode.showingTime = 6;
        }
        if (mode === 'hard') {
            this.mode.cardsNumber = 24;
            this.mode.showingTime = 10;
        }
        return this.cards.slice(0, this.mode.cardsNumber);
    }





}

export default Cards;