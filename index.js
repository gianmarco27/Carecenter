const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sqlDbFactory = require("knex");
const process = require("process");
const copy = require('./copy.json');

let sqlDb;

function initSqlDB() {
    
    TEST = false;
    
    if (TEST) {
        sqlDb = sqlDbFactory({
            client: "sqlite3",
            debug: true,
            connection: {
                filename: "./careCenter.db"
            },
            useNullAsDefault: true
        });
    } else {
        sqlDb = sqlDbFactory({
            debug: true,
            client: "pg",
            connection: process.env.DATABASE_URL,
            ssl: true
        });
    }
}

const _ = require("lodash");

let serverPort = process.env.PORT || 5000;

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/* Website copy-text */

app.get("/copy/:id", function(req, res) {
    idn = String(req.params.id);

    if (copy.hasOwnProperty(idn)) {
        res.send(JSON.stringify(copy[idn]))
    } else {
        res.status(404).send("ERROR: Text not found");
    }

});

/* PEOPLE RELATED ROUTES */

app.get("/api/people", function(req, res) {
    /* Endpoint for the data of all the center staff */
    let sortby = _.get(req, "query.sort", "none");

    console.log("Received request ALL PEOPLE");

    let dBQuery = sqlDb("Staff");
    // We can either specify to sort them by Name or by default we sort by ID
    if (sortby === "name") {
        dBQuery = dBQuery.orderBy("NomeCognome", "asc");
    } else {
        dBQuery = dBQuery.orderBy("IDSTAFF", "asc");
    }
    dBQuery
        .select('IDSTAFF', "NomeCognome", "Img")
        .then(result => {
            res.send(JSON.stringify(result));
        })
        .catch(error => {
            res.status(404).send("ERROR: Resource not found");
        });
});

app.get("/api/people/:id", function(req, res) {
    /* Endpoint for the data relevant to a single person, specified by the ID */
    idn = parseInt(req.params.id);

    console.log("Received request SINGLE PERSON: ", idn);

    let dBQuery = sqlDb("Staff");
    dBQuery // Single query to optimize dB access 
        .select('Staff.IDSTAFF as id_persona', 'Staff.NomeCognome as nome_cognome',
            'Staff.Img as img', 'Staff.Bio as bio', 'Staff.DescCompiti as desc_compiti',
            'Sede.IDSEDE as id_sede', 'Sede.Nome as nome_sede', 'Sede.Citta as luogo_sede',
            'Servizio.IDSERVIZIO as id_servizio', 'Servizio.Nome as nome_servizio')
        .join('Gestisce', 'Staff.IDSTAFF', 'Gestisce.IDstaff')
        .join('Servizio', 'Gestisce.IDservizio', 'Servizio.IDSERVIZIO')
        .join('Opera', 'Staff.IDSTAFF', 'Opera.IDstaff')
        .join('Sede', 'Opera.IDsede', 'Sede.IDSEDE')
        .where('Staff.IDSTAFF', idn)
        .then(result => {
            let edited_res = {};
            edited_res["nome_cognome"] = result[0]["nome_cognome"];
            edited_res["id_persona"] = result[0]["id_persona"];
            edited_res["img"] = result[0]["img"];
            edited_res["bio"] = result[0]["bio"];
            edited_res["desc_compiti"] = result[0]["desc_compiti"];

            let lookup_servizi = {}; // Lookup table to avoid duplicate
            let servizi_set = new Set();
            result.forEach(function(el) {
                if (!(el["id_servizio"] in lookup_servizi)) {
                    lookup_servizi[el["id_servizio"]] = 1;
                    servizi_set.add({
                        "id_servizio": el["id_servizio"],
                        "nome_servizio": el["nome_servizio"]
                    });
                }
            })
            edited_res["servizi"] = (Array.from(servizi_set));

            let lookup_sede = {}; // Lookup table to avoid duplicate
            let sede_set = new Set();
            result.forEach(function(el) {
                if (!(el["id_sede"] in lookup_sede)) {
                    lookup_sede[el["id_sede"]] = 1;
                    sede_set.add({
                        "id_sede": el["id_sede"],
                        "nome_sede": el["nome_sede"],
                        "luogo_sede": el["luogo_sede"]
                    });
                }
            })
            edited_res["sede"] = (Array.from(sede_set));
            res.send(JSON.stringify(edited_res));
        })
        .catch(error => {
            res.status(404).send("ERROR: Resource not found");
        });
});

/* LOCATIONS RELATED ROUTES */

app.get("/api/locations", function(req, res) {
    /* Endpoint for the data of all the center staff */
    let sortby = _.get(req, "query.sort", "none");

    console.log("Received request ALL LOCATION");

    let dBQuery = sqlDb("Sede");
    // We can either specify to sort them by Name or by default we sort by ID
    if (sortby === "name") {
        dBQuery = dBQuery.orderBy("Nome", "asc");
    } else {
        dBQuery = dBQuery.orderBy("IDSEDE", "asc");
    }
    dBQuery
        .select('IDSEDE as id_sede', 'Nome as nome_sede', 'Img as img', 'Introduzione as introduzione', 'Citta as luogo')
        .then(result => {
            res.send(JSON.stringify(result));
        })
        .catch(error => {
            res.status(404).send("ERROR: Resource not found");
        });
});

app.get("/api/locations/:id", function(req, res) {
    /* Endpoint for the data relevant to a single person, specified by the ID */
    idn = parseInt(req.params.id);

    console.log("Received request SINGLE LOCATION: ", idn);

    let dBQuery = sqlDb("Sede");
    dBQuery // Single query to optimize dB access 
        .select('Sede.IDSEDE as id_sede', 'Sede.Nome as nome_sede', 'Sede.Citta as luogo_sede',
            'Sede.Via as via', 'Sede.Descrizione as descrizione', 'Sede.Telefono as tel',
            'Sede.Gmaps as gmaps', 'Sede.Img as img',
            'Servizio.IDSERVIZIO as id_servizio', 'Servizio.Nome as nome_servizio')
        .join('Svolgimento', 'Sede.IDSEDE', 'Svolgimento.IDsede')
        .join('Servizio', 'Svolgimento.IDservizio', 'Servizio.IDSERVIZIO')
        .where('Sede.IDSEDE', idn)
        .then(result => {
            let edited_res = {};
            edited_res["id_sede"] = result[0]["id_sede"];
            edited_res["nome_sede"] = result[0]["nome_sede"];
            edited_res["luogo_sede"] = result[0]["luogo_sede"];
            edited_res["img"] = result[0]["img"];
            edited_res["descrizione"] = result[0]["descrizione"];
            edited_res["via"] = result[0]["via"];
            edited_res["tel"] = result[0]["tel"];
            edited_res["gmaps"] = result[0]["gmaps"];

            let lookup_servizi = {}; // Lookup table to avoid duplicate
            let servizi_set = new Set();
            result.forEach(function(el) {
                if (!(el["id_servizio"] in lookup_servizi)) {
                    lookup_servizi[el["id_servizio"]] = 1;
                    servizi_set.add({
                        "id_servizio": el["id_servizio"],
                        "nome_servizio": el["nome_servizio"]
                    });
                }
            })
            edited_res["servizi"] = (Array.from(servizi_set));
            res.send(JSON.stringify(edited_res));
        })
        .catch(error => {
            res.status(404).send("ERROR: Resource not found");
        });
});

/* SERVICES RELATED ROUTES */

app.get("/api/services", function(req, res) {
    /* Endpoint for the data of all the center staff */
    let sortby = _.get(req, "query.sort", "none");

    console.log("Received request ALL PEOPLE");

    let dBQuery = sqlDb("Servizio");
    // We can either specify to sort them by Name or by default we sort by ID
    if (sortby === "name") {
        dBQuery = dBQuery.orderBy("Nome", "asc");
    } else {
        dBQuery = dBQuery.orderBy("Servizio.IDSERVIZIO", "asc");
    }
    dBQuery // Single query to optimize dB access 
        .select('Servizio.IDSERVIZIO as id_servizio', 'Servizio.Nome as nome_servizio', 'Servizio.Img as img',
            'Servizio.Introduzione as introduzione', 'Sede.Citta as sede')
        .join('Svolgimento', 'Servizio.IDSERVIZIO', 'Svolgimento.IDservizio')
        .join('Sede', 'Svolgimento.IDsede', 'Sede.IDSEDE')
        .then(result => {
            let lookup_servizi = {}; // Lookup table to avoid duplicate
            let servizi_set = new Set();
            result.forEach(function(el) {
                if (!(el["id_servizio"] in lookup_servizi)) {
                    lookup_servizi[el["id_servizio"]] = 1;
                    let sede = new Set();
                    result.forEach(function(inner_el) {
                        if (inner_el["id_servizio"] == el["id_servizio"]) {
                            sede.add({
                                "luogo_sede": inner_el["sede"]
                            })
                        }
                    });
                    servizi_set.add({
                        "id_servizio": el["id_servizio"],
                        "nome_servizio": el["nome_servizio"],
                        "img": el["img"],
                        "introduzione": el["introduzione"],
                        "sede": Array.from(sede)
                    });
                }
            });

            let final_res = (Array.from(servizi_set));
            res.send(JSON.stringify(final_res));
        })
        .catch(error => {
            res.status(404).send("ERROR: Resource not found");
        });
});

app.get("/api/services/:id", function(req, res) {
    /* Endpoint for the data relevant to a single person, specified by the ID */
    idn = parseInt(req.params.id);

    console.log("Received request SINGLE SERVICE: ", idn);

    let dBQuery = sqlDb('Servizio');
    dBQuery // Single query to optimize dB access 
        .select('Servizio.IDSERVIZIO as id_servizio', 'Servizio.Nome as nome_servizio',
            'Servizio.Img as img', 'Servizio.Introduzione as introduzione',
            'Servizio.Descrizione as descrizione',
            'Sede.IDSEDE as id_sede', 'Sede.Nome as nome_sede', 'Sede.Citta as luogo_sede',
            'Staff.NomeCognome as nome_cognome', 'Staff.IDSTAFF as id_persona')
        .join('Gestisce', 'Servizio.IDSERVIZIO', 'Gestisce.IDservizio')
        .join('Staff', 'Gestisce.IDstaff', 'Staff.IDSTAFF')
        .join('Svolgimento', 'Servizio.IDSERVIZIO', 'Svolgimento.IDservizio')
        .join('Sede', 'Svolgimento.IDsede', 'Sede.IDSEDE')
        .where('Servizio.IDSERVIZIO', idn)
        .then(result => {
            let edited_res = {};
            edited_res["id_servizio"] = result[0]["id_servizio"];
            edited_res["nome_servizio"] = result[0]["nome_servizio"];
            edited_res["img"] = result[0]["img"];
            edited_res["introduzione"] = result[0]["introduzione"];
            edited_res["descrizione"] = result[0]["descrizione"];

            let lookup_people = {}; // Lookup table to avoid duplicate
            let people_set = new Set();
            result.forEach(function(el) {
                if (!(el["id_persona"] in lookup_people)) {
                    lookup_people[el["id_persona"]] = 1;
                    people_set.add({
                        "id_persona": el["id_persona"],
                        "nome_cognome": el["nome_cognome"]
                    });
                }
            })
            edited_res["staff"] = (Array.from(people_set));

            let lookup_sede = {}; // Lookup table to avoid duplicate
            let sede_set = new Set();
            result.forEach(function(el) {
                if (!(el["id_sede"] in lookup_sede)) {
                    lookup_sede[el["id_sede"]] = 1;
                    sede_set.add({
                        "id_sede": el["id_sede"],
                        "nome_sede": el["nome_sede"],
                        "luogo_sede": el["luogo_sede"]
                    });
                }
            })
            edited_res["sede"] = (Array.from(sede_set));
            res.send(JSON.stringify(edited_res));
        })
        .catch(error => {
            res.status(404).send("ERROR: Resource not found");
        });
});

/* 404 custom page, To keep as last route */
app.get('*', function(req, res) {
    res.status(404).sendFile(__dirname + "/public/pages/404.html");
});

app.set("port", serverPort);
initSqlDB();

/* Start the server on port 3000 */
app.listen(serverPort, function() {
    console.log(`Your app is ready at port ${serverPort}`);
});
