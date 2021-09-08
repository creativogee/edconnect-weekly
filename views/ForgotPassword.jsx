import React, { useState, useEffect } from "react"
import { Alert, Button, Form, Row, Col, Nav, Modal } from "react-bootstrap"
import Layout from "./shared/Layout"

const ForgotPassword = ({ userEmail, error }) => {
  const [email, setEmail] = useState("")
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleInput = e => {
    const { name, value } = e.target
    switch (name) {
      case "email":
        setEmail(value)
        break
      default:
    }
  }

  useEffect(() => {
    if (userEmail && !error) {
      handleShow()
    }
  }, [])

  return (
    <Layout>
      <main>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Email Sent</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Please check your email, {userEmail}, for a link to complete your password reset
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="mx-auto w-50 p-2 mt-5">
          <h1>Forgot Password?</h1>
          {userEmail && error ? (
            <Alert variant="danger">User with the email "{userEmail}" does not exist</Alert>
          ) : !userEmail ? (
            <Alert variant="info">Enter your correct email to receive a password reset link</Alert>
          ) : null}

          {!userEmail ? (
            <Form id="ForgotPasswordForm" method="post" action="forgot-password">
              <Form.Group as={Row}>
                <Col>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={handleInput}
                  />
                </Col>
              </Form.Group>
              <Button className="pl-4 pr-4" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          ) : (
            <Nav.Link className="d-inline" href="/forgot-password">
              Resend Link
            </Nav.Link>
          )}
        </div>
      </main>
    </Layout>
  )
}

export default ForgotPassword
