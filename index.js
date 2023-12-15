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
    document.getElementById(id.toString()).addEventListener("click", ()=>{deleteImage(id)});
  });
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
  });
  
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
  function writeFileData() {
    var file = document.querySelector('input[type="file"]').files[0];
var imageData =  getBase64(file);

  }
  var savebtn = document.getElementById("saveBtn");
  savebtn.addEventListener("click", writeFileData);

