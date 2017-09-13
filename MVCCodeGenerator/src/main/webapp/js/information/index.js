$(function(){
   $('#query').click(function(){
       $("#dg").datagrid("load", $("#frmQuery").serializeObject()); 
   });
   $("#add").click(function(){
      edit();
   });
   $("#update").click(function(){
       edit(true);
    });
   $("#delete").click(function(){
       var rows = $("#dg").datagrid("getSelections");
       if(rows.length == 0)
           return;
       openConfirmDeleteDialog(function(){
           $.post(CONFIG.baseUrl + "information/delete.do?" + $.arrayPickParam("ids", rows, "id"), function(ret){
               showOpResultMessage(ret);
               $("#dg").datagrid('reload');
           });
       });
    });
   
   function edit(update) {
       var url = "information/form.do";
       if (update) {
           var row = $("#dg").datagrid("getSelected")
           if (!row)
               return;
           url += "?id=" + row.id;
       }
       
       var dlg = openEditDialog({
           title: "编辑",
           width: 500,
           height: 440,
           href: url,
           onSave: function() {
               submitForm({
                   url: "information/save.do",
                   success: function(ret) {
                       if (ret.success) {
                           dlg.dialog("close");
                           $("#dg").datagrid("reload");
                       }
                       showOpResultMessage(ret);
                   }
               });
           }
       });
   }
});