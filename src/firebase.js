import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

// Your Firebase config object
const firebaseConfig = {
    apiKey: "AIzaSyCob1d2UNIU11vftfkXz6qwCbq60goe-8s",
    authDomain: "moringaconnectdb.firebaseapp.com",
    projectId: "moringaconnectdb",
    storageBucket: "moringaconnectdb.firebasestorage.app",
    messagingSenderId: "1037558167584",
    appId: "1:1037558167584:web:3ab2debde4913c09792445",
    measurementId: "G-6QE4L0TTYB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Fetch groups from Firestore
export const fetchGroupsFromFirestore = async () => {
  try {
    const groupsCollection = collection(db, 'groups');
    const groupsSnapshot = await getDocs(groupsCollection);
    const groupsList = groupsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return groupsList;
  } catch (error) {
    console.error('Error fetching groups:', error);
    throw error;
  }
};

// Add a new group to Firestore
export const addGroupToFirestore = async (groupData) => {
  try {
    const groupsCollection = collection(db, 'groups');
    const docRef = await addDoc(groupsCollection, groupData);
    return { id: docRef.id, ...groupData };  // Return the new group data with the Firestore ID
  } catch (error) {
    console.error('Error adding group:', error);
    throw error;
  }
};

// Now also export addDoc and collection
export { addDoc, collection };


