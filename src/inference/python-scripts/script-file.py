import os
import sys
import csv
import numpy as np

def main(input):
  # print(f"I got input file {argv}")
  filename = input['originalname']
  data = input['buffer'].stringify()
  
  with open(f'tmp/{filename}', 'w') as f:
    f.write(data)

  f = open(f'tmp/{filename}','r')
  rdr = csv.reader(f)

  for line in rdr:
    print(line)
  
  os.remove(f.name)

if __name__=="__main__":
  main(sys.argv[1][0])