# Minify all Images inside a folder
The code uses **imagemin**, executes minify images for each folder/subfolder given a folder, the ouput is a \build folder with the images minified with the same folder structure.


1) Install dependencies :<br />
 ``` javascript
npm install
 ```
 
2) Change in app.js  :<br />
 ``` javascript
const folderToScanImages = 'YOUR_FOLDER_TO_MINIFY';//<---- CHANGE
 ```
3) Run program:<br />
 ``` javascript
node app.js
 ```
