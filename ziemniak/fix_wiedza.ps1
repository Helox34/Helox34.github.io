# Fix wiedza_ogólna.js
$path = "pytania\wiedza_ogólna.js"
$content = Get-Content $path -Raw -Encoding UTF8

if ($content -notmatch "^const ") {
    $newContent = "const wiedzaOgolnaQuestions = [`r`n$content`r`n];"
    Set-Content -Path $path -Value $newContent -NoNewline -Encoding UTF8
    Write-Host "Converted $path"
}
else {
    Write-Host "Already converted: $path"
}
