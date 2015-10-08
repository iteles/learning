exports.favicon = {
  //file handler from inert plugin
    file: __dirname + '/../../public/favicon.ico'
};

exports.css = {
  //directory handler from inert plugin
    directory: {
        path: __dirname + '/../../public/css',
        index: false
    }
};


exports.img = {
    directory: {
        path: __dirname + '/../../public/img',
        index: false
    }
};


exports.js = {
    directory: {
        path: __dirname + '/../../public/js',
        index: false
    }
};