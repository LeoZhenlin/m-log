/*
 * 前台页面通用JavaScript文件
 * @author GaoYoubo
 * @since 2012-07-28
 * 
 */

/**
 * 获取Cookie值
 */
var getCookie = function(sName) {
	var arr = document.cookie.match(new RegExp("(^| )" + sName
			+ "=([^;]*)(;|$)"));
	if (arr != null) {
		return unescape(arr[2])
	}
	;
	return null;
}

/**
 * 设置cookie值
 * 
 * @param sName
 *            名字
 * @param sValue
 *            值
 * @param iExpireDays
 *            cookie保存时间(单位：天)
 */
var setCookie = function(sName, sValue, iExpireDays) {
	if (iExpireDays) {
		var dExpire = new Date();
		dExpire.setTime(dExpire.getTime()
				+ parseInt(iExpireDays * 24 * 60 * 60 * 1000));
		document.cookie = sName + "=" + escape(sValue) + "; expires="
				+ dExpire.toGMTString() + "; path=/";
	} else {
		document.cookie = sName + "=" + escape(sValue) + "; path=/";
	}
}

/**
 * 获取cookie中保存的评论作者
 * 
 * @returns
 */
var getCookieCommentAuthor = function() {
	return getCookie("comment_author_cookie");
}

/**
 * 获取cookie中保存的评论邮箱
 * 
 * @returns
 */
var getCookieCommentEmail = function() {
	return getCookie("comment_email_cookie");
}

/**
 * 获取评论中保存的评论作者主页地址
 * 
 * @returns
 */
var getCookieCommentUrl = function() {
	return getCookie("comment_url_cookie");
}

var mlog = function(){	
}

$.extend(mlog, {
	
	/**
	 * 获取当前光标所在位置
	 */
	getCursorEndPosition: function (textarea) {
        textarea.focus();
        if (textarea.setSelectionRange) { // W3C
            return textarea.selectionEnd;
        } else if (document.selection) { // IE
            var i = 0,
            oS = document.selection.createRange(),
            oR = document.body.createTextRange(); 
            oR.moveToElementText(textarea);
            oS.getBookmark();
            for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !== 0; i ++) {
                if (textarea.value.charAt(i) == '\n') {
                    i ++;
                }
            }
            return i;
        }
    },
	
	/**
	 * 为表情图像绑定点击事件
	 */
	insertEmotions : function(name){
		var _this = this;
		
		if(name === undefined){
			name = "";
		}
		
		$("#emotions" + name + " span").click(function () {
	        var $comment = $("#comment" + name);
	        var endPosition = _this.getCursorEndPosition($comment[0]);
	        var key = "[" + this.className + "]",
	        textValue  = $comment[0].value;
	        textValue = textValue.substring(0, endPosition) + key + textValue.substring(endPosition, textValue.length);
	        $("#comment" + name).val(textValue);

	        if ($.browser.msie) {
	            endPosition -= textValue.split('\n').length - 1;
	            var oR = $comment[0].createTextRange();
	            oR.collapse(true);
	            oR.moveStart('character', endPosition + 6);
	            oR.select();
	        } else {
	            $comment[0].setSelectionRange(endPosition + 6, endPosition + 6);
	        }
	    });
	},
	
	/**
	 * 将评论中的表情标识，替换成表情图片
	 * @param selector 被替换表情的容器
	 */
	replaceCommentsEm : function(selector){
		var _this = this;
		var $commentContents = $(selector);
        for (var i = 0; i < $commentContents.length; i++) {
            var str = $commentContents[i].innerHTML;
            $commentContents[i].innerHTML =  _this.replaceEmString(str);
        }
	},
	
	/**
	 * 替换表情html文本
	 */
	replaceEmString : function(str){
		var _this = this;
		var commentSplited = str.split("[em");
        if (commentSplited.length === 1) {
            return str;
        }
        str = _this._processEm(commentSplited[0]);
        if ($.trim(commentSplited[0]) === "") {
            str = "";
        }
        for (var j = 1; j < commentSplited.length; j++) {
            var key = commentSplited[j].substr(0, 2);
            str += "<span class='em" + key + "'></span>" + this._processEm(commentSplited[j].slice(3));
        }
        return str + "<div class='clear'></div>";
	},
	
	_processEm: function (str) {
        if (str.replace(/\s/g, "") === "") {
            return "";
        }
        
        var strList = [], 
        resultStr = "",
        brList = ["<br>", "<br/>", "<BR>", "<BR/>"];
        for (var j = 0; j < brList.length; j++) {
            if (str.indexOf(brList[j]) > -1) {
                strList = str.split(brList[j]);
            }
        }
        
        if (strList.length === 0) {
            return "<span class='em-span'>" + str + "</span>";
        }
        
        for (var i = 0; i < strList.length; i++) {
            resultStr += "<span class='em-span'>" + strList[i] + "</span>";
            if (i !== strList.length - 1) {
                resultStr +="<br class='em-br'>";
            }
        }
        return resultStr;
    },
    
    /*
     * @description 初始化 SyantaxHighlighter
     * @param {Array} languages 需要加载的语言 
     */
    initSyntaxHighlighter: function(languages){
    	for(var i = 0; i < languages.length; i++){
    		switch(languages[i]){
	    		case "groovy":
	                languages[i] =  'groovy				' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushGroovy.js';
	                break;
	            case "java":
	                languages[i] =  'java				' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushJava.js';
	                break;
	            case "php":
	                languages[i] =  'php				' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushPhp.js';
	                break;
	            case "scala":
	                languages[i] =  'scala				' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushScala.js';
	                break;
	            case "sql":
	                languages[i] =  'sql				' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushSql.js';
	                break;
	            case "applescript":
	                languages[i] =  'applescript			' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushAppleScript.js';
	                break;
	            case "as3": 
	            case "actionscript3":
	                languages[i] =  'actionscript3 as3                  ' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushAS3.js';
	                break;
	            case "bash":
	            case "shell":
	                languages[i] =  'bash shell                         ' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushBash.js';
	                break;
	            case "coldfusion":
	            case "cf":
	                languages[i] =  'coldfusion cf			' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushColdFusion.js';
	                break;
	            case "c#":
	            case "c-sharp":
	            case "csharp":
	                languages[i] =  'c# c-sharp csharp                  ' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushCSharp.js';
	                break;
	            case "cpp":
	            case "c":
	                languages[i] =  'cpp c				' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushCpp.js';
	                break;	
	            case "css":
	                languages[i] =  'css				' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushCss.js';
	                break;
	            case "delphi":
	            case "pascal":
	                languages[i] =  'delphi pascal			' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushDelphi.js';
	                break;			
	            case "diff":
	            case "patch":
	            case "pas":
	                languages[i] =  'diff patch pas			' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushDiff.js';
	                break;			
	            case "erl":
	            case "erlang":
	                languages[i] =  'erl erlang                         ' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushErlang.js';
	                break;			
	            case "js":
	            case "jscript":
	            case "javascript":
	                languages[i] =  'js jscript javascript              ' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushJScript.js';
	                break;			
	            case "jfx":
	            case "javafx":
	                languages[i] =  'jfx javafx                 	' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushJavaFX.js';
	                break;			
	            case "perl":
	            case "pl":
	                languages[i] =  'perl pl                    	' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushPerl.js';
	                break;			
	            case "plain":
	            case "text":
	                languages[i] =  'text plain                 	' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushPlain.js';
	                break;			
	            case "ps":
	            case "powershell":
	                languages[i] =  'ps powershell                      ' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushPowerShell.js';
	                break;			
	            case "py":
	            case "python":
	                languages[i] =  'py python                          ' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushPython.js';
	                break;			
	            case "rails":
	            case "ror":
	            case "ruby":
	            case "rb":
	                languages[i] =  'ruby rails ror rb          	' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushRuby.js';
	                break;	
	            case "sass":
	            case "scss":
	                languages[i] =  'sass scss                  	' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushSass.js';
	                break;
	            case "vb":
	            case "vbnet":
	                languages[i] =  'vb vbnet                   	' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushVb.js';
	                break;			
	            case "xml":
	            case "xhtml":
	            case "xslt": 
	            case "html":
	                languages[i] =  'xml xhtml xslt html                ' +
	                "/mlog" + '/script/SyntaxHighlighter/scripts/shBrushXml.js';
	                break;	
	            default:
	                break;
    		}
    	}
    	// code high lighter
        SyntaxHighlighter.autoloader.apply(null, languages);
        SyntaxHighlighter.config.stripBrs = true;
        SyntaxHighlighter.all();
    },
    
    /*
     * @description 加载 SyntaxHighlighter 
     * @param {String} SHTheme SyntaxHighLighter 样式
     * @param {String} selector SyntaxHighLighter 容器
     */
    loadSyntaxHighlighter : function(SHTheme, selector){
    	var cssName = SHTheme ? SHTheme : "shCoreEclipse";
    	var _this = this;
    	// load css
        if (document.createStyleSheet) {
            document.createStyleSheet("/mlog" + "/script/SyntaxHighlighter/styles/" + cssName + ".css");
        } else {
            $("head").append($("<link rel='stylesheet' href='" + "/mlog" + "/script/SyntaxHighlighter/styles/" + cssName + ".css' type='text/css' charset='utf-8' />"));
        }
        
        // load js
        $.ajax({
            url: "/mlog" + "/script/SyntaxHighlighter/scripts/shCore.js",
            dataType: "script",
            cache: true,
            success: function() {
                // get brush settings
                var languages = [],
                isScrip = false;
                $(selector).each(function () {
                    var name = this.className.split(";")[0];
                    var language = name.substr(7, name.length - 1);
                    if (this.className.indexOf("html-script: true") > -1 && (language !== "xml" && language !== "xhtml" && 
                            language !== "xslt" && language != "html")) {
                        isScrip = true;
                    }
                    languages.push(language);
                });
                // when html-script is true, need shBrushXml.js
                if (isScrip) {
                    $.ajax({
                        url: "/mlog" + "/script/SyntaxHighlighter/scripts/shBrushXml.js",
                        dataType: "script",
                        cache: true,
                        success: function() {
                            _this.initSyntaxHighlighter(languages);
                        }
                    });
                } else {
                    _this.initSyntaxHighlighter(languages);
                }
            }
        });  
    },
    
    /*
     * @description 解析语法高亮
     * @param {Obj} setting 语法高亮配置参数
     * @param {Obj} setting.SHTheme 语法高亮 SyntaxHighLighter 样式
     * @param {Obj} setting.contentSelector 文章内容容器
     */
    parseLanguage: function (setting) {
        var isPrettify = false;
        var isSH = false;
        
        var selector = setting ? (setting.contentSelector ? setting.contentSelector : ".content") : ".content";
        selector = selector + " pre";
        
        $(selector).each(function () {
            if (this.className.indexOf("brush") > -1) {
                isSH = true;
            } 
            
            if (this.className.indexOf("prettyprint") > -1) {
                isPrettify = true;
            }
        });
        
        if (isSH) {
        	var SHTheme = setting ? (setting.SHTheme ? setting.SHTheme : undefined) : undefined;
            this.loadSyntaxHighlighter(SHTheme, selector);
        }
        
        if (isPrettify) {
            // load css
            if (document.createStyleSheet) {
                document.createStyleSheet(latkeConfig.staticServePath + "/js/lib/google-code-prettify/prettify.css");
            } else {
                $("head").append($("<link rel='stylesheet' href='" + latkeConfig.staticServePath + "/js/lib/google-code-prettify/prettify.css'>"));
            } 
        
            // load js
            document.write("<script src=\"" + latkeConfig.staticServePath + "/js/lib/google-code-prettify/prettify.js\"><\/script>");
            
            // load function
            $(document).ready(function () {
                prettyPrint();
            });
        }
        
    },
	
	/**
	 * @description 文章/自定义页面加载
     * @param {Object} setting 配置设定
     * @param {Object} setting.language 代码高亮配置
     * @param {Object} setting.contentSelector 文章内容容器,默认".content"
	 */
	load : function(setting){
		var _this = this;
		
		//为表情对象绑定点击 事件
		//_this.insertEmotions();
		// language
		_this.parseLanguage(setting);
	}
});