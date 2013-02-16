
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
        return first,middle, third
    return trim(cleanLine(line))

def getSplitVal(raw):
    for w in raw.split('\r\n'):
        if w.rstrip()[-2:]=="==":
            return w + '\r\n'

def test():
    filename = 'output.txt'
    raw = open(filename,'r').read()
    splitVal = getSplitVal(raw)
    data = raw.split(splitVal)[1:]
    splitVal = splitVal[:-1]
    #return parseError(data[0].replace(splitVal,''))
    return [parseError(w.replace(splitVal,'')) for w in data]

def parseError(chunk):
    data = chunk.split('\r\n')
    if len(data) >= 2:
        error = data[1]
        trace = getTrace(data[2:])
        return error,trace
    return None

def getTrace(data_chunk):
    return [parseLine(w) for w in data_chunk if w]
