(function(){
	Date.prototype._toString=function(format){
		function fix(str) {
            str = '' + (String(str) || '');
            return str.length <= 1 ? '0' + str : str;
        }

        var maps = {
            'yyyy': function (date) {
                return date.getFullYear()
            },
            'MM': function (date) {
                return fix(date.getMonth() + 1);
            },
            'dd': function (date) {
                return fix(date.getDate())
            },
            'HH': function (date) {
                return fix(date.getHours())
            },
            'mm': function (date) {
                return fix(date.getMinutes())
            },
            'ss': function (date) {
                return fix(date.getSeconds())
            }
        }

        var trunk = new RegExp(Object.keys(maps).join('|'), 'g');


        format = format || 'yyyy-MM-dd HH:mm';
        value = this;

        return format.replace(trunk, function (capture) {
            return maps[capture] ? maps[capture](value) : '';
        });
	}
})();