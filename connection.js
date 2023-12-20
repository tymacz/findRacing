//Gestion du bouton connection
const btn = document.getElementById("connect")
btn.addEventListener("click",(event)=> {event.preventDefault(); connexion()});
//Gestion de la connexion
function connexion() {
    const usr = document.getElementById("usrname").value
    const pswd = document.getElementById("pswd").value
    console.log(usr,pswd);
  fetch(`http://localhost:8000/connection/${usr}&${pswd}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
      data.forEach(function(Object){
        if(pswd == Object.password){
             const idUser = Object.id_joueur
            window.location.href=`http://127.0.0.1:8081/home.html/?user=${idUser}`
        }else{
            console.log("degage")
        }
      });
      
    })
    .catch((error) => console.error("Erreur lors de la requête API :", error));
}
//Gestion du bouton inscription
const btnInsc = document.getElementById("inscription");
btnInsc.addEventListener("click",(event)=> {event.preventDefault(); inscription()})
//Retour à l'inscription
function inscription(){
  window.location.href='http://127.0.0.1:8081/index.html'
}

