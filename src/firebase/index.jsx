import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, data: doc.data() });
    });
    return users;
  } catch (error) {
    console.error('Error Occurred:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};

export const getUserById = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return { id: userDoc.id, data: userDoc.data() };
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};

export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, data: doc.data() });
    });
    return products;
  } catch (error) {
    console.error('Error Occurred:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};

export const getProductById = async (productId) => {
  try {
    const productDoc = await getDoc(doc(db, 'products', productId));
    if (productDoc.exists()) {
      return { id: productDoc.id, data: productDoc.data() };
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};

// export const getAcceptedProducts = async () => {
//   try {
//     const querySnapshot = await getDocs(
//       query(collection(db, 'products'), where('status', '==', 'accepted'))
//     );
//     const acceptedProducts = [];
//     querySnapshot.forEach((doc) => {
//       acceptedProducts.push({ id: doc.id, data: doc.data() });
//     });
//     return acceptedProducts;
//   } catch (error) {
//     console.error('Error Occurred:', error);
//     throw error; // Rethrow the error to handle it outside this function if needed.
//   }
// };

export const getTotalProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.size;
  } catch (error) {
    console.error('Error Occurred:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};

export const getTotalUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    return querySnapshot.size;
  } catch (error) {
    console.error('Error Occurred:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error('Sign-In Error:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};

export const signUserOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign-Out Error:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};
