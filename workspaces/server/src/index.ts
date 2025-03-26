import { open } from '@vscode/test-web';

open({
    quality: "insiders", // For production mode use, quality: "stable"
    browserType: "none",
    // Currently serving the web extension in development mode. 
    extensionDevelopmentPath: "workspaces/ballerina/ballerina-extension",
    // For production mode use, extensionPaths: ["workspaces/ballerina/ballerina-extension"]
    // extensionPaths: ["workspaces/ballerina/ballerina-extension"],
    port: 3001,
}).then(() => {
    console.log("done!")
}).catch((err) => {
    console.log(err)
})
