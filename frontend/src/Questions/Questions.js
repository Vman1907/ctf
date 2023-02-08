import React, { useEffect, useState } from 'react'
import './question.css'
import question from './question3.json'
import Typewriter from 'typewriter-effect'
import axios from 'axios';
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { firebaseConfig } from "./../config";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Loading1 } from '../components/Loading1';


function Question() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const [loading, setLoading] = useState(false)
    const [next, setNext] = useState(false);
    const [questionNo, setQuestionNo] = useState("")
    const [answer, setAnswer] = useState("23.8424,91.4189");
    const [hint, setHint] = useState("")
    const [qrDetail, setQRDetails] = useState("");
    const [state1, setState1] = useState(false)

    useEffect(() => {
        getQuestion();
        setQuestionNo("question" + localStorage.getItem("flag"));
        console.log("question" + localStorage.getItem("flag"))
        console.log(localStorage.getItem([questionNo]))
        setHint(localStorage.getItem(["question" + localStorage.getItem("flag")]))
    }, [])
    const getQuestion = async () => {
        await axios.post("https://us-central1-capture-the-flag-dcc.cloudfunctions.net/getTeamDetails",
            {
                userId: localStorage.getItem("user"),
                teamId: localStorage.getItem("teamId")
            },
            {
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                }
            })
            .then((res) => {
                if (res.data.status === true) {
                    localStorage.setItem("question1", res.data.question1)
                    localStorage.setItem("question2", res.data.question2)
                    localStorage.setItem("question3", res.data.question3)
                    localStorage.setItem("question4", res.data.question4)
                    localStorage.setItem("question5", res.data.question5)
                    localStorage.setItem("question6", res.data.question6)
                }
                else {
                    alert(res.data.msg)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const checkQR = async () => {
        setLoading(true)
        await axios.post("https://us-central1-capture-the-flag-dcc.cloudfunctions.net/checkQR",
            {
                qrDetail: qrDetail,
                teamId: localStorage.getItem("teamId")
            },
            {
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                }
            })
            .then((res) => {
                if (res.data.status === true) {
                    setQRDetails("");
                    setNext(false)
                    setHint("");
                    localStorage.setItem("flag", res.data.flag)
                    setLoading(false)
                }
                else {
                    alert(res.data.msg)
                    setLoading(false)
                }
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    const checkAnswer = async () => {
        setLoading(true)
        if (answer === question[parseInt(localStorage.getItem("flag")) - 1].solution) {
            const question = "question" + localStorage.getItem("flag");
            await updateDoc(doc(db, "teams", localStorage.getItem("teamId")), {
                [question]: true
            }).then((resp) => {
                setTimeout(() => {
                    setHint("true")
                    localStorage.setItem([question], true)
                    setAnswer("");
                    setLoading(false)
                }, 1500)
            });
        }
        else {
            setTimeout(() => {
                alert("Wrong Answer !")
                setLoading(false)
            }, 1500)
        }
    }
    if (localStorage.getItem("flag") == "1" && next && state1) {
        setTimeout(() => {
            setState1(false)
        }, 11000)
        return (
            <div className='loading-wrapper'>
            </div>
        )
    }
    if (hint === "true") { //--------------scanning qr code
        return (
            <div className='question-wrapper'>
                <div className='storyComponent'>
                    <span className='questionContainer'><div>Next location hint:</div><div>{question[parseInt(localStorage.getItem("flag")) - 1].hintText}</div></span>
                    {question[parseInt(localStorage.getItem("flag")) - 1].hintLink ? <div className=''><a target='_blank' className='question-text' href={question[parseInt(localStorage.getItem("flag")) - 1].hintLink} alt='' >{question[parseInt(localStorage.getItem("flag")) - 1].hintLink}</a></div> : null}
                    {/* {localStorage.getItem("flag") == 5 ? <div className='hint-wrapper'>{question[parseInt(localStorage.getItem("flag")) - 1].solution}</div> : null} */}
                    {question[parseInt(localStorage.getItem("flag")) - 1].hintImg1 ? <div className=''><img className='question-img' src={question[parseInt(localStorage.getItem("flag")) - 1].hintImg1} alt='' /></div> : null}
                    {question[parseInt(localStorage.getItem("flag")) - 1].hintImg ? <div className=''><img className='question-img' src={question[parseInt(localStorage.getItem("flag")) - 1].hintImg} alt='' /></div> : null}
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        checkQR();
                    }}>
                        <input style={{ textAlign: "center" }} className='effect-9 effect-10 answerInput' type="text" required onChange={(e) => setQRDetails(e.target.value)} placeholder='Enter Code Here'></input>
                        <button disabled={loading} class="submitButton storyNextButton" type="submit" >
                            {loading ? <Loading1 /> : "Next"}
                        </button>
                    </form>
                    <div className='hint-wrapper'>Enter the code you get after scanning the QR</div>
                    <div className='hint-wrapper'>Remember there are also false QR spread throughout the campus</div>
                </div>
            </div>
        );
    }

    if (next) { //-------------answer the question
        return (
            <div className='question-wrapper'>
                <div className="storyComponent">
                    <span className='questionContainer'><div>Question {localStorage.getItem("flag")} :</div><div>{question[parseInt(localStorage.getItem("flag")) - 1].question}</div></span>
                    {/* {question[parseInt(localStorage.getItem("flag")) - 1].questionHint ? <span style={{ marginTop: "1rem" }} className='question-text'>{question[parseInt(localStorage.getItem("flag")) - 1].questionHint}</span> : null} */}
                    {question[parseInt(localStorage.getItem("flag")) - 1].questionImg ? <span style={{ marginTop: "1rem" }} className='question-text'><img className='question-img' src={question[parseInt(localStorage.getItem("flag")) - 1].questionImg} /></span> : null}
                    {question[parseInt(localStorage.getItem("flag")) - 1].Hint ? <div className='hint-wrapper'>{question[parseInt(localStorage.getItem("flag")) - 1].Hint}</div> : null}
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        checkAnswer();
                    }}>
                        <input style={{ textAlign: "center" }} className='effect-9 effect-10 answerInput' type="text" required onChange={(e) => setAnswer(e.target.value)} placeholder="Enter Answer"></input>
                        <button disabled={loading} class="submitButton storyNextButton" type="submit" >
                            {loading ? <Loading1 /> : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        )
    }


    return ( //--------------story
        <>
            {
                localStorage.getItem("flag") == "2" || localStorage.getItem("flag") == "3" || localStorage.getItem("flag") == "4" || localStorage.getItem("flag") == "5" || localStorage.getItem("flag") == "6" || localStorage.getItem("flag") == "1"
                    ?
                    <div className='question-wrapper'>
                        <span className='questionContainer'>
                            <Typewriter
                                onInit={(typewriter) => {
                                    typewriter.typeString(question[parseInt(localStorage.getItem("flag")) - 1].storyLine.substring(0, 6))
                                        .callFunction(() => {
                                            console.log('String typed out!');
                                        })
                                        .changeDelay(1)
                                        .start();
                                }}
                                options={{
                                    delay: 40
                                }}
                            />
                        </span>
                        <span className='typewriter-wrapper'>
                            <Typewriter
                                onInit={(typewriter) => {
                                    typewriter.typeString(question[parseInt(localStorage.getItem("flag")) - 1].storyLine.substring(6, 2000))
                                        .callFunction(() => {
                                            console.log('String typed out!');
                                        })
                                        .changeDelay(1)
                                        .start();
                                }}
                                options={{
                                    delay: 40
                                }}
                            />
                        </span>
                        <button className='submitButton storyNextButton' onClick={() => {
                            setNext(true)
                            setState1(true)
                        }}>Next
                        </button>
                    </div>
                    :
                    <div className='question-wrapper'>
                        <div className='card'>
                            <span className='cong'>CONGRATULATIONS</span>
                            <span className='cong'>The results will be announced at EOD</span>
                        </div>
                    </div>

            }
        </>
    );
}

export default Question