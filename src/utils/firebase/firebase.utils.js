import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCnxqquU69hIHiVviqAL54mkom-8DA8tVk",
  authDomain: "crwn-clothing-ph.firebaseapp.com",
  databaseURL: "https://crwn-clothing-ph-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "crwn-clothing-ph",
  storageBucket: "crwn-clothing-ph.appspot.com",
  messagingSenderId: "587977784881",
  appId: "1:587977784881:web:cd24d4e4f9f1436aa81f10",
  measurementId: "G-5KPLRVY2JX"
};

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: 'select_account'
})

const auth = getAuth()

const signInWithGooglePopup = () => signInWithPopup(auth, provider)

const db = getFirestore()

const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (! userSnapshot.exists()) {
    // create userDoc
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (err) {
      console.log(`error creating the user ${err.message}`)
    }
  }

  return userDocRef
}

export {
  firebaseApp,
  auth,
  signInWithGooglePopup,
  db,
  createUserDocumentFromAuth,
}