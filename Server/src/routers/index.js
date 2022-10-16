const siteRouter = require('./site');
            const newsRouter = require('./news')
            function route(app){

                app.use('/news', newsRouter);
                app.use('/home', siteRouter);
            }

            module.exports = route;