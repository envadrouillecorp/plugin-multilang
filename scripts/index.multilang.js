var MultilangPlugin = {
   langs:[],

   preWriteJson:function(id, dir, cb) {
      var uid = MultilangPlugin.uid(id);
      var div = uid+'_content'
      var nb_non_empty = 0;
      var first_content = '';

      var content = '<div id="'+div+'" class="customtranslate"></div>';
      for(var i in MultilangPlugin.langs) {
         if($('#multid_'+id+'_'+i).val() != '') {
            nb_non_empty++;
            if(!first_content)
               first_content = $('#multid_'+id+'_'+i).val();
            content += '<div id="'+div+'_'+MultilangPlugin.langs[i]+'" style="display:none">'+$('#multid_'+id+'_'+i).val()+'</div>';
         }
      }
      content += "<script>$('#"+div+"').bind('languagechangeevt', function() { var elt = $('#"+div+"').parent().find('.descr'); if(!elt.length) elt = $('#"+div+"'); var contentdiv = $('#"+div+"_'+jGallery.lang); if(!contentdiv.length) contentdiv = $('#"+div+"').next();  elt.html(contentdiv.html()); }); $('#"+div+"').trigger('languagechangeevt');</script>";

      if(nb_non_empty > 1) {
         $('#d_'+id).val(content); // change the descr textarea with our custom code
      } else {
         $('#d_'+id).val(first_content); // use the only set language
      }
      cb(); 
   },
 
   getJsonParams:function(id, dir) {
      return { }; 
   },
 
   postWriteJson:function(id, dir, cb) {
      cb();
   },
 
   uid:function(id) {
      var name = $('#'+id).find('.title').text();
      return name.replace(/[^a-zA-z0-9]/g, '');
   },

   addButtonActions:function(id, dir, data) {
      function showDescr(index) {
         for(var i in MultilangPlugin.langs) {
            var src = $("#flag_"+id+"_"+i).attr('src');
            if(i == index) {
               src = src.replace(/flags(_grey)?/, 'flags');
               $('#multid_'+id+'_'+i).css('display', 'block');
            } else {
               src = src.replace(/flags(_grey)?/, 'flags_grey');
               $('#multid_'+id+'_'+i).css('display', 'none');
            }
            $("#flag_"+id+"_"+i).attr('src', src);
         }
      }

      MultilangPlugin.init();
      $('#d_'+id).css('display', 'none');
      

      $('#d_'+id).parent().prev().translate();
      $('#d_'+id).parent().prev().removeClass('translate');
      $('#d_'+id).parent().prev().append('<div id="flags_'+id+'" style="text-align:center"></div>');
      
      var uid = MultilangPlugin.uid(id);
      var old_content = $('<div></div>');
      var was_multi = false;
      old_content.append($('#d_'+id).val());
      if(old_content.find('.customtranslate').length)
         was_multi = true;
      for(var i in MultilangPlugin.langs) {
         var lang_content = old_content.find('#'+uid+'_content_'+MultilangPlugin.langs[i]).html();
         if(!was_multi) {
            lang_content = (i==0)?$('#d_'+id).val():'';
         } else {
            lang_content = old_content.find('#'+uid+'_content_'+MultilangPlugin.langs[i]).html();
         }
			$("#multilangTpl").tmpl({id:id,i:i,content:lang_content}).appendTo($('#d_'+id).parent());
			$("#multilangTplFlag").tmpl({id:id,i:i,lang:MultilangPlugin.langs[i]}).appendTo($('#flags_'+id));
         $("#flag_"+id+"_"+i).click({index:i}, function(e) {
            showDescr(e.data.index);
         });
      }
   },
 
   getHooks:function(dir, id) {
      var textareas = [];
      for(var i in MultilangPlugin.langs) 
         textareas.push($('#multid_'+id+'_'+i));
      return textareas;
   },
 
   getUnparsedDirTpl:function(dir, div, id) {
      return '';
   },
 
   getParsedDirTpl:function(dir, id, json) {
      return '';
   },

   done:false,
   init:function() {
      if(MultilangPlugin.done)
         return;
      MultilangPlugin.done = true;
      MultilangPlugin.langs = $('#multilangdiv').text().split(/[\s,]+/);
   },
};
plugins.push(MultilangPlugin);
