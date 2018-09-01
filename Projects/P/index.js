var linkregex = /\[__LINK=(?:\"|&quot;)(.+?)(?:\"|&quot;)\]\[(?:&lt;|<)~(.+?)~(?:&gt;|>)\]/g;
var coderegex = /```([A-Za-z]*)(?:<\/br>|<br \/>|<br>|\n|\r\n|\r)(.+?)```/g;
var codsregex = /``(.+?)``/g;
var imagregex = /\[img src=(?:\"|&quot;)(.+?)(?:\"|&quot;)\]/g;
var textregex = /\[h(\d+)\]\[(?:&lt;|<)~(.+?)~(?:&gt;|>)\]/g;
var colrregex = /\[__COLOR=(?:\"|&quot;)(.+?)(?:\"|&quot;)\]\[(?:&lt;|<)~(.+?)~(?:&gt;|>)\]/g;
var boldregex = /\[__BOLD\]\[(?:&lt;|<)~(.+?)~(?:&gt;|>)\]/g;
var italregex = /\[__ITALIAN\]\[(?:&lt;|<)~(.+?)~(?:&gt;|>)\]/g;
var centregex = /\[__CENTER\]\[(?:&lt;|<)~(.+?)~(?:&gt;|>)\]/g;
var titlregex = /\[__TITLE__\]\[(?:&lt;|<)~(.+?): (.+?)~(?:&gt;|>)\]/g;
var youtregex = /\[__YOUTUBE src=(?:\"|&quot;)(.+?)(?:\"|&quot;)\]/g;

function escapeHtml(text) {return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");}

function doit(lestr){
	//-------------------------------------------ajax request
	lestr = escapeHtml(lestr);
	lestr = lestr.replace(/(?:\r\n|\n)/g, '<br />');
	lestr = lestr.replace(linkregex, "<a href=\"$1\">$2</a>");
	lestr = lestr.replace(coderegex, "<div class=\"codecontainer\"><pre class=\"code _$1\"><code>$2</code></pre></div>");
	lestr = lestr.replace(codsregex, "<code class=\"smallcode\">$1</code>");
	lestr = lestr.replace(imagregex, "<img src=\"$1\">");
	lestr = lestr.replace(centregex, "<center>$1</center>");	
	lestr = lestr.replace(textregex, "<font size=\"$1\">$2</font>");
	lestr = lestr.replace(colrregex, "<font color=\"$1\">$2</font>");
	lestr = lestr.replace(boldregex, "<b>$1</b>");
	lestr = lestr.replace(italregex, "<i>$1</i>");
	lestr = lestr.replace(titlregex, "<center><h1><span style='font-family: \"Courier New\", Courier, monospace; color: #e0e0e0;'>Aight</span></h1><h3><i style='font-family: \"Lucida Console\", Monaco, monospace;'><font color=\"#ffaa00\">$1</font>: <font color=\"#e0e0e0\"><div style='display: inline-block;' id='blogposttitle'>$2</div></font></i></h3></center><hr><br>");
	lestr = lestr.replace(youtregex, "<iframe width='560' height='315' src='https://www.youtube.com/embed/$1' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>");
	document.getElementById("lePost").innerHTML = lestr;
}

function TheAjaxsStateChange(){
	if (this.readyState == 4 && this.status == 200) {
		doit(this.responseText);
		document.title = document.getElementById("blogposttitle").innerHTML + " - TrisT's blog";
	}else{
		document.getElementById("lePost").innerHTML = "Post Not Found: " + this.status;
	}
}


(function() {
	if(/.*[\?&]w=(.+)[&]p=(.+)[&]*.*/.exec(window.location.href) === null){
		document.getElementById("lePost").innerHTML = "If you wouldn't mind providing a prject and paper for me to go and get?";
	}else{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = TheAjaxsStateChange;
		xhttp.open("GET", window.location.href.replace(/.*[\?&]w=(.+)[&]p=(.+)[&]*.*/, "../../Project/$1/$2/index.txt"), true);
		xhttp.send();
	}
})();