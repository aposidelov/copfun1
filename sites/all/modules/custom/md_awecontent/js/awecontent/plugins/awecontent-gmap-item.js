!function(e){"use strict";AWEContent.Models.GmapItem=AWEContent.Models.Item.extend({iconMarkerURL:"",defaults:{machine_name:"gmap",height:400,zoom:15,style:"style1",latLong:"21.001763, 105.820591",disableScrollZoom:0,enableCustomInfo:0,iconMarker:-1,infoTitle:"",infoDescriptions:"",boxModelSettings:{},customEnableAttributes:0,customID:"",customClass:"",customDataAttributes:"[] ",customActionAttributes:'{"newAction": "", "newAttrName": "", "newAttrValue": ""}',lgResponsive:!0,xsResponsive:!0,mediumResponsive:!0,smResponsive:!0},relations:[{type:Backbone.HasOne,key:"boxModelSettings",relatedModel:AWEContent.Models.BoxModelSettings}],createView:function(){this.view=new AWEContent.Views.GmapItem({model:this})},clone:function(){var t={};return e.each(this.toJSON(),function(e,o){t[e]=o}),t.boxModelSettings=new AWEContent.Models.BoxModelSettings(t.boxModelSettings),new AWEContent.Models.GmapItem(t)}}),AWEContent.Views.GmapItem=AWEContent.Views.Item.extend({initialize:function(){AWEContent.Views.Item.prototype.initialize.call(this),this.listenTo(this.model.get("boxModelSettings"),"change",this.applySettingsChanged)},renderItemContent:function(){var t=this,o=e('<div class="awe-item gmap-wrapper"><div class="gmap-content"></div></div>'),a=o,i=e(".gmap-content",o),l=t.model.toJSON(),n=isNaN(parseInt(l.iconMarker))?-1:l.iconMarker;return AWEContent.Library.addLibrary("googleMap",function(){var e=t.$el.data("init-number");t.$el.data("init-number",e+1),t.$el.trigger("gmapInitializeSuccess")}),a.css({display:"block",overflow:"auto"}),i.css({height:-1!=l.height?l.height+"px":""}).attr({"data-zoom":l.zoom,"data-style":l.style,"data-latlong":l.latLong,"data-info":l.enableCustomInfo,"data-title":l.infoTitle,"data-description":l.infoDescriptions,"data-icon":l.iconMarker,"data-disscroll":l.disableScrollZoom,id:l.customID}),i.renderItemDefaultAttributes(l.customEnableAttributes,l.customDataAttributes),i.renderItemDefaultBoxModel(l.boxModelSettings),t.$el.defaultResponsive(l),t.$el.data("init-number",0),t.$el.aweImageURL({fid:[n],styles:["none"],success:function(e,o,a,l){var s=t.$el.data("init-number");t.model.iconMarkerURL=n>0&&l[n].none?l[n].none:"",i.attr("data-icon",t.model.iconMarkerURL),t.$el.data("init-number",s+1),t.$el.trigger("gmapInitializeSuccess")}}),t.$el.bind("gmapInitializeSuccess",function(){2===t.$el.data("init-number")&&(t.$el.data("init-number",0),t.loadMap(i))}),o},loadMap:function(e){var t,o=this,a=o.model.toJSON(),i=a.enableCustomInfo,l=a.latLong.split(","),n=setInterval(function(){if(void 0!=AWEContent.windowIframe.google.maps.LatLng){clearInterval(n),t={zoom:parseInt(a.zoom),center:new AWEContent.windowIframe.google.maps.LatLng(l[0],l[1]),mapTypeId:AWEContent.windowIframe.google.maps.MapTypeId.Road},o.map=new AWEContent.windowIframe.google.maps.Map(e[0],t);var s=o.model.iconMarkerURL;o.marker=new AWEContent.windowIframe.google.maps.Marker({map:o.map,title:"Click to show info",icon:s,position:new AWEContent.windowIframe.google.maps.LatLng(l[0],l[1]),animation:AWEContent.windowIframe.google.maps.Animation.BOUNCE}),o.infowindow=new AWEContent.windowIframe.google.maps.InfoWindow({content:'<h2 style="color: #333;">'+a.infoTitle+'</h2><p style="color: #555;">'+a.infoDescriptions+"</p>"}),o.styles={style1:[{featureType:"landscape",stylers:[{saturation:-100},{lightness:65},{visibility:"on"}]},{featureType:"poi",stylers:[{saturation:-100},{lightness:51},{visibility:"simplified"}]},{featureType:"road.highway",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"road.arterial",stylers:[{saturation:-100},{lightness:30},{visibility:"on"}]},{featureType:"road.local",stylers:[{saturation:-100},{lightness:40},{visibility:"on"}]},{featureType:"transit",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"administrative.province",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"labels",stylers:[{visibility:"on"},{lightness:-25},{saturation:-100}]},{featureType:"water",elementType:"geometry",stylers:[{hue:"#ffff00"},{lightness:-25},{saturation:-97}]}],style2:[{featureType:"water",stylers:[{visibility:"on"},{color:"#acbcc9"}]},{featureType:"landscape",stylers:[{color:"#f2e5d4"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#c5c6c6"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#e4d7c6"}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#fbfaf7"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#c5dac6"}]},{featureType:"administrative",stylers:[{visibility:"on"},{lightness:33}]},{featureType:"road"},{featureType:"poi.park",elementType:"labels",stylers:[{visibility:"on"},{lightness:20}]},{},{featureType:"road",stylers:[{lightness:20}]}],style3:[{featureType:"water",stylers:[{color:"#46bcec"},{visibility:"on"}]},{featureType:"landscape",stylers:[{color:"#f2f2f2"}]},{featureType:"road",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road.highway",stylers:[{visibility:"simplified"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#444444"}]},{featureType:"transit",stylers:[{visibility:"off"}]},{featureType:"poi",stylers:[{visibility:"off"}]}],style4:[{featureType:"water",elementType:"geometry",stylers:[{color:"#000000"},{lightness:17}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:17}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:29},{weight:.2}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#000000"},{lightness:18}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#000000"},{lightness:16}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#000000"},{lightness:21}]},{elementType:"labels.text.stroke",stylers:[{visibility:"on"},{color:"#000000"},{lightness:16}]},{elementType:"labels.text.fill",stylers:[{saturation:36},{color:"#000000"},{lightness:40}]},{elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#000000"},{lightness:19}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:17},{weight:1.2}]}]},o.map.setOptions({styles:o.styles.style1}),o.map.setOptions(a.disableScrollZoom?{scrollwheel:!1}:{scrollwheel:!0}),AWEContent.windowIframe.google.maps.event.addListener(o.map,"zoom_changed",function(){o.changeSettingMap(o.map)}),AWEContent.windowIframe.google.maps.event.addListener(o.marker,"click",function(){o.infowindow.open(o.map,o.marker),o.marker.setAnimation(null!=o.marker.getAnimation()?null:google.maps.Animation.BOUNCE)}),i||o.marker.setMap(null)}},50)},changeSettingMap:function(t){var o=t.getZoom();AWEContent.Panels.gmap.editingModel?e("#gmap-zoom",AWEContent.Panels.gmap.el).aweSlider("value",o):this.model.set("zoom",o)},applySettingsChanged:function(t){var o=this,a=o.model.toJSON(),i=e(".gmap-content",o.$el),l=o.$el.height();e.each(t.changedAttributes(),function(l,n){switch(o.$el.changeResponsive(l,n),i.renderChangeSettingBoxModel(l,n,t),l){case"height":-1==n?i.css("height",""):i.css("height",n+"px"),AWEContent.windowIframe.google.maps.event.trigger(o.map,"resize");break;case"zoom":o.map&&("string"===e.type(n)&&(n=parseInt(n)),i.attr("data-zoom",n),o.map.setZoom(n));break;case"infoDescriptions":i.attr("data-description",n),o.infowindow.setContent('<h2 style="color: #333;">'+a.infoTitle+'</h2><p style="color: #555;">'+a.infoDescriptions+"</p>");break;case"infoTitle":i.attr("data-title",n),o.infowindow.setContent('<h2 style="color: #333;">'+a.infoTitle+'</h2><p style="color: #555;">'+a.infoDescriptions+"</p>");break;case"enableCustomInfo":i.attr("data-info",n),a.enableCustomInfo?o.marker.setMap(o.map):o.marker.setMap();break;case"iconMarker":i.attr("data-icon",o.model.iconMarkerURL),o.marker.setIcon(o.model.iconMarkerURL),o.marker.setMap(o.map);break;case"style":i.attr("data-style",n),o.map.setOptions({styles:o.styles[n]});break;case"latLong":var s=n.split(","),r=new AWEContent.windowIframe.google.maps.LatLng(s[0],s[1]);i.attr("data-latlong",n),o.marker.setPosition(r),o.map.setCenter(r);break;case"disableScrollZoom":var m=n?!1:!0;i.attr("data-disscroll",m),o.map.setOptions({scrollwheel:m});break;case"customClass":var c=o.model.previousAttributes().customClass;i.removeClass(c).addClass(n);break;case"customID":i.attr("id",n);break;case"customEnableAttributes":i.renderChangeSettingsAttributes(l,n,a.customDataAttributes);break;case"customActionAttributes":i.renderChangeSettingsAttributes(l,n)}}),setTimeout(function(){o.checkChangeHeight(l)},50)}}),AWEContent.Views.GmapItemController=AWEContent.Views.ItemController.extend({machineName:"gmap",controllerHtml:function(){return'<div class="title-icon">Google maps</div><i class="ic ac-icon-map"></i>'},createItemModel:function(e){var t;return void 0!=e?(t=new AWEContent.Models.BoxModelSettings(e.boxModelSettings),e.boxModelSettings=t,new AWEContent.Models.GmapItem(e)):new AWEContent.Models.GmapItem({boxModelSettings:new AWEContent.Models.BoxModelSettings})}}),AWEContent.Views.GmapPanel=AWEContent.Views.ItemPanel.extend({tagName:"div",className:"awe-obj-panel panel-gmap",panelName:"gmap",initPanel:function(){AWEContent.Views.ItemPanel.prototype.initPanel.call(this);var t=this;e("#gmap-height",t.$el).change(function(o,a){t.editingModel.set("height",a.value),-1==a.value&&e(".display-font",e(this)).text("DF")}),e("#gmap-zoom",t.$el).change(function(e,o){t.editingModel.set("zoom",o.value)}),e("#gmap-enter-link input",t.$el).change(function(){t.editingModel.set("latLong",e(this).val())}),e("#gmap-select-type",this.$el).change(function(e,o){t.editingModel.set("style",o.value)}),e("#gmap-scroll-zoom input",t.$el).change(function(o,a){a||t.editingModel.set("disableScrollZoom",parseInt(e(this).val()))}),e("#gmap-custom-info-active input",t.$el).change(function(o,a){if(!a){{t.editingModel.set("enableCustomInfo",e(this).val())}1==t.editingModel.get("enableCustomInfo")?e("#gmap-custom-info-active",t.el).nextAll().show():e("#gmap-custom-info-active",t.el).nextAll().hide()}}),e("#gmap-custom-info-marker .img-bg",t.$el).change(function(){var o=e("> input",this).val().trim(),a=o?JSON.parse(o):{fid:-1,file_url:""};t.editingModel.iconMarkerURL=a.file_url,t.editingModel.set("iconMarker",a.fid)}),e("#text-gmap-custom-info-title",t.$el).change(function(){t.editingModel.set("infoTitle",e(this).val())}),e("#textarea-gmap-custom-info-description",t.$el).change(function(){t.editingModel.set("infoDescriptions",e(this).val())}),e("#gmap-custom-id input",this.$el).change(function(){t.editingModel.set("customID",e(this).val())}),e("#gmap-custom-class input",this.$el).change(function(){t.editingModel.set("customClass",e(this).val())}),e("#gmap-column-box-model",t.el).initBoxModelPanel(t,"boxModelSettings"),e("#gmap-custom-attributes",this.el).initAttributesPanel(t)},setPanelElementsValue:function(){var t=this,o=t.editingModel.toJSON(),a=isNaN(parseInt(o.iconMaker))?-1:o.iconMaker;e("#gmap-height",t.el).aweSlider("value",o.height),e("#gmap-zoom",t.el).aweSlider("value",o.zoom),e("#gmap-enter-link #text-gmap-enter-link",t.$el).val(o.latLong),e("#gmap-select-type",t.el).aweSelect("value",o.style),e("#gmap-scroll-zoom input",t.el).val(o.disableScrollZoom).trigger("change",!0),e("#gmap-custom-info-active input",t.el).val(o.enableCustomInfo).trigger("change",!0),o.enableCustomInfo?e("#gmap-custom-info-active",t.el).nextAll().show():e("#gmap-custom-info-active",t.el).nextAll().hide(),e("#gmap-custom-info-marker .img-bg",t.el).css({"background-image":"url("+t.editingModel.iconMarkerURL+")"}),-1===a&&e("#gmap-custom-info-marker .delete-bg-img",t.el).hide(),e("#text-gmap-custom-info-title",t.el).val(o.infoTitle),e("#textarea-gmap-custom-info-description",t.el).val(o.infoDescriptions),e("#text-gmap-custom-id",t.el).val(o.customID),e("#text-gmap-custom-class",t.el).val(o.customClass),e("#gmap-column-box-model",t.el).initBoxModel(o.boxModelSettings),e("#gmap-custom-attributes",t.el).initAttributes(o.customEnableAttributes,o.customDataAttributes)},buildPanel:function(){return{title:{type:"markup",markup:'<div class="awe-title"><h2>Google map</h2></div>'},custom_attributes:{type:"section",enter_link:{type:"text_field",title:"latlong",attributes:{placeholder:"address"}},title:{type:"markup",markup:'<div class="small-quote"><span>Visit <a href="https://www.google.com/maps" target="_blank">Google maps </a>find your address and then click “Link” button to obtain your map link.</span></div>'},select_type:{type:"select",title:"Style",options:{style1:"Subtle Grayscale",style2:"Pale Dawn",style3:"Blue water",style4:"Shades of Grey"},default_value:"style1"},zoom:{type:"slider",title:"Zoom",values:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],default_value:8,allow_type:!0},height:{type:"slider",title:"Height",min_value:-1,max_value:999,default_value:300,allow_type:!0,unit:"px"},scroll_zoom:{type:"toggle",title:"Disable scroll to zoom",default_value:1}},custom_box_info:{type:"section",column_box_info:{type:"tabs",tabs:[{tab_title:"Informations",contents:{custom_info_active:{type:"toggle",title:"Enable",default_value:0},custom_info_marker:{type:"media",title:"Marker"},custom_info_title:{type:"text_field",title:"Title",default_value:""},custom_info_description:{type:"textarea_field",title:"Desctiption",default_value:""}}}]}},custom_box_model:{type:"section",column_box_model:{type:"tabs",tabs:[{tab_title:"Border",contents:{custom_border:{type:"box_border",min_value:0,max_value:100,default_value:0}}},{tab_title:"Radius",contents:{custom_border_radius:{type:"box_model",model_type:"border_radius",allow_type:!0,min_value:0,max_value:100,default_value:0}}},{tab_title:"Padding",contents:{custom_padding:{type:"box_model",model_type:"padding",allow_type:!0,min_value:0,max_value:100,default_value:0}}},{tab_title:"Margin",contents:{custom_margin:{type:"box_model",model_type:"margin",allow_type:!0,min_value:0,max_value:100,default_value:0}}}]}},custom_definitions:{type:"section",custom_id:{type:"text_field",title:"ID",attributes:{placeholder:"Custom ID"},default_value:""},custom_class:{type:"text_field",title:"CSS class",attributes:{placeholder:"Custom class"},default_value:""},custom_attributes:{type:"custom_attributes"}}}}}),e(document).ready(function(){AWEContent.Controllers.gmap=new AWEContent.Views.GmapItemController,AWEContent.Panels.gmap=new AWEContent.Views.GmapPanel})}(jQuery);