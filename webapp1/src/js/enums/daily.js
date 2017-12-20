let _dailyEnums={
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
	}

};
export default _dailyEnums;