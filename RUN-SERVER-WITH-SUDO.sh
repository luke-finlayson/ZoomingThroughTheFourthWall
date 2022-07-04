#!/bin/bash

# See if cygpath exists by running with a simple command

cygpath --windir >/dev/null 2>&1 
if [ $? = 0 ] ; then
    cmd /c "RUN-SERVER.bat"
else
    sudo ./_RUN-SERVER.sh
fi

