const functions = require('firebase-functions');
const admin = require('firebase-admin');
// const spawn = require('child-process-promise').spawn;
const os = require('os');
const path = require('path');
admin.initializeApp();

// https://github.com/chat21/chat21-cloud-functions/tree/master/functions

// exports.renameUploadedImage = functions.storage.object().onFinalize((object, context) => {
//     const bucket = object.bucket;
//     const contentType = object.contentType;
//     const filePath = object.name;
//     if(!contentType.startsWith('image/')){
//         console.log(filePath + ' : is not a image');
//         return null;
//     }
//     const filename = path.basename(filePath);
//     if(filename.startsWith('thumbs_')){
//         console.log('old file');
//         return null;
//     }
//     const destBucket = admin.storage().bucket(bucket);
//     const tempFilePath = path.join(os.tmpdir(), filename);
//     const metadata = { contentType: contentType};
//     return destBucket.file(filePath).download({
//         destination: tempFilePath
//     }).then(() => {
//         console.log('Image download successfully to ',tempFilePath);
//         return destBucket.upload(tempFilePath,{
//             destination: path.join(path.dirname(filePath) ,'thumbs_'+ path.basename(filePath)),
//             metadata: metadata
//         })
//     });
// })

exports.addLinkOfNewImagesToDatabase = functions.storage.object().onFinalize((object, context) => {
    const bucket = object.bucket;
    const contentType = object.contentType;
    const filePath = object.name;
    const link = object.mediaLink;
    const dirname = path.dirname(filePath);
    const filename = path.basename(filePath);
    const id = filename.split('.')[0];
    const extention = filename.split('.')[1];
    const mainDirname = dirname.split('/')[0];
    console.log(object, context, filename);
    if(mainDirname !== 'Images'){
        return null
    }
    const downloadUrl = "https://firebasestorage.googleapis.com/v0/b/" + bucket + "/o/" + encodeURIComponent(filePath) + "?alt=media&token=" + object.metadata.firebaseStorageDownloadTokens;
    console.log("download url", downloadUrl);
    return admin.database().ref('Pictures').child(id).child('link').set(downloadUrl);
});

exports.autoUpdate = functions.database.ref('/AutoUpdate/Picture/{picutreId}/{property}').onCreate((data, context) => {
    const picutreId = context.params.picutreId;
    const property = context.params.property;

    const value = data.val();

    return admin.database().ref('Pictures').child(picutreId).child(property).set(value).then(()=>{
        admin.database().ref('UserText').child(picutreId).set(null);
        return admin.database().ref('AutoUpdate/Picture').child(picutreId).child(property).set(null);
    });
});