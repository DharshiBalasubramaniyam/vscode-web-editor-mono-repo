# Ballerina vscode web editor 

<img width="745" alt="architecture diagram" src="https://github.com/user-attachments/assets/8aa3b8f4-15be-4997-b481-e81805eecc9d" />

This is a monorepo containing multiple packages for building a Ballerina-based web editor. It uses Rush for managing dependencies, building, and maintaining the packages within the repository.

## Prerequisites

- Node.js (version >= 16.13.0 and <= 21.19.2)
- PNPM (version 8.15.8)
- Rush (version 5.141.2)
- Run [ballerina server](https://github.com/DharshiBalasubramaniyam/bal-lang-server)

> This project is using APIs of Ballerina Swan Lake Update 12.0 (2201.12.0).

## Installation

1. Clone the repository
2. Install Rush globally if you haven't already

```bash
npm install -g @microsoft/rush
```

3. Install dependencies using Rush

```bash
rush install
```

4. Build all packages.

```bash
rush build
```

5. Run the project

```bash
npm start
```

6. Open your browser and navigate to `http://localhost:3001`.  
7. Press `Ctrl+Shift+P` to open the command palette.  
8. Select the `Open GitHub Repository` command and provide the repository URL of a Ballerina project to get started.

<img width="960" alt="hover provider" src="https://github.com/user-attachments/assets/15109ca7-1f8b-4860-9ad9-baf9c0d177ea" />

<img width="960" alt="completion provider" src="https://github.com/user-attachments/assets/bc36b880-8431-4c48-a438-633599b22c57" />

<img width="960" alt="overview view" src="https://github.com/user-attachments/assets/7b947cd4-c6f0-4376-9537-c526dce4d150" />

<img width="960" alt="service designer view" src="https://github.com/user-attachments/assets/02c0ed98-2f6e-4073-bc2d-ecd989c02c3d" />

<img width="960" alt="add new construct" src="https://github.com/user-attachments/assets/bb79c4c9-614d-48ff-8082-59ff7c5c5d39" />

## Packages

### Vscode web server ([`workspaces/server/`](./workspaces/server/server.js))

This workspace launches the vscode web server on `http://localhost:3001`.

This server serves `ballerina web extension` from `workspaces/ballerina/ballerina-extension`

### Ballerina web extension

The current implementation of ballerina extension supports below features:

**Language features:**
- Completion
- Hover
- Publish diagnostics
- Rename
- Go to definition
- Go to references
- Document symbol
- Folding ranges
- Code action
- Inlay hint
  
**Diagram features:**
- Overview view
- Function view - add/view
- Type diagram view - add/view/edit/delete
- Service designer - http, graphql
- Triggers/Connectors - add/edit/view/delete
- Configurables - add/edit/view/delete
- Data mapper view

[`workspaces/ballerina/ballerina-extension/src/extension.ts`](./workspaces/ballerina/ballerina-extension/src/extension.ts), serves as the entry point for the Ballerina extension. When the extension is activated, it initializes the following components:

- [Ballerina language server](./workspaces/ballerina/ballerina-extension/src/activators/ls/activateLS.ts): Establishes a connection between the language client and the WebSocket-based Ballerina Language Server by connecting to the WebSocket server.

- [File system](./workspaces/ballerina/ballerina-extension/src/activators/fs/activateFS.ts): Connects to the HTTP-based file system server to provide project file access and handle file system operations.

- [Ballerina visualizer](./workspaces/ballerina/ballerina-extension/src/activators/visualizer/activateVisualizer.ts) - Activates features related to visualizing and editing Ballerina code.


## References

1. [Vscode test web](https://github.com/microsoft/vscode-test-web)
2. [Web extensions](https://code.visualstudio.com/api/extension-guides/web-extensions)
3. [Language server protocol](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide)
4. [Vscode file system provider](https://code.visualstudio.com/api/extension-guides/virtual-workspaces)
5. [Vscode webview](https://code.visualstudio.com/api/extension-guides/webview)
