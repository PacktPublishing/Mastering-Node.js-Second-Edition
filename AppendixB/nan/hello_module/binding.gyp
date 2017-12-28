{
     "targets": [{
         "include_dirs": [
             "<!(node -e \"require('nan')\")"
         ],
         "target_name": "hello",
         "sources": [
             "hello.cc"
         ]
     }]
 }