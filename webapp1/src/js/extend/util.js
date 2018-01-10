let _util={
	timeFormat:function(time,format){
		if(!time){
			return "";
		}
		if(typeof time=="string"){
			return time;
		}
		if(typeof time=="number"){
			time=new Date(time);
		}

		return time._toString(format);
	},
	xlsNumber2Date:function(num){
		num=+num;
		var date=new Date(1900,0,0);
		date=new Date(date.getTime()+num*24*60*60*1000);
		return date;
	},
	extend:function (o1, o2, override) {
		for (var i in o2)
				if (override || o1[i] === undefined || o1[i] === null)
						o1[i] = o2[i]
		return o1;
	},
	parseQueryString:function(str) {
			var reg = /(([^?&=]+)(?:=([^?&=]*))*)/g;
			var result = {};
			var match;
			var key;
			var value;
			while (match = reg.exec(str)) {
					key = match[2];
					value = match[3] || '';
					result[key] = decodeURIComponent(value);
			}
			return result;
	}

};
export default _util;