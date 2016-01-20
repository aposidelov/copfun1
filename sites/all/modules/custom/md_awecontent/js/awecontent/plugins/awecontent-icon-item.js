!function(e){"use strict";AWEContent.Models.IconItem=AWEContent.Models.Item.extend({defaults:{machine_name:"icon",nameIcon:"ic ac-icon-help",fontSize:-1,lineHeight:-1,styleIcon:"icon-plain",iconAlign:"awe-icon-left",color:"",backgroundColor:"",hoverColor:"",hoverBackgroundColor:"",iconLink:"",boxModelSettings:{},customID:"",customClass:"",customEnableAttributes:0,customDataAttributes:"[] ",customActionAttributes:'{"newAction": "", "newAttrName": "", "newAttrValue": ""}',customEnableAnimations:0,customDataAnimations:'{"type" : "none"}',lgResponsive:!0,xsResponsive:!0,mediumResponsive:!0,smResponsive:!0},createView:function(){this.view=new AWEContent.Views.IconItem({model:this})},relations:[{type:Backbone.HasOne,key:"boxModelSettings",relatedModel:AWEContent.Models.BoxModelSettings}],clone:function(){var t={};return e.each(this.toJSON(),function(e,o){t[e]=o}),t.boxModelSettings=new AWEContent.Models.BoxModelSettings(t.boxModelSettings),new AWEContent.Models.IconItem(t)}}),AWEContent.Views.IconItem=AWEContent.Views.Item.extend({initialize:function(){AWEContent.Views.Item.prototype.initialize.call(this),this.listenTo(this.model.get("boxModelSettings"),"change",this.applySettingsChanged)},itemTemplate:_.template('<div class="awe-item awe-icon">                <style></style>                <% if (iconLink) { %>                <a class="" href="<%= iconLink %>" target="_blank">                <% } %>                    <div class="awe-icon-container"><i class="<%= iconClasses %>"></i></div>                <% if (iconLink) { %>                </a>                <% } %>            </div>'),itemStyle:_.template(".<%= itemClass %>.awe-icon .awe-icon-container {\n                color: <%= color %>;\n                background-color: <%= bgColor %>;\n            }\n            .<%= itemClass %>.awe-icon .awe-icon-container:hover {\n                color: <%= hoverColor %>;\n                background-color: <%= hoverBgColor %>;\n            }\n"),renderItemContent:function(){var t=this,o=t.model.toJSON(),n=e(this.itemTemplate({iconLink:o.iconLink,iconClasses:o.nameIcon})),i=e("style",n);return t.itemClass="awe-icon-"+this.cid,n.addClass(t.itemClass).css({"font-size":-1==o.fontSize?"":o.fontSize+"px","line-height":-1==o.lineHeight?"":o.lineHeight+"px"}).renderItemDefaultBoxModel(o.boxModelSettings),n.addClass(o.styleIcon),i.html(this.itemStyle({itemClass:this.itemClass,color:o.color,bgColor:o.backgroundColor,hoverColor:o.hoverColor,hoverBgColor:o.hoverBackgroundColor})),n.addClass(o.customClass).attr("id",o.customID),n.renderItemDefaultAttributes(o.customEnableAttributes,o.customDataAttributes),o.customEnableAnimations&&n.processAnimations(o.customDataAnimations),t.$el.defaultResponsive(o),n.addClass(o.iconAlign),n},applySettingsChanged:function(t){var o=this,n=e(".awe-icon",o.el),i=e("i",n),s=(e("style",n),t.toJSON()),a=o.$el.height();e.each(t.changedAttributes(),function(e,a){switch(o.$el.changeResponsive(e,a),n.renderChangeSettingBoxModel(e,a,t),e){case"nameIcon":var l=o.model.previousAttributes().nameIcon;i.removeClass(l).addClass(a);break;case"fontSize":-1==a?n.css("fontSize",""):n.css("fontSize",a+"px");break;case"lineHeight":-1==a?n.css("line-height",""):n.css("line-height",a+"px");break;case"styleIcon":var c=o.model.previousAttributes().styleIcon;n.removeClass(c).addClass(a);break;case"iconAlign":var r=o.model.previousAttributes().iconAlign;n.removeClass(r).addClass(a);break;case"color":case"backgroundColor":case"hoverColor":case"hoverBackgroundColor":o.generateStyle();break;case"iconLink":n.remove(),o.$el.append(o.renderItemContent());break;case"customID":n.attr("id",a);break;case"customClass":var u=o.model.previousAttributes().customClass;n.removeClass(u).addClass(a);break;case"customEnableAttributes":n.renderChangeSettingsAttributes(e,a,s.customDataAttributes);break;case"customActionAttributes":n.renderChangeSettingsAttributes(e,a);break;case"customEnableAnimations":var m,d;a?(m=s.customDataAnimations,d=null,n.processAnimations(m)):(m=null,d=s.customDataAnimations,n.processAnimations(m,d));break;case"customDataAnimations":n.processAnimations(s.customDataAnimations,o.model.previousAttributes().customDataAnimations)}}),setTimeout(function(){o.checkChangeHeight(a)},50)},generateStyle:function(){var t=this,o=this.model.toJSON();t.updateColor&&clearTimeout(t.updateColor),t.updateColor=setTimeout(function(){var n=t.itemStyle({itemClass:t.itemClass,color:o.color,bgColor:o.backgroundColor,hoverColor:o.hoverColor,hoverBgColor:o.hoverBackgroundColor});e("style",t.el).html(n),t.updateColor=!1},100)}}),AWEContent.Views.IconItemController=AWEContent.Views.ItemController.extend({machineName:"icon",controllerHtml:function(){return'<div class="title-icon">Font Icon</div><i class="ic ac-icon-icon"><span>Icon</span></i>'},createItemModel:function(e){var t;return void 0!=e?(t=new AWEContent.Models.BoxModelSettings(e.boxModelSettings),e.boxModelSettings=t,new AWEContent.Models.IconItem(e)):new AWEContent.Models.IconItem({boxModelSettings:new AWEContent.Models.BoxModelSettings})}}),AWEContent.Views.IconPanel=AWEContent.Views.ItemPanel.extend({tagName:"div",className:"awe-obj-panel panel-icon",panelName:"icon",initPanel:function(){AWEContent.Views.ItemPanel.prototype.initPanel.call(this);var t=this;e("#custom-choose-icons .title-tab",t.el).click(function(){var t=e(this).closest("#custom-choose-icons");AWEContent.Panels.listIconPanel.processIcon(t)}),e("#custom-choose-icons",t.el).change(function(o,n){n&&(t.editingModel.set("nameIcon",n.nameIcon),e(".title-tab > i",this).removeClass().addClass(n.nameIcon))}),e("#icon-custom-size",t.el).change(function(o,n){t.editingModel.set("fontSize",n.value),-1==n.value&&e(".display-font",e(this)).text("DF")}),e("#icon-custom-line-height",t.el).change(function(o,n){t.editingModel.set("lineHeight",n.value),-1==n.value&&e(".display-font",e(this)).text("DF")}),e("#icon-custom-style",t.el).change(function(e,o){t.editingModel.set("styleIcon",o.value)}),e("#icon-custom-align",t.el).change(function(e,o){t.editingModel.set("iconAlign",o.value)}),e("#icon-custom-color",t.el).change(function(e,o){o=o?o.toRgbString():"",t.editingModel.set("color",o)}),e("#icon-custom-background",t.el).change(function(e,o){o=o?o.toRgbString():"",t.editingModel.set("backgroundColor",o)}),e("#icon-custom-hover",t.el).change(function(e,o){o=o?o.toRgbString():"",t.editingModel.set("hoverColor",o)}),e("#icon-custom-hover-background",t.el).change(function(e,o){o=o?o.toRgbString():"",t.editingModel.set("hoverBackgroundColor",o)}),e("#text-icon-custom-link",t.el).change(function(){t.editingModel.set("iconLink",e(this).val())}),e("#icon-column-box-model",t.el).initBoxModelPanel(t,"boxModelSettings"),e("#text-icon-custom-id",t.el).change(function(){t.editingModel.set("customID",e(this).val())}),e("#text-icon-custom-css",t.el).change(function(){t.editingModel.set("customClass",e(this).val())}),e("#icon-custom-attributes",this.el).initAttributesPanel(t),e("#icon-animations input[name=enabled_custom_animation]",this.el).change(function(o,n){t.editingModel.set("customEnableAnimations",parseInt(e(this).val())),n&&t.editingModel.set("customDataAnimations",JSON.stringify(n.animations))})},setPanelElementsValue:function(){var t=this,o=this.editingModel.toJSON();e("#custom-choose-icons",t.el).attr("data-name-icon",o.nameIcon),e("#custom-choose-icons i",t.el).removeClass().addClass(o.nameIcon),e("#icon-custom-size",t.el).aweSlider("value",o.fontSize),e("#icon-custom-line-height",t.el).aweSlider("value",o.lineHeight),e("#icon-custom-style",t.el).aweSelect("value",o.styleIcon),e("#icon-custom-align",t.el).aweSelect("value",o.iconAlign),e("#icon-custom-color",t.el).aweColorPicker("value",o.color),e("#icon-custom-background",t.el).aweColorPicker("value",o.backgroundColor),e("#icon-custom-hover",t.el).aweColorPicker("value",o.hoverColor),e("#icon-custom-hover-background",t.el).aweColorPicker("value",o.hoverBackgroundColor),e("#text-icon-custom-link",t.el).val(o.iconLink),e("#icon-column-box-model",t.el).initBoxModel(o.boxModelSettings),e("#text-icon-custom-id",t.el).val(o.customID),e("#text-icon-custom-css",t.el).val(o.customClass),e("#icon-custom-attributes",this.el).initAttributes(o.customEnableAttributes,o.customDataAttributes),e("#icon-animations input[name=enabled_custom_animation]",this.el).val(o.customEnableAnimations).trigger("change"),e("#icon-animations input[name=enabled_custom_animation]",this.el).attr("data-animations",o.customDataAnimations).data("view",this.editingModel.view)},buildPanel:function(){return{title:{type:"markup",markup:"<div><h2>Icon</h2></div>"},custom_definitions:{type:"section",custom_choose_icons:{type:"tabs_icon",title:'<div class="title-tab"><span>Choose Icons</span><i class=""></i></div>',tabs:[]},custom_size:{type:"slider",title:"Font Size",min_value:-1,unit:"px",max_value:100,default_value:100,allow_type:!0},custom_line_height:{type:"slider",title:"Line Spacing",unit:"px",min_value:-1,max_value:100,default_value:100,allow_type:!0},custom_style:{type:"select",title:"Style",options:{"awe-icon-plain":"Plain","awe-icon-circle":"Circle","awe-icon-square":"Square"},default_value:"awe-icon-plain"},custom_align:{type:"select",title:"Align",options:{"awe-icon-left":"Left","awe-icon-center":"Center","awe-icon-right":"Right"},default_value:"awe-icon-left"},custom_color:{type:"colorpicker",title:"Color",options:{preferredFormat:"rgb",AlphaVerticle:!0,showAlpha:!0,allowEmpty:!0,showInput:!0}},custom_background:{type:"colorpicker",title:"Background",options:{preferredFormat:"rgb",AlphaVerticle:!0,showAlpha:!0,allowEmpty:!0,showInput:!0}},custom_hover:{type:"colorpicker",title:"Hover color",options:{preferredFormat:"rgb",AlphaVerticle:!0,showAlpha:!0,allowEmpty:!0,showInput:!0}},custom_hover_background:{type:"colorpicker",title:"Hover background",options:{preferredFormat:"rgb",AlphaVerticle:!0,showAlpha:!0,allowEmpty:!0,showInput:!0}},custom_link:{type:"text_field",title:"Link",attributes:{placeholder:"http://..."},default_value:""}},custom_box_model:{type:"section",column_box_model:{type:"tabs",tabs:[{tab_title:"Border",contents:{custom_border:{type:"box_border",min_value:0,max_value:100,default_value:0}}},{tab_title:"Radius",contents:{custom_border_radius:{type:"box_model",model_type:"border_radius",allow_type:!0,min_value:0,max_value:100,default_value:0}}},{tab_title:"Padding",contents:{custom_padding:{type:"box_model",model_type:"padding",allow_type:!0,min_value:0,max_value:100,default_value:0}}},{tab_title:"Margin",contents:{custom_margin:{type:"box_model",model_type:"margin",allow_type:!0,min_value:0,max_value:100,default_value:0}}}]}},custom_style:{type:"section",custom_id:{type:"text_field",title:"ID",attributes:{placeholder:"Custom ID"},default_value:""},custom_css:{type:"text_field",title:"Class",attributes:{placeholder:"wrapper"},default_value:""},custom_attributes:{type:"custom_attributes"},animations:{type:"animations"}}}}}),e(document).ready(function(){AWEContent.Controllers.icon=new AWEContent.Views.IconItemController,AWEContent.Panels.icon=new AWEContent.Views.IconPanel})}(jQuery);