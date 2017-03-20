from setuptools import setup, find_packages
import os

version = '0.3'

setup(name='Solgema.ContextualContentMenu',
      version=version,
      description="Solgema Contextual Content Menu",
      long_description=open("README.rst").read() + "\n" +
                       open(os.path.join("docs", "HISTORY.rst")).read(),
      # Get more strings from http://www.python.org/pypi?%3Aaction=list_classifiers
      classifiers=[
        "Framework :: Plone",
        "Programming Language :: Python",
        "Topic :: Software Development :: Libraries :: Python Modules",
        ],
      keywords='Solgema, menu, javascript menu',
      author='Martronic SA',
      author_email='martronic@martronic.ch',
      url='http://www.martronic.ch/Solgema/plone_products/solgema_contextualcontentmenu',
      license='GPL',
      packages=find_packages(exclude=['ez_setup']),
      namespace_packages=['Solgema'],
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          'setuptools',
          # -*- Extra requirements: -*-
      ],
      entry_points="""
      # -*- Entry points: -*-
      [z3c.autoinclude.plugin]
      target = plone
      """,
      )
