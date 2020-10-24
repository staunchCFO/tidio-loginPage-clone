import {sendData, selector, createElement, selectAll} from './api.js'
import {validateEmail , validatePassword , validateUsername } from './validate.js'

const AccountModel = {
    validFormValue : {}
}

class AccountView  { 
    constructor() {
        this.inputs = Array.from(selectAll(".validate"))
    } 
} 

class AccountController {
    constructor(view , model) {
        this.view = new view()
        this.model = model
        this.addEvent() 
    }

    handleBlur(event) {
        if ( event.target.id === "username" ) { 
            if (event.target.value !== " " && event.target.value.trim().length > 0) {
                AccountModel.validFormValue[`${event.target.id}`] = event.target.value 
            }
            event.target.value = event.target.value 
			event.target.removeEventListener("focus" , this.handleBlur)
        } 

        if (event.target.id === "email") {  
            if (validateEmail(event.target.value).value) {
                AccountModel.validFormValue[`${event.target.id}`] = event.target.value 
            }
            event.target.value = event.target.value 
			event.target.removeEventListener("focus" , this.handleBlur)
        }

        if (event.target.id === "password") {  
            if (validatePassword(event.target.value).value) {
                AccountModel.validFormValue[`${event.target.id}`] = event.target.value 
            }
            event.target.value = event.target.value 
			event.target.removeEventListener("focus" , this.handleBlur)
        }
    }

    handleSubmit(event) { 
		if (event.target.id === "register-submit") {     
            event.preventDefault()
            if(AccountModel.validFormValue.username && AccountModel.validFormValue.email &&
                AccountModel.validFormValue.password){
                    const dataToSend = {
                        username : AccountModel.validFormValue.username,
                        email : AccountModel.validFormValue.email,
                        password : AccountModel.validFormValue.password
                    }
                    sendData("/register-api" , dataToSend)
                    .then(res => {
                        console.log(res)
                        if(res.status > 200){
                            selector('#response-register').classList.remove('err-msg', 'success-msg')
                            selector('#response-register').classList.add('err-msg')
                            selector('#response-register').textContent = res.message
                        }else{
                            selector('#response-register').classList.remove('err-msg', 'success-msg')
                            selector('#response-register').classList.add('success-msg')
                            selector('#response-register').textContent = res.message
                            setTimeout(() => {
                                window.location.reload(false)
                            } , 2000)
                        }
                    })
                    .catch(error => console.log(error))
            }else if(AccountModel.validFormValue.username && AccountModel.validFormValue.email){
                selector('#response-register').classList.remove('err-msg', 'success-msg')
                selector('#response-register').classList.add('err-msg')
                selector('#response-register').textContent = "Password too weak or doesn't match."    
            }else{
                selector('#response-register').classList.remove('err-msg', 'success-msg')
                selector('#response-register').classList.add('err-msg')
                selector('#response-register').textContent = "Please fill in valid details."
            }
        }

    }

    addEvent() {
        this.view.inputs.map(field => {
            field.addEventListener("blur" , this.handleBlur) 
            field.addEventListener("click" , this.handleSubmit) 
        })
    }
}

const app = new AccountController(AccountView , AccountModel)