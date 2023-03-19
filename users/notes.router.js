const router = require("express").Router();
const { checkToken } = require("../auth/token_authorization");
const {
    getNotes,
    createNote,
    updateNotes,
    deleteNote,
    getNoteByUserId
  } = require("./user.controller");
  router.get("/",checkToken, getNotes);
  router.post("/",checkToken,createNote);
  router.get("/:id",checkToken, getNoteByUserId);
  router.delete("/:note_id",checkToken, deleteNote);
  router.put("/update",checkToken, updateNotes);
  module.exports = router;