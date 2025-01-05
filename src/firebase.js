import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  increment,
} from 'firebase/firestore';

// Firebase configuration
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

// Add a new document to any collection
export const addDocument = async (collectionName, data) => {
  try {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, data);
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw error;
  }
};

// Fetch groups from Firestore
export const fetchGroupsFromFirestore = async () => {
  try {
    const groupsCollection = collection(db, 'groups');
    const groupsSnapshot = await getDocs(groupsCollection);
    return groupsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching groups:', error);
    throw error;
  }
};

// Add a new group
export const addGroupToFirestore = async (groupData) => {
  return addDocument('groups', { ...groupData, memberCount: 0 });
};

// Fetch members of a specific group
export const fetchGroupMembers = async (groupId) => {
  try {
    const membersCollection = collection(db, `groups/${groupId}/members`);
    const membersSnapshot = await getDocs(membersCollection);
    return membersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
};

// Join a group and increment member count
export const joinGroupInFirestore = async (groupId) => {
  try {
    const groupRef = doc(db, 'groups', groupId);
    await updateDoc(groupRef, { memberCount: increment(1) });
  } catch (error) {
    console.error('Error updating member count:', error);
    throw error;
  }
};

// Update a group's data
export const updateGroupInFirestore = async (groupId, updatedGroup) => {
  try {
    const groupRef = doc(db, 'groups', groupId);
    await updateDoc(groupRef, { ...updatedGroup });
    console.log(`Group ${groupId} updated successfully.`);
  } catch (error) {
    console.error(`Error updating group ${groupId}:`, error);
    throw error;
  }
};

// Delete a group
export const deleteGroupFromFirestore = async (groupId) => {
  try {
    const groupRef = doc(db, 'groups', groupId);
    await deleteDoc(groupRef);
    console.log(`Group ${groupId} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting group ${groupId}:`, error);
    throw error;
  }
};
