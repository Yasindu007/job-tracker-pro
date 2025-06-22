## GitHub Copilot Chat

- Extension Version: 0.28.1 (prod)
- VS Code: vscode/1.101.1
- OS: Windows

## Network

User Settings:
```json
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 20.205.243.168 (1304 ms)
- DNS ipv6 Lookup: Error (1771 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (0 ms)
- Electron fetch (configured): HTTP 200 (1314 ms)
- Node.js https: HTTP 200 (966 ms)
- Node.js fetch: HTTP 200 (2346 ms)
- Helix fetch: HTTP 200 (1228 ms)

Connecting to https://api.individual.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 140.82.113.21 (2 ms)
- DNS ipv6 Lookup: Error (271 ms): getaddrinfo ENOTFOUND api.individual.githubcopilot.com
- Proxy URL: None (8 ms)
- Electron fetch (configured): HTTP 200 (1021 ms)
- Node.js https: HTTP 200 (1519 ms)
- Node.js fetch: HTTP 200 (1159 ms)
- Helix fetch: HTTP 200 (980 ms)

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).