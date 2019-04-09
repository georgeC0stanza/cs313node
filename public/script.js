// hardcoded because sessions don't work!
const userID = 2;

/******************************************************
 * gets all stored flashcards and inserts them in the the document
 */
function getAllCards(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      console.log(this.responseText);
      var cards = document.getElementById("cardlist");
      cards.innerHTML = "";

      obj['cards'].forEach(function (card) {
        var button = document.createElement("INPUT");
        var span = document.createElement("INPUT");

        button.setAttribute("type", "button");
        button.setAttribute("onclick", `viewDetails('${card['id']}')`);
        button.setAttribute("value", `${card['cardtext_front']}`);
        button.setAttribute("class", "card_button");
        cards.appendChild(button);

        cards.appendChild( document.createTextNode( '\u00A0' ) );

        span.setAttribute("type", "button");
        span.setAttribute("id", "back" + card['id']);
        span.setAttribute("onclick", `hide('back' + '${card['id']}')`);
        span.setAttribute("class", "card_button");
        cards.appendChild(span);
        cards.appendChild(document.createElement("br"));
        cards.appendChild(document.createElement("br"));
      });
    }
  };
  xhttp.open("POST","/cards", true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send(`id=${userID}`);
}
 
/******************************************************
 * adds a new card to the system
 */
function add() {
  var cardtext_front = document.getElementById('cardtext_front').value;
  var cardtext_back = document.getElementById('cardtext_back').value;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      getAllCards();
    }
  };
  xhttp.open("POST", "/add_card", true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send( `&cardtext_front=${cardtext_front}` + `&cardtext_back=${cardtext_back}`);

}
 
/******************************************************
 * displays the back of a flash card
 */
 function viewDetails(card_id) {
   console.log(card_id);
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
       console.log(this.responseText);
       var obj = JSON.parse(this.responseText);
       console.log(obj.cards[0].cardtext_back);

       document.getElementById("back" + card_id).setAttribute("value", obj.cards[0].cardtext_back);
     }
   };
   xhttp.open("POST", "/cardBacks", true);
   xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   xhttp.send(`i=${card_id}`);
 }

 /******************************************************
 * hides the back of a flashcard
 */
 function hide(id){
  var back = document.getElementById(id);
  back.setAttribute("value", "     ");
}
