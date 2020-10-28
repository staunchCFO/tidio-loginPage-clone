const User = require("../model/user")
const bcrypt = require('bcryptjs')
const crypto = require("crypto");

class App {

    getLandingPage = (req, res, next) => {
        try{
            res.render('index' , {title : "Welcome to Tidio.com"})
        }catch(error){
            res.render('error-page' , {error : error})
            console.log(error)
        }
    }
    getLoginPage = (req , res , next) => {
        try {
            res.render(
                'login' ,
                {title : "Log into your account"})
        } catch (error) {
            res.render('error-page' , {error : error})
            console.log(error)
        }
    }
    postLogin = async (req, res, next) => {
        try{
            const {email, password } = req.body
            const findUser = await User.findOne({email : email})
            if(findUser){
                let validUser = await bcrypt.compare(password , findUser.password)
                if (validUser) {
                    req.session.email = findUser.email
                    res.redirect(303, '/dashboard')
                    return
                }else {
                    res.render('login', {error: 'Invalid Login Credentials'})
                }
            }else {
                res.render('login', {error: 'Invalid Login Credentials'})
            }  
        }catch(error){
            res.json({error : error})
            console.log(error)
        }
    }

    getCreateAccountPage = (req , res , next) => {
        try {
            res.render(
                'register' ,
                {title : "Create a free account with Google or Email"})
        } catch (error) {
            res.render('error-page' , {error : error})
            console.log(error)
        }
    }
    getRegisterEmailPage = (req , res , next) => {
        try {
            res.render(
                'register-email' ,
                {title : "Tidio - Create a free account"})
        } catch (error) {
            res.render('error-page' , {error : error})
            console.log(error)
        }
    }

    postRegistration = async ( req, res, next ) => {
        try{
            const { username, email, password } = req.body
            const checkUser = await User.find({ $or : [{email : email}, {username : username}]})
            console.log(checkUser)
            if(checkUser.length == 0){
                const hashedPassword = await bcrypt.hash(password , 10)
                const newUser = await new User({
                    email : email,
                    username : username,
                    password : hashedPassword,
                    verificationToken : crypto.randomBytes(40).toString('hex')
                })
                const saveUser = await newUser.save()
                if(saveUser){
                    
                    res.redirect(303, '/login')
                    console.log(saveUser)
                }else{
                    throw "Error saving this user."
                }
            }else{
                res.render('register-email', {message: "A User already has an account with this details..."})
            }
        }catch(error){
            res.status(400)
            res.json({message: error, status: 400})
            console.log(error)
        }
    }

    
    getDashboard = async (req , res , next) => {
        try {
            if(req.session.email){
                const findUser = await User.findOne({email : req.session.email})
                if(findUser){
                    res.render('dashboard')
                }else {
                    throw{
                    message : 'Something is wrong with your session'
                }
            }
            }else {
                res.redirect(304 , '/login' )
            }
        } catch (error) {
            console.log(error)
        }
    }

    getLogout = (req , res , next ) => {
        try {
            if (req.session.email) {
                delete req.session.email
                res.redirect(303 , '/login')
            }else {
                throw new Error("Problem signing out. We will handle this shortly")
            }
        }catch(error){
            res.render('error-page' , {error : error})
            console.log(error)
        }
    }
    
}

const returnApp = new App()

module.exports = returnApp 