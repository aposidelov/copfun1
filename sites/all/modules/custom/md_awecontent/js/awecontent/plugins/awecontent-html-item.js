!function(e){"use strict";AWEContent.Models.HtmlItem=AWEContent.Models.Item.extend({defaults:{machine_name:"html",contentHtml:"<b>Custom Code HTML</b>",lgResponsive:!0,xsResponsive:!0,mediumResponsive:!0,smResponsive:!0},createView:function(){this.view=new AWEContent.Views.HtmlItem({model:this})},clone:function(){var t={};return e.each(this.toJSON(),function(e,n){t[e]=n}),new AWEContent.Models.HtmlItem(t)}}),AWEContent.Views.HtmlItem=AWEContent.Views.Item.extend({initialize:function(){AWEContent.Views.Item.prototype.initialize.call(this)},renderItemContent:function(){var t=this,n=t.model.toJSON(),i=e('<div class="awe-item awe-html"></div>');return t.$html=i,t.$html.html(n.contentHtml),t.$el.defaultResponsive(n),i},applySettingsChanged:function(t){var n=this,i=n.model.toJSON();e.each(t.changed,function(e,t){switch(n.$el.changeResponsive(e,t),e){case"contentHtml":n.$html.empty().html(i.contentHtml)}})}}),AWEContent.Views.HtmlItemController=AWEContent.Views.ItemController.extend({machineName:"html",controllerHtml:function(){return'<div class="title-icon">HTML code</div><i class="ic ac-icon-code"></i>'},createItemModel:function(e){return void 0!=e?new AWEContent.Models.HtmlItem(e):new AWEContent.Models.HtmlItem}}),AWEContent.Views.HtmlPanel=AWEContent.Views.ItemPanel.extend({tagName:"div",className:"awe-obj-panel panel-html",panelName:"html",initPanel:function(){var t=this;AWEContent.Views.ItemPanel.prototype.initPanel.call(this),e("#ace-editor-value",t.el).val(t.editingModel.get("contentHtml")),AWEContent.Library.addLibrary("aceEditor",function(){t.loadLibraryDone()},!0)},loadLibraryDone:function(){var e=this;e.editor=ace.edit("ace-editor-edit"),e.editor.setTheme("ace/theme/twilight"),e.editor.getSession().setMode("ace/mode/html"),e.editor.setOption("wrap",25),e.editor.setDisplayIndentGuides(!0),e.editor.renderer.setShowGutter(!0),e.editor.getSession().on("change",function(){e.editingModel.set("contentHtml",e.editor.getValue())}),e.addLibraryDone=!0},setPanelElementsValue:function(){var e=this,t=this.editingModel.toJSON(),n=setInterval(function(){e.addLibraryDone&&(e.editor.getSession().setValue(t.contentHtml),clearInterval(n))},50)},buildPanel:function(){return{title:{type:"markup",markup:'<div class="awe-title"><h2>HTML Custom</h2></div>'},custom_attributes:{type:"section",custom_html:{type:"markup",markup:"<div class='ace-editor-wrapper'><div class='ace-editor-edit' id='ace-editor-edit'></div></div>"}}}}}),e(document).ready(function(){AWEContent.Controllers.html=new AWEContent.Views.HtmlItemController,AWEContent.Panels.html=new AWEContent.Views.HtmlPanel})}(jQuery);