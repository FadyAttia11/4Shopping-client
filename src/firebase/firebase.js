import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBVUegX6CMRLAf3Ctm_ao8sjuyv1afYGeg",
    authDomain: "shopping-9284e.firebaseapp.com",
    databaseURL: "https://shopping-9284e.firebaseio.com",
    projectId: "shopping-9284e",
    storageBucket: "shopping-9284e.appspot.com",
    messagingSenderId: "122458938338",
    appId: "1:122458938338:web:9f5a3e2ba4acba5b53b7bb",
    measurementId: "G-S8NJJ6S31C"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

// const database = firebase.database()


// database.ref('expenses').on('value', (snapshot) => {
//     const expenses = []

//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     })
//     console.log(expenses)
// })

// database.ref('expenses/-MJ6sMSEuHZokKn16fp6').remove()


// database.ref('expenses').push({
//     description: 'eating food',
//     note: 'eating with gemmi in papa johns',
//     amount: 2,
//     createdAt: 51545421
// })
// database.ref('expenses').push({
//     description: 'drinking coffe',
//     note: 'in coffe shop',
//     amount: 1,
//     createdAt: 7456847564
// })
// database.ref('expenses').push({
//     description: 'watching movie',
//     note: 'in city center vox cinema',
//     amount: 3,
//     createdAt: 5787894
// })


// database.ref().on('value', (snapshot) => {
//     const val = snapshot.val()
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`)
// }, (e) => {
//     console.log('error happened', e)
// })



// database.ref().set({
//     name: 'Fady Attia',
//     age: 24,
//     stressLevel: 6,
//     job: {
//         title: 'software developer',
//         company: 'google'
//     },
//     location: {
//         city: 'Alexandria',
//         country: 'Egypt'
//     }
// })

// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'amazon',
//     'location/city': 'cairo'
// })

// database.ref('isSingle').remove().then(() => {
//     console.log("is single removed!")
// }).catch((e) => {
//     console.log('error happened', e)
// })

// database.ref('location/city').set('Cairo')
// database.ref('attributes').set({
//     height: 180,
//     weight: 80
// })