// XXX: better wrap whole JS in an anonymous function, pass jQuery and alter
//      ``jq`` with ``$``
if (typeof(window['jq']) == "undefined") jq = jQuery;

function hideAllContextualMenus() {
    jq('#contextualContentMenu dl.actionMenu').removeClass('activated').addClass('deactivated');
};

function toggleContextualMenuHandler(event) {
    jq(this).parents('.actionMenu:first').toggleClass('deactivated').toggleClass('activated');
    return false;
};

function actionContextualMenuDocumentMouseDown(event) {
    if (jq(event.target).parents('.actionMenu:first').length) return true;
    hideAllContextualMenus();
};

function actionContextualMenuMouseOver(event) {
    var menu_id = jq(this).parents('.actionMenu:first').attr('id');
    if (!menu_id) return true;
    var switch_menu = jq('#contextualContentMenu dl.actionMenu.activated').length > 0;
    jq('#contextualContentMenu dl.actionMenu').removeClass('activated').addClass('deactivated');
    if (switch_menu) jq('#contextualContentMenu #' + menu_id).removeClass('deactivated').addClass('activated');
};

function initializeContextualMenus() {
    jq(document).mousedown(actionContextualMenuDocumentMouseDown);
    hideAllContextualMenus();
    jq('#contextualContentMenu dl.actionMenu dt.actionMenuHeader a').click(toggleContextualMenuHandler).mouseover(actionContextualMenuMouseOver);
    jq('#contextualContentMenu dl.actionMenu > dd.actionMenuContent').click(hideAllContextualMenus);
};

function closeContextualContentMenu(event) {
    if (jq(event.target).parents('#contextualContentMenu:first').length) return true;
    jq('.contentmenu_selected').removeClass('contentmenu_selected');
    jq('#contextualContentMenu').remove();
};

function openContextualContentMenu(event, element, menuTemplate, afterContextualContentMenuOpened, path, data) {
    if (!menuTemplate) var menuTemplate = 'contextualContentMenu';
    if (!element) var element = this;
    if (!data) var data = {};
    event.preventDefault();
    jq(document).mousedown(closeContextualContentMenu);
    jq('.contentmenu_selected').removeClass('contentmenu_selected');
    jq(element).addClass('contentmenu_selected');
    jq('#contextualContentMenu').remove();
    jq('#kss-spinner').show();
    if (!path) {
        if (jq(element).attr('href')) {
            var path = jq(element).attr('href');
        } else if (jq(element).find('a.contextualContentMenuLink').attr('href')) {
            var path = jq(element).find('a.contextualContentMenuLink').attr('href');
        } else if (jq(element).find('a').attr('href')) {
            var path = jq(element).find('a').attr('href');
        } else if (jq(element).parents('a.contextualContentMenuLink').attr('href')) {
            var path = jq(element).parents('a.contextualContentMenuLink').attr('href');
        } else if (jq(element).parents('a').attr('href')) {
            var path = jq(element).parents('a').attr('href');
        }
    }
    if (path.substring(path.length-5, path.length) == '/view') var path = path.substring(0, path.length-5);
    if (path.substring(path.length-16, path.length) == '/folder_contents') var path = path.substring(0, path.length-16);
    headers = { 'X-CSRF-TOKEN': SolgemaFullcalendarVars.csrfToken },
    jq.get(path+'/'+menuTemplate, data, headers,
        function (msg) {
            if (msg) {
                jq('body').append(msg);
                var bodywidth = jq('body').width();
                if ( bodywidth < event.pageX+400) {
                    jq('#contextualContentMenu').addClass('onleft');
                    if ( bodywidth < event.pageX+150) {
                        jq('#contextualContentMenu').css('right', bodywidth-event.pageX+20+'px');
                        jq('#contextualContentMenu').css('top', event.pageY+10+'px');
                    } else {
                    jq('#contextualContentMenu').css('left', event.pageX+20+'px');
                    jq('#contextualContentMenu').css('top', event.pageY+10+'px');
                    }
                } else {
                    jq('#contextualContentMenu').css('left', event.pageX+20+'px');
                    jq('#contextualContentMenu').css('top', event.pageY+10+'px');
                }
                jq(initializeContextualMenus);
            }
            if (afterContextualContentMenuOpened) afterContextualContentMenuOpened(event);
            jq('#kss-spinner').css('display','none');
        }
    );
    return false;
};

function activateContextualContentMenu() {
    jq('.contextualContentMenuEnabled').bind("contextmenu", openContextualContentMenu);
};

jq(activateContextualContentMenu);



