const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
        this.id = id;
        this.firstname = firstname;
        this.lastname =  lastname;
        this.email = email;
        this.password = password;
        this.matricNumber = matricNumber;
        this.program = program;
        this.graduationYear = graduationYear;
    }

    getFullName() {
        return `${this.firstname} ${this.lastname}`
    }
}

class Users extends DataModel {
    authenticate(email, password) {
        let user = this.data.find(obj => obj.email === email && obj.password === password)
        if(user) {
            return true
        } else {
            return false
        }
        
    }

    getByEmail(email) {
        let user = this.data.find(obj => obj.email === email)
        if(!user) {
            return null
        }
        return user
    }

    getByMatricNumber(matricNumber) {
        let user = this.data.find(obj => obj.matricNumber === matricNumber)
        if(!user) {
            return null
        }
        return user
    }

    validate(obj) {
        let isEmpty = Object.values(obj).some(x => (x === null || x === ''));
        let userByEmail = this.data.some(myObj => myObj.email === obj.email)
        let userByMatric = this.data.some(myObj => myObj.matricNumber === obj.matricNumber)
        
        
        if(isEmpty || userByEmail || userByMatric || obj.password.length < 7) {
            return false
        } else {
            return true
        }
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};