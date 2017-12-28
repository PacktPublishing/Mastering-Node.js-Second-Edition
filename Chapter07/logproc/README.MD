# Log processor

There is a sample file `short.log` in this bundle which can be used to test the service.

To install:

```
npm i
```

To run:

```
node bin/master.js -f ./long.log -rmin 0 -rmax 20
```

You should see a simple distribution mapping of the data contained in `short.log`. Go ahead and play with the numbers.