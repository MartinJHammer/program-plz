## Intro
write-host "setting up local development for sequencer"

### NodeJS
& "$PSScriptRoot\setup\s1-install-nodejs.ps1"

### NPM packages
& "$PSScriptRoot\setup\s2-install-global-npm-packages.ps1"

### Run angular
& "$PSScriptRoot\setup\s3-run-angular.ps1"