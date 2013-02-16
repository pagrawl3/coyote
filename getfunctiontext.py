import re

def getFunctionText(filename, functionName, param_list):
    data = open(filename, "rb").read()
    raw = data
    data = data.split('\n')
    count = 0
    start = 0
    firstFound = 0
    text = []
    for a in data:
        if functionName in a:
            start = 1
        if(start):
            for b in a:
                text.append(b)
                if '{' in b:
                    firstFound=1
                    count+=1
                if '}' in b:
                    count-=1
                if(count==0 and firstFound):
                    return 

def checkfnname(fn,testname):
    return (' ' + fn) in testname or ('\t' + fn) in testname or ('\n' + fn) in testname

def search(param_list,params):
    params2 = params.split(',')
    if len(param_list) != len(params2):
        if(len(param_list)==0 and ',' not in params):
            return True
        return False
    return all(x in y for (x,y) in zip(param_list,params2))

def test(filename, functionName, param_list):
    # Have to check for " and  ' and \
    # Check for \ only if it is inside " or '
    startIndex = 0
    endIndex = 0
    data = open(filename, "rb").read()
    raw = data
    testname = ""
    start = 0
    doubleQ = -1
    singleQ = -1
    slash = -1
    firstFound=0
    text=[]
    blockQuote = False
    lineQuote = False
    count=0
    for w in enumerate(data):
        temp1 = w[1]
        if start==1:
            text.append(temp1)
            if temp1=='"' and slash==-1:
                doubleQ*=(-1)
            if temp1=="'" and slash==-1:
                singleQ*=(-1)
            if slash==1:
                slash=-1
            if temp1=="\\" and (doubleQ==1 or singleQ==1):
                slash*=(-1)
            if temp1=="{" and (doubleQ == -1 and singleQ == -1):
                count+=1
                firstFound=1
            elif temp1=="}" and (doubleQ == -1 and singleQ == -1):
                count-=1
            if count==0 and firstFound==1:
                endIndex = w[0]
                return ''.join(text),startIndex,endIndex
        else:
            if(doubleQ==-1 and singleQ==-1 and not blockQuote and not lineQuote):
                testname+=temp1
            if doubleQ==-1 and singleQ==-1:
                if temp1=='*' and w[0] > 0 and data[w[0]-1] == '/' and not lineQuote:
                    blockQuote = True
                if temp1=='/' and w[0] > 0 and data[w[0]-1] == '*' and not lineQuote:
                    blockQuote = False
                if temp1=='/' and w[0] > 0 and data[w[0]-1] == '/' and not blockQuote:
                    lineQuote = True
            if not blockQuote and not lineQuote:
                if temp1=='"' and slash==-1:
                        doubleQ*=(-1)
                if temp1=="'" and slash==-1:
                    singleQ*=(-1)
                if slash==1:
                    slash=-1
                if temp1=="\\" and (doubleQ==1 or singleQ==1):
                    slash*=(-1)
                if temp1=="(" and (doubleQ == -1 and singleQ == -1):
                    count+=1
                    firstFound=1
                elif temp1==")" and (doubleQ == -1 and singleQ == -1):
                    count-=1
                if checkfnname(functionName,testname) and count==0 and doubleQ==-1 and singleQ==-1:
                    #
                    i=0
                    params=""
                    cont=0
                    while(data[w[0]+i]!=')'):
                        params += data[w[0]+i]
                        i+=1
                    pattern = '[.]*'
                    for x in param_list:
                        pattern += x + '[.]*'
                    prog = re.compile(pattern)
                    i=0
                    checked = ""
                    while(data[w[0]+i]!=";"):
                        checked += data[w[0]+i]
                        if(data[w[0]+i]=="{"):
                            cont=1
                            break
                        i+=1
                    if(search(param_list,params) and cont==1):
                        start=1
                        startIndex = w[0]
                        firstFound=0
                    testname=""
                        
            if lineQuote and temp1=='\n':
                lineQuote = False
                    
                
    
    
 
                
        
