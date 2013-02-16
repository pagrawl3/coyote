import os
import re
pattern = '(at[" "]0x[0-9A-F]*:)|(by[" "]0x[0-9A-F]*:)'
prog = re.compile(pattern)
def trim(a):
    return a.lstrip().rstrip()

def cleanLine(line):
	return ':'.join(line.split(':')[1:])

def parseLine(line):
    if '.cpp' in line:
        clean = cleanLine(line)
        temp = clean.split('(')
        first = '('.join(temp[:-1])
        last = '(' + temp[-1]
        middle = last.split(':')[0][1:]
        third = last.split(':')[1][:-1]
        first = trim(first)
        return {'function':parseFunction(first,third),'filename':middle,
                'lineno':third,'clickable':True}
    return {'text':trim(cleanLine(line)),'clickable':False}

def parseFunction(functionName,lineNo):
    return functionName

def getSplitVal(raw):
    for w in raw.split('\r\n'):
        if w.rstrip()[-2:]=="==":
            return w + '\r\n'

def test():
    filename = 'output.txt'
    raw = open(filename,'rb').read()
    splitVal = getSplitVal(raw)
    data = raw.split(splitVal)[1:]
    splitVal = splitVal[:-2]
    data = [w.replace(splitVal,'') for w in data]
    data[0] = data[0].lstrip()
    return data,[parseError(w) for w in data]

def parseError(chunk):
    data = chunk.split('\r\n')
    out = {'error':[],'trace':[],'other':[]}
    if len(data) >= 1:
        for w in data:
            if test_pattern(w.lstrip()):
                out['trace'].append(parseLine(w))
            elif not out['trace']:
                out['error'].append(w)
            else:
                out['other'].append(w)
        return out
    return None

def test_pattern(val):
    return bool(prog.search(val))
