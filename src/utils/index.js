
const utils = {};

utils.title = (title) => {
    title = title || '海壳网-小程序后台';
    window.document.title = title;
};

export default {
    utils
};
