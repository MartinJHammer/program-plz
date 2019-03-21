write-host "`nstep 1 - nodejs installation"

# The version of node to install
$target_node_version = "v10.15.3"

if (get-command node -errorAction SilentlyContinue) {
    $node_installed_version = (node -v)
}

# If node is not installed, or not the version we target, download target version and install it.
if($node_installed_version -ne $target_node_version) {

    # Url to the file download
    $node_url = "https://nodejs.org/dist/$target_node_version/node-$target_node_version-x64.msi"
    
    # Name of the downloaded file
    $filename = "node-$target_node_version-x64.msi"

    # Path to the downloaded file
    $node_msi = "$PSScriptRoot\$filename" # Note: $PSScriptRoot is a global powershell variable

    $download_node = $TRUE

    # If the file exists, ask if we should use this instead of downloading it again.
    if (test-path $node_msi) {
        $confirmation = read-host "local $filename file detected --> use it? [Y/n]"
        if ($confirmation -eq "n") {
            $download_node = $FALSE
        }
    }

    # Download nodejs
    if ($download_node) {
        write-host "downloading nodejs"
        write-host "url : $node_url"
        $start_time = get-date
        $wc = new-object System.Net.WebClient
        $wc.DownloadFile($node_url, $node_msi)
        write-Output "$filename downloaded"
        write-Output "time taken: $((get-date).Subtract($start_time).Seconds) second(s)"
    } else {
        write-host "using existing node.msi file"
    }

    # Run the installer
    write-host "installing nodejs --> running $node_msi"
    start-process $node_msi -Wait

    write-host "removing nodejs msi file"
    remove-item -path "$PSScriptRoot\*" -include *.msi
}

if($node_installed_version) {
    write-host "you have the correct version of nodejs installed --> continuing..."
}

