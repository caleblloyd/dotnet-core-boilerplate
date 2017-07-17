FROM microsoft/dotnet:1.1.2-sdk

# add docker user and setup folders
RUN addgroup --gid 1000 docker && \
    adduser --uid 1000 --ingroup docker --home /home/docker --shell /bin/sh --disabled-password --gecos "" docker && \
    mkdir -p /dotnet && \
    chown -R docker:docker /dotnet

# install fixuid
RUN curl -SsL https://github.com/boxboat/fixuid/releases/download/v0.1/fixuid-0.1-linux-amd64.tar.gz | tar -C /usr/local/bin -xzf - && \
    chown root:root /usr/local/bin/fixuid && \
    chmod u+s /usr/local/bin/fixuid && \
    mkdir -p /etc/fixuid && \
    echo "user: docker\ngroup: docker" > /etc/fixuid/config.yml

# set command
CMD ["app-run"]

# copy staged files
COPY stage/ /

# set user
USER docker:docker
