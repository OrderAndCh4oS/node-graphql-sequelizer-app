const bcrypt = require('bcrypt');

export function passwordHash(user) {
    if (user === null) {
        throw new Error('UserModel not found');
    }
    if (!user.changed(user.password)) {
        return user.password;
    }
    let salt = bcrypt.genSaltSync();
    return user.password = bcrypt.hashSync(user.password, salt);
}

export function verifyPassword(password, passwordHash) {
    return bcrypt.compareSync(password, passwordHash);
}