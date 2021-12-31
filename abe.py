#!/usr/bin/env python3

#
#  ABE - Asgard Back End
#
#  Monitor AO events from MongoDB then send row updates to
#  Asgard front end (JavaScript in browser) via JSON.
#
#  Revision History:
#    10-Oct-2021    ARC    Original 

from lbt.dms.zwgd.core import Producer
import time

name = 'demo1'

pd = Producer(name)

while True:
    msg = {'rname': 'row1','inprog': 0,'timerem': 0,'cmplt': 1,'fault': 0}
    print(msg)
    pd.push_data_json(msg)
    msg = pd.check_inbox()
    if msg: print(f'inbox: {msg}')
      time.sleep(1)


