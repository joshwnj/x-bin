FROM mhart/alpine-node:6.10.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install --production

# copy the source files from host to container
COPY . /usr/src/app

CMD npm -s start
