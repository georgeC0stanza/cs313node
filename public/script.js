/*************************************************************************************
 * UI.PHP login/sign up page functions
 *************************************************************************************/

/***************************************************************
 * validate passwords
 */
function validate_passwords(){
    var pass1 = document.getElementById("create_password").value;
    var pass2 = document.getElementById("create_password2").value;

    if (pass1 === pass2)
    {
        document.getElementsByName('password_validation')[0].textContent = "";
            expValidation = true;
    } else {
            document.getElementsByName('password_validation')[0].textContent = "Passwords do not match!";
            expValidation = false;
    }
}

/***************************************************************
 * sends login information to the server
 */
function login(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var isreturn = false;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState>3 && xhttp.status==200) { 
            //alert("logged in!");
            isreturn = true;
        }
        else if (xhttp.status >= 500) { 
            alert("Sorry the provided credentials are incorrect.");
        }
        else if (xhttp.status >= 300) { 
            alert("error logging in!");
        }
    };
    xhttp.open("POST",  "signin.php", false);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("username=" + username + "&password=" + password);
    return isreturn;
}

/***************************************************************
 * sends new account information to the server to create that account
 */
function newAccount(){
    var username = document.getElementById("create_username").value;
    var password = document.getElementById("create_password").value;
    var password2 = document.getElementById("create_password2").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState>3 && xhttp.status==200) { 
            alert("Congratulations! Your account has been created!");
        }
        else if (xhttp.status == 599) { 
            alert("Sorry you passwords don't match!");
        }
        else if (xhttp.status >= 300) { 
            alert("Sorry your account cannot be created currently; please try again later.");
        }
    };
    xhttp.open("POST",  "signup.php", false);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("username=" + username + "&password=" + password + "&password2=" + password2);
    return false;
}






/*************************************************************************************
 * CARDS.PHP: page of cards functions
 *************************************************************************************/


/***************************************************************
 * sends a request to add a new card to the database
 */
function addNewCard(){
    new_front = document.getElementById("new_front").value;
    new_back = document.getElementById("new_back").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState>3 && xhttp.status==200) { 
            alert("card added!");
        }
        if (xhttp.status >= 300) { 
            alert("error adding card!");
        }
    };
    xhttp.open("POST",  "addcard.php", false);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("new_front=" + new_front + "&new_back=" + new_back);
    return true;
 }



 
 /***************************************************************
 * toggles each card flip
 */
 function flipcard(card_id) {
    var x = document.getElementById(card_id);
    if (x.style.visibility === 'hidden') {
      x.style.visibility = 'visible';
    } else {
      x.style.visibility = 'hidden';
    }
 } 
 

const baseURL = "/cards";
const userID = 2;


 function getAllCards(){
  var searchURL = "/cards" + `&id=${userID}`;
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
       var obj = JSON.parse(this.responseText);
       var cards = document.getElementById("cardlist");
       obj['cards'].forEach(function (card) {
         var button = document.createElement("BUTTON");
         var span = document.createElement("SPAN");

         button.setAttribute("onclick", `viewDetails('${card['id']}')`);
         button.setAttribute("value", `${card['cardtext_front']}`);
         
         cards.appendChild(button);

         span.setAttribute("class", card[id]);
         cards.appendChild(span);
       });
     }
   };
   xhttp.open("POST", searchURL, true);
   xhttp.send();
 
 }

 function add() {
  var cardtext_front = document.getElementById('cardtext_front').value;
  var cardtext_back = document.getElementById('cardtext_back').value;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      /*var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var obj = JSON.parse(this.responseText);
          var list = document.getElementById("results");
          list.innerHTML = "";
    
          obj['cards'].forEach(function (card) {
            var item = document.createElement("li");
            var form = `<form action="" method="get">
              <input type="button" onclick="viewDetails('${card['cardtext_front']}')" value="${card['cardtext_front']}">
            </form>`
            item.innerHTML = card["Title"] + form;
            list.appendChild(item);
          });
        }
      };
      xhttp.open("POST", "/cards", true);
      xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhttp.send( 'id=2');
    }*/
    getAllCards();
  };
  xhttp.open("POST", "/add_card", true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send( `&cardtext_front=${cardtext_front}` + `&cardtext_back=${cardtext_back}`);
}
 
 function viewDetails(id) {
   console.log(id);
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
       console.log(this.responseText);
       var obj = JSON.parse(this.responseText);
       /*
       var list = document.getElementById("results");
       list.innerHTML = "";
 
       obj['cards'].forEach(function (card) {
         var item = document.createElement("li");
         var form = `<form action="" method="get">
           <input type="button" onclick="viewDetails('${card['cardtext_front']}')" value="${card['cardtext_front']}">
         </form>`
         item.innerHTML = card["Title"] + form;
         list.appendChild(item);
       });
       */

       /*var obj = JSON.parse(this.responseText);
       var list = document.getElementById("results");
       list.innerHTML = "";
 
       obj['Search'].forEach(function (movie) {
         var item = document.createElement("li");
         var form = `<form action="" method="get">
           <input type="button" onclick="viewDetails('${movie['imdbID']}')" value="view details">
         </form>`
         item.innerHTML = movie["Title"] + form;
         list.appendChild(item);
       });*/
     }
   };
   xhttp.open("POST", "/cardBacks", true);
   xhttp.send(`i=${id}`);
 }