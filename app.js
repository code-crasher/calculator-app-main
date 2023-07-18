const SUITS = ["♠","♣","♦","♥"];
const RANKS = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
const VALUE_MAP = {
    "2":2,
    "3":3,
    "4":4,
    "5":5,
    "6":5,
    "7":6,
    "8":8,
    "9":9,
    "10":10,
    "J":10,
    "Q":10,
    "K":10,
    "A":11
}

class Deck{
    constructor(_cards = newDeck()){
        this.cards = _cards
}
    get numberOfCards(){
        return this.cards.length
    }
    shuffleCards(){
         for(let i = 0; i<this.numberOfCards-1; i++){
            const newIndex = Math.floor(Math.random() * (i+1))
            const oldIndex = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldIndex
         }
    }
    Pop(){
        this.cards.shift()
    }
}

class Card{
    constructor(_suit,_rank){
        this.suit = _suit
        this.rank = _rank
    }
}

function newDeck(){
    return SUITS.flatMap(_suits =>{
        return RANKS.map(_ranks =>{
            return new Card(_suits,_ranks)
        })
    }
    )
}


function deckSum(cardOne,cardTwo){
    return VALUE_MAP[cardOne.rank] + VALUE_MAP[cardTwo.rank]
}

const deck = new Deck();
let myCard;
let myCardOne;
deck.shuffleCards();

console.log(deck);

function firstCard() {
    for(let i=0;i<1;i++){
    myCard = deck.cards.shift(); 

    console.log(myCard);
}
    
}

function secondCard() {
    for(let i=0;i<1;i++){
    myCardOne = deck.cards.shift(); 

    console.log(myCardOne);
}
    
}

function CardPick(){
  firstCard();
    secondCard();
    
    console.log(deckSum(myCard, myCardOne));
}

CardPick();
CardPick();
CardPick();
CardPick()
