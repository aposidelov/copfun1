!function(e){"use strict";AWEContent.Models.TableCol=Backbone.RelationalModel.extend({defaults:{tagName:"td",content:"cell"}}),AWEContent.Collections.TableColList=Backbone.Collection.extend({model:AWEContent.Models.TableCol}),AWEContent.Views.TableColView=Backbone.View.extend({tagName:function(){return this.model.get("tagName")},className:function(){return this.model.get("className")},initialize:function(){this.listenTo(this.model,"destroy",this.destroy)},render:function(){var t=this;if("col"==this.model.get("tagName")){var l=this.model.get("colWidth")||"";this.$el.html(this.model.get("content")),this.$el.css({width:l})}else{this.$el.html('<div class="content" >'+this.model.get("content")+"</div>");var o,a;AWEContent.jqIframe(".content",this.el).hallo({plugins:{halloformat:{formattings:{bold:!0,italic:!0,underline:!0,strikethrough:!0}},hallojustify:{},hallolists:{lists:{ordered:!0,unordered:!0}}},create:function(){this.addEventListener("paste",function(e){e.preventDefault();var t=e.clipboardData.getData("text/plain");AWEContent.documentIframe.execCommand("insertHTML",!1,t)})},editable:!0,deactivated:function(l){t.changeContent(l),a=e(l.target).height(),a!=o&&e(l.target).closest(".awe-section").trigger("resize")}})}},destroy:function(){this.remove()},changeContent:function(t){var l=e(t.currentTarget).html();this.model.set("content",l)}}),AWEContent.Models.TableRow=Backbone.RelationalModel.extend({defaults:{type:"tbody",colums:[]},relations:[{type:Backbone.HasMany,key:"colums",relatedModel:AWEContent.Models.TableCol,relatedCollection:AWEContent.Collections.TableColList}],clone:function(){var e=new AWEContent.Collections.TableColList;return this.get("colums").each(function(t){e.add(t.clone())}),new AWEContent.Models.TableRow({colums:e})}}),AWEContent.Views.TableRowView=Backbone.View.extend({tagName:"tr",type:function(){return this.model.get("type")},initialize:function(){this.listenTo(this.model.get("colums"),"add",this.addColum),this.listenTo(this.model,"destroy",this.destroy)},render:function(){var e=this;this.model.get("colums").each(function(t){var l=new AWEContent.Views.TableColView({model:t});l.render(),e.$el.append(l.$el)})},destroy:function(){this.remove()},addColum:function(e){var t=new AWEContent.Views.TableColView({model:e});t.render(),this.$el.append(t.$el)}}),AWEContent.Collections.TableRowList=Backbone.Collection.extend({model:AWEContent.Models.TableRow}),AWEContent.Models.TableItem=AWEContent.Models.Item.extend({defaults:{machine_name:"table",title:"Title Tables",TableColums:3,TableRows:3,TableHeader:1,TableFooter:1,EqualColum:0,ColOddBG:"",ColEvenBG:"",RowOddBG:"",RowEvenBG:"",CellBorderEnable:1,CellPaddingEnable:0,customID:"",customClass:"",customEnableAttributes:0,customDataAttributes:"[] ",customActionAttributes:'{"newAction": "", "newAttrName": "", "newAttrValue": ""}',customEnableAnimations:0,customDataAnimations:'{"type" : "none"}',cellModelSettings:{},boxModelSettings:{},content:[],lgResponsive:!0,xsResponsive:!0,mediumResponsive:!0,smResponsive:!0},relations:[{type:Backbone.HasMany,key:"content",relatedModel:AWEContent.Models.TableRow,relatedCollection:AWEContent.Collections.TableRowList},{type:Backbone.HasOne,key:"boxModelSettings",relatedModel:AWEContent.Models.BoxModelSettings},{type:Backbone.HasOne,key:"cellModelSettings",relatedModel:AWEContent.Models.BoxModelSettings}],createView:function(){this.view=new AWEContent.Views.TableItem({model:this})},clone:function(){var t={};return e.each(this.toJSON(),function(e,l){t[e]=l}),t.boxModelSettings=new AWEContent.Models.BoxModelSettings(t.boxModelSettings),t.cellModelSettings=new AWEContent.Models.BoxModelSettings(t.cellModelSettings),new AWEContent.Models.TableItem(t)}}),AWEContent.Views.TableItem=AWEContent.Views.Item.extend({styleTemplate:_.template("            <%= classtable  %> tbody tr:nth-child(odd) { background-color: <%= rowoddbg  %>;}            <%= classtable  %> tbody tr:nth-child(even) { background-color: <%= rowevenbg  %>;}            <%= classtable  %> colgroup col:nth-child(odd) { background-color: <%= coloddbg  %>;}            <%= classtable  %> colgroup col:nth-child(even) { background-color: <%= colevenbg  %>;}        "),initialize:function(){AWEContent.Views.Item.prototype.initialize.call(this);var e=this;e.rowResize(),this.listenTo(this.model.get("content"),"add",this.addRow),this.listenTo(this.model.get("boxModelSettings"),"change",this.applySettingsChanged),this.listenTo(this.model.get("cellModelSettings"),"change",this.applySettingsChanged)},renderItemContent:function(){var t=this,l=e("<table></table>"),o=(e("<thead></thead>"),e("<tfoot></tfoot>"),e('<div class="awe-item awe-table '+t.cid+'"></div>')),a=t.model.toJSON(),n=this.styleTemplate({classtable:"."+t.cid,rowoddbg:a.RowOddBG,rowevenbg:a.RowEvenBG,coloddbg:a.ColOddBG,colevenbg:a.ColEvenBG});if(l.append("<thead></thead>").append("<tbody></tbody>").append("<tfoot></tfoot>"),this.model.get("content").each(function(e){var t=new AWEContent.Views.TableRowView({model:e});switch(t.render(),e.get("type")){case"colgroup":var o=new AWEContent.Views.TableRowView({model:e,tagName:"colgroup"});o.render(),l.prepend(o.$el);break;case"theader":l.find("thead").append(t.$el);break;case"tbody":l.find("tbody").append(t.$el);break;case"tfooter":l.find("tfoot").append(t.$el)}}),a.TableHeader||e("thead",l).hide(),a.TableFooter||e("tfoot",l).hide(),l.attr("id",a.customID).addClass(a.customClass),o.prepend(l),o.append('<style class="table-style">'+n+"</style>"),l.renderItemDefaultBoxModel(a.boxModelSettings),l.renderItemDefaultAttributes(a.customEnableAttributes,a.customDataAttributes),a.customEnableAnimations){var i=a.customDataAnimations;o.processAnimations(i)}o.append('<style class="cell-border"></style>'),o.append('<style class="cell-padding"></style>');var d=e(".cell-border",o),s=e(".cell-padding",o),r=a.cellModelSettings;if(0==r.enabledCustomBorder)d.html("");else if(1==r.enabledCustomBorder){var c="";1==r.enabledConstraintBorder?c="."+t.cid+" table td, ."+t.cid+" table th{border: "+r.borderTop+"}":(c="."+t.cid+" table td, ."+t.cid+" table th {border-top: "+r.borderTop+"}",c+="."+t.cid+" table td, ."+t.cid+" table th {border-bottom: "+r.borderBottom+"}",c+="."+t.cid+" table td, ."+t.cid+" table th {border-left: "+r.borderLeft+"}",c+="."+t.cid+" table td, ."+t.cid+" table th {border-right: "+r.borderRight+"}"),o.find(".cell-border").length?d.html(c):o.append('<style class="cell-border">'+c+"</style>")}if(0==r.enabledCustomPadding)s.html("");else if(1==r.enabledCustomPadding){var b="";1==r.enabledConstraintPadding?b="."+t.cid+" table td, ."+t.cid+" table th{padding: "+r.paddingTop+"px}":(b="."+t.cid+" table td, ."+t.cid+" table th {padding-top: "+r.paddingTop+"px}",b+="."+t.cid+" table td, ."+t.cid+" table th {padding-bottom: "+r.paddingBottom+"px}",b+="."+t.cid+" table td, ."+t.cid+" table th {padding-left: "+r.paddingLeft+"px}",b+="."+t.cid+" table td, ."+t.cid+" table th {padding-right: "+r.paddingRight+"px}"),o.find(".cell-padding").length?s.html(b):o.append('<style class="cell-padding">'+b+"</style>")}return t.$el.defaultResponsive(a),o},applySettingsChanged:function(t){var l=this,o=t,a=l.model.toJSON(),n=a.cellModelSettings,i=e(".awe-item",l.el),d=e("table",l.el),s=(e(".awe-table tbody td",l.el),l.$el.height());e.each(t.changed,function(t,s){switch(l.$el.changeResponsive(t,s),d.renderChangeSettingBoxModel(t,s,o),t){case"TableColums":l.model.get("content").each(function(e){var t=e.get("colums").length,l=s>t?s-t:t-s;if(s>t)for(var o=0;l>o;o++){var a="theader"==e.get("type")?"th":"colgroup"==e.get("type")?"col":"td",n="theader"==e.get("type")?"Header":"tfooter"==e.get("type")?"Footer":"colgroup"==e.get("type")?"":"cell",i=new AWEContent.Models.TableCol({tagName:a,content:n});e.get("colums").add(i)}else for(var d=0;l>d;d++){var r=e.get("colums").pop();r.destroy()}}),l.rowResize(),l.$el.closest(".awe-section").trigger("resize");break;case"TableRows":var r=(l.model.get("TableHeader"),l.model.get("TableFooter"),l.model.get("content").length),c=s+3;if(c>r)for(var b=0;c-r>b;b++){var u=l.model.get("content").models[1].clone();u.set({type:"tbody"}),u.get("colums").each(function(e){e.set({tagName:"td",content:"cell"})}),l.model.get("content").add(u)}else for(var m=l.model.get("content"),g=m.length-1,h=r-c;h&&-1!=g;){var p=l.model.get("content").at(g);"tbody"==p.get("type")&&(h--,m.remove(p),p.destroy()),g--}l.$el.closest(".awe-section").trigger("resize");break;case"TableHeader":{l.model.get("content").models}e("thead th",l.el).css("width",""),e("tr:first-child td",l.el).css("width",""),0==s?(e(".awe-table thead",l.$el).hide(),l.iframeJQuery("tbody tr:first td",l.el).resizable("enable").find(".ui-resizable-handle").css("width","")):(e(".awe-table thead",l.$el).show(),l.iframeJQuery("tbody tr:first td",l.el).resizable("disable").find(".ui-resizable-handle").css("width","0")),l.$el.closest(".awe-section").trigger("resize");break;case"TableFooter":0==s?e(".awe-table tfoot",l.$el).hide():e(".awe-table tfoot",l.$el).show(),l.$el.closest(".awe-section").trigger("resize");break;case"EqualColum":e(".awe-table style.table-col-with",l.el).length||e(".awe-table",l.el).append('<style class="table-col-with"></style>'),0==s?e(".awe-table style.table-col-with",l.el).html(""):(e(".awe-table td, .awe-table th, .awe-table col",l.$el).attr("style",""),e(".awe-table style.table-col-with",l.el).html(".awe-table."+l.cid+" >table >colgroup >col {width: 1%;}")),l.$el.closest(".awe-section").trigger("resize");break;case"RowOddBG":case"RowEvenBG":case"ColOddBG":case"ColEvenBG":l.updateColor&&clearTimeout(l.updateColor),l.updateColor=setTimeout(function(){var t=l.styleTemplate({classtable:"."+l.cid,rowoddbg:a.RowOddBG,rowevenbg:a.RowEvenBG,coloddbg:a.ColOddBG,colevenbg:a.ColEvenBG});e(".awe-table style.table-style",l.el).length?e(".awe-table style.table-style",l.el).html(t):e(".awe-table",l.el).append('<style class="table-style">'+t+"</style>"),l.updateColor=!1},100);break;case"customID":d.attr("id",s);break;case"customClass":var w=l.model.previousAttributes().customClass;d.removeClass(w).addClass(s);break;case"customEnableAttributes":d.renderChangeSettingsAttributes(t,s,a.customDataAttributes);break;case"customActionAttributes":d.renderChangeSettingsAttributes(t,s);break;case"customEnableAnimations":var C,f;s?(C=a.customDataAnimations,f=null,i.processAnimations(C)):(C=null,f=a.customDataAnimations,i.processAnimations(C,f));break;case"customDataAnimations":var C,f;C=a.customDataAnimations,f=l.model.previousAttributes().customDataAnimations,i.processAnimations(C,f);break;default:if("box"!=o.get("nameBox")){if(0==n.enabledCustomBorder)e("style.cell-border",l.el).html("");else if(1==n.enabledCustomBorder){var v="";1==n.enabledConstraintBorder?v="."+l.cid+" table td, ."+l.cid+" table th{border: "+n.borderTop+"}":(v="."+l.cid+" table td, ."+l.cid+" table th {border-top: "+n.borderTop+"}",v+="."+l.cid+" table td, ."+l.cid+" table th {border-bottom: "+n.borderBottom+"}",v+="."+l.cid+" table td, ."+l.cid+" table th {border-left: "+n.borderLeft+"}",v+="."+l.cid+" table td, ."+l.cid+" table th {border-right: "+n.borderRight+"}"),e("style.cell-border",l.el).length?e("style.cell-border",l.el).html(v):e(".awe-table",l.el).append('<style class="cell-border">'+v+"</style>")}if(0==n.enabledCustomPadding)e("style.cell-padding",l.el).html("");else if(1==n.enabledCustomPadding){var y="";1==n.enabledConstraintPadding?y="."+l.cid+" table td, ."+l.cid+" table th{padding: "+n.paddingTop+"px}":(y="."+l.cid+" table td, ."+l.cid+" table th {padding-top: "+n.paddingTop+"px}",y+="."+l.cid+" table td, ."+l.cid+" table th {padding-bottom: "+n.paddingBottom+"px}",y+="."+l.cid+" table td, ."+l.cid+" table th {padding-left: "+n.paddingLeft+"px}",y+="."+l.cid+" table td, ."+l.cid+" table th {padding-right: "+n.paddingRight+"px}"),e("style.cell-padding",l.el).length?e("style.cell-padding",l.el).html(y):e(".awe-table",l.el).append('<style class="cell-padding">'+y+"</style>")}l.$el.closest(".awe-section").trigger("resize")}}}),setTimeout(function(){l.checkChangeHeight(s)},100)},addRow:function(t){var l=new AWEContent.Views.TableRowView({model:t});switch(l.render(),t.get("type")){case"theader":e("table thead",this.$el).append(l.$el);break;case"tbody":e("table tbody",this.$el).append(l.$el);break;case"tfooter":e("table tfoot",this.$el).append(l.$el)}},rowResize:function(){var t=this,l=t.model.toJSON();t.iframeJQuery("th:not(.ui-resizable), tbody tr:first td:not(.ui-resizable)",t.el).resizable({handles:"e",start:function(){var l=e(this).index();t.model.set("EqualColum",0,{updateToPanel:!0}),e("col",t.el).eq(l).css("width","")},stop:function(l,o){var a=e(this).index(),n=o.size.width,i=t.model.get("content").at(0).get("colums").at(a);t.iframeJQuery("col",t.el).eq(a).css({width:n}),i.set({colWidth:n})}}),l.TableHeader?t.iframeJQuery("tbody tr:first td",t.el).resizable("disable").find(".ui-resizable-handle").css("width","0"):(t.iframeJQuery("tbody tr:first td",t.el).resizable("enable").find(".ui-resizable-handle").css("width",""),t.iframeJQuery("thead",t.el).hide())}}),AWEContent.Views.TableItemController=AWEContent.Views.ItemController.extend({machineName:"table",controllerHtml:function(){return'<div class="title-icon">Table</div><i class="ic ac-icon-table"></i>'},createItemModel:function(t){if(t){t.cellModelSettings=new AWEContent.Models.BoxModelSettings(t.cellModelSettings),t.boxModelSettings=new AWEContent.Models.BoxModelSettings(t.boxModelSettings);{var l=new AWEContent.Collections.TableRowList;t.content.length}return e.each(t.content,function(t,o){var a=new AWEContent.Models.TableRow;e.each(o.colums,function(e,t){var l=new AWEContent.Models.TableCol(t);a.get("colums").add(l)}),o.colums=a.get("colums"),l.add(o)}),t.content=l,new AWEContent.Models.TableItem(t)}var o=new AWEContent.Models.BoxModelSettings({nameBox:"cell"}),a=new AWEContent.Models.BoxModelSettings({nameBox:"box"}),n=new AWEContent.Models.TableCol({tagName:"th",content:"Header"}),i=new AWEContent.Models.TableCol({tagName:"col",content:""}),d=new AWEContent.Models.TableCol,s=new AWEContent.Models.TableCol({content:"Footer"}),r=new AWEContent.Models.TableRow({type:"colgroup",tagName:"colgroup",colums:[i,i.clone(),i.clone()]}),c=new AWEContent.Models.TableRow({type:"theader",colums:[n,n.clone(),n.clone()]}),b=new AWEContent.Models.TableRow({type:"tbody",colums:[d,d.clone(),d.clone()]}),u=new AWEContent.Models.TableRow({type:"tfooter",colums:[s,s.clone(),s.clone()]}),m=new AWEContent.Collections.TableRowList([r,c,b,b.clone(),b.clone(),u]);return new AWEContent.Models.TableItem({cellModelSettings:o,boxModelSettings:a,content:m})}}),AWEContent.Views.TablePanel=AWEContent.Views.ItemPanel.extend({tagName:"div",className:"awe-obj-panel panel-table",panelName:"table",initPanel:function(){AWEContent.Views.ItemPanel.prototype.initPanel.call(this);var t=this;e("#table-number-colums",t.el).change(function(e,l){t.editingModel.set("TableColums",l.value)}),e("#table-number-rows",t.el).change(function(e,l){t.editingModel.set("TableRows",l.value)}),e("#table-enable-header input",t.el).change(function(l,o){o||t.editingModel.set("TableHeader",parseInt(e(this).val()))}),e("#table-enable-footer input",t.el).change(function(l,o){o||t.editingModel.set("TableFooter",parseInt(e(this).val()))}),e("#table-equal-colum-width input",t.el).change(function(l,o){o||t.editingModel.set("EqualColum",e(this).val())}),e("#table-odd-col-background",t.el).change(function(e,l){l=l?l.toRgbString():"",t.editingModel.set("ColOddBG",l)}),e("#table-even-col-background",t.el).change(function(e,l){l=l?l.toRgbString():"",t.editingModel.set("ColEvenBG",l)}),e("#table-odd-row-background",t.el).change(function(e,l){l=l?l.toRgbString():"",t.editingModel.set("RowOddBG",l)}),e("#table-even-row-background",t.el).change(function(e,l){l=l?l.toRgbString():"",t.editingModel.set("RowEvenBG",l)}),e("#table-column-box-model",t.el).initBoxModelPanel(t,"boxModelSettings"),e("#table-column-box-model-cell",t.el).initBoxModelPanel(t,"cellModelSettings"),e("#text-table-custom-id",t.el).change(function(){t.editingModel.set("customID",e(this).val())}),e("#text-table-custom-class",t.el).change(function(){t.editingModel.set("customClass",e(this).val())}),e("#table-custom-attributes",this.el).initAttributesPanel(t),e("#table-animations input[name=enabled_custom_animation]",this.el).change(function(l,o){t.editingModel.set("customEnableAnimations",parseInt(e(this).val())),o&&t.editingModel.set("customDataAnimations",JSON.stringify(o.animations))})},setPanelElementsValue:function(){var t=this,l=this.editingModel.toJSON();e("#table-number-colums",t.el).aweSlider("value",l.TableColums),e("#table-number-rows",t.el).aweSlider("value",l.TableRows),e("#table-enable-header input",t.el).val(l.TableHeader).trigger("change",!0),e("#table-enable-footer input",t.el).val(l.TableFooter).trigger("change",!0),e("#table-equal-colum-width input",t.el).val(l.EqualColum).trigger("change",!0),e("#table-odd-row-background",this.el).aweColorPicker("value",l.RowOddBG),e("#table-even-row-background",this.el).aweColorPicker("value",l.RowEvenBG),e("#table-odd-col-background",this.el).aweColorPicker("value",l.ColOddBG),e("#table-even-col-background",this.el).aweColorPicker("value",l.ColEvenBG),e("#table-column-box-model",this.el).initBoxModel(l.boxModelSettings),e("#table-column-box-model-cell",this.el).initBoxModel(l.cellModelSettings),e("#text-table-custom-id",this.el).val(l.customID),e("#text-table-custom-class",this.el).val(l.customClass),e("#table-custom-attributes",this.el).initAttributes(l.customEnableAttributes,l.customDataAttributes),e("#table-animations input[name=enabled_custom_animation]",this.el).val(l.customEnableAnimations).trigger("change"),e("#table-animations input[name=enabled_custom_animation]",this.el).attr("data-animations",l.customDataAnimations).data("view",this.editingModel.view),this.editingModel.isFirstEdit||(this.listenTo(this.editingModel,"change:EqualColum",this.updateEqualColumnController),this.editingModel.isFirstEdit=1)},updateEqualColumnController:function(t,l,o){o.updateToPanel&&e("#table-equal-colum-width input",this.$el).val(l).trigger("change",!0)},buildPanel:function(){return{title:{type:"markup",markup:'<div class="awe-title"><h2>Table</h2></div>'},custom_attributes:{type:"section",number_colums:{type:"slider",title:"Columns",values:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],default_value:4,allow_type:!0},number_rows:{type:"slider",title:"Rows",values:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],default_value:4,allow_type:!0},enable_header:{type:"toggle",title:"Table header",default_value:1},enable_footer:{type:"toggle",title:"Table footer",default_value:1},equal_colum_width:{type:"toggle",title:"Equal column width",default_value:0}},custom_background:{type:"section",odd_row_background:{type:"colorpicker",title:"Odd row background",options:{preferredFormat:"rgb",AlphaVerticle:!0,showAlpha:!0,allowEmpty:!0,showInput:!0}},even_row_background:{type:"colorpicker",title:"Even row background",options:{preferredFormat:"rgb",AlphaVerticle:!0,showAlpha:!0,allowEmpty:!0,showInput:!0}},odd_col_background:{type:"colorpicker",title:"Odd Col background",options:{preferredFormat:"rgb",AlphaVerticle:!0,showAlpha:!0,allowEmpty:!0,showInput:!0}},even_col_background:{type:"colorpicker",title:"Even col background",options:{preferredFormat:"rgb",AlphaVerticle:!0,showAlpha:!0,allowEmpty:!0,showInput:!0}}},custom_cell:{type:"section",column_box_model_cell:{type:"tabs",tabs:[{tab_title:"Cell Border",contents:{custom_border_cell:{type:"box_border",min_value:0,max_value:100,default_value:0}}},{tab_title:"Cell padding",contents:{custom_padding_cell:{type:"box_model",model_type:"padding",allow_type:!0,min_value:0,max_value:100,default_value:0}}}]}},custom_box_model:{type:"section",column_box_model:{type:"tabs",tabs:[{tab_title:"Border",contents:{custom_border:{type:"box_border",min_value:0,max_value:100,default_value:0}}},{tab_title:"Radius",contents:{custom_border_radius:{type:"box_model",model_type:"border_radius",allow_type:!0,min_value:0,max_value:100,default_value:0}}},{tab_title:"Margin",contents:{custom_margin:{type:"box_model",model_type:"margin",allow_type:!0,min_value:0,max_value:100,default_value:0}}}]}},custom_definitions:{type:"section",custom_id:{type:"text_field",title:"ID",attributes:{placeholder:"Custom ID"},default_value:""},custom_class:{type:"text_field",title:"CSS class",attributes:{placeholder:"Custom class"},default_value:""},custom_attributes:{type:"custom_attributes"},animations:{type:"animations"}}}}}),e(document).ready(function(){AWEContent.Controllers.table=new AWEContent.Views.TableItemController,AWEContent.Panels.table=new AWEContent.Views.TablePanel})}(jQuery);