
function username(occurence) {
    const searchbar = document.getElementById("user")
    const url = window.location.search
    const urlParams = new URLSearchParams(url)
    const usr = urlParams.get('user')
    fetch("http://localhost:8000/joueur/")
        .then(response => response.json())
        .then(data => {
            // Supposons que 'usr' est l'id_joueur que tu recherches
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

                        // Itère sur les propriétés de l'objet
                        for (const [key, value] of Object.entries(objet)) {
                            // Crée un élément de liste (li) pour chaque propriété
                            const propertyLi = document.createElement("li");
                            propertyLi.textContent = `${value}`;
                    
                            // Ajoute l'élément de liste de propriété à la liste non ordonnée
                            ul.appendChild(propertyLi);
                        }
                    
                        // Ajoute la liste non ordonnée à l'élément li
                        li.appendChild(ul);
                    
                        // Ajoute l'élément li à la liste existante dans l'élément avec l'id "joueur"
                        document.getElementById("joueur").appendChild(li);
                        document.getElementById("joueur").appendChild(li);
            });
        })
                }

            });
        })
        .catch(error => console.error('Erreur lors de la requête API :', error));
}

const btSearch = document.getElementById("research");
btSearch.addEventListener("click",(event)=> {event.preventDefault(); search()});

const btSubmitFiltre = document.getElementById("btnFilter");
btSubmitFiltre.addEventListener("click",(event)=> {event.preventDefault(); filtre()});

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

            // Itère sur les propriétés de l'objet
            for (const [key, value] of Object.entries(objet)) {
                // Crée un élément de liste (li) pour chaque propriété
                const propertyLi = document.createElement("li");
                propertyLi.textContent = `${value}`;

                // Ajoute l'élément de liste de propriété à la liste non ordonnée
                ul.appendChild(propertyLi);
            }

            // Ajoute la liste non ordonnée à l'élément li
            li.appendChild(ul);

            // Ajoute l'élément li à la liste existante dans l'élément avec l'id "joueur"
            document.getElementById("joueur").appendChild(li);
});
})
.catch((error) => console.error('Erreur lors de la requête API :', error));
}}

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

            // Itère sur les propriétés de l'objet
            for (const [key, value] of Object.entries(objet)) {
                // Crée un élément de liste (li) pour chaque propriété
                const propertyLi = document.createElement("li");
                propertyLi.textContent = `${value}`;

                // Ajoute l'élément de liste de propriété à la liste non ordonnée
                ul.appendChild(propertyLi);
            }

            // Ajoute la liste non ordonnée à l'élément li
            li.appendChild(ul);

            // Ajoute l'élément li à la liste existante dans l'élément avec l'id "joueur"
            document.getElementById("joueur").appendChild(li);
});
})
.catch((error) => console.error('Erreur lors de la requête API :', error));
}

const btFilter = document.getElementById("btFiltre");
const filterList = document.getElementById("filtre");
filterList.style.display = "none";
btFilter.addEventListener("click",()=>{
    if(getComputedStyle(filterList).display != "none"){
        filterList.style.display = "none";
    }else{
        filterList.style.display = "flex";
    }
})


function eraser(){
    const joueur = document.getElementById("joueur");
    while (joueur.hasChildNodes()) {
        joueur.removeChild(joueur.firstChild);
      }
}

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
window.onload = username(0),callCars(),callCircuit(),callControleur(),callNiveau(),callPays()
