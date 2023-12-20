//affichage de touts les utilisateurs
function username(occurence) {
    const searchbar = document.getElementById("user")
    const url = window.location.search
    const urlParams = new URLSearchParams(url)
    const usr = urlParams.get('user')
    fetch("http://localhost:8000/joueur/")
        .then(response => response.json())
        .then(data => {
            //Récuperation de données utilisation et affichage
            data.forEach(function (objet) {
                if (objet.id_joueur == usr) {
                    const user = objet.nom_utilisateur
                    if(occurence == 0){
                        searchbar.append(" " + user + " !");
                    }
                    fetch(`http://localhost:8000/otherUser/${usr}`)
                    .then(response => response.json())
                    .then(data => {
                    data.forEach(function (objet) {
                        const li = document.createElement("li")
                        const ul = document.createElement("ul");
                        li.setAttribute("id",objet.id_joueur)
                        
                        for (const [key, value] of Object.entries(objet)) {
                            
                            if(key != "id_joueur"){
                            const propertyLi = document.createElement("li");
                            propertyLi.textContent = `${key} : ${value}`;
                    
                            
                            ul.appendChild(propertyLi);}
                        }
                    
                        
                        li.setAttribute("onclick",`affichageProfil(${objet.id_joueur})`)
                        li.appendChild(ul);
                    
                        
                        document.getElementById("joueur").appendChild(li);
                        document.getElementById("joueur").appendChild(li);
            });
        })
                }

            });
        })
        .catch(error => console.error('Erreur lors de la requête API :', error));
}

//Gestion de la recherche
const btSearch = document.getElementById("research");
btSearch.addEventListener("click",(event)=> {event.preventDefault(); search()});
//Gestion des filtre
const btSubmitFiltre = document.getElementById("btnFilter");
btSubmitFiltre.addEventListener("click",(event)=> {event.preventDefault(); filtre()});

//Même fonction que username mais pour la recherche
function search(){
    eraser();
    const url = new URL(window.location.href);
    const Params = new URLSearchParams(url.search)
    const usr = Params.get('user')
    const search = document.getElementById("search").value
    const newUrl = window.location.pathname + `?user=${usr}&search=${search}`;
    history.pushState({ path: newUrl }, "", newUrl);
    if(search.trim()===''){
        username(1);
    }else{
    fetch(`http://localhost:8000/search/${usr}&${search}`)
    .then(response => response.json())
    .then(data => {
    data.forEach(function (objet) {
            const li = document.createElement("li");
            const ul = document.createElement("ul");
           
            for (const [key, value] of Object.entries(objet)) {
                
                if(key != "id_joueur"){
                    const propertyLi = document.createElement("li");
                    propertyLi.textContent = `${key} : ${value}`;
            
                    
                    ul.appendChild(propertyLi);}
                }

            
            li.appendChild(ul);
            li.setAttribute("onclick",`affichageProfil(${objet.id_joueur})`)
            li.setAttribute("id",objet.id_joueur)

            
            document.getElementById("joueur").appendChild(li);
});
})
.catch((error) => console.error('Erreur lors de la requête API :', error));
}}
// Même fonction que username mais pour le filtre
function filtre(){
    eraser();
    const url = new URL(window.location.href);
    const Params = new URLSearchParams(url.search)
    console.log(Params)
    const usr = Params.get('user')
    const localisation = document.getElementById("localisation").value
    const com = document.getElementById("com").value
    const rank = document.getElementById("list_rank").value
    const circuit = document.getElementById("circuit").value
    const cars = document.getElementById("cars").value
    const controleur = document.getElementById("controleur").value
    const newUrl = window.location.pathname+`?user=${usr}&localisation=${localisation}&com=${com}&rank=${rank}&circuit=${circuit}&cars=${cars}&controleur=${controleur}`;
    console.log(newUrl)
    history.pushState({ path: newUrl }, "", newUrl);
    fetch(`http://localhost:8000/filter/${usr}&${localisation}&${com}&${rank}&${circuit}&${cars}&${controleur}`)
    .then(response => response.json())
    .then(data => {
    data.forEach(function (objet) {
            const li = document.createElement("li");
            const ul = document.createElement("ul");

            
            for (const [key, value] of Object.entries(objet)) {
                
                if(key != "id_joueur"){
                    const propertyLi = document.createElement("li");
                    propertyLi.textContent = `${key} : ${value}`;
            
                    
                    ul.appendChild(propertyLi);}
            }
            li.setAttribute("id",objet.id_joueur)
            li.setAttribute("onclick",`affichageProfil(${objet.id_joueur})`)
            li.appendChild(ul);

            
            document.getElementById("joueur").appendChild(li);
});
})
.catch((error) => console.error('Erreur lors de la requête API :', error));
}
//gestion du bouton filtre
const btFilter = document.getElementById("btFiltre");
const filterList = document.getElementById("filtre");
filterList.style.display = "none";
//affichage et non affichage des filtres
btFilter.addEventListener("click",()=>{
    if(getComputedStyle(filterList).display != "none"){
        filterList.style.display = "none";
    }else{
        filterList.style.display = "flex";
    }
})
//Gestion du bouton profil
const btnProfil = document.getElementById("profil")
btnProfil.addEventListener("click",(event)=>{event.preventDefault();affichageProfil(0)});

//fonction affichage profil
function affichageProfil(data){
    if(data == 0){
        const url = window.location.search
        const urlParams = new URLSearchParams(url)
        const usr = urlParams.get('user')
        window.location.href=`http://127.0.0.1:8081/profil.html/?user=${usr}`
    }else{
        window.location.href=`http://127.0.0.1:8081/profil.html/?user=${data}`
    }

}

//fonction pour effacer le contenu
function eraser(){
    const joueur = document.getElementById("joueur");
    while (joueur.hasChildNodes()) {
        joueur.removeChild(joueur.firstChild);
      }
}
//appel des niveaux
function callNiveau() {
    fetch("http://localhost:8000/niveaux")
    .then(response => response.json())
    .then(data => {
    // 'data' est l'objet JavaScript obtenu à partir de la réponse JSON
    data.forEach(function(objet) {
        const createNiveau = document.createElement("option")
        createNiveau.append(objet.rang)
        createNiveau.setAttribute("value",objet.id_niveau)
        document.getElementById('list_rank').appendChild(createNiveau)
        
    });
  })
  .catch(error => console.error('Erreur lors de la requête API :', error));  
}
//appel des pays
function callPays() {
    fetch("http://localhost:8000/pays")
    .then(response => response.json())
    .then(data => {
    // 'data' est l'objet JavaScript obtenu à partir de la réponse JSON
    data.forEach(function(objet) {
        const createPays = document.createElement("option")
        createPays.append(objet.pays)
        createPays.setAttribute("value",objet.id_localisation)
        document.getElementById('localisation').appendChild(createPays)
        
    });
  })
  .catch(error => console.error('Erreur lors de la requête API :', error));  
}
//appel des circuits
function callCircuit() {
    fetch("http://localhost:8000/circuit")
    .then(response => response.json())
    .then(data => {
    // 'data' est l'objet JavaScript obtenu à partir de la réponse JSON
    data.forEach(function(objet) {
        const createCircuit = document.createElement("option")
        createCircuit.append(objet.nom_circuit)
        createCircuit.setAttribute("value",objet.id_circuit)
        document.getElementById('circuit').appendChild(createCircuit)
        
    });
  })
  .catch(error => console.error('Erreur lors de la requête API :', error));

}
//appel des voitures
function callCars() {
    fetch("http://localhost:8000/cars")
    .then(response => response.json())
    .then(data => {
    // 'data' est l'objet JavaScript obtenu à partir de la réponse JSON
    data.forEach(function(objet) {
        const createCars = document.createElement("option")
        createCars.append(objet.nom_vehicule)
        createCars.setAttribute("value",objet.id_vehicule)
        document.getElementById('cars').appendChild(createCars)
        
    });
  })
  .catch(error => console.error('Erreur lors de la requête API :', error));                    
}
//appel des controleurs
function callControleur() {
    fetch("http://localhost:8000/controleur")
    .then(response => response.json())
    .then(data => {
    // 'data' est l'objet JavaScript obtenu à partir de la réponse JSON
    
    data.forEach(function(objet) {
        const createControleur = document.createElement("option")
        createControleur.append(objet.reference_controleur)
        createControleur.setAttribute("value",objet.id_controleur)
        document.getElementById('controleur').appendChild(createControleur)
    });
  })
  .catch(error => console.error('Erreur lors de la requête API :', error));  
}

//appel des fonctions au démarage
window.onload = username(0),callCars(),callCircuit(),callControleur(),callNiveau(),callPays()
