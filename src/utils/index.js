
export const utils = {};

utils.title = (title) => {
    title = title || '海壳直邮一代神器';
    window.document.title = title;
};

var byTime = [365 * 24 * 60 * 60 * 1000, 24 * 60 * 60 * 1000, 60 * 60 * 1000, 60 * 1000, 1000];
var unit = ['年', '天', '小时', '分钟', '秒'];

utils.dateTranslate = (atime) => {
    var ct = (new Date()).getTime() - atime.getTime();
    if (ct < 0) {
        return '未来';
    }

    var sb = [];
    for (var i = 0; i < byTime.length; i++) {
        if (ct < byTime[i]) {
            continue;
        }
        var temp = Math.floor(ct / byTime[i]);
        ct = ct % byTime[i];
        if (temp > 0) {
            sb.push(temp + unit[i]);
        }
        if (sb.length >= 1) {
            break;
        }
    }
    return sb.join('') + '前';
};

utils.strtotime = (datetime) => {
    datetime = datetime.replace(/:/g, '-').replace(/ /g, '-');
    var arr = datetime.split('-');
    var now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
    return now;
};
