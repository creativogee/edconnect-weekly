class DataModel {
    constructor() {
        this.data = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        let user = this.data.find(obj => {
            return obj.id == id
        })

        if(!user) {
            return null
        }

        return user

        
    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
        let user = this.data.find(item => item.id == id)
        if(!user) {
            return false
        }
        for(let prop in obj) {
            user[prop] = obj[prop]
        }
        return true
    }

    delete(id) {
        let user = this.data.find(item => item.id == id)
        let index = this.data.indexOf(user)
        if(user) {
            this.data.splice(index, 1)
            return true
        }
    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;