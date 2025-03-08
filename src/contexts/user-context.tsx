import React, {
   createContext,
   useContext,
   useEffect,
   useState,
   ReactNode,
} from "react";
import {
   onAuthStateChanged,
   signOut,
   signInWithEmailAndPassword,
   signInWithPopup,
   createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleAuth } from "../configs/firebase";

export type Mass = {
   quantity: number;
   unit: string;
};

export type ProductDimension = {
   height: number;
   length: number;
   unit: string;
   width: number;
};

export type UnitPrice = {
   unit: string;
   value: number;
};

export type Product = {
   name: string;
   packaging: string;
   cbm: number;
   mass: Mass;
   pcs: number;
   productDimension: ProductDimension;
   purchaseVolume: number;
   salesVolume: number;
   saved: boolean;
   stock: number;
   unitPrice: UnitPrice;
   updatedAt: string;
   factoryName: string;
   factoryId: string;
   image: string;
   additionalNotes: string;
};

export type Supplier = {
   location: string;
   name: string;
   phone: string;
   updatedAt: string;
};

export type SupplierMapping = {
   [key: string]: Supplier;
};

export type Clients = {
   products: string[];
   phoneNumber: string;
   address: string;
   contact: string;
   additionalNotes: string;
};

export type userType = {
   createdAt: string;
   name: string;
   email: string;
   photo: string;
   products: { [key: string]: Product };
   clients: { [key: string]: Clients };
   role: string;
   supplier: SupplierMapping;
};

type AuthContextType = {
   user: userType | null;
   signedIn: boolean;
   loading: boolean;
   profileComplete: boolean;
   googleSignIn: () => Promise<void>;
   emailSignIn: (email: string, password: string) => Promise<void>;
   emailSignUp: (email: string, password: string) => Promise<void>;
   completeProfile: (profileData: {
      firstName: string;
      lastName: string;
      photo: string;
   }) => Promise<void>;
   handleSignOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [user, setUser] = useState<userType | null>(null);
   const [signedIn, setSignedIn] = useState(false);
   const [loading, setLoading] = useState(true);
   const [profileComplete, setProfileComplete] = useState(false);

   const googleSignIn = async () => {
      const result = await signInWithPopup(auth, googleAuth);
      const currentUser = result.user;
      if (currentUser) {
         const userRef = doc(db, "user", currentUser.uid);
         const userDoc = await getDoc(userRef);
         if (!userDoc.exists()) {
            await setDoc(
               userRef,
               {
                  name: currentUser.displayName || currentUser.email || "User",
                  email: currentUser.email || "",
                  photo: currentUser.photoURL || "",
                  createdAt: new Date().toISOString(),
                  products: {},
                  clients: {},
                  role: "user",
                  supplier: {},
               },
               { merge: true }
            );
         }
      }
   };

   const emailSignIn = async (email: string, password: string) => {
      await signInWithEmailAndPassword(auth, email, password);
   };

   const emailSignUp = async (email: string, password: string) => {
      await createUserWithEmailAndPassword(auth, email, password);
   };

   const completeProfile = async (profileData: {
      firstName: string;
      lastName: string;
      photo: string;
   }) => {
      if (auth.currentUser) {
         const userRef = doc(db, "user", auth.currentUser.uid);
         const fullName = `${profileData.firstName} ${profileData.lastName}`;
         await setDoc(
            userRef,
            {
               name: fullName,
               email: auth.currentUser.email || "",
               photo: profileData.photo,
               createdAt: new Date().toISOString(),
               products: {},
               clients: {},
               role: "user",
               supplier: {},
            },
            { merge: true }
         );
         const updatedDoc = await getDoc(userRef);
         if (updatedDoc.exists()) {
            const data = updatedDoc.data();
            const completeUser: userType = {
               createdAt: data.createdAt || "",
               name: data.name || "",
               email: data.email || auth.currentUser.email || "",
               photo: data.photo || "",
               products: data.products || {},
               clients: data.clients || {},
               role: data.role || "",
               supplier: data.supplier || {},
            };
            setUser(completeUser);
            setSignedIn(true);
            setProfileComplete(!!completeUser.email && !!completeUser.name);
         }
      }
   };

   const handleSignOut = async () => {
      await signOut(auth);
      setUser(null);
      setSignedIn(false);
      setProfileComplete(false);
   };

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
         if (currentUser) {
            const userDocRef = doc(db, "user", currentUser.uid);
            const userDoc = await getDoc(userDocRef);
            let fetchedUser: userType;
            if (userDoc.exists()) {
               const data = userDoc.data();
               fetchedUser = {
                  createdAt: data.createdAt || "",
                  name:
                     data.name ||
                     currentUser.displayName ||
                     currentUser.email ||
                     "",
                  email: data.email || currentUser.email || "",
                  photo: data.photo || currentUser.photoURL || "",
                  products: data.products || {},
                  clients: data.clients || {},
                  role: data.role || "",
                  supplier: data.supplier || {},
               };
               setProfileComplete(!!fetchedUser.email && !!fetchedUser.name);
            } else {
               fetchedUser = {
                  createdAt: "",
                  name: currentUser.displayName || currentUser.email || "",
                  email: currentUser.email || "",
                  photo: currentUser.photoURL || "",
                  products: {},
                  clients: {},
                  role: "",
                  supplier: {},
               };
               setProfileComplete(!!fetchedUser.email && !!fetchedUser.name);
            }
            setUser(fetchedUser);
            setSignedIn(true);
         } else {
            setUser(null);
            setSignedIn(false);
            setProfileComplete(false);
         }
         setLoading(false);
      });

      return () => unsubscribe();
   }, []);

   return (
      <AuthContext.Provider
         value={{
            user,
            signedIn,
            loading,
            profileComplete,
            googleSignIn,
            emailSignIn,
            emailSignUp,
            completeProfile,
            handleSignOut,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
   }
   return context;
};
