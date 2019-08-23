import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCyw7DwC2hkN0uyUANLR1eMyU2zxfw29EA",
  authDomain: "xpensify-6126e.firebaseapp.com",
  databaseURL: "https://xpensify-6126e.firebaseio.com",
  projectId: "xpensify-6126e",
  storageBucket: "xpensify-6126e.appspot.com",
  messagingSenderId: "220419754691",
  appId: "1:220419754691:web:fc6e254ade1e08da"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


    

const testFirebase = async () => {

  db.collection("test").onSnapshot( (snapshot) => {
    console.log("GENERAL LISTENER TRIPPED: ");
    snapshot.forEach((doc) => {
      console.log("GIVEN DATA: ", doc.data());
    });
    snapshot.docChanges().forEach( (change) => {
      console.log("Change: ", change)
      switch (change.type){
        case "added":
          console.log("The doc was added");
          break;
        case "modified":
          console.log("The doc was modified");
        break;
        case "removed":
          console.log("The doc was removed");
        break;
      }
    });
  });

  db.collection("test").where("location.city", "==", "Princess Castle")
    .onSnapshot( (snapshot) => {
      console.log("CASTLE LISTENER TRIPPED: ");
        snapshot.forEach((doc) => {
          console.log("GIVEN DATA: ", doc.data());
        });
  });

  try {
    
    console.log("ADDING DATA: \n");
    const docRef = await db.collection('test').add({
      name: "Peach",
      location: {
        city: "Toadstool Kingdom",
        latLng: 12345,
      },
      powerups: ["star"]
    });
    const id = docRef.id


    console.log("UPDATING PEACH LOCATION TO CASTLE: \n");
    await db.collection('test').doc(id).update({'location.city': "Princess Castle"});

    await db.collection('test').doc(id).update({'powerups': firebase.firestore.FieldValue.arrayUnion("hammer")});
    console.log("DATA WAS UPDATED: \n");

    await db.collection('test').doc(id).delete();
    console.log("DATA WAS DELETED: \n");

  } catch (err) {
    console.error("Error: ", err);
  }
}

testFirebase();

