FROM microsoft/dotnet:1.1.2-sdk

RUN mkdir -p /dotnet/App
WORKDIR /dotnet/App
EXPOSE 5000
CMD ["dotnet", "App.dll"]
COPY stage/ /
