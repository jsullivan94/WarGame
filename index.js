let cardImage1 = ""
let cardImage2 = ""
let player1Pile = []
let player2Pile = []

function war() {
fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=0')
.then(resp => resp.json())
.then(data => {
    let deckId = data.deck_id
    
   

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=26`)
        .then(resp => resp.json())
        .then(data1 => {
        player1Pile = data1.cards
        cardImage1 = player1Pile[0].image
    
    
        rendercard(data1)
   

    
    });

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=26`)
        .then(resp => resp.json())
        .then(data2 => {
    
        player2Pile = data2.cards
        cardImage2 = player2Pile[0].image  
   
        rendercard(data2)
    });

});
};

function rendercard() {
   
        imageTag1 = document.querySelector('#card-imageOne')
        imageTag1.src = cardImage1

        
        imageTag2 = document.querySelector('#card-imageTwo')
        imageTag2.src = cardImage2
        
}


function drawCard() {
    let card1 = player1Pile[0]
    let card2 = player2Pile[0]

    imageTag1 = document.querySelector('#card-imageOne')
    imageTag1.src = card1.image

    
    imageTag2 = document.querySelector('#card-imageTwo')
    imageTag2.src = card2.image


    if (card1.value > card2.value) {
        player1Pile.push(card1, card2);
        player1Pile.splice(0, 1)
        player2Pile.splice(0, 1)
        document.querySelector('#win').innerHTML = 'You won this hand!'
    } else {
        player2Pile.push(card1, card2)
        player1Pile.splice(0, 1)
        player2Pile.splice(0, 1)
        document.querySelector('#lose').innerHTML = 'You lost this hand!'
        }
       
        

    
}






document.querySelector('#newgame-button').addEventListener('click', () => war())
   

document.querySelector('#draw-button').addEventListener('click', () => drawCard())

console.log(player1Pile)
console.log(player2Pile)