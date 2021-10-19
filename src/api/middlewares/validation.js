const validator = require('../../helpers/validate');

const register = (req, res, next) => {
    const validationRule = {
        "firstName": "required|string|min:3|max:20",
        "lastName": "required|string|min:3|max:20",
        "userName": "required|string|min:3|max:20",
        "email": "required|email",
        "password": "required|string|min:6",
    }

    const bodyObj = JSON.parse(JSON.stringify(req.body));

    validator(bodyObj, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({ success: false, message: 'Validation failed', data: err });
        } else {
            next();
        }
    });
}

const signin = (req, res, next) => {
    const validationRule = {
        "userName": "required_without:email|string",
        "email": "required_without:userName|email",
        "password": "required|string|min:6",
    }

    const bodyObj = JSON.parse(JSON.stringify(req.body));

    validator(bodyObj, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({ success: false, message: 'Validation failed', data: err });
        } else {
            next();
        }
    });
}

const project = (req, res, next) => {
    const validationRule = {
        "name": "required|string|min:3|max:30",
        "description": "required|string|min:3|max:512"
    }

    const bodyObj = JSON.parse(JSON.stringify(req.body));

    validator(bodyObj, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({ success: false, message: 'Validation failed', data: err });
        } else {
            next();
        }
    });
}

const editProject = (req, res, next) => {
    const validationRule = {
        "name": "sometimes|string|min:3|max:30",
        "description": "sometimes|string|min:3|max:512"
    }

    const bodyObj = JSON.parse(JSON.stringify(req.body));

    validator(bodyObj, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({ success: false, message: 'Validation failed', data: err });
        } else {
            next();
        }
    });
}

const issue = (req, res, next) => {
    const validationRule = {            
        "title": "required|string|min:3|max:30",
        "description": "required|string|min:3|max:512",
        "category": "sometimes|in:bug,feature,task,other",
        "priority": "sometimes|in:trivial,low,regular,high,critical"
    }

    const bodyObj = JSON.parse(JSON.stringify(req.body));

    validator(bodyObj, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({ success: false, message: 'Validation failed', data: err });
        } else {
            next();
        }
    });
}

const editIssue = (req, res, next) => {
    const validationRule = {
        "title": "sometimes|string|min:3|max:30",
        "description": "sometimes|string|min:3|max:512",
        "category": "sometimes|in:bug,feature,task,other",
        "priority": "sometimes|in:trivial,low,regular,high,critical"
    }

    const bodyObj = JSON.parse(JSON.stringify(req.body));

    validator(bodyObj, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({ success: false, message: 'Validation failed', data: err });
        } else {
            next();
        }
    });
}

module.exports = { 
  register, signin, project, editProject, issue, editIssue
}