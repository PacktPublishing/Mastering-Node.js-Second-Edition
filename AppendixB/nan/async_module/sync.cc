#include <nan.h>

int Run(int cycles);

// Simple synchronous access to the `Run()` function
NAN_METHOD(RunSync) {
 // Expect a number as first argument
 int cycles = info[0]->Uint32Value();
 int result = Run(cycles);

 info.GetReturnValue().Set(result);
}