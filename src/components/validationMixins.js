export default {
    
    data() {
        return {
            reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
            inputRule: [v => v.length >=6 || "Length must be at least 6"],
            emailRule: [v => v.length > 0 && this.reg.test(v) || "Invalid Email"]
        }
    },
    methods:{
        comparePasswords(password, confirmPassword) {
            return password !== confirmPassword
                ? "Password do not match"
                : false;
        }
    }
}