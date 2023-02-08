import { auth } from "./../config";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiCopy } from 'react-icons/bi'
import './Team.css'
import Popup from 'reactjs-popup';
import NavBar from '../components/Navbar';
import { doc, setDoc, getDoc } from "firebase/firestore";
import 'reactjs-popup/dist/index.css';
import { Loading1 } from "../components/Loading1";
import { firebaseConfig } from "./../config";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Question from "../Questions/Questions"
const Team = ({ setLogin }) => {

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    useEffect(() => {
        const userData = getDoc(doc(db, "users", localStorage.getItem("user"))).then((res) => {
            if (res.data().isTeam === true) {
                localStorage.setItem("isTeam", true);
                localStorage.setItem("teamId", res.data().teamId);
                const teamData = getDoc(doc(db, "teams", res.data().teamId)).then((resp) => {
                    localStorage.setItem("teamName", resp.data().teamName);
                    localStorage.setItem("flag", resp.data().flag);
                });
            }
            else {
                localStorage.setItem("isTeam", false);
                localStorage.setItem("teamId", "");
            }
        });

        getTeamData();

    }, [])

    const [user, setUser] = useState(localStorage.getItem("user"));
    const [isTeam, setisTeam] = useState(localStorage.getItem("isTeam"));
    const [teamName, setTeamName] = useState('');
    const [teamID, setTeamID] = useState('');
    const [loading, setLoading] = useState(false);
    const [teamData, setTeamData] = useState([]);
    const [story, setStory] = useState(true);
    const logout = () => {
        auth.signOut().then(() => {
            setLogin(false);
            localStorage.removeItem("user");
            localStorage.removeItem("name");
            localStorage.removeItem("isTeam");
            localStorage.removeItem("teamId");
            localStorage.removeItem("teamName");
            localStorage.removeItem("flag");
        });
    };
    const startGame = () => {
        setLoading(true);
        axios.post("https://us-central1-capture-the-flag-dcc.cloudfunctions.net/changeStartTime", {
            teamId: localStorage.getItem("teamId")
        }, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        }).then((resp) => {
            if (resp.data.status === true) {
                setLoading(false);
                localStorage.setItem("flag", resp.data.flag);
            }
            else {
                setLoading(false);
                alert(resp.data.msg);
            }
        }).catch((e) => {
            setLoading(false);
            alert(e);
        })
    }
    const getTeamData = async () => {
        await axios.post(
            "https://us-central1-capture-the-flag-dcc.cloudfunctions.net/getTeamDetails",
            {
                userId: localStorage.getItem("user"),
                teamId: localStorage.getItem("teamId"),
            }, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        }
        ).then((res) => {
            setTeamData(res.data.result);
        })
    }

    const createTeam = () => {
        setLoading(true);
        axios
            .post(
                "https://us-central1-capture-the-flag-dcc.cloudfunctions.net/createTeam",
                {
                    userId: user,
                    teamName: teamName,
                },
                {
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                }
            )
            .then(async (response) => {
                if (response.data.status === true) {
                    setLoading(false);
                    console.log(response);
                    setisTeam(true);
                    localStorage.setItem("isTeam", true);
                    localStorage.setItem("teamId", response.data.teamId);
                    localStorage.setItem("teamName", response.data.teamName)
                    localStorage.setItem("flag", response.data.flag);
                    await getTeamData();
                }
                else {
                    console.log(response)
                    setLoading(false);
                    alert(response.data.msg)
                }
            }).catch((e) => {
                setLoading(false);
            });
    };
    const joinTeam = () => {
        setLoading(true);
        axios.post(
            "https://us-central1-capture-the-flag-dcc.cloudfunctions.net/joinTeam",
            {
                userId: user,
                teamId: teamID,
            }, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        }
        )
            .then(async (res) => {
                if (res.data.status === true) {
                    setLoading(false);
                    setisTeam(true);
                    localStorage.setItem("flag", res.data.flag);
                    localStorage.setItem("teamName", res.data.teamName)
                    localStorage.setItem("isTeam", true);
                    localStorage.setItem("teamId", res.data.teamId);
                    await getTeamData();
                }
                else {
                    console.log(res)
                    setLoading(false);
                    alert(res.data.msg);
                }

            }).catch((e) => {
                setLoading(false);
            });
    };
    if (isTeam == "true" || isTeam == true) {
        if (localStorage.getItem("flag") >= 1 || localStorage.getItem("flag") >= "1") {
            return (
                <div> <NavBar setLogin={setLogin} teamData={teamData} />
                    {/* <Question flag={localStorage.getItem("flag")} setStory={setStory} story={story} /> */}
                    <Question />
                </div>
            );
        }
        return (<div className="team-wrapper">
            <NavBar setLogin={setLogin} teamData={teamData} />

            <span className="heading">
                Welcome Team {localStorage.getItem("teamName")}
            </span>
            <div className="text-container">
                <div class="copy-text">
                    <input type="text" className="text" value={localStorage.getItem("teamId")} />
                    <button onClick={() => {
                        navigator.clipboard.writeText(localStorage.getItem("teamId"));
                        document.querySelector(".copy-text").classList.add("active");
                        window.getSelection().removeAllRanges();
                        setTimeout(function () {
                            document.querySelector(".copy-text").classList.remove("active");
                        }, 2500);
                    }}><BiCopy /></button>
                </div>
                <div className="warning">Invite friends to join your team</div>
            </div>


            <div className="button-wrapper">
                <button disabled={loading} onClick={() => {
                    startGame();
                }}>
                    {loading ? <Loading1 /> : "Start Game !"}
                </button>
            </div>
        </div>);
    }
    return (
        <div>
            <NavBar setLogin={setLogin} teamData={teamData} />
            <div className="team-wrapper team-wrapper-2">
                <span className="heading-2">
                    Welcome {localStorage.getItem("name")} !
                </span>
                <span className="para-teams">Get ready for the ultimate online quest experience! Our two-day event is packed with engaging questions and activities that will challenge and entertain you at every turn. And the best part? We've hidden hints and clues all around the campus, so you'll have to use your detective skills to uncover them and solve the puzzles.
                    <br /><br />
                    So what are you waiting for, Team up!!
                </span>
                <div className="button-wrapper btn-teams">
                    {/* <div className="cover"></div> */}
                    <Popup trigger={<button>
                        Create Team
                    </button>}

                        modal
                    >
                        <form class="form" onSubmit={(e) => {
                            e.preventDefault();
                            createTeam();
                        }} autoComplete='off'>
                            <h1>Create Team</h1>
                            <div>
                                <label for="teamID">Enter Team Name</label>
                                <input type="text" id="teamName" onChange={(e) => {
                                    setTeamName(e.target.value)
                                }} required />
                            </div>
                            <button
                                disabled={loading}
                                type="submit"
                            >
                                {loading ? <Loading1 /> : "Create Team"}

                            </button>
                        </form>
                        {/* <span>kjhsf</span> */}
                    </Popup>
                    <Popup trigger={<button>
                        Join Team
                    </button>}

                        modal
                    >
                        <form class="form" onSubmit={(e) => {
                            e.preventDefault();
                            joinTeam();
                        }} autoComplete='off'>
                            <h1>Join Team</h1>
                            <div>
                                <label for="teamID">Enter Team ID</label>
                                <input type="text" id="teamName" onChange={(e) => {
                                    setTeamID(e.target.value)
                                }} required />
                            </div>
                            <button
                                disabled={loading}
                                type="submit"
                            >
                                {loading ? <Loading1 /> : "Join Team"}
                            </button>
                        </form>
                        {/* <span>kjhsf</span> */}
                    </Popup>
                </div>
            </div>
        </div>
    );
};
export default Team;
