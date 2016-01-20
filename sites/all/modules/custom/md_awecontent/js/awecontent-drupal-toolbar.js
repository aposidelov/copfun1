!function(e){"use strict";AWEContent.Views.DrupalToolbar=AWEContent.Views.Toolbar.extend({id:"drupal-elements",template:_.template('<div class="obj-adjust">                <div class="awe-element-filter select-list toggle-drop">                    <div class="list-item">                        <div class="crr-item">                            <span class="dis-change">All<span class="ati-quantity"></span></span>                            <i class="ic ac-icon-arrow-down"></i><input type="hidden" value="template-all" name="selected_value">                        </div>                        <ul class="content-drop">                            <li class="select-template" data-value="*">All<span class="ati-quantity"></span></li>                            <li class="select-template" data-value="fields">Fields <span class="ati-quantity"></span></li>                        </ul>                    </div>                </div>                <div class="awe-drupal-items scroll-bar"><ul class="all-element"></ul></div>            </div> '),filterItemTemplate:_.template('<li class="select-template" data-value="<%= module %>">                <%= moduleName %> Module <span class="ati-quantity">(<%= blockQuantity %>)</span>            </li>'),itemTemplate:_.template('<li class="item-element ac-dp-<%= type %> <%= module %>" data-type="drupal_<%= type %>">                <span><%= name %></span>            </li>'),loadedElements:[],initToolbar:function(){AWEContent.Views.Toolbar.prototype.initToolbar.call(this),this.getToolbarContent()},renderController:function(){return'<a href="#drupal-elements"><i class="ic ac-icon-drupal"></i>Drupal</a>'},render:function(){this.$el.append(this.template())},getToolbarContent:function(){var t=this,l=e(".awecontent-body-wrapper input[name=form_id]").val(),a=l?l.trim().replace("_node_form",""):"";e.post(AWEContent.Path.drupalElementURL,{type:"drupal_elements_controller",node_type:a},function(l){l.status&&(e.each(l.data.blocks,function(l,a){e("ul.content-drop",t.$el).append(t.filterItemTemplate({moduleName:a.name,blockQuantity:this.blocks.length,module:l})),e.each(a.blocks,function(){var l=JSON.stringify({delta:this.delta,module:this.module,info:this.info}),a=e(t.itemTemplate({module:this.module,name:this.info,type:"block"}));a.addClass(this.module+"-"+this.delta).attr("data-template",l),e("ul.all-element",t.$el).append(a)})}),e(".content-drop li[data-value=fields] span.ati-quantity",t.$el).text("("+Object.keys(l.data.fields).length+")"),e.each(l.data.fields,function(){var l=JSON.stringify({fieldName:this.field_name,nodeType:this.bundle,entityType:this.entity_type}),a=e(t.itemTemplate({module:"fields",name:this.label,type:"field"}));a.addClass("field-"+this.field_name).attr("data-template",l),e("ul.all-element",t.$el).append(a)}),e(".select-list",t.$el).aweSelect().bind("change",function(){var l=e("input[name=selected_value]",e(this)).val();e("li.item-element",t.$el).show(),"*"!=l&&e("li.item-element:not(."+l+")",t.$el).hide(),e(".scroll-bar",t.$el).perfectScrollbar("update")}),e("ul.all-element",t.$el).mouseenter(function(){var t=AWEContent.contentIframe.height(),l=AWEContent.contentIframe.scrollTop();e(".awecontent-wrapper").height(t),e(window).scrollTop(l)}),e("ul.all-element > li.item-element",t.$el).draggable({iframeFix:!0,refreshPositions:!0,helper:"clone",start:function(l,a){e(".scroll-bar",t.$el).addClass("position-default"),a.helper.css("z-index",9999)},stop:function(){e(".scroll-bar",t.$el).removeClass("position-default")}}),e(".scroll-bar",t.$el).perfectScrollbar().scroll(function(){var t=e(this),l=parseInt(e(".ps-scrollbar-y-rail",t).css("top"));e("li.item-element:not(.ui-draggable-dragging, .ui-sortable-helper)",t).draggable("option","cursorAt",{top:l})}).trigger("scroll"),e.each(t.loadedElements,function(){e("li.item-element."+this,t.$el).addClass("loaded").attr("style","")}),e(window).resize(function(){AWEContent.iframe.height(e(window).height())}).trigger("resize"),AWEContent.Panels.toolbarPanel.updateSortableColumn())})},hideController:function(t){this.loadedElements.push(t),this.initialized&&e("li.item-element."+t,this.$el).addClass("loaded").removeAttr("style")},showController:function(t){this.loadedElements.splice(e.inArray(t,this.loadedElements),1),this.initialized&&e("li.item-element."+t,this.$el).removeClass("loaded")},resetToolbar:function(){this.loadedElements=[],e("li.item-element.loaded",this.$el).removeClass("loaded")}}),e(document).ready(function(){AWEContent.Toolbars.drupal=new AWEContent.Views.DrupalToolbar})}(jQuery);