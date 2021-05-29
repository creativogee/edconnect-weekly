// imports
const Project = require("../models/project")
const helper = require("../models/mongo_helper")

/* Create new project */
const create = async ({ name, abstract, authors, tags, createdBy }) => {
  try {
    const project = new Project({ name, abstract, authors, tags, createdBy })

    const newProject = await project.save(project)

    if (!newProject) {
      throw "project create unsuccessful"
    }

    return [true, project]
  } catch (e) {
    return [false, helper.translateError(e)]
  }
}

/* Return project with specified id */
const getById = async (id) => {
  return await Project.findOne(id)
}

/* Return all projects */
const getAll = async () => {
  return await Project.find()
}

module.exports = {
  getAll,
  create,
  getById,
}
