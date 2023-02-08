import Logo from './logo.png';
import './Navbar.css'
import { auth } from "../config";
import React, { useEffect, useState } from 'react';
import logo from './logo.png'
import "./Navbar.css"
import { FcMenu } from 'react-icons/fc'
import Popup from 'reactjs-popup';
import default1 from './default.jpg'
import axios from 'axios';


function NavBar({ setLogin, login, teamData }) {

    // useEffect(() => {
    //     getTeamData();
    // }, [])
    // const getTeamData = async () => {
    //     await axios.post(
    //         "https://us-central1-capture-the-flag-dcc.cloudfunctions.net/getTeamDetails",
    //         {
    //             userId: localStorage.getItem("user"),
    //             teamId: localStorage.getItem("teamId"),
    //         }, {
    //         headers: {
    //             "Content-Type": "application/json;charset=utf-8",
    //         },
    //     }
    //     ).then((res) => {
    //         setTeamData(res.data);
    //     })
    // }
    const [menu, setMenu] = useState(true);

    const handleMenu = () => {
        setMenu(!menu);
    }

    const logout = () => {
        auth.signOut().then(() => {
            setLogin(false);
            localStorage.removeItem("user");
            localStorage.removeItem("name");
            localStorage.removeItem("isTeam");
            localStorage.removeItem("teamId");
            localStorage.removeItem("teamName");
            localStorage.removeItem("flag");
            localStorage.removeItem("question1");
            localStorage.removeItem("question2");
            localStorage.removeItem("question3");
            localStorage.removeItem("question4");
            localStorage.removeItem("question5");
            localStorage.removeItem("question6");
        });
    };
    return (
        // <>
        // <Navbar bg="dark" expand="lg" variant="dark">
        <>
            <nav className='navbar' data-aos="fade-down"
                data-aos-delay="100"
                data-aos-duration="500"
                data-aos-easing="ease-out"
                data-aos-mirror="true"
                data-aos-once="false">
                <div className="nav_wrapper navCustomStyling">
                    <div className="logoProfile">
                        <img src={logo} alt="" style={{}} />
                        <div className="brandName">Developers & Coders Club</div>
                    </div>
                    <div className="nav_menu">
                        <div className="nav_menu_list">
                            <span className='nav_menu_item '><a className='customNavLink' href="/">Home</a></span>
                            {/* <span className='nav_menu_item '><a className='customNavLink' href="#problems">My Team</a></span>/ */}
                            <span className='nav_menu_item '><a className='customNavLink' href="https://drive.google.com/file/d/10FmC5LYjNSd_2-Lhulp4uAJ1wOh_X_3f/view?usp=sharing" target="_blank">About</a></span>
                            {localStorage.getItem("isTeam") === "true" ? <Popup className='nav_menu_item customNavLink' trigger={<button className='joinTeamButton'>
                                My Team
                            </button>}
                                modal>
                                <div className="teamMembers">
                                    <div className="headerTeamDetails">Team Members</div>
                                    {teamData.map((data) => {
                                        return (
                                            <div className="cardMember">
                                                <div className="memberName">
                                                    {data.name}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {/* <div className="cardMember">
                                        <div>
                                            <img src={default1} className="memberImage"/>
                                        </div>
                                        <div className="memberName">
                                        Prakhar Kumar Srivastava{console.log(teamData)}
                                        </div>
                                    </div>
            
                                    <div className="cardMember">
                                        <div >
                                        <img src={default1} className="memberImage"/>
                                        </div>
                                        <div className="memberName">
                                        Prakhar Kumar Srivastava
                                        </div>
                                    </div> */}
                                </div>
                            </Popup> : null}

                            <span className='nav_menu_item '><span className='customNavLink' onClick={logout}>Logout</span></span>
                        </div>
                        <FcMenu onClick={() => setMenu(!menu)} className={'nav_menu_icon'} />
                    </div>
                </div>
            </nav>

            <div className={menu ? 'nav_mobile' : 'nav_mobile mobile_active'}>
                <span onClick={() => setMenu(!menu)} className='mobile_menu_item' style={{ display: 'block' }}><a className='customNavLink' href="/">Home</a></span>
                {/* <span onClick={() => setMenu(!menu)} className='mobile_menu_item' style={{ display: 'block' }}><a className='customNavLink' href="#problems" >My Team</a></span> */}
                <span onClick={() => setMenu(!menu)} className='mobile_menu_item' style={{ display: 'block' }}><a className='customNavLink' href="https://drive.google.com/file/d/1ENv2a4cQceoSPSX1C9uAYcQVGXtcMDxq/view?usp=drivesdk" target="_blank">About</a></span>
                {localStorage.getItem("isTeam") === "true" ? <Popup className='nav_menu_item customNavLink' trigger={<button className='joinTeamButton mobile_menu_item customNavLink' style={{ padding: "1rem" }}>
                    My Team
                </button>}
                    modal>
                    <div className="teamMembers">
                        <div className="headerTeamDetails">Team Members</div>
                        {teamData.map((data) => {
                            return (
                                <div className="cardMember">
                                    <div className="memberName">
                                        {data.name}
                                    </div>
                                </div>
                            );
                        })}
                        {/* <div className="cardMember">
                                        <div>
                                            <img src={default1} className="memberImage"/>
                                        </div>
                                        <div className="memberName">
                                        Prakhar Kumar Srivastava{console.log(teamData)}
                                        </div>
                                    </div>
            
                                    <div className="cardMember">
                                        <div >
                                        <img src={default1} className="memberImage"/>
                                        </div>
                                        <div className="memberName">
                                        Prakhar Kumar Srivastava
                                        </div>
                                    </div> */}
                    </div>
                </Popup> : null}
                <span onClick={() => setMenu(!menu)} className='mobile_menu_item' style={{ display: 'block' }}><span className='customNavLink' onClick={logout}>Logout</span></span>
            </div>


        </>
    );
}

export default NavBar;