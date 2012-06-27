from Products.CMFCore.utils import getToolByName

def installSolgemaContextualContentMenu(context):
    if context.readDataFile('solgemacontextualcontentmenu_various.txt') is None:
        return
    site = context.getSite()
    jstool = getToolByName(site, 'portal_javascripts')
    jstool.cookResources()
    csstool = getToolByName(site, 'portal_css')
    csstool.cookResources()

