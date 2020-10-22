const User = require("../model/user")

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