/**
 * HELPER SCRIPT - Integracja UserManager ze wszystkimi grami
 * Ten plik zawiera funkcje pomocnicze do dodawania do istniejących gier
 */

// Funkcja do dodania na końcu init() lub na początku każdej gry
function addLeaderboardToGame(scoreKey, containerId, title) {
    if (typeof LeaderboardComponent !== 'undefined') {
        LeaderboardComponent.render(scoreKey, containerId, {
            title: title,
            limit: 10
        });
    }
}

// Funkcja do zapisywania wyniku - dodać przy każdym zapisie rekordu
function saveScoreAndRefreshLeaderboard(scoreKey, score, containerId, title) {
    if (typeof UserManager !== 'undefined') {
        UserManager.saveUserScore(scoreKey, score);

        if (typeof LeaderboardComponent !== 'undefined') {
            LeaderboardComponent.render(scoreKey, containerId, {
                title: title,
                limit: 10
            });
        }
    }
}

/* 
INSTRUKCJE INTEGRACJI DLA KAŻDEJ GRY:

1. DODAJ DO HTML (w <head>):
   <script src="../user-manager.js"></script>
   <script src="../leaderboard-component.js"></script>

2. DODAJ KONTENER przed zamknięciem głównego div'a:
   <div id="leaderboard-container"></div>

3. W SCRIPT.JS:
   - W funkcji init() dodaj:
     addLeaderboardToGame('klucz_zmian', 'leaderboard-container', 'TYTUŁ TABELI');
   
   - Przy zapisie rekordu użyj:
     saveScoreAndRefreshLeaderboard('klucz_wyniku', wynik, 'leaderboard-container', 'TYTUŁ');

KLUCZE DLA KAŻDEJ GRY:
- Reaction Time: 'reaction_best'
- Flagdle Europa: 'bestScore_europa'
- Flagdle Azja: 'bestScore_azja'
- Flagdle Afryka: 'bestScore_afryka'
- Flagdle Ameryki: 'bestScore_ameryki'
- Flagdle Świat: 'bestScore_swiat'
- Flagdle Easy: 'bestScore_easy'
- Flagdle Hard: 'bestScore_hard'
- Flagdle Pro: 'bestScore_pro'
- Flagdle Expert: 'bestScore_expert'
- Logodle Easy: 'logo_bestScore_easy'
- Logodle Hard: 'logo_bestScore_hard'
- Logodle Pro: 'logo_bestScore_pro'
- Logodle Expert: 'logo_bestScore_expert'
- Chronodle Modern: 'chrono_modern_highscore'
- Chronodle Empires: 'chrono_empires_highscore'
- Chronodle Renaissance: 'chrono_renaissance_highscore'
- Chronodle Ancient: 'chrono_ancient_highscore'
- Chronodle Mix: 'chrono_mix_highscore'
*/
