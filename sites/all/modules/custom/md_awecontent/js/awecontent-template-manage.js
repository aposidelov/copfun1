!function(e){"use strict";function t(){e(".awecontent-body-wrapper").show(),e("body").awecontent("disable").removeClass("awecontent-active")}function a(a){AWEContent.templateType=Drupal.settings.aweTemplateType,i?e("body").awecontent("openBuilder",a):(e("body").awecontent({pageURL:AWEContent.Path.layoutURL,sections:a,sectionsWrapper:"#awe-section-wrapper",pageWrapper:"body",sectionAlwaysFluid:Drupal.settings.sectionsFullWidth,disableAuto:!1,closeBuilderCallback:function(a){if(a){var l=n?JSON.parse(e(".ac-template-data",n).val().trim()):{title:""};"section"==Drupal.settings.aweTemplateType?(AWEContent.templateDialog.savedElement=e(".awe-section:eq(0)",AWEContent.sectionsView.$el),l.data=a[0]):(AWEContent.templateDialog.savedElement=AWEContent.sectionsView.$el,l.data=a),AWEContent.templateDialog.open(l)}else t()}}),i=!0),e(".awecontent-body-wrapper").hide(),e("body").addClass("awecontent-active"),e(window).bind("aweBuilderOpen",function(){"section"==Drupal.settings.aweTemplateType&&(AWEContent.iframe.contents().find("div.add-section").remove(),AWEContent.Toolbars.template.allowDragTemplate=!1,AWEContent.iframe.contents().find("body").addClass("awe-build-section"))})}function l(t,a){var l=_.template('<div class="ac-tpl-item">                    <div class="template-item">                        <div class="template-preview">                            <a href="#" class="prvimg"><img alt="" src="<%= template.thumbnail %>"></a>                            <ul class="template-control">                                    <li class="delete-control"><a href="#"><i class="ic ac-icon-trash"></i></a></li>                                    <li class="copy-control"><a href="#"><i class="ic ac-icon-clone"></i></a></li>                                    <li class="edit-control"><a href="#"><i class="ic ac-icon-edit"></i></a></li>                                    <% if (type == "section") { %>                                    <li class="favourite-control"><a href="#"><i class="ic ac-icon-star"></i></a></li>                                    <% } %>                                </ul>                        </div>                        <div class="template-entry">                            <div class="template-entry-col">                                <h3 class="template-title"><%= template.title %></h3>                            </div>                                <textarea class="ac-template-data" style="display: none"><%= JSON.stringify(template) %></textarea>                        </div>                    </div>                </div>')({template:t,type:Drupal.settings.aweTemplateType}),i=e(l);i.addClass(t.category?t.category:"custom own-template"),t.favourite&&i.addClass("favourite"),a?e("#ac-items-wrapper").append(i):e("#ac-items-wrapper").prepend(i)}var i=!1,n=null;e(document).ready(function(){AWEContent.Path=Drupal.settings.awePathConfigurations,e("body").append('<div class="awecontent-body-wrapper"></div>'),e(".awecontent-body-wrapper").append(e("body").children(":not(.awecontent-body-wrapper)")),e("body").append(e("#save-template-dialog")),e("a.add-template-btn, a.add-new-section").click(function(e){e.preventDefault(),n=null,a([])}),e("#filters").delegate(".template-filter a","click",function(t){t.preventDefault();var a=e(this).attr("data-filter");e(".template-filter > li.active").removeClass("active"),e(this).parent("li").addClass("active"),e("#ac-items-wrapper .ac-tpl-item").removeClass("ac-disable"),"*"!=a&&e("#ac-items-wrapper .ac-tpl-item:not("+a+")").addClass("ac-disable")}),e(window).bind("aweUploadTemplateSuccess",function(a,i){n?(e(".template-preview img",n).attr("src",i.thumbnail),e(".template-title",n).html(i.title),e(".ac-template-data",n).val(JSON.stringify(i))):l(i,!1),t()}),e(".page-template").delegate("ul.template-control > li > a","click",function(t){t.preventDefault();var i=e(this).parents(".ac-tpl-item"),s=JSON.parse(e(".ac-template-data",e(this).parents(".ac-tpl-item")).val().trim());if(e(this).parent().hasClass("delete-control"))s&&confirm(Drupal.t("This template will be deleted permanently. Are you sure?"))&&e.post(AWEContent.Path.templateActionURL,{tid:s.tid,act:"remove"},function(e){e.status?i.remove():alert(Drupal.t("Delete template unsuccessful."))});else if(e(this).parent().hasClass("copy-control"))e.post(AWEContent.Path.templateActionURL,{tid:s.tid,act:"clone",type:Drupal.settings.aweTemplateType},function(e){e.status?l(e.template,!1):alert(e.msg)});else if(e(this).parent().hasClass("edit-control"))n=i,s=JSON.parse(s.data),s="section"==Drupal.settings.aweTemplateType?[s]:s,a(s);else if(e(this).parent().hasClass("favourite-control")){var o=i.hasClass("favourite")?0:1;e.post(AWEContent.Path.templateActionURL,{tid:s.tid,act:"favourite",favourite:o},function(e){e.status?o?i.addClass("favourite"):i.removeClass("favourite"):alert(Drupal.t("Update favourite unsuccessful.",{},null))})}}),e("a.load-more").click(function(t){t.preventDefault();var a=e(this).parent(),i=e(".page-template > .template-row > .ac-tpl-item").length;e.post(window.location.href,{currentTemplates:i,act:"loadTemplates"},function(t){t.loadMore||a.hide(),t.templates.length&&(e.each(t.templates,function(e,t){l(t,!0)}),e(".template-filter > li.active > a").trigger("click"))})})})}(jQuery);