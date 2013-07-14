#!/usr/bin/env python
import sys
import os
 
if __name__ == '__main__':
    module = __import__(sys.argv[1])
    path = module.__file__.replace('.pyc', '.py')
    if os.path.basename(path) == '__init__.py':
        path = os.path.dirname(path)
    print 'Opening "%s"' % path
    # os.system('$EDITOR "%s"' % path)
    os.system('mate "%s"' % path)
    