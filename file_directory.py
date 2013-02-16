import os

def get_listings():
    final_listing = []
    for dirname, dirnames, filenames in os.walk('.'):
        # print path to all subdirectories first.
        listing = []
        for subdirname in dirnames:
            listing.append(os.path.join(dirname, subdirname))
        # print path to all filenames.
        for filename in filenames:
            listing.append(os.path.join(dirname, filename))

        final_listing = final_listing + [w for w in listing if ((".h" in w[-2:] or ".cpp" in w[-4:]) and 'svn-base' not in w and len(w)>0)]

    return final_listing
        
def get_files():
    listings = get_listings()
    return [{'path':w,'content':open(w,'rb').read()} for w in listings]
