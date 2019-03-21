#Write-Host "tools"
#Read-Host -Prompt "enter"

# current folder path
$location = get-location
$angular = (get-item $location).parent.parent.FullName

# Full or quick startup
$type = Read-Host "Enter 'f' for rebuild/first time builds, or 'q' for quick startup (npm packages etc. must exist)."
If ($type -eq "f") {
    # frontend runner
    cd "$angular\ng-area"
    start powershell -argument "-noexit", "npm run s:init"

    # Lerna
    cd "$angular\ng-area"
    start powershell -argument "-noexit", "npm run s:lerna:watch"
} 
ElseIf ($type -eq "q") {
    # Lerna
    cd "$angular\ng-area"
    start powershell -argument "-noexit", "npm run s:lerna:watch"
    # frontend runner
    cd "$angular\ng-area"
    start powershell -argument "-noexit", "npm run s:c1:open"
} 

# google datastore emulator
cd "tools";
start start-datastore-emulator.bat

# IDEs
cd "$angular"
code .

exit