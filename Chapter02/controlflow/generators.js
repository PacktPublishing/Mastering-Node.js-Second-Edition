function getArraySomehow() {
    // slice into a copy; don't send original
    return ['one','two','buckle','my','shoe'].slice(0);
}

let state = getArraySomehow();
for(let x=0; x < state.length; x++) {
    console.log(state[x].toUpperCase());
}

function* liveData() {
    let state = ['one','two','buckle','my','shoe'];
    let current;

    while(current = state.shift()) {
        yield current;
    }
}

let list = liveData();
let item;
while (item = list.next()) {
    if(!item.value) {
        break;
    }
    console.log('generated: ', item.value);
}


function* range(start=1, end=2) {
    do {
        yield start;
    } while(++start <= end)
}

for (let num of range(1, 3)) {
    console.log(num);
}

function* threeThings() {
    yield 'one';
    yield 'two';
    yield 'three';
}

let tt = threeThings();

console.log(tt); // {}
console.log(tt.next()); // { value: 'one', done: false }
console.log(tt.next()); // { value: 'two', done: false }
console.log(tt.next()); // { value: 'three', done: false }
console.log(tt.next()); // { value: undefined, done: true }

function demoIterator(array) {
    let idx = 0;

    return {
        next: () => {
            return idx < array.length ? {
                value: array[idx++],
                done: false
            } : {
                done: true
            };
        }
    };
}

let it = demoIterator(['one', 'two', 'three']);
console.log(it); // { next: [Function: next] }
console.log(it.next()); // { value: 'one', done: false }
console.log(it.next()); // { value: 'two', done: false }
console.log(it.next()); // { value: 'three', done: false }
console.log(it.next()); // { value: undefined, done: true }


/*
https://jakearchibald.com/2014/iterators-gonna-iterate/
    http://exploringjs.com/es6/ch_iteration.html
 https://dmitripavlutin.com/how-three-dots-changed-javascript/

var myIterable = {}
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
[...myIterable] // [1, 2, 3]
    */