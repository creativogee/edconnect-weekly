import React, { useState } from "react"
import { Button, Form, Row, Col, Alert } from "react-bootstrap"
import Layout from "./shared/Layout"

const ResetPassword = ({ error, baseUrl }) => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleInput = e => {
    const { name, value } = e.target
    switch (name) {
      case "password":
        setPassword(value)
        break
      case "confirmPassword":
        setConfirmPassword(value)
        break
      default:
    }
  }
  return (
    <Layout>
      <main>
        <div className="mx-auto w-50 p-2 mt-5">
          <h1>Reset Password</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form id="resetPasswordForm" method="post" action={`${baseUrl}/reset-password`}>
            <Form.Group as={Row}>
              <Col>
                <Form.Label htmlFor="email">Password: </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={handleInput}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col>
                <Form.Label htmlFor="password">Confirm Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleInput}
                />
              </Col>
            </Form.Group>
            <Button className="pl-4 pr-4" variant="primary" type="submit">
              Reset Password
            </Button>
          </Form>
        </div>
      </main>
    </Layout>
  )
}

export default ResetPassword
