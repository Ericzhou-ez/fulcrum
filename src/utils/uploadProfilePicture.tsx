import { storage } from "../configs/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../configs/firebase";

export async function uploadProfilePic(file: File): Promise<string> {
   if (!auth.currentUser) {
      throw new Error("User not authenticated");
   }
   // user/{uid}/profilePic/{filename}

   const storageRef = ref(
      storage,
      `user/${auth.currentUser.uid}/profilePic/${file.name}`
   );
   await uploadBytes(storageRef, file);
   const downloadURL = await getDownloadURL(storageRef);
   return downloadURL;
}
