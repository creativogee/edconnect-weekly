import React, { useState } from "react"
import { Button, Card, Col, Container, Form, Row, Image } from "react-bootstrap"
import Layout from "./shared/Layout"

const Project = ({ project, user, creator, authorImage }) => {
  return (
    <Layout user={user}>
      <div className="mx-auto mt-5">
        <Container>
          <Row>
            <strong>
              <h2 id="project_name">{project?.name}</h2>
            </strong>
          </Row>

          <Row className="bg-light p-3">
            <Col id="project_author" className="d-flex">
              <Image
                src={`${authorImage}`}
                roundedCircle
                style={{ height: 3 + "rem", width: 3 + "rem", marginRight: 10 + "px" }}
              ></Image>
              <div className="d-flex flex-column">
                <span>Created by: </span>
                <span>{creator?.firstname + " " + creator?.lastname} </span>
              </div>
            </Col>
            <Col className="d-flex flex-column">
              <span>Date Created</span>
              <span>{new Date(project.createdAt).toLocaleDateString()}</span>
            </Col>
            <Col className="d-flex flex-column">
              <span>Last Updated</span>
              <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
            </Col>
            <Button href="/projects/submit" className="align-middle pt-2">
              Edit Project
            </Button>
          </Row>
        </Container>
      </div>

      <div className="mx-auto w-75 mt-5 d-flex">
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
            <Col id="project_abstract">{project?.abstract}</Col>
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
                  <Card.Text id="project_authors">
                    {project?.authors.map((author, index) => {
                      return (
                        <div key={index}>
                          {index > 0 ? <hr /> : null}
                          <p className="pr-3 pl-3">{author}</p>
                        </div>
                      )
                    })}
                  </Card.Text>
                </Card.Body>

                <Card.Footer id="project_tags">
                  {project?.tags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                  ))}
                </Card.Footer>
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
    </Layout>
  )
}

export default Project
