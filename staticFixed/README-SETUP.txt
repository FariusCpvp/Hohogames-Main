HOHOGAMES BROWSER STATIC

This folder is designed to be mounted at /static/ by the existing Node/Express app.
It keeps the supplied Ultraviolet proxy files and adds a browser-style UI with:
- search / URL navigation
- encoded proxy URLs
- back / forward / reload / home controls
- loading progress
- responsive black / white / gray styling

IMPORTANT:
The supplied archive is Ultraviolet, not Scramjet. This package fixes and styles the
Ultraviolet static client. A true Scramjet deployment requires the Scramjet packages
and server integration; simply renaming the UV files would not make it Scramjet.

The proxy config still uses the Bare endpoint that was supplied in the original archive.
If that endpoint is unavailable, pages will not load until a working Bare transport/server
is configured.
