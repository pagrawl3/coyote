import os

for dirname, dirnames, filenames in os.walk('.'):
    # print path to all subdirectories first.
    listing = []
    for subdirname in dirnames:
        listing.append(os.path.join(dirname, subdirname))
    # print path to all filenames.
    for filename in filenames:
        listing.append(os.path.join(dirname, filename))

    final_listing = [w for w in listing if ((".h" in w[-2:] or ".cpp" in w[-4:]) and 'svn-base' not in w)]
    for a in final_listing:
        #if len(a)>0:
        print a

    
