let _dailyEnums={
	exptypes:[{"text":"未知","value":0},{"text":"衣食","value":1},{"text":"住行","value":2},{"text":"教育","value":3},{"text":"玩乐","value":4},{"text":"医药","value":5},{"text":"养生","value":6},{"text":"社交","value":7},{"text":"其他","value":8}],
	getExpTypeName:function(value){
		for(var a=0;a<this.exptypes.length;a++){
			if(this.exptypes[a].value==value){
				return this.exptypes[a].text;
			}
		}
		return value;
	},
	importances:[{"text":"可避免","value":0},{"text":"一般","value":1},{"text":"重要","value":2},{"text":"必须","value":3},{"text":"非常重要","value":4}],
	getImportancesName:function(value){
		for(var a=0;a<this.importances.length;a++){
			if(this.importances[a].value==value){
				return this.importances[a].text;
			}
		}
		return value;
	}

};
export default _dailyEnums;