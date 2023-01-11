document.addEventListener("DOMContentLoaded", function() {
    
})

// TORNA ALLA PAGINA PRINCIPALE
function goToMain(){
    window.location.href = "http://localhost:3000/"
}

// CLICCA IL BOTTONE PREMENDO IL TASTO ENTER
var InputCerca = document.getElementById("InputCerca");
InputCerca.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    cercaPreferiti();
  }
});

// CAMBIA I FILTRI DI RICERCA
function filtriRicerca(){
    var filtri = document.getElementById("InputCerca").value;
    var filtriArr = filtri.split(' ');

    return filtriArr   
}

function cercaPreferiti(){
    // Contiene:
    // dataInviare.giornali = giornali selezionati
    // dataInviare.filtroParole = parole chiave che devono contenere gli articoli
    var dataInviare = {}
    var select = document.getElementById('SelectCerca');
    var selected = [...select.selectedOptions]
                    .map(option => option.value);
    dataInviare.giornali = selected
    console.log(dataInviare.giornali);

    dataInviare.filtroParole = filtriRicerca();
    console.log(dataInviare.filtroParole);
    
    if(dataInviare.giornali.length == 0){
        dataInviare.giornali = ['rep', 'corS', 'sole', 'giorn', 'lib', 'stampa', 'carl', 'avven']
    }
    
    fetch('http://localhost:3000/getSome', {
        method: "POST",
        headers: {
           "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(dataInviare), 

        })
        .then(res => res.text()).then(htmlStr => {
            document.open();
            document.write(htmlStr);
            document.close();
        }) 
}

function getAll(){
    fetch('http://localhost:3000/getAll', {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then(response =>  {
            return response.json() 
        })
        .then(data => {
            console.log(data)
        })
}

// CAMBIA ICONA DEI PREFERITI
function changeIconPref(icona){
    var icon = document.getElementById(icona.id)
    icon.classList.toggle('bi-bookmark-fill')
    icon.classList.toggle('bi-bookmark')
}

var id = ""
function changePref(url, icona, titolo, categoria, autore, date, giornale){
    var icon = document.getElementById(icona.id)
    icon.classList.toggle('bi-bookmark')
    icon.classList.toggle('bi-bookmark-fill')
    console.log(icon.id)
    if (id != icon.id){
        id = icon.id

        console.log(url)
        console.log(titolo)
        console.log(categoria)
        console.log(autore)
        console.log(date)
        var article = {}
        article.url = url
        article = JSON.stringify(article)
        fetch('http://localhost:3000/goToPref/deleteArticle', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: article,
        })
        .catch(err => console.log(err))  

    }else if(id == icon.id){
        console.log("RIAGGIUNTO") //RIaggiungi
        id = ""
        article = {
            titolo:titolo,
            url:url,
            categoria:categoria,
            autore:autore,
            giornale:giornale,
            data:date
        }
        article = JSON.stringify(article)
        
        fetch('http://localhost:3000/goToPref/insertArticle', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: article, 
        })
        .catch(err => console.log(err))  
    }
    
}


/*
problemi nel cancellare gli articoli preferiti della repubblica, perche' contengono caratteri speciali
che rompono le palle a JSON.parse()

problemi nell'ora, non vengono visualizzati i secondi

*/