//affichage de toutes les données utilisateurs
function username() {
    const name = document.getElementById("name")
    const birth = document.getElementById("birth")
    const pays = document.getElementById("pays")
    const level = document.getElementById("level")
    const circuit = document.getElementById("circuit")
    const cars = document.getElementById("cars")
    const controleur = document.getElementById("controleur")
    const com = document.getElementById("com")
    const url = window.location.search
    const urlParams = new URLSearchParams(url)
    const usr = urlParams.get('user')
    fetch("http://localhost:8000/joueur/")
        .then(response => response.json())
        .then(data => {
            
            data.forEach(function (objet) {
                if (objet.id_joueur == usr) {
                    name.append("Nom d'utilisateur : "+objet.nom_utilisateur);
                    birth.append("Date de naissance : "+objet.birthday)
                    pays.append("Localisation : "+objet.pays+" , "+objet.continent)
                    level.append("Niveau : "+objet.niveau_jeu+", Rang : "+objet.rang)
                    circuit.append("Circuit : "+objet.nom_circuit+" , "+objet.longueur+"KM, Sens : "+objet.sens)
                    cars.append("Marque : "+objet.marque+" Nom : "+objet.nom_vehicule+" "+objet.puissance+"HP Année de sortie : "+objet.annee+" , Type de véhicule : "+objet.type)
                    controleur.append("Type de controleur : "+objet.type_controleur+" "+objet.reference_controleur+", Pédalier : "+objet.reference_pedalier+", Boite de vitesse : "+objet.reference_boite_de_vitesse+", frein à main : "+objet.reference_frein_a_main)
                    com.append("Mode de communication : "+objet.systeme_communication)
                               
        }})})
        .catch(error => console.error('Erreur lors de la requête API :', error));
}
//Gestion du bouton déconnexion
const btnDeco = document.getElementById("deconnection");
btnDeco.addEventListener("click",(event)=> {event.preventDefault(); deconnection()})

//Renvoie à la page de connexion
function deconnection(){
    window.location.href='http://127.0.0.1:8081/connection.html'
}

//Gestion du bouton retour
const btnRetour = document.getElementById("menu");
btnRetour.addEventListener("click",(event)=> {event.preventDefault(); menu()})
//renvoie à la page d'accueil
function menu(){
    const url = window.location.search
    const urlParams = new URLSearchParams(url)
    const usr = urlParams.get('user')
    window.location.href=`http://127.0.0.1:8081/home.html/?user=${usr}`
}
//Gestion du bouton de suppression
const btnDelete = document.getElementById("delete");
btnDelete.addEventListener("click",(event)=>{event.preventDefault();deleteAccount()});
//Suppression de l'utilisateur
function deleteAccount(){
    const url = window.location.search
    const urlParams = new URLSearchParams(url)
    const user = urlParams.get('user')
    console.log(user)
    fetch(`http://localhost:8000/delete/${user}`)
    .then(
        window.location.href='http://127.0.0.1:8081/index.html'
    )
    .catch(error => console.error('Erreur lors de la requête API :', error));
}

//Affichage des données dès l'ouverture de la page
window.onload = username(0)