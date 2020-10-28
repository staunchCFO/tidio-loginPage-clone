import {sendData, selector, createElement, selectAll} from './api.js'
import {validateEmail , validatePassword , validateUsername } from './validate.js'

const AccountModel = {
    validFormValue : {}
}

class AccountView  { 
    constructor() {
        this.inputs = Array.from(document.querySelectorAll(".validate"))
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
            if (event.target.value !== "" && event.target.value.trim().length > 0) {
                AccountModel.validFormValue[`${event.target.id}`] = event.target.value 
            }else{
                AccountModel.validFormValue[`${event.target.id}`] = ""
            }
            // console.log(event.target.value)
            // event.target.value = event.target.value 
			// event.target.removeEventListener("focus" , this.handleBlur)
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
               
            console.log(AccountModel.validFormValue) 
            if(selector("#username").value == "" && selector("#email").value == "" && selector("#password").value == ""){
                event.preventDefault()
                selector('#response-register').classList.remove('err-msg', 'success-msg')
                selector('#response-register').classList.add('err-msg')
                selector('#response-register').textContent = "Please fill neccessary fields."
            }else if(!( AccountModel.validFormValue.email)){
                event.preventDefault()
                selector('#response-register').classList.remove('err-msg', 'success-msg')
                selector('#response-register').classList.add('err-msg')
                selector('#response-register').textContent = "Please provide a valid mail."
            }else if(!(AccountModel.validFormValue.password)){
                event.preventDefault()
                selector('#response-register').classList.remove('err-msg', 'success-msg')
                selector('#response-register').classList.add('err-msg')
                selector('#response-register').textContent = "Password too weak, enter a minimun of 6 characters"
            }else if(!(AccountModel.validFormValue.username)){
                event.preventDefault()
                selector('#response-register').classList.remove('err-msg', 'success-msg')
                selector('#response-register').classList.add('err-msg')
                selector('#response-register').textContent = "Please enter a Username"
            }


            // if(!(AccountModel.validFormValue.username && AccountModel.validFormValue.email &&
            //     AccountModel.validFormValue.password)){
            //     event.preventDefault()
            //         selector('#response-register').classList.remove('err-msg', 'success-msg')
            //         selector('#response-register').classList.add('err-msg')
            //         selector('#response-register').textContent = "Kindly fill all neccesary fields."
                    
            //         console.log(AccountModel.validFormValue.username)
            //         console.log(AccountModel.validFormValue.email)
            //         console.log(AccountModel.validFormValue.password)
                    
            // }else if(AccountModel.validFormValue.username && AccountModel.validFormValue.email){
            //     selector('#response-register').classList.remove('err-msg', 'success-msg')
            //     selector('#response-register').classList.add('err-msg')
            //     selector('#response-register').textContent = "Password too weak, enter a minimun of 6 characters."    
            // }else{
            //     selector('#response-register').classList.remove('err-msg', 'success-msg')
            //     selector('#response-register').classList.add('success-msg')
            //     selector('#response-register').textContent = "Your account had been created successfully."
            // }
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