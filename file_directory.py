import os

for dirname, dirnames, filenames in os.walk('./mp2'):
    # print path to all subdirectories first.
    for subdirname in dirnames:
        print os.path.join(dirname, subdirname)
    print
    print
    print
    # print path to all filenames.
    for filename in filenames:
        print os.path.join(dirname, filename)

    
