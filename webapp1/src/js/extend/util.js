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
	}

};
export default _util;