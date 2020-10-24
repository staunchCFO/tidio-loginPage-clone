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
            if(checkUser){
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
                }else{
                    throw "Error saving this user."
                }
            }else{
                throw "User has been created already."
            }
        }catch(error){
            res.status(400)
            res.json({message: error, status: 400})
            console.log(error)
        }
    }

    postLogin = async (req, res, next) => {
        try{
            const {email, password , username , phone} = req.body
            const findUser = await User.findOne({email : email})  
            if(findUser){
                let validUser = await bcrypt.compare(password , findUser.password)
                if (validUser) {   
                    req.session.email = findUser.email
                    res.redirect(303, '/dashboard')
                    return
                }else {
                    res.render('login', {error: 'Invalid Credentials'})
                }
            }else {
                res.render('login', {error: 'Invalid Credentials'})
            }  
        }catch(error){
            res.render('error-page' , {error : error})
            console.log(error)
        }
    }
    
}

const returnApp = new App()

module.exports = returnApp 