import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  increment
} from 'firebase/firestore';

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
    return groupsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching groups:', error);
    throw error;
  }
};

// Fetch member count for a specific group
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

// Add a new group to Firestore
export const addGroupToFirestore = async (groupData) => {
  try {
    // Initialize the memberCount to 0 when adding a new group
    const groupWithMemberCount = { ...groupData, memberCount: 0 }; 
    const groupsCollection = collection(db, 'groups');
    const docRef = await addDoc(groupsCollection, groupWithMemberCount);
    
    // Return the newly added group with its auto-generated ID
    return { id: docRef.id, ...groupWithMemberCount }; 
  } catch (error) {
    console.error('Error adding group:', error);
    throw error;
  }
};

// Update a group in Firestore
export const updateGroupInFirestore = async (groupId, updatedGroup) => {
  try {
    const groupRef = doc(db, 'groups', groupId);
    
    // Use the spread operator to merge the updated fields with the existing document
    await updateDoc(groupRef, { ...updatedGroup });
  } catch (error) {
    console.error('Error updating group:', error);
    throw error;
  }
};

// Delete a group from Firestore
export const deleteGroupFromFirestore = async (groupId) => {
  try {
    const groupRef = doc(db, 'groups', groupId);
    await deleteDoc(groupRef);
  } catch (error) {
    console.error('Error deleting group:', error);
    throw error;
  }
};

// Join a group - Firestore functionality to increment the member count
export const joinGroupInFirestore = async (groupId) => {
  try {
    const groupRef = doc(db, 'groups', groupId);
    
    // Use the increment function to atomically increase the memberCount by 1
    await updateDoc(groupRef, { memberCount: increment(1) });
  } catch (error) {
    console.error('Error updating member count:', error);
    throw error;
  }
};