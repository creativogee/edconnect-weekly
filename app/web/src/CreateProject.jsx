import React, { useState, useEffect } from "react"
import { Alert, Button, Col, Form, Row } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import Layout from "./shared/Layout"

const CreateProject = () => {
  useEffect(() => {
    const check = document.cookie.split(";").find(item => item.startsWith("uid="))
    if (!check) {
      history.push("/login")
    }
  })

  const [name, setName] = useState("")
  const [abstract, setAbstract] = useState("")
  const [authors, setAuthors] = useState([])
  const [tags, setTags] = useState([])
  const [error, setError] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  const history = useHistory()
  const data = { name, abstract, authors, tags }

  const defaultState = () => {
    setName("")
    setAbstract("")
    setAuthors([])
    setTags([])
    setError("")
    setErrorMessages([])
  }

  const handleInput = e => {
    const { id, value } = e.target
    switch (id) {
      case "name":
        setName(value)
        break
      case "abstract":
        setAbstract(value)
        break
      case "authors":
        setAuthors(value.split(","))
        break
      case "tags":
        setTags(value.split(","))
        break
      default:
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const payload = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const response = await payload.json()
    console.log(response)
    defaultState()

    if (response.status === "ok") {
      setError(false)
      document.cookie = `uid=${response.data.id};path=/`
      history.push("/")
    } else {
      setError(true)
      setErrorMessages(response.errors)
    }
  }

  return (
    <Layout>
      <main>
        <div class="mx-auto w-50 p-2 mt-5">
          <h3>Submit Project</h3>
          <Form id="submitProject" onSubmit={handleSubmit}>
            {error && (
              <Alert variant="danger">
                {errorMessages.map((err, index) => (
                  <p key={index}>{err}</p>
                ))}
              </Alert>
            )}
            <Form.Group as={Row}>
              <Col>
                <Form.Label>Project Name:</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  placeholder="Enter project name"
                  value={name}
                  onChange={handleInput}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col>
                <Form.Label>Project Abstract:</Form.Label>
                <Form.Control
                  as="textarea"
                  id="abstract"
                  rows={4}
                  cols={100}
                  value={abstract}
                  onChange={handleInput}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col>
                <Form.Label>Author(s): </Form.Label>
                <Form.Control
                  type="text"
                  id="authors"
                  placeholder="Enter author names (seperated by comma)"
                  value={authors.join(",")}
                  onChange={handleInput}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col>
                <Form.Label>Tag(s):</Form.Label>
                <Form.Control
                  type="text"
                  id="tags"
                  placeholder="Use # to tag project with different topics"
                  value={tags.join(",")}
                  onChange={handleInput}
                />
              </Col>
            </Form.Group>

            <Button variant="primary" type="submit">
              Continue
            </Button>
          </Form>
        </div>
      </main>
    </Layout>
  )
}

export default CreateProject
