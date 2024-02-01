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

from lbt.dms.zwgd.core import AbstractProducer, DataProduct
import time

name = 'demo1'

class Demo1(AbstractProducer):
    num = 10           # count down timer for time to stay in each state
    odMin = -3         # overdue minimum
    rnum = 1           # row number within front end acq display
    snum = 1           # seq number within front end sci display
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
        self.state = "Acq"   #  exits this state
        t = "Acquisition in Progress"
        gc = "lightyellow"
        yc = ""
        rc = ""
        self.num = 10
        self.rnum = 1
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
          self.snum = 0
          self.state = "Sci"   #  exits this state
        # hack to fast frwrd to the end
        if 2 < self.rnum and self.rnum < 7:
          self.num = 3
      return DataProduct(mydata)

    def process_sci_state(self):
      if self.snum == 0:
        self.snum = 1
        self.state = "Sci"
        t = "Ready for Science"
        gc = "lightgreen"
        yc = ""
        rc = ""
        mydata = {'row': 0, 'gc': gc, 'yc': yc, 'rc': rc, 'text': t }
      elif self.snum < 6:
        if self.num > 0:
          self.num -= 1
          text = ""
          color = "lightyellow"
          if self.snum == 1:
            row = 12
          if self.snum == 2:
            row = 13
          if self.snum == 3:
            row = 12
          if self.snum == 4:
            row = 11
          if self.snum == 5:
            row = 12
          mydata = {'row': row, 'color': color, 'text': text }
        else:
            self.snum += 1     # move to next light in sqnc
            self.num   = 10    # reset countdown timer
      else:
        self.state = "Ready"   #  exits this state
        t = ""
        gc = ""
        yc = ""
        rc = ""
        self.num = 10
        print( "here i am\n" )
        mydata = {'row': -1, 'gc': gc, 'yc': yc, 'rc': rc, 'text': t }
      return DataProduct(mydata)

    def on_poll(self):
      if self.state == 'Ready':
        d = self.process_rdy_state()
      elif self.state == 'Acq':
        d = self.process_acq_state()
      elif self.state == 'Sci':
        d = self.process_sci_state()
      print( "state, rnum, num = %s, %d, %d" % ( self.state, self.rnum, self.num ) )
      print( d )
      return d

    def on_subscribe(self, msg=None):
        return DataProduct({'message': 'CONNECTED', 'time': time.time()})

pd = Demo1(name)
pd.mainloop()

