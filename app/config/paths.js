/* eslint-disable no-undef */
const path = require("path");

module.exports = {
    root: path.resolve(__dirname, "../"),
    appOutput: path.resolve(__dirname,"../","dist"),
    appEntry: path.resolve(__dirname,"../","src/","index.tsx"),
    template: path.resolve(__dirname,"../","public/index.html"),
    imagesFolder: path.resolve(__dirname,"../","public/assests"),
    nodeModulesPath: path.resolve(__dirname,"../","node_modules"),
    tsconfig: path.resolve(__dirname,"../","tsconfig.json"),
}