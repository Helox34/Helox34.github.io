/* --- BAZA DANYCH: CHRONO-DLE (POLSKA) --- */
const rawData = {
    "modern": [
        { "date": "1901", "description": "Strajk dzieci we Wrześni", "category": "społeczeństwo" },
        { "date": "1905", "description": "Rewolucja 1905 roku w Królestwie Polskim", "category": "powstanie" },
        { "date": "1914", "description": "Wymarsz Pierwszej Kompanii Kadrowej", "category": "wojna" },
        { "date": "1916", "description": "Akt 5 listopada", "category": "polityka" },
        { "date": "1918", "description": "Odzyskanie Niepodległości (11 listopada)", "category": "objęcie władzy" },
        { "date": "1918", "description": "Piłsudski Tymczasowym Naczelnikiem Państwa", "category": "objęcie władzy" },
        { "date": "1918", "description": "Wybuch Powstania Wielkopolskiego", "category": "powstanie" },
        { "date": "1919", "description": "Pierwsze wybory do Sejmu Ustawodawczego", "category": "polityka" },
        { "date": "1919", "description": "Podpisanie Traktatu Wersalskiego", "category": "traktat" },
        { "date": "1919", "description": "Wybuch I Powstania Śląskiego", "category": "powstanie" },
        { "date": "1920", "description": "Zaślubiny Polski z morzem", "category": "inne" },
        { "date": "1920", "description": "Bitwa Warszawska (Cud nad Wisłą)", "category": "bitwa" },
        { "date": "1921", "description": "Uchwalenie Konstytucji Marcowej", "category": "prawo" },
        { "date": "1921", "description": "Traktat Ryski", "category": "traktat" },
        { "date": "1922", "description": "Gabriel Narutowicz pierwszym prezydentem", "category": "prezydent" },
        { "date": "1922", "description": "Zamach na prezydenta Narutowicza", "category": "zamach" },
        { "date": "1922", "description": "Stanisław Wojciechowski prezydentem", "category": "prezydent" },
        { "date": "1924", "description": "Reforma walutowa Grabskiego (Złoty)", "category": "gospodarka" },
        { "date": "1926", "description": "Przewrót majowy", "category": "zamach stanu" },
        { "date": "1926", "description": "Ignacy Mościcki prezydentem", "category": "prezydent" },
        { "date": "1932", "description": "Pakt o nieagresji z ZSRR", "category": "traktat" },
        { "date": "1934", "description": "Deklaracja o niestosowaniu przemocy z Niemcami", "category": "traktat" },
        { "date": "1935", "description": "Uchwalenie Konstytucji Kwietniowej", "category": "prawo" },
        { "date": "1935", "description": "Śmierć Marszałka Piłsudskiego", "category": "inne" },
        { "date": "1938", "description": "Zajęcie Zaolzia", "category": "wojna" },
        { "date": "1939", "description": "Pakt Ribbentrop-Mołotow", "category": "traktat" },
        { "date": "1939", "description": "Agresja Niemiec na Polskę (1 września)", "category": "wojna" },
        { "date": "1939", "description": "Agresja ZSRR na Polskę (17 września)", "category": "wojna" },
        { "date": "1939", "description": "Władysław Raczkiewicz prezydentem na Uchodźstwie", "category": "prezydent" },
        { "date": "1940", "description": "Zbrodnia Katyńska", "category": "zbrodnia" },
        { "date": "1943", "description": "Powstanie w getcie warszawskim", "category": "powstanie" },
        { "date": "1943", "description": "Katastrofa w Gibraltarze (Sikorski)", "category": "katastrofa" },
        { "date": "1944", "description": "Zdobycie Monte Cassino", "category": "bitwa" },
        { "date": "1944", "description": "Wybuch Powstania Warszawskiego", "category": "powstanie" },
        { "date": "1945", "description": "Konferencja jałtańska", "category": "traktat" },
        { "date": "1945", "description": "Zakończenie II wojny światowej", "category": "wojna" },
        { "date": "1947", "description": "Bolesław Bierut prezydentem", "category": "prezydent" },
        { "date": "1948", "description": "Powstanie PZPR", "category": "polityka" },
        { "date": "1952", "description": "Konstytucja PRL (Polska Rzeczpospolita Ludowa)", "category": "prawo" },
        { "date": "1956", "description": "Poznański Czerwiec", "category": "protest" },
        { "date": "1956", "description": "Polski Październik (Gomułka)", "category": "objęcie władzy" },
        { "date": "1966", "description": "Millenium Chrztu Polski", "category": "religia" },
        { "date": "1968", "description": "Marzec '68 (protesty studenckie)", "category": "protest" },
        { "date": "1970", "description": "Grudzień '70 (Gierek I sekretarzem)", "category": "protest" },
        { "date": "1976", "description": "Czerwiec '76 (Radom, Ursus)", "category": "protest" },
        { "date": "1978", "description": "Wybór Jana Pawła II", "category": "religia" },
        { "date": "1980", "description": "Porozumienia Sierpniowe (Solidarność)", "category": "traktat" },
        { "date": "1981", "description": "Stan wojenny", "category": "polityka" },
        { "date": "1983", "description": "Pokojowa Nagroda Nobla dla Wałęsy", "category": "nagroda" },
        { "date": "1989", "description": "Obrady Okrągłego Stołu", "category": "polityka" },
        { "date": "1989", "description": "Wybory czerwcowe", "category": "wybory" },
        { "date": "1989", "description": "Wojciech Jaruzelski prezydentem", "category": "prezydent" },
        { "date": "1989", "description": "Rząd Tadeusza Mazowieckiego", "category": "objęcie władzy" },
        { "date": "1989", "description": "Przywrócenie nazwy Rzeczpospolita Polska", "category": "prawo" },
        { "date": "1990", "description": "Plan Balcerowicza", "category": "gospodarka" },
        { "date": "1990", "description": "Lech Wałęsa prezydentem RP", "category": "prezydent" },
        { "date": "1991", "description": "Pierwsze w pełni wolne wybory do Sejmu", "category": "wybory" },
        { "date": "1993", "description": "Wyjazd wojsk rosyjskich z Polski", "category": "wojna" },
        { "date": "1995", "description": "Aleksander Kwaśniewski prezydentem", "category": "prezydent" },
        { "date": "1997", "description": "Konstytucja RP", "category": "prawo" },
        { "date": "1997", "description": "Powódź tysiąclecia", "category": "klęska żywiołowa" },
        { "date": "1999", "description": "Wstąpienie Polski do NATO", "category": "traktat" },
        { "date": "2000", "description": "Reelekcja Kwaśniewskiego", "category": "prezydent" },
        { "date": "2004", "description": "Wstąpienie Polski do UE", "category": "traktat" },
        { "date": "2005", "description": "Śmierć Jana Pawła II", "category": "religia" },
        { "date": "2005", "description": "Lech Kaczyński prezydentem", "category": "prezydent" },
        { "date": "2007", "description": "Wejście do strefy Schengen", "category": "traktat" },
        { "date": "2010", "description": "Katastrofa smoleńska", "category": "katastrofa" },
        { "date": "2010", "description": "Bronisław Komorowski prezydentem", "category": "prezydent" },
        { "date": "2012", "description": "Euro 2012 w Polsce", "category": "sport" },
        { "date": "2014", "description": "Tusk szefem Rady Europejskiej", "category": "polityka" },
        { "date": "2015", "description": "Andrzej Duda prezydentem", "category": "prezydent" },
        { "date": "2016", "description": "Szczyt NATO w Warszawie", "category": "polityka" },
        { "date": "2019", "description": "Nobel dla Olgi Tokarczuk", "category": "nagroda" },
        { "date": "2020", "description": "Pandemia COVID-19 w Polsce", "category": "zdrowie" },
        { "date": "2020", "description": "Reelekcja Andrzeja Dudy", "category": "prezydent" },
        { "date": "2022", "description": "Wybuch wojny na Ukrainie (pomoc)", "category": "wojna" },
        { "date": "2022", "description": "Przekop Mierzei Wiślanej", "category": "gospodarka" },
        { "date": "2023", "description": "Wybory 15 października", "category": "wybory" },
        { "date": "2023", "description": "Rząd Donalda Tuska", "category": "objęcie władzy" },
        { "date": "2024", "description": "25 lat w NATO (wizyta w USA)", "category": "polityka" },
        { "date": "2024", "description": "20 lat w Unii Europejskiej", "category": "święto" }
    ],
    "empires": [
        { "date": "1702", "description": "Bitwa pod Kliszowem", "category": "bitwa" },
        { "date": "1704", "description": "I elekcja Stanisława Leszczyńskiego", "category": "koronacja" },
        { "date": "1709", "description": "Bitwa pod Połtawą", "category": "bitwa" },
        { "date": "1717", "description": "Sejm Niemy", "category": "polityka" },
        { "date": "1733", "description": "II elekcja Stanisława Leszczyńskiego", "category": "koronacja" },
        { "date": "1733", "description": "Elekcja Augusta III Sasa", "category": "koronacja" },
        { "date": "1740", "description": "Collegium Nobilium", "category": "edukacja" },
        { "date": "1747", "description": "Biblioteka Załuskich", "category": "kultura" },
        { "date": "1764", "description": "Elekcja Stanisława Augusta Poniatowskiego", "category": "koronacja" },
        { "date": "1765", "description": "Szkoła Rycerska", "category": "edukacja" },
        { "date": "1765", "description": "Teatr Narodowy", "category": "kultura" },
        { "date": "1768", "description": "Konfederacja barska", "category": "powstanie" },
        { "date": "1772", "description": "I rozbiór Polski", "category": "traktat" },
        { "date": "1773", "description": "Komisja Edukacji Narodowej", "category": "edukacja" },
        { "date": "1788", "description": "Sejm Wielki", "category": "polityka" },
        { "date": "1789", "description": "Czarna procesja", "category": "polityka" },
        { "date": "1791", "description": "Konstytucja 3 Maja", "category": "prawo" },
        { "date": "1792", "description": "Konfederacja targowicka", "category": "zdrada" },
        { "date": "1792", "description": "Bitwa pod Zieleńcami (Virtuti Militari)", "category": "bitwa" },
        { "date": "1793", "description": "II rozbiór Polski", "category": "traktat" },
        { "date": "1794", "description": "Insurekcja kościuszkowska", "category": "powstanie" },
        { "date": "1794", "description": "Bitwa pod Racławicami", "category": "bitwa" },
        { "date": "1794", "description": "Uniwersał Połaniecki", "category": "prawo" },
        { "date": "1794", "description": "Rzeź Pragi", "category": "zbrodnia" },
        { "date": "1795", "description": "III rozbiór Polski", "category": "traktat" },
        { "date": "1795", "description": "Abdykacja Poniatowskiego", "category": "ustąpienie władzy" },
        { "date": "1797", "description": "Legiony Polskie we Włoszech", "category": "wojsko" },
        { "date": "1797", "description": "Mazurek Dąbrowskiego", "category": "kultura" },
        { "date": "1800", "description": "Towarzystwo Przyjaciół Nauk", "category": "kultura" },
        { "date": "1806", "description": "Wjazd Napoleona do Poznania", "category": "wojna" },
        { "date": "1807", "description": "Pokój w Tylży (Księstwo Warszawskie)", "category": "traktat" },
        { "date": "1808", "description": "Szarża pod Somosierrą", "category": "bitwa" },
        { "date": "1809", "description": "Bitwa pod Raszynem", "category": "bitwa" },
        { "date": "1813", "description": "Śmierć ks. Józefa Poniatowskiego (Lipsk)", "category": "bitwa" },
        { "date": "1815", "description": "Kongres Wiedeński (Królestwo Polskie)", "category": "traktat" },
        { "date": "1816", "description": "Uniwersytet Warszawski", "category": "edukacja" },
        { "date": "1817", "description": "Zakład Narodowy im. Ossolińskich", "category": "kultura" },
        { "date": "1825", "description": "Towarzystwo Kredytowe Ziemskie", "category": "gospodarka" },
        { "date": "1828", "description": "Bank Polski", "category": "gospodarka" },
        { "date": "1830", "description": "Powstanie Listopadowe", "category": "powstanie" },
        { "date": "1831", "description": "Detronizacja Mikołaja I", "category": "polityka" },
        { "date": "1831", "description": "Bitwa o Olszynkę Grochowską", "category": "bitwa" },
        { "date": "1831", "description": "Bitwa pod Ostrołęką", "category": "bitwa" },
        { "date": "1832", "description": "Statut Organiczny", "category": "prawo" },
        { "date": "1834", "description": "Wydanie 'Pana Tadeusza'", "category": "kultura" },
        { "date": "1846", "description": "Rabacja galicyjska", "category": "powstanie" },
        { "date": "1846", "description": "Powstanie Krakowskie", "category": "powstanie" },
        { "date": "1848", "description": "Wiosna Ludów (Poznań)", "category": "powstanie" },
        { "date": "1848", "description": "Zniesienie pańszczyzny w Galicji", "category": "prawo" },
        { "date": "1853", "description": "Lampa naftowa Łukasiewicza", "category": "nauka" },
        { "date": "1863", "description": "Powstanie Styczniowe", "category": "powstanie" },
        { "date": "1864", "description": "Uwłaszczenie chłopów", "category": "prawo" },
        { "date": "1864", "description": "Stracenie Traugutta", "category": "egzekucja" },
        { "date": "1867", "description": "Autonomia Galicji", "category": "prawo" },
        { "date": "1871", "description": "Akademia Umiejętności w Krakowie", "category": "nauka" },
        { "date": "1873", "description": "Matejko kończy 'Bitwę pod Grunwaldem'", "category": "kultura" },
        { "date": "1885", "description": "Rugi pruskie", "category": "represje" },
        { "date": "1892", "description": "Powstanie PPS", "category": "polityka" },
        { "date": "1898", "description": "Odkrycie polonu i radu", "category": "nauka" }
    ],
    "renaissance": [
        { "date": "1226", "description": "Sprowadzenie Krzyżaków", "category": "polityka" },
        { "date": "1227", "description": "Zjazd w Gąsawie (śmierć Leszka Białego)", "category": "zamach" },
        { "date": "1241", "description": "Bitwa pod Legnicą (Mongołowie)", "category": "bitwa" },
        { "date": "1253", "description": "Kanonizacja św. Stanisława", "category": "religia" },
        { "date": "1257", "description": "Lokacja Krakowa", "category": "lokacja" },
        { "date": "1295", "description": "Koronacja Przemysła II", "category": "koronacja" },
        { "date": "1308", "description": "Rzeź Gdańska (Krzyżacy)", "category": "wojna" },
        { "date": "1320", "description": "Koronacja Władysława Łokietka", "category": "koronacja" },
        { "date": "1331", "description": "Bitwa pod Płowcami", "category": "bitwa" },
        { "date": "1333", "description": "Koronacja Kazimierza Wielkiego", "category": "koronacja" },
        { "date": "1343", "description": "Pokój w Kaliszu", "category": "traktat" },
        { "date": "1364", "description": "Akademia Krakowska", "category": "edukacja" },
        { "date": "1364", "description": "Uczta u Wierzynka", "category": "polityka" },
        { "date": "1370", "description": "Śmierć Kazimierza Wielkiego", "category": "śmierć władcy" },
        { "date": "1374", "description": "Przywilej koszycki", "category": "prawo" },
        { "date": "1384", "description": "Koronacja Jadwigi", "category": "koronacja" },
        { "date": "1385", "description": "Unia w Krewie", "category": "traktat" },
        { "date": "1386", "description": "Chrzest Jagiełły", "category": "koronacja" },
        { "date": "1409", "description": "Wielka Wojna z Zakonem", "category": "wojna" },
        { "date": "1410", "description": "Bitwa pod Grunwaldem", "category": "bitwa" },
        { "date": "1411", "description": "I Pokój Toruński", "category": "traktat" },
        { "date": "1413", "description": "Unia w Horodle", "category": "traktat" },
        { "date": "1434", "description": "Koronacja Warneńczyka", "category": "koronacja" },
        { "date": "1444", "description": "Bitwa pod Warną", "category": "bitwa" },
        { "date": "1447", "description": "Koronacja Kazimierza Jagiellończyka", "category": "koronacja" },
        { "date": "1454", "description": "Inkorporacja Prus", "category": "polityka" },
        { "date": "1454", "description": "Przywileje nieszawskie", "category": "prawo" },
        { "date": "1466", "description": "II Pokój Toruński", "category": "traktat" },
        { "date": "1493", "description": "Pierwszy Sejm Walny", "category": "polityka" },
        { "date": "1496", "description": "Przywilej piotrkowski", "category": "prawo" },
        { "date": "1505", "description": "Konstytucja Nihil novi", "category": "prawo" },
        { "date": "1514", "description": "Bitwa pod Orszą", "category": "bitwa" },
        { "date": "1515", "description": "Zjazd wiedeński", "category": "traktat" },
        { "date": "1518", "description": "Ślub z Boną Sforzą", "category": "inne" },
        { "date": "1525", "description": "Hołd Pruski", "category": "traktat" },
        { "date": "1526", "description": "Włączenie Mazowsza", "category": "terytorium" },
        { "date": "1543", "description": "O obrotach sfer niebieskich", "category": "nauka" },
        { "date": "1569", "description": "Unia Lubelska", "category": "traktat" },
        { "date": "1572", "description": "Śmierć Zygmunta Augusta", "category": "śmierć władcy" },
        { "date": "1573", "description": "Konfederacja warszawska", "category": "prawo" },
        { "date": "1573", "description": "Elekcja Henryka Walezego", "category": "wybory" },
        { "date": "1576", "description": "Koronacja Stefana Batorego", "category": "koronacja" },
        { "date": "1578", "description": "Trybunał Koronny", "category": "prawo" },
        { "date": "1579", "description": "Akademia Wileńska", "category": "edukacja" },
        { "date": "1587", "description": "Elekcja Zygmunta III Wazy", "category": "wybory" },
        { "date": "1596", "description": "Unia brzeska", "category": "religia" },
        { "date": "1596", "description": "Stolica w Warszawie", "category": "polityka" },
        { "date": "1605", "description": "Bitwa pod Kircholmem", "category": "bitwa" },
        { "date": "1610", "description": "Bitwa pod Kłuszynem", "category": "bitwa" },
        { "date": "1610", "description": "Polacy na Kremlu", "category": "wojna" },
        { "date": "1611", "description": "Hołd Ruski", "category": "inne" },
        { "date": "1619", "description": "Rozejm w Dywilinie", "category": "traktat" },
        { "date": "1621", "description": "Obrona Chocimia", "category": "bitwa" },
        { "date": "1627", "description": "Bitwa pod Oliwą", "category": "bitwa" },
        { "date": "1648", "description": "Powstanie Chmielnickiego", "category": "powstanie" },
        { "date": "1652", "description": "Pierwsze Liberum Veto", "category": "polityka" },
        { "date": "1655", "description": "Potop szwedzki", "category": "wojna" },
        { "date": "1655", "description": "Obrona Jasnej Góry", "category": "bitwa" },
        { "date": "1656", "description": "Śluby lwowskie", "category": "religia" },
        { "date": "1660", "description": "Pokój w Oliwie", "category": "traktat" },
        { "date": "1673", "description": "Bitwa pod Chocimiem (Sobieski)", "category": "bitwa" },
        { "date": "1674", "description": "Elekcja Jana III Sobieskiego", "category": "wybory" },
        { "date": "1683", "description": "Odsiecz Wiedeńska", "category": "bitwa" },
        { "date": "1697", "description": "Elekcja Augusta II (Sasi)", "category": "wybory" },
        { "date": "1699", "description": "Pokój w Karłowicach", "category": "traktat" }
    ],
    "ancient": [
        { "date": "-700", "description": "Osada w Biskupinie", "category": "cywilizacja" },
        { "date": "960", "description": "Władza Mieszka I", "category": "objęcie władzy" },
        { "date": "965", "description": "Dobrawa przybywa do Polski", "category": "polityka" },
        { "date": "966", "description": "Chrzest Polski", "category": "religia" },
        { "date": "968", "description": "Biskupstwo w Poznaniu", "category": "religia" },
        { "date": "972", "description": "Bitwa pod Cedynią", "category": "bitwa" },
        { "date": "990", "description": "Dagome iudex", "category": "prawo" },
        { "date": "992", "description": "Bolesław Chrobry władcą", "category": "objęcie władzy" },
        { "date": "997", "description": "Śmierć św. Wojciecha", "category": "religia" },
        { "date": "1000", "description": "Zjazd gnieźnieński", "category": "polityka" },
        { "date": "1002", "description": "Wojna z Niemcami", "category": "wojna" },
        { "date": "1018", "description": "Pokój w Budziszynie", "category": "traktat" },
        { "date": "1018", "description": "Wyprawa kijowska (Szczerbiec)", "category": "wojna" },
        { "date": "1025", "description": "Koronacja Chrobrego", "category": "koronacja" },
        { "date": "1025", "description": "Koronacja Mieszka II", "category": "koronacja" },
        { "date": "1031", "description": "Ucieczka Mieszka II", "category": "wojna" },
        { "date": "1039", "description": "Najazd Brzetysława", "category": "wojna" },
        { "date": "1039", "description": "Kraków stolicą (Odnowiciel)", "category": "objęcie władzy" },
        { "date": "1076", "description": "Koronacja Bolesława Śmiałego", "category": "koronacja" },
        { "date": "1079", "description": "Śmierć biskupa Stanisława", "category": "polityka" },
        { "date": "1109", "description": "Obrona Głogowa", "category": "bitwa" },
        { "date": "1109", "description": "Psie Pole", "category": "bitwa" },
        { "date": "1116", "description": "Odzyskanie Pomorza", "category": "terytorium" },
        { "date": "1138", "description": "Statut Krzywoustego (Rozbicie)", "category": "prawo" },
        { "date": "1180", "description": "Zjazd w Łęczycy", "category": "prawo" }
    ]
};

// --- LOGIKA GRY ---
const game = {
    state: { left: null, right: null, score: 0, isAnimating: false, mode: 'mix', currentPool: [] },

    ui: {
        menu: document.getElementById('menu'),
        game: document.getElementById('game'),
        left: { img: document.getElementById('img-left'), name: document.getElementById('name-left'), val: document.getElementById('val-left') },
        right: { img: document.getElementById('img-right'), name: document.getElementById('name-right'), val: document.getElementById('val-right'), btns: document.getElementById('buttons-area'), res: document.getElementById('result-area') },
        score: document.getElementById('current-score'),
        best: document.getElementById('best-score'),
        modal: document.getElementById('game-over'),
        msg: document.getElementById('loss-msg'),
        final: document.getElementById('final-score-val')
    },

    init() {
        this.updateMenuScores();

        // Rejestruj gracza w Firebase
        const username = typeof UserManager !== 'undefined' ? UserManager.getCurrentUser() : null;
        if (typeof FirebaseLeaderboard !== 'undefined' && window.db && username) {
            FirebaseLeaderboard.registerPlayer('chronodle', username);
        }

        // Renderuj ranking z Firebase (domyślnie mix)
        this.renderFirebaseLeaderboard('mix');
    },

    renderFirebaseLeaderboard(mode) {
        const container = document.getElementById('leaderboard-container');
        if (!container) return;

        const title = '🏆 TOP 10 NAJDŁUŻSZYCH PASS';

        if (typeof FirebaseLeaderboard !== 'undefined' && window.db) {
            FirebaseLeaderboard.listenToScores(
                'chronodle', mode || 'mix',
                (scores) => this.renderLeaderboardHTML(scores, container, title),
                10, false
            );
        } else if (typeof LeaderboardComponent !== 'undefined') {
            LeaderboardComponent.render(`chrono_${mode || 'mix'}_highscore`, 'leaderboard-container', {
                title: 'TOP 10 NAJDŁUŻSZYCH PASS',
                limit: 10,
                lowerIsBetter: false
            });
        }
    },

    renderLeaderboardHTML(scores, container, title) {
        const currentUser = typeof UserManager !== 'undefined' ? UserManager.getCurrentUser() : null;

        if (!scores || scores.length === 0) {
            container.innerHTML = `
                <div class="leaderboard">
                    <div class="leaderboard-glow"></div>
                    <h3 class="leaderboard-title">${title}</h3>
                    <p class="leaderboard-empty">Brak wyników — bądź pierwszy! 🚀</p>
                </div>`;
            return;
        }

        let rowsHTML = '';
        scores.forEach((entry, index) => {
            const pos = index + 1;
            const isCurrentUser = currentUser && entry.username === currentUser;
            const posIcon = pos === 1 ? '🥇' : pos === 2 ? '🥈' : pos === 3 ? '🥉' : `#${pos}`;
            const dateStr = entry.date ? this.formatLeaderboardDate(entry.date) : '';

            rowsHTML += `
                <div class="leaderboard-row ${isCurrentUser ? 'current-user' : ''}">
                    <span class="lbd-pos">${posIcon}</span>
                    <span class="lbd-name">${this.escapeHtml(entry.username)}</span>
                    <span class="lbd-score">${entry.score} 🔥</span>
                    <span class="lbd-date">${dateStr}</span>
                </div>`;
        });

        container.innerHTML = `
            <div class="leaderboard">
                <div class="leaderboard-glow"></div>
                <h3 class="leaderboard-title">${title}</h3>
                <div class="leaderboard-table">
                    <div class="leaderboard-header">
                        <span>#</span>
                        <span>Gracz</span>
                        <span>Passa</span>
                        <span>Data</span>
                    </div>
                    ${rowsHTML}
                </div>
            </div>`;
    },

    formatLeaderboardDate(isoDate) {
        const date = new Date(isoDate);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        if (diffMins < 1) return 'teraz';
        if (diffMins < 60) return `${diffMins} min temu`;
        if (diffHours < 24) return `${diffHours}h temu`;
        if (diffDays < 7) return `${diffDays} dni temu`;
        return date.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // Jeśli obrazek się nie wczyta, pokaż Godło Polski
    setupImageErrorHandling() {
        const fallbackImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Herb_Polski.svg/480px-Herb_Polski.svg.png";
        this.ui.left.img.onerror = () => { this.ui.left.img.src = fallbackImage; };
        this.ui.right.img.onerror = () => { this.ui.right.img.src = fallbackImage; };
    },

    updateMenuScores() {
        ['modern', 'empires', 'renaissance', 'ancient', 'mix'].forEach(mode => {
            const el = document.getElementById(`record-${mode}`);
            if (el) {
                el.textContent = localStorage.getItem(`chrono_${mode}_highscore`) || 0;
            }
        });
    },

    // Transformacja danych surowych na format gry
    prepareData(rawDataArray) {
        return rawDataArray.map(item => ({
            val: parseInt(item.date), // "1990" -> 1990
            name: item.description,
            // Jeśli nie ma img, użyj godła
            img: item.img || "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Herb_Polski.svg/480px-Herb_Polski.svg.png"
        }));
    },

    start(mode) {
        this.state.mode = mode;

        // Łączenie danych
        if (mode === 'mix') {
            const all = [
                ...rawData.modern, ...rawData.empires, ...rawData.renaissance, ...rawData.ancient
            ];
            this.state.currentPool = this.prepareData(all);
        } else {
            this.state.currentPool = this.prepareData(rawData[mode]);
        }

        this.ui.menu.classList.add('hidden');
        this.ui.game.classList.remove('hidden');
        this.ui.game.classList.add('fade-in');

        this.state.score = 0;
        this.ui.score.textContent = "0";
        this.ui.best.textContent = localStorage.getItem(`chrono_${mode}_highscore`) || 0;

        // Odśwież leaderboard dla wybranego trybu
        this.renderFirebaseLeaderboard(mode);

        this.state.left = this.getRandom();
        this.state.right = this.getSimilar(this.state.left);
        this.render();
        this.state.isAnimating = false;
    },

    backToMenu() {
        this.updateMenuScores();
        this.ui.game.classList.add('hidden');
        this.ui.modal.classList.add('hidden');
        this.ui.menu.classList.remove('hidden');
        this.ui.menu.classList.add('fade-in');
    },

    getRandom(exclude) {
        const pool = this.state.currentPool;
        let item;
        do {
            item = pool[Math.floor(Math.random() * pool.length)];
        } while (exclude && item.name === exclude.name);
        return item;
    },

    getSimilar(baseItem) {
        const pool = this.state.currentPool;
        // Szukamy wydarzenia w podobnym okresie (żeby było trudniej)
        let candidates = pool.filter(item =>
            item.name !== baseItem.name &&
            Math.abs(item.val - baseItem.val) < 150 // Zakres 150 lat
        );

        if (candidates.length < 1) {
            candidates = pool.filter(item => item.name !== baseItem.name);
        }
        return candidates[Math.floor(Math.random() * candidates.length)];
    },

    render() {
        const { left, right } = this.state;
        this.ui.left.name.textContent = left.name;
        this.ui.left.val.textContent = left.val < 0 ? `${Math.abs(left.val)} p.n.e.` : left.val;

        this.ui.right.name.textContent = right.name;
        this.ui.right.val.textContent = "???";

        this.ui.right.btns.classList.remove('hidden');
        this.ui.right.res.classList.add('hidden');
        this.ui.right.val.className = 'tl-year result-year';
    },

    guess(dir) {
        if (this.state.isAnimating) return;
        this.state.isAnimating = true;

        // PÓŹNIEJ = Rok większy (np. 2000 > 1900)
        // WCZEŚNIEJ = Rok mniejszy
        const correct = (dir === 'higher' && this.state.right.val >= this.state.left.val) ||
            (dir === 'lower' && this.state.right.val <= this.state.left.val);
        this.reveal(correct);
    },

    reveal(correct) {
        this.ui.right.btns.classList.add('hidden');
        this.ui.right.res.classList.remove('hidden');

        const yearText = this.state.right.val < 0 ? `${Math.abs(this.state.right.val)} p.n.e.` : this.state.right.val;
        this.ui.right.val.textContent = yearText;

        if (correct) {
            this.ui.right.val.className = 'tl-year result-year result-correct';
            setTimeout(() => this.next(), 1200);
        } else {
            this.ui.right.val.className = 'tl-year result-year result-wrong';
            setTimeout(() => this.over(), 1500);
        }
    },

    next() {
        this.state.score++;
        this.ui.score.textContent = this.state.score;
        this.state.left = this.state.right;
        this.state.right = this.getSimilar(this.state.left);
        this.render();
        this.state.isAnimating = false;
    },

    over() {
        const key = `chrono_${this.state.mode}_highscore`;
        const score = this.state.score;
        const best = parseInt(localStorage.getItem(key) || 0);

        if (score > best) {
            localStorage.setItem(key, score);
            this.ui.msg.textContent = `Nowy rekord! Poprawny rok: ${this.state.right.val}`;

            // Zapisz do systemu użytkowników
            if (typeof UserManager !== 'undefined') {
                UserManager.saveUserScore(key, score, false);
            }
        } else {
            this.ui.msg.textContent = `Błąd! To rok ${this.state.right.val}`;
        }

        // Zapisz do Firebase (saveScore sprawdzi czy to rekord)
        const username = typeof UserManager !== 'undefined' ? UserManager.getCurrentUser() : null;
        if (typeof FirebaseLeaderboard !== 'undefined' && window.db && username) {
            FirebaseLeaderboard.saveScore('chronodle', this.state.mode, username, score, false);
        }

        this.ui.final.textContent = score;
        this.ui.modal.classList.remove('hidden');
    },

    restart() {
        this.ui.modal.classList.add('hidden');
        this.state.score = 0;
        this.ui.score.textContent = "0";

        this.state.left = this.getRandom();
        this.state.right = this.getSimilar(this.state.left);
        this.render();
        this.state.isAnimating = false;
    }
};

game.init();