FROM microsoft/dotnet:1.1-sdk-msbuild

COPY stage/ /
RUN chmod +x /usr/local/bin/app-*

CMD ["app-bootstrap"]
