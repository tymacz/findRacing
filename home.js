function username() {
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
                    searchbar.append(" " + user + " !");
                    fetch(`http://localhost:8000/joueur/${usr}`)
                    .then(response => response.json())
                    .then(data => {
                    //console.log(data)
                    data.forEach(function (objet) {
                        const li = document.createElement("li")
                        const ul = document.createElement("ul");

                        // Itère sur les propriétés de l'objet
                        for (const [key, value] of Object.entries(objet)) {
                            // Crée un élément de liste (li) pour chaque propriété
                            const propertyLi = document.createElement("li");
                            propertyLi.textContent = `${key}: ${value}`;
                    
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

const bt = document.getElementById("research");
bt.addEventListener("click",(event)=> {event.preventDefault(); search()});

function search(){
    eraser();
    const url = window.location.search
    const urlParams = new URLSearchParams(url)
    const usr = urlParams.get('user')
    const search = document.getElementById("search").value
    document.location.replace(`http://127.0.0.1:8081/home.html/?user=${usr}&?search=${search}`);
    fetch(`http://localhost:8000/joueur/${usr}&${search}`)
    .then(response => response.json())
    .then(data => {
    console.log(data)
    data.forEach(function (objet) {
        const li = document.createElement("li")
        const ul = document.createElement("ul");

        // Itère sur les propriétés de l'objet
        for (const [key, value] of Object.entries(objet)) {
            // Crée un élément de liste (li) pour chaque propriété
            const propertyLi = document.createElement("li");
            propertyLi.textContent = `${key}: ${value}`;
    
            // Ajoute l'élément de liste de propriété à la liste non ordonnée
            ul.appendChild(propertyLi);
        }
    
        // Ajoute la liste non ordonnée à l'élément li
        li.appendChild(ul);
    
        // Ajoute l'élément li à la liste existante dans l'élément avec l'id "joueur"
        document.getElementById("joueur").appendChild(li);
        document.getElementById("joueur").appendChild(li);
});
})}


const simi = document.getElementById("simi");
simi.addEventListener("click",(event)=>{event.preventDefault(); similar()});

function eraser(){
    const joueur = document.getElementById("joueur");
    while (joueur.hasChildNodes()) {
        joueur.removeChild(joueur.firstChild);
      }
}

window.onload = username()