export const usernameValidation = {
    notEmpty: {
        msg: "Please provide a username"
    },
    isLongEnough: (val) => {
        if (val.length < 3) {
            throw new Error("Please choose a longer password")
        }
    },
    isShortEnough: (val) => {
        if (val.length > 44) {
            throw new Error("Please choose a longer password")
        }
    },
};

export const passwordValidation = {
    notEmpty: {
        msg: "Please provide a password"
    },
    isLongEnough: (val) => {
        if (val.length < 8) {
            throw new Error("Please choose a longer password")
        }
    }
};
