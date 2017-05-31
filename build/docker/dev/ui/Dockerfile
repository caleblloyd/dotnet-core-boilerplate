FROM node:7.10.0-alpine

RUN yarn global add webpack webpack-dev-server

COPY stage/ /
RUN chmod +x /usr/local/bin/app-*

CMD ["app-bootstrap"]
