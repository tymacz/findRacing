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
                    fetch(`http://localhost:8000/joueur/${usr}`)
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

const bt = document.getElementById("research");
bt.addEventListener("click",(event)=> {event.preventDefault(); search()});

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

    
    fetch(`http://localhost:8000/joueur/${usr}&${search}`)
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


const simi = document.getElementById("simi");
simi.addEventListener("click",(event)=>{event.preventDefault(); similar()});

function eraser(){
    const joueur = document.getElementById("joueur");
    while (joueur.hasChildNodes()) {
        joueur.removeChild(joueur.firstChild);
      }
}
window.onload = username(0)
