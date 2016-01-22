!function(e){"use strict";AWEContent.Models.ImageSlide=Backbone.RelationalModel.extend({defaults:{fid:-1,srcImageStyle:"",srcThumbStyle:"",linkImage:"",captionImage:"",enableCaption:0,captionPosition:"top",targetImage:1},createView:function(){this.view=new AWEContent.Views.ImageSlide({model:this})},getView:function(){return this.view}}),AWEContent.Views.ImageSlide=Backbone.View.extend({tagName:"div",className:"md-item-image",events:{"click .awe-box-btn":"changeContent","click .edit-link":"editLink","click .edit-caption":"editCaption","click .remove-image":"destroyImage"},template:_.template('<div class="awe-image-item">                <% if (linkImage) { %>                <a class="mgf-md-popup" target="<%= targetImage %>" href="<%= linkImage %>">                <% } %>                <div class="awe-image-content">                    <div class="awe-image-container"><img src="<%= srcImage %>" alt=""></div>                    <div class="awe-image-caption"><%= captionImage %></div>                </div>                <% if (linkImage) { %>                </a>                <% } %>                <div class="awe-image-control">                    <ul>                        <li class="edit-link">                            <i class="ic ac-icon-link"></i>                            <div class="awe-control-box">                                <div class="awe-box-header">Image link</div>                                <div class="awe-box-content">                                    <div class="awe-box-item"><textarea></textarea></div>                                    <div class="awe-box-item">                                        <input type="checkbox" name="target" id="ckb-target" class="ckb-target">                                        <label for="ckb-target" class="label-checkbox">Open new window</label>                                    </div>                                </div>                                <div class="awe-box-footer">                                    <a href="#" class="awe-box-btn js-ok">Save</a>                                    <a href="#" class="awe-box-btn js-cancel">Cancel</a>                                </div>                            </div>                        </li>                        <li class="edit-caption">                            <i class="ic ac-icon-caption"></i>                            <div class="awe-control-box">                                <div class="awe-box-header">Image caption</div>                                 <div class="awe-box-content">                                    <div class="awe-box-item">                                        <textarea></textarea>                                    </div>                                </div>                                <div class="awe-box-footer">                                    <a href="#" class="awe-box-btn js-ok">Save</a>                                    <a href="#" class="awe-box-btn js-cancel">Cancel</a>                                </div>                            </div>                        </li>                        <li class="remove-image"><i class="ic ac-icon-trash"></i></li>                    </ul>                </div>            </div>'),initialize:function(){this.render(),this.$el.delegate(".awe-control-box","click",function(e){e.stopPropagation()}),this.listenTo(this.model,"change",this.changeSettings)},render:function(){var t=this,i=t.model.toJSON(),a=i.srcThumbStyle;return t.$el.append(t.template({captionImage:i.captionImage,targetImage:"_blank",linkImage:i.linkImage,srcImage:i.srcImageStyle})),t.$img=e("img",t.el),t.$img.data("srcThumbStyle",a),0==i.enableCaption&&e("li.edit-caption",t.$el).hide(),"top"==i.captionPosition?e(".awe-image-content",t.$el).prepend(e(".awe-image-caption",t.el)):"over"==i.captionPosition&&(t.$el.addClass("position-over"),t.addImageOverlay()),t.$el},changeSettings:function(t){var i=this,a=e(".mgf-md-popup",i.el),o=e(".awe-image-caption",i.el),l=e(".awe-image-content",i.el);e.each(t.changedAttributes(),function(s,n){switch(s){case"srcImageStyle":i.$img.attr("src",n);break;case"srcThumbStyle":i.$img.data("srcThumbStyle",n).trigger("change",{action:"changeThumbnail"});break;case"linkImage":""!=n?(e(".awe-image-item",i.$el).prepend(e('<a target="_blank"></a>').attr("href",n)),e(".awe-image-item > a",i.$el).append(e(".awe-image-content",i.$el))):""!=t.previousAttributes().linkImage&&(e(".awe-image-item",i.$el).prepend(e(".awe-image-content",i.$el)),e(".awe-image-item > a",i.$el).remove());break;case"targetImage":if(i.model.get("linkImage")){var d="_blank";a.attr("target",d)}break;case"enableCaption":n?e(".awe-image-caption",i.$el).show():e(".awe-image-caption",i.$el).hide(),i.removeImageOverlay(),n&&i.model.get("captionImage")&&"over"==i.model.get("captionPosition")&&i.addImageOverlay();break;case"captionImage":e(".awe-image-caption",i.$el).html(n);break;case"captionPosition":switch(i.$el.removeClass("position-over"),n){case"top":i.removeImageOverlay(),l.prepend(o);break;case"bottom":i.removeImageOverlay(),l.append(o);break;case"over":i.addImageOverlay(),i.$el.addClass("position-over")}}})},addCaption:function(){var t=this,i=t.model.get("captionImage"),a=t.model.get("captionPosition"),o=e('<div class="awe-image-caption"></div>').html(i);"bottom"==a?e(".awe-image-content",t.$el).append(o):(e(".awe-image-content",t.$el).prepend(o),"over"==a&&(t.$el.addClass("position-over"),t.addImageOverlay()))},changeContent:function(t){t.preventDefault(),t.stopPropagation();var i=this,a=e(t.target),o=a.closest("li.active"),l=e("textarea",o).val();if(o.removeClass("active"),a.hasClass("js-ok"))if(o.hasClass("edit-link")){var s=e(".ckb-target",o).prop("checked");i.model.set("linkImage",l),i.model.set("targetImage",s?1:0)}else o.hasClass("edit-caption")&&i.model.set("captionImage",l)},editLink:function(t){t.stopPropagation(),t.preventDefault();var i=this,a=i.model.get("linkImage"),o=e(t.target).hasClass("edit-link")?e(t.target):e(t.target).closest(".edit-link"),l=e("textarea",o);o.siblings("li").removeClass("active"),o.toggleClass("active"),l.val(a)},editCaption:function(t){t.stopPropagation(),t.preventDefault();var i=this,a=i.model.get("captionImage"),o=e(t.target).hasClass("edit-caption")?e(t.target):e(t.target).closest(".edit-caption"),l=e("textarea",o);o.siblings("li").removeClass("active"),o.toggleClass("active"),l.val(a)},destroyImage:function(){this.$el.closest(".owl-wrapper").children().length>1&&(this.model.destroy(),this.$el.remove())},addImageOverlay:function(){e(".awe-image-content",this.$el).prepend('<div class="awe-image-overlay"></div>')},removeImageOverlay:function(){e(".awe-image-overlay",this.$el).remove()}}),AWEContent.Collections.ListImageSlide=Backbone.Collection.extend({model:AWEContent.Models.ImageSlide}),AWEContent.Views.ListImageSlide=Backbone.View.extend({tagName:"div",className:"",events:{},initialize:function(){this.listenTo(this.collection,"add",this.addImage),this.listenTo(this.collection,"destroy",this.removeImage),this.render()},render:function(){var e=this;e.collection.each(function(t){t.createView(),e.$el.append(t.getView().$el)})},addImage:function(e){e.createView(),this.$el.append(e.getView().$el)}}),AWEContent.Models.SlideShowItem=AWEContent.Models.Item.extend({defaults:{machine_name:"slideshow",images:[],styleImage:"none",effectSlide:"fade",nav:"none",styleThumb:"ac_slide_thumb_default",positionThumb:"bottom",showControls:0,stopOnHoverSlide:0,autoPlay:0,speedImage:4e3,transSpeed:400,caption:0,captionColor:"",captionPosition:"top",captionOnHover:0,imageBgOverlay:"",boxModelSettings:{},customID:"",customClass:"",customEnableAttributes:0,customDataAttributes:"[]",customActionAttributes:'{"newAction": "", "newAttrName": "", "newAttrValue": ""}',customEnableAnimations:1,customDataAnimations:'{"type" : "none"}',lgResponsive:!0,xsResponsive:!0,mediumResponsive:!0,smResponsive:!0},relations:[{type:Backbone.HasOne,key:"boxModelSettings",relatedModel:AWEContent.Models.BoxModelSettings},{type:Backbone.HasMany,key:"images",relatedModel:AWEContent.Models.ImageSlide,relatedCollection:AWEContent.Collections.ListImageSlide}],createView:function(){this.view=new AWEContent.Views.SlideShowItem({model:this})},clone:function(){var t={},i=new AWEContent.Collections.ListImageSlide;return this.get("images").each(function(e){i.add(e.clone())}),e.each(this.toJSON(),function(e,i){"images"!=e&&(t[e]=i)}),t.images=i,t.boxModelSettings=new AWEContent.Models.BoxModelSettings(t.boxModelSettings),new AWEContent.Models.SlideShowItem(t)}}),AWEContent.Views.SlideShowItem=AWEContent.Views.Item.extend({additionalEvents:{},refreshGidImage:function(){AWEContent.Panels.slideshow.isOpenned&&AWEContent.Panels.slideshow.setPanelElementsValue()},initialize:function(){AWEContent.Views.Item.prototype.initialize.call(this);var t=this;this.listenTo(this.model.get("boxModelSettings"),"change",this.applySettingsChanged),this.listenTo(this.model.get("images"),"add",this.addImage),this.listenTo(this.model.get("images"),"remove",this.removeImage),this.listenTo(this.model.get("images"),"change:srcImage",this.changeThumbImage),this.$el.resize(function(){t.owlSlide.data("owlCarousel").reinit(t.settingsOwl),t.owlThumb.data("owlCarousel").reinit(t.stOwlThumb)}),t.iframeJQuery(this.el).delegate(".awe-slideshow","itemReady",function(){t.$el.delegate(".mgf-md-popup img","change",function(i,a){if("changeThumbnail"==a.action){var o=e(this),l=o.data("srcThumbStyle"),s=o.closest(o.closest(".owl-item").length?".owl-item":".md-item-image"),n=s.index(),d=t.$listThumb.find(".image-thumb img").eq(n);d.attr("src",l),e.imageLoaded({src:l},function(){status.err})}}),"thumbnail"==t.model.toJSON().nav&&t.$el.find(".mgf-md-popup img").each(function(){e(this).trigger("change",{action:"changeThumbnail"})})}),this.$el.bind("getImagesStyleSuccess",function(i,a,o){var l="styleImage"==a?"srcImageStyle":"srcThumbStyle",s=t.model.get(a),n=AWEContent.jqIframe('<div class="owl-list-thumb"><div class="list-thumb-content"></div></div>');if(t.model.get("images").each(function(t){var i=t.get("fid"),d=o[i][s];if(t.set(l,d),"styleThumb"==a){var m=e('<div class="image-thumb"><img src="" alt=""/></div>');e("img",m).attr("src",d),e(".list-thumb-content",n).append(m)}}),"styleThumb"==a){t.$listThumb=n,t.thumbWidthLoaded=!1,t.getThumbImageSize();var d=setInterval(function(){t.thumbWidthLoaded&&(clearInterval(d),t.initThumbList(),"thumbnail"==t.model.get("nav")&&(e(".owl-list-thumb",t.$el).remove(),"bottom"==t.model.get("positionThumb")?e(".awe-slideshow",t.$el).append(t.$listThumb):e(".awe-slideshow",t.$el).prepend(t.$listThumb)))},100)}});var i;e(window).resize(function(){i&&clearInterval(i),i=setTimeout(function(){t.initThumbList()},100)})},resizeImage:function(e){var t=0,i=setInterval(function(){t++,t>20?clearInterval(i):e.width()>0&&(clearInterval(i),setTimeout(function(){e.css({width:"",height:""});var t=e.width(),i=e.height(),a=.5;i/t>=a?(t="100%",i="auto"):(t="auto",i="100%"),e.css({width:t,height:i})},100))},50)},changeThumbImage:function(t,i){var a=t.view.$el.parent().index(),o=this.$listThumb,l=e("img",o).eq(a);l.attr("src",i)},renderItemContent:function(){var t=this,i=t.model.toJSON(),a=t.model.get("images"),o=e('<div class="awe-item awe-slideshow"></div>'),l=new AWEContent.Views.ListImageSlide({collection:a});return o.append(l.$el.addClass("image-slide-show")),a.each(function(e){e.set("captionPosition",i.captionPosition)}),t.renderThumbList(),t.getThumbImageSize(),AWEContent.Library.addLibrary("owlCarousel",function(){if(a.length)var i=setInterval(function(){e(".awe-slideshow",t.el).length&&t.thumbWidthLoaded&&(clearInterval(i),e(".awe-image-content",t.el).length&&t.readyOwlCarousel())},50);else o.append("<div class='alert alert-danger'>Please drag image for here!</div>")}),i.caption||o.addClass("disable-caption"),"top"==i.captionPosition?e(".owl-item .awe-image-content",o).each(function(){e(this).prepend(e(".awe-image-caption",e(this)))}):"over"==i.captionPosition&&(e(".awe-image-content",o).prepend(e('<div class="awe-image-overlay" />').css("background-color",i.imageBgOverlay)),e(".awe-image-overlay",o).css("background-color",i.imageBgOverlay),i.onHover&&o.addClass("caption-hover")),o.attr("id",i.customID).addClass(i.customClass).renderItemDefaultBoxModel(i.boxModelSettings),o.renderItemDefaultAttributes(i.customEnableAttributes,i.customDataAttributes),e(".awe-image-caption",o).css("color",i.captionColor),i.captionOnHover&&o.addClass("caption-hover"),i.customEnableAnimations&&o.processAnimations(i.customDataAnimations),t.$el.defaultResponsive(i),o.aweDragUpload({multiUpload:!0,uploadSuccessCallback:function(i){if(i.status&&i.file){var a=t.model.get("images"),o=i.file.fid,l=t.model.toJSON().styleThumb,s=t.model.toJSON().styleImage,n=l+","+s,d=i.file.file_url;if(""!=AWEContent.Path.imageStyleURL)e.post(AWEContent.Path.imageStyleURL,{fids:""+o,styles:n},function(i){"string"==e.type(i)&&(i=JSON.parse(i.trim()));var l={fid:o,srcThumbStyle:i[o][t.model.get("styleThumb")],srcImageStyle:i[o][t.model.get("styleImage")],captionPosition:t.model.get("captionPosition"),enableLightBox:t.model.get("enableLightBox")};if(1==t.model.get("createFromDefault"))t.model.get("images").at(0).set(l),t.model.set("createFromDefault",!1),t.model.view.getImageStyleURL("styleThumb");else{var s=new AWEContent.Models.ImageSlide(l);a.add(s),t.refreshGidImage()}});else{var m={fid:o,srcThumbStyle:d,srcImageStyle:d,captionPosition:t.model.get("captionPosition"),enableLightBox:t.model.get("enableLightBox")};if(1==t.model.get("createFromDefault"))t.model.get("images").at(0).set(m),t.model.set("createFromDefault",!1);else{var r=new AWEContent.Models.ImageSlide(m);a.add(r),t.refreshGidImage()}}}}}),o},readyOwlCarousel:function(t){function i(){var e=this.currentItem;o.owlThumb.find(".owl-item").removeClass("synced").eq(e).addClass("synced"),void 0!==o.owlThumb.data("owlCarousel")&&a(e)}function a(e){var t=o.owlThumb.data("owlCarousel").owl.visibleItems,i=e,a=!1;for(var l in t)i===t[l]&&(a=!0);a===!1?i>t[t.length-1]?o.owlThumb.trigger("owl.goTo",i-t.length+2):(i-1===-1&&(i=0),o.owlThumb.trigger("owl.goTo",i)):i===t[t.length-1]?o.owlThumb.trigger("owl.goTo",t[1]):i===t[0]&&o.owlThumb.trigger("owl.goTo",i-1)}var o=this,l=o.model.toJSON();if(t)o.settingsOwl=t;else{var s=!1,n=!1,d=!1;"none"==l.nav||"thumbnail"==l.nav?s=!1:"button"==l.nav?(s=!0,n=!1):(s=!0,n=!0),d=l.autoPlay?l.speedImage:!1,o.settingsOwl={singleItem:!0,autoPlay:!1,stopOnHover:!1,pagination:s,paginationNumbers:n,navigation:l.showControls?!0:!1,addClassActive:!0,transitionStyle:l.effectSlide,beforeMove:function(){o.owlSlide.find(".active").css({duration:""})},afterMove:function(){var e=o.model.get("transSpeed");o.owlSlide.find(".active").css({"animation-duration":e+"ms"})},afterAction:i}}o.initThumbList(),"thumbnail"==l.nav&&("top"==l.positionThumb?e(".awe-slideshow",o.el).prepend(o.$listThumb):e(".awe-slideshow",o.el).append(o.$listThumb)),o.owlSlide=AWEContent.jqIframe(".image-slide-show",o.el),o.owlSlide.owlCarousel(o.settingsOwl),o.$el.delegate(".owl-item","click",function(e){e.preventDefault();var t=AWEContent.jqIframe(this).data("owlItem");o.owlSlide.data("owlCarousel").goTo(t)}),setTimeout(function(){o.resizeItem()},100)},renderThumbList:function(){var t=AWEContent.jqIframe('<div class="owl-list-thumb"><div class="list-thumb-content"></div></div>');this.model.get("images").each(function(i){var a=i.get("srcThumbStyle"),o=e('<div class="image-thumb"><img src="" alt=""/></div>');e("img",o).attr("src",a),e(".list-thumb-content",t).append(o)}),this.$listThumb=t},initThumbList:function(){var e,t,i,a=Math.floor(this.$el.width()/this.thumbWidth);a>this.model.get("images").length&&(a=this.model.get("images").length),2>a?(a=2,e="",t=""):(e=a*this.thumbWidth,t=(this.$el.width()-e)/2),this.stOwlThumb={pagination:!1,items:a,itemsDesktop:!1,itemsDesktopSmall:!1,itemsTablet:!1,itemsMobile:!1,responsiveRefreshRate:100,afterInit:function(e){e.find(".owl-item").eq(0).addClass("synced")}},this.owlThumb&&(i=this.owlThumb.data("owlCarousel"),i&&i.destroy()),this.owlThumb=AWEContent.jqIframe(".list-thumb-content",this.$listThumb).width(e).css("margin-left",t),this.owlThumb.owlCarousel(this.stOwlThumb)},getImageStyleURL:function(t){var i=this,a=[],o=this.model.get(t);this.model.get("images").each(function(e){a.push(e.get("fid"))}),a.length&&e.post(AWEContent.Path.imageStyleURL,{fids:a.join(","),styles:o},function(a){"string"==e.type(a)&&(a=JSON.parse(a.trim())),i.$el.trigger("getImagesStyleSuccess",[t,a])})},applySettingsChanged:function(t){var i=this,a=t.toJSON(),o=i.model.get("images"),l=e(".awe-slideshow",i.el),s=i.$el.height();e.each(t.changedAttributes(),function(s,n){switch(i.$el.changeResponsive(s,n),l.renderChangeSettingBoxModel(s,n,t),s){case"styleImage":case"styleThumb":i.getImageStyleURL(s);break;case"effectSlide":i.settingsOwl.transitionStyle=n,i.owlSlide.data("owlCarousel").reinit(i.settingsOwl);break;case"nav":if("thumbnail"==n){i.getThumbImageSize();var d=setInterval(function(){i.thumbWidthLoaded&&(clearInterval(d),i.renderThumbList(),i.initThumbList(),"top"==a.positionThumb?l.prepend(i.$listThumb):l.append(i.$listThumb))},100);i.settingsOwl.pagination=!1,i.settingsOwl.paginationNumbers=!1}else e(".owl-list-thumb",i.el).length&&e(".owl-list-thumb",i.el).remove(),"none"==n?(i.settingsOwl.pagination=!1,i.settingsOwl.paginationNumbers=!1):"number"==n?(i.settingsOwl.pagination=!0,i.settingsOwl.paginationNumbers=!0):"button"==n&&(i.settingsOwl.pagination=!0,i.settingsOwl.paginationNumbers=!1);i.owlSlide.data("owlCarousel").reinit(i.settingsOwl);break;case"positionThumb":"top"==n?l.prepend(i.$listThumb):"bottom"==n&&l.append(i.$listThumb);break;case"showControls":var m=n?!0:!1;i.settingsOwl.navigation=m,i.owlSlide.data("owlCarousel").reinit(i.settingsOwl);break;case"autoPlay":break;case"stopOnHoverSlide":break;case"speedImage":break;case"transSpeed":break;case"caption":o.each(function(e){e.set("enableCaption",n)}),n?(l.removeClass("disable-caption"),e(".edit-caption",l).show(),"over"==a.captionPosition&&e(".awe-image-overlay",i.$el).css("background-color",a.imageBgOverlay)):(l.addClass("disable-caption"),e(".edit-caption",l).hide());break;case"captionColor":e(".awe-image-caption",l).css("color",n);break;case"captionPosition":o.each(function(e){e.set("captionPosition",n)}),"over"!=n?l.removeClass("caption-hover"):(e(".awe-image-overlay",i.$el).css("background-color",a.imageBgOverlay),a.captionOnHover&&l.addClass("caption-hover"));break;case"captionOnHover":n&&"over"==a.captionPosition?l.addClass("caption-hover"):l.removeClass("caption-hover");break;case"imageBgOverlay":e(".owl-item .awe-image-content > .awe-image-overlay",i.$el).css("background-color",n);break;case"customID":l.attr("id",n);break;case"customClass":var r=i.model.previousAttributes().classGallery;l.removeClass(r).addClass(n);break;case"customEnableAttributes":l.renderChangeSettingsAttributes(s,n,a.customDataAttributes);break;case"customActionAttributes":l.renderChangeSettingsAttributes(s,n);break;case"customEnableAnimations":var c,g;n?(c=a.customDataAnimations,g=null,l.processAnimations(c)):(c=null,g=a.customDataAnimations,l.processAnimations(c,g));break;case"customDataAnimations":var c,g;c=a.customDataAnimations,g=i.model.previousAttributes().customDataAnimations,l.processAnimations(c,g)}}),setTimeout(function(){i.checkChangeHeight(s)},100)},addImage:function(t,i){var a=this,o=e('<div class="image-thumb"><img src="" alt=""></div>');e("img",o).attr("src",t.get("srcThumbStyle")),this.model.toJSON().images.length<2?(a.$listThumb.append(o),e(".alert.alert-danger",a.el).remove(),this.readyOwlCarousel()):(a.owlSlide.data("owlCarousel").addItem(t.view.$el),a.owlThumb.data("owlCarousel").addItem(o),a.$el.find(".mgf-md-popup img").eq(i.length-1).trigger("change",{action:"changeThumbnail"})),a.initThumbList(),a.resizeItem()},removeImage:function(e){var t=this,i=e.view.$el.parent(".owl-item").index();t.owlSlide.data("owlCarousel").removeItem(i),t.owlThumb.data("owlCarousel").removeItem(i),AWEContent.Panels.slideshow.setPanelElementsValue(),t.resizeItem()},getThumbImageSize:function(){var t=this,i="none"!=this.model.get("styleThumb"),a=this.model.get("images").at(0).get("srcThumbStyle"),o=e('<img class="awe-test-image" src="" alt="" />').attr("src",a).css({opacity:0,visibility:"hidden"});t.thumbWidthLoaded=!1,i&&"none"!=i?(o.load(function(){t.thumbWidth=this.naturalWidth,e(".awe-test-image").remove(),t.thumbWidthLoaded=!0}),e("body").append(o)):(t.thumbWidth=150,t.thumbWidthLoaded=!0)}}),AWEContent.Views.SlideShowController=AWEContent.Views.ItemController.extend({machineName:"slideshow",controllerHtml:function(){return'<div class="title-icon">Slideshow</div><i class="ic ac-icon-slideshow"></i>'},createItemModel:function(e){var t;if(void 0!=e){var i;return t=new AWEContent.Models.BoxModelSettings(e.boxModelSettings),i=new AWEContent.Collections.ListImageSlide(e.images),e.boxModelSettings=t,e.images=i,e.createFromDefault=!1,new AWEContent.Models.SlideShowItem(e)}t=new AWEContent.Models.BoxModelSettings;var a=new AWEContent.Models.ImageSlide({srcImageStyle:AWEContent.Path.defaultImage,srcThumbStyle:AWEContent.Path.defaultImage}),o=new AWEContent.Collections.ListImageSlide([a]);return new AWEContent.Models.SlideShowItem({boxModelSettings:t,images:o,createFromDefault:!0})}}),AWEContent.Views.SlideShowPanel=AWEContent.Views.ItemPanel.extend({tagName:"div",className:"awe-obj-panel slideshow-panel",panelName:"slideshow",initPanel:function(){AWEContent.Views.ItemPanel.prototype.initPanel.call(this);var t=this;e("#slideshow-select-image .control-gallery input[name=selected_media]",t.el).change(function(){var i=e(this).val(),a='<div class="book-lib"><i class="ic ac-icon-done"></i><img src="" alt="book"><input type="hidden" name="selected_media"/></div>',o="",l=!1;try{o=e.parseJSON(i)}catch(s){}if("object"==typeof o){var n=e("#slideshow-select-image .library",t.el),d=t.editingModel.get("styleImage"),m=t.editingModel.get("styleThumb"),r=d+","+m,c=[];e.each(o,function(){c.push(this.fid)}),""!=AWEContent.Path.imageStyleURL?e.post(AWEContent.Path.imageStyleURL,{fids:c.join(","),styles:r},function(i){if("string"==e.type(i))try{i=JSON.parse(i)}catch(s){}"object"==typeof i&&(e.each(o,function(){var o=this,s={fid:o.fid,srcThumbStyle:i[o.fid][t.editingModel.get("styleThumb")],srcImageStyle:i[o.fid][t.editingModel.get("styleImage")],captionPosition:t.editingModel.get("captionPosition"),enableLightBox:t.editingModel.get("enableLightBox")};if(!t.editingModel.get("images").length&&t.editingModel.get("createFromDefault")&&t.editingModel.set("createFromDefault",!1),t.editingModel.get("createFromDefault"))t.editingModel.set("createFromDefault",!1),t.editingModel.get("images").at(0).set(s),e("img",n).eq(0).attr("src",o.file_url),l=!0;else{var d=new AWEContent.Models.ImageSlide(s),m=e(a);e("img",m).attr("src",o.file_url),n.append(m),t.editingModel.get("images").add(d)}}),l&&t.editingModel.view.getImageStyleURL("styleThumb"))}):e.each(o,function(){var i=this,o={fid:i.fid,srcThumbStyle:i.file_url,srcImageStyle:i.file_url,captionPosition:t.editingModel.get("captionPosition"),enableLightBox:t.editingModel.get("enableLightBox")};if(!t.editingModel.get("images").length&&t.editingModel.get("createFromDefault")&&t.editingModel.set("createFromDefault",!1),t.editingModel.get("createFromDefault"))t.editingModel.set("createFromDefault",!1),t.editingModel.get("images").at(0).set(o),e("img",n).eq(0).attr("src",i.file_url);else{var l=new AWEContent.Models.ImageSlide(o),s=e(a);e("img",s).attr("src",i.file_url),n.append(s),t.editingModel.get("images").add(l)}})}}),e("#slideshow-select-image",t.el).delegate(".book-lib input[name=selected_media]","change",function(){var i=e(this).closest(".book-lib"),a=i.index(),o=t.editingModel.get("images").at(a),l=t.editingModel.get("styleImage"),s=t.editingModel.get("styleThumb"),n=l+","+s,d=e.parseJSON(e(this).val().trim());d&&(""!=AWEContent.Path.imageStyleURL?e.post(AWEContent.Path.imageStyleURL,{fids:""+d.fid,styles:n},function(e){o.set({fid:d.fid,srcThumbStyle:e[d.fid][t.editingModel.get("styleThumb")],srcImageStyle:e[d.fid][t.editingModel.get("styleImage")]})}):o.set({fid:d.fid,srcThumbStyle:d.file_url,srcImageStyle:d.file_url}),e("img",i).attr("src",d.file_url),t.editingModel.get("createFromDefault")&&t.editingModel.set("createFromDefault",!1))}),e("li[data-value=none]",e("#slideshow-style-thumbnail",this.el)).remove(),e("#slideshow-style-thumbnail",this.el).change(function(e,i){t.editingModel.set("styleThumb",i.value)}),e("#slideshow-style-image",this.el).change(function(e,i){t.editingModel.set("styleImage",i.value)}),e("#slideshow-effect",this.el).change(function(e,i){t.editingModel.set("effectSlide",i.value)}),e("#slideshow-navigation",this.el).change(function(i,a){t.editingModel.set("nav",a.value),"thumbnail"==a.value?e("#slideshow-style-thumbnail, #slideshow-position-thumbnail, .slideshow-thumb-style-title",t.el).show():e("#slideshow-style-thumbnail, #slideshow-position-thumbnail, .slideshow-thumb-style-title",t.el).hide()}),e("#slideshow-position-thumbnail",this.el).change(function(e,i){t.editingModel.set("positionThumb",i.value)}),e("#slideshow-show-control input[name=toggle_value]",this.el).change(function(i,a){a||t.editingModel.set("showControls",parseInt(e(this).val()))}),e("#slideshow-stop-on-hover input[name=toggle_value]",this.el).change(function(i,a){a||t.editingModel.set("stopOnHoverSlide",parseInt(e(this).val()))}),e("#slideshow-autoplay input[name=toggle_value]",this.el).change(function(i,a){a||t.editingModel.set("autoPlay",parseInt(e(this).val())),parseInt(e(this).val())?e("#slideshow-stop-on-hover, #slideshow-speed, #slideshow-trans-speed",t.el).show():e("#slideshow-stop-on-hover, #slideshow-speed, #slideshow-trans-speed",t.el).hide()}),e("#slideshow-speed",this.el).change(function(e,i){t.editingModel.set("speedImage",i.value)}),e("#slideshow-trans-speed",this.el).change(function(e,i){t.editingModel.set("transSpeed",i.value)}),e("#slideshow-enable-caption input[name=toggle_value]",this.el).change(function(i,a){a||t.editingModel.set("caption",parseInt(e(this).val())),e("#slideshow-image-bg-overlay, #slideshow-position-caption, #slideshow-on-hover, #slideshow-caption-color",t.el).hide(),parseInt(e(this).val())&&(e("#slideshow-position-caption, #slideshow-caption-color",t.el).show(),"over"==t.editingModel.get("captionPosition")&&e("#slideshow-image-bg-overlay, #slideshow-on-hover",t.el).show())}),e("#slideshow-caption-color",t.el).change(function(e,i){i=i?i.toRgbString():"",t.editingModel.set("captionColor",i)}),e("#slideshow-position-caption",this.el).change(function(i,a){t.editingModel.set("captionPosition",a.value),e("#slideshow-on-hover, #slideshow-image-bg-overlay",t.el).hide(),"over"==t.editingModel.get("captionPosition")&&e("#slideshow-on-hover, #slideshow-image-bg-overlay",t.el).show()}),e("#slideshow-on-hover input[name=toggle_value]",this.el).change(function(i,a){a||t.editingModel.set("captionOnHover",parseInt(e(this).val()))}),e("#slideshow-image-bg-overlay",t.el).change(function(e,i){i=i?i.toRgbString():"",t.editingModel.set("imageBgOverlay",i)}),e("#slideshow-layout-tab",t.el).initBoxModelPanel(t,"boxModelSettings"),e("#text-slideshow-custom-id",this.el).change(function(){t.editingModel.set("customID",e(this).val())}),e("#text-slideshow-custom-classes",this.el).change(function(){t.editingModel.set("customClass",e(this).val())}),e("#slideshow-custom-attributes",this.el).initAttributesPanel(t),e("#slideshow-animations input[name=enabled_custom_animation]",this.el).change(function(i,a){t.editingModel.set("customEnableAnimations",parseInt(e(this).val())),a&&t.editingModel.set("customDataAnimations",JSON.stringify(a.animations))})},setPanelElementsValue:function(){var t=this,i=this.editingModel.toJSON(),a='<div class="book-lib"><i class="ic ac-icon-done"></i><img src="" alt="book"><input type="hidden" name="selected_media"/></div>',o=e("#slideshow-select-image .library",t.el);o.empty(),e.each(i.images,function(t,i){var l=e(a);e("img",l).attr("src",i.srcImageStyle),o.append(l)}),""!=AWEContent.Path.imageStyleURL?(e("#slideshow-style-image",t.el).aweSelect("value",i.styleImage),e("#slideshow-style-thumbnail",t.el).aweSelect("value",i.styleThumb)):e("#slideshow-style-image, #slideshow-style-thumbnail",t.el).remove(),e("#slideshow-effect",t.el).aweSelect("value",i.effectSlide),e("#slideshow-navigation",t.el).aweSelect("value",i.nav),e("#slideshow-position-thumbnail",t.el).aweSelect("value",i.positionThumb),e("#slideshow-show-control input[name=toggle_value]",t.el).val(i.showControls).trigger("change",!0),e("#slideshow-stop-on-hover input[name=toggle_value]",t.el).val(i.stopOnHoverSlide).trigger("change",!0),e("#slideshow-autoplay input[name=toggle_value]",t.el).val(i.autoPlay).trigger("change",!0),e("#slideshow-speed",this.el).aweSlider("value",i.speedImage),e("#slideshow-trans-speed",this.el).aweSlider("value",i.transSpeed),e("#slideshow-enable-caption input[name=toggle_value]",t.el).val(i.caption).trigger("change",!0),e("#slideshow-caption-color",t.el).aweColorPicker("value",i.captionColor),e("#slideshow-position-caption",t.el).aweSelect("value",i.captionPosition),e("#slideshow-on-hover input[name=toggle_value]",t.el).val(i.captionOnHover).trigger("change",!0),e("#slideshow-image-bg-overlay",t.el).aweColorPicker("value",i.imageBgOverlay),e("#slideshow-layout-tab",t.el).initBoxModel(i.boxModelSettings),e("#text-slideshow-custom-id",t.el).val(i.customID),e("#text-slideshow-custom-classes",t.el).val(i.customClass),e("#slideshow-custom-attributes",t.el).initAttributes(i.customEnableAttributes,i.customDataAttributes),e("#slideshow-animations input[name=enabled_custom_animation]",t.el).val(i.customEnableAnimations).trigger("change"),e("#slideshow-animations input[name=enabled_custom_animation]",t.el).attr("data-animations",i.customDataAnimations).data("view",this.editingModel.view)},buildPanel:function(){return{title:{type:"markup",markup:'<div class="awe-title"><h2>Slide Show</h2></div>'},custom_style:{type:"section",select_image:{type:"gallery",title:"Add Images",columns:4},style_image:{type:"image_style_list",title:"Image Style",attributes:{"class":["long-title"]}},effect:{type:"select",title:"Effect",options:{fade:"Fade",backSlide:"Back Slide",goDown:"Go Down",fadeUp:"Fade Up"},default_value:"fade"},navigation:{type:"select",title:"Nav",options:{none:"None",button:"Button",thumbnail:"Thumbnail",number:"Number"},default_value:"none"},style_thumbnail:{type:"image_style_list",title:"Thumbnail Image Style",attributes:{"class":["long-title"]}},position_thumbnail:{type:"select",title:"Position",options:{top:"Top",bottom:"Bottom"},default_value:"bottom"},show_control:{type:"toggle",title:"Show controls",default_value:0}},custom_easing:{type:"section",autoplay:{type:"toggle",title:"AutoPlay",default_value:0},stop_on_hover:{type:"toggle",title:"Stop On Hover",default_value:1},speed:{type:"slider",title:"Speed",min_value:0,max_value:1e4,default_value:4e3,unit:"ms",allow_type:!0},"trans-speed":{type:"slider",title:"Trans Speed",min_value:0,max_value:1e4,default_value:500,unit:"ms",allow_type:!0}},custom_control:{type:"section",enable_caption:{type:"toggle",title:"Caption",default_value:0},caption_color:{type:"colorpicker",title:"Caption Color",options:{preferredFormat:"rgb",AlphaVerticle:!0,showAlpha:!0,allowEmpty:!0,showInput:!0}},position_caption:{type:"select",title:"Position",options:{top:"Top",bottom:"Bottom",over:"Over"},default_value:"top"},on_hover:{type:"toggle",title:"Display on hover",default_value:0},image_bg_overlay:{type:"colorpicker",title:"BgOverlay",options:{preferredFormat:"rgb",AlphaVerticle:!0,showAlpha:!0,allowEmpty:!0,showInput:!0}}},box_settings:{type:"section",layout_tab:{type:"tabs",tabs:[{tab_title:"Border",contents:{header_border:{type:"box_border",min_value:0,max_value:100,default_value:0}}},{tab_title:"Radius",contents:{header_boder_radius:{type:"box_model",model_type:"border_radius",min_value:0,max_value:100,allow_type:!0}}},{tab_title:"Padding",contents:{header_padding:{type:"box_model",model_type:"padding",allow_type:!0,min_value:0,max_value:100}}},{tab_title:"Margin",contents:{header_margin:{type:"box_model",model_type:"margin",allow_type:!0,min_value:0,max_value:100}}}]}},definitions:{type:"section",custom_id:{type:"text_field",title:"ID",default_value:""},custom_classes:{type:"text_field",title:"Class",default_value:""},custom_attributes:{type:"custom_attributes"},animations:{type:"animations"}}}
}}),e(document).ready(function(){AWEContent.Controllers.slideshow=new AWEContent.Views.SlideShowController,AWEContent.Panels.slideshow=new AWEContent.Views.SlideShowPanel})}(jQuery);