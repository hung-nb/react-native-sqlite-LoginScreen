const ValidationHelper = {

    validateEmail(email) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(email) === false)
        {
            return false;
        }

        return true;
    },

    validatePassword(password) {
        if (password.length < 6)
            return false;
        return true;
    }

}

export const utilities = {
    ValidationHelper,
};

export default utilities;