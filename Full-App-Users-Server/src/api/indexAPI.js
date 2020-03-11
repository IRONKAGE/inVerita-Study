indexAPI = response.status(200).json({
    message: 'Головна сторінка сайту'
});
next();

module.exports = indexAPI;