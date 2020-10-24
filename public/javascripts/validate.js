/**
 * Username validation pattern for a user input
 * @param {Username} val 
 */
export const validateUsername = (val) => {
    const namePattern = /^[a-zA-Z]+([0-9]?)/
    try {
        if (String(val).match(namePattern)){
            return {
                name : "Matched", 
                value : val.trim()
            }
        }else {
            throw {
                name : "Please provide a valid Username",
                value : null
            }
        }
    } catch (err) {
        return {
            name : err.name,
            value : err.value
        }
    }
}

/**
 * Email validation pattern for a user input
 * @param {Email} val 
 */

export const validateEmail = (val) => {
	const emailPattern = /^[a-zA-Z]+((\d+|_+|\.)?([a-zA-Z]+|\d+)*)+@[a-zA-Z]{3,}\.[a-zA-Z]{2,6}$/
	try { 
		if ( String(val).match(emailPattern)) {
	        return { 
		        name : "Matched" , 
		        value : val.trim() 
	        } 
		}else {
			throw {
				name : "Please provide a valid email" , 
				value : null 
			}
		}
	}catch(err) {
		return {
			name : err.name , 
			value : err.value 
		}
	}
} 

/**
 * Password validation pattern for a user input
 * @param {Password} val 
 */

export const validatePassword = (val) => {
	let passPattern = /[a-zA-Z0-9]{4}/
	try { 
		if ( String(val).match(passPattern)) {
	        return { 
		        name : "Matched" , 
		        value : val.trim() 
	        } 
		}else {
			throw {
				name : "Please provide a valid password" , 
				value : null 
			}
		}
	}catch(err) {
		return {
			name : err.name , 
			value : err.value 
		}
	}
} 