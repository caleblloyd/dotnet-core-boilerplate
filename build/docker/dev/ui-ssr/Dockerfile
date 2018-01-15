FROM node:8.9.0-alpine

# install packages
RUN apk update && apk add curl

# install fixuid
RUN curl -SsL https://github.com/boxboat/fixuid/releases/download/v0.3/fixuid-0.3-linux-amd64.tar.gz | tar -C /usr/local/bin -xzf - && \
    chown root:root /usr/local/bin/fixuid && \
    chmod 4755 /usr/local/bin/fixuid

# set entrypoint and command
ENTRYPOINT ["fixuid"]
CMD ["app-run"]

# copy staged files
COPY stage/ /

# set user
USER node:node
