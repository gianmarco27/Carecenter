function handleErrors(res) {
    if (res.status >= 200 && res.status < 300) {
        return res;
    } else {
        document.write(get404page());
        document.close();
        return res;
    }
    
}

function getData(url, callback) {
    fetch(url)
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then((out) => {
        callback(out);
        })
        .catch(err => { throw err });
}

function get404page() {
    return `<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="CareCenter è un associazione Italiana che si occupa di tematiche relative l'assistenza di bambini con disabilità">
    <meta name="author" content="Federico Scloza, Gianmarco Poggi e Giovanni Schiavon">
    <title>404 Page</title>
    <link rel="stylesheet" href="/assets/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="/assets/css/fontawesome-all.min.css" type="text/css">
    <link rel="stylesheet" href="/assets/css/animate.css" type="text/css">
    <link rel="stylesheet" href="/assets/css/main.css" type="text/css" >
       
    <link rel="shortcut icon" href="/assets/img/favicon.ico">
</head><!--/head-->
    
    
<body>
    <nav class="navbar navbar-expand-lg wet-asphalt" role="banner">
        <div class="container">   
            <a href="/index.html"><h1 class="mb-1">CareCenter</h1></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fas fa-bars wet-asphalt"></i>
                </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item"><a class="nav-link" href="/index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="/pages/about_us.html">Chi Siamo</a></li>
                    <li class="nav-item"><a class="nav-link" href="/pages/all_services.html">Servizi</a></li>
                    <li class="nav-item"><a class="nav-link" href="/pages/all_locations.html">Sedi</a></li>
                    <li class="nav-item"><a class="nav-link" href="/pages/404.html">Eventi</a></li>
                    <li class="nav-item"><a class="nav-link" href="/pages/all_people.html">Staff</a></li>
                    <li class="nav-item"><a class="nav-link" href="/pages/404.html">FAQ</a></li> 
                    <li class="nav-item"><a class="nav-link" href="/pages/404.html">News</a></li>
                    <li class="nav-item"><a class="nav-link" href="/pages/contact-us.html">Contatti</a></li>
                    <li class="nav-item"><a class="nav-link" href="/pages/404.html">Aiutaci</a></li>
                </ul>
            </div>
        </div>
    </nav><!--/navbar-->
    <div class="container center mt-4">
        <h1 class=center>Error 404: La pagina richiesta non esiste</h1>
        <br>
        <a href="/index.html"><button type="button" class="btn">Torna alla Homepage</button></a>
    </div>
    <section class="mt-md-0 mt-4">
        <footer id="footer" class="wet-asphalt">
            <div class="footer container">
                <div class="row">
                    <div class="col-6 mb-0">
                        &copy; 2018 CareCenter. P.IVA 123456789012345
                    </div>
                    <div class="col-6 mb-0">
                        <ul class="float-right">
                            <li><a href="/pages/about_us.html">About Us</a></li>
                            <li><a href="/pages/404.html">Faq</a></li>
                            <li><a href="/pages/contact-us.html">Contatti</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer><!--/#footer-->
    </section>
    <script src="/assets/js/jquery.js"></script>
    <script src="/assets/js/jquery.isotope.min.js"></script>
    <script src="/assets/js/bootstrap.min.js"></script>
</body>
</html>`
}
