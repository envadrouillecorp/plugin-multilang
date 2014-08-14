<div id="multilangdiv" style="display:none">{$LANGS}</div>
<script id="multilangTpl" type="text/x-jquery-tmpl">
   <textarea id='multid_${id}_${i}' rows="3" style="width:100%;float:right;display:{{if i!=0}}none{{else}}block{{/if}}">${content}</textarea>
</script>
<script id="multilangTplFlag" type="text/x-jquery-tmpl">
   <img id="flag_${id}_${i}" src="pages/multilang/css/flags{{if i!=0}}_grey{{/if}}/${lang}.png" alt="${lang}" style="padding:1px;cursor:pointer">
</script>
