#!/usr/bin/env python3
#
#  ABE - Asgard Back End
#
#  Send row updates to Asgard front end (JavaScript in browser)
#  via JSON.  For now it's a simple simulation.  Someday it will
#  monitor AO events (from MongoDB?).
#
#  Revision History:
#    10-Oct-2021    ARC    Original 
#    30-Dec-2023    ARC    Addding states 
#    23-Jan-2024    ARC    New messages for loop state

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


#  Just uses random test data for now
    def getSlopeRMS( self ):
      sval = (self.data[ 'data' ])[ 'MongoTestApp.L.TEST_REAL' ]
  
      mydata = {'row':1,'gc':'blue','yc':'blue','rc':'blue','text':str(sval)}
      print( sval )
      return DataProduct(mydata)

    def on_poll(self):
      self.data = {'MongoTestApp.L.TEST_REAL' : 2 }
      self.data = self.db.bmwfs.find_one(projection={'_id': 0})

      d = self.getSlopeRMS()
      return d

    def on_subscribe(self, msg=None):
        return DataProduct({'message': 'CONNECTED', 'time': time.time()})

def main():
    producer = Demo1()
    producer.mainloop()

main()
