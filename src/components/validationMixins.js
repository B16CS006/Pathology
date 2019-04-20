export default {
    
    data() {
        return {
            reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
            required: [v => v.length > 0 || "Required"],
            emailRule: [v => v.length > 0 && this.reg.test(v) || "Invalid Email"]
        }
    },
    methods:{
        comparePasswords(password, confirmPassword) {
            return password !== confirmPassword
                ? "Password do not match"
                : false;
        },
        lengthRule(input, length = 1){
            return input.length >= length ? false : "Input Length should be >= " + length
        }
    }
}