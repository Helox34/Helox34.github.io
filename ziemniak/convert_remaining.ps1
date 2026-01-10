# Konwersja pozostałych plików

$files = @{
    "biologia"      = "biologiaQuestions"
    "muzyka"        = "muzykaQuestions"
    "sztuka"        = "sztukaQuestions"
    "wiedza_ogólna" = "wiedzaOgolnaQuestions"
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
            Write-Host "Already converted: $path"
        }
    }
    else {
        Write-Host "File not found: $path"
    }
}

Write-Host "Done!"
