

In Cygwin

    export PATH=/cygdrive/c/Program\ Files/Inkscape/bin/:$PATH

    inkscape.exe -w 16 -h 16 -o zoom-fourth-ico16.png zoom-fourth-icon.svg
    inkscape.exe -w 32 -h 32 -o zoom-fourth-ico32.png zoom-fourth-icon.svg
    inkscape.exe -w 48 -h 48 -o zoom-fourth-ico48.png zoom-fourth-icon.svg
    inkscape.exe -w 64 -h 64 -o zoom-fourth-ico64.png zoom-fourth-icon.svg

    # The following is useful for additional React used icons
    inkscape.exe -w 192 -h 192 -o zoom-fourth-icon192.png zoom-fourth-icon.svg
    inkscape.exe -w 512 -h 512 -o zoom-fourth-icon512.png zoom-fourth-icon.svg


    convert zoom-fourth-ico{16,32,48,64}.png zoom-fourth-icon.ico
    identify zoom-fourth-icon.ico

    export FW_CLEINT_PUBLIC=../.
    /bin/cp zoom-fourth-icon.ico $FW_CLIENT_PUBLIC/favicon.ico

    /bin/cp zoom-fourth-icon192.icon $FW_CLIENT_PUBLIC/logo192.ico
    /bin/cp zoom-fourth-icon512.icon $FW_CLIENT_PUBLIC/logo512.ico
