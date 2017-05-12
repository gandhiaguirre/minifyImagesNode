const fs = require('fs')
const path = require('path').resolve(__dirname, 'node_modules')

const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

var errorImages = new Array();
var queueFolders = new Array();

const folderToScanImages = 'carpetaRaiz';//<---- CHANGE

/**
* Reads all folders/SubFolders and add then to a Queue
**/
var fillQueueFolders = function(f){
  let files = fs.readdirSync(f);
  files.forEach(file => {
    let pathFile = f+'/'+file;
    if(fs.lstatSync(pathFile).isDirectory()){
      console.log('Folder added to queue: ' +pathFile);
      queueFolders.push(pathFile);
      fillQueueFolders(pathFile);
    }
  });
}

minifyImages = () =>{
  if(queueFolders.length>0){
   let targetFolder = queueFolders.pop();
   let pathToSearch= targetFolder+'/*.{jpg,png,jpeg}';
   console.log('Searching images in :',pathToSearch);
   imagemin([pathToSearch], 'build/'+targetFolder, {
     plugins: [
       imageminMozjpeg({quality:60}),
       imageminPngquant({quality: '65-80'})
     ]
   }).then(files => {minifyImages()}).catch(error=>{
     console.log(error);
     errorImages.push(error);
     minifyImages();
   }
 );
 }else{
   while(errorImages.length>0){
     console.log(errorImages.pop());
   }
 }
}

fillQueueFolders(folderToScanImages);

setTimeout(()=>{
  queueFolders.push(folderToScanImages);
  minifyImages();
},100);
