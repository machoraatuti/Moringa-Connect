import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  getDoc 
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

// Add a new group to Firestore
export const addGroupToFirestore = async (groupData) => {
  try {
    // Initialize the memberCount to 0
    const groupWithMemberCount = { ...groupData, memberCount: 0 };
    const groupsCollection = collection(db, 'groups');
    const docRef = await addDoc(groupsCollection, groupWithMemberCount);
    return { id: docRef.id, ...groupWithMemberCount };
  } catch (error) {
    console.error('Error adding group:', error);
    throw error;
  }
};

// Update a group in Firestore
export const updateGroupInFirestore = async (groupId, updatedGroup) => {
  try {
    // Only send the fields that can be updated (avoid sending the groupId)
    const groupRef = doc(db, 'groups', groupId);
    
    // Update only the fields that were changed
    const groupDataToUpdate = {
      upcomingEvents: updatedGroup.upcomingEvents,
      recentDiscussions: updatedGroup.recentDiscussions,
      jobPostings: updatedGroup.jobPostings,
    };

    // Ensure no invalid fields are sent (like undefined or null values)
    Object.keys(groupDataToUpdate).forEach(key => {
      if (groupDataToUpdate[key] === undefined || groupDataToUpdate[key] === null) {
        delete groupDataToUpdate[key];
      }
    });

    await updateDoc(groupRef, groupDataToUpdate);
    console.log('Group updated successfully');
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
    console.log('Group deleted successfully');
  } catch (error) {
    console.error('Error deleting group:', error);
    throw error;
  }
};

// Join a group - Firestore functionality to update the member count
export const joinGroupInFirestore = async (groupId) => {
  try {
    const groupRef = doc(db, 'groups', groupId);
    const groupSnapshot = await getDoc(groupRef);

    if (groupSnapshot.exists()) {
      const groupData = groupSnapshot.data();
      const currentCount = groupData.memberCount || 0; // Default to 0 if memberCount is missing

      // Increment the memberCount by 1
      await updateDoc(groupRef, { memberCount: currentCount + 1 });
      console.log(`Member count updated to ${currentCount + 1}`);
    } else {
      console.error('Group does not exist');
    }
  } catch (error) {
    console.error('Error updating member count:', error);
    throw error;
  }
};








