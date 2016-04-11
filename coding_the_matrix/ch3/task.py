from ch2.resource.plotting import plot

__author__ = "Donghyun Seo"
__copyright__ = "Copyright ⓒ 2016, All rights reserved."
__email__ = "egaoneko@naver.com"


# Task 3.4.3
def add2(v, v0):
    return [v[0] + v0[0], v[1] + v0[1]]


def addn(v, v0):
    # return [v[i] + v0[i] for i in range(len(v))]
    return [x + y for x, y in zip(v, v0)]


# Quiz 3.5.3
# Task 3.5.4
def scalar_vector_mult(alpha, v):
    return [alpha * x for x in v]


# Task 3.6.9
def segment(pt1, pt2):
    return [add2(scalar_vector_mult(ap / 100, pt1), scalar_vector_mult(1 - (ap / 100), pt2)) for ap in range(101)]


# Quiz 3.9.4
def list_dot(u, v):
    return sum([x * y for x, y in zip(u, v)])


# Quiz 3.9.15
def dot_product_list(needle, haystack):
    s = len(needle)
    return [list_dot(needle, haystack[i:i + s]) for i in range(len(haystack) - s + 1)]


# Task 3.12.1
def create_voting_dict(strlist):
    voting_dict = {}
    for member in strlist:
        records = member.strip().split(' ')
        bills = []
        for i in range(3, len(records)):
            bills.append(int(records[i]))
        voting_dict[records[0]] = bills
    return voting_dict


def create_sen_set(strlist, party):
    sen_set = set()
    for member in strlist:
        records = member.strip().split(' ')
        if records[1] == party:
            sen_set.add(records[0])
    return sen_set


# Task 3.12.2
def policy_compare(sen_a, sen_b, voting_dict):
    return list_dot(voting_dict[sen_a], voting_dict[sen_b])


# Task 3.12.3
def most_similar(sen, voting_dict):
    most_similar_sen = None
    max_similarity = None
    for member in voting_dict:
        if member == sen:
            continue

        similarity = policy_compare(sen, member, voting_dict)
        if max_similarity is None or max_similarity < similarity:
            max_similarity = similarity
            most_similar_sen = member
    return most_similar_sen


# Task 3.12.4
def least_similar(sen, voting_dict):
    least_similar_sen = None
    min_similarity = None
    for member in voting_dict:
        if member == sen:
            continue

        similarity = policy_compare(sen, member, voting_dict)
        if min_similarity is None or min_similarity > similarity:
            min_similarity = similarity
            least_similar_sen = member
    return least_similar_sen


# Task 3.12.7
def find_average_similarity(sen, sen_set, voting_dict):
    return sum([policy_compare(sen, sen_a, voting_dict) for sen_a in sen_set]) / len(sen_set)


# Task 3.12.8
def find_average_record(sen_set, voting_dict):
    record = None

    for sen in sen_set:
        if record is None:
            record = voting_dict[sen]
        record = addn(record, voting_dict[sen])
    return scalar_vector_mult(1 / len(sen_set), record)


# Task 3.12.9
def bitter_rivals(voting_dict):
    keys = list(voting_dict.keys())

    rival = None
    minimum = None
    for i in range(len(keys)):
        for j in range(i + 1, len(keys)):
            comp = policy_compare(keys[i], keys[j], voting_dict)
            if minimum is None or minimum > comp:
                minimum = comp
                rival = keys[i], keys[j]
    return rival


if __name__ == '__main__':
    # Task 3.3.2
    L = [[2, 2], [3, 2], [1.75, 1], [2, 1], [2.25, 1], [2.5, 1], [2.5, 1], [2.75, 1], [3, 1], [3.25, 1]]
    # plot(L, 4)

    # Task 3.4.3
    # plot([add2(v, [1, 2]) for v in L], 4)
    # plot([addn(v, [1, 2]) for v in L], 4)

    # Task 3.5.4
    # plot([scalar_vector_mult(0.5, v) for v in L] + [scalar_vector_mult(-0.5, v) for v in L], 4)

    # plot([scalar_vector_mult(i / 100, [3, 2]) for i in range(101)], 5)
    # plot([add2(scalar_vector_mult(i / 100, [3, 2]), [0.5, 1]) for i in range(101)], 5)

    # Task 3.6.9
    # plot(segment([3.5, 3], [0.5, 1]), 2)

    # Quiz
    assert list_dot([1, 2, 3], [4, 5, 6]) == 32
    assert dot_product_list([1, -1, 1, 1, -1, 1], [1, -1, 1, 1, 1, -1, 1, 1, 1]) == [2, 2, 0, 0]

    # Task 3.12.1
    with open("resource/voting_record_dump109.txt") as f:
        mylist = list(f)
    voting_dict_109 = create_voting_dict(mylist)

    # Task 3.12.2
    print(policy_compare('McConnell', 'Akaka', voting_dict_109))

    # Task 3.12.3
    print(most_similar('McConnell', voting_dict_109))

    # Task 3.12.4
    print(least_similar('McConnell', voting_dict_109))

    # Task 3.12.5
    print(most_similar('Chafee', voting_dict_109))
    print(least_similar('Santorum', voting_dict_109))

    # Task 3.12.7
    sen_set_109 = create_sen_set(mylist, 'R')
    print(find_average_similarity('Chafee', sen_set_109, voting_dict_109))

    max_similarity_109 = None
    max_mem = None
    for mem in voting_dict_109:
        similarity_109 = find_average_similarity(mem, sen_set_109, voting_dict_109)
        if max_similarity_109 is None or max_similarity_109 < similarity_109:
            max_similarity_109 = similarity_109
            max_mem = mem
    print(max_mem)

    # Task 3.12.8
    average_Democrat_record = find_average_record(sen_set_109, voting_dict_109)
    print(average_Democrat_record)

    max_similarity_109 = None
    max_mem = None
    for mem in voting_dict_109:
        similarity_109 = list_dot(average_Democrat_record, voting_dict_109[mem])
        if max_similarity_109 is None or max_similarity_109 < similarity_109:
            max_similarity_109 = similarity_109
            max_mem = mem
    print(max_mem)

    # Task 3.12.9
    print(bitter_rivals(voting_dict_109))

    # Problem 3.14.8
    # plot([add2(scalar_vector_mult(i / 100, [4.5, -2]), [-1.5, 2]) for i in range(101)], 5)
    plot(segment([2, 1], [-2, 2]), 5)
