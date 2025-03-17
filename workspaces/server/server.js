const { open } = require('@vscode/test-web');

open({
    quality: "insiders",
    browserType: "none",
    // Currently serving the web extension in development mode. 
    // For production mode use, extensionPaths: ["workspaces/ballerina/ballerina-extension"]
    extensionDevelopmentPath: "workspaces/ballerina/ballerina-extension",
    port: 3001,
}).then(() => {
    console.log("done!")
}).catch((err) => {
    console.log(err)
})
