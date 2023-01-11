// dotenv package
require("dotenv").config()
const PORT = process.env.PORT || 8080
const MONGODB_URL = process.env.MONGODB_URL

//----------------------------- MODULI -----------------------
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
var bodyParser = require("body-parser")
const path = require('path')
const app = express()

var jsonParser = bodyParser.json()
var urlEncodedParser = bodyParser.urlencoded({ extended: true })

const MongoClient = require('mongodb').MongoClient

app.use(express.static(__dirname + '/public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.get('/', function (req, res) {
    res.render('index')
})



/* -------------------------------------------------------------------------------------------------------------------------------------------------------

Per effettuare richieste multiple con axios, quindi gestirle in un ciclo for, bisogna dichiarare la funzione ASYNC e la chiamata axios AWAIT.
Altrimenti all'interno del ciclo for quando faremo la chiamata axios all'url:
il ciclo for non aspettera' di ricevere i dati dalla pagina, ma continuera' la sua esecuzione
=>
sputtana quindi gli indici dell'array degli url...

Con AWAIT -> impongo al ciclo for di aspettare di ricevere la risposta prima di andare avanti con il ciclo

------------------------------------------------------------------------------------------------------------------------------------------------------- */

// Aggiungi all'array giornali gli url dei giornali selezionati dall'utente
function pushGiornaliInArray(giornaliObj, giornaliArr){
    if(giornaliObj.hasOwnProperty("rep")){      //obj.hasOwnProperty("attributo") ritorna TRUE se esiste quell'attributo
        giornaliArr.push(giornaliObj.rep)       // aggiungi all'array l'url corrispondente al giornale
    }
    
    if(giornaliObj.hasOwnProperty("corSera")){
        giornaliArr.push(giornaliObj.corSera)
    }

    if(giornaliObj.hasOwnProperty("sole")){
        giornaliArr.push(giornaliObj.sole)
    }

    if(giornaliObj.hasOwnProperty("giornale")){
        giornaliArr.push(giornaliObj.giornale)
    }

    if(giornaliObj.hasOwnProperty("libero")){
        giornaliArr.push(giornaliObj.libero)
    }

    if(giornaliObj.hasOwnProperty("stampa")){
        giornaliArr.push(giornaliObj.stampa)
    }

    if(giornaliObj.hasOwnProperty("carlino")){
        giornaliArr.push(giornaliObj.carlino)
    }

    if(giornaliObj.hasOwnProperty("avvenire")){
        giornaliArr.push(giornaliObj.avvenire)
    }
}

/*
- frase = frase che devo controllare se include determinate parole
- paroleDaIncludere = sono le determinate parole da vedere se sono incluse

se l'array dei filtri contiene una stringa vuota => togli l'elemento

crea una copia dell'array:
se la prima lettera di ogni stringa è minuscola => convertila maiuscola
se la prima lettera di ogni stringa è maiuscola => convertila minuscola

E' l'equivalente di:
if(title.includes("ucraina") || url2.includes("ucraina") || title.includes("Putin") || url2.includes("Putin") || ...){ 
*/

function includesParole(frase, paroleDaIncludere){
    var esito = false
    var copiaParole = []
    for(var i=0; i < paroleDaIncludere.length; i++){
        if(paroleDaIncludere[i] == ""){
            paroleDaIncludere.splice(i, 1)
        }
    }

    for(var i=0; i < paroleDaIncludere.length; i++){
        if(frase.includes(paroleDaIncludere[i]) ){ 
            esito = true
            return true
        }else{
            esito = false
        }
    }
}

function includesURL(frase, paroleDaIncludere){
    var esito = false
    var copiaParole = []
    for(var i=0; i < paroleDaIncludere.length; i++){
        if(frase.includes(paroleDaIncludere[i])){ 
            esito = true
            return true
        }else{
            esito = false
        }
    }
    return esito
}

/*
- se undefined o "" imposta il testo a "non disponibile"
*/
function isUndefined(testo){
    if(testo == undefined || testo == ""){
        testo = "Non disponibile"
    }
    return testo
}

// Se l'url non contiene http => aggiungigli l'url completo del giornale
function appendURL(url){
    if(!(url.includes("http")) ){
        url = giornaliObj.sole + url
    }
} 

// Leggi i filtri inviati dal client, 
// se l'array ha un solo elemento ed e' = a "" => imposta i filtri predefiniti
function filtri(oggetto){
    var filtri = oggetto.filtri
    var copiaParole = []
    for(var i = 0; i < filtri.length; i++){
        if(filtri.length == 1 && filtri[i] == ""){
            filtri = ["Ucraina", "Putin", "Russia", "guerra", "Zelensky"]
        }
    }
    for(var i = 0; i < filtri.length; i++){
        if(filtri[i] == ""){
            filtri.splice(i, 1)
        }
    }
    for(var i = 0; i < filtri.length; i++){
        if(filtri[i][0] === filtri[i][0].toUpperCase()) {
                copiaParole.push(filtri[i][0].toLowerCase() + filtri[i].substring(1));
            } else {
                copiaParole.push(filtri[i][0].toUpperCase() + filtri[i].substring(1));
            }
    }
    var arrayFinale = filtri.concat(copiaParole);
    console.log(arrayFinale)
    return arrayFinale
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------

app.post('/results', jsonParser, async function (req, res) {
    var giornaliObj = req.body
    var giornaliArr = []
    console.log(giornaliObj)

    // Aggiungi all'array giornali gli url dei giornali selezionati dall'utente
    pushGiornaliInArray(giornaliObj, giornaliArr)

    // Imposta filtri, se non ci sono => metti quelli di default 
    var paroleDaIncludere = filtri(giornaliObj)

    var articlesObj = {}

    for(var i = 0; i < giornaliObj.lunghezza; i++){
        console.log("i:" + i + "  " + giornaliArr[i])
        await axios(giornaliArr[i])
            .then(response => { 
                const html = response.data
                const $ = cheerio.load(html)
                //var articlesObj = {}

                // ------------------------ REPUBBLICA --------------------------------------------------
                if(giornaliArr[i] == giornaliObj.rep){
                    var cont = 0
                    var articlesArr = []

                    $('.entry__content', html).each(function () { //<-- cannot be a function expression 
                        var title = $(this).text()
                        var url2 = $(this).find('a').attr('href')
                        if(url2 != undefined){ 
                            if(includesParole(title, paroleDaIncludere) || includesURL(url2, paroleDaIncludere)){   
                                var url = $(this).find('a').attr('href')
                                var categoria = $(this).find('.entry__overtitle').text()
                                categoria = isUndefined(categoria)

                                var autore = $(this).find('.entry__author').text()
                                autore = isUndefined(autore)
                                        
                                var giornale = "rep"
                                articlesArr.push({
                                    title,
                                    url,
                                    categoria,
                                    autore,
                                    giornale
                                })
                                articlesObj.Repub = articlesArr
                                cont++
                            }
                        }  
                        if(cont == 0){
                            articlesObj.Repub = 0
                        }      
                    })
                            
                    console.log(articlesObj)
                    console.log(cont)
                    console.log("-----------------------------------------")           
                }
                // ------------------------ CORRIERE --------------------------------------------------
                else if(giornaliArr[i] == giornaliObj.corSera){
                        var cont1 = 0
                        var articlesArr = []

                        $('.bck-media-news', html).each(function () { //<-- cannot be a function expression
                            const title = $(this).find(".title-art-hp").text() 
                            const url2 = $(this).find('.has-text-black').attr("href")
                            
                            if(url2 != undefined){
                                if(includesParole(title, paroleDaIncludere) || includesURL(url2, paroleDaIncludere)){  
                                    const url = $(this).find('a').attr('href')
                                    var categoria = $(this).find('overtitle-art.is-small-black.is-mr-b-12.has-text-grey-dusty').text()
                                    categoria = isUndefined(categoria)

                                    var autore = $(this).find('.media-news__footer').find('.overtitle-art is-small-black is-mr-b-8 has-text-grey-dusty').text()
                                    autore = isUndefined(autore)

                                    var giornale = "corS"
                                    articlesArr.push({
                                        title,
                                        url,
                                        categoria,
                                        autore,
                                        giornale
                                    })
                                    articlesObj.CorS = articlesArr
                                    cont1++
                                }
                            }
                            if(cont1 == 0){
                            articlesObj.CorS = 0
                        } 
                        })
                            
                        //console.log(articlesObj.CorS)
                        console.log(cont1)
                        console.log("-----------------------------------------")                
                }
                // ------------------------ SOLE 24 H --------------------------------------------------
                else if(giornaliArr[i] == giornaliObj.sole){
                    var cont2 = 0
                    var articlesArr = []

                    $('.col-md, .aprev, .list-lined-item', html).each(function () { //<-- cannot be a function expression
                        var title = $(this).find(".aprev-title").text() 
                        var url2 = $(this).find('a').attr('href')

                        if(url2 != undefined){
                            if(includesParole(title, paroleDaIncludere) || includesURL(url2, paroleDaIncludere)){  
                                var url = $(this).find(".aprev-title").find('a').attr('href')
                                if(url.includes("https")){

                                }else{
                                    url = 'https://www.ilsole24ore.com/' + url;
                                } 
                                
                                var categoria = $(this).find('.meta-part.subhead').text()
                                categoria = isUndefined(categoria)

                                var autore = $(this).find('.auth').text()
                                autore = isUndefined(autore)

                                var giornale = "sole"
                                articlesArr.push({
                                    title,
                                    url,
                                    categoria,
                                    autore,
                                    giornale
                                })
                                articlesObj.Sole = articlesArr
                                cont2++
                            }     
                        }
                        if(cont2 == 0){
                            articlesObj.Sole = 0
                        } 
                    })
                    //console.log(articlesObj.Sole)
                    console.log(cont2)
                    console.log("-----------------------------------------") 
                }
                // ------------------------ IL GIORNALE --------------------------------------------------
                else if(giornaliArr[i] == giornaliObj.giornale){
                    var cont3 = 0
                    var articlesArr = [] 

                    $('.card', html).each(function () { //<-- cannot be a function expression
                        var title = $(this).find(".card__title").text() 
                        var url2 = $(this).attr('href')

                        if(url2 != undefined){
                            if(includesParole(title, paroleDaIncludere) || includesURL(url2, paroleDaIncludere)){
                                var url = $(this).attr('href')
                                if(url.includes("https")){

                                }else{
                                    url = 'https://www.ilgiornale.it/' + url;
                                } 

                                var categoria = $(this).find('.card__group, .card__group--special').text()
                                categoria = isUndefined(categoria)

                                var autore = $(this).find('.author-ref').text()
                                autore = isUndefined(autore)
                                
                                var giornale = "giorn"

                                articlesArr.push({
                                    title,
                                    url,
                                    categoria,
                                    autore,
                                    giornale
                                })
                                articlesObj.Giornale = articlesArr
                                cont3++
                            }     
                        }
                        if(cont3 == 0){
                            articlesObj.Giornale = 0
                        } 
                    })
                    //console.log(articlesObj.Giornale)
                    console.log(cont3)
                    console.log("-----------------------------------------")
                }
                // ------------------------ LIBERO QUOTID --------------------------------------------------
                else if(giornaliArr[i] == giornaliObj.libero){
                    var cont4 = 0
                    var articlesArr = [] 
                    //, .box.xs, .box.s, .box.xl, .box.m.glide__slide, .box.m.no-photo.glide__slide, .box.m.wide.big-photo
                    $('.box', html).each(function () { //<-- cannot be a function expression
                        var title = $(this).find("h2").text() 
                        var url2 = $(this).find('figure').find('a').attr("href")  

                        if(url2 != undefined){
                            if(includesParole(title, paroleDaIncludere) || includesURL(url2, paroleDaIncludere)){
                                var url = $(this).find('h2').find('a').attr('href')

                                var categoria = $(this).find('.overtitle').text()
                                categoria = isUndefined(categoria)

                                var autore = 'Non disponibile'
                                
                                var giornale = "lib" 
                                articlesArr.push({
                                    title,
                                    url,
                                    categoria,
                                    autore,
                                    giornale
                                })
                                articlesObj.Libero = articlesArr
                                cont4++
                            } 
                        } 
                        if(cont4 == 0){
                            articlesObj.Libero = 0
                        }   
                    })
                    //console.log(articlesObj.Libero)
                    console.log(cont4)
                    console.log("-----------------------------------------")
                }
                // ------------------------ LA STAMPA --------------------------------------------------
                else if(giornaliArr[i] == giornaliObj.stampa){
                    var cont5 = 0
                    var articlesArr = [] 

                    $('.entry.default', html).each(function () { //<-- cannot be a function expression
                        var title = $(this).find(".entry__title").text() 
                        var url2 = $(this).find('a').attr('href')

                        if(url2 != undefined){
                            if(includesParole(title, paroleDaIncludere) || includesURL(url2, paroleDaIncludere)){
                                var url = $(this).find('a').attr('href')
                                var categoria = $(this).find('.entry__overtitle').text()
                                categoria = isUndefined(categoria)

                                var autore = $(this).find('.entry__author').text()
                                autore = isUndefined(autore)

                                var giornale = "stampa"
                                
                                articlesArr.push({
                                    title,
                                    url,
                                    categoria,
                                    autore,
                                    giornale
                                })
                                articlesObj.Stampa = articlesArr
                                cont5++
                            }     
                        } 
                        if(cont5 == 0){
                            articlesObj.Stampa = 0
                        } 
                    })
                    //console.log(articlesObj.Stampa)
                    console.log(cont5)
                    console.log("-----------------------------------------")
                }
                // ------------------------ RESTO DEL CARLINO --------------------------------------------------
                else if(giornaliArr[i] == giornaliObj.carlino){
                    var cont6 = 0
                    var articlesArr = [] 

                    $('article', html).each(function () { //<-- cannot be a function expression
                        var title = $(this).find('h3').find('a').text()
                        var url2 = $(this).find('h3').find('a').attr('href')
                        //console.log(url2)
                        if(url2 != undefined){
                            if(includesParole(title, paroleDaIncludere) || includesURL(url2, paroleDaIncludere)){
                                var url = $(this).find('h3').find('a').attr('href')
                                if(url.includes("https")){

                                }else{
                                    url = 'https://www.ilrestodelcarlino.it/' + url;
                                }
                                var categoria = $(this).find('span').find('p').text()
                                categoria = isUndefined(categoria)

                                var autore = $(this).find('.entry__author').text()
                                autore = isUndefined(autore)

                                var giornale = "carl"
                                articlesArr.push({
                                    title,
                                    url,
                                    categoria,
                                    autore,
                                    giornale
                                })
                                articlesObj.Carlino = articlesArr
                                cont6++
                            }     
                        }
                        if(cont6 == 0){
                            articlesObj.Carlino = 0
                        } 
                    })
                    
                    console.log(cont6)
                    console.log("-----------------------------------------")
                }
                // ------------------------ AVVENIRE --------------------------------------------------
                else if(giornaliArr[i] == giornaliObj.avvenire){
                    var cont7 = 0
                    var articlesArr = [] 
                    //.col-xs-12.col-sm-8.col-md-8, .col-sm-8, .col-md-8, .firstBlock
                    console.log(paroleDaIncludere)
                    $('.col-xs-12.col-sm-4.col-md-4, .col-sm-8, .col-md-8, .firstBlock', html).each(function () { //<-- cannot be a function expression   
                        var title = $(this).find("span").text() 
                        var url2 = $(this).find('.titleBox-xs').find('a').attr('href')

                        if(url2 != undefined){
                            if(includesParole(title, paroleDaIncludere) || includesURL(url2, paroleDaIncludere)){
                                var url = $(this).find('.titleBox-xs').find('a').attr('href')
                                if(url.includes("https")){

                                }else{
                                    url = 'https://www.avvenire.it' + url;
                                }

                                var categoria = $(this).find('em').text()
                                categoria = isUndefined(categoria)

                                var autore = $(this).find('.author').text()
                                autore = isUndefined(autore)

                                var giornale = "avven"
                                articlesArr.push({
                                    title,
                                    url,
                                    categoria,
                                    autore,
                                    giornale
                                })
                                articlesObj.Avvenire = articlesArr
                                cont7++
                            }     
                        }
                        if(cont7 == 0){
                            articlesObj.Avvenire = 0
                        }    
                    })
                    console.log(cont7)
                    console.log("-----------------------------------------")
                }

                //console.log(articlesObj)
                }).catch(err => console.log(err))            
    }// fine for 
    return res.json(articlesObj)

    for (const key in giornaliObj) {
      delete giornaliObj[key];
    }

    giornaliArr = []
    paroleDaIncludere = []
})  

function setOra(){
    var data = new Date();
        var gg, mm, aaaa, Hh, Mm;
        gg = data.getDate() + "/";
        mm = data.getMonth() + 1 + "/";
        aaaa = data.getFullYear() + " "; 
        Hh = data.getHours() + ":";
        Mm = data.getMinutes();
    
        var dataCorr = gg + mm + aaaa + Hh + Mm;
        return dataCorr
}

function replacer(key, value) {
  return value.replace(/[^\w\s]/gi, '');
}

app.post('/insertArticle', jsonParser, async function (req, res) {
    var article = req.body
    console.log("***********************")
    console.log(JSON.stringify(article))
    article.title = article.title.replace(/[\n\t;{}]/g, ''); 
    article.categoria = article.categoria.replace(/[\n\t;{}]/g, ''); 
    article.autore = article.autore.replace(/[\n\t;{}]/g, ''); 

    article.title = article.title.replace(/['']/g, ""); 
    article.categoria = article.categoria.replace(/['']/g, ""); 
    article.autore = article.autore.replace(/['']/g, ""); 
    
    console.log("***********************")
    console.log(article)
    console.log("***********************")


    MongoClient.connect(MONGODB_URL, async function(err, db) {
        if (err) throw err;
        var dbo = db.db("ProgettoPWM");

        var dataCorr = setOra()
        console.log(dataCorr)

        var myobj = { date: dataCorr, giornale: article.giornale, titolo: article.title, 
                      categoria: article.categoria, autore: article.autore, url: article.url };
        dbo.collection("ArticoliPreferiti").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    }); 
})

app.post('/deleteArticle', jsonParser, async function (req, res) {
    var article = req.body
    console.log("***********************")
    console.log(article.url)
    MongoClient.connect(MONGODB_URL, async function(err, db) {
        if (err) throw err;
        var dbo = db.db("ProgettoPWM");
        var myobjDEL = { url: article.url };
        dbo.collection("ArticoliPreferiti").deleteOne(myobjDEL, function(err, res) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
})
app.post('/goToPref/deleteArticle', jsonParser, async function (req, res) {
    var article = req.body
    
    console.log("***********************")
    console.log(article.url)
    MongoClient.connect(MONGODB_URL, async function(err, db) {
        if (err) throw err;
        var dbo = db.db("ProgettoPWM");
        var myobjDEL = { url: article.url };
        dbo.collection("ArticoliPreferiti").deleteOne(myobjDEL, function(err, res) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    }); 
})

app.post('/goToPref/insertArticle', jsonParser, async function (req, res) {
    var article = req.body
    console.log("***********************")

    //var dataCorr = setOra();

    MongoClient.connect(MONGODB_URL, async function(err, db) {
        if (err) throw err;
        var dbo = db.db("ProgettoPWM");
        var myobj = { date: article.data, giornale: article.giornale,  titolo: article.titolo, categoria: article.categoria, autore: article.autore, url: article.url };
        dbo.collection("ArticoliPreferiti").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
})

app.get('/goToPref', function (req, res) {
     MongoClient.connect(MONGODB_URL, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ProgettoPWM");
        dbo.collection("ArticoliPreferiti").find().toArray(function(err, response) {
            var data = response;
            //console.log(data);
            res.render('preferiti', {
                article: data
            })
            db.close();
        });
    }); 
})

app.post('/getSome', jsonParser, async function (req, res) {
    var article = req.body.giornali
    var parole = req.body.filtroParole
    console.log(article)
    MongoClient.connect(MONGODB_URL, async function(err, db) {
        if (err) throw err;
        var dbo = db.db("ProgettoPWM");
         var regex = parole.join("|")   
        dbo.collection("ArticoliPreferiti").find({ 
                "giornale": { $in: article }, 
                $or: [ { "titolo": { $regex: regex, $options: "i" } }, { "url": { $regex: regex, $options: "i" } } ]  
            }).sort({ "giornale":1,"date":1 }).toArray(function(err, response) {
            var data = response;   
    
            if(data.length == 0){
                data[0] = {giornale: "NO"}
            }
            res.render('preferiti', {
                article: data,  
            })
            db.close(); 
        });   
    });
})

var server = app.listen(PORT, ()=>{
    console.log("App running on " + PORT)
})