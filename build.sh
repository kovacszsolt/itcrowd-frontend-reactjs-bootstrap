docker run -t -w /home/node/app -v "$PWD"/source:/home/node/app/ node:latest bash -c "npm install; npm run-script build"
docker build -t itcrowd-frontend-reactjs-bootstrap:latest .
