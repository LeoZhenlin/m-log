<#include "../../inc/header.ftl" />
<div>
	<#--
	<form id="cacheForm" name="cacheForm" method="post" action="${base}/admin/system/cache/config/save">
		<div id="error" class="message error" style="display:none;"></div>
		<table class="infotable">
			<tr>
				<td colspan="3" class="partition">缓存配置</td>
			</tr>
			<tr>
				<td class="fieldlabel" style="width:120px;">缓存前缀:</td>
				<td>
					<input type="input" class="textinput" style="width:95%;" name="cache_prefix" value="${cache_prefix!""}" validate="{required:true,maxlength:10, messages:{required:'缓存前缀必须填写', maxlength:'缓存前缀最大长度不能超过{0}'}}"/>
				</td>
				<td class="fieldnotice" style="width:300px;">规则：最大长度10，默认:MLOG_</td>
			</tr>
			<tr>
				<td colspan="3" style="text-align:center;"><input type="submit" class="btn" value=" 提 交 " /></td>
			</tr>
		</table>
	</form>
	-->
	<div style="text-align:center;">
		<div class="message notice">
			当发现在后台更新了内容，前台未显示的，可以通过清理缓存来解决！
		</div>
		<button class="btn" id="btnClear"> 清 理 缓 存 </button>
	</div>
</div>
<script type="text/javascript">
	$("#btnClear").click(function(){
		$.get("${base}/admin/system/cache/clear", function(response){
			alert('清理完成');
			document.location.reload();
		});
	});
	
	$(document).ready(function(){
		//斑马线
		var tables=document.getElementsByTagName("table");
		var b=false;
		for (var j = 0; j < tables.length; j++){
			var cells = tables[j].getElementsByTagName("tr");
			//cells[0].className="color3";
			b=false;
			for (var i = 0; i < cells.length; i++){
				if(b){
					cells[i].className="color2";
					b=false;
				}
				else{
					cells[i].className="color3";
					b=true;
				};
			};
		}
		
		mlog.form.validate({
			selector : "#cacheForm",
			errorLabelContainer : "#error",
			wrapper: 'li',
			onfocusout : false,
			onkeyup : false,
			onclick : false,
			success : function(){
				mlog.utils.scrollTop();
			}
		});
	});
</script>
<#include "../../inc/footer.ftl" />