document.addEventListener("DOMContentLoaded", function () {

    // --- 1. OBSŁUGA AKTUALNOŚCI (WIDGET + STRONA GŁÓWNA) ---
    const recentPostsList = document.getElementById('recent-posts-list');
    const latestPostHome = document.getElementById('latest-post-home');

    if (recentPostsList || latestPostHome) {
        // Dodajemy ?v=... aby uniknąć pobierania starej wersji z pamięci podręcznej przeglądarki
        fetch('aktualnosci.html?v=' + Date.now())
            .then(response => {
                if (!response.ok) throw new Error("Błąd pobierania danych: " + response.status);
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // Pobieramy wszystkie artykuły z klasą .news-item
                const allArticles = Array.from(doc.querySelectorAll('.news-item'));

                // Filtrujemy tylko te, które mają atrybut data-id
                const validArticles = allArticles.filter(art => art.hasAttribute('data-id'));

                // Sortujemy od najnowszego (malejąco)
                validArticles.sort((a, b) => {
                    const dateA = parseInt(a.getAttribute('data-id'));
                    const dateB = parseInt(b.getAttribute('data-id'));
                    return dateB - dateA;
                });

                console.log("Znaleziono wpisów:", validArticles.length); // Podgląd w konsoli (F12)

                // A) WYPEŁNIANIE WIDGETU "OSTATNIE WPISY"
                if (recentPostsList) {
                    recentPostsList.innerHTML = '';
                    const top5 = validArticles.slice(0, 5);

                    if (top5.length === 0) {
                        recentPostsList.innerHTML = '<li>Brak wpisów</li>';
                    } else {
                        top5.forEach(article => {
                            const titleEl = article.querySelector('h3');
                            let title = titleEl ? titleEl.innerText.trim() : "Bez tytułu";
                            const anchorId = article.id || '';

                            if (title.length > 40) title = title.substring(0, 40) + '...';

                            const li = document.createElement('li');
                            li.innerHTML = `<a href="aktualnosci.html#${anchorId}">📄 ${title}</a>`;
                            recentPostsList.appendChild(li);
                        });
                    }
                }

                // B) STRONA GŁÓWNA (Pod "Witamy")
                if (latestPostHome) {
                    latestPostHome.innerHTML = ''; // Czyścimy napis "Ładowanie..."

                    if (validArticles.length > 0) {
                        const newestArticle = validArticles[0];
                        // Wstawiamy kod HTML najnowszego artykułu
                        latestPostHome.innerHTML = newestArticle.outerHTML;
                    } else {
                        latestPostHome.innerHTML = '<p style="text-align:center">Brak aktualności do wyświetlenia.</p>';
                    }
                }
            })
            .catch(err => {
                console.error("Szczegóły błędu:", err);
                if (recentPostsList) recentPostsList.innerHTML = '<li style="color:red; font-size:0.8rem">Błąd ładowania (sprawdź konsolę F12)</li>';
                if (latestPostHome) latestPostHome.innerHTML = '<p style="color:red; text-align:center">Nie udało się załadować wpisu. Upewnij się, że używasz Live Server.</p>';
            });
    }

    // --- 2. KOPIOWANIE NUMERÓW KONTA ---
    const copyButtons = document.querySelectorAll('.copy-btn');
    if (copyButtons) {
        copyButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                const numberDiv = this.previousElementSibling;
                const numberText = numberDiv.innerText || numberDiv.textContent;
                navigator.clipboard.writeText(numberText).then(() => {
                    const originalText = this.innerText;
                    this.innerText = "Skopiowano!";
                    this.style.backgroundColor = "#6ECB9C";
                    this.style.color = "white";
                    setTimeout(() => {
                        this.innerText = originalText;
                        this.style.backgroundColor = "";
                        this.style.color = "";
                    }, 2000);
                });
            });
        });
    }

    // --- 3. MENU MOBILNE ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('open');
        });
    }

    // --- 4. KALENDARZ ---
    const calendarContainer = document.querySelector('.calendar-preview');
    const calendarFooter = document.querySelector('.calendar-footer');
    if (calendarContainer && calendarFooter) {
        const now = new Date();
        const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
        calendarFooter.textContent = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

        let html = '';
        for (let i = 0; i < 7; i++) html += `<div style="font-weight:bold; color:#6ECB9C">${['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'][i]}</div>`;
        for (let i = 0; i < 30; i++) {
            let cls = (i + 1 === now.getDate()) ? 'style="background:#FF8585; color:white; border-radius:50%"' : '';
            html += `<div ${cls}>${i + 1}</div>`;
        }
        calendarContainer.innerHTML = html;
    }

    // --- 5. INTERAKTYWNA GALERIA ---

    // Dane wydarzeń z opisami
    const eventData = {
        '20250920_Konferencja': {
            title: 'Konferencja',
            date: '20.09.2025',
            description: 'Coroczna konferencja stowarzyszenia, podczas której omawialiśmy najważniejsze tematy związane z cukrzycą oraz nowości w leczeniu.',
            folder: '20250920_Konferencja'
        },
        '20250622_Bialka': {
            title: 'Białka',
            date: '22.06.2025',
            description: 'Wyjazd integracyjny do Białki Tatrzańskiej - wspaniała okazja do aktywnego wypoczynku w górach.',
            folder: '20250622_Bialka'
        },
        '20241012_Konferencja': {
            title: 'Konferencja',
            date: '12.10.2024',
            description: 'Konferencja poświęcona nowym metodom leczenia cukrzycy oraz najnowszym badaniom naukowym.',
            folder: '20241012_Konferencja'
        },
        '20231007_Konferencja': {
            title: 'Konferencja',
            date: '07.10.2023',
            description: 'Spotkanie członków stowarzyszenia z ekspertami - lekarze dzielili się swoją wiedzą i doświadczeniem.',
            folder: '20231007_Konferencja'
        },
        '20230609_Bialka': {
            title: 'Białka',
            date: '09-11.06.2023',
            description: 'Trzydniowy wyjazd integracyjny w Tatry - wspólne wędrówki, zabawy i nauka zarządzania cukrzycą.',
            folder: '20230609_Bialka'
        },
        '20221217_Spotkanie_wigilijne': {
            title: 'Spotkanie wigilijne',
            date: '17.12.2022',
            description: 'Świąteczne spotkanie wszystkich członków stowarzyszenia pełne radości, śmiechu i wspólnego kolędowania.',
            folder: '20221217_Spotkanie_wigilijne'
        },
        '20220918_Konferencja': {
            title: 'Konferencja',
            date: '18.09.2022',
            description: 'Konferencja edukacyjna dla rodzin dzieci z cukrzycą - warsztaty, wykłady i wymiana doświadczeń.',
            folder: '20220918_Konferencja'
        },
        '20220618_Bialka': {
            title: 'Białka',
            date: '18.06.2022',
            description: 'Letni wyjazd do Białki Tatrzańskiej - piękna pogoda i wspaniała atmosfera integracji.',
            folder: '20220618_Bialka'
        },
        '20211204_Mikolajki': {
            title: 'Mikołajki',
            date: '04.12.2021',
            description: 'Spotkanie mikołajkowe dla dzieci z cukrzycą - prezenty, zabawy i wiele radości!',
            folder: '20211204_Mikolajki'
        },
        '20211002_Konferencja': {
            title: 'Konferencja',
            date: '02.10.2021',
            description: 'Konferencja poświęcona tematyce cukrzycy u dzieci - praktyczne porady dla rodziców i opiekunów.',
            folder: '20211002_Konferencja'
        },
        '20210529_Spotkanie_w_stadninie_koni': {
            title: 'Spotkanie w stadninie koni',
            date: '29.05.2021',
            description: 'Wyjazd do stadniny koni - hipoterapia, kontakt ze zwierzętami i wspaniała integracja w plenerze.',
            folder: '20210529_Spotkanie_w_stadninie_koni'
        },
        '20201003_Konferencja': {
            title: 'Konferencja',
            date: '03.10.2020',
            description: 'Konferencja w formacie hybrydowym podczas pandemii - mimo trudności pozostaliśmy w kontakcie.',
            folder: '20201003_Konferencja'
        },
        '20191207_Mikolajki': {
            title: 'Mikołajki',
            date: '07.12.2019',
            description: 'Mikołajki pełne niespodzianek - prezenty dla dzieci, wspólne zabawy i uśmiech na każdej twarzy.',
            folder: '20191207_Mikolajki'
        },
        '20191019_Konferencja': {
            title: 'Konferencja',
            date: '19.10.2019',
            description: 'Konferencja edukacyjna stowarzyszenia z bogatym programem wykładów i warsztatów.',
            folder: '20191019_Konferencja'
        },
        '20190430_Bialka': {
            title: 'Białka',
            date: '30.04-05.04.2019',
            description: 'Majowy wyjazd integracyjny do Białki - góry, świeże powietrze i wspólna zabawa.',
            folder: '20190430_Bialka'
        },
        '20181118_Basen': {
            title: 'Basen',
            date: '18.11.2018',
            description: 'Aktywne spotkanie na basenie - sport, zabawa w wodzie i nauka pływania dla najmłodszych.',
            folder: '20181118_Basen'
        },
        '20181013_20lecie_stowarzyszenia': {
            title: '20-lecie stowarzyszenia',
            date: '13.10.2018',
            description: 'Uroczyste obchody 20-lecia działalności stowarzyszenia - wspomnienia, przemówienia i tort urodzinowy!',
            folder: '20181013_20lecie_stowarzyszenia'
        },
        '20180804_Debki': {
            title: 'Dębki',
            date: '04.08.2018',
            description: 'Wyjazd nad morze do miejscowości Dębki - plaża, spacery i integration nad Bałtykiem.',
            folder: '20180804_Debki'
        }
    };

    // Globalna funkcja otwierająca modal
    window.openGalleryModal = function (element) {
        const folder = element.getAttribute('data-folder');
        const data = eventData[folder];

        if (!data) {
            console.error('Brak danych dla folderu:', folder);
            return;
        }

        const modal = document.getElementById('galleryModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalDate = document.getElementById('modalDate');
        const modalDescription = document.getElementById('modalDescription');
        const modalGallery = document.getElementById('modalGallery');

        if (!modal || !modalTitle || !modalDate || !modalDescription || !modalGallery) {
            console.error('Nie znaleziono elementów modalu');
            return;
        }

        // Ustawienie tytułu, daty i opisu
        modalTitle.textContent = data.title;
        modalDate.textContent = data.date;
        modalDescription.textContent = data.description;

        // Czyszczenie poprzednich zdjęć
        modalGallery.innerHTML = '';

        // Lista wszystkich możliwych nazw zdjęć
        const photoNames = [
            'DSC_0001.png', 'DSC_0002.png', 'DSC_0003.png', 'DSC_0004.png', 'DSC_0005.png',
            'DSC_0006.png', 'DSC_0007.png', 'DSC_0008.png', 'DSC_0009.png', 'DSC_0010.png',
            'DSC_0011.png', 'DSC_0012.png', 'DSC_0013.png', 'DSC_0014.png', 'DSC_0015.png',
            'DSC_0016.png', 'DSC_0017.png', 'DSC_0018.png', 'DSC_0019.png', 'DSC_0020.png',
            'DSC_0021.png', 'DSC_0022.png', 'DSC_0023.png', 'DSC_0024.png', 'DSC_0025.png',
            'DSC_0026.png', 'DSC_0027.png', 'DSC_0028.png', 'DSC_0029.png', 'DSC_0030.png',
            'DSC_0036.png', 'DSC_0041.png', 'DSC_0053.png', 'DSC_0054.png', 'DSC_0055.png',
            'DSC_0057.png', 'DSC_0059.png', 'DSC_0068.png', 'DSC_0071.png', 'DSC_0075.png',
            'DSC_0080.png', 'DSC_0085.png', 'DSC_0090.png', 'DSC_0095.png', 'DSC_0100.png',
            'DSC_0105.png', 'DSC_0110.png', 'DSC_0115.png', 'DSC_0120.png', 'DSC_0125.png',
            'DSC_0130.png', 'DSC_0135.png', 'DSC_0140.png', 'DSC_0145.png', 'DSC_0150.png',
            'DSC_0211.png', 'DSC_0214.png', 'DSC_0223.png', 'DSC_0231.png', 'DSC_0234.png',
            'DSC_0236.png', 'DSC_0241.png', 'DSC_0243.png', 'DSC_0250.png', 'DSC_0255.png',
            'DSC_0260.png', 'DSC_0265.png', 'DSC_0270.png', 'DSC_0275.png', 'DSC_0280.png',
            'DSC_0285.png', 'DSC_0290.png', 'DSC_0292.png', 'DSC_0295.png', 'DSC_0300.png',
            'DSC_0305.png', 'DSC_0308.png', 'DSC_0310.png', 'DSC_0315.png', 'DSC_0320.png',
            'DSC_0325.png', 'DSC_0330.png', 'DSC_0335.png', 'DSC_0340.png', 'DSC_0345.png',
            'DSC_0350.png', 'DSC_0353.png', 'DSC_0355.png', 'DSC_0360.png', 'DSC_0364.png',
            'DSC_0370.png', 'DSC_0375.png', 'DSC_0380.png', 'DSC_0400.png', 'DSC_0450.png',
            'DSC_0456.png', 'DSC_0460.png', 'DSC_0500.png', 'DSC_0550.png', 'DSC_0578.png',
            'DSC_0579.png', 'DSC_0580.png', 'DSC_0600.png', 'DSC_0650.png', 'DSC_0651.png',
            'DSC_0700.png', 'DSC_0713.png', 'DSC_0750.png',
            // Dodatkowe DSC 0031-0155
            'DSC_0031.png', 'DSC_0032.png', 'DSC_0033.png', 'DSC_0034.png', 'DSC_0035.png',
            'DSC_0037.png', 'DSC_0038.png', 'DSC_0039.png', 'DSC_0040.png', 'DSC_0042.png',
            'DSC_0043.png', 'DSC_0044.png', 'DSC_0045.png', 'DSC_0046.png', 'DSC_0047.png',
            'DSC_0048.png', 'DSC_0049.png', 'DSC_0050.png', 'DSC_0051.png', 'DSC_0052.png',
            'DSC_0056.png', 'DSC_0058.png', 'DSC_0060.png', 'DSC_0061.png', 'DSC_0062.png',
            'DSC_0063.png', 'DSC_0064.png', 'DSC_0065.png', 'DSC_0066.png', 'DSC_0067.png',
            'DSC_0069.png', 'DSC_0070.png', 'DSC_0072.png', 'DSC_0073.png', 'DSC_0074.png',
            'DSC_0076.png', 'DSC_0077.png', 'DSC_0078.png', 'DSC_0079.png', 'DSC_0081.png',
            'DSC_0082.png', 'DSC_0083.png', 'DSC_0084.png', 'DSC_0086.png', 'DSC_0087.png',
            'DSC_0088.png', 'DSC_0089.png', 'DSC_0091.png', 'DSC_0092.png', 'DSC_0093.png',
            'DSC_0094.png', 'DSC_0096.png', 'DSC_0097.png', 'DSC_0098.png', 'DSC_0099.png',
            'DSC_0101.png', 'DSC_0102.png', 'DSC_0103.png', 'DSC_0104.png', 'DSC_0106.png',
            'DSC_0107.png', 'DSC_0108.png', 'DSC_0109.png', 'DSC_0111.png', 'DSC_0112.png',
            'DSC_0113.png', 'DSC_0114.png', 'DSC_0116.png', 'DSC_0117.png', 'DSC_0118.png',
            'DSC_0119.png', 'DSC_0121.png', 'DSC_0122.png', 'DSC_0123.png', 'DSC_0124.png',
            'DSC_0126.png', 'DSC_0127.png', 'DSC_0128.png', 'DSC_0129.png', 'DSC_0131.png',
            'DSC_0132.png', 'DSC_0133.png', 'DSC_0134.png', 'DSC_0136.png', 'DSC_0137.png',
            'DSC_0138.png', 'DSC_0139.png', 'DSC_0141.png', 'DSC_0142.png', 'DSC_0143.png',
            'DSC_0144.png', 'DSC_0146.png', 'DSC_0147.png', 'DSC_0148.png', 'DSC_0149.png',
            'DSC_0151.png', 'DSC_0152.png', 'DSC_0153.png', 'DSC_0154.png', 'DSC_0155.png',
            // DSC 0344-0462
            'DSC_0344.png', 'DSC_0346.png', 'DSC_0347.png', 'DSC_0348.png', 'DSC_0349.png',
            'DSC_0351.png', 'DSC_0352.png', 'DSC_0354.png', 'DSC_0356.png', 'DSC_0357.png',
            'DSC_0358.png', 'DSC_0359.png', 'DSC_0361.png', 'DSC_0362.png', 'DSC_0363.png',
            'DSC_0365.png', 'DSC_0366.png', 'DSC_0367.png', 'DSC_0368.png', 'DSC_0369.png',
            'DSC_0371.png', 'DSC_0372.png', 'DSC_0373.png', 'DSC_0374.png', 'DSC_0376.png',
            'DSC_0377.png', 'DSC_0378.png', 'DSC_0379.png', 'DSC_0381.png', 'DSC_0382.png',
            'DSC_0383.png', 'DSC_0384.png', 'DSC_0385.png', 'DSC_0410.png', 'DSC_0411.png',
            'DSC_0412.png', 'DSC_0413.png', 'DSC_0414.png', 'DSC_0415.png', 'DSC_0420.png',
            'DSC_0421.png', 'DSC_0422.png', 'DSC_0423.png', 'DSC_0424.png', 'DSC_0425.png',
            'DSC_0430.png', 'DSC_0431.png', 'DSC_0432.png', 'DSC_0433.png', 'DSC_0434.png',
            'DSC_0435.png', 'DSC_0451.png', 'DSC_0452.png', 'DSC_0453.png', 'DSC_0454.png',
            'DSC_0455.png', 'DSC_0457.png', 'DSC_0458.png', 'DSC_0459.png', 'DSC_0461.png',
            'DSC_0462.png',
            // DSC 0718-0889
            'DSC_0718.png', 'DSC_0720.png', 'DSC_0725.png', 'DSC_0730.png', 'DSC_0740.png',
            'DSC_0750.png', 'DSC_0755.png', 'DSC_0760.png', 'DSC_0761.png', 'DSC_0770.png',
            'DSC_0780.png', 'DSC_0790.png', 'DSC_0800.png', 'DSC_0804.png', 'DSC_0810.png',
            'DSC_0820.png', 'DSC_0830.png', 'DSC_0831.png', 'DSC_0832.png', 'DSC_0840.png',
            'DSC_0845.png', 'DSC_0846.png', 'DSC_0850.png', 'DSC_0860.png', 'DSC_0865.png',
            'DSC_0870.png', 'DSC_0875.png', 'DSC_0880.png', 'DSC_0883.png', 'DSC_0885.png',
            'DSC_0889.png',
            // DSC 0943-0996 (Mikołajki/Konferencje 2021)
            'DSC_0943.png', 'DSC_0945.png', 'DSC_0947.png', 'DSC_0950.png', 'DSC_0951.png',
            'DSC_0956.png', 'DSC_0971.png', 'DSC_0980.png', 'DSC_0984.png', 'DSC_0987.png',
            'DSC_0996.png',
            // DSC 0510-0620 (Basen 2018, Konferencja 2019)
            'DSC_0510.png', 'DSC_0511.png', 'DSC_0517.png', 'DSC_0520.png',
            'DSC_0581.png', 'DSC_0587.png', 'DSC_0589.png', 'DSC_0605.png', 'DSC_0611.png',
            'DSC_0613.png',
            // DSC 0285-0324 (Stadnina koni 2021)
            'DSC_0287.png', 'DSC_0294.png', 'DSC_0296.png', 'DSC_0301.png', 'DSC_0322.png',
            'DSC_0324.png',
            // DSC 0103 (Konferencja 2020)
            'DSC_0103.png',
            // Pliki z datami - Białka 2025 (telefon)
            '20250620_152500.png', '20250621_153755.png', '20250621_164050.png',
            '20250621_164211.png', '20250621_164328.png',
            // Pliki z datami - Białka 2023 (telefon)
            '20230609_111219.png', '20230609_114732.png', '20230610_152953.png',
            '20230611_083544.png', '20230611_084025.png', '20230611_084104.png',
            '20230611_084209.png', '20230611_084430.png',
            // Pliki z datami - Białka 2022 (telefon)
            '20220618_183314.png', '20220618_183807.png', '20220618_183916.png',
            '20220618_184111.png', '20220618_184237.png', '20220618_184923.png',
            // Pliki IMG z Konferencji 2020
            'IMG_20201003_102435.png', 'IMG_20201003_102459.png', 'IMG_20201003_111745.png'
        ];

        let loadedCount = 0;

        // Dodajemy zdjęcia (próbujemy załadować każde)
        photoNames.forEach(photoName => {
            const img = document.createElement('img');
            img.src = `zdjecia_na_strone/${folder}/${photoName}`;
            img.alt = `${data.title} - zdjęcie`;

            // Usuń element jeśli nie istnieje
            img.onerror = function () {
                this.remove();
            };

            img.onload = function () {
                loadedCount++;
            };


            // Event listener - kliknięcie otwiera lightbox
            img.addEventListener('click', function () {
                const allImages = modalGallery.querySelectorAll('img');
                openLightbox(this, allImages);
            });

            modalGallery.appendChild(img);
        });

        // Po próbie załadowania wszystkich, sprawdź czy coś się załadowało
        setTimeout(() => {
            if (loadedCount === 0) {
                modalGallery.innerHTML = '<p style="text-align: center; color: #999; grid-column: 1/-1; padding: 40px;">Brak zdjęć w tym folderze</p>';
            }
        }, 1000);

        // Otwórz modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Zablokuj scroll
    };

    // Zamykanie modalu
    const modal = document.getElementById('galleryModal');
    const closeBtn = document.querySelector('.modal-close');

    if (closeBtn && modal) {
        closeBtn.onclick = function () {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Przywróć scroll
        };
    }

    if (modal) {
        // Kliknięcie poza contentem
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        };

        // Zamykanie klawiszem ESC
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});
/* ========================================================================
   LIGHTBOX - Penoekranowy widok zdj z nawigacj
   ======================================================================== */

// Zmienne globalne dla lightbox
let currentImageIndex = 0;
let currentImages = [];

// Funkcja otwierania lightbox
function openLightbox(imageElement, allImages) {
    const lightbox = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');

    // Znajd indeks kliknitego zdjcia
    currentImages = Array.from(allImages);
    currentImageIndex = currentImages.indexOf(imageElement);

    // Poka zdjcie
    showLightboxImage();

    // Otwórz lightbox
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Funkcja pokazujca aktualne zdjcie w lightbox
function showLightboxImage() {
    const lightboxImage = document.getElementById('lightboxImage');
    const counter = document.getElementById('lightboxCounter');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    // Ustaw ródo obrazu
    lightboxImage.src = currentImages[currentImageIndex].src;

    // Aktualizuj licznik
    counter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;

    // Poka/ukryj strzaki
    if (currentImageIndex === 0) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }

    if (currentImageIndex === currentImages.length - 1) {
        nextBtn.classList.add('hidden');
    } else {
        nextBtn.classList.remove('hidden');
    }
}

// Nawigacja w lightbox - poprzednie zdjcie
function lightboxPrev() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        showLightboxImage();
    }
}

// Nawigacja w lightbox - nastpne zdjcie
function lightboxNext() {
    if (currentImageIndex < currentImages.length - 1) {
        currentImageIndex++;
        showLightboxImage();
    }
}

// Zamykanie lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightboxModal');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners dla lightbox - uruchom po zaadowaniu DOM
document.addEventListener('DOMContentLoaded', function () {
    // Zamknicie lightbox
    const lightboxCloseBtn = document.querySelector('.lightbox-close');
    if (lightboxCloseBtn) {
        lightboxCloseBtn.addEventListener('click', closeLightbox);
    }

    // Strzaki
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    if (prevBtn) prevBtn.addEventListener('click', lightboxPrev);
    if (nextBtn) nextBtn.addEventListener('click', lightboxNext);

    // Kliknicie poza zdjciem zamyka lightbox
    const lightboxModal = document.getElementById('lightboxModal');
    if (lightboxModal) {
        lightboxModal.addEventListener('click', function (e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
    }

    // Klawisze
    document.addEventListener('keydown', function (e) {
        const lightbox = document.getElementById('lightboxModal');
        if (lightbox && lightbox.style.display === 'block') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') lightboxPrev();
            if (e.key === 'ArrowRight') lightboxNext();
        }
    });
});

// ========================================================================
// TOUCH GESTURES dla lightbox na urzdzeniach mobilnych
// ========================================================================

let touchStartX = 0;
let touchEndX = 0;

// Funkcja wykrywajca kierunek swipe
function handleSwipe() {
    const swipeThreshold = 50; // Minimalna odlego w pikselach
    const diff = touchEndX - touchStartX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe w prawo - poprzednie zdjcie
            lightboxPrev();
        } else {
            // Swipe w lewo - nastpne zdjcie
            lightboxNext();
        }
    }
}

// Dodaj event listeners dla touch na lightbox
document.addEventListener('DOMContentLoaded', function() {
    const lightboxContent = document.querySelector('.lightbox-content');
    
    if (lightboxContent) {
        lightboxContent.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        lightboxContent.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
});
