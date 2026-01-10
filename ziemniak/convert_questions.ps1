# Skrypt do konwersji plików pytań do formatu JavaScript

$files = @{
    "WOS"           = "wosQuestions"
    "geografia"     = "geografiaQuestions"
    "informatyka"   = "informatykaQuestions"
    "chemia"        = "chemiaQuestions"
    "historia"      = "historiaQuestions"
    "sport"         = "sportQuestions"
    "film"          = "filmQuestions"
    "literatura"    = "literaturaQuestions"
    "kuichnia"      = "kuchniaQuestions"
    "mechanika"     = "mechanikaQuestions"
    "motoryzacja"   = "motoryzacjaQuestions"
    "wiedza_ogólna" = "wiedzaOgolnaQuestions"
    "elektryka"     = "elektrykaQuestions"
    "polityka"      = "politykaQuestions"
    "ekonomia"      = "ekonomiaQuestions"
}

foreach ($fileName in $files.Keys) {
    $varName = $files[$fileName]
    $path = "pytania\$fileName.js"
    
    if (Test-Path $path) {
        Write-Host "Processing $path..."
        
        $content = Get-Content $path -Raw
        
        if ($content -notmatch "^const ") {
            $newContent = "const $varName = [`r`n$content`r`n];"
            Set-Content -Path $path -Value $newContent -NoNewline
            Write-Host "Converted $path"
        }
        else {
            Write-Host "Skipped $path"
        }
    }
}

Write-Host "Done!"
