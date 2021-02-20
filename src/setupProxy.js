const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        '/api',
        proxy({
            target: 'https://news.sina.com.cn/',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            }
        })
    );
    app.use(
        '/time',
        proxy({
            target: 'https://m.mp.oeeee.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/time': '',
            }
        })
    );
    app.use(
        '/users',
        proxy({
            target: 'http://localhost:1730',
            changeOrigin: true,
            pathRewrite: {
                '^/users': '',
            }
        })
    );
    app.use(
        '/socket',
        proxy({
            target: 'http://localhost:1704',
            changeOrigin: true,
            pathRewrite: {
                '^/socket': '',
            }
        })
    );
};
