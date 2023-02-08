import { useState } from 'react';
import './QuestionComponent.css'
import question from '../Questions/question2.json'

const Question = ({ story, setStory }) => {
    const [flags, setFlags] = useState(1)
    const [answer, setAnswer] = useState("")
    if (story) {
        return (
            <div className="story-wrapper">
                <span className="heading">story</span>
                <span className="text-wrapper">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt metus quis erat lacinia, ut suscipit enim sodales. Donec eget purus eget risus pellentesque dignissim iaculis quis massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</span>
                <button onClick={() => setStory(false)}>Begin!</button>
            </div>
        )
    } else {
        if (flags == "1") {
            const handlesubmit = (event) => {
                event.preventDefault();
            }
            return (
                <div className="story-wrapper">
                    <span className="heading">Question {flags}</span>
                    <span className="text-wrapper">{question[0]["question"]}</span>
                    <span className='hint-wrapper'>{question[0]["hintText"]}</span>
                    <form onSubmit={handlesubmit}>
                        <input type='text' value={answer} onChange={(e) => { setAnswer(e.target.value) }}></input>
                        <button type='submit' onClick={() => setFlags(flags + 1)}>increase</button>
                    </form>
                </div>
            )
        }
        else if (flags == "2") {
            console.log(question[0]["question"])
            return (
                <div className="story-wrapper">
                    <span className="heading">Question {flags}</span>
                    <span className="text-wrapper">{question[1]["question"]}</span>
                    <span className='hint-wrapper'>{question[1]["hintText"]}</span>
                    <img src={question[1]["hintImg"]} />
                    <button onClick={() => setFlags(flags + 1)}>increase</button>
                </div>
            )
        }
        else if (flags == "3") {
            console.log(question[0]["question"])
            return (
                <div className="story-wrapper">
                    <span className="heading">Question {flags}</span>
                    <span className="text-wrapper">{question[2]["question"]}</span>
                    <span className='hint-wrapper'>{question[2]["hintText"]}</span>
                    <button onClick={() => setFlags(flags + 1)}>increase</button>
                </div>
            )
        }
        else if (flags == "4") {
            console.log(question[0]["question"])
            return (
                <div className="story-wrapper">
                    <span className="heading">Question {flags}</span>
                    <span className="text-wrapper">{question[3]["question"]}</span>
                    <span className='hint-wrapper'>{question[3]["hintText"]}</span>
                    <img src={question[3]["hintImg"]} />
                    <button onClick={() => setFlags(flags + 1)}>increase</button>
                </div>
            )
        }
        else if (flags == "5") {
            console.log(question[0]["question"])
            return (
                <div className="story-wrapper">
                    <span className="heading">Question {flags}</span>
                    <span className="text-wrapper">{question[4]["question"]}</span>
                    <span className='hint-wrapper'>{question[4]["hintText"]}</span>
                    {/* <img src={question[3]["hintImg"]} /> */}
                    <button onClick={() => setFlags(flags + 1)}>increase</button>
                </div>
            )
        }
        else if (flags == "6") {
            console.log(question[0]["question"])
            return (
                <div className="story-wrapper">
                    <span className="heading">Question {flags}</span>
                    <span className="text-wrapper">{question[5]["question"]}</span>
                    <span className='hint-wrapper'>{question[5]["hintText"]}</span>
                    <img src={question[5]["hintImg"]} />
                    <button onClick={() => setFlags(flags + 1)}>increase</button>
                </div>
            )
        }
        else if (flags == "7") {
            console.log(question[0]["question"])
            return (
                <div className="story-wrapper">
                    <span className="heading">Question {flags}</span>
                    <span className="text-wrapper">{question[6]["question"]}</span>
                    <span className='hint-wrapper'>{question[6]["hintText"]}</span>
                    {/* <img src={question[3]["hintImg"]} /> */}
                    <button onClick={() => setFlags(flags + 1)}>increase</button>
                </div>
            )
        }
        else if (flags == "8") {
            console.log(question[0]["question"])
            return (
                <div className="story-wrapper">
                    <span className="heading">Question {flags}</span>
                    <span className="text-wrapper">{question[7]["question"]}</span>
                    <span className='hint-wrapper'>{question[7]["hintText"]}</span>
                    <img src={question[7]["hintImg"]} />
                    <button onClick={() => setFlags(flags + 1)}>increase</button>
                </div>
            )
        }
        else if (flags == "9") {
            console.log(question[0]["question"])
            return (
                <div className="story-wrapper">
                    <span className="heading">Question {flags}</span>
                    <span className="text-wrapper">{question[8]["question"]}</span>
                    <span className='hint-wrapper'>{question[8]["hintText"]}</span>
                    {/* <img src={question[3]["hintImg"]} /> */}
                    <button onClick={() => setFlags(flags + 1)}>increase</button>
                </div>
            )
        }
        else if (flags == "10") {
            console.log(question[0]["question"])
            return (
                <div className="story-wrapper">
                    <span className="heading">Question {flags}</span>
                    <span className="text-wrapper">{question[9]["question"]}</span>
                    <span className='hint-wrapper'>{question[9]["hintText"]}</span>
                    <img src={question[9]["hintImg"]} />
                    <button onClick={() => setFlags(flags + 1)}>increase</button>
                </div>
            )
        }
        else if (flags == "11") {
            console.log(question[0]["question"])
            return (
                <div className="story-wrapper">
                    <span className="heading">Question {flags}</span>
                    <span className="text-wrapper">{question[10]["question"]}</span>
                    <span className='hint-wrapper'>{question[10]["hintText"]}</span>
                    {/* <img src={question[3]["hintImg"]} /> */}
                    <button onClick={() => setFlags(flags + 1)}>increase</button>
                </div>
            )
        }
        else if (flags == "12") {
            console.log(question[0]["question"])
            return (
                <div className="story-wrapper">
                    <span className="heading">Question {flags}</span>
                    <span className="text-wrapper">{question[11]["question"]}</span>
                    <span className='hint-wrapper'>{question[11]["hintText"]}</span>
                    <img src={question[11]["hintImg"]} />
                    <button onClick={() => setFlags(flags + 1)}>increase</button>
                </div>
            )
        }
    }
}
export default Question;