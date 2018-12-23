const bcrypt = require('bcrypt');

export default function generateHash(user) {
    if (user === null) {
        throw new Error('UserModel not found');
    }
    if (!user.changed(user.password)) {
        return user.password;
    }
    let salt = bcrypt.genSaltSync();
    return user.password = bcrypt.hashSync(user.password, salt);
}