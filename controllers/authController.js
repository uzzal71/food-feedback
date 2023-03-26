export const login = (req, res) => {
    res.status(200).json({message: 'login'});
}

export const registration = (req, res) => {
    res.status(200).json({message: 'registration'});
}

export const logout = (req, res) => {
    res.status(200).json({message: 'logout'});
}