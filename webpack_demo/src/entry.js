// import css from "./css/index.css";
// import less from "./css/black.less";
// import sass from "./css/nav.scss";
import cssicon from "./css/cssicon.scss";
//import $ from "jquery";
{
  let test="wwwwwwwwwww";
  document.getElementById("title").innerHTML="hello webpack<span class='aaaaaa'>111111"+test+"1111111</span>";
  $("#title").html("ggggggggggggggggggggggg");
}

var json= require("../config.json");
$("#json").html(json.website);