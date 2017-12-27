var xlsx = require('node-xlsx');  
var fs = require('fs'); 
var filename='./test.xlsx';  
 console.error(filename);  
 // read from a file  
var sheets = xlsx.parse(filename);  
var sheet=null,a,b,data=[],thead=[],tbody=[],row=[];

var xlsNumber2Date=function(num){
	num=+num;
	var date=new Date(1900,0,0);
	date=new Date(date.getTime()+num*24*60*60*1000);
	return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()-1);
};

let splitRowByRN=function(row,cont){
    var arr=[];newrow=[];
    var rows=cont.split("\r\n");
    for(var c=0;c<rows.length;c++){
        var exec=/\d+/.exec(rows[c]);
        newrow=JSON.parse(JSON.stringify(row));
        if(exec){
            newrow[4]=exec[0];
            newrow[3]=exec.input.replace(newrow[4],"");
            arr.push(newrow);
        }
    }
    return arr;
};

for(a=0;a<sheets.length;a++){
	sheet=sheets[a];
	console.log("sheet.name:"+sheet.name+"\r\n");  

	data= sheet.data;
	for(b=0;b<data.length;b++){
		if(b==0){
			thead=data[b];
			console.log("thead:"+JSON.stringify(thead)+"\r\n");  
		}else{
			row=data[b];
			if(row.length){
				row[0]=xlsNumber2Date(row[0]);
			}
			if(row.length>3&&row[3]){
				var cont=""+row[3];
				var rows=splitRowByRN(row,cont);
				for(var c=0;c<rows.length;c++){
					   console.log(JSON.stringify(rows[c])+"\r\n");  

					
				}
				
			}
			
		}
	}
	
	//console.log("tbody:"+JSON.stringify(tbody)+"\r\n");  
}
//console.log(JSON.stringify(sheets));  