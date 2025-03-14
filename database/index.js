const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  password: "monkey11",
  database: "questionsAndAnswers"
})

module.exports = {
  getQuestions: (callback) => {
    db.query("SELECT users.username, users.location, users.contributions, users.profilePic, questions.* FROM questions INNER JOIN attractions ON questions.attractionID = attractions.id INNER JOIN users ON questions.userID = users.id;", (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, result);
      }
    })
  },
  getAnswers: (questionID, callback) => {
    db.query(`SELECT answers.* FROM answers INNER JOIN questions ON answers.questionID = questions.id WHERE questions.id = ${questionID}`, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, result);
      }
    })
  }
}