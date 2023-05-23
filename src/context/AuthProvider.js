import React, { createContext, useEffect } from 'react';
import {  createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signInWithPopup,  GoogleAuthProvider,  onAuthStateChanged, signOut, getAuth } from 'firebase/auth';
import { useState } from 'react';
import app from '../firebase/firebase.init';
// import app from '../firebase/firebase.init';



export const AuthContext = createContext()

const auth = getAuth(app)
const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const googleProvider = new GoogleAuthProvider();
	//!<===================================>
	//!<===================================>

	//! Create User....
	const createSignUp = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};
	//!......................................

	//! User profile....
	const userprofile = (name, photoURL) => {
		return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: photoURL,
		});
	};
	//!......................................

	useEffect(() => {
		const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
			// console.log('user inside auth state change', currentUser);
			setUser(currentUser);
			setLoading(false)
		});
		return () => {
			unSubscribe();
		};
	}, []);

	//! Log in....
	const logIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};
	//!......................................

	//! Google Log in....
	const googleSignUp = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};
	//!......................................



	//! LogOut...
	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};
	//!......................................
	
	

	const authInfo = {
		user,
		loading,
		createSignUp,
		userprofile,
		logIn,
		googleSignUp,
		logOut,
	};
	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;