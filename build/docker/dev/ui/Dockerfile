FROM node:7.5.0-alpine

RUN npm install --global yarn vbuild >/dev/null 2>&1

COPY stage/ /
RUN chmod +x /usr/local/bin/app-*

CMD ["app-bootstrap"]
