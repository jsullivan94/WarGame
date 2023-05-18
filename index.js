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
    document.querySelector('#winner').innerHTML = ''
document.querySelector('#winlose').innerHTML = ''



    let card1 = player1Pile[0]
    let card2 = player2Pile[0]
    let p1War1 = player1Pile[1]
    let p1War2 = player1Pile[2]
    let p2War1 = player2Pile[1]
    let p2War2 = player2Pile[2]
    
   
    let imageTag1 = document.querySelector('#card-imageOne')
    imageTag1.src = card1.image

    let imageTag2 = document.querySelector('#card-imageTwo')
    imageTag2.src = card2.image

    let p1War1Tag = document.querySelector('#p1war1')
    let p1War2Tag = document.querySelector('#p1war2')

    let p2War1Tag = document.querySelector('#p2war1')
    let p2War2Tag = document.querySelector('#p2war2')



    p1War1Tag.src = ''
    p1War2Tag.src = ''
    p2War1Tag.src = ''
    p2War2Tag.src = ''

    
   if (card1.value > card2.value) {
        player1Pile.push(card1, card2);
        player1Pile.splice(0, 1)
        player2Pile.splice(0, 1)

        // document.querySelector('#winlose').innerHTML = 'You won this hand!'

        } else if (card1.value < card2.value) {
            player2Pile.push(card1, card2)
            player1Pile.splice(0, 1)
            player2Pile.splice(0, 1)

            // document.querySelector('#winlose').innerHTML = 'You lost this hand!'

            } else {
                document.querySelector('#winner').innerHTML = 'WAR!'

                p1War1Tag.src = p1War1.image
                p1War2Tag.src = p1War2.image

                p2War1Tag.src = p2War1.image
                p2War2Tag.src = p2War2.image

            
                if (p1War1.value > p1War2.value) {
                    player1Pile.push(card1, card2, p1War1, p1War2, p2War1, p2War2);
                    player1Pile.splice(0, 3)
                    player2Pile.splice(0, 3)
                    } else {
                        player2Pile.push(card1, card2, p1War1, p1War2, p2War1, p2War2)
                        player1Pile.splice(0, 3)
                        player2Pile.splice(0, 3)
                    };
    
};
document.querySelector('#player1counter').innerHTML = (player1Pile.length.toString())
document.querySelector('#player2counter').innerHTML = (player2Pile.length.toString())
};







document.querySelector('#newgame-button').addEventListener('click', () => {
    war()
    let imageTag1 = document.querySelector('#card-imageOne')
    imageTag1.src = ""

    
    let imageTag2 = document.querySelector('#card-imageTwo')
    imageTag2.src = ""

});
   

document.querySelector('#draw-button').addEventListener('click', () => drawCard());


war();