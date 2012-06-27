from cgi import escape
from datetime import date
from urllib import unquote

from plone.memoize.view import memoize
from zope.component import getMultiAdapter
from zope.deprecation.deprecation import deprecate
from zope.interface import implements, alsoProvides
from zope.viewlet.interfaces import IViewlet
from Products.CMFCore.utils import getToolByName
from AccessControl import getSecurityManager
from Acquisition import aq_base, aq_inner
from Products.CMFCore.utils import getToolByName
from Products.CMFPlone.utils import safe_unicode
from Products.Five.browser import BrowserView
from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile

from plone.app.layout.globals.interfaces import IViewView

from zope.publisher.browser import BrowserPage

class ContentActionsViewlet(BrowserPage):
    template = ViewPageTemplateFile('contentactions.pt')

    def object_actions(self):
        context = aq_inner(self.context)
        context_state = getMultiAdapter((context, self.request),
                                        name=u'plone_context_state')

        return context_state.actions('object')+context_state.actions('object_actions')

    def update(self):
        if IViewView.providedBy(self.__parent__):
            alsoProvides(self, IViewView)

    def icon(self, action):
        return action.get('icon', None)
    
    def __call__(self):
        self.update()
        return self.template()
