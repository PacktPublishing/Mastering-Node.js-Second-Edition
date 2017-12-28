#include <nan.h>

NAN_METHOD(sayHello) {
    auto message = Nan::New("Hello Node from NAN code!").ToLocalChecked();
    // 'info' is an implicit bridge object between JavaScript and C++
    info.GetReturnValue().Set(message);
}

NAN_MODULE_INIT(Initialize) {
    // Similar to the 'export' statement in Node -- export the sayHello method
    NAN_EXPORT(target, sayHello);
}

// Create and Initialize function created with NAN_MODULE_INIT macro
NODE_MODULE(hello, Initialize);