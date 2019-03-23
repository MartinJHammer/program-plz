### Starting angular
write-host "`nstep 3 - running angular"

$location = get-location
$root = (get-item $location).parent.FullName
$node_modules_installed = test-path "$root/node_modules";

if(-not $node_modules_installed) {
    write-host "npm packages not installed --> running npm i"
    cd $root
    npm i
} 

write-host "opening code and booting up angular dev server."
cd $root
code .
ng serve --open

