import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  writeBatch,
  query
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

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account'
})

const auth = getAuth()

const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

const db = getFirestore()

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()
  console.log('done')
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data()
    acc[title.toLowerCase()] = items
    return acc
  }, {})

  console.log(categoryMap)

  return categoryMap
}

const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return

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
        createdAt,
        ...additionalInformation
      })
    } catch (err) {
      console.log(`error creating the user ${err.message}`)
    }
  }

  return userDocRef
}

const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

const signOutUser = async () => await signOut(auth)

const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)

export {
  firebaseApp,
  db,
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
  signOutUser,
  onAuthStateChangedListener
}