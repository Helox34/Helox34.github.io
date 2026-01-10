# Fix missing commas in question files
$files = Get-ChildItem "pytania\*.js"

foreach ($file in $files) {
    Write-Host "Checking $($file.Name)..."
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Check if content has lines ending with } without comma
    # Regex explains:
    # (?m) - multiline mode
    # \}\s*$ - matches } at the end of line (ignoring whitespace)
    # Replace with },
    
    # We want to match ONLY lines that contain json-like objects, usually they have "category" or "question"
    # And we don't want to affect the closing ] of the array or function blocks
    
    $lines = Get-Content $file.FullName -Encoding UTF8
    $newLines = @()
    $modified = $false
    
    foreach ($line in $lines) {
        # Check if line contains a question object and ends with } (and maybe whitespace)
        if ($line -match '\{.*category.*question.*answer.*\}\s*$' -and $line -notmatch ',\s*$') {
            $newLines += "$line,"
            $modified = $true
        }
        else {
            $newLines += $line
        }
    }
    
    if ($modified) {
        $newContent = $newLines -join "`r`n"
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        Write-Host "Fixed commas in $($file.Name)"
    }
    else {
        Write-Host "No changes needed for $($file.Name)"
    }
}
Write-Host "Done!"
