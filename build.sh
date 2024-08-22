tar --exclude='./node_modules' --exclude='.git' build.tar.gz .
scp build.tar.gz bridge@49.12.235.159:.docker/bridge-node
ssh bridge@49.12.235.159 'cd .docker/bridge-api && tar -zxvf build.tar.gz ./'