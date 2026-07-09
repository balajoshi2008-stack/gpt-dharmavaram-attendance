# Fix: Replace stale item.subject with live getSubjectName(item.code) in period dropdown
$filePath = "public\index.html"
$content = [System.IO.File]::ReadAllText($filePath)

# Find the line with item.subject in the period option and replace it
# We search for the pattern using a regex that matches across the filtered.forEach block
$oldPattern = 'per\.innerHTML \+= `<option value="\$\{item\.periods\}">\$\{item\.periods\}[^`]+\$\{item\.subject\}</option>`\;'
$newLine = "const displayName = getSubjectName(item.code) || item.subject;`r`n                per.innerHTML += ``<option value=""`${item.periods}"">`${item.periods} `u{2014} `${displayCode}: `${displayName}</option>``;`;"

$newContent = [System.Text.RegularExpressions.Regex]::Replace($content, $oldPattern, $newLine)

if ($newContent -eq $content) {
    Write-Output "NO MATCH FOUND - pattern did not match"
} else {
    [System.IO.File]::WriteAllText($filePath, $newContent)
    Write-Output "SUCCESS - file updated"
}
