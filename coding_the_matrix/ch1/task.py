from collections import defaultdict

__author__ = "Donghyun Seo"
__copyright__ = "Copyright ⓒ 2016, All rights reserved."
__email__ = "egaoneko@naver.com"


# Task 1.6.6
def makeInverseIndex(strlist):
    dic = defaultdict(set)

    for i, str in enumerate(strlist):
        for word in str.split():
            dic[word].add(i)

    return dic


# Task 1.6.7
def orSearch(inverseIndex, query):
    document = set()

    for word in query:
        document.update(inverseIndex[word])

    return document


# Task 1.6.8
def andSearch(inverseIndex, query):
    empty = True
    document = set()

    for word in query:
        if empty:
            document.update(inverseIndex[word])
            empty = False
        else:
            document.intersection_update(inverseIndex[word])

    return document


if __name__ == '__main__':
    query = ['moving', 'this', 'home', 'old', 'mythic']
    with open('resource/stories_small.txt', 'r') as f:
        lines = f.readlines()
        inverseIndex = makeInverseIndex(lines)
        orSearchResult = orSearch(inverseIndex, query)
        andSearchResult = andSearch(inverseIndex, query)
    print(inverseIndex)
    print(orSearchResult)
    print(andSearchResult)
