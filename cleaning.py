def trim(a):
    return a.lstrip().rstrip()

def cleanLine(line):
	return ':'.join(line.split(':')[1:])

def parseLine(line):
    clean = cleanLine(line)
    temp = clean.split('(')
    first = '('.join(temp[:-1])
    last = '(' + temp[-1]
    middle = last.split(':')[0][1:]
    third = last.split(':')[1][:-1]
    first = trim(first)
    return first,middle, third
