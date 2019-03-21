write-host "`nstep 2 - installing global npm pakcages"

# NPM Package versions
$gulp_cli_version = ">=1.2.2 <=2.0.1"
$angular_cli_version = ">=7.3.2 <=7.3.5"
$http_server_version = ">=0.11.1 <=0.11.1"
$typescript_version = ">=3.2.4 <=3.2.4"

$install_npm_packages = read-host "install global npm packages? [y/n]"
if($install_npm_packages -eq "y") {
    # Gulp cli
    write-host "installing gulp-cli"
    npm i -g "gulp-cli@$gulp_cli_version"

    # Angular cli
    write-host "installing angular-cli"
    npm i -g "@angular/cli@$angular_cli_version"

    # Http-server
    write-host "installing http-server"
    npm i -g "http-server@$http_server_version"

    # Typescript
    write-host "installing typescript"
    npm i -g "typescript@$typescript_version"
}
