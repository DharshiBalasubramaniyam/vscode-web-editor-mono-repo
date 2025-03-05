const { open } = require('@vscode/test-web');

open({
    quality: "insiders",
    browserType: "none",
    extensionDevelopmentPath: "workspaces/ballerina/ballerina-extension",
    port: 3001,
}).then(() => {
    console.log("done!")
}).catch((err) => {
    console.log(err)
})
