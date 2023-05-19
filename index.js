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
    });


    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=26`)
        .then(resp => resp.json())
        .then(data2 => {
        player2Pile = data2.cards
    });

});
};



function drawCard() {
    
    document.querySelector('#war').innerHTML = ''
    document.querySelector('#winlose').innerHTML = ''



    let card1 = player1Pile[0]
    let card2 = player2Pile[0]
    let p1War1 = player1Pile[1]
    let p1War2 = player1Pile[2]
    let p2War1 = player2Pile[1]
    let p2War2 = player2Pile[2]
    
   
    let imageTag1 = document.querySelector('#card-imageOne')
    let imageTag2 = document.querySelector('#card-imageTwo')
    let p1War1Tag = document.querySelector('#p1war1')
    let p1War2Tag = document.querySelector('#p1war2')
    let p2War1Tag = document.querySelector('#p2war1')
    let p2War2Tag = document.querySelector('#p2war2')

    imageTag1.src = card1.image
    imageTag2.src = card2.image
    p1War1Tag.src = ''
    p1War2Tag.src = ''
    p2War1Tag.src = ''
    p2War2Tag.src = ''

    let card1Value = card1.value
    let card2Value = card2.value

    if (card1Value === 'JACK') {
        card1Value = 12
    } else if (card1Value === 'QUEEN') {
        card1Value = 13
    } else if (card1Value === 'KING') {
        card1Value = 14
    } else if (card1Value === 'ACE') {
        card1Value = 15
    }

    if (card2Value === 'JACK') {
        card2Value = 12
    } else if (card2Value === 'QUEEN') {
        card2Value = 13
    } else if (card2Value === 'KING') {
        card2Value = 14
    } else if (card2Value === 'ACE') {
        card2Value = 15
    }

    // const cardValueObject = {
    //     'JACK' : 12,
    //     'QUEEN' : 13,
    //     'KING' : 14,
    //     'ACE' : 15,}
    // //     if (card1Value === key) {
    //         card1Value = cardValueObject[key];
    //     }   if (card2Value === key) {
    //         card2Value = cardValueObject[key]; 
    // }
    
   if (card1Value > card2Value) {
        player1Pile.push(card1, card2);
        player1Pile.splice(0, 1)
        player2Pile.splice(0, 1)

       

    } else if (card1Value < card2Value) {
            player2Pile.push(card1, card2)
            player1Pile.splice(0, 1)
            player2Pile.splice(0, 1)

           

    } else {
                document.querySelector('#war').innerHTML = 'WAR!'

                p1War1Tag.src = p1War1.image
                p1War2Tag.src = p1War2.image

                p2War1Tag.src = p2War1.image
                p2War2Tag.src = p2War2.image

            
                if (p1War2.value > p2War2.value) {
                    player1Pile.push(card1, card2, p1War1, p1War2, p2War1, p2War2);
                    player1Pile.splice(0, 3)
                    player2Pile.splice(0, 3)
                    document.querySelector('#winlose').innerHTML = 'Player 1 won the war!'
                } else {
                        player2Pile.push(card1, card2, p1War1, p1War2, p2War1, p2War2)
                        player1Pile.splice(0, 3)
                        player2Pile.splice(0, 3)
                        document.querySelector('#winlose').innerHTML = 'Player 2 won the war!'
                };
    
};
document.querySelector('#player1counter').innerHTML = 'Player 1 Cards: ' + (player1Pile.length.toString())
document.querySelector('#player2counter').innerHTML = 'Player 2 Cards: ' + (player2Pile.length.toString())

checkWin()
};


function checkWin() {
if (player1Pile.length === 52) {
    alert('Player 1 wins!')
} else if (player2Pile.length === 52) {
    alert('Player 2 wins!')
    
}
}





document.querySelector('#newgame-button').addEventListener('click', () => {
    war()
    let imageTag1 = document.querySelector('#card-imageOne')
    let imageTag2 = document.querySelector('#card-imageTwo')
    let p1War1Tag = document.querySelector('#p1war1')
    let p1War2Tag = document.querySelector('#p1war2')
    let p2War1Tag = document.querySelector('#p2war1')
    let p2War2Tag = document.querySelector('#p2war2')

    imageTag1.src = ""
    imageTag2.src = ""
    p1War1Tag.src = ''
    p1War2Tag.src = ''
    p2War1Tag.src = ''
    p2War2Tag.src = ''

    document.querySelector('#bet-display').textContent = ''
    document.querySelector('#player1counter').innerHTML = 'Player 1 Cards: 26'
    document.querySelector('#player2counter').innerHTML = 'Player 2 Cards: 26'
    document.querySelector('#war').innerHTML = ''
    document.querySelector('#winlose').innerHTML = ''

});
   

document.querySelector('#draw-button').addEventListener('click', () => drawCard());


document.querySelector('#bet-form').addEventListener('submit', (event) => {
    event.preventDefault()
    
    document.querySelector('#bet-display').textContent = ('$' + document.querySelector('#bet').value)
    document.querySelector('#bet-form').reset()
})




war();