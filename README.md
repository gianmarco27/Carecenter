# careCenter

### Back-End

Hypermedia Applications course project

Performed on a group of 3 people

## Description of the REST API

##### Testi statici

* /copy/:id (:id = identificatore del testo statico da ricevere, viene usato per gli snippet testuali in pagine come help_us)

##### Staff

* /api/people?sort=[name] (Endpoint per ricevere informazioni sintetiche di tutte le persone che lavorano nella struttura, il parametro opzionale sort se impostato a "name" restituisce le persone in ordine alfabetico, altrimenti l'ordine è basato sull'ID della persona)

* /api/people/:id (Endpoint per ricevere le informazioni complete relative una singola persona)

##### Sedi

* /api/locations?sort=[name] (Endpoint per ricevere informazioni sintetiche di tutte le strutture, il parametro opzionale sort se impostato a "name" restituisce le sedi in ordine alfabetico, altrimenti l'ordine è basato sull'ID della sede)

* api/locations/:id (Endpoint per ricevere le informazioni complete relative una singola sede)

##### Servizi

* /api/services?sort=[name] (Endpoint per ricevere informazioni sintetiche di tutti i servizi offerti, il parametro opzionale sort se impostato a "name" restituisce i servizi in ordine alfabetico, altrimenti l'ordine è basato sull'ID del servizio)

* api/services/:id (Endpoint per ricevere le informazioni complete relative un singolo servizio)

## DB Schema

Di seguito sono riportati gli schemi sintetici delle relazioni presenti nel Database.
Sede, Staff e Servizio sono i 3 schemi principali, gli altri servono a rappresentare le relazioni 1-N presenti tra di essi.


* TABLE Sede (IDSEDE, Img, Introduzione, Descrizione, Nome, Gmaps, Via, Telefono, Citta)

* TABLE Staff (IDSTAFF, NomeCognome, Bio, DescCompiti, Img)

* TABLE Servizio (IDSERVIZIO, Img, Nome, Descrizione, Introduzione)

* TABLE Gestisce (IDstaff, IDservizio)

* TABLE Opera (IDsede, IDstaff)

* TABLE Svolgimento (IDservizio, IDsede)

## Front End

Il sito web è stato sviluppato tenendo i diagrammi IDM come punto di riferimento.

Le pagine, statiche per questa consegna, sono state ideate inizialmente attraverso tools per il Mockup quali Balsamiq

Successivamente si è passati alla fase di realizzazione in HTML, CSS e JS

E' stato utilizzato il framework [Bootstrap v.4](https://getbootstrap.com/) per poter avere pagine web responsive, in grado di adattarsi a molteplici risoluzioni ed altrettanti dispositivi differenti.

Oltre a Javascript "vanilla" è stato fatto uso di librerie quali [JQuery](https://jquery.com/) e [Isotope](https://isotope.metafizzy.co/) al fine di arricchire il sito con funzioni volte a renderlo più user friendly.


In particolare si è fatto uso di JQuery per poter gestire il carousel presente in "Tutte le location" che mostra le immagini di alcuni dei centri.

Isotope è stato invece utilizzato nella sezione "Tutti i servizi" per gestire il sistema di filtri che permette di selezionare rapidamente i servizi di una determinata location.
Isotope si occupa di selezionare tramite le classi dei tag le "cards" rilevanti alla selezione e mostrarle all'utente, aggiustando il layout dinamicamente in base agli elementi rimasti.

La sezione relativa alle singole sedi di Care Center permette all'utente di visualizzare la posizione esatta su una una mappa interattiva fornita da Google. A livello tecnico questa funzionalità viene implementata da un iframe contenente una mappa, richiesta appositamente a Google attraverso una API key generata per il progetto.

## Problemi

Durante lo sviluppo del sito ci siamo imbattuti in un bug particolare dovuto ad una race condition del Carosel-JQuery e Isotope, in maniera non deterministica (influenzata dal tempo di caricamente del sito) un 10% delle volte la libreria Isotope non caricava correttamente.

Utilizzare la console di Chrome per visualizzare lo stack delle chiamate alle funzioni impattava sul verificarsi del bug stesso.

Siamo riusciti a risolvere comunque il problema tramite il precaricamento di JQuery prima delle due altre funzionalità.

## Accorgimenti per l'accessibilità

Al fine di rendere il sito accessibile ad una più ampia fascia di utenti ed incrementarne l’usabilità abbiamo preso in considerazione diversi accorgimenti finali.

Abbiamo optato per limitare le scelte possibili su ogni pagina a quelle strettamente connesse per evitare di sovraccaricare l’utilizzatore di informazioni e scelte presenti.

La palette di colori presente sul sito è stata testata con tools appositi al fine di verificare di aver ottenuto un contrasto elevato e di conseguenza una maggiore leggibilità.

Abbiamo anche seguito alcuni consigli di  LightHouse per ottimizzare parametri quali Performance, Accessibilità, Best Practise e SEO

Per venire incontro agli utenti con connessioni a consumo o particolarmente lente le immagini presentate sul sito sono state notevolmente ottimizzate tramite compressione, in modo da richiedere un quantitativo di banda limitato.
