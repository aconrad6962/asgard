#!/usr/bin/env python3
#
#  ABE - Asgard Back End
#
#  Send row updates to Asgard front end (JavaScript in browser)
#  via JSON.  AO events come from MongoDB.
#
#  Revision History:
#    23-Jan-2024    ARC    Original 

from lbt.dms.zwgd.core import AbstractProducer, DataProduct, COMPRESS
from lbt.dms.common.mongodb import get_db
import time

name = 'demo1'

class Demo1(AbstractProducer):
    def __init__(self):
        super().__init__('demo1')
        self.db = get_db('AO', rw=False)
        self.poll_time = 1

    def mainloop(self):
        super().mainloop(self.poll_time)


    def getVals( self, data ):
      val00    = data[ 'wfsarb.R.FSM_STATE' ]
      val21raw = data[ 'optloopdiag.R.SLOPERMS' ]
      val23raw = data[ 'auxloops.R.modalplotTask.sr' ]

      val21 = "%2.2lf" % val21raw
      val23 = "%2.1lf" % val23raw

#     mydata = {'row':1,'gc':'blue','yc':'blue','rc':'blue','text':tval}
      mydata = { 'row':711,    'row00gc':'lightgrey', 'row00text': val00,
                            'row21color':'lightgrey', 'row21text': val21,
                            'row23color':'lightgrey', 'row23text': val23 }
      return DataProduct(mydata)

    def on_poll(self):
      self.data = {'MongoTestApp.L.TEST_REAL' : 2 }
      self.data = self.db.dxsoul.find_one(projection={'_id': 0})

      d = self.getVals(self.data[ 'data' ])
      return d

    def on_subscribe(self, msg=None):
        return DataProduct({'message': 'CONNECTED', 'time': time.time()})

def main():
    producer = Demo1()
    producer.mainloop()

main()
