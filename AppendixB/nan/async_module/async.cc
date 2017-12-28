#include <nan.h>

using v8::Local;
using v8::Number;
using v8::Value;

using namespace Nan;

int Run(int cycles);

class Worker : public AsyncWorker {
 public:
  Worker(Callback *callback, int cycles)
    : AsyncWorker(callback), cycles(cycles) {}
  ~Worker() {}

  // This executes in the worker thread.
  // #result is being place on "this" (private.result)
  void Execute () {
    result = Run(cycles);
  }

  // When the async work is complete execute this function in the main event loop
  // We're sending back two arguments to fulfill standard Node callback
  // pattern (error, result) -> (Null(), New<Number>(result))
  void HandleOKCallback () {
    HandleScope scope;

    Local<Value> argv[] = {
        Null()
      , New<Number>(result)
    };

    callback->Call(2, argv);
  }

 private:
  int cycles;
  int result;
};

NAN_METHOD(RunAsync) {
  int cycles = To<int>(info[0]).FromJust();
  Callback *callback = new Callback(To<v8::Function>(info[1]).ToLocalChecked());

  AsyncQueueWorker(new Worker(callback, cycles));
}