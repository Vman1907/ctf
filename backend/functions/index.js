const functions = require("firebase-functions");
const admin = require("firebase-admin");
var serviceAccount = require("./capture-the-flag-dcc-firebase-adminsdk-ss7sk-3616114db3.json");
const { DocumentBuilder } = require("firebase-functions/v1/firestore");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const cors = require("cors")({ origin: true });

const db = admin.firestore();
const teamDB = db.collection("teams");
const userDB = db.collection("users");

exports.createTeam = functions.https.onRequest(async (req, res) => {
    // console.log(req.body);
    cors(req, res, async () => {
        try {
            const userUID = req.body.userId;

            // console.log(req.body);
            // console.log(req.body.userId)
            const user = await userDB.doc(userUID).get();
            if (user.exists) {
                if (user.data().isTeam === true) {
                    res.send({
                        status: false,
                        msg: "Please try again!",
                    });
                } else {
                    var teamId = makeid(6);

                    while (true) {
                        // console.log(teamId);
                        const readerData = await teamDB.doc(teamId).get();
                        if (!readerData.exists) break;
                        teamId = makeid(6);
                    }

                    teamDB.doc(teamId).set({
                        flag: 0,
                        teamCount: 1,
                        teamName: req.body.teamName,
                        member1: userUID,
                        question1: false,
                        question2: false,
                        question3: false,
                        question4: false,
                        question5: false,
                    });

                    // console.log(user.data())
                    userDB.doc(userUID).set({
                        isTeam: true,
                        teamId: teamId,
                        name: user.data().name,
                        image: user.data().image,
                    });

                    res.send({
                        status: true,
                        teamName: req.body.teamName,
                        flag: 0,
                        teamId: teamId,
                    });
                }
            } else {
                res.send({
                    status: false,
                    msg: "User doesn't exist. Please contact DCC.",
                });
            }
        } catch (e) {
            functions.logger.error("Error: " + e);
            res.statusCode = 500;
            res.send({
                status: e,
            });
        }
    });
});

exports.joinTeam = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            const teamId = req.body.teamId;
            const userId = req.body.userId;

            const readerData = await teamDB.doc(teamId).get();
            if (!readerData.exists) {
                res.send({
                    status: false,
                    msg: "Please Enter valid team code.",
                });
            } else {
                if (readerData.data().teamCount < 3) {
                    const user = await userDB.doc(userId).get();
                    if (user.exists) {
                        if (user.data().isTeam === true) {
                            res.send({
                                status: false,
                                msg: "Please try again!",
                            });
                        } else {
                            // console.log(user.data())
                            userDB.doc(userId).set({
                                isTeam: true,
                                teamId: teamId,
                                name: user.data().name,
                                image: user.data().image,
                            });

                            var docRef = teamDB.doc(teamId);

                            docRef.get().then(function (thisDoc) {
                                var memCount = thisDoc.data().teamCount + 1;
                                if (memCount === 2) {
                                    docRef.update({
                                        teamCount: memCount,
                                        member2: userId,
                                    });
                                } else {
                                    docRef.update({
                                        teamCount: memCount,
                                        member3: userId,
                                    });
                                }
                            });

                            res.send({
                                status: true,
                                teamName: readerData.data().teamName,
                                flag: readerData.data().flag,
                                teamId: teamId,
                            });
                        }
                    } else {
                        res.send({
                            status: false,
                            msg: "User doesn't exist. Please contact DCC.",
                        });
                    }
                } else {
                    res.send({
                        status: false,
                        msg: "Team already has 3 members.",
                    });
                }
            }
        } catch (e) {
            functions.logger.error("Error: " + e);
            res.statusCode = 500;
            res.send({
                status: e,
            });
        }
    });
});

exports.getTeamDetails = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            const user = await userDB.doc(req.body.userId).get();
            const team = await teamDB.doc(req.body.teamId).get();
            if (user.exists) {
                if (team.exists) {
                    var response = [];
                    var member = await userDB.doc(team.data().member1).get();
                    response.push(member.data());
                    if (team.data().hasOwnProperty("member2")) {
                        member = await userDB.doc(team.data().member2).get();
                        response.push(member.data());
                    }
                    if (team.data().hasOwnProperty("member3")) {
                        member = await userDB.doc(team.data().member3).get();
                        response.push(member.data());
                    }
                    res.send({
                        status: true,
                        result: response,
                        question1: team.data().question1,
                        question2: team.data().question2,
                        question3: team.data().question3,
                        question4: team.data().question4,
                        question5: team.data().question5,
                    });
                } else {
                    res.send({
                        status: false,
                        msg: "Invalid Team ID contact DCC",
                    });
                }
            } else {
                res.send({
                    status: false,
                    msg: "User doesn't exist contact DCC.",
                });
            }
        } catch (e) {
            functions.logger.error("Error: " + e);
            res.statusCode = 500;
            res.send({
                status: e,
            });
        }
    });
});

exports.changeStartTime = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            const teamId = req.body.teamId;
            var docRef = teamDB.doc(teamId);

            const team = await docRef.get();

            if (team.exists) {
                docRef.update({
                    flag: 1,
                    startTime: new Date(),
                });

                res.send({
                    status: true,
                    msg: "Game started!",
                    flag: 1,
                });
            } else {
                res.send({
                    status: false,
                    msg: "Team doesn't exist, contact DCC.",
                });
            }
        } catch (e) {
            functions.logger.error("Error: " + e);
            res.statusCode = 500;
            res.send({
                status: e,
            });
        }
    });
});

exports.checkQR = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            const qrDetail = req.body.qrDetail;
            const teamId = req.body.teamId;
            if (flagIdsday1.hasOwnProperty(qrDetail)) {
                const docRef = teamDB.doc(teamId);
                const team = await docRef.get();
                if (team.exists) {
                    const flagNo = team.data().flag;
                    const newLoc = "timeStamp" + team.data().flag.toString();
                    if (flagNo === flagIdsday1[qrDetail]) {
                        docRef.update({
                            flag: team.data().flag + 1,
                            [newLoc]: new Date(),
                        });
                    } else {
                        res.send({
                            status: false,
                            msg: "You're at a wrong location.",
                        });
                    }
                    res.send({
                        status: true,
                        msg: "Congratulations, you're at the right location.",
                        flag: team.data().flag + 1,
                    });
                } else {
                    res.send({
                        status: false,
                        msg: "Team doesn't exist, contact DCC.",
                    });
                }
            } else {
                res.send({
                    status: false,
                    msg: "Oops! You have entered wrong code.",
                });
            }
        } catch (e) {
            functions.logger.error("Error: " + e);
            res.statusCode = 500;
            res.send({
                status: e,
            });
        }
    });
});

function makeid(length) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

const flagIdsday1 = {
    "8Y7vYo": 1,
    "3kTUML": 2,
    "7jjraP": 3,
    "CTIIRQ": 4,
    "GtdMfx": 5,
};

const flagIdsday2 = {
    "JEBpXX": 1,
    "Jwm1lP": 2,
    "KpYSzn": 3,
    "MBBi9Q": 4,
    "MiMny8": 5,
    "OZJzGs": 6,
};
