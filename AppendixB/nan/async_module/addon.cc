#include <nan.h>
#include "addon.h"

NAN_METHOD(RunSync);
NAN_METHOD(RunAsync);

NAN_MODULE_INIT(Init) {
  Set(target, New("runSync").ToLocalChecked(),
  GetFunction(New<v8::FunctionTemplate>(RunSync)).ToLocalChecked());

  Set(target, New("runAsync").ToLocalChecked(),
  GetFunction(New<v8::FunctionTemplate>(RunAsync)).ToLocalChecked());
}

NODE_MODULE(nan_addon, Init)