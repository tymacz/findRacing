
let data = document.getElementById("sign_in");

data.addEventListener("submit",(event)=> {event.preventDefault(); print()});

function print() {
  const xhr = new XMLHttpRequest();
  const fd = new FormData(data);
  const jsondata = {};

  fd.forEach((value, key) => {
      jsondata[key] = value;
  });

  const jsonstring = JSON.stringify(jsondata);

  xhr.open("POST", "http://localhost:8000/joueur");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 201) {
              const responseData = JSON.parse(xhr.responseText);

              // Affiche la valeur de id_utilisteur dans la console
              console.log('ID Utilisateur:', responseData);
              window.location.href=`http://127.0.0.1:8081/home.html/?user=${responseData}`
              // Autres actions après l'inscription si nécessaire
          } else {
              console.error('Erreur lors de la requête:', xhr.status);
          }
      }
  };

  xhr.send(jsonstring);
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

// Appeler la fonction lors du chargement de la page
window.onload = callNiveau(),callPays(),callCircuit(),callCars(),callControleur()

