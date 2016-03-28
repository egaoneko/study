from collections import defaultdict

__author__ = "Donghyun Seo"
__copyright__ = "Copyright ⓒ 2016, All rights reserved."
__email__ = "egaoneko@naver.com"


def makeInverseIndex(strlist):
    dic = defaultdict(set)

    for i, str in enumerate(strlist):
        for word in str.split():
            dic[word].add(i)

    return dic


def orSearch(inverseIndex, query):
    document = set()

    for word in query:
        document.update(inverseIndex[word])

    return document


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
    with open('stories_small.txt', 'r') as f:
        lines = f.readlines()
        inverseIndex = makeInverseIndex(lines)
        orSearchResult = orSearch(inverseIndex, query)
        andSearchResult = andSearch(inverseIndex, query)
    print(inverseIndex)
    print(orSearchResult)
    print(andSearchResult)
