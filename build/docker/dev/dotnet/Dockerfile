FROM microsoft/dotnet:1.1.2-sdk

COPY stage/ /
RUN chmod +x /usr/local/bin/app-*

CMD ["app-bootstrap"]
