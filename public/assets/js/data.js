// Single person
//let url = 'https://api.myjson.com/bins/co3zi'; 

// Single service
//let url = 'https://api.myjson.com/bins/1caa5y';

// Single location
//let url = 'https://api.myjson.com/bins/voady';

// All service
//let url = 'https://api.myjson.com/bins/vtfkm';

// All location
let url = 'https://api.myjson.com/bins/nugjy';

// All people
//let url = 'https://api.myjson.com/bins/17sp1a';

fetch(url)
    .then(res => res.json())
    .then((out) => {
    console.log(out);
    //insertDataPerson(out);
    //insertDataService(out);
    //insertDataLocation(out);
    //insertDataAllService(out);
    //insertDataAllLocation(out);
    insertDataAllPeople(out);
    })
    .catch(err => { throw err });

function insertDataPerson(data) {
    
    document.getElementById("nome_cognome").innerHTML = data["nome_cognome"];
    
    document.getElementById("bio").innerHTML = data["bio"];
    
    document.getElementById("desc_compiti").innerHTML = data["desc_compiti"];
    
    document.title = data["nome_cognome"] + " | " + "careCenter";
    
    document.getElementById("foto").src = data["img"];
    let servizi = document.getElementById("servizi");
    data["servizi"].forEach( function(el) {
        //console.log(el);
        let servizio = document.createElement('a');
        servizio.href = "./single_service" + el['id_servizio'] + ".html";
        servizio.innerHTML = el["nome_servizio"];
        servizi.append(servizio);
        servizi.append(document.createElement('br'));
    });
    
    let sedi = document.getElementById("sedi");
    data["sede"].forEach( function(el) {
        //console.log(el);
        let sede = document.createElement('a');
        sede.href = "./location" + el['id_sede'] + ".html";
        sede.innerHTML = el['nome_sede'] + " | " + el["luogo_sede"];
        sedi.append(sede);
        sedi.append(document.createElement('br'));
    });
}

function insertDataService(data) {
    
    document.getElementById("nome_servizio").innerHTML = data["nome_servizio"];
        
    document.getElementById("introduzione").innerHTML = data["introduzione"]; 
    
    document.getElementById("descrizione").innerHTML = data["descrizione"];  
    
    document.getElementById("foto").src = data["img"];
    
    document.title = data["nome_servizio"] + " | " + "careCenter";
    
    let responsabili = document.getElementById("responsabili");
    data["staff"].forEach( function(el) {
        //console.log(el);
        let responsabile_btn = document.createElement('li')
        responsabile_btn.className = "btn d-block"
        let responsabile = document.createElement('a');
        responsabile.href = "./single_people" + el['id_persona'] + ".html";
        responsabile.innerHTML = el["nome_cognome"];
        responsabile_btn.append(responsabile);
        responsabili.append(responsabile_btn);
        //servizi.append(document.createElement('br'));
    });
    
    let sedi = document.getElementById("sedi");
    data["sede"].forEach( function(el) {
        //console.log(el);
        let sede_btn = document.createElement('li')
        sede_btn.className = "btn d-block"
        let sede = document.createElement('a');
        sede.href = "./location" + el['id_sede'] + ".html";
        sede.innerHTML = el['nome_sede'] + " | " + el["luogo_sede"];
        sede_btn.append(sede);
        sedi.append(sede_btn);
        //sedi.append(document.createElement('br'));
    });
    
   
}

function insertDataLocation(data) {
   
    document.getElementById("nome_sede").innerHTML = data["nome_sede"];
        
    document.getElementById("via").innerHTML = data["via"]; 
    
    document.getElementById("tel").firstElementChild.innerHTML = data["tel"];  

    document.getElementById("foto").src = data["img"];  
    
    document.getElementById("titolo").innerHTML = data["nome_sede"] + " | " + data["luogo_sede"];  

    document.getElementById("descrizione").innerHTML = data["descrizione"];  

    document.getElementById("google_maps").src = data["gmaps"];  

    document.title = data["nome_sede"] + " | " + "careCenter";
    
    let servizi = document.getElementById("servizi");
    data["servizi"].forEach( function(el) {
        let servizio_block = document.createElement('li')
        servizio_block.className = "d-block"
        let servizio = document.createElement('a');
        servizio.href = "./single_service" + el['id_servizio'] + ".html";
        let nome_servizio = document.createElement('h5');
        nome_servizio.innerHTML = el['nome_servizio'];
        nome_servizio.className = "font-weight-light mb-1";
        servizio.append(nome_servizio);
        servizio_block.append(servizio);
        servizi.append(servizio_block);
    });
}

function insertDataAllService(out) {
    out["data"].forEach( function(el) {
        let city_filter = "";
        el["sede"].forEach( function(sede) {
            city_filter += sede["luogo_sede"].toLowerCase() + " ";
        })
        let main_div = document.createElement('div');
        main_div.className = "wrapperino " + city_filter;
        let inner_div = document.createElement('div');
        inner_div.className = "card";
        main_div.append(inner_div);
        let img_link = document.createElement('a');
        img_link.href = "./single_service" + el["id_servizio"] + ".html";
        inner_div.append(img_link);
        let img = document.createElement('img');
        img.src = el["img"];
        img.className = "card-img-top";
        img_link.append(img)
        let text_div = document.createElement('div');
        text_div.className = "card-body";
        img_link.append(text_div);
        let title = document.createElement('h5');
        title.innerHTML = el["nome_servizio"];
        title.className = "card-title"
        text_div.append(title);
        let description = document.createElement('p');
        description.innerHTML = el["introduzione"];
        description.className = "card-text"
        text_div.append(description);
        document.getElementById("servizi").append(main_div);
    });
}

function insertDataAllLocation(out) {
    let location = [];
    out["data"].forEach( function(el) {
        let main_div = document.createElement('div');
        main_div.className = "col-8 col-md-3 mx-auto my-2 wet-asphalt p-0 center";
        let link = document.createElement('a');
        link.href = "/locationel" + el["id_sede"] + ".html";
        link.className = "w-100 d-inline-block";
        main_div.append(link);
        let img = document.createElement('img');
        img.src = "../assets/img/locations/" + el["id_sede"] + ".jpg";
        img.className = "w-100";
        let h = document.createElement('h3');
        h.className = "my-2";
        h.innerHTML = el["nome_sede"] + "\n" + el["luogo_sede"];
        let text = document.createElement('p');
        text.className = "m-0 px-3 pb-3";
        let text_c = el["descrizione"];
        text.innerHTML = (text_c.length > 75) ? text_c.substr(0, 75-1) + "..." : text_c;
        link.append(img);
        link.append(h);
        link.append(text);
        location.push(main_div);
    });
    let container;
    for (let idx = 0; idx < location.length; idx++) {
        if (idx % 3 == 0) {
            container = document.createElement('div');
            container.className = "row";
            document.getElementById("locations").append(container);
        } 
        container.append(location[idx]);
    }
}

function insertDataAllPeople(out) {
    let people = [];
    out["data"].forEach( function(el) {
        let main_div = document.createElement('div');
        main_div.className = "col-8 col-md-3 mx-auto my-4 wet-asphalt p-0 center";
        let link = document.createElement('a');
        link.href = "/locationel" + el["id_persona"] + ".html";
        link.className = "w-100 d-inline-block h-100";
        main_div.append(link);
        let img = document.createElement('img');
        img.src = el["img"];
        img.className = "w-100";
        let h = document.createElement('h4');
        h.className = "p-3 m-0";
        h.innerHTML = el["nome_cognome"];
        link.append(img);
        link.append(h);
        people.push(main_div);
    });
    let container;
    for (let idx = 0; idx < people.length; idx++) {
        if (idx % 3 == 0) {
            container = document.createElement('div');
            container.className = "row";
            document.getElementById("staff").append(container);
        } 
        container.append(people[idx]);
    }
}
