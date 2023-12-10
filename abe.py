#!/usr/bin/env python3
#
#  ABE - Asgard Back End
#
#  Monitor AO events from MongoDB then send row updates to
#  Asgard front end (JavaScript in browser) via JSON.
#
#  Revision History:
#    10-Oct-2021    ARC    Original 


from lbt.dms.zwgd.core import AbstractProducer, DataProduct
import time

name = 'demo1'


class Demo1(AbstractProducer):
    num = 10
    odMin = -3
    rnum = 1

    def on_poll(self):
        self.num -= 1
        if self.num < self.odMin:
            t  = "Complete"
            gc = "lime"
            yc = "gray"
            rc = "gray"
            self.num = 10
        else:
          if (self.num > 0 ):
            t  = "Time Remaining  " + str(self.num)
            gc = "gray"
            yc = "yellow"
            rc = "gray"
          else:
            t = "OVERDUE  " + str(self.num)
            gc = "gray"
            yc = "gray"
            rc = "red"
        mydata = {'row': self.rnum, 'gc': gc, 'yc': yc, 'rc': rc, 'text': t }
        if self.num == 10:
          self.rnum += 1
          if self.rnum > 7:
            self.rnum = 1
        return DataProduct(mydata)

    def on_subscribe(self, msg=None):
        return DataProduct({'message': 'CONNECTED', 'time': time.time()})

pd = Demo1(name)
pd.mainloop()

