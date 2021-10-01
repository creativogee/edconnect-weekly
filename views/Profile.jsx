import React, { useState, useEffect } from 'react';
import Layout from './shared/Layout';
import { Alert, Button, Col, Form, Row, Nav } from 'react-bootstrap';

const Profile = ({ user, programs, graduationYears, succ, oldUser, changePass }) => {
  const [firstName, setFirstName] = useState(user?.firstname);
  const [lastName, setLastName] = useState(user?.lastname);
  const [email, setEmail] = useState(user?.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [matricNumber, setMatricNmber] = useState(user?.matricNumber);
  const [program, setProgram] = useState(user?.program);
  const [graduationYear, setGraduationYear] = useState(user?.graduationYear);
  const [displayInfo, setDisplayInfo] = useState({});
  const [profileImage, setProfileImage] = useState('');
  const [imageFormatError, setImageFormatError] = useState(false);

  useEffect(() => {
    setDisplayInfo({
      firstName,
      lastName,
      email,
      program,
      matricNumber,
      graduationYear,
    });
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'currentPassword':
        setCurrentPassword(value);
        break;
      case 'newPassword':
        setNewPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      case 'program':
        setProgram(value);
        break;
      case 'matricNumber':
        setMatricNmber(value);
        break;
      case 'graduationYear':
        setGraduationYear(value);
        break;
      default:
    }
  };

  const handleFileInput = (e) => {
    const { name, value } = e.target;
    var ext = value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
      case 'jpg':
      case 'png':
        setImageFormatError(false);
        setProfileImage(value);
        break;
      default:
        setImageFormatError(true);
    }
  };

  return (
    <Layout user={user ? user : null}>
      <main>
        {!oldUser && !(matricNumber && graduationYear && program) && (
          <Alert variant="warning" className="text-center">
            Please complete your registration!
          </Alert>
        )}
        <div className="mx-auto w-50 p-2 mt-5">
          <div className="d-flex align-items-end mb-2">
            <h4 className="mr-2">{displayInfo.firstName + ' ' + displayInfo.lastName}</h4>
            <h6 className="text-secondary ">{displayInfo.email}</h6>
          </div>
          <Form
            id="userProfile"
            method="post"
            action="profile"
            className="mb-5"
            encType="multipart/form-data"
          >
            <Row className="bg-light d-flex justify-space-between mb-5 p-2">
              <Col className="d-flex flex-column">
                <span>Program</span>
                <span>{displayInfo.program || '-'}</span>
              </Col>
              <Col className="d-flex flex-column">
                <span>Matriculation</span>
                <span>{displayInfo.matricNumber || '-'}</span>
              </Col>
              <Col className="d-flex flex-column">
                <span>Graduation year</span>
                <span>{displayInfo.graduationYear || '-'}</span>
              </Col>
            </Row>
            {succ && <Alert variant="info">{succ}</Alert>}
            <Form.Group as={Row}>
              <Col>
                <Form.Label htmlFor="firstname">First Name: </Form.Label>
                <Form.Control
                  id="firstname"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={handleInput}
                />
              </Col>

              <Col>
                <Form.Label htmlFor="lastname">Last Name: </Form.Label>
                <Form.Control
                  id="lastname"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={handleInput}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col>
                <Form.Label htmlFor="email">Email Address: </Form.Label>
                <Form.Control
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={handleInput}
                />
              </Col>

              <Col>
                <Form.Label htmlFor="program">Program:</Form.Label>
                <Form.Control
                  id="program"
                  as="select"
                  name="program"
                  value={program}
                  onChange={handleInput}
                >
                  <option>Select Program</option>
                  {programs.map((program) => (
                    <option key={program}>{program}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col>
                <Form.Label htmlFor="matricNumber">Matric Number:</Form.Label>
                <Form.Control
                  type="text"
                  id="matricNumber"
                  name="matricNumber"
                  placeholder="Matric Number"
                  value={matricNumber}
                  onChange={handleInput}
                />
              </Col>

              <Col>
                <Form.Label htmlFor="graduationYear">Graduation Year:</Form.Label>
                <Form.Control
                  as="select"
                  name="graduationYear"
                  id="graduationYear"
                  value={graduationYear}
                  onChange={handleInput}
                >
                  <option>Select Graduation Year</option>
                  {graduationYears.map((graduationYear, index) => (
                    <option key={index}>{graduationYear}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="profileImage">Profile picture:</Form.Label>
              <Form.Control
                type="file"
                name="profileImage"
                value={profileImage}
                onChange={handleFileInput}
                className=" border p-1"
              />
              {imageFormatError ? 'File format is not allowed, must be jpg/png' : null}
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Profile
            </Button>
          </Form>

          <Form id="changePassword" method="post" action="change-password">
            {changePass && (
              <Alert
                variant={changePass?.success ? 'info' : 'danger'}
                className="d-flex justify-content-between"
              >
                {changePass?.message}
              </Alert>
            )}
            <Form.Group as={Row}>
              <Col>
                <Form.Label htmlFor="currentPassword">Current Password:</Form.Label>
                <Form.Control
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={handleInput}
                />
              </Col>

              <Col>
                <Form.Label htmlFor="newPassword">New Password:</Form.Label>
                <Form.Control
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={handleInput}
                />
              </Col>

              <Col>
                <Form.Label htmlFor="confirmPassword">Confirm Password:</Form.Label>
                <Form.Control
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="New Password"
                  value={confirmPassword}
                  onChange={handleInput}
                />
              </Col>
            </Form.Group>
            <Button variant="primary" type="submit">
              Change Password
            </Button>
            {changePass && !changePass?.success && (
              <Nav.Link className="d-inline" href="/forgot-password">
                Forgot Password?
              </Nav.Link>
            )}
          </Form>
        </div>
      </main>
    </Layout>
  );
};

export default Profile;
