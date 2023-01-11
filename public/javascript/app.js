// ARRAY che contiene i giornali preferiti
var preferiti = []

// Quando il DOM e' caricato => rendi invisibili tutti gli slider e mostra i preferiti
document.addEventListener("DOMContentLoaded", function() {
    setInvisible()
    setPreferiti()
    document.getElementById("loader").style.display = "none"
    document.getElementById("zeroGiornali").style.display = "none"

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
})

function setPreferiti(){
    var prefStored = JSON.parse(localStorage.getItem("pref"));
    if(prefStored != null){
        for(var i = 0; i < prefStored.length; i++){
            console.log("Pref: " + prefStored[i])
            if(prefStored[i] == "rep"){
                document.querySelector("input[name='giornali'][value='rep']").checked = true
                preferiti.push(prefStored[i])
                document.getElementById("icon1").classList.toggle('bi-star')
                document.getElementById("icon1").classList.toggle('bi-star-fill')
            }
            else if(prefStored[i] == "corSera"){
                document.querySelector("input[name='giornali'][value='corSera']").checked = true
                preferiti.push(prefStored[i])
                document.getElementById("icon2").classList.toggle('bi-star')
                document.getElementById("icon2").classList.toggle('bi-star-fill')
            }
            else if(prefStored[i] == "sole"){
                document.querySelector("input[name='giornali'][value='sole']").checked = true
                preferiti.push(prefStored[i])
                document.getElementById("icon3").classList.toggle('bi-star')
                document.getElementById("icon3").classList.toggle('bi-star-fill')
            }
            else if(prefStored[i] == "giornale"){
                document.querySelector("input[name='giornali'][value='giornale']").checked = true
                preferiti.push(prefStored[i])
                document.getElementById("icon4").classList.toggle('bi-star')
                document.getElementById("icon4").classList.toggle('bi-star-fill')
            }
            else if(prefStored[i] == "libero"){
                document.querySelector("input[name='giornali'][value='libero']").checked = true
                preferiti.push(prefStored[i])
                document.getElementById("icon5").classList.toggle('bi-star')
                document.getElementById("icon5").classList.toggle('bi-star-fill')
            }
            else if(prefStored[i] == "stampa"){
                document.querySelector("input[name='giornali'][value='stampa']").checked = true
                preferiti.push(prefStored[i])
                document.getElementById("icon6").classList.toggle('bi-star')
                document.getElementById("icon6").classList.toggle('bi-star-fill')
            }
            else if(prefStored[i] == "carlino"){
                document.querySelector("input[name='giornali'][value='carlino']").checked = true
                preferiti.push(prefStored[i])
                document.getElementById("icon7").classList.toggle('bi-star')
                document.getElementById("icon7").classList.toggle('bi-star-fill')
            }
            else if(prefStored[i] == "avvenire"){
                document.querySelector("input[name='giornali'][value='avvenire']").checked = true
                preferiti.push(prefStored[i])
                document.getElementById("icon8").classList.toggle('bi-star')
                document.getElementById("icon8").classList.toggle('bi-star-fill')
            }
        }
    } 
}

function setInvisible(){
    document.getElementById("slideRep").style.display = "none";
    document.getElementById("slideCorS").style.display = "none";
    document.getElementById("slideSole").style.display = "none";
    document.getElementById("slideGiornale").style.display = "none";
    document.getElementById("slideLibero").style.display = "none";
    document.getElementById("slideStampa").style.display = "none";
    document.getElementById("slideCarlino").style.display = "none";
    document.getElementById("slideAvvenire").style.display = "none";

    var paragRisultati = document.getElementsByClassName('numRis')
    for (var i=0; i < paragRisultati.length; i++){
      paragRisultati[i].style.display = 'none'
    }
}

// CLICCA IL BOTTONE PREMENDO IL TASTO ENTER
var inputModificaFiltri = document.getElementById("sceltaGiornali");
inputModificaFiltri.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    loadFeed()
  }
});


// SELEZIONA AUTOMATICAMENTE TUTTE LE CHECKBOX
function selects(){
    var selec=document.getElementsByName('giornali');
    for(var i=0; i<selec.length; i++){
        if(selec[i].type=='checkbox')
            selec[i].checked=true;
    }
}

// CAMBIA I FILTRI DI RICERCA
function filtriRicerca(){
    var filtri = document.getElementById("modificaFiltri").value;
    var filtriArr = filtri.split(' ');

    return filtriArr   
}

// PULISCI I CAMPI DI RICERCA, (chiamata con un timeout)
function clearCampi() {
    var selec = document.getElementsByName('giornali'); 
    for(var i=0; i<selec.length; i++){
        if(selec[i].type=='checkbox')
            selec[i].checked=false;
    }
    //document.getElementById("modificaFiltri").value = ""
}

// ADD PREFERITI
function pref(preferito, icon){
    if(preferito == "rep"){
        var rep = document.getElementById("Grep").value
        addRemovePref(preferito, rep) 
        changeIcon(icon)
    }
    else if(preferito == "corSera"){
        var cor = document.getElementById("GcorSera").value
        addRemovePref(preferito, cor) 
        changeIcon(icon)
    }
    else if(preferito == "sole"){
        var sole = document.getElementById("Gsole").value
        addRemovePref(preferito, sole)
        changeIcon(icon)
    }
    else if(preferito == "giornale"){
        var gior = document.getElementById("Ggiornale").value
        addRemovePref(preferito, gior)
        changeIcon(icon)
    }
    else if(preferito == "libero"){
        var lib = document.getElementById("Glibero").value
        addRemovePref(preferito, lib)
        changeIcon(icon)
    }
    else if(preferito == "stampa"){
        var stamp = document.getElementById("Gstampa").value
        addRemovePref(preferito, stamp)
        changeIcon(icon)
    }
    else if(preferito == "carlino"){
        var carl = document.getElementById("Gcarlino").value
        addRemovePref(preferito, carl)
        changeIcon(icon)
    }
    else if(preferito == "avvenire"){    
        var avven = document.getElementById("Gavvenire").value
        addRemovePref(preferito, avven)
        changeIcon(icon)
    }

    for(var i = 0; i < preferiti.length; i++){
        console.log("Pref: " + preferiti[i])
    }

    localStorage.setItem("pref", JSON.stringify(preferiti));   
}

// RIMUOVI ELEMENTO CORRISPONDENTE DALL'ARRAY DEI PREFERITI
function arrayRemove(arr, value) {   
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

// SE HO GIA' SELEZIONATO IL GIORNALE COME PREFERITO => RIMUOVILO
function addRemovePref(preferito, value){
    if(preferiti.includes(value)){
        preferiti = arrayRemove(preferiti, preferito)
    }else{
        preferiti.push(preferito)
    }
}

// CAMBIA ICONA DEL 'VAI AI PREFERITI'
function changeIconPref(){
    var icon = document.getElementById("tuttiPreferiti")
    icon.classList.toggle('bi-bookmarks')
    icon.classList.toggle('bi-bookmarks-fill')
}

function goToPref(){
    window.location.href = "http://localhost:3000/goToPref"
}

// CAMBIA ICONA AL CLICK DEL BOTTONE
function changeIcon(icon){
    icon.classList.toggle('bi-star-fill')
    icon.classList.toggle('bi-star')
}

// BOTTONE CHE INVIA I DATI AL SERVER 
function loadFeed(){
    document.getElementById("loader").style.display = "block"
    document.getElementById("zeroGiornali").style.display = "none"

    var itemForm = document.getElementById('sceltaGiornali'); // getting the parent container of all the checkbox inputs
    var checked = itemForm.querySelectorAll('input[type="checkbox"]:checked'); // get all the check box
    var dataS = [...checked].map(option => option.value);
    console.log(JSON.stringify(dataS));

    var dataSelected = {};
    if(dataS.length == 0){
        setDisplayVisibility("zeroGiornali")
    }

    for(var i = 1; i <= dataS.length; i++){
        if(dataS[i-1] == "rep"){
            dataSelected.rep = "https://www.repubblica.it/";
        }
        else if(dataS[i-1] == "corSera"){
            dataSelected.corSera = "https://www.corriere.it/";
        }
        else if(dataS[i-1] == "sole"){
            dataSelected.sole = "https://www.ilsole24ore.com/";
        }
        else if(dataS[i-1] == "giornale"){
            dataSelected.giornale = "https://www.ilgiornale.it/";
        }
        else if(dataS[i-1] == "libero"){
            dataSelected.libero = "https://www.liberoquotidiano.it/";
        }
        else if(dataS[i-1] == "stampa"){
            dataSelected.stampa = "https://www.lastampa.it/";
        }
        else if(dataS[i-1] == "carlino"){
            dataSelected.carlino = "https://www.ilrestodelcarlino.it/";
        }
        else if(dataS[i-1] == "avvenire"){
            dataSelected.avvenire = "https://www.avvenire.it/";
        }
        //console.log(dataSelected);
    }
    dataSelected.lunghezza = dataS.length;
    
    // se modifichi i filtri vengono salvati in un array filtri
    dataSelected.filtri = filtriRicerca()   
    console.log(dataSelected.filtri);


    const pulisciTimeout = setTimeout(clearCampi, 9000);

    /* */
    fetch('http://localhost:3000/results', {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(dataSelected), 
    })
        .then(response =>  {
            return response.json() 
            console.log(response.json())
        })
        .then(data => {
            stampaFeed(data)
        })
        .catch(err => console.log(err))  

    for (const key in dataSelected) {
      delete dataSelected[key].filtri
      delete dataSelected[key]
    }
    dataS = []
} 

//SE QUANDO RICLICCO PER CARICARE GLI ARTICOLI HO DEI DIV VISIBLI => RENDILI INVISIBILI

function isAlreadyVisible(){
    if(document.getElementById("slideRep").style.visibilty == "visible"){
        document.getElementById("slideRep").style.display = "none";
        document.getElementById("numRep").style.display = "none";
        removeElementsByClass("EliminaRep")
    }

    if(document.getElementById("slideCorS").style.visibilty == "visible"){
        document.getElementById("slideCorS").style.display = "none";
        document.getElementById("numCorS").style.display = "none";
        removeElementsByClass("EliminaCorS")
    }

    if(document.getElementById("slideSole").style.visibilty == "visible"){
        document.getElementById("slideSole").style.display = "none";
        document.getElementById("numSole").style.display = "none";
        removeElementsByClass("EliminaSole")
    }

    if(document.getElementById("slideGiornale").style.visibilty == "visible"){
        document.getElementById("slideGiornale").style.display = "none";
        document.getElementById("numGiornale").style.display = "none";
        removeElementsByClass("EliminaGiornale")
    }

    if(document.getElementById("slideLibero").style.visibilty == "visible"){
        document.getElementById("slideLibero").style.display = "none";
        document.getElementById("numLibero").style.display = "none";
        removeElementsByClass("EliminaLibero")
    }

    if(document.getElementById("slideStampa").style.visibilty == "visible"){
        document.getElementById("slideStampa").style.display = "none";
        document.getElementById("numStampa").style.display = "none";
        removeElementsByClass("EliminaStampa")
    }

    if(document.getElementById("slideCarlino").style.visibilty == "visible"){
        document.getElementById("slideCarlino").style.display = "none";
        document.getElementById("numCarlino").style.display = "none";
        removeElementsByClass("EliminaCarlino")
    }

    if(document.getElementById("slideAvvenire").style.visibilty == "visible"){
        document.getElementById("slideAvvenire").style.display = "none";
        document.getElementById("numAvvenire").style.display = "none";
        removeElementsByClass("EliminaAvvenire")
    }
}

function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

/*
    function test() = CAMBIA ICONA ART PREFERITI E SALVA ARTICOLO NEL DB:
    id = variab per vedere se ho già cliccato o meno il bottone dallo stesso articolo (la dichiaro 1! fuori)
    icon.id = id dell'articolo corrente

    ragionamento:
    - se id != icon.id => è la 1° volta che clicco
                       => inserisci l'articolo nel DB [e imposta id = id.icon così che se riclicco cambia comportamento]

    - se id == icon.id => ho gia cliccato una volta
                       => elimina l'articolo nel DB [e imposta id = "" così che la prox volta che clicco sembrerà che non]
                                                                       non l'ho mai fatto
*/
var id = ""
function test(data, icon){
    icon.classList.toggle('bi-bookmark-fill')
    icon.classList.toggle('bi-bookmark')
    if (id != icon.id){
        id = icon.id
        console.log("primo")
        console.log(data)
        fetch('http://localhost:3000/insertArticle', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: data, 
        })
        .catch(err => console.log(err))
    }else if(id == icon.id){
        console.log("secondo")
        id = ""
        
        fetch('http://localhost:3000/deleteArticle', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: data, 
        })
        .catch(err => console.log(err)) 
    }
    
}

/*
    CONTROLLA IL NUMERO DI ARTICOLI RICEVUTI:
    - se = 1 => stampa il primo e negli altri due stampa "Nessun risultato"
    - se = 2 => stampa i primi due e nell'ultimo stampa "Nessun risultato"
*/
function stampaFeed(data){
    isAlreadyVisible()

    Object.keys(data).forEach( key => {
        console.log(key);               // Stampa 'Repub'
                                        //data[key][0].categoria
        if(key == "Repub"){
            setDisplayVisibility("slideRep")
            setDisplayVisibility("numRep")
            document.getElementById("numRep").innerHTML = data[key].length + " risultati"
            var i = 0
            if(data[key].length == undefined){
                document.getElementById("numRep").innerHTML = "0 risultati"
                while(i < 3){
                    var articleItem = '<div class="card swiper-slide EliminaRep"> \
                                          <div class="image-content"> \
                                            <span class="overlay repO"></span> \
                                            <div class="card-image">\
                                              <img src="/images/rep.png" alt="ss" class="card-img repC">\
                                            </div>\
                                          </div>  \
                                          <div class="card-content"> \
                                            <h2 class="titolo"> Nessun risultato </h2> \
                                          </div> \
                                        </div>'             
                    let feedDisplay = document.getElementById("feedRep")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    i++
                }
            }
            else if(data[key].length == 1 ){         // Se ho solo 1 articolo => gestisci gli altri 2
                while(i < 3){
                    var articleItem = '<div class="card swiper-slide EliminaRep"> \
                                         <div class="image-content"> \
                                           <span class="overlay repO"></span> \
                                           <div class="card-image">\
                                             <img src="/images/rep.png" alt="ss" class="card-img repC">\
                                           </div> \
                                         </div>  \
                                         <div class="card-content">\
                                           <button class="btnCategoria"> ' + data[key][0].categoria + ' </button>\
                                           <h2 class="titolo">' + data[key][0].title + '</h2> \
                                           <p class="autore">' + data[key][0].autore + '</p> \
                                           <div class="test">\
                                             <i id="R0" class="bi bi-bookmark repIC"></i> \
                                             <a href="' + data[key][0].url + '" class="btnLink repB" target="_blank">Leggi articolo</a> \
                                           </div> \
                                          </div> \
                                       </div>'
                    if(i >= 1){
                        var articleItem = '<div class="card swiper-slide EliminaRep"> \
                                             <div class="image-content"> \
                                               <span class="overlay repO"></span> \
                                               <div class="card-image">\
                                                 <img src="/images/rep.png" alt="ss" class="card-img repC">\
                                               </div>\
                                             </div>  \
                                             <div class="card-content"> \
                                               <h2 class="titolo"> Nessun risultato </h2> \
                                             </div> \
                                           </div>'  
                    }
                    let feedDisplay = document.getElementById("feedRep")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    document.getElementById("R0").onclick = function() {test(JSON.stringify(data[key][0]), this)};
                    i++
                }    
            }else if(data[key].length == 2){    // Se ho solo 2 articoli => gestisci l'ultimo 
                i = 0
                data[key].forEach(article =>{
                    var articleItem =  '<div class="card swiper-slide EliminaRep"> \
                                          <div class="image-content"> \
                                            <span class="overlay repO"></span> \
                                            <div class="card-image">\
                                              <img src="/images/rep.png" alt="ss" class="card-img repC">\
                                            </div> \
                                          </div>  \
                                          <div class="card-content">\
                                            <button class="btnCategoria"> ' + article.categoria + ' </button>\
                                            <h2 class="titolo">' + article.title + '</h2> \
                                            <p class="autore">' + article.autore + '</p> \
                                            <div class="test"> \
                                              <i id="R'+i+'" class="bi bi-bookmark repIC"></i> \
                                              <a href="' + article.url + '" class="btnLink repB" target="_blank">Leggi articolo</a> \
                                            </div> \
                                          </div> \
                                        </div>'
                    let feedDisplay = document.getElementById("feedRep")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    document.getElementById("R"+i).onclick = function() {test(JSON.stringify(article), this)};
                    i++
                }) 
                var articleItem =  '<div class="card swiper-slide EliminaRep"> \
                                      <div class="image-content"> \
                                        <span class="overlay repO"></span> \
                                        <div class="card-image">\
                                          <img src="/images/rep.png" alt="ss" class="card-img repC">\
                                        </div>\
                                      </div>  \
                                      <div class="card-content"> \
                                        <h2 class="titolo"> Nessun risultato </h2> \
                                      </div> \
                                    </div>' 
                let feedDisplay = document.getElementById("feedRep")
                feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
            }else{
                i = 0
                data[key].forEach(article =>{
                    var articleItem = ' <div class="card swiper-slide EliminaRep"> \
                                          <div class="image-content"> \
                                            <span class="overlay repO"></span> \
                                            <div class="card-image">\
                                              <img src="/images/rep.png" alt="ss" class="card-img repC">\
                                            </div> \
                                          </div>  \
                                          <div class="card-content">\
                                            <button class="btnCategoria"> ' + article.categoria + ' </button>\
                                            <h2 class="titolo">' + article.title + '</h2> \
                                            <p class="autore">' + article.autore + '</p> \
                                            <div class="test"> \
                                              <i id="R'+i+'" class="bi bi-bookmark repIC"></i> \
                                              <a href="' + article.url + '" class="btnLink repB" target="_blank">Leggi articolo</a> \
                                            </div> \
                                          </div> \
                                        </div>'
                    let feedDisplay = document.getElementById("feedRep")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    document.getElementById("R"+i).onclick = function() {test(JSON.stringify(article), this)};
                    i++
                })
            }
            
        }
        else if (key == "CorS"){
            setDisplayVisibility("slideCorS")
            setDisplayVisibility("numCorS")
            document.getElementById("numCorS").innerHTML = data[key].length + " risultati"
            var i = 0
            if(data[key].length == undefined){
                document.getElementById("numCorS").innerHTML = "0 risultati"
                while(i < 3){
                    var articleItem = '<div class="card swiper-slide EliminaCorS"> <div class="image-content"> <span class="overlay corrO"></span> <div class="card-image"><img src="/images/corr.png" alt="ss" class="card-img corrC"></div> </div>  <div class="card-content"> <h2 class="titolo"> Nessun risultato </h2> </div> </div>'
                    let feedDisplay = document.getElementById("feedCorS")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    i++
                }
            }
            else if(data[key].length == 1 ){         // Se ho solo 1 articolo => gestisci gli altri 2
                while(i < 3){
                    var articleItem = '<div class="card swiper-slide EliminaCorS"> <div class="image-content"> <span class="overlay corrO"></span> <div class="card-image"><img src="/images/corr.png" alt="ss" class="card-img corrC"></div> </div>  <div class="card-content"><button class="btnCategoria"> ' + data[key][0].categoria + ' </button><h2 class="titolo">' + data[key][0].title + '</h2> <p class="autore">' + data[key][0].autore + '</p> <div class="test"><i id="C0" class="bi bi-bookmark corrIC"></i> <a href="' + data[key][0].url + '" class="btnLink corrB target="_blank"" target="_blank">Leggi articolo</a> </div> </div> </div>'
                    if(i >= 1){
                        var articleItem = '<div class="card swiper-slide EliminaCorS"> <div class="image-content"> <span class="overlay corrO"></span> <div class="card-image"><img src="/images/corr.png" alt="ss" class="card-img corrC"></div> </div>  <div class="card-content"> <h2 class="titolo"> Nessun risultato </h2> </div> </div>'
                    }
                    let feedDisplay = document.getElementById("feedCorS")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    document.getElementById("C0").onclick = function() {test(JSON.stringify(data[key][0]), this)};
                    i++
                }    
            }else if(data[key].length == 2){    // Se ho solo 2 articoli => gestisci l'ultimo 
                i = 0
                data[key].forEach(article =>{   
                    var articleItem = '<div class="card swiper-slide EliminaCorS"> <div class="image-content"> <span class="overlay corrO"></span> <div class="card-image"><img src="/images/corr.png" alt="ss" class="card-img corrC"></div> </div>  <div class="card-content"><button class="btnCategoria"> ' + article.categoria + ' </button><h2 class="titolo">' + article.title + '</h2> <p class="autore">' + article.autore + '</p> <div class="test"> <i id="C'+i+'" class="bi bi-bookmark corrIC"></i><a href="' + article.url + '" class="btnLink corrB" target="_blank" target="_blank">Leggi articolo</a> </div> </div> </div>'
                    let feedDisplay = document.getElementById("feedCorS")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)   
                    document.getElementById("C"+i).onclick = function() {test(JSON.stringify(article), this)};
                    i++           
                }) 
                var articleItem = '<div class="card swiper-slide EliminaCorS"> <div class="image-content"> <span class="overlay corrO"></span> <div class="card-image"><img src="/images/corr.png" alt="ss" class="card-img corrC"></div> </div>  <div class="card-content"> <h2 class="titolo"> Nessun risultato </h2> </div> </div>'
                let feedDisplay = document.getElementById("feedCorS")
                feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                
            }else{
                i = 0
                data[key].forEach(article =>{   // default case
                    //document.getElementById("bottoniCorS").style.visibilty = "visible"
                    var articleItem = '<div class="card swiper-slide EliminaCorS"> <div class="image-content"> <span class="overlay corrO"></span> <div class="card-image"><img src="/images/corr.png" alt="ss" class="card-img corrC"></div> </div>  <div class="card-content"><button class="btnCategoria"> ' + article.categoria + ' </button><h2 class="titolo">' + article.title + '</h2> <p class="autore">' + article.autore + '</p> <div class="test"> <i id="C'+i+'" class="bi bi-bookmark corrIC"></i><a href="' + article.url + '" class="btnLink corrB target="_blank"" target="_blank">Leggi articolo</a> </div> </div> </div>'
                    let feedDisplay = document.getElementById("feedCorS")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem) 
                    document.getElementById("C"+i).onclick = function() {test(JSON.stringify(article), this)};
                    i++             
                }) 
            }
        }
        else if (key == "Sole"){
            setDisplayVisibility("slideSole")
            setDisplayVisibility("numSole")
            document.getElementById("numSole").innerHTML = data[key].length + " risultati"
            var i = 0
            if(data[key].length == undefined){
                document.getElementById("numSole").innerHTML = "0 risultati"
                while(i < 3){
                    var articleItem = '<div class="card swiper-slide EliminaSole"> <div class="image-content"> <span class="overlay soleO"></span> <div class="card-image"><img src="/images/sole.png" alt="ss" class="card-img soleC"></div> </div>  <div class="card-content"> <h2 class="titolo"> Nessun risultato </h2> </div> </div>'
                    let feedDisplay = document.getElementById("feedSole")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    i++
                }
            }
            else if(data[key].length == 1 ){         // Se ho solo 1 articolo => gestisci gli altri 2
                while(i < 3){
                    var articleItem = '<div class="card swiper-slide EliminaSole"> <div class="image-content"> <span class="overlay soleO"></span> <div class="card-image"><img src="/images/sole.png" alt="ss" class="card-img soleC"></div> </div>  <div class="card-content"><button class="btnCategoria"> ' + data[key][0].categoria + ' </button><h2 class="titolo">' + data[key][0].title + '</h2> <p class="autore">' + data[key][0].autore + '</p> <div class="test"><i id="S0" class="bi bi-bookmark soleIC"></i> <a href="' + data[key][0].url + '" class="btnLink soleB target="_blank"">Leggi articolo</a> </div> </div> </div>'
                    if(i >= 1){
                        var articleItem = '<div class="card swiper-slide EliminaSole"> <div class="image-content"> <span class="overlay soleO"></span> <div class="card-image"><img src="/images/sole.png" alt="ss" class="card-img soleC"></div> </div>  <div class="card-content"> <h2 class="titolo"> Nessun risultato </h2> </div> </div>'
                    }
                    let feedDisplay = document.getElementById("feedSole")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    document.getElementById("S0").onclick = function() {test(JSON.stringify(data[key][0]), this)};
                    i++
                }    
            }else if(data[key].length == 2){    // Se ho solo 2 articoli => gestisci l'ultimo 
                i = 0
                data[key].forEach((article, index) =>{
                    var articleItem = '<div class="card swiper-slide EliminaSole"> <div class="image-content"> <span class="overlay soleO"></span> <div class="card-image"><img src="/images/sole.png" alt="ss" class="card-img soleC"></div> </div>  <div class="card-content"><button class="btnCategoria"> ' + article.categoria + ' </button><h2 class="titolo">' + article.title + '</h2> <p class="autore">' + article.autore + '</p> <div class="test"> <i id="S'+i+'" class="bi bi-bookmark soleIC"></i> <a href="' + article.url + '" class="btnLink soleB" target="_blank">Leggi articolo</a> </div> </div> </div>'
                    let feedDisplay = document.getElementById("feedSole")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    document.getElementById("S"+i).onclick = function() {test(JSON.stringify(article), this)};
                    i++
                })
                var articleItem = '<div class="card swiper-slide EliminaSole"> <div class="image-content"> <span class="overlay soleO"></span> <div class="card-image"><img src="/images/sole.png" alt="ss" class="card-img soleC"></div> </div>  <div class="card-content"> <h2 class="titolo"> Nessun risultato </h2> </div> </div>'
                let feedDisplay = document.getElementById("feedSole")
                feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                
            }else{
                i = 0
                data[key].forEach((article, index) =>{
                    var articleItem = '<div class="card swiper-slide EliminaSole"> <div class="image-content"> <span class="overlay soleO"></span> <div class="card-image"><img src="/images/sole.png" alt="ss" class="card-img soleC"></div> </div>  <div class="card-content"><button class="btnCategoria"> ' + article.categoria + ' </button><h2 class="titolo">' + article.title + '</h2> <p class="autore">' + article.autore + '</p> <div class="test"> <i id="S'+i+'" class="bi bi-bookmark soleIC"></i><a href="' + article.url + '" class="btnLink soleB" target="_blank">Leggi articolo</a> </div> </div> </div>'
                    let feedDisplay = document.getElementById("feedSole")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    document.getElementById("S"+i).onclick = function() {test(JSON.stringify(article), this)};
                    i++
                })
            } 
        }
        else if (key == "Giornale"){
            setDisplayVisibility("slideGiornale")
            setDisplayVisibility("numGiornale")
            document.getElementById("numGiornale").innerHTML = data[key].length + " risultati"
            var i = 0
            if(data[key].length == undefined){
                document.getElementById("numGiornale").innerHTML = "0 risultati"
                while(i < 3){
                    var articleItem = '<div class="card swiper-slide EliminaGiornale"> <div class="image-content"> <span class="overlay giornO"></span> <div class="card-image"><img src="/images/giornale.png" alt="ss" class="card-img giornC"></div> </div>  <div class="card-content"> <h2 class="titolo"> Nessun risultato </h2> </div> </div>'
                    let feedDisplay = document.getElementById("feedGiornale")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    i++
                }
            }
            else if(data[key].length == 1 ){         // Se ho solo 1 articolo => gestisci gli altri 2
                while(i < 3){
                    var articleItem = '<div class="card swiper-slide EliminaGiornale"> <div class="image-content"> <span class="overlay giornO"></span> <div class="card-image"><img src="/images/sole.png" alt="ss" class="card-img giornC"></div> </div>  <div class="card-content"><button class="btnCategoria"> ' + data[key][0].categoria + ' </button><h2 class="titolo">' + data[key][0].title + '</h2> <p class="autore">' + data[key][0].autore + '</p><div class="test"><i id="G0" class="bi bi-bookmark gioIC"></i> <a href="' + data[key][0].url + '" class="btnLink giornB" target="_blank">Leggi articolo</a> </div> </div> </div>'
                    if(i >= 1){
                        var articleItem = '<div class="card swiper-slide EliminaGiornale"> <div class="image-content"> <span class="overlay giornO"></span> <div class="card-image"><img src="/images/sole.png" alt="ss" class="card-img giornC"></div> </div>  <div class="card-content"> <h2 class="titolo"> Nessun risultato </h2> </div> </div>'
                    }
                    let feedDisplay = document.getElementById("feedGiornale")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    document.getElementById("G0").onclick = function() {test(JSON.stringify(data[key][0]), this)};
                    i++
                }            
            }else if(data[key].length == 2){    // Se ho solo 2 articoli => gestisci l'ultimo 
                i=0
                data[key].forEach(article =>{
                    var articleItem = '<div class="card swiper-slide EliminaGiornale"> <div class="image-content"> <span class="overlay giornO"></span> <div class="card-image"><img src="/images/giornale.png" alt="ss" class="card-img giornC"></div> </div>  <div class="card-content"><button class="btnCategoria"> ' + article.categoria + ' </button><h2 class="titolo">' + article.title + '</h2> <p class="autore">' + article.autore + '</p> <div class="test"> <i id="G'+i+'" class="bi bi-bookmark gioIC"></i><a href="' + article.url + '" class="btnLink giornB" target="_blank">Leggi articolo</a> </div> </div> </div>'
                    let feedDisplay = document.getElementById("feedGiornale")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    document.getElementById("G"+i).onclick = function() {test(JSON.stringify(article), this)};
                    i++
                })
                var articleItem = '<div class="card swiper-slide EliminaGiornale"> <div class="image-content"> <span class="overlay giornO"></span> <div class="card-image"><img src="/images/giornale.png" alt="ss" class="card-img giornC"></div> </div>  <div class="card-content"> <h2 class="titolo"> Nessun risultato </h2> </div> </div>'
                let feedDisplay = document.getElementById("feedGiornale")
                feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
            }else{
                i=0
                data[key].forEach(article =>{
                    var articleItem = '<div class="card swiper-slide EliminaGiornale"> <div class="image-content"> <span class="overlay giornO"></span> <div class="card-image"><img src="/images/giornale.png" alt="ss" class="card-img giornC"></div> </div>  <div class="card-content"><button class="btnCategoria"> ' + article.categoria + ' </button><h2 class="titolo">' + article.title + '</h2> <p class="autore">' + article.autore + '</p> <div class="test"> <i id="G'+i+'" class="bi bi-bookmark gioIC"></i><a href="' + article.url + '" class="btnLink giornB" target="_blank">Leggi articolo</a> </div> </div> </div>'
                    let feedDisplay = document.getElementById("feedGiornale")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    document.getElementById("G"+i).onclick = function() {test(JSON.stringify(article), this)};
                    i++
                })
            }    
        }
        else if (key == "Libero"){
            setDisplayVisibility("slideLibero")
            setDisplayVisibility("numLibero")
            document.getElementById("numLibero").innerHTML = data[key].length + " risultati"
            var i = 0
            if(data[key].length == undefined){
                document.getElementById("numLibero").innerHTML = "0 risultati"
                while(i < 3){
                    var articleItem = '<div class="card swiper-slide EliminaLibero"> <div class="image-content"> <span class="overlay liberoO"></span> <div class="card-image"><img src="/images/libero.png" alt="ss" class="card-img liberoC"></div> </div>  <div class="card-content"> <h2 class="titolo"> Nessun risultato </h2> </div> </div>'
                    let feedDisplay = document.getElementById("feedLibero")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    i++
                }
            }
            else if(data[key].length == 1 ){         // Se ho solo 1 articolo => gestisci gli altri 2
                while(i < 3){
                    var articleItem = '<div class="card swiper-slide EliminaLibero"> <div class="image-content"> <span class="overlay liberoO"></span> <div class="card-image"><img src="/images/libero.png" alt="ss" class="card-img liberoC"></div> </div>  <div class="card-content"><button class="btnCategoria"> ' + data[key][0].categoria + ' </button><h2 class="titolo">' + data[key][0].title + '</h2> <p class="autore">' + data[key][0].autore + '</p><div class="test"><i id="L0" class="bi bi-bookmark libIC"></i> <a href="' + data[key][0].url + '" class="btnLink liberoB" target="_blank">Leggi articolo</a> </div> </div> </div>'
                    if(i >= 1){
                        var articleItem = '<div class="card swiper-slide EliminaLibero"> <div class="image-content"> <span class="overlay liberoO"></span> <div class="card-image"><img src="/images/libero.png" alt="ss" class="card-img liberoC"></div> </div>  <div class="card-content"> <h2 class="titolo"> Nessun risultato </h2> </div> </div>'
                    }
                    let feedDisplay = document.getElementById("feedLibero")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    i++
                    document.getElementById("L0").onclick = function() {test(JSON.stringify(data[key][0]), this)};
                }    
            }else if(data[key].length == 2){    // Se ho solo 2 articoli => gestisci l'ultimo 
                i=0
                data[key].forEach(article =>{
                    var articleItem = '<div class="card swiper-slide EliminaLibero"> <div class="image-content"> <span class="overlay liberoO"></span> <div class="card-image"><img src="/images/libero.png" alt="ss" class="card-img liberoC"></div> </div>  <div class="card-content"><button class="btnCategoria"> ' + article.categoria + ' </button><h2 class="titolo">' + article.title + '</h2> <p class="autore">' + article.autore + '</p> <div class="test"> <i id="L'+i+'" class="bi bi-bookmark libIC"></i><a href="' + article.url + '" class="btnLink liberoB" target="_blank">Leggi articolo</a> </div> </div> </div>'
                    let feedDisplay = document.getElementById("feedLibero")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    document.getElementById("L"+i).onclick = function() {test(JSON.stringify(article), this)};
                    i++
                })
                var articleItem = '<div class="card swiper-slide EliminaLibero"> <div class="image-content"> <span class="overlay liberoO"></span> <div class="card-image"><img src="/images/libero.png" alt="ss" class="card-img liberoC"></div> </div>  <div class="card-content"> <h2 class="titolo"> Nessun risultato </h2> </div> </div>'
                let feedDisplay = document.getElementById("feedLibero")
                feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
            }else{
                i=0
                data[key].forEach(article =>{
                    var articleItem = '<div class="card swiper-slide EliminaLibero"> <div class="image-content"> <span class="overlay liberoO"></span> <div class="card-image"><img src="/images/libero.png" alt="ss" class="card-img liberoC"></div> </div>  <div class="card-content"><button class="btnCategoria"> ' + article.categoria + ' </button><h2 class="titolo">' + article.title + '</h2> <p class="autore">' + article.autore + '</p> <div class="test"> <i id="L'+i+'" class="bi bi-bookmark libIC"></i><a href="' + article.url + '" class="btnLink liberoB" target="_blank">Leggi articolo</a> </div> </div> </div>'
                    let feedDisplay = document.getElementById("feedLibero")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    document.getElementById("L"+i).onclick = function() {test(JSON.stringify(article), this)};
                    i++
                })
            } 
        }
        else if (key == "Stampa"){
            setDisplayVisibility("slideStampa")
            setDisplayVisibility("numStampa")
            document.getElementById("numStampa").innerHTML = data[key].length + " risultati"
            var i = 0
            if(data[key].length == undefined){
                document.getElementById("numStampa").innerHTML = "0 risultati"
                while(i < 3){
                    var articleItem = '<div class="card swiper-slide EliminaStampa"> <div class="image-content"> <span class="overlay stampaO"></span> <div class="card-image"><img src="/images/stampa.png" alt="ss" class="card-img stampaC"></div> </div>  <div class="card-content"> <h2 class="titolo"> Nessun risultato </h2> </div> </div>'
                    let feedDisplay = document.getElementById("feedStampa")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    i++
                }
            }
            else if(data[key].length == 1 ){         // Se ho solo 1 articolo => gestisci gli altri 2
                while(i < 3){
                    var articleItem = '<div class="card swiper-slide EliminaStampa"> <div class="image-content"> <span class="overlay stampaO"></span> <div class="card-image"><img src="/images/stampa.png" alt="ss" class="card-img stampaC"></div> </div>  <div class="card-content"><button class="btnCategoria"> ' + data[key][0].categoria + ' </button><h2 class="titolo">' + data[key][0].title + '</h2> <p class="autore">' + data[key][0].autore + '</p> <div class="test"><i id="ST0" class="bi bi-bookmark stampIC"></i><a href="' + data[key][0].url + '" class="btnLink stampaB" target="_blank">Leggi articolo</a> </div> </div> </div>'
                    if(i >= 1){
                        var articleItem = '<div class="card swiper-slide EliminaStampa"> <div class="image-content"> <span class="overlay stampaO"></span> <div class="card-image"><img src="/images/stampa.png" alt="ss" class="card-img stampaC"></div> </div>  <div class="card-content"> <h2 class="titolo"> Nessun risultato </h2> </div> </div>'
                    }
                    let feedDisplay = document.getElementById("feedStampa")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    document.getElementById("ST0").onclick = function() {test(JSON.stringify(data[key][0]), this)};
                    i++
                }    
            }else if(data[key].length == 2){    // Se ho solo 2 articoli => gestisci l'ultimo 
                i=0
                data[key].forEach(article =>{
                    var articleItem = '<div class="card swiper-slide EliminaStampa"> <div class="image-content"> <span class="overlay stampaO"></span> <div class="card-image"><img src="/images/stampa.png" alt="ss" class="card-img stampaC"></div> </div>  <div class="card-content"><button class="btnCategoria"> ' + article.categoria + ' </button><h2 class="titolo">' + article.title + '</h2> <p class="autore">' + article.autore + '</p> <div class="test"> <i id="ST'+i+'" class="bi bi-bookmark stampIC"></i><a href="' + article.url + '" class="btnLink stampaB" target="_blank">Leggi articolo</a> </div> </div> </div>'
                    let feedDisplay = document.getElementById("feedStampa")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    document.getElementById("ST"+i).onclick = function() {test(JSON.stringify(article), this)};
                    i++
                })
                var articleItem = '<div class="card swiper-slide EliminaStampa"> <div class="image-content"> <span class="overlay stampaO"></span> <div class="card-image"><img src="/images/stampa.png" alt="ss" class="card-img stampaC"></div> </div>  <div class="card-content"> <h2 class="titolo"> Nessun risultato </h2> </div> </div>'
                let feedDisplay = document.getElementById("feedStampa")
                feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
            }else{
                i=0
                data[key].forEach(article =>{
                    var articleItem = '<div class="card swiper-slide EliminaStampa"> <div class="image-content"> <span class="overlay stampaO"></span> <div class="card-image"><img src="/images/stampa.png" alt="ss" class="card-img stampaC"></div> </div>  <div class="card-content"><button class="btnCategoria"> ' + article.categoria + ' </button><h2 class="titolo">' + article.title + '</h2> <p class="autore">' + article.autore + '</p> <div class="test"> <i id="ST'+i+'" class="bi bi-bookmark stampIC"></i><a href="' + article.url + '" class="btnLink stampaB" target="_blank">Leggi articolo</a> </div> </div> </div>'
                    let feedDisplay = document.getElementById("feedStampa")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    document.getElementById("ST"+i).onclick = function() {test(JSON.stringify(article), this)};
                    i++
                }) 
            }
        }
        else if (key == "Carlino"){
            setDisplayVisibility("slideCarlino")
            setDisplayVisibility("numCarlino")
            document.getElementById("numCarlino").innerHTML = data[key].length + " risultati"
            console.log(data[key].length)
            var i = 0
            if(data[key].length == undefined){
                document.getElementById("numCarlino").innerHTML = "0 risultati"
                while(i < 3){
                    var articleItem = '<div class="card swiper-slide EliminaCarlino"> <div class="image-content"> <span class="overlay carlO"></span> <div class="card-image"><img src="/images/carlino.png" alt="ss" class="card-img carlC"></div> </div>  <div class="card-content"> <h2 class="titolo"> Nessun risultato </h2> </div> </div>'
                    let feedDisplay = document.getElementById("feedCarlino")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    i++
                }
            }
            else if(data[key].length == 1 ){         // Se ho solo 1 articolo => gestisci gli altri 2
                while(i < 3){
                    var articleItem = '<div class="card swiper-slide EliminaCarlino"> <div class="image-content"> <span class="overlay carlO"></span> <div class="card-image"><img src="/images/carlino.png" alt="ss" class="card-img carlC"></div> </div>  <div class="card-content"><button class="btnCategoria"> ' + data[key][0].categoria + ' </button><h2 class="titolo">' + data[key][0].title + '</h2> <p class="autore">' + data[key][0].autore + '</p><div class="test"><i id="CA0" class="bi bi-bookmark carlIC"></i> <a href="' + data[key][0].url + '" class="btnLink carlB" target="_blank">Leggi articolo</a> </div> </div> </div>'
                    if(i >= 1){
                        var articleItem = '<div class="card swiper-slide EliminaCarlino"> <div class="image-content"> <span class="overlay carlO"></span> <div class="card-image"><img src="/images/carlino.png" alt="ss" class="card-img carlC"></div> </div>  <div class="card-content"> <h2 class="titolo"> Nessun risultato </h2> </div> </div>'
                    }
                    let feedDisplay = document.getElementById("feedCarlino")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    document.getElementById("CA0").onclick = function() {test(JSON.stringify(data[key][0]), this)};
                    i++
                }    
            }else if(data[key].length == 2){    // Se ho solo 2 articoli => gestisci l'ultimo 
                i=0
                data[key].forEach(article =>{
                    var articleItem = '<div class="card swiper-slide EliminaCarlino"> <div class="image-content"> <span class="overlay carlO"></span> <div class="card-image"><img src="/images/carlino.png" alt="ss" class="card-img carlC"></div> </div>  <div class="card-content"><button class="btnCategoria"> ' + article.categoria + ' </button><h2 class="titolo">' + article.title + '</h2> <p class="autore">' + article.autore + '</p> <div class="test"> <i id="CA'+i+'" class="bi bi-bookmark carlIC"></i><a href="' + article.url + '" class="btnLink carlB" target="_blank">Leggi articolo</a> </div> </div> </div>'
                    let feedDisplay = document.getElementById("feedCarlino")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    document.getElementById("CA"+i).onclick = function() {test(JSON.stringify(article), this)};
                    i++
                }) 
                var articleItem = '<div class="card swiper-slide EliminaCarlino"> <div class="image-content"> <span class="overlay carlO"></span> <div class="card-image"><img src="/images/carlino.png" alt="ss" class="card-img carlC"></div> </div>  <div class="card-content"> <h2 class="titolo"> Nessun risultato </h2> </div> </div>'
                let feedDisplay = document.getElementById("feedCarlino")
                feedDisplay.insertAdjacentHTML("beforebegin", articleItem)       
            }else{
                i=0
                data[key].forEach(article =>{
                    var articleItem = '<div class="card swiper-slide EliminaCarlino"> <div class="image-content"> <span class="overlay carlO"></span> <div class="card-image"><img src="/images/carlino.png" alt="ss" class="card-img carlC"></div> </div>  <div class="card-content"><button class="btnCategoria"> ' + article.categoria + ' </button><h2 class="titolo">' + article.title + '</h2> <p class="autore">' + article.autore + '</p> <div class="test"> <i id="CA'+i+'" class="bi bi-bookmark carlIC"></i><a href="' + article.url + '" class="btnLink carlB" target="_blank">Leggi articolo</a> </div> </div> </div>'
                    let feedDisplay = document.getElementById("feedCarlino")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    document.getElementById("CA"+i).onclick = function() {test(JSON.stringify(article), this)};
                    i++
                }) 
            }
        }
        else if (key == "Avvenire"){
            setDisplayVisibility("slideAvvenire")
            setDisplayVisibility("numAvvenire")
            document.getElementById("numAvvenire").innerHTML = data[key].length + " risultati"
            var i = 0
            if(data[key].length == undefined || data[key].length == 0){
                document.getElementById("numAvvenire").innerHTML = "0 risultati"
                while(i < 3){
                    var articleItem = '<div class="card swiper-slide EliminaAvvenire"> <div class="image-content"> <span class="overlay avvenO"></span> <div class="card-image"><img src="/images/avvenire.png" alt="ss" class="card-img avvenC"></div> </div>  <div class="card-content"> <h2 class="titolo"> Nessun risultato </h2> </div> </div>'
                    let feedDisplay = document.getElementById("feedAvvenire")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    i++
                }
            }
            else if(data[key].length == 1 ){         // Se ho solo 1 articolo => gestisci gli altri 2
                while(i < 3){
                    var articleItem = '<div class="card swiper-slide EliminaAvvenire"> <div class="image-content"> <span class="overlay avvenO"></span> <div class="card-image"><img src="/images/avvenire.png" alt="ss" class="card-img avvenC"></div> </div>  <div class="card-content"><button class="btnCategoria"> ' + data[key][0].categoria + ' </button><h2 class="titolo">' + data[key][0].title + '</h2> <p class="autore">' + data[key][0].autore + '</p><div class="test"><i id="A0" class="bi bi-bookmark avvenIC"></i> <a href="' + data[key][0].url + '" class="btnLink avvenB" target="_blank">Leggi articolo</a> </div> </div> </div>'
                    if(i >= 1){
                        var articleItem = '<div class="card swiper-slide EliminaAvvenire"> <div class="image-content"> <span class="overlay avvenO"></span> <div class="card-image"><img src="/images/avvenire.png" alt="ss" class="card-img avvenC"></div> </div>  <div class="card-content"> <h2 class="titolo"> Nessun risultato </h2> </div> </div>'
                    }
                    let feedDisplay = document.getElementById("feedAvvenire")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    document.getElementById("A0").onclick = function() {test(JSON.stringify(data[key][0]), this)};
                    i++
                }  
            }else if(data[key].length == 2){    // Se ho solo 2 articoli => gestisci l'ultimo 
                i=0
                data[key].forEach(article =>{
                    var articleItem = '<div class="card swiper-slide EliminaAvvenire"> <div class="image-content"> <span class="overlay avvenO"></span> <div class="card-image"><img src="/images/avvenire.png" alt="ss" class="card-img avvenC"></div> </div>  <div class="card-content"><button class="btnCategoria"> ' + article.categoria + ' </button><h2 class="titolo">' + article.title + '</h2> <p class="autore">' + article.autore + '</p> <div class="test"> <i id="A'+i+'" class="bi bi-bookmark avvenIC"></i><a href="' + article.url + '" class="btnLink avvenB" target="_blank">Leggi articolo</a> </div> </div> </div>'
                    let feedDisplay = document.getElementById("feedAvvenire")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    document.getElementById("A"+i).onclick = function() {test(JSON.stringify(article), this)};
                    i++
                })
                var articleItem = '<div id="NoAvv" class="card swiper-slide EliminaAvvenire"> <div class="image-content"> <span class="overlay avvenO"></span> <div class="card-image"><img src="/images/avvenire.png" alt="ss" class="card-img avvenC"></div> </div>  <div class="card-content"> <h2 class="titolo"> Nessun risultato </h2> </div> </div>'
                let feedDisplay = document.getElementById("feedAvvenire")
                
                feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
            }else{
                i=0
                data[key].forEach(article =>{
                    var articleItem = '<div class="card swiper-slide EliminaAvvenire"> <div class="image-content"> <span class="overlay avvenO"></span> <div class="card-image"><img src="/images/avvenire.png" alt="ss" class="card-img avvenC"></div> </div>  <div class="card-content"><button class="btnCategoria"> ' + article.categoria + ' </button><h2 class="titolo">' + article.title + '</h2> <p class="autore">' + article.autore + '</p> <div class="test"> <i id="A'+i+'" class="bi bi-bookmark avvenIC"></i><a href="' + article.url + '" class="btnLink avvenB" target="_blank">Leggi articolo</a> </div> </div> </div>'
                    let feedDisplay = document.getElementById("feedAvvenire")
                    feedDisplay.insertAdjacentHTML("beforebegin", articleItem)
                    document.getElementById("A"+i).onclick = function() {test(JSON.stringify(article), this)};
                    i++
                })
                setDisplayVisibility("swipAvven")
            }   
        }
    })
    document.getElementById("loader").style.display = "none"
}

function setDisplayVisibility(divGionale){
    document.getElementById(divGionale).style.display = "flex";
    document.getElementById(divGionale).style.visibilty = "visible";
}
