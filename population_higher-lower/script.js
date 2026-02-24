/* --- BAZA DANYCH: PEŁNA LISTA (195 + Terytoria) --- */
const countriesDB = [
    // --- AZJA ---
    { code: "CN", name: "Chiny", pop: 1425671000 },
    { code: "IN", name: "Indie", pop: 1428627000 },
    { code: "ID", name: "Indonezja", pop: 277534000 },
    { code: "PK", name: "Pakistan", pop: 240485000 },
    { code: "BD", name: "Bangladesz", pop: 172954000 },
    { code: "JP", name: "Japonia", pop: 123294000 },
    { code: "PH", name: "Filipiny", pop: 117337000 },
    { code: "VN", name: "Wietnam", pop: 98858000 },
    { code: "IR", name: "Iran", pop: 89172000 },
    { code: "TR", name: "Turcja", pop: 85816000 },
    { code: "TH", name: "Tajlandia", pop: 71801000 },
    { code: "MM", name: "Mjanma (Birma)", pop: 54577000 },
    { code: "KR", name: "Korea Południowa", pop: 51784000 },
    { code: "IQ", name: "Irak", pop: 45504000 },
    { code: "AF", name: "Afganistan", pop: 42239000 },
    { code: "SA", name: "Arabia Saudyjska", pop: 36947000 },
    { code: "UZ", name: "Uzbekistan", pop: 35163000 },
    { code: "YE", name: "Jemen", pop: 34449000 },
    { code: "MY", name: "Malezja", pop: 34308000 },
    { code: "NP", name: "Nepal", pop: 30896000 },
    { code: "KP", name: "Korea Północna", pop: 26160000 },
    { code: "TW", name: "Tajwan", pop: 23923000 }, // Dodatkowy
    { code: "SY", name: "Syria", pop: 23227000 },
    { code: "LK", name: "Sri Lanka", pop: 21893000 },
    { code: "KZ", name: "Kazachstan", pop: 19606000 },
    { code: "KH", name: "Kambodża", pop: 16944000 },
    { code: "JO", name: "Jordania", pop: 11337000 },
    { code: "AZ", name: "Azerbejdżan", pop: 10412000 },
    { code: "TJ", name: "Tadżykistan", pop: 10143000 },
    { code: "AE", name: "Zjedn. Emiraty Arabskie", pop: 9516000 },
    { code: "IL", name: "Izrael", pop: 9174000 },
    { code: "LA", name: "Laos", pop: 7633000 },
    { code: "KG", name: "Kirgistan", pop: 6691000 },
    { code: "TM", name: "Turkmenistan", pop: 6516000 },
    { code: "SG", name: "Singapur", pop: 6014000 },
    { code: "PS", name: "Palestyna", pop: 5371000 },
    { code: "LB", name: "Liban", pop: 5353000 },
    { code: "OM", name: "Oman", pop: 4644000 },
    { code: "KW", name: "Kuwejt", pop: 4310000 },
    { code: "GE", name: "Gruzja", pop: 3728000 },
    { code: "MN", name: "Mongolia", pop: 3447000 },
    { code: "AM", name: "Armenia", pop: 2777000 },
    { code: "QA", name: "Katar", pop: 2716000 },
    { code: "BH", name: "Bahrajn", pop: 1485000 },
    { code: "TL", name: "Timor Wschodni", pop: 1360000 },
    { code: "CY", name: "Cypr", pop: 1260000 },
    { code: "BT", name: "Bhutan", pop: 787000 },
    { code: "MV", name: "Malediwy", pop: 521000 },
    { code: "BN", name: "Brunei", pop: 452000 },

    // --- EUROPA ---
    { code: "RU", name: "Rosja", pop: 144444000 },
    { code: "DE", name: "Niemcy", pop: 83294000 },
    { code: "GB", name: "Wielka Brytania", pop: 67736000 },
    { code: "FR", name: "Francja", pop: 64756000 },
    { code: "IT", name: "Włochy", pop: 58870000 },
    { code: "ES", name: "Hiszpania", pop: 47519000 },
    { code: "UA", name: "Ukraina", pop: 36744000 }, // Szacunkowe
    { code: "PL", name: "Polska", pop: 37991000 }, // Zaktualizowane
    { code: "RO", name: "Rumunia", pop: 19892000 },
    { code: "NL", name: "Holandia", pop: 17618000 },
    { code: "BE", name: "Belgia", pop: 11686000 },
    { code: "CZ", name: "Czechy", pop: 10495000 },
    { code: "SE", name: "Szwecja", pop: 10612000 },
    { code: "PT", name: "Portugalia", pop: 10247000 },
    { code: "GR", name: "Grecja", pop: 10341000 },
    { code: "HU", name: "Węgry", pop: 10156000 },
    { code: "BY", name: "Białoruś", pop: 9498000 },
    { code: "AT", name: "Austria", pop: 8958000 },
    { code: "CH", name: "Szwajcaria", pop: 8796000 },
    { code: "RS", name: "Serbia", pop: 7149000 },
    { code: "BG", name: "Bułgaria", pop: 6687000 },
    { code: "DK", name: "Dania", pop: 5910000 },
    { code: "FI", name: "Finlandia", pop: 5545000 },
    { code: "NO", name: "Norwegia", pop: 5474000 },
    { code: "SK", name: "Słowacja", pop: 5795000 },
    { code: "IE", name: "Irlandia", pop: 5056000 },
    { code: "HR", name: "Chorwacja", pop: 4008000 },
    { code: "BA", name: "Bośnia i Hercegowina", pop: 3210000 },
    { code: "MD", name: "Mołdawia", pop: 3435000 },
    { code: "AL", name: "Albania", pop: 2832000 },
    { code: "LT", name: "Litwa", pop: 2718000 },
    { code: "MK", name: "Macedonia Północna", pop: 2085000 },
    { code: "SI", name: "Słowenia", pop: 2119000 },
    { code: "LV", name: "Łotwa", pop: 1830000 },
    { code: "XK", name: "Kosowo", pop: 1762000 }, // Dodatkowy
    { code: "EE", name: "Estonia", pop: 1322000 },
    { code: "LU", name: "Luksemburg", pop: 654000 },
    { code: "ME", name: "Czarnogóra", pop: 626000 },
    { code: "MT", name: "Malta", pop: 535000 },
    { code: "IS", name: "Islandia", pop: 375000 },
    { code: "AD", name: "Andora", pop: 80000 },
    { code: "LI", name: "Liechtenstein", pop: 39000 },
    { code: "MC", name: "Monako", pop: 36000 },
    { code: "SM", name: "San Marino", pop: 33000 },
    { code: "VA", name: "Watykan", pop: 800 },

    // --- AFRYKA ---
    { code: "NG", name: "Nigeria", pop: 223804000 },
    { code: "ET", name: "Etiopia", pop: 126527000 },
    { code: "EG", name: "Egipt", pop: 112716000 },
    { code: "CD", name: "Dem. Rep. Konga", pop: 102262000 },
    { code: "TZ", name: "Tanzania", pop: 67438000 },
    { code: "ZA", name: "RPA", pop: 60414000 },
    { code: "KE", name: "Kenia", pop: 55100000 },
    { code: "UG", name: "Uganda", pop: 48582000 },
    { code: "SD", name: "Sudan", pop: 48109000 },
    { code: "DZ", name: "Algieria", pop: 45606000 },
    { code: "MA", name: "Maroko", pop: 37840000 },
    { code: "AO", name: "Angola", pop: 36684000 },
    { code: "GH", name: "Ghana", pop: 34121000 },
    { code: "MZ", name: "Mozambik", pop: 33897000 },
    { code: "MG", name: "Madagaskar", pop: 30325000 },
    { code: "CI", name: "Wybrzeże Kości Słoniowej", pop: 28873000 },
    { code: "CM", name: "Kamerun", pop: 28647000 },
    { code: "NE", name: "Niger", pop: 27202000 },
    { code: "ML", name: "Mali", pop: 23293000 },
    { code: "BF", name: "Burkina Faso", pop: 23251000 },
    { code: "MW", name: "Malawi", pop: 20931000 },
    { code: "ZM", name: "Zambia", pop: 20569000 },
    { code: "TD", name: "Czad", pop: 18278000 },
    { code: "SO", name: "Somalia", pop: 18143000 },
    { code: "SN", name: "Senegal", pop: 17763000 },
    { code: "ZW", name: "Zimbabwe", pop: 16665000 },
    { code: "GN", name: "Gwinea", pop: 14190000 },
    { code: "RW", name: "Rwanda", pop: 14094000 },
    { code: "BJ", name: "Benin", pop: 13712000 },
    { code: "BI", name: "Burundi", pop: 13238000 },
    { code: "TN", name: "Tunezja", pop: 12458000 },
    { code: "SS", name: "Sudan Południowy", pop: 11088000 },
    { code: "TG", name: "Togo", pop: 9053000 },
    { code: "SL", name: "Sierra Leone", pop: 8791000 },
    { code: "LY", name: "Libia", pop: 6888000 },
    { code: "CG", name: "Kongo", pop: 6106000 },
    { code: "LR", name: "Liberia", pop: 5418000 },
    { code: "CF", name: "Rep. Środkowoafrykańska", pop: 5742000 },
    { code: "MR", name: "Mauretania", pop: 4862000 },
    { code: "ER", name: "Erytrea", pop: 3748000 },
    { code: "NA", name: "Namibia", pop: 2604000 },
    { code: "GM", name: "Gambia", pop: 2773000 },
    { code: "BW", name: "Botswana", pop: 2675000 },
    { code: "GA", name: "Gabon", pop: 2436000 },
    { code: "LS", name: "Lesotho", pop: 2330000 },
    { code: "GW", name: "Gwinea Bissau", pop: 2150000 },
    { code: "GQ", name: "Gwinea Równikowa", pop: 1714000 },
    { code: "MU", name: "Mauritius", pop: 1300000 },
    { code: "SZ", name: "Eswatini", pop: 1210000 },
    { code: "DJ", name: "Dżibuti", pop: 1136000 },
    { code: "KM", name: "Komory", pop: 852000 },
    { code: "EH", name: "Sahara Zachodnia", pop: 652000 }, // Dodatkowy
    { code: "CV", name: "Rep. Zielonego Przylądka", pop: 598000 },
    { code: "ST", name: "Wyspy Św. Tomasza", pop: 231000 },
    { code: "SC", name: "Seszele", pop: 107000 },

    // --- AMERYKA PÓŁNOCNA I POŁUDNIOWA ---
    { code: "US", name: "USA", pop: 339996000 },
    { code: "BR", name: "Brazylia", pop: 216422000 },
    { code: "MX", name: "Meksyk", pop: 128455000 },
    { code: "CO", name: "Kolumbia", pop: 52085000 },
    { code: "AR", name: "Argentyna", pop: 46000000 }, // Ok.
    { code: "CA", name: "Kanada", pop: 38781000 },
    { code: "PE", name: "Peru", pop: 34352000 },
    { code: "VE", name: "Wenezuela", pop: 28838000 },
    { code: "CL", name: "Chile", pop: 19629000 },
    { code: "EC", name: "Ekwador", pop: 18190000 },
    { code: "GT", name: "Gwatemala", pop: 18092000 },
    { code: "BO", name: "Boliwia", pop: 12388000 },
    { code: "HT", name: "Haiti", pop: 11724000 },
    { code: "CU", name: "Kuba", pop: 11194000 },
    { code: "DO", name: "Dominikana", pop: 11332000 },
    { code: "HN", name: "Honduras", pop: 10593000 },
    { code: "PY", name: "Paragwaj", pop: 6861000 },
    { code: "NI", name: "Nikaragua", pop: 7046000 },
    { code: "SV", name: "Salwador", pop: 6364000 },
    { code: "CR", name: "Kostaryka", pop: 5212000 },
    { code: "PA", name: "Panama", pop: 4468000 },
    { code: "UY", name: "Urugwaj", pop: 3423000 },
    { code: "JM", name: "Jamajka", pop: 2825000 },
    { code: "TT", name: "Trynidad i Tobago", pop: 1534000 },
    { code: "GY", name: "Gujana", pop: 813000 },
    { code: "SR", name: "Surinam", pop: 623000 },
    { code: "BZ", name: "Belize", pop: 410000 },
    { code: "BS", name: "Bahamy", pop: 412000 },
    { code: "BB", name: "Barbados", pop: 281000 },
    { code: "LC", name: "Saint Lucia", pop: 180000 },
    { code: "GD", name: "Grenada", pop: 126000 },
    { code: "VC", name: "St. Vincent i Grenadyny", pop: 103000 },
    { code: "AG", name: "Antigua i Barbuda", pop: 93000 },
    { code: "DM", name: "Dominika", pop: 73000 },
    { code: "KN", name: "Saint Kitts i Nevis", pop: 47000 },

    // --- AUSTRALIA I OCEANIA ---
    { code: "AU", name: "Australia", pop: 26439000 },
    { code: "PG", name: "Papua-Nowa Gwinea", pop: 10329000 },
    { code: "NZ", name: "Nowa Zelandia", pop: 5228000 },
    { code: "FJ", name: "Fidżi", pop: 936000 },
    { code: "SB", name: "Wyspy Salomona", pop: 740000 },
    { code: "VU", name: "Vanuatu", pop: 334000 },
    { code: "WS", name: "Samoa", pop: 225000 },
    { code: "KI", name: "Kiribati", pop: 133000 },
    { code: "FM", name: "Mikronezja", pop: 115000 },
    { code: "TO", name: "Tonga", pop: 107000 },
    { code: "MH", name: "Wyspy Marshalla", pop: 42000 },
    { code: "PW", name: "Palau", pop: 18000 },
    { code: "NR", name: "Nauru", pop: 12000 },
    { code: "TV", name: "Tuvalu", pop: 11000 },

    // --- DODATKOWE TERYTORIA / PAŃSTWA SPORNE ---
    // Uwaga: Flagi dla tych krajów mogą nie działać w standardowym API, 
    // dlatego skrypt podmieni je na placeholder.
    { code: "CY-NC", name: "Cypr Północny", pop: 382000 },
    { code: "GE-AB", name: "Abchazja", pop: 245000 },
    { code: "GE-OS", name: "Osetia Południowa", pop: 53000 }
];

/* --- LOGIKA GRY --- */
const game = {
    state: {
        currentLeft: null,
        currentRight: null,
        score: 0,
        isAnimating: false
    },

    ui: {
        left: {
            flag: document.getElementById('flag-left'),
            name: document.getElementById('name-left'),
            pop: document.getElementById('pop-left')
        },
        right: {
            flag: document.getElementById('flag-right'),
            name: document.getElementById('name-right'),
            pop: document.getElementById('pop-right'),
            buttonsBlock: document.getElementById('buttons-area'),
            resultBlock: document.getElementById('result-area')
        },
        score: document.getElementById('current-score'),
        bestScore: document.getElementById('best-score'),
        gameOverModal: document.getElementById('game-over'),
        lossMsg: document.getElementById('loss-msg'),
        finalScore: document.getElementById('final-score-val')
    },

    init() {
        this.ui.bestScore.textContent = localStorage.getItem('popdle_highscore') || 0;
        this.setupImageErrorHandling();
        this.state.currentLeft = this.getRandomCountry();
        this.state.currentRight = this.getRandomCountry(this.state.currentLeft);
        this.render();

        // Rejestruj gracza w Firebase
        const username = typeof UserManager !== 'undefined' ? UserManager.getCurrentUser() : null;
        if (typeof FirebaseLeaderboard !== 'undefined' && window.db && username) {
            FirebaseLeaderboard.registerPlayer('popdle', username);
        }

        // Renderuj ranking z Firebase
        this.renderFirebaseLeaderboard();
    },

    renderFirebaseLeaderboard() {
        const container = document.getElementById('leaderboard-container');
        if (!container) return;

        const title = '\u{1F3C6} TOP 10 NAJD\u0141U\u017bSZYCH PASS';

        if (typeof FirebaseLeaderboard !== 'undefined' && window.db) {
            FirebaseLeaderboard.listenToScores(
                'popdle', 'streak',
                (scores) => this.renderLeaderboardHTML(scores, container, title),
                10, false // lowerIsBetter = false (większa passa = lepiej)
            );
        } else if (typeof LeaderboardComponent !== 'undefined') {
            LeaderboardComponent.render('popdle_highscore', 'leaderboard-container', {
                title: 'TOP 10 NAJD\u0141U\u017bSZYCH PASS',
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
                    <p class="leaderboard-empty">Brak wynik\u00F3w \u2014 b\u0105d\u017A pierwszy! \u{1F680}</p>
                </div>`;
            return;
        }

        let rowsHTML = '';
        scores.forEach((entry, index) => {
            const pos = index + 1;
            const isCurrentUser = currentUser && entry.username === currentUser;
            const posIcon = pos === 1 ? '\u{1F947}' : pos === 2 ? '\u{1F948}' : pos === 3 ? '\u{1F949}' : `#${pos}`;
            const dateStr = entry.date ? this.formatLeaderboardDate(entry.date) : '';

            rowsHTML += `
                <div class="leaderboard-row ${isCurrentUser ? 'current-user' : ''}">
                    <span class="lbd-pos">${posIcon}</span>
                    <span class="lbd-name">${this.escapeHtml(entry.username)}</span>
                    <span class="lbd-score">${entry.score} \u{1F525}</span>
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

    // Funkcja awaryjna: jeśli flaga (np. Abchazji) się nie załaduje, pokaż obrazek zastępczy
    setupImageErrorHandling() {
        const fallbackImage = "https://placehold.co/400x300/1e293b/ffffff?text=Brak+Flagi";
        this.ui.left.flag.onerror = () => { this.ui.left.flag.src = fallbackImage; };
        this.ui.right.flag.onerror = () => { this.ui.right.flag.src = fallbackImage; };
    },

    getRandomCountry(exclude) {
        let candidate;
        do {
            candidate = countriesDB[Math.floor(Math.random() * countriesDB.length)];
        } while (exclude && candidate.code === exclude.code);
        return candidate;
    },

    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },

    render() {
        // Renderuj lewą stronę
        const left = this.state.currentLeft;
        // Specjalna obsługa dla niestandardowych kodów, jeśli API ich nie wspiera
        // Ale próbujemy standardowo, error handler zadziała w razie czego
        this.ui.left.flag.src = `https://flagsapi.com/${left.code}/flat/64.png`;
        this.ui.left.name.textContent = left.name;
        this.ui.left.pop.textContent = this.formatNumber(left.pop);

        // Renderuj prawą stronę (reset)
        const right = this.state.currentRight;
        this.ui.right.flag.src = `https://flagsapi.com/${right.code}/flat/64.png`;
        this.ui.right.name.textContent = right.name;

        // Pokaż przyciski, ukryj wynik
        this.ui.right.buttonsBlock.classList.remove('hidden');
        this.ui.right.resultBlock.classList.add('hidden');
        this.ui.right.pop.textContent = "???";
        this.ui.right.pop.style.color = "#FFD700"; // Reset koloru
    },

    guess(direction) {
        if (this.state.isAnimating) return;
        this.state.isAnimating = true;

        const leftPop = this.state.currentLeft.pop;
        const rightPop = this.state.currentRight.pop;

        let isCorrect = false;
        if (direction === 'higher' && rightPop >= leftPop) isCorrect = true;
        if (direction === 'lower' && rightPop <= leftPop) isCorrect = true;

        this.revealResult(isCorrect, rightPop);
    },

    revealResult(isCorrect, actualValue) {
        this.ui.right.buttonsBlock.classList.add('hidden');
        this.ui.right.resultBlock.classList.remove('hidden');

        const el = this.ui.right.pop;
        this.animateValue(el, 0, actualValue, 1000, () => {
            if (isCorrect) {
                el.style.color = "#10b981"; // Zielony
                setTimeout(() => this.nextRound(), 1200);
            } else {
                el.style.color = "#ef4444"; // Czerwony
                setTimeout(() => this.gameOver(), 1500);
            }
        });
    },

    nextRound() {
        this.state.score++;
        this.ui.score.textContent = this.state.score;

        this.state.currentLeft = this.state.currentRight;
        this.state.currentRight = this.getRandomCountry(this.state.currentLeft);

        this.render();
        this.state.isAnimating = false;
    },

    gameOver() {
        const score = this.state.score;
        const best = parseInt(localStorage.getItem('popdle_highscore') || 0);

        if (score > best) {
            localStorage.setItem('popdle_highscore', score);
            this.ui.lossMsg.textContent = `Nowy rekord! ${score} pkt`;

            // Zapisz do systemu użytkowników
            if (typeof UserManager !== 'undefined') {
                UserManager.saveUserScore('popdle_highscore', score, false);
            }
        } else {
            this.ui.lossMsg.textContent = `Poprawna populacja to ${this.formatNumber(this.state.currentRight.pop)}`;
        }

        // Zapisz do Firebase (saveScore sprawdzi czy to rekord)
        const username = typeof UserManager !== 'undefined' ? UserManager.getCurrentUser() : null;
        if (typeof FirebaseLeaderboard !== 'undefined' && window.db && username) {
            FirebaseLeaderboard.saveScore('popdle', 'streak', username, score, false);
        }

        this.ui.finalScore.textContent = score;
        this.ui.gameOverModal.classList.remove('hidden');
    },

    restart() {
        this.state.score = 0;
        this.ui.score.textContent = "0";
        this.ui.bestScore.textContent = localStorage.getItem('popdle_highscore') || 0;

        this.ui.gameOverModal.classList.add('hidden');

        this.state.currentLeft = this.getRandomCountry();
        this.state.currentRight = this.getRandomCountry(this.state.currentLeft);
        this.render();
        this.state.isAnimating = false;
    },

    animateValue(obj, start, end, duration, callback) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeOut * (end - start) + start);
            obj.innerHTML = this.formatNumber(currentVal);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                if (callback) callback();
            }
        };
        window.requestAnimationFrame(step);
    }
};

game.init();