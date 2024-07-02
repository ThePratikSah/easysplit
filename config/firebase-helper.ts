import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { collectionNames } from "@/constants";
import Toast from "react-native-toast-message";

export interface Group {
  id?: string;
  category: string;
  name: string;
  userId: string;
  createdAt: number;
  groupMembers: string[];
}

const groupCol = collection(db, collectionNames.GROUP);

async function getGroups() {
  try {
    const { currentUser } = auth;
    const groupCollectionQuery = query(
      groupCol,
      orderBy("createdAt", "desc"),
      where("groupMembers", "array-contains", currentUser?.email)
    );
    const groupList: Group[] = [];
    const groupSnapshot = await getDocs(groupCollectionQuery);
    groupSnapshot.forEach((doc) => {
      groupList.push({
        id: doc?.id,
        ...(doc.data() as Omit<Group, "id">),
      });
    });

    return groupList;
  } catch (error) {
    console.error("Failed fetching groups: ", error);
    return Toast.show({
      type: "error",
      text1: "Failed fetching groups",
    });
  }
}

async function createGroup({
  name,
  category = "other",
  userId,
  groupMembers,
}: Pick<Group, "name" | "category" | "userId" | "groupMembers">) {
  try {
    const createdAt = new Date().getTime();
    const d = await addDoc(groupCol, {
      name: formatGroupName(name),
      category,
      createdAt,
      userId,
      groupMembers,
    });
    return d.id;
  } catch (error) {
    console.error("Failed to create group");
    return Toast.show({
      type: "error",
      text1: "Failed to create group",
    });
  }
}

async function addUserToGroup({
  email,
  groupId,
}: {
  email: string;
  groupId: string;
}) {
  try {
    const groupRef = doc(db, collectionNames.GROUP, groupId);
    await updateDoc(groupRef, {
      groupMembers: arrayUnion(email),
    });
  } catch (error) {
    console.error("Failed to add user in group");
    return Toast.show({
      type: "error",
      text1: "Failed to add user in group",
    });
  }
}

async function getGroupById({
  groupId,
}: {
  groupId: string;
}): Promise<Group | null> {
  try {
    if (!groupId) {
      console.error("No group id provided");
      return null;
    }
    const groupRef = doc(db, collectionNames.GROUP, groupId);
    const groupSnapshot = await getDoc(groupRef);

    if (groupSnapshot.exists()) {
      return { id: groupSnapshot.id, ...groupSnapshot.data() } as Group;
    } else {
      console.log("No such group!");
      return null; // Or handle the case where the group doesn't exist as needed
    }
  } catch (error) {
    console.error("Failed fetching group: ", error);
    Toast.show({
      type: "error",
      text1: "Failed fetching group info",
    });
    return null;
  }
}

// function listenForNewGroups(
//   email: string,
//   onUpdate: (groups: Group[]) => void
// ) {
//   const q = query(
//     collection(db, collectionNames.GROUP),
//     where("groupMembers", "array-contains", email)
//   );

//   const unsubscribe = onSnapshot(q, (querySnapshot) => {
//     const updatedGroups = [] as any;
//     querySnapshot.forEach((doc) => {
//       updatedGroups.push({ id: doc.id, ...doc.data() } as Group);
//     });
//     onUpdate(updatedGroups);
//   });

//   return unsubscribe;
// }

// listenForNewGroups(auth.currentUser?.email!, (groups) => {
//   console.log("Updated groups:", groups);
// });

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function formatGroupName(groupName: string) {
  // Split the group name into an array of words
  const words = groupName.split(" ");

  // Capitalize the first letter of each word
  const formattedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the formatted words back into a single string
  const formattedGroupName = formattedWords.join(" ");

  return formattedGroupName;
}

export {
  getGroups,
  createGroup,
  addUserToGroup,
  getGroupById,
  isValidEmail,
  formatGroupName,
};
