#!/usr/bin/python

import version 
import hashlib

ver = version.EUCLID_VERSION()
ver.setMajorVersion(1)

print( "Euclid Automated Prover - Version %s - Loading Libraries.." % ver.toString() )

import axioms
import symbols

MD5 = hashlib.md5 # MD5("1".encode('utf-8')).hexdigest()
SHA1 = hashlib.sha1
SHA224 = hashlib.sha224
SHA256 = hashlib.sha256
SHA384 = hashlib.sha384
SHA512 = hashlib.sha512