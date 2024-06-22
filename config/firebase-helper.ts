import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { collectionNames } from "@/constants";

export interface Group {
  id?: string;
  category: string;
  name: string;
  userId: string;
  createdAt: number;
}

const groupCol = collection(db, collectionNames.GROUP);

async function getGroups() {
  try {
    const groupCollectionQuery = query(
      groupCol,
      orderBy("createdAt", "desc"),
      where("userId", "==", "Nd0yFruaSYa0SoQmHP4NWZfyMMY2")
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
    console.log("Failed fetching groups: ", error);
  }
}

async function createGroup({
  name,
  category = "other",
  userId,
}: Pick<Group, "name" | "category" | "userId">) {
  const createdAt = new Date().getTime();
  const d = await addDoc(groupCol, { name, category, createdAt, userId });
  return d.id;
}

export { getGroups, createGroup };
