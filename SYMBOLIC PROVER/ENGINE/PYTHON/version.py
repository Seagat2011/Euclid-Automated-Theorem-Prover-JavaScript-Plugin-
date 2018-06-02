#!/usr/bin/python

class EUCLID_VERSION:
  
  MAJOR = 0
  MINOR = 0
  BUGFIX = 0
  PATCH = 0
  
  def setMajorVersion(self,i):
    self.MAJOR = i
  def setMinorVersion(self,i):
    self.MINOR = i
  def setBugfixVersion(self,i):
    self.BUGFIX = i
  def setPatchVersion(self,i):
    self.PATCH = i
  def toString(self):
    return ( str(self.MAJOR) + "." + str(self.MINOR) + "." + str(self.BUGFIX) + "." + str(self.PATCH) )