<#include "../inc/header.ftl" />
<#import "/META-INF/spring.ftl" as spring />
<#import "/META-INF/mspring.ftl" as mspring />
<div class="ui-layout-center">
	<div class="tab">
		<ul>
		    <li><a href="${base}/admin/catalog/list">列表</a></li>
		    <li><a href="${base}/admin/catalog/create">增加</a></li>
		    <li><a href="javascript:void(0);" class="here">修改</a></li>
		</ul>
	</div>
	<form class="form" action="${base}/admin/catalog/doEdit" method="POST">
		<@spring.bind "catalog" />
		<@mspring.show_errors />
		<@spring.formHiddenInput path="catalog.id" />
		<@spring.formHiddenInput path="catalog.createTime" />
		<table class="formtable" style="width:100%">
			<tr>
				<td class="fieldlabel" style="width:60px;">编号:</td>
				<td>
					<@spring.formInput path="catalog.id" attributes='class="textinput" style="width:98%;" disabled="disabled"' />
				</td>
			</tr>
			<tr>
				<td class="fieldlabel" style="width:60px;">名称</td>
				<td>
					<@spring.formInput path="catalog.name" attributes='class="textinput" style="width:98%;"' />
				</td>
			</tr>
			<tr>
				<td class="fieldlabel" style="width:60px;">创建时间</td>
				<td>
					<@spring.formInput path="catalog.createTime" attributes='class="textinput" style="width:98%;" disabled="disabled"' />
				</td>
			</tr>
			
			<tr>
				<td class="fieldlabel" style="width:60px;">排序</td>
				<td>
					<@spring.formInput path="catalog.order" attributes='class="textinput" style="width:98%;"' />
				</td>
			</tr>
			<tr>
				<td class="fieldlabel" style="width:60px;">描述</td>
				<td>
					<@spring.formTextarea path="catalog.description" attributes='class="textinput" style="width:98%;"' />
				</td>
			</tr>
			<tr>
				<td colspan="4" style="text-align:center;">
					<input type="submit" class="btn" value=" 提交 " />
				</td>
			</tr>
		</table>
	</form>
</div>

<script type="text/javascript">
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
	});
</script>
<script type="text/javascript">
	$(document).ready(function(){
		$('body').layout({
			north__closable:false,
			north__size:62,
			north__resizable:false,
			south__closable:false,
			south__size:50,
			south__resizable:false,
			east__size:250,
			togglerTip_open : "关闭",
			togglerTip_closed : "打开",
			resizerTip:"调整宽度",
			//west__spacing_closed:10,
			west__onresize: function (pane, $Pane) {  
                
            }
		});
		
	});
</script>
<#include "../inc/footer.ftl" />