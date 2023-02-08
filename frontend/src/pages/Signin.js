import React, { useState } from "react";
import { auth, provider } from "./../config";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseConfig } from "./../config";
import { FaLongArrowAltRight } from 'react-icons/fa'

import './Signin.css'
import { BsGoogle } from "react-icons/bs";
import { Loading1 } from "../components/Loading1";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



function Signin({ setLogin }) {
    const [loading, setLoading] = useState(false);
    const handleClick = () => {

        signInWithPopup(auth, provider).then(async (result) => {
            setLoading(true);
            localStorage.setItem("user", result.user.uid);
            console.log(result);
            const docRef = doc(db, "users", result.user.uid);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();

            if (docSnap.exists()) {
                if (data.isTeam) {
                    const teamData = await getDoc(doc(db, "teams", data.teamId));
                    localStorage.setItem("teamName", teamData.data().teamName);
                    localStorage.setItem("flag", teamData.data().flag);
                }
                localStorage.setItem("name", data.name);
                localStorage.setItem("isTeam", data.isTeam);
                localStorage.setItem("teamId", data.teamId);
                setLoading(false);
                setLogin(true);
            } else {
                await setDoc(doc(db, "users", result.user.uid), {
                    name: result.user.displayName,
                    isTeam: false,
                    teamId: "",
                    image: result.user.photoURL
                });
                localStorage.setItem("name", result.user.displayName);
                localStorage.setItem("isTeam", false);
                localStorage.setItem("teamId", "");
                setLoading(false);
                setLogin(true)
            }
        }).catch((error) => {
            setLoading(false);
            alert(error.message);
        });
    };

    const logout = () => {
        auth.signOut().then(() => {
            localStorage.removeItem("user");
            localStorage.removeItem("name");
            localStorage.removeItem("isTeam");
            localStorage.removeItem("teamId");
        });
    };

    return (
        <div className="home-page-wrapper">
            <div className="heading">
                <div className="line"></div>
                <span><span style={{ color: "#E13D25" }}>CAPTURE</span> THE FLAG</span>
            </div>
            <div className="button-container">
                <button onClick={handleClick} disabled={loading}>{loading ? (<Loading1 />) : (<div><BsGoogle />  <span>SignIn with Google</span></div>)}</button>
                <a href="https://drive.google.com/file/d/1ENv2a4cQceoSPSX1C9uAYcQVGXtcMDxq/view?usp=drivesdk" download='CTF' target="_blank" style={{ textDecoration: "none", color: "#939297" }}><span>For Rules and Regulations&nbsp; <FaLongArrowAltRight /></span></a>
            </div>
            {/* <button onClick={logout}>Logout</button> */}
        </div>
    );
}

export default Signin;
