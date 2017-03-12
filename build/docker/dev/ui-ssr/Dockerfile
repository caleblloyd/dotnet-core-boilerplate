FROM node:7.5.0-alpine

COPY stage/ /
RUN chmod +x /usr/local/bin/app-*

CMD ["app-bootstrap"]
