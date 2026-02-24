/**
 * Security - Blokada DevTools
 * Chroni przed mniej zaawansowanymi użytkownikami.
 */
(function () {
    'use strict';

    // === 1. Blokada prawego przycisku myszy ===
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        return false;
    });

    // === 2. Blokada skrótów klawiszowych ===
    document.addEventListener('keydown', function (e) {
        // F12
        if (e.key === 'F12') { e.preventDefault(); return false; }

        // Ctrl+Shift+I / C / J (Inspect, Inspect Element, Console)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) {
            e.preventDefault(); return false;
        }

        // Ctrl+U (View Source)
        if (e.ctrlKey && e.key === 'u') { e.preventDefault(); return false; }

        // Mac: Cmd+Option+I / C / J
        if (e.metaKey && e.altKey && (e.key === 'i' || e.key === 'c' || e.key === 'j')) {
            e.preventDefault(); return false;
        }

        // Mac: Cmd+U (View Source)
        if (e.metaKey && e.key === 'u') { e.preventDefault(); return false; }
    });

    // === 3. Detekcja DevTools przez rozmiar okna ===
    var devtoolsOpen = false;

    function checkDevTools() {
        var widthThreshold = window.outerWidth - window.innerWidth > 160;
        var heightThreshold = window.outerHeight - window.innerHeight > 160;

        if (widthThreshold || heightThreshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                document.body.style.filter = 'blur(15px)';
                document.body.style.pointerEvents = 'none';
                document.body.style.userSelect = 'none';

                // Wyświetl overlay z ostrzeżeniem
                var overlay = document.createElement('div');
                overlay.id = 'devtools-warning';
                overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:999999;display:flex;justify-content:center;align-items:center;flex-direction:column;color:white;font-family:Montserrat,sans-serif;text-align:center;pointer-events:all;';
                overlay.innerHTML = '<h1 style="font-size:3rem;margin-bottom:10px;">⛔</h1><h2 style="font-size:1.5rem;margin-bottom:10px;">Zamknij DevTools</h2><p style="color:#94a3b8;font-size:0.9rem;">Narzędzia deweloperskie są zablokowane.</p>';
                document.body.appendChild(overlay);
            }
        } else {
            if (devtoolsOpen) {
                devtoolsOpen = false;
                document.body.style.filter = '';
                document.body.style.pointerEvents = '';
                document.body.style.userSelect = '';
                var overlay = document.getElementById('devtools-warning');
                if (overlay) overlay.remove();
            }
        }
    }

    // Sprawdzaj co 500ms
    setInterval(checkDevTools, 500);

    // === 4. Detekcja przez debugger (console trick) ===
    var devtoolsDetected = false;

    function detectDebugger() {
        var start = performance.now();
        debugger;
        var end = performance.now();
        // Jeśli debugger zatrzymał wykonanie na > 100ms, DevTools jest otwarte
        if (end - start > 100 && !devtoolsDetected) {
            devtoolsDetected = true;
        }
    }

    // Uruchom detekcję debuggera co 2 sekundy (mniej agresywne)
    setInterval(detectDebugger, 2000);

    // === 5. Blokada przeciągania obrazków ===
    document.addEventListener('dragstart', function (e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    // === 6. Blokada zaznaczania tekstu (opcjonalnie) ===
    document.addEventListener('selectstart', function (e) {
        // Pozwól zaznaczać tekst w inputach
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        e.preventDefault();
    });
})();
