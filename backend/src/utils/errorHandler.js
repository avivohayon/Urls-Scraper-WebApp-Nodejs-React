module.exports = (res, error) => {
    console.error('Error:', error.message);
    res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        error: error.message
    });
};
