using namespace Nan;

   int Run (int cycles) {
       // using volatile prevents compiler from optimizing loop (slower)
       volatile int i = 0;
       for (; i < cycles; i++) {}
       return cycles;
   }