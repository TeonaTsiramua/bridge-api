npm run build
cd dist && tar -zcvf build.tar.gz .
scp build.tar.gz bridge@49.12.235.159:.docker/bridge-node
ssh bridge@49.12.235.159 'cd .docker/bridge-node && tar -zxvf build.tar.gz ./'