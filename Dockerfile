FROM node:6.9.2

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

# copy the source files from host to container
COPY . /usr/src/app

CMD npm -s run build & \
  npm -s start
