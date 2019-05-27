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
	//lestr = fix_everything(lestr); -> is this what future sounds like?
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
	if(/.*[\?&]w=(.+)[&]*.*/.exec(window.location.href) === null){
		document.getElementById("lePost").innerHTML = "If you wouldn't mind providing a post for me to go and get?";
	}else{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = TheAjaxsStateChange;
		xhttp.open("GET", window.location.href.replace(/.*[\?&]w=(.+)[&]*.*/, "../Posts/$1/index.txt"), true);
		xhttp.send();
	}
})();


//RIGHT. 
// so the rules for the blog post format are:
// [  ══╗
//      v
// 		[NAME 							-> name of the tag
//		[NAME="PROPERTY"				-> property of the tag
//		[NAME="PROPERTY1""PROPERTY2"]	-> can have more than 1 property, separated by different sets of quotation marks
//		[NAME]content~>]				-> content must be terminated by "~>]"
//
//skipping:
//	skipping an opening of square brackets can be done by encasing it in an NOTAG
//	tag, it's usage is simple, ignored text will begin at the end of the tag, and
//	it has a single parameter that is the ending sequence for the tag (in case we 
//	want to write say "~>]" inside it) so for writing the post, I'll do: 
//"usage is [NOTAG="eñd"] [NOTAG="end_sequence"] text here end_sequence eñd"
//	and the webpage will display only: 
//"usage is [NOTAG="end_sequence"] text here end_sequence"
//	KEEP IN MIND, the code tag does not ignore, so place this inside of code


ELVAR = {
	"LINK": function(params, content) {
		return "<a href=\"" + params[0] + "\">" + content + "</a>";
	},
	"KODE": function(params, content){
		return 
			"<code class=\"smallcode\">" + content + "</code>";
	},
	"CODE": function(params, content) {
		return "<div class=\"codecontainer\"><pre class=\"code l_" + params[0] + "\"><code>" + content + "</code></pre></div>";
	},
	"NOTAG": function(params, content) {
		return content;
	},
	"LINK": function(params, content) {
		return 
		;
	},
	"LINK": function(params, content) {
		return 
		;
	},
	"LINK": function(params, content) {
		return 
		;
	},
	"LINK": function(params, content) {
		return 
		;
	},
	"LINK": function(params, content) {
		return 
		;
	},
	"LINK": function(params, content) {
		return 
		;
	},
	"LINK": function(params, content) {
		return 
		;
	},
};

FNCTION_STACK = [];

DEFAULT_TERMINATOR = "~>]";
CURRENT_TERMINATOR = DEFAULT_TERMINATOR;



//so I can find multiple things in the search state:
//	-An opening of a tag (which will not be that if what's between the closing square brackets isn't a tag,
//		or if there's no closing brackets at all)
//	-An end sequence

//tho if there is an end sequence and a left square bracket, should prolly check which is first

function nigga(text){
	current_index = 0;
	while(true){
		let found_osb = text.indexOf("[", current_index); 								//opening square bracket
		let found_ccs = text.indexOf(CURRENT_TERMINATOR, current_index);				//closing character sequence

		if(found_ccs == -1 && found_osb == -1){											//if we have neither
			return text.length;															//just return the end index, because we're at the end
		}else if((found_ccs != -1 && found_osb < found_ccs) || found_ccs == -1){		//if (assumed) tag is first
			let next_right_bracket = text.indexOf("]", found_osb+1);					//look for next closing bracket
			if(next_right_bracket == -1){												//if there's no bracket
				if(found_ccs == -1){return text;}										//and we have no closing sequence, then we are at the end of the road
				else return found_ccs + CURRENT_TERMINATOR.length;
			}
		}else if((found_osb != -1 && found_ccs < found_osb) || found_osb == -1){		//if terminator is closer
			return found_ccs + CURRENT_TERMINATOR.length;								//we found the end
		}
	}
}




