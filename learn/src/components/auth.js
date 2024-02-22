import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, signOut, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import { useState, useEffect } from "react"
import { NewUser } from "./createNewAcc"

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newUser, setNewUser] = useState(false);
    // const user = auth.currentUser;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (err) {
            console.error(err)
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (err) {
            console.error(err)
        }
    };

    const logout = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.log(err)
        }
    }

    const homePage = () => {
        return (<><div>
            <p>
                <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <button onClick={signIn}>Sign In</button>
                <button onClick={signInWithGoogle}>Sign In With Google</button>
            </p>

            {!newUser ? <button onClick={() => setNewUser(!newUser)}>
                {!newUser ? "Create New Account" : null}
            </button> : <NewUser />}


        </div></>)
        
    }

    const authenticatedContent = () => {
        return (
            <div>
                <p>User: {user?.email}</p>
                <button style={{marginBottom:"10px"}} onClick={logout}>Logout</button>
            </div>
        );
    };

   
    

    return (
        <div>
            {user ? authenticatedContent() : homePage()}
        </div>
    );

    



};


// auth.onAuthStateChanged((user) => {
//     try {
//         if (user) {
//             return (<><p>Name: {user.email}</p><button onClick={logout}>Logout</button></>)
            
//         } else {
//             homePage()
//         }
//     } catch (err) {
//         console.error(err)
//     }
// }) 

// return (<div>

    //     {user ?
    //         <div>
    //             <p>Name: {user.email}</p>
    //             <button onClick={logout}>Logout</button>
    //         </div> :
    //         <div>
    //             <p>
    //                 <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
    //                 <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
    //                 <button onClick={signIn}>Sign In</button>
    //                 <button onClick={signInWithGoogle}>Sign In With Google</button>
    //             </p>

    //             {!newUser ? <button onClick={() => setNewUser(!newUser)}>
    //                 {!newUser ? "Create New Account" : null}
    //             </button> : <NewUser />}


    //         </div>

    //     }



    // </div>)
