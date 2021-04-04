const express = require("express")
const router = express.Router()

router.get("/projects/submit", (req, res) => {
  const user = req.session.user
  if (!user) {
    res.redirect("/login")
  }
  const errorJson = req.flash("projectError")
  if (errorJson.length > 0) {
    const error = JSON.parse(errorJson[0])
    res.render("CreateProject", { error })
  }
  res.render("CreateProject")
})

router.post("/projects/submit", (req, res) => {
  const response = require("../services/project")
  const { tags, authors, id, ...others } = req.body
  const tagsArr = tags.split(", ")
  const authorsArr = authors.split(", ")
  const project = response.create({
    tags: tagsArr,
    authors: authorsArr,
    createdBy: id,
    ...others,
  })

  if (project[0] === true) {
    res.redirect("/")
  } else {
    req.flash("projectError", JSON.stringify(project[1]))
    res.redirect(303, "/projects/submit")
  }
})

router.get("/project/:id", (req, res) => {
  const projectRes = require("../services/project")
  const projectId = req.params.id
  const project = projectRes.getById(projectId)
  const userId = project.createdBy
  const userRes = require("../services/user")
  const user = userRes.getById(userId)

  if (!project || !user) {
    res.redirect("/")
  }
  res.render("Project", { project, user })
})

module.exports = router
