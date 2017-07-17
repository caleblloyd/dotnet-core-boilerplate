FROM node:7.10.0-alpine

# install packages
RUN apk update && apk add curl

# install fixuid
RUN curl -SsL https://github.com/boxboat/fixuid/releases/download/v0.1/fixuid-0.1-linux-amd64.tar.gz | tar -C /usr/local/bin -xzf - && \
    chown root:root /usr/local/bin/fixuid && \
    chmod u+s /usr/local/bin/fixuid && \
    mkdir -p /etc/fixuid && \
    echo "user: node\ngroup: node" > /etc/fixuid/config.yml

# set command
CMD ["app-run"]

# copy staged files
COPY stage/ /

# set user
USER node:node
