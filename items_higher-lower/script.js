/* --- BAZA DANYCH: PRICE-DLE – CODZIENNE PRODUKTY W POLSCE (ceny w PLN, 2025) --- */
const itemsDB = [
    // === SPOŻYWCZE ===
    { name: "Bochenek chleba", val: 5.50 },
    { name: "Masło (200g)", val: 7.99 },
    { name: "Litr mleka", val: 3.89 },
    { name: "Tuzin jajek", val: 12.99 },
    { name: "Kostka masła (500g)", val: 10.99 },
    { name: "Kawa mielona (250g)", val: 14.99 },
    { name: "Herbata (100 torebek)", val: 12.49 },
    { name: "Cukier (1 kg)", val: 4.29 },
    { name: "Mąka (1 kg)", val: 3.49 },
    { name: "Ryż (1 kg)", val: 5.99 },
    { name: "Makaron (500g)", val: 4.49 },
    { name: "Olej rzepakowy (1L)", val: 8.99 },
    { name: "Ser żółty (1 kg)", val: 35.99 },
    { name: "Ser biały (250g)", val: 6.49 },
    { name: "Jogurt naturalny", val: 2.99 },
    { name: "Śmietana 18% (200g)", val: 3.29 },
    { name: "Pierogi z mięsem (450g)", val: 9.99 },
    { name: "Filet z kurczaka (1 kg)", val: 24.99 },
    { name: "Mięso mielone (500g)", val: 14.49 },
    { name: "Schab wieprzowy (1 kg)", val: 22.99 },
    { name: "Łosoś filet (1 kg)", val: 74.99 },
    { name: "Kiełbasa śląska (1 kg)", val: 28.99 },
    { name: "Banan (1 kg)", val: 6.99 },
    { name: "Jabłka (1 kg)", val: 4.99 },
    { name: "Pomidory (1 kg)", val: 8.99 },
    { name: "Ogórki (1 kg)", val: 7.49 },
    { name: "Ziemniaki (1 kg)", val: 2.99 },
    { name: "Cebula (1 kg)", val: 3.49 },
    { name: "Piwo (puszka 0.5L)", val: 3.99 },
    { name: "Coca-Cola (1.5L)", val: 8.49 },
    { name: "Woda mineralna (1.5L)", val: 2.49 },
    { name: "Sok pomarańczowy (1L)", val: 5.99 },
    { name: "Wino (butelka 0.75L)", val: 24.99 },
    { name: "Wódka Żubrówka (0.5L)", val: 34.99 },
    { name: "Nutella (400g)", val: 17.99 },
    { name: "Chipsy Lay's (140g)", val: 7.49 },
    { name: "Czekolada Milka (100g)", val: 5.99 },
    { name: "Lody Magnum (1 szt.)", val: 6.99 },
    { name: "Bułka kajzerka", val: 0.65 },
    { name: "Pączek z dziurką", val: 2.99 },
    { name: "Drożdżówka z budyniem", val: 3.49 },

    // === CHEMIA / HIGIENA ===
    { name: "Pasta do zębów Colgate", val: 9.99 },
    { name: "Papier toaletowy (8 rolek)", val: 12.99 },
    { name: "Płyn do naczyń Fairy (900ml)", val: 11.99 },
    { name: "Proszek do prania (1.5 kg)", val: 24.99 },
    { name: "Szampon Head & Shoulders", val: 18.99 },
    { name: "Żel pod prysznic Dove", val: 14.49 },
    { name: "Dezodorant Rexona", val: 12.99 },
    { name: "Chusteczki higieniczne (10 paczek)", val: 4.99 },
    { name: "Ręcznik papierowy (2 rolki)", val: 7.99 },
    { name: "Odświeżacz powietrza", val: 8.49 },

    // === USŁUGI / ABONAMENT ===
    { name: "Netflix (miesiąc, Standard)", val: 49.00 },
    { name: "Spotify Premium (miesiąc)", val: 23.99 },
    { name: "YouTube Premium (miesiąc)", val: 26.99 },
    { name: "HBO Max (miesiąc)", val: 29.99 },
    { name: "Disney+ (miesiąc)", val: 29.99 },
    { name: "Bilet do kina (normalny)", val: 29.00 },
    { name: "Bilet komunikacji miejskiej (jednorazowy)", val: 4.60 },
    { name: "Bilet miesięczny (komunikacja)", val: 110.00 },
    { name: "Litr benzyny 95", val: 6.29 },
    { name: "Litr oleju napędowego", val: 6.09 },
    { name: "Przejazd Uber (5 km)", val: 18.00 },
    { name: "Przesyłka kurierska DPD", val: 16.99 },
    { name: "Paczkomat InPost (mała)", val: 13.99 },
    { name: "Znaczek pocztowy (list)", val: 4.10 },

    // === GASTRONOMIA ===
    { name: "Kebab duży", val: 28.00 },
    { name: "Pizza Margherita (restauracja)", val: 32.00 },
    { name: "Big Mac (McDonald's)", val: 22.90 },
    { name: "Zestaw obiadowy (bar mleczny)", val: 18.00 },
    { name: "Kawa latte (kawiarnia)", val: 16.00 },
    { name: "Herbata w kawiarni", val: 10.00 },
    { name: "Piwo w knajpie (0.5L)", val: 14.00 },
    { name: "Zapiekanka na Kazimierzu", val: 15.00 },
    { name: "Hot-dog na stacji", val: 7.99 },
    { name: "Woda z automatu", val: 4.00 },
    { name: "Red Bull (puszka)", val: 6.49 },
    { name: "Doner na mieście", val: 25.00 },

    // === INNE CODZIENNE ===
    { name: "Żarówka LED", val: 9.99 },
    { name: "Baterie AA (4 szt.)", val: 8.99 },
    { name: "Ładowarka USB-C", val: 29.99 },
    { name: "Parasolka składana", val: 24.99 },
    { name: "Torba na zakupy (materiałowa)", val: 5.99 },
    { name: "Reklamówka w sklepie", val: 0.25 },
    { name: "Zapalniczka BIC", val: 3.99 },
    { name: "Gazeta codzienna", val: 5.00 },
    { name: "Doładowanie telefonu (min.)", val: 5.00 },
    { name: "Parking (1h, centrum)", val: 6.00 },
    { name: "Myjnia automatyczna", val: 30.00 },
    { name: "Nożyczki biurowe", val: 7.99 },
    { name: "Długopis zwykły", val: 1.99 },
    { name: "Zeszyt A5 (60 kartek)", val: 4.99 },
    { name: "Klej w sztyfcie", val: 3.49 },
    { name: "Taśma klejąca", val: 4.99 }
];

/* --- LOGIKA GRY --- */
const game = {
    state: { left: null, right: null, score: 0, isAnimating: false },

    ui: {
        left: { img: document.getElementById('img-left'), name: document.getElementById('name-left'), val: document.getElementById('val-left') },
        right: { img: document.getElementById('img-right'), name: document.getElementById('name-right'), val: document.getElementById('val-right'), btns: document.getElementById('buttons-area'), res: document.getElementById('result-area') },
        score: document.getElementById('current-score'),
        best: document.getElementById('best-score'),
        modal: document.getElementById('game-over'),
        msg: document.getElementById('loss-msg'),
        final: document.getElementById('final-score-val')
    },

    init() {
        this.ui.best.textContent = localStorage.getItem('price_highscore') || 0;
        this.state.left = this.getRandom();
        this.state.right = this.getSimilar(this.state.left);
        this.render();

        // Rejestruj gracza w Firebase
        const username = typeof UserManager !== 'undefined' ? UserManager.getCurrentUser() : null;
        if (typeof FirebaseLeaderboard !== 'undefined' && window.db && username) {
            FirebaseLeaderboard.registerPlayer('pricedle', username);
        }

        // Renderuj ranking z Firebase
        this.renderFirebaseLeaderboard();
    },

    renderFirebaseLeaderboard() {
        const container = document.getElementById('leaderboard-container');
        if (!container) return;

        const title = '🏆 TOP 10 NAJDŁUŻSZYCH PASS';

        if (typeof FirebaseLeaderboard !== 'undefined' && window.db) {
            FirebaseLeaderboard.listenToScores(
                'pricedle', 'streak',
                (scores) => this.renderLeaderboardHTML(scores, container, title),
                10, false
            );
        } else if (typeof LeaderboardComponent !== 'undefined') {
            LeaderboardComponent.render('price_highscore', 'leaderboard-container', {
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

    getRandom(exclude) {
        let item;
        do { item = itemsDB[Math.floor(Math.random() * itemsDB.length)]; } while (exclude && item.name === exclude.name);
        return item;
    },

    getSimilar(baseItem) {
        const min = baseItem.val * 0.3;
        const max = baseItem.val * 4.0;
        const candidates = itemsDB.filter(item => item.name !== baseItem.name && item.val >= min && item.val <= max);
        if (candidates.length === 0) return this.getRandom(baseItem);
        return candidates[Math.floor(Math.random() * candidates.length)];
    },

    formatMoney(num) {
        return num.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " zł";
    },

    render() {
        const { left, right } = this.state;
        this.ui.left.name.textContent = left.name;
        this.ui.left.val.textContent = this.formatMoney(left.val);

        this.ui.right.name.textContent = right.name;
        this.ui.right.val.textContent = "???";
        this.ui.right.val.className = 'tl-year result-year';

        this.ui.right.btns.classList.remove('hidden');
        this.ui.right.res.classList.add('hidden');
    },

    guess(dir) {
        if (this.state.isAnimating) return;
        this.state.isAnimating = true;
        const correct = (dir === 'higher' && this.state.right.val >= this.state.left.val) ||
            (dir === 'lower' && this.state.right.val <= this.state.left.val);
        this.reveal(correct);
    },

    reveal(correct) {
        this.ui.right.btns.classList.add('hidden');
        this.ui.right.res.classList.remove('hidden');

        this.animateValue(this.ui.right.val, 0, this.state.right.val, 1000, () => {
            if (correct) {
                this.ui.right.val.className = 'tl-year result-year result-correct';
                setTimeout(() => this.next(), 1200);
            } else {
                this.ui.right.val.className = 'tl-year result-year result-wrong';
                setTimeout(() => this.over(), 1500);
            }
        });
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
        const score = this.state.score;
        const best = parseInt(localStorage.getItem('price_highscore') || 0);

        if (score > best) {
            localStorage.setItem('price_highscore', score);
            this.ui.msg.textContent = `Nowy rekord! Cena: ${this.formatMoney(this.state.right.val)}`;

            // Zapisz do systemu użytkowników
            if (typeof UserManager !== 'undefined') {
                UserManager.saveUserScore('price_highscore', score, false);
            }
        } else {
            this.ui.msg.textContent = `Błąd! Cena to ${this.formatMoney(this.state.right.val)}`;
        }

        // Zapisz do Firebase (saveScore sprawdzi czy to rekord)
        const username = typeof UserManager !== 'undefined' ? UserManager.getCurrentUser() : null;
        if (typeof FirebaseLeaderboard !== 'undefined' && window.db && username) {
            FirebaseLeaderboard.saveScore('pricedle', 'streak', username, score, false);
        }

        this.ui.final.textContent = score;
        this.ui.modal.classList.remove('hidden');
    },

    restart() {
        this.state.score = 0;
        this.ui.score.textContent = "0";
        this.ui.best.textContent = localStorage.getItem('price_highscore') || 0;
        this.ui.modal.classList.add('hidden');
        this.state.left = this.getRandom();
        this.state.right = this.getSimilar(this.state.left);
        this.render();
        this.state.isAnimating = false;
    },

    animateValue(obj, start, end, duration, cb) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = (end - start) * easeOut + start;
            obj.innerHTML = this.formatMoney(currentVal);
            if (progress < 1) window.requestAnimationFrame(step);
            else if (cb) cb();
        };
        window.requestAnimationFrame(step);
    }
};
game.init();