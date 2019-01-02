

export const admin = (req, res) => {
    return res.json({message: req.session.user.username + ' is logged in'})
};