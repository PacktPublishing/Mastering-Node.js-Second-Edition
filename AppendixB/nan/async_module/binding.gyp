{
   "targets": [
     {
       "target_name": "nan_addon",
       "sources": [
         "addon.cc",
         "sync.cc",
         "async.cc"
       ],
       "include_dirs": ["<!(node -e \"require('nan')\")"]
     }
   ]
 }