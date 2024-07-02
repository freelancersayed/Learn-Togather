import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic/useAxiosPublic";




const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const AuthContext = createContext(null)


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
const axiosPublic = useAxiosPublic();


    const createUser = (email, password, photo, name)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email,  password, photo, name)
    };

    
    const singIn = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = ()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }; 

    const handleGithubeSign=()=>{
        setLoading(true)
        return signInWithPopup(auth, githubProvider)
    };

    const updateUserProfile = (name, photo) =>{
        return updateProfile(auth.currentUser,{
            displayName: name,
            photoURL: photo
        })

    }

    const logOut = ()=>{
        setLoading(true)
        // axios('https://assignment-11-server-theta-sable.vercel.app/logout', {withCredentials: true})
        return signOut(auth);
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          console.log("current user", currentUser);
    
          if (currentUser) {
            // get token and store client
            const userInfo = { email: currentUser.email };
            axiosPublic.post("/jwt", userInfo).then((res) => {
              if (res.data.token) {
                console.log("JWT received:", res.data.token); // Logging JWT token
                localStorage.setItem("access-token", res.data.token);
                console.log("JWT saved to localStorage");
                setLoading(false);
              }
            }).catch(error => {
              console.error("Error fetching JWT:", error);
              setLoading(false);
            });
          } else {
            // remove token
            localStorage.removeItem('access-token');
            console.log("JWT removed from localStorage");
            setLoading(false);
          }
        });
    
        return () => {
          unsubscribe();
        };
      }, [axiosPublic]);


    const userInfo ={
        user,
        loading,
        createUser,
        singIn,
        signInWithGoogle,
        handleGithubeSign,
        logOut,
        updateUserProfile

    }

    
    return (
     <AuthContext.Provider value={userInfo}>
        {children}
     </AuthContext.Provider>
    );
};

export default AuthProvider;