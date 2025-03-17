# Ballerina vscode web editor 

This is a monorepo containing multiple packages for building a Ballerina-based web editor. It uses Rush for managing dependencies, building, and maintaining the packages within the repository.

## Prerequisites

- Node.js (version >= 16.13.0 and <= 21.19.2)
- PNPM (version 8.15.8)
- Rush (version 5.141.2)
- Run [ballerina server](https://github.com/DharshiBalasubramaniyam/bal-lang-server)

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

## Packages

### Vscode web server ([`workspaces/server/`](./workspaces/server/server.js))

This workspace launches the vscode web server on `http://localhost:3001`.

This server serves `ballerina web extension` from `workspaces/ballerina/ballerina-extension`

### Ballerina web extension

The current implementation of ballerina extension supports below features:

1. Language features.
        1.1. Completion
        1.2. Hover
        1.3. Publish diagnostics
        1.4. Rename
        1.5. Go to definition
        1.6. Go to references
        1.7. Document symbol
        1.8. Folding ranges
        1.9. Code action
        1.10. Inlayhint
3. Diagram features
        2.1. Overview view
        2.2. Function view - add/view
        2.3. Type diagram view - add/view/edit/delete
        2.4. Service designer - http
        2.5. Triggers/Connectors - add/edit/view/delete
        2.6. Configurables - add/edit/view/delete

[`workspaces/ballerina/ballerina-extension/src/extension.ts`](./workspaces/ballerina/ballerina-extension/src/extension.ts), serves as the entry point for the Ballerina extension. When the extension is activated, it initializes the following components:

- [Ballerina language server](./workspaces/ballerina/ballerina-extension/src/activators/ls/activateLS.ts): Establishes a connection between the language client and the WebSocket-based Ballerina Language Server by connecting to the WebSocket server.

- [File system](./workspaces/ballerina/ballerina-extension/src/activators/fs/activateFS.ts): Connects to the HTTP-based file system server to provide project file access and handle file system operations.

- [Ballerina visualizer](./workspaces/ballerina/ballerina-extension/src/activators/visualizer/activateVisualizer.ts) - Activates features related to visualizing and editing Ballerina code.
