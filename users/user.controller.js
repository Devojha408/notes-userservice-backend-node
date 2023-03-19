const {
    create,
    getUserByUserEmail,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser
  } = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const axios = require('axios');
const API_URL = "http://localhost:8080";
  
  module.exports = {
    createUser: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },
    login: (req, res) => {
      const body = req.body;
      getUserByUserEmail(body.email, (err, results) => {
        if (err) {
          console.log(err);
        }
        if (!results) {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        }
        const result = compareSync(body.password, results.password);
        if (result) {
          results.password = undefined;
          const jsontoken = sign({ result: results }, "qwe1234", {
            expiresIn: "1h"
          });
          return res.json({
            success: 1,
            message: "login successfully",
            token: jsontoken,
            data: results
          });
        } else {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        }
      });
    },
    getUserByUserId: (req, res) => {
      const id = req.params.id;
      getUserByUserId(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found"
          });
        }
        results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
    },
    getUsers: (req, res) => {
      getUsers((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },
    updateUsers: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      updateUser(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          message: "updated successfully"
        });
      });
    },
    deleteUser: (req, res) => {
      const data = req.body;
      deleteUser(data, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record Not Found"
          });
        }
        return res.json({
          success: 1,
          message: "user deleted successfully"
        });
      });
    },
    getNotes: (req, res) => {
      axios.get(API_URL + "/notes")
      .then(response => {
        return res.json({
          success: 1,
          data: response.data
        });
      })
      .catch(error => {
        console.log(error);
        return;
      });
    },
    createNote: (req, res) => {
      const body = req.body;
      axios.post(API_URL + "/notes", body)
      .then(response => {
        return res.status(200).json({
          success: 1,
          data: response.data
        });
      })
      .catch(error => {
        console.log(error);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
      });
    },
    updateNotes: (req, res) => {
      const body = req.body;
      axios.put(API_URL + "/update", body)
      .then(response => {
        return res.status(200).json({
          success: 1,
          data: response.data
        });
      })
      .catch(error => {
        console.log(error);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
      });
    },
    deleteNote: (req, res) => {
      const data = req.params.note_id;
      axios.delete(API_URL + "/delete/"+data)
      .then(response => {
        return res.status(200).json({
          success: 1,
          message: "Note deleted successfully"+response.data
        });
      })
      .catch(error => {
        console.log(error);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
      });
    },
    getNoteByUserId: (req, res) => {
      const id = req.params.id;
      axios.get(API_URL + "/notes/"+id)
      .then(response => {
        return res.json({
          success: 1,
          data: response.data
        });
      })
      .catch(error => {
        console.log(error);
        return;
      });
    }
  };