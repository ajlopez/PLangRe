#!/usr/bin/env python
# vim: fileencoding=utf-8 :
 
from CGIHTTPServer import test, CGIHTTPRequestHandler as BaseRequestHandler
 
class CGIHTTPRequestHandler(BaseRequestHandler):
    def is_cgi(self):
        path = self.path
        if path.endswith('.py'):
            try:
                i = path.rindex('/')
                self.cgi_info = path[:i], path[i+1:]
            except ValueError, e:
                self.cgi_info = '', path
            return True
        return False
 
def main():
    test(CGIHTTPRequestHandler)
 
if __name__ == '__main__':
    main()
