FROM node:7.5.0-alpine

RUN npm install --global yarn vbuild

COPY stage/ /
RUN chmod +x /usr/local/bin/app-*

CMD ["app-bootstrap"]
