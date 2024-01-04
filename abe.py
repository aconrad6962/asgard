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
#    30-Dec-2021    ARC    Addding states 

from lbt.dms.zwgd.core import AbstractProducer, DataProduct
import time

name = 'demo1'

class Demo1(AbstractProducer):
    num = 10           # count down timer for time to stay in each state
    odMin = -3         # overdue minimum
    rnum = 1           # row number within front end display
    state = "Ready"

    def process_rdy_state(self):
      self.num -= 1
      if self.num > 0:
        self.state = "Ready"
        t = "Ready for Acquisition"
        gc = "white"
        yc = ""
        rc = ""
      else:
        self.state = "Acq"
        t = "Acquisition in Progress"
        gc = "lightyellow"
        yc = ""
        rc = ""
        self.num = 10
      mydata = {'row': 0, 'gc': gc, 'yc': yc, 'rc': rc, 'text': t }
      return DataProduct(mydata)

    def process_acq_state(self):
      self.num -= 1
      if self.num < self.odMin:
          t  = "Complete"
          gc = "lime"
          yc = "gray"
          rc = "gray"
          self.num = 10
      elif self.num > 0:
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
          self.rnum = 0
          self.state = "Sci"
        # hack to fast frwrd to the end
        if 2 < self.rnum and self.rnum < 7:
          self.num = 3
      return DataProduct(mydata)

    def process_sci_state(self):
      self.num -= 1
      if self.num > 0:
        self.state = "Sci"
        t = "Ready for Science"
        gc = "green"
        yc = ""
        rc = ""
      else:
        self.state = "Ready"
        t = "Ready for Acquisition"
        gc = "white"
        yc = ""
        rc = ""
        self.num = 10
      mydata = {'row': 0, 'gc': gc, 'yc': yc, 'rc': rc, 'text': t }
      return DataProduct(mydata)

    def on_poll(self):
      if self.state == 'Ready':
        d = self.process_rdy_state()
      elif self.state == 'Acq':
        d = self.process_acq_state()
      elif self.state == 'Sci':
        d = self.process_sci_state()
      return d

    def on_subscribe(self, msg=None):
        return DataProduct({'message': 'CONNECTED', 'time': time.time()})

pd = Demo1(name)
pd.mainloop()

