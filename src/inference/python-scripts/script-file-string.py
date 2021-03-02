import os
import sys
import csv
import numpy as np

def main(argv):
  # print(f"I got input file {argv}")
  filename = argv[0]
  data = argv[1]
  
  with open(f'tmp/{filename}', 'w') as f:
    f.write(data)

  f = open(f'tmp/{filename}','r')
  rdr = csv.reader(f)

  for line in rdr:
    print(line)
  
  os.remove(f.name)

if __name__=="__main__":
  main(sys.argv[1:])