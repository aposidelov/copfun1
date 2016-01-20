!function(e){"use strict";AWEContent.Models.SectionSettings=Backbone.RelationalModel.extend({bgImageURL:"",defaults:{customID:"",customClass:"",customEnableAttributes:0,customDataAttributes:"[]",customActionAttributes:'{"newAction": "", "newAttrName": "", "newAttrValue": ""}',enabledFullScreen:0,enabledFluid:0,equalRowHeight:0,rowSpacing:-1,bgColor:"",bgFid:-1,bgImage:"",bgMode:"repeat",bgPosition:"center center",enableScrolling:0,enabledBgOverlay:0,bgOverlayColor:"",enableBackgroundVideo:0,bgVideoUrl:"",enableAutoPlayVideo:1,enableShowButton:0,enableMute:0,boxModelSettings:{},lgResponsive:!0,xsResponsive:!0,mediumResponsive:!0,smResponsive:!0,hoverResponsive:!1},relations:[{type:Backbone.HasOne,key:"boxModelSettings",relatedModel:AWEContent.Models.BoxModelSettings}],clone:function(){var t={};return e.each(this.toJSON(),function(e,n){t[e]=n}),t.boxModelSettings=new AWEContent.Models.BoxModelSettings(t.boxModelSettings),new AWEContent.Models.SectionSettings(t)}}),AWEContent.Models.Section=Backbone.RelationalModel.extend({defaults:{columns:[],settings:{}},relations:[{type:Backbone.HasOne,key:"settings",relatedModel:AWEContent.Models.SectionSettings,reverseRelation:{key:"section",type:Backbone.HasOne}}],clone:function(){var e=new AWEContent.Collections.ListColumn,t=this.get("settings").clone();return this.get("columns").each(function(t){e.add(t.clone())}),new AWEContent.Models.Section({columns:e,settings:t})}}),AWEContent.Views.Section=Backbone.View.extend({tagName:"section",className:"awe-section creating",template:_.template('<div class="container"></div>            <div class="awe-custom custom-section">                <ul>                    <li class="js-section-move"><i class="ic ac-icon-move"></i></li>                    <li class="js-add-column"><i class="ic ac-icon-add"></i></li>                    <li class="toogle-pull js-edit-section" data-it="edit-section"><i class="ic ac-icon-edit"></i></li>                    <li class="cus-show-more">                        <i class="ic ac-icon-ellipsis-h"></i>                        <ul class="cus-more-contain">                            <li class="js-clone-section"><i class="ic ac-icon-clone"></i></li>                            <li class="totrash js-delete-section"><i class="ic ac-icon-trash"></i></li>                            <li class="js-save-section cus-res-mode cus-save"><i class="ic ac-icon-save"></i></li>                        </ul>                    </li>                </ul>            </div>'),events:{"click > .custom-section .js-add-column":"addColumn","click > .custom-section .js-edit-section":"editSectionSettings","click > .custom-section .js-clone-section":"cloneSection","click > .custom-section .js-delete-section":"destroy","click > .custom-section .js-save-section":"saveSection"},initialize:function(){var t=this;this.model.set("connectSpacingToColumn",!1),this.listenTo(this.model.get("settings"),"change",this.renderChangeSectionSetting),this.listenTo(this.model.get("settings").get("boxModelSettings"),"change",this.renderChangeSectionSetting),this.listenTo(this.model.get("columns"),"add",this.listenChangeListColumn),this.listenTo(this.model.get("columns"),"remove",this.listenChangeListColumn),this.listenTo(this.model,"change",this.listenChangeListColumn),this.render(),this.$el.resize(function(e,n){t.sectionResize(e,n)}),e(window).resize(function(){t.fullScreen(),t.processResize()}),this.$el.bind("getImageURLSuccess",function(){})},sectionResize:function(e,t){void 0==t&&this.processEqualRowHeight(),this.processResize(t)},processEqualRowHeight:function(){var t=this,n=t.model.get("settings"),o=n.get("equalRowHeight");if(o){var s=0;e.each(e("> .container > .row > .awe-col > .awe-col-content > .awe-col-wrapper",t.$el),function(){e(this).css("min-height",""),s=e(this).height()>s?e(this).height():s}),t.model.get("columns").each(function(e){e.get("settings").unset("heightEqual",{silent:!0}).set({enableMinHeight:0,heightEqual:s}),e.get("settings").get("heightEqual")}),t.$el.addClass("awe-equal-column")}else t.model.get("columns").each(function(e){e.get("settings").set({enableMinHeight:1,heightEqual:-1})}),t.$el.removeClass("awe-equal-column");this.processResize()},render:function(){var t=new AWEContent.Views.ListColumn({collection:this.model.get("columns")});this.$el.append(this.template()),e("> .container",this.$el).append(t.$el),this.$el.addClass("awe-model-"+this.model.cid),this.$el.mouseover(function(t){e(this).addClass("hover"),t.stopPropagation()}).mouseout(function(t){e(this).removeClass("hover"),t.stopPropagation()}),this.renderSectionSetting()},addColumn:function(){var e=new AWEContent.Models.BoxModelSettings,t=new AWEContent.Models.Column({classes:new AWEContent.Models.BootstrapGrid,items:new AWEContent.Collections.ListItem,settings:new AWEContent.Models.ColumnSettings({boxModelSettings:e})});this.model.get("columns").add(t)},editSectionSettings:function(){AWEContent.Panels.section.editModel(this.model)},cloneSection:function(){var e=this.model.clone(),t=this.model.collection.indexOf(this.model);this.model.collection.add(e,{at:t+1})},destroy:function(){var e=this,t=AWEContent.Panels.section,n=e.model.get("columns");t.isOpenned&&t.$el.data("model.id")==this.model.cid&&(t.$el.removeAttr("data-model.id"),t.closePanel()),n.each(function(e){e.removePanelView()}),this.model.collection.remove(this.model),this.model.destroy(),this.remove()},saveSection:function(){AWEContent.templateDialog.savedElement=this.$el,AWEContent.templateDialog.type="section",AWEContent.templateDialog.open({title:"",data:this.model.toJSON(),category:"custom"})},renderSectionSetting:function(){{var t=this,n=t.model.get("settings").toJSON(),o=t.$el;e("> .container",o)}if(t.$overlay=e('<div class="section-bg-overlay custom-overlay"></div>'),o.attr("id",n.customID),n.customEnableAttributes&&""!=n.customDataAttributes){var s=e.parseJSON(n.customDataAttributes);e.each(s,function(e,t){o.attr("data-"+t.attrName,t.attrValue)})}n.customClass&&t.$el.addClass(n.customClass),t.fullScreen(),(n.enabledFluid||AWEContent.alwaysFluid)&&e(" > .container",t.$el).css("width","100%"),this.$el.aweImageURL({fid:[n.bgFid],styles:["none"],success:function(e,n,o,s){t.getBackgroundImageURL(e,n,o,s)}}),"parallax"==n.bgMode?t.$el.attr("data-parallax",!0):t.$el.attr("data-parallax",!1),t.$el.attr("data-scrolling",n.enableScrolling?!0:!1),AWEContent.jqIframe(t.el).parallax(),""!=n.enableBackgroundVideo&&t.setVideo(),n.enabledBgOverlay&&(o.prepend(t.$overlay),t.$overlay.css("background-color",n.bgOverlayColor)),o.renderItemDefaultBoxModel(n.boxModelSettings,t.$overlay),t.$el.defaultResponsive(n);var a=setInterval(function(){e("> .container > .row > .awe-col:eq(0) >.ui-resizable-handle",t.el).length&&(clearInterval(a),t.processEqualRowHeight())},50)},renderChangeSectionSetting:function(t,n){var o=this,s=o.$el,a=e("> .container",s);e.each(t.changed,function(i,l){switch(o.$el.changeResponsive(i,l),s.renderChangeSettingBoxModel(i,l,t,o.$overlay),i){case"customID":s.attr("id",l);break;case"customClass":var c=t.previousAttributes().customClass;c&&s.removeClass(c),s.addClass(l);break;case"customEnableAttributes":if("[]"!=t.get("customDataAttributes")){var r=[];r=e.parseJSON(t.get("customDataAttributes")),e.each(r,function(e,t){l?s.attr("data-"+t.attrName,t.attrValue):s.removeAttr("data-"+t.attrName)})}break;case"customDataAttributes":n&&n.action&&n.data&&("addAttr"==n.action||"updateAttr"==n.action?s.attr(n.data.attrName,n.data.attrValue):s.removeAttr(n.data.attrName));break;case"enabledFullScreen":o.fullScreen(),o.$el.resize();break;case"enabledFluid":l||AWEContent.alwaysFluid?a.css("width","100%"):a.css("width","");break;case"rowSpacing":o.setSpacingColumn();break;case"equalRowHeight":o.processEqualRowHeight();break;case"bgColor":case"bgFid":case"bgPosition":o.processBackground(t.toJSON(),s);break;case"bgMode":"parallax"==l?o.$el.attr("data-parallax",!0):o.$el.attr("data-parallax",!1),o.processBackground(t.toJSON(),s);break;case"enableScrolling":l?o.$el.attr("data-scrolling",!0):o.$el.attr("data-scrolling",!1);break;case"enabledBgOverlay":l?e(">.container",o.el).before(o.$overlay):e("> .section-bg-overlay",s).remove();break;case"bgOverlayColor":o.$overlay.css("background-color",l);break;case"enableBackgroundVideo":l?o.setVideo():(e("> .frame-embed",o.$el).remove(),o.processBackground(t.toJSON(),s));break;case"bgVideoUrl":o.setVideo();break;case"enableAutoPlayVideo":o.setVideo();break;case"enableMute":if("object"==typeof o.player&&o.player.mute&&(l?o.player.mute():o.player.unMute()),"object"==typeof o.player&&o.player.element){var d=l?0:1;o.player.api("setVolume",d)}break;case"enableShowButton":l?e("> .frame-embed > .awe-media-control",s).show():e("> .frame-embed > .awe-media-control",s).hide()}})},setSpacingColumn:function(){var t=this,n=this.model.get("columns"),o=[],s=0,a=this.model.get("settings").get("rowSpacing"),i=0;o[0]=[],n.each(function(e,n){var a=t.isColumnShow(e);s+=a.isOffset,(s>12||a.newRow)&&(s=a.isOffset,i++,o[i]=[]),o[i].push(n)}),e.each(o,function(t,o){var s=o.length-1;e.each(o,function(e,t){var o=n.at(t),i=o.get("settings").get("boxModelSettings"),l=(a-30)/2;s&&-1!=a?(i.set("enabledCustomMargin",1),0==e?(i.set("marginLeft",0),i.set("marginRight",l)):e==s?(i.set("marginLeft",l),i.set("marginRight",0)):(i.set("marginLeft",l),i.set("marginRight",l))):i.set("enabledCustomMargin",0)})})},isColumnShow:function(e){var t=AWEContent.Toolbars.responsive,n=e.get("classes").toJSON(),o=e.view.$el,s="";switch(t){case"col-lg":s="lg-hidden";break;case"col-md":s="md-hidden";break;case"col-sm":s="sm-hidden";break;case"col-xs":s="xs-hidden"}return o.hasClass(s)?{isOffset:0,newRow:0}:"none"==o.css("clear")?{isOffset:n[t]+n[t+"-offset"],newRow:0}:"both"==o.css("clear")?{isOffset:n[t]+n[t+"-offset"],newRow:1}:void 0},listenChangeListColumn:function(){var e=this;setTimeout(function(){e.setSpacingColumn()},100),this.model.set("connectSpacingToColumn",!1)},fullScreen:function(){var t=this,n=t.model.toJSON().settings,o=t.$el;if(n)if(n.enabledFullScreen){var s=e(window).height();o.css("min-height",s+"px")}else o.css("min-height","")},processYT:function(e){function t(){n.model.get("settings").toJSON().enableMute?n.player.mute():n.player.unMute()}var n=this;n.player=new AWEContent.windowIframe.YT.Player(e,{events:{onReady:t}})},setVideo:function(){function t(){function t(){s.enableBackgroundVideo&&""!=d.typeVideo&&(i.attr("src",d.attrVideo),s.enableAutoPlayVideo?(o=i.attr("src").replace("autoplay=0","autoplay=1"),i.attr("src",o),l.css("background",""),r.addClass("pause-btn")):(n.processBackground(s,l),r.addClass("play-btn")),"vimeo"==d.typeVideo&&(i[0].onload=function(){n.processResize(),s.enableShowButton&&c.show(),n.player=AWEContent.windowIframe.Froogaloop(i[0]);var t=s.enableMute?0:1;n.player.api("setVolume",t),r.click(function(){r.hasClass("pause-btn")?(r.removeClass("pause-btn").addClass("play-btn"),e(this).addClass("active").prev().removeClass("active"),n.player.api("pause")):(r.removeClass("play-btn").addClass("pause-btn"),e(this).addClass("active").next().removeClass("active"),l.css("background",""),n.player.api("play"))})}),"youtube"==d.typeVideo&&(s.enableShowButton||(o=i.attr("src").replace("controls=1","controls=0"),i.attr("src",o)),i[0].onload=function(){n.processYT("iframe-video-"+n.cid),s.enableShowButton&&c.show(),r.click(function(){r.hasClass("pause-btn")?(r.removeClass("pause-btn").addClass("play-btn"),e(this).addClass("active").prev().removeClass("active"),n.player.pauseVideo()):(r.removeClass("play-btn").addClass("pause-btn"),e(this).addClass("active").next().removeClass("active"),l.css("background",""),n.player.playVideo())}),n.processResize()})),n.$el.css({"background-image":"","background-repeat":"","background-attachment":"","background-size":"","background-position":""})}if(AWEContent.jqIframe(">.frame-embed",n.$el).remove(),""==n.model.get("settings").toJSON().bgVideoUrl)return!1;n.$el.prepend('<div class="frame-embed">                        <iframe id="iframe-video-'+n.cid+'" class="frame-embed-item iframe-video" src="" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>                        <div class="overlay-iframe" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0""></div>                        <div class="awe-media-control"><a class="media-btn"></a></div>                    </div>');var o,s=n.model.get("settings").toJSON(),a=AWEContent.jqIframe(">.frame-embed",n.$el),i=AWEContent.jqIframe(">#iframe-video-"+n.cid,a).attr("src",""),l=AWEContent.jqIframe(".overlay-iframe",a),c=AWEContent.jqIframe(">.awe-media-control",a),r=AWEContent.jqIframe(">.media-btn",c),d=e.processVideo(s.bgVideoUrl);n.player="",c.hide();var u=setInterval(function(){AWEContent.jqIframe("> .frame-embed > #iframe-video-"+n.cid,n.$el).length>0&&(clearInterval(u),t())},50)}var n=this;AWEContent.Library.addLibrary("video",t)},processResize:function(){var t,n,o,s,a,i,l=this,c=e("> .frame-embed",l.$el),r=e("> iframe",c),d=16/9,u=c.outerWidth(),m=c.outerHeight(),g=1;return 0==r.length?!1:(0!=m&&0!=u&&(g=u/m),void(d>=g?(o=u/d,n=u*m/o,i=-(n-u)/2+"px",r.css({top:"",left:i,height:"",width:n+"px"})):(s=m*d,t=m*u/s,a=-(t-m)/2+"px",r.css({left:"",top:a,width:"",height:t+"px"}))))},processBackground:function(e,t){var e=e,n=e.bgColor,o="",s="",a="",i="";return e.bgFid>0&&(o="url("+encodeURI(this.model.bgImageURL)+")","parallax"==e.bgMode?(s="",a="fixed",i="50% 0%/cover"):"fullcover"==e.bgMode?(i="center/cover",a=""):(s=e.bgMode,i=e.bgPosition),n+=" "+o+" "+s+" "+a+" "+i),t.css("background",n),n},getBackgroundImageURL:function(e,t,n,o){var s=this.model.toJSON().settings,a=o&&o[s.bgFid]&&o[s.bgFid].none?o[s.bgFid].none:"";this.model.bgImageURL=a,this.processBackground(s,this.$el)}}),AWEContent.Collections.ListSection=Backbone.Collection.extend({model:AWEContent.Models.Section}),AWEContent.Views.ListSection=Backbone.View.extend({initialize:function(t){var n=this,o=-1;t.el&&this.setElement(t.el),this.render(),AWEContent.jqIframe(n.el).sortable({handle:".js-section-move",items:".awe-section",axis:"y",tolerance:"pointer",containment:"body",start:function(e,t){o=t.item.index()},update:function(e,t){var s=t.item.index();if(s!=o){var a=n.collection.remove(n.collection.at(o),{silent:!0});n.collection.add(a,{at:s,silent:!0})}}}),this.$el.sortable({handle:".section-move",items:"section.awe-section",tolerance:"pointer",placeholder:"awe-item-placeholder",start:function(t,n){e(".panel-template .obj-adjust").addClass("position-default"),n.helper.css("z-index",9999)},stop:function(){e("#panel-template .obj-adjust").removeClass("position-default")},update:function(t,o){var s=e("input[name=template-data]",o.item).val().trim();if(s){var a=JSON.parse(s),i=AWEContent.createSectionFromTemplate(JSON.parse(a.data));AWEContent.sections.add(i,{at:e(".library-template-item",n.$el).index()})}e(".library-template-item",n.$el).remove()}}),this.$el.sortable("disable"),this.listenTo(this.collection,"add",this.addSection),AWEContent.iframe.contents().find("a.new-section").click(function(e){e.preventDefault(),n.createSection()}),AWEContent.iframe.contents().find("a.save-page-template").click(function(e){e.preventDefault(),AWEContent.templateDialog.savedElement=AWEContent.iframe.contents().find("#awe-section-wrapper"),AWEContent.templateDialog.type="page",AWEContent.templateDialog.showMsg=!0,AWEContent.templateDialog.open({title:"",data:AWEContent.sections.toJSON()})})},render:function(){e(".awe-section",this.$el).remove(),this.collection.each(function(t){var n=new AWEContent.Views.Section({model:t});e(".add-section",this.$el).length?n.$el.insertBefore(e(".add-section",this.$el)):this.$el.append(n.$el)},this)},addSection:function(t){var n=this.collection.indexOf(t),o=new AWEContent.Views.Section({model:t});if(0===n)this.$el.prepend(o.$el);else{var s=e("> .awe-section:eq("+(n-1)+")",this.$el);s.length?o.$el.insertAfter(s):this.$el.append(o.$el)}AWEContent.Panels.toolbarPanel.updateSortableColumn(e(".awe-col-wrapper",o.$el))},createSection:function(){var e=new AWEContent.Models.BoxModelSettings,t=new AWEContent.Models.Column({items:new AWEContent.Collections.ListItem,settings:new AWEContent.Models.ColumnSettings({boxModelSettings:e}),classes:new AWEContent.Models.BootstrapGrid}),n=new AWEContent.Models.Section({columns:new AWEContent.Collections.ListColumn([t]),settings:new AWEContent.Models.SectionSettings({boxModelSettings:new AWEContent.Models.BoxModelSettings})});this.collection.add(n)}})}(jQuery);