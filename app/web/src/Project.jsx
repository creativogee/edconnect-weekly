import React, { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Layout from "./shared/Layout"

const Project = () => {
  const [projectTitle, setProjectTitle] = useState("")
  const [creatorId, setCreatorId] = useState("")
  const [author, setAuthor] = useState("")
  const [authors, setAuthors] = useState([])
  const [abstract, setAbstract] = useState("")
  const { id } = useParams()

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data.authors)
        setProjectTitle(data.name)
        setCreatorId(data.createdBy)
        setAbstract(data.abstract)
        setAuthors(data.authors)
      })
  }, [id])

  useEffect(() => {
    fetch(`/api/users/${creatorId}`)
      .then(res => res.json())
      .then(data => {
        const { firstname, lastname } = data
        setAuthor(`${firstname} ${lastname}`)
      })
  }, [creatorId])

  return (
    <Layout>
      <main>
        <div className="mx-auto w-50 mt-5">
          <Container>
            <Row>
              <strong>
                <h2>{projectTitle}</h2>
              </strong>
            </Row>

            <Row className="bg-light p-3">
              <Col>
                Created by: <br /> {author}
              </Col>
              <Col>
                Date created: <br /> 2020-01-12
              </Col>
              <Col>
                Last updated: <br /> 2021-03-29
              </Col>
              <Button href="/createproject" className="align-middle pt-2">
                Edit Project
              </Button>
            </Row>
          </Container>
        </div>

        <div className="mx-auto w-50 mt-5 d-flex">
          <Container>
            <Row>
              <Col>
                <strong>
                  <h4>Project Abstract</h4>
                </strong>
              </Col>
            </Row>

            <hr className="mb-4" />

            <Row className="mb-5">
              <Col>{abstract}</Col>
            </Row>

            <Row>
              <Col>
                <Form>
                  <Form.Group>
                    <Form.Label>
                      <strong>
                        <h4>Comments</h4>
                      </strong>
                    </Form.Label>

                    <Form.Control
                      as="textarea"
                      id="comments"
                      rows={4}
                      cols={47}
                      placeholder="Leave a comment"
                    />
                    <Button variant="primary" type="submit" className="mt-3">
                      Submit
                    </Button>
                  </Form.Group>
                  <hr />
                  <div className="text-center">
                    <p>No comments added yet</p>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>

          <Container>
            <Row>
              <Col>
                <h4>Project Details</h4>
              </Col>
            </Row>

            <hr className="mb-4" />

            <Row className="mb-3">
              <Col>
                <Card>
                  <Card.Header>
                    <h6>Author(s)</h6>
                  </Card.Header>
                  <Card.Body className="pr-0 pl-0">
                    <Card.Text>
                      {authors.map((author, index) => {
                        return (
                          <div>
                            {index > 0 ? <hr /> : null}
                            <p className="pr-3 pl-3">{author}</p>
                          </div>
                        )
                      })}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer></Card.Footer>
                </Card>
              </Col>
            </Row>

            <Card>
              <Card.Header>
                <h6>Project files</h6>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <div className="text-center">
                    <p>No files uploaded yet</p>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </main>
    </Layout>
  )
}

export default Project
