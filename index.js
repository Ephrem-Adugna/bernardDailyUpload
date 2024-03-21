import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getDatabase, ref, onValue, set, get, child} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"
const firebaseConfig = {
    apiKey: "AIzaSyDZpWSPSdLHvn36_s-88ALW8CKFhm2by1c",
    authDomain: "bernard-daily.firebaseapp.com",
    databaseURL: "https://bernard-daily-default-rtdb.firebaseio.com",
    projectId: "bernard-daily",
    storageBucket: "bernard-daily.appspot.com",
    messagingSenderId: "595792551128",
    appId: "1:595792551128:web:6760bee0f763d2ef6b8bad"
  };
  const app = initializeApp(firebaseConfig);
var imageContainer = document.getElementById("filesContainer");
var images = [];

const dbRef = ref(getDatabase());
function deleteImage(id){
  const dbRef = ref(getDatabase());
  const db = getDatabase();

  get(child(dbRef, `images`)).then(snapshot=>{
    const data = snapshot.val();
    if(Array.isArray(data)){
    var n = data;
    n.splice(id, 1);
    set(ref(db, 'images/'), n);
    getAll();
    }
  });
}
function getAll(){
get(child(dbRef, `images`)).then(snapshot=>{
  const data = snapshot.val();
  if(Array.isArray(data)){
    imageContainer.innerHTML = "";
  data.forEach((image, id) => {
    imageContainer.innerHTML += `<img class="image" id="${id}" src="data:image/png;base64, ${image}"/>`;
  });
  data.forEach((image, id) => {
    document.getElementById(id.toString()).addEventListener("click", ()=>{deleteImage(id)});
  });
  }
  else{
    getAll();
  }
});
}
getAll();
  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
       var imageData = reader.result.replace("data:image/png;base64,", "");
    const db = getDatabase();
  var images = [];

  const dbRef = ref(getDatabase());
  get(child(dbRef, `images`)).then(snapshot=>{
    const data = snapshot.val();
    if(Array.isArray(data)){
    images = data;
    images.push(imageData);
    set(ref(db, 'images/'), images);
    getAll();
    }
    else{
    images.push(imageData);
    set(ref(db, 'images/'), images);
    getAll();
    }
  });
  
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
async function reduce(file, size){
  size ??= 512

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = size
  canvas.height = size

  const bitmap = await createImageBitmap(file)
  const { width, height } = bitmap

  const ratio = Math.max(size / width, size / height)

  const x = (size - (width * ratio)) / 2
  const y = (size - (height * ratio)) / 2

  ctx.drawImage(bitmap, 0, 0, width, height, x, y, width * ratio, height * ratio)

  return new Promise(resolve => {
    canvas.toBlob(blob => {
      resolve(blob)
    }, 'image/png', 1)
  })

 }
//  function reduce(image){
//   var file = image;
//   var reader = new FileReader();
//   reader.onload = function (readerEvent) {
//       var image = new Image(file);
//       image.onload = function (imageEvent) {

//           // Resize the image
//           var canvas = document.createElement('canvas'),
//               max_size = 10,// TODO : pull max size from a site config
//               width = image.width,
//               height = image.height;
//           if (width > height) {
//               if (width > max_size) {
//                   height *= max_size / width;
//                   width = max_size;
//               }
//           } else {
//               if (height > max_size) {
//                   width *= max_size / height;
//                   height = max_size;
//               }
//           }
//           canvas.width = width;
//           canvas.height = height;
//           canvas.getContext('2d').drawImage(image, 0, 0, width, height);
//           var dataUrl = canvas.toDataURL('image/jpeg');
//           var resizedImage = dataURLToBlob(dataUrl);
//           $.event.trigger({
//               type: "imageResized",
//               blob: resizedImage,
//               url: dataUrl
//           });
//       }
//       console.log(readerEvent.target.result);
//       var imageData = readerEvent.target.result.replace("data:image/png;base64,", "");
//       const db = getDatabase();
//     var images = [];
  
//     const dbRef = ref(getDatabase());
//     get(child(dbRef, `images`)).then(snapshot=>{
//       const data = snapshot.val();
//       if(Array.isArray(data)){
//       images = data;
//       images.push(imageData);
//       set(ref(db, 'images/'), images);
//       getAll();
//       }
//       else{
//       images.push(imageData);
//       set(ref(db, 'images/'), images);
//       getAll();
//       }
//     });
//   }
//   reader.readAsDataURL(file);

//  }
  function writeFileData() {
    var file = document.querySelector('input[type="file"]').files[0];
    if(file.size > 5242880){
reduce(file).then(result=>{
  var reader = new FileReader();
reader.readAsDataURL(result); 
reader.onloadend = function() {
  var imageData = reader.result.replace("data:image/png;base64,", "");
  const db = getDatabase();
var images = [];

const dbRef = ref(getDatabase());
get(child(dbRef, `images`)).then(snapshot=>{
  const data = snapshot.val();
  if(Array.isArray(data)){
  images = data;
  images.push(imageData);
  set(ref(db, 'images/'), images);
  getAll();
  }
  else{
  images.push(imageData);
  set(ref(db, 'images/'), images);
  getAll();
  }
});}
})
    }
    else{
var imageData =  getBase64(file);
    }
  }

  var savebtn = document.getElementById("saveBtn");
  savebtn.addEventListener("click", writeFileData);

