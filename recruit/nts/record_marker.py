import sys
import random
import unittest

rl = lambda: sys.stdin.readline()


# n = int(rl())

def record_marker(n):
    nt_format = "NT{:05d}"
    records = {}
    while len(records) < n:
        nt_id = nt_format.format(random.randrange(99999))
        if nt_id in records:
            continue
        score = random.randrange(0, 101)
        records[nt_id] = score
    return records


class RecordMarkerTest(unittest.TestCase):
    def test_record_marker(self):
        records = record_marker(1000)

        for k, v in records.items():
            self.assertEqual(len(k), 7)
            self.assertTrue(0 <= v <= 100)


if __name__ == '__main__':

    if len(sys.argv) < 2:
        print("python record_marker.py (n)")
        exit()

    try:
        n = int(sys.argv[1])
    except ValueError:
        print("Please enter integer parameter.")
        exit()

    records = record_marker(n)

    for k, v in records.items():
        print(k + ' ' + str(v))
