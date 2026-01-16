const express = require("express");
const router = express.Router();
const Member = require("../Controllers/Member");

router.get("/", Member.getAllMembers);
router.post("/", Member.addMembers);
router.get("/:id", Member.getById);
router.put("/:id", Member.updateMember);
router.delete("/:id", Member.deleteMember);
router.post("/login", Member.loginMember);
router.post('/reset-password', Member.resetMemberPassword);



module.exports = router;
