!function(e){"use strict";AWEContent.Views.ToolbarPanel=AWEContent.Views.DefaultPanel.extend({className:"awe-toolbar layout",template:_.template('<div class="obj-bar">                <div class="op-top">                    <div class="toggle-build"><i class="ic ac-icon-arrow-right"></i></div>                </div>                <div class="select-tab sel-vertical">                    <ul></ul><span class="ef-act"></span>                </div>                <div class="op-bottom">                    <div class="tool-bar help-bar"><i class="ic ac-icon-help"></i>                        <div class="auto-midd">                            <div class="tool-tip">                                <ul>                                    <li><a href="http://youtube.com/megadrupal">Video tutorials</a></li>                                    <li><a href="http://megadrupal.com/forum/module-support/awecontent">Forums support</a></li>                                    <li><a href="http://megadrupal.com/contact">Contact us</a></li>                                </ul>                            </div>                        </div>                    </div>                    <div class="tool-bar save-build">                        <i class="ic ac-icon-done"></i>                        <div class="auto-midd">                            <div class="tool-tip">                                <ul><li class="save-template">Save</li></ul>                            </div>                        </div>                    </div>                    <div class="tool-bar close-build"><i class="ic ac-icon-clear"></i>                        <div class="auto-midd">                            <div class="tool-tip">                                <ul><li class="save-template">Cancel</li></ul>                            </div>                        </div>                    </div>                </div>            </div>            <div class="md-tab type-vertical pull-layout"><div class="md-content-tab"></div></div>'),panelEvents:{"click .save-build":"saveBuilder","click .close-build":"closeBuilder"},initialize:function(){var t=this;this.render(),this.$el.tabs({beforeActivate:function(t,a){var l=a.newTab.index();e(".ef-act",a.newTab.parents(".select-tab")).css("top",70*l)}}),e(".sel-vertical > ul > li",this.$el).click(function(a){a.preventDefault(),t.$el.hasClass("opened")||t.openPanel();var l=e("li.ui-tabs-active",t.$el).data("toolbar.id");AWEContent.Toolbars[l]&&!AWEContent.Toolbars[l].initialized&&AWEContent.Toolbars[l].initToolbar(),"responsive"==l?AWEContent.Toolbars.responsive.afterOpenCallback():AWEContent.Toolbars.responsive.afterCloseCallback()})},render:function(){var t=this;this.$el.append(this.template()),e.map(AWEContent.Toolbars,function(a,l){e("> .obj-bar > .select-tab > ul",t.$el).append(e("<li>"+a.renderController()+"</li>").data("toolbar.id",l)),e(".md-content-tab",t.$el).append(a.$el)})},openPanel:function(){AWEContent.Views.DefaultPanel.prototype.openPanel.call(this),e(".toggle-build > i",this.$el).removeClass("ac-icon-arrow-right").addClass("ac-icon-arrow-left"),this.$el.parent().addClass("opened"),e("li.ui-tabs-active",this.$el).trigger("click")},closePanel:function(){AWEContent.Views.DefaultPanel.prototype.closePanel.call(this),e(".toggle-build > i",this.$el).removeClass("ac-icon-arrow-left").addClass("ac-icon-arrow-right"),this.$el.parent().removeClass("opened");var t=e("li.ui-tabs-active",this.$el).data("toolbar.id");AWEContent.Toolbars[t].afterCloseCallback()},saveBuilder:function(e){e.preventDefault(),this.$el.parents(".awecontent-wrapper").trigger("builderClose",!0)},closeBuilder:function(e){e.preventDefault(),confirm("All changes in builder will be lost permanently. Do you want to close builder?")&&this.$el.parents(".awecontent-wrapper").trigger("builderClose",!1)},updateSortableColumn:function(){var t=e(AWEContent.documentIframe.getElementsByClassName("awe-col-wrapper"));t.sortable({handle:".js-obj-parent-move",connectWith:".awe-col-wrapper",revert:!0,placeholder:"awe-item-placeholder",refreshPositions:!0,tolerance:"pointer",update:function(t,a){var l=a.item.data("type"),i=a.item.data("template")?a.item.data("template"):null;if("string"==e.type(i)&&(i=JSON.parse(i)),l){var o=AWEContent.Controllers[l],n=o.createItemModel(i),s=AWEContent.getColumnModelContainItem(a.item);s&&(s.get("items").add(n,{at:a.item.index()}),AWEContent.Panels[n.get("machine_name")]&&AWEContent.Panels[n.get("machine_name")].editModel(n))}}}),e("ul.all-element > li.ui-draggable",this.$el).draggable("option","connectToSortable",t)}}),AWEContent.Views.Toolbar=Backbone.View.extend({initialized:!1,className:"md-tab-item",id:"",initialize:function(){this.render()},initToolbar:function(){this.initialized=!0},renderController:function(){return""},render:function(){},afterOpenCallback:function(){},afterCloseCallback:function(){}}),AWEContent.Views.TemplateToolbar=AWEContent.Views.Toolbar.extend({id:"folder-page",template:_.template('<div class="obj-adjust">                <div class="select-list toggle-drop">                    <div class="list-item">                        <div class="crr-item">                            <span class="dis-change">All<span class="ati-quantity"></span></span>                            <i class="ic ac-icon-arrow-down"></i><input type="hidden" value="template-all" name="selected_value">                        </div>                        <ul class="content-drop">                            <li class="select-template" data-value="*">All<span class="ati-quantity"></span></li>                            <li class="select-template" data-value="favourite">Favourite<span class="ati-quantity"></span></li>                        </ul>                    </div>                </div>                <div class="list-template-item scroll-bar">                    <div class="list-template-wrapper"></div>                </div>            </div>'),sectionTemplate:_.template('<div class="library-template-item <%= filterClass %><% if (template.favourite) { %><%= \' favourite\' %><% } %>" data-template-id="<%= template.tid %>">                <div class="lti-background"><img title="<%= template.title %>" alt="<%= template.title %>" src="<%= template.thumbnail %>"></div>                <div class="lti-option">                    <ul>                        <li class="js-remove-template"><i class="ic ac-icon-trash"></i></li>                        <li class="js-favourite-template tran-favor"><i class="ic ac-icon-star"></i></li>                    </ul>                </div>                <input type="hidden" value=\'<%= JSON.stringify(template) %>\' name="template-data">            </div>'),events:{"click li.js-remove-template":"removeTemplate","click li.js-favourite-template":"markFavouriteTemplate"},initialize:function(){AWEContent.Views.Toolbar.prototype.initialize.call(this),this.numberTemplates=0,this.allowLoadMore=!1,this.loadingTemplate=!1,this.allowDragTemplate=!0},initToolbar:function(){AWEContent.Views.Toolbar.prototype.initToolbar.call(this);var t=this;this.$el.bind("loadTemplateSuccessful",function(a,l){e(".library-template-item",t.$el).draggable("destroy"),t.numberTemplates+=l.length,e.each(l,function(){var a=this,l=a.category.toLowerCase().replace(/[^A-Za-z0-9\-]/g,"-");if(0==e("li.select-template[data-value="+l+"]",t.$el).length){var i=e('<li class="select-template"></li>');i.attr("data-value",l).html(a.category+'<span class="ati-quantity"></span>'),e("ul.content-drop",t.$el).append(i)}e(".list-template-wrapper",t.$el).append(t.sectionTemplate({filterClass:l,template:a}))}),t.initDragTemplate(),e(".scroll-bar",t.$el).perfectScrollbar("update").trigger("scroll"),t.loadingTemplate=!1}),this.$el.bind("uploadTemplateSuccess",function(a,l){e(".library-template-item",t.$el).draggable("destroy"),e(".list-template-item",t.$el).prepend(t.sectionTemplate({filterClass:"custom",template:l})),t.initDragTemplate(),e(".scroll-bar",t.$el).perfectScrollbar("update").trigger("scroll"),t.numberTemplates+=1}),e(".scroll-bar",t.$el).perfectScrollbar().scroll(function(){var a=e(".ps-scrollbar-y-rail",e(this)),l=parseInt(a.css("top"));if(e(".library-template-item:not(.ui-draggable-dragging, .ui-sortable-helper)",e(this)).draggable("option","cursorAt",{top:l}),t.allowLoadMore&&!t.loadingTemplate){var i=a.height(),o=e(".ps-scrollbar-y",a),n=parseInt(o.css("top")),s=o.height();10>=i-s-n&&t.loadTemplate()}}),e(".list-template-wrapper",this.$el).mouseenter(function(){var t=AWEContent.contentIframe.height(),a=AWEContent.contentIframe.scrollTop();e(".awecontent-wrapper").height(t),e(window).scrollTop(a)}),e(".select-list",this.$el).aweSelect().change(function(a,l){e(".list-template-item .library-template-item",t.$el).show(),"*"!=l.value&&e(".list-template-item .library-template-item:not(."+l.value+")",t.$el).hide(),e(".scroll-bar",t.$el).perfectScrollbar("update").trigger("scroll")}),this.$el.delegate(".library-template-item","mousedown",function(){AWEContent.$sectionsWrapper.sortable("enable")}).delegate(".library-template-item","mouseup",function(){AWEContent.$sectionsWrapper.sortable("disable")}),e(window).bind("aweUploadTemplateSuccess",function(a,l){l.category=l.category?l.category:"Custom";var i=e(t.sectionTemplate({filterClass:"custom",template:l}));e(".list-template-item",t.$el).prepend(i),t.initDragTemplate(i)}),this.loadTemplate()},loadTemplate:function(){var t=this;this.loadingTemplate=!0,e.post(AWEContent.Path.templateActionURL,{act:"load_templates",current:this.numberTemplates,type:"section"},function(a){a&&("string"==e.type(a)&&(a=JSON.parse(a.trim())),a.status&&(t.$el.trigger("loadTemplateSuccessful",[a.templates]),t.allowLoadMore=a.load_more))})},renderController:function(){return'<a href="#folder-page" class="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-11"><i class="ic ac-icon-section"></i>Section</a>'},render:function(){this.$el.append(this.template())},initDragTemplate:function(){var t=this;this.allowDragTemplate&&e(".library-template-item",this.$el).draggable({iframeFix:!0,helper:"clone",handle:".lti-background",start:function(a,l){e(".scroll-bar",t.$el).addClass("position-default"),l.helper.css("z-index",9999)},stop:function(){e(".scroll-bar",t.$el).removeClass("position-default")},connectToSortable:AWEContent.$sectionsWrapper})},markFavouriteTemplate:function(t){t.preventDefault();var a=e(t.target).parents(".library-template-item:first"),l=JSON.parse(e("input[name=template-data]",a).val().trim()),i=a.hasClass("favourite")?0:1;e.post(AWEContent.Path.templateActionURL,{act:"favourite",tid:a.data("template-id"),favourite:i},function(t){t&&("string"==e.type(t)&&(t=JSON.parse(t.trim())),t.status&&(i?(a.addClass("favourite"),l.favourite=1):(a.removeClass("favourite"),l.favourite=0),e("input[name=template-data]",a).val(JSON.stringify(l))))})},removeTemplate:function(t){t.preventDefault();var a=e(t.target).parents(".library-template-item:first");confirm("This template will be removed permanently. Are you sure?")&&e.post(AWEContent.Path.templateActionURL,{act:"remove",tid:a.data("template-id")},function(t){if(t)if("string"==e.type(t)&&(t=JSON.parse(t.trim())),t.status){{JSON.parse(e("input[name=template-data]",a).val().trim())}a.remove()}else alert(t.msg)})},updateTemplateCategoryNumber:function(t){var a;"favourite"==t?(a=e(".library-template-item.favourite",self.$el).length,e(".select-list li.select-template[data-value=favourite] span.ati-quantity").html("("+a+")")):(a=e(".library-template-item.template-"+t,self.$el).length,e(".select-list li.select-template[data-value=template-"+t+"] span.ati-quantity").html("("+a+")"))}}),AWEContent.Views.ShortCodeToolbar=AWEContent.Views.Toolbar.extend({id:"all-element",initToolbar:function(){var t=this;AWEContent.Views.Toolbar.prototype.initToolbar.call(this),e("ul.all-element",this.$el).mouseenter(function(){var t=AWEContent.contentIframe.height(),a=AWEContent.contentIframe.scrollTop();e(".awecontent-wrapper").height(t),e(window).scrollTop(a)}),e("ul.all-element > li.item-element",this.$el).draggable({iframeFix:!0,helper:"clone",refreshPositions:!0,start:function(a,l){e(".scroll-bar",t.$el).addClass("position-default").height(e(window).height()),l.helper.css("z-index",9999)},stop:function(){e(".scroll-bar",t.$el).removeClass("position-default").height("")}}),e(".scroll-bar",t.$el).perfectScrollbar().scroll(function(){var t=e(this),a=parseInt(e(".ps-scrollbar-y-rail",t).css("top"));e("li.item-element:not(.ui-draggable-dragging, .ui-sortable-helper)",t).draggable("option","cursorAt",{top:a})}).trigger("scroll"),AWEContent.Panels.toolbarPanel.updateSortableColumn()},renderController:function(){return'<a href="#all-element"><i class="ic ac-icon-objects"></i>Objects</a>'},render:function(){this.$el.append('<div class="obj-adjust scroll-bar"><ul class="all-element"></ul></div>')}}),e(document).ready(function(){AWEContent.Toolbars.template=new AWEContent.Views.TemplateToolbar,AWEContent.Toolbars.shortcodes=new AWEContent.Views.ShortCodeToolbar})}(jQuery);