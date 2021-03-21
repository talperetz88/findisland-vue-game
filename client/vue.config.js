const path = require('path')

module.exports = {
    outputDir:path.resolve(__dirname,'../server/public'),
    devServer:{
        proxy:{
            '/vue-game':{
                target:'http://localhost:5000'
            }
        }
    }
}