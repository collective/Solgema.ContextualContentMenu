from Products.Five import BrowserView
from zope.interface import implements

import interfaces


class SolgemaContextualContentMenu(BrowserView):
    """Solgema Contextual Content menu"""

    implements(interfaces.ISolgemaContextualContentMenu)

    def __init__(self, context, request):
        super(SolgemaContextualContentMenu, self).__init__(context, request)
        # alsoProvides(self.request, IDisableCSRFProtection)


