#!/bin/bash

# Move to the folder where the binary is located
cd `dirname $0`

# Was this started in the bin folder? if yes move out
if [ -d " ../bin" ]; then
    cd ../
fi

# Stop the script if its started as root
if [ "$(id -u)" -eq 0 ]; then
    echo "You shouldn't start this as root."
    exit 1 
fi

node ../app.js
