(function (angular) {
    var app = angular.module("Aplikacija");
    app.controller("Kontroler", function ($http) {
        var cm = this;

        cm.artikli = [];
        cm.korisnici = [];
        cm.kategorije = [];
        cm.noviInd = false;
        cm.korisnikInd = false;
        cm.prijavaInd = false;
        cm.registracijaInd = false;
        cm.artikliInd = true;
        cm.detaljiInd = false;
        cm.korisnicko_ime = "";
        cm.lozinka = "";
        cm.prijavljen = false;
        cm.prijavljenKorisnik = undefined;
        cm.lozinka2 = "";
        cm.jednaKategorija = "";
        cm.kolicinaKupi = 0;
        cm.filterKorisnik = "";
        cm.novi = {};
        cm.noviKorisnik = {};
        cm.izmenaKorisnik = {};
        cm.zaIzmenu = {};
        cm.zaPrikaz = {};
        cm.artikal = {};
        cm.pretraga = "";
        cm.stanja = ["Da", "Ne"];
        cm.sortiranje = ["Naziv", "Cena"];
        cm.kriterijum = "naziv";
        cm.smer = false;
        cm.smerSimbol = "rastući";

        cm.dobaviKorisnike = function() {
            $http.get("/korisnici").then(function(response) {
                cm.korisnici = response.data;
                cm.noviKorisnik = {
		            "korisnicko_ime" : "",
		            "lozinka" : "",
		            "profilna_slika" : "",
                    "profilna_slika_URL": "",
		            "ime" : "",
		            "prezime" : "",
		            "adresa" : "",
		            "email" : "",
		            "telefon" : "",
		            "stanje_racuna" : 0,
		            "prijavljen" : 0
		        };
            }, function(reason) {
                console.log(reason);
            });
        }

        cm.dobaviKategorije = function() {
            $http.get("/kategorije").then(function(response) {
                cm.kategorije = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        cm.dobaviKorisnike();
        cm.dobaviKategorije();

        cm.dobaviArtikle = function() {
            cm.filterKorisnik = "";
            cm.artikliInd = true;
            cm.noviInd = false;
            cm.prijavaInd = false;
            cm.registracijaInd = false;
            cm.korisnikInd = false;
            cm.detaljiInd = false;
            cm.odustaniOdIzmene();
            cm.novi = {
	            "naziv": "",
	            "opis": "",
	            "slika": "",
                "slika_URL": "",
	            "cena": 1,
	            "stanje": "",
	            "kolicina": 1,
	            "datum": "",
	            "kategorije_id": "",
	            "korisnici_id": "",
	            "korisnik": "",
	            "kategorija": ""
	        };
            $http.get("/artikli").then(function(response) {
                cm.artikli = response.data;
                cm.jednaKategorija = "";
            }, function(reason) {
                console.log(reason);
            });
        }

        cm.sakrijArtikle = function(){
        	cm.artikliInd = false;
        }

        cm.dodaj = function() {
            cm.novi["korisnici_id"] = cm.prijavljenKorisnik["id"];
            cm.novi["kategorije_id"] = cm.novi["kategorija"]["id"];
            if (cm.novi["slika_URL"] == "") {
                 cm.novi["slika"] = "/images/nema-slika-0.jpg"
            }
            else{
                cm.novi["slika"] = cm.novi["slika_URL"];
            }
            
            var datum = new Date();
            cm.novi["datum"] = ("0"+datum.getDate()).slice(-2)+"."+("0"+(datum.getMonth()+1)).slice(-2)+"."+datum.getFullYear()+"."+" "
            					+("0"+datum.getHours()).slice(-2)+":"+("0"+datum.getMinutes()).slice(-2)+":"+("0"+datum.getSeconds()).slice(-2);
            $http.post("/artikli/", cm.novi).then(function(response){
                if(response.data["status"] == "zavrseno") {
                    cm.dobaviArtikle();

                }
            },
            function(reason){
                console.log(reason);
            })
        };

        cm.proveriLozinke = function(){
            if (cm.noviKorisnik.lozinka == cm.lozinka2) {
                return true;
            }
            else if (cm.izmenaKorisnik.lozinka == cm.lozinka2) {
                return true;
            }
            else{
            	cm.noviKorisnik.lozinka = null;
                cm.izmenaKorisnik.lozinka = null;
            	cm.lozinka2 = null;
                return false;
            }
        }

        cm.proveriKorisnickoIme = function(){
            var i = 0;
            for (var k in cm.korisnici[i].korisnicko_ime){
                if (i > cm.korisnici.length - 1)
                    break;
                if (cm.korisnici[k].korisnicko_ime == cm.noviKorisnik.korisnicko_ime){
                    cm.noviKorisnik.korisnicko_ime = null; 
                    return false;
                }
                i++;
            }
            return true;
        }

        cm.dodajKorisnika = function() {
            if (cm.noviKorisnik["profilna_slika_URL"] == "") {
                 cm.noviKorisnik["profilna_slika"] = "/images/profile.png"
            }
            else{
                cm.noviKorisnik["profilna_slika"] = cm.noviKorisnik["profilna_slika_URL"];
            }
            $http.post("/korisnici/", cm.noviKorisnik).then(function(response){
                if(response.data["status"] == "zavrseno") {
                    cm.dobaviKorisnike();
                    cm.lozinka2 = "";
                    cm.prijavaPrikazi();
                }
            },
            function(reason){
                console.log(reason);
            })
        };

        cm.dobaviArtikal = function(id) {
            $http.get("/artikli/"+id).then(function(response){
                cm.artikal = response.data;
            },
            function(reason){
                console.log(reason)
            });
        };

        cm.dobaviKategoriju = function(nazivKategorije) {
            cm.filterKorisnik = "";
            cm.artikliInd = true;
            cm.noviInd = false;
            cm.prijavaInd = false;
            cm.registracijaInd = false;
            cm.korisnikInd = false;
            cm.detaljiInd = false;
            cm.odustaniOdIzmene();
            cm.novi = {
	            "naziv": "",
	            "opis": "",
	            "slika": "",
                "slika_URL": "",
	            "cena": 1,
	            "stanje": "",
	            "kolicina": 1,
	            "datum": "",
	            "kategorije_id": "",
	            "korisnici_id": "",
	            "korisnik": "",
	            "kategorija": ""
	        };
            $http.get("/kategorije/"+nazivKategorije).then(function(response){
                cm.jednaKategorija = nazivKategorije;
            },
            function(reason){
                console.log(reason)
            });
        };

        cm.ukloni = function(id) {
            $http.delete("/artikli/"+id).then(function(response){
                cm.dobaviArtikle();
            },
            function(reason){
                console.log(reason)
            });
        };

        cm.ukloniKorisnika = function(id) {
            $http.delete("/korisnici/"+id).then(function(response){
                cm.dobaviKorisnike();
            },
            function(reason){
                console.log(reason)
            });
        };

        cm.nadjiKategoriju = function(nazivKategorije){
        	for (k in cm.kategorije){
        		if (nazivKategorije == cm.kategorije[k].nazivKategorije) {
        			return cm.kategorije[k];
        		}
        	}
        	return null;
        }

        cm.pripremiZaIzmenu = function(artikal) {
        	cm.sakrijArtikle();
            cm.zaIzmenu = angular.copy(artikal);
            cm.zaIzmenu.kategorija = cm.nadjiKategoriju(artikal.nazivKategorije);
        }

        cm.pripremiZaIzmenuKorisnik = function(korisnik) {
            cm.sakrijArtikle();
            cm.korisnikInd = false;
            cm.izmenaKorisnik = angular.copy(korisnik);
        }

        cm.odustaniOdIzmene = function() {
            cm.zaIzmenu = {};
            cm.izmenaKorisnik = {};
            cm.lozinka2 = "";
            cm.artikliInd = true;
        }

        cm.izmeniArtikal = function() {
            cm.zaIzmenu["kategorije_id"] = cm.zaIzmenu["kategorija"]["id"];
            var datum = new Date();
            cm.zaIzmenu["datum"] = ("0"+datum.getDate()).slice(-2)+"."+("0"+(datum.getMonth()+1)).slice(-2)+"."+datum.getFullYear()+"."+" "
            					+("0"+datum.getHours()).slice(-2)+":"+("0"+datum.getMinutes()).slice(-2)+":"+("0"+datum.getSeconds()).slice(-2);

            $http.put("/artikli/"+cm.zaIzmenu.id, cm.zaIzmenu).then(function(response){
                alert("Uspešna izmena.");
                cm.dobaviArtikle();
                cm.zaIzmenu = {};

            },

            function(reason){
                console.log(reason)
            });
        }

        cm.izmeniKorisnika = function() {
            $http.put("/korisnici/"+cm.izmenaKorisnik.id, cm.izmenaKorisnik).then(function(response){
                cm.dobaviKorisnike();
                cm.lozinka2 = "";
                cm.prijavljenKorisnik["korisnicko_ime"]=cm.izmenaKorisnik["korisnicko_ime"]
                cm.prijavljenKorisnik["ime"]=cm.izmenaKorisnik["ime"]
                cm.prijavljenKorisnik["prezime"]=cm.izmenaKorisnik["prezime"]
                cm.prijavljenKorisnik["adresa"]=cm.izmenaKorisnik["adresa"]
                cm.prijavljenKorisnik["email"]=cm.izmenaKorisnik["email"]
                cm.prijavljenKorisnik["telefon"]=cm.izmenaKorisnik["telefon"]
                cm.prijavljenKorisnik["profilna_slika_URL"]=cm.izmenaKorisnik["profilna_slika_URL"]
                cm.izmenaKorisnik = {};
                cm.korisnikInd = true;
                
            },
            function(reason){
        
                console.log(reason)
            });
        }

        cm.izmeniKorisnika2 = function() {
            $http.put("/korisnici/"+cm.izmenaKorisnik.id, cm.izmenaKorisnik).then(function(response){
            },
            function(reason){
        
                console.log(reason)
            });
        }

        cm.prijava = function() {
            for (k in cm.korisnici){
                if (cm.korisnici[k].korisnicko_ime == cm.korisnicko_ime && cm.korisnici[k].lozinka == cm.lozinka) {
                    cm.prijavljenKorisnik = cm.korisnici[k];
                    cm.dobaviArtikle();
                    cm.prijavljen = true;
                    cm.korisnicko_ime = "";
                    cm.lozinka = "";
                }
            }
            if(cm.prijavaInd){
                cm.korisnicko_ime = null;
                cm.lozinka = null;
            }
        }

        cm.noviPrikazi = function(){
            if (cm.prijavljen) {
                cm.noviInd = true;
            }
            else{
                alert("Prijavite se na sistem.");
                cm.prijavaPrikazi();
            }
            cm.detaljiInd = false;
            cm.korisnikInd = false;
            cm.zaIzmenu = {};
            cm.izmenaKorisnik = {};
            cm.sakrijArtikle();
        }

        cm.prijavaPrikazi = function(){
            cm.prijavaInd = true;
            cm.registracijaInd = false;
            cm.sakrijArtikle();
            cm.detaljiInd = false;
        }

        cm.registracijaPrikazi = function(){
            cm.registracijaInd = true;
            cm.prijavaInd = false;
            cm.detaljiInd = false;
            cm.sakrijArtikle();
        }

        cm.nadjiKorisnika = function(id){
        	for (k in cm.korisnici){
        		if (id == cm.korisnici[k].id) {
        			return cm.korisnici[k];
        		}
        	}
        	return null;
        }

        cm.prikaziDetalje = function(artikal){
        	cm.detaljiInd = true;
        	cm.sakrijArtikle();
        	cm.zaPrikaz = angular.copy(artikal);
            cm.zaPrikaz.kategorija = cm.nadjiKategoriju(artikal.nazivKategorije);
            cm.zaPrikaz.korisnik = cm.nadjiKorisnika(artikal.korisnici_id);
        }

        cm.odjava = function(){
        	cm.prijavljenKorisnik = undefined;
            cm.prijavljen=false;
            cm.dobaviArtikle();
        }

        cm.kupi = function(artikal){
        	if (cm.prijavljenKorisnik == undefined) {
        		alert("Prijavite se na sistem.");
        		cm.prijavaPrikazi();
        	}
        	else if (artikal.kolicina < 1) {
        		alert("Nažalost, Vaš artikal trenutno nemamo na stanju.");
        	}
        	else if (cm.kolicinaKupi < 1) {
        		alert("Neispravan iznos količine.");
        	}
        	else if (artikal.cena*cm.kolicinaKupi <= cm.prijavljenKorisnik.stanje_racuna) {
        		alert("Uspešno ste obavili Vašu online kupovinu!");
        		cm.zaIzmenu2 = artikal;
	            cm.zaIzmenu2["kategorije_id"] = cm.zaIzmenu2["kategorija"]["id"];
	            cm.zaIzmenu2["kolicina"] = cm.zaIzmenu2["kolicina"] - cm.kolicinaKupi;
	            var datum = new Date(cm.zaIzmenu2["datum"]);
	            cm.zaIzmenu2["datum"] = ("0"+datum.getDate()).slice(-2)+"."+("0"+(datum.getMonth()+1)).slice(-2)+"."+datum.getFullYear()+"."+" "
	            					+("0"+datum.getHours()).slice(-2)+":"+("0"+datum.getMinutes()).slice(-2)+":"+("0"+datum.getSeconds()).slice(-2);
	            $http.put("/artikli/"+cm.zaIzmenu2.id, cm.zaIzmenu2).then(function(response){
	                cm.dobaviArtikle();
	                cm.zaIzmenu2 = {};
	            },
	            function(reason){
	                console.log(reason)
	            });
	            cm.izmenaKorisnik = cm.prijavljenKorisnik;
	            cm.izmenaKorisnik["stanje_racuna"] -= artikal.cena*cm.kolicinaKupi;
	            cm.izmeniKorisnika2();
        	}
        	else{
        		alert("Nedovoljan iznos na računu.");
        	}
        	cm.kolicinaKupi = 0;
        }

        cm.mojProfil = function(){
        	cm.korisnikInd = true;
        	cm.detaljiInd = false;
            cm.noviInd = false;
            cm.izmenaKorisnik = {};
            cm.zaIzmenu = {};
        	cm.sakrijArtikle();
        }

        cm.autor = function(artikal){
        	if (!cm.prijavljen)
        		return false;
            else if(artikal.korisnici_id == cm.prijavljenKorisnik.id)
                return true;
            else
            	return false;
        }

        cm.sortiraj = function(kriterijum){
            cm.kriterijum = kriterijum;
        }

        cm.mojiArtikli = function(){
            cm.dobaviArtikle();
            cm.filterKorisnik = cm.prijavljenKorisnik.korisnicko_ime;
        }

        cm.promeniSmer = function(){
            if (cm.smer == false) {
                cm.smer = true;
                cm.smerSimbol = "opadajući";
            }
            else if (cm.smer == true) {
                cm.smer = false;
                cm.smerSimbol = "rastući";
            }
        }

        cm.dobaviArtikle();
    });
})(angular);