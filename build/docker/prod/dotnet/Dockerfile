FROM microsoft/dotnet:1.1.2-sdk

COPY stage/ /

WORKDIR /dotnet/App
EXPOSE 5000

CMD ["dotnet", "App.dll"]
