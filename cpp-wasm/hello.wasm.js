/**
 * @license
 * Copyright 2019 The Emscripten Authors
 * SPDX-License-Identifier: MIT
 */

// wasm2js.js - enough of a polyfill for the WebAssembly object so that we can load
// wasm2js code that way.

/** @suppress{duplicate, const} */
var WebAssembly = {
  // Note that we do not use closure quoting (this['buffer'], etc.) on these
  // functions, as they are just meant for internal use. In other words, this is
  // not a fully general polyfill.
  /** @constructor */
  Memory: function(opts) {
    this.buffer = new ArrayBuffer(opts['initial'] * 65536);
  },

  Module: function(binary) {
    // TODO: use the binary and info somehow - right now the wasm2js output is embedded in
    // the main JS
  },

  /** @constructor */
  Instance: function(module, info) {
    // TODO: use the module somehow - right now the wasm2js output is embedded in
    // the main JS
    // This will be replaced by the actual wasm2js code.
    this.exports = (
function instantiate(info) {
function Table(ret) {
  // grow method not included; table is not growable
  ret.set = function(i, func) {
    this[i] = func;
  };
  ret.get = function(i) {
    return this[i];
  };
  return ret;
}

  var bufferView;
  var base64ReverseLookup = new Uint8Array(123/*'z'+1*/);
  for (var i = 25; i >= 0; --i) {
    base64ReverseLookup[48+i] = 52+i; // '0-9'
    base64ReverseLookup[65+i] = i; // 'A-Z'
    base64ReverseLookup[97+i] = 26+i; // 'a-z'
  }
  base64ReverseLookup[43] = 62; // '+'
  base64ReverseLookup[47] = 63; // '/'
  /** @noinline Inlining this function would mean expanding the base64 string 4x times in the source code, which Closure seems to be happy to do. */
  function base64DecodeToExistingUint8Array(uint8Array, offset, b64) {
    var b1, b2, i = 0, j = offset, bLength = b64.length, end = offset + (bLength*3>>2) - (b64[bLength-2] == '=') - (b64[bLength-1] == '=');
    for (; i < bLength; i += 4) {
      b1 = base64ReverseLookup[b64.charCodeAt(i+1)];
      b2 = base64ReverseLookup[b64.charCodeAt(i+2)];
      uint8Array[j++] = base64ReverseLookup[b64.charCodeAt(i)] << 2 | b1 >> 4;
      if (j < end) uint8Array[j++] = b1 << 4 | b2 >> 2;
      if (j < end) uint8Array[j++] = b2 << 6 | base64ReverseLookup[b64.charCodeAt(i+3)];
    }
    return uint8Array;
  }
function initActiveSegments(imports) {
  base64DecodeToExistingUint8Array(bufferView, 65536, "LSsgICAwWDB4AC0wWCswWCAwWC0weCsweCAweABuYW4AaW5mAE5BTgBJTkYALgAobnVsbCkASGVsbG8sIHdvcmxkIQoAAAAAAAAAAAAAAAAZAAsAGRkZAAAAAAUAAAAAAAAJAAAAAAsAAAAAAAAAABkACgoZGRkDCgcAAQAJCxgAAAkGCwAACwAGGQAAABkZGQAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAZAAsNGRkZAA0AAAIACQ4AAAAJAA4AAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAEwAAAAATAAAAAAkMAAAAAAAMAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAA8AAAAEDwAAAAAJEAAAAAAAEAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAAAAAAAAAAAAAARAAAAABEAAAAACRIAAAAAABIAABIAABoAAAAaGhoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGgAAABoaGgAAAAAAAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAABcAAAAAFwAAAAAJFAAAAAAAFAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWAAAAAAAAAAAAAAAVAAAAABUAAAAACRYAAAAAABYAABYAADAxMjM0NTY3ODlBQkNERUZTdWNjZXNzAElsbGVnYWwgYnl0ZSBzZXF1ZW5jZQBEb21haW4gZXJyb3IAUmVzdWx0IG5vdCByZXByZXNlbnRhYmxlAE5vdCBhIHR0eQBQZXJtaXNzaW9uIGRlbmllZABPcGVyYXRpb24gbm90IHBlcm1pdHRlZABObyBzdWNoIGZpbGUgb3IgZGlyZWN0b3J5AE5vIHN1Y2ggcHJvY2VzcwBGaWxlIGV4aXN0cwBWYWx1ZSB0b28gbGFyZ2UgZm9yIGRlZmluZWQgZGF0YSB0eXBlAE5vIHNwYWNlIGxlZnQgb24gZGV2aWNlAE91dCBvZiBtZW1vcnkAUmVzb3VyY2UgYnVzeQBJbnRlcnJ1cHRlZCBzeXN0ZW0gY2FsbABSZXNvdXJjZSB0ZW1wb3JhcmlseSB1bmF2YWlsYWJsZQBJbnZhbGlkIHNlZWsAQ3Jvc3MtZGV2aWNlIGxpbmsAUmVhZC1vbmx5IGZpbGUgc3lzdGVtAERpcmVjdG9yeSBub3QgZW1wdHkAQ29ubmVjdGlvbiByZXNldCBieSBwZWVyAE9wZXJhdGlvbiB0aW1lZCBvdXQAQ29ubmVjdGlvbiByZWZ1c2VkAEhvc3QgaXMgZG93bgBIb3N0IGlzIHVucmVhY2hhYmxlAEFkZHJlc3MgaW4gdXNlAEJyb2tlbiBwaXBlAEkvTyBlcnJvcgBObyBzdWNoIGRldmljZSBvciBhZGRyZXNzAEJsb2NrIGRldmljZSByZXF1aXJlZABObyBzdWNoIGRldmljZQBOb3QgYSBkaXJlY3RvcnkASXMgYSBkaXJlY3RvcnkAVGV4dCBmaWxlIGJ1c3kARXhlYyBmb3JtYXQgZXJyb3IASW52YWxpZCBhcmd1bWVudABBcmd1bWVudCBsaXN0IHRvbyBsb25nAFN5bWJvbGljIGxpbmsgbG9vcABGaWxlbmFtZSB0b28gbG9uZwBUb28gbWFueSBvcGVuIGZpbGVzIGluIHN5c3RlbQBObyBmaWxlIGRlc2NyaXB0b3JzIGF2YWlsYWJsZQBCYWQgZmlsZSBkZXNjcmlwdG9yAE5vIGNoaWxkIHByb2Nlc3MAQmFkIGFkZHJlc3MARmlsZSB0b28gbGFyZ2UAVG9vIG1hbnkgbGlua3MATm8gbG9ja3MgYXZhaWxhYmxlAFJlc291cmNlIGRlYWRsb2NrIHdvdWxkIG9jY3VyAFN0YXRlIG5vdCByZWNvdmVyYWJsZQBPd25lciBkaWVkAE9wZXJhdGlvbiBjYW5jZWxlZABGdW5jdGlvbiBub3QgaW1wbGVtZW50ZWQATm8gbWVzc2FnZSBvZiBkZXNpcmVkIHR5cGUASWRlbnRpZmllciByZW1vdmVkAERldmljZSBub3QgYSBzdHJlYW0ATm8gZGF0YSBhdmFpbGFibGUARGV2aWNlIHRpbWVvdXQAT3V0IG9mIHN0cmVhbXMgcmVzb3VyY2VzAExpbmsgaGFzIGJlZW4gc2V2ZXJlZABQcm90b2NvbCBlcnJvcgBCYWQgbWVzc2FnZQBGaWxlIGRlc2NyaXB0b3IgaW4gYmFkIHN0YXRlAE5vdCBhIHNvY2tldABEZXN0aW5hdGlvbiBhZGRyZXNzIHJlcXVpcmVkAE1lc3NhZ2UgdG9vIGxhcmdlAFByb3RvY29sIHdyb25nIHR5cGUgZm9yIHNvY2tldABQcm90b2NvbCBub3QgYXZhaWxhYmxlAFByb3RvY29sIG5vdCBzdXBwb3J0ZWQAU29ja2V0IHR5cGUgbm90IHN1cHBvcnRlZABOb3Qgc3VwcG9ydGVkAFByb3RvY29sIGZhbWlseSBub3Qgc3VwcG9ydGVkAEFkZHJlc3MgZmFtaWx5IG5vdCBzdXBwb3J0ZWQgYnkgcHJvdG9jb2wAQWRkcmVzcyBub3QgYXZhaWxhYmxlAE5ldHdvcmsgaXMgZG93bgBOZXR3b3JrIHVucmVhY2hhYmxlAENvbm5lY3Rpb24gcmVzZXQgYnkgbmV0d29yawBDb25uZWN0aW9uIGFib3J0ZWQATm8gYnVmZmVyIHNwYWNlIGF2YWlsYWJsZQBTb2NrZXQgaXMgY29ubmVjdGVkAFNvY2tldCBub3QgY29ubmVjdGVkAENhbm5vdCBzZW5kIGFmdGVyIHNvY2tldCBzaHV0ZG93bgBPcGVyYXRpb24gYWxyZWFkeSBpbiBwcm9ncmVzcwBPcGVyYXRpb24gaW4gcHJvZ3Jlc3MAU3RhbGUgZmlsZSBoYW5kbGUAUmVtb3RlIEkvTyBlcnJvcgBRdW90YSBleGNlZWRlZABObyBtZWRpdW0gZm91bmQAV3JvbmcgbWVkaXVtIHR5cGUATXVsdGlob3AgYXR0ZW1wdGVkAFJlcXVpcmVkIGtleSBub3QgYXZhaWxhYmxlAEtleSBoYXMgZXhwaXJlZABLZXkgaGFzIGJlZW4gcmV2b2tlZABLZXkgd2FzIHJlamVjdGVkIGJ5IHNlcnZpY2UAAAAAAAAAoAJOAOsBpwV+BSABdQYYA4YE+gC5AywD/QW3AYoBegO8BB4AzAaiAD0DSQPXAQAECACTBggBjwIGAioGXwK3AvoCWAPZBP0GygK9BeEFzQXcAhAGQAJ4AH0CZwNhBOwA5QMKBdQAzAM+Bk8CdgGYA68EAABEABACrgCuA2AA+gF3BCEF6wQrAGABQQGSAKkGowFuAk4BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEwQAAAAAAAAAACoCAAAAAAAAAAAAAAAAAAAAAAAAAAAnBDkESAQAAAAAAAAAAAAAAAAAAAAAkgQAAAAAAAAAAAAAAAAAAAAAAAA4BVIFYAVTBgAAygEAAAAAAAAAALsG2wbrBhAHKwc7B1AH");
  base64DecodeToExistingUint8Array(bufferView, 68312, "BQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAMAAAB4CwEAAAQAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAP////8KAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2AoBAAAgAAA=");
}

  var scratchBuffer = new ArrayBuffer(16);
  var i32ScratchView = new Int32Array(scratchBuffer);
  var f32ScratchView = new Float32Array(scratchBuffer);
  var f64ScratchView = new Float64Array(scratchBuffer);
  
  function wasm2js_scratch_load_i32(index) {
    return i32ScratchView[index];
  }
      
  function wasm2js_scratch_store_i32(index, value) {
    i32ScratchView[index] = value;
  }
      
  function wasm2js_scratch_load_f64() {
    return f64ScratchView[0];
  }
      
  function wasm2js_scratch_store_f64(value) {
    f64ScratchView[0] = value;
  }
      
  function wasm2js_memory_copy(dest, source, size) {
    // TODO: traps on invalid things
    bufferView.copyWithin(dest, source, source + size);
  }
      
  function wasm2js_memory_fill(dest, value, size) {
    dest = dest >>> 0;
    size = size >>> 0;
    if (dest + size > bufferView.length) throw "trap: invalid memory.fill";
    bufferView.fill(value, dest, dest + size);
  }
      
function asmFunc(imports) {
 var buffer = new ArrayBuffer(16908288);
 var HEAP8 = new Int8Array(buffer);
 var HEAP16 = new Int16Array(buffer);
 var HEAP32 = new Int32Array(buffer);
 var HEAPU8 = new Uint8Array(buffer);
 var HEAPU16 = new Uint16Array(buffer);
 var HEAPU32 = new Uint32Array(buffer);
 var HEAPF32 = new Float32Array(buffer);
 var HEAPF64 = new Float64Array(buffer);
 var Math_imul = Math.imul;
 var Math_fround = Math.fround;
 var Math_abs = Math.abs;
 var Math_clz32 = Math.clz32;
 var Math_min = Math.min;
 var Math_max = Math.max;
 var Math_floor = Math.floor;
 var Math_ceil = Math.ceil;
 var Math_trunc = Math.trunc;
 var Math_sqrt = Math.sqrt;
 var wasi_snapshot_preview1 = imports.wasi_snapshot_preview1;
 var fimport$0 = wasi_snapshot_preview1.fd_write;
 var global$0 = 65536;
 var global$1 = 0;
 var global$2 = 0;
 var global$3 = 0;
 var __wasm_intrinsics_temp_i64 = 0;
 var __wasm_intrinsics_temp_i64$hi = 0;
 var i64toi32_i32$HIGH_BITS = 0;
 // EMSCRIPTEN_START_FUNCS
;
 function $0() {
  $41();
  $38();
 }
 
 function $1($0_1, $1_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  var $2_1 = 0, $15_1 = 0;
  $2_1 = global$0 - 16 | 0;
  global$0 = $2_1;
  HEAP32[($2_1 + 12 | 0) >> 2] = $0_1;
  HEAP32[($2_1 + 8 | 0) >> 2] = $1_1;
  $2(65590 | 0, 0 | 0) | 0;
  global$0 = $2_1 + 16 | 0;
  return 0 | 0;
 }
 
 function $2($0_1, $1_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  var $2_1 = 0;
  $2_1 = global$0 - 16 | 0;
  global$0 = $2_1;
  HEAP32[($2_1 + 12 | 0) >> 2] = $1_1;
  $1_1 = $30(68312 | 0, $0_1 | 0, $1_1 | 0) | 0;
  global$0 = $2_1 + 16 | 0;
  return $1_1 | 0;
 }
 
 function $3($0_1, $1_1, $2_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  $2_1 = $2_1 | 0;
  var $4_1 = 0, $3_1 = 0, $5_1 = 0, $8_1 = 0, $6_1 = 0, $7_1 = 0, $9_1 = 0;
  $3_1 = global$0 - 32 | 0;
  global$0 = $3_1;
  $4_1 = HEAP32[($0_1 + 28 | 0) >> 2] | 0;
  HEAP32[($3_1 + 16 | 0) >> 2] = $4_1;
  $5_1 = HEAP32[($0_1 + 20 | 0) >> 2] | 0;
  HEAP32[($3_1 + 28 | 0) >> 2] = $2_1;
  HEAP32[($3_1 + 24 | 0) >> 2] = $1_1;
  $1_1 = $5_1 - $4_1 | 0;
  HEAP32[($3_1 + 20 | 0) >> 2] = $1_1;
  $6_1 = $1_1 + $2_1 | 0;
  $4_1 = $3_1 + 16 | 0;
  $7_1 = 2;
  block5 : {
   block4 : {
    block2 : {
     block1 : {
      block : {
       if (!($34(fimport$0(HEAP32[($0_1 + 60 | 0) >> 2] | 0 | 0, $3_1 + 16 | 0 | 0, 2 | 0, $3_1 + 12 | 0 | 0) | 0 | 0) | 0)) {
        break block
       }
       $5_1 = $4_1;
       break block1;
      }
      label : while (1) {
       $1_1 = HEAP32[($3_1 + 12 | 0) >> 2] | 0;
       if (($6_1 | 0) == ($1_1 | 0)) {
        break block2
       }
       block3 : {
        if (($1_1 | 0) > (-1 | 0)) {
         break block3
        }
        $5_1 = $4_1;
        break block4;
       }
       $8_1 = HEAP32[($4_1 + 4 | 0) >> 2] | 0;
       $9_1 = $1_1 >>> 0 > $8_1 >>> 0;
       $5_1 = $4_1 + ($9_1 ? 8 : 0) | 0;
       $8_1 = $1_1 - ($9_1 ? $8_1 : 0) | 0;
       HEAP32[$5_1 >> 2] = (HEAP32[$5_1 >> 2] | 0) + $8_1 | 0;
       $4_1 = $4_1 + ($9_1 ? 12 : 4) | 0;
       HEAP32[$4_1 >> 2] = (HEAP32[$4_1 >> 2] | 0) - $8_1 | 0;
       $6_1 = $6_1 - $1_1 | 0;
       $4_1 = $5_1;
       $7_1 = $7_1 - $9_1 | 0;
       if (!($34(fimport$0(HEAP32[($0_1 + 60 | 0) >> 2] | 0 | 0, $4_1 | 0, $7_1 | 0, $3_1 + 12 | 0 | 0) | 0 | 0) | 0)) {
        continue label
       }
       break label;
      };
     }
     if (($6_1 | 0) != (-1 | 0)) {
      break block4
     }
    }
    $1_1 = HEAP32[($0_1 + 44 | 0) >> 2] | 0;
    HEAP32[($0_1 + 28 | 0) >> 2] = $1_1;
    HEAP32[($0_1 + 20 | 0) >> 2] = $1_1;
    HEAP32[($0_1 + 16 | 0) >> 2] = $1_1 + (HEAP32[($0_1 + 48 | 0) >> 2] | 0) | 0;
    $1_1 = $2_1;
    break block5;
   }
   $1_1 = 0;
   HEAP32[($0_1 + 28 | 0) >> 2] = 0;
   HEAP32[($0_1 + 16 | 0) >> 2] = 0;
   HEAP32[($0_1 + 20 | 0) >> 2] = 0;
   HEAP32[$0_1 >> 2] = HEAP32[$0_1 >> 2] | 0 | 32 | 0;
   if (($7_1 | 0) == (2 | 0)) {
    break block5
   }
   $1_1 = $2_1 - (HEAP32[($5_1 + 4 | 0) >> 2] | 0) | 0;
  }
  global$0 = $3_1 + 32 | 0;
  return $1_1 | 0;
 }
 
 function $4($0_1) {
  $0_1 = $0_1 | 0;
  return 0 | 0;
 }
 
 function $5($0_1, $1_1, $1$hi, $2_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  $1$hi = $1$hi | 0;
  $2_1 = $2_1 | 0;
  i64toi32_i32$HIGH_BITS = 0;
  return 0 | 0;
 }
 
 function $6($0_1) {
  $0_1 = $0_1 | 0;
  return 1 | 0;
 }
 
 function $7($0_1) {
  $0_1 = $0_1 | 0;
 }
 
 function $8($0_1) {
  $0_1 = $0_1 | 0;
 }
 
 function $9($0_1) {
  $0_1 = $0_1 | 0;
 }
 
 function $10() {
  $8(69496 | 0);
  return 69500 | 0;
 }
 
 function $11() {
  $9(69496 | 0);
 }
 
 function $12($0_1) {
  $0_1 = $0_1 | 0;
  var $1_1 = 0;
  $1_1 = HEAP32[($0_1 + 72 | 0) >> 2] | 0;
  HEAP32[($0_1 + 72 | 0) >> 2] = $1_1 + -1 | 0 | $1_1 | 0;
  block : {
   $1_1 = HEAP32[$0_1 >> 2] | 0;
   if (!($1_1 & 8 | 0)) {
    break block
   }
   HEAP32[$0_1 >> 2] = $1_1 | 32 | 0;
   return -1 | 0;
  }
  HEAP32[($0_1 + 4 | 0) >> 2] = 0;
  HEAP32[($0_1 + 8 | 0) >> 2] = 0;
  $1_1 = HEAP32[($0_1 + 44 | 0) >> 2] | 0;
  HEAP32[($0_1 + 28 | 0) >> 2] = $1_1;
  HEAP32[($0_1 + 20 | 0) >> 2] = $1_1;
  HEAP32[($0_1 + 16 | 0) >> 2] = $1_1 + (HEAP32[($0_1 + 48 | 0) >> 2] | 0) | 0;
  return 0 | 0;
 }
 
 function $13($0_1, $1_1, $2_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  $2_1 = $2_1 | 0;
  var $3_1 = 0, $4_1 = 0;
  $3_1 = ($2_1 | 0) != (0 | 0);
  block2 : {
   block1 : {
    block : {
     if (!($0_1 & 3 | 0)) {
      break block
     }
     if (!$2_1) {
      break block
     }
     $4_1 = $1_1 & 255 | 0;
     label : while (1) {
      if ((HEAPU8[$0_1 >> 0] | 0 | 0) == ($4_1 | 0)) {
       break block1
      }
      $2_1 = $2_1 + -1 | 0;
      $3_1 = ($2_1 | 0) != (0 | 0);
      $0_1 = $0_1 + 1 | 0;
      if (!($0_1 & 3 | 0)) {
       break block
      }
      if ($2_1) {
       continue label
      }
      break label;
     };
    }
    if (!$3_1) {
     break block2
    }
    block3 : {
     if ((HEAPU8[$0_1 >> 0] | 0 | 0) == ($1_1 & 255 | 0 | 0)) {
      break block3
     }
     if ($2_1 >>> 0 < 4 >>> 0) {
      break block3
     }
     $4_1 = Math_imul($1_1 & 255 | 0, 16843009);
     label1 : while (1) {
      $3_1 = (HEAP32[$0_1 >> 2] | 0) ^ $4_1 | 0;
      if (((16843008 - $3_1 | 0 | $3_1 | 0) & -2139062144 | 0 | 0) != (-2139062144 | 0)) {
       break block1
      }
      $0_1 = $0_1 + 4 | 0;
      $2_1 = $2_1 + -4 | 0;
      if ($2_1 >>> 0 > 3 >>> 0) {
       continue label1
      }
      break label1;
     };
    }
    if (!$2_1) {
     break block2
    }
   }
   $3_1 = $1_1 & 255 | 0;
   label2 : while (1) {
    block4 : {
     if ((HEAPU8[$0_1 >> 0] | 0 | 0) != ($3_1 | 0)) {
      break block4
     }
     return $0_1 | 0;
    }
    $0_1 = $0_1 + 1 | 0;
    $2_1 = $2_1 + -1 | 0;
    if ($2_1) {
     continue label2
    }
    break label2;
   };
  }
  return 0 | 0;
 }
 
 function $14($0_1, $1_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  var $2_1 = 0;
  $2_1 = $13($0_1 | 0, 0 | 0, $1_1 | 0) | 0;
  return ($2_1 ? $2_1 - $0_1 | 0 : $1_1) | 0;
 }
 
 function $15() {
  return 69508 | 0;
 }
 
 function $16($0_1, $1_1) {
  $0_1 = +$0_1;
  $1_1 = $1_1 | 0;
  var i64toi32_i32$0 = 0, i64toi32_i32$1 = 0, i64toi32_i32$3 = 0, $3_1 = 0, i64toi32_i32$2 = 0, i64toi32_i32$4 = 0, $2_1 = 0, $10_1 = 0, $2$hi = 0;
  block : {
   wasm2js_scratch_store_f64(+$0_1);
   i64toi32_i32$0 = wasm2js_scratch_load_i32(1 | 0) | 0;
   $2_1 = wasm2js_scratch_load_i32(0 | 0) | 0;
   $2$hi = i64toi32_i32$0;
   i64toi32_i32$2 = $2_1;
   i64toi32_i32$1 = 0;
   i64toi32_i32$3 = 52;
   i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
   if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
    i64toi32_i32$1 = 0;
    $10_1 = i64toi32_i32$0 >>> i64toi32_i32$4 | 0;
   } else {
    i64toi32_i32$1 = i64toi32_i32$0 >>> i64toi32_i32$4 | 0;
    $10_1 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$0 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$2 >>> i64toi32_i32$4 | 0) | 0;
   }
   $3_1 = $10_1 & 2047 | 0;
   if (($3_1 | 0) == (2047 | 0)) {
    break block
   }
   block1 : {
    if ($3_1) {
     break block1
    }
    block3 : {
     block2 : {
      if ($0_1 != 0.0) {
       break block2
      }
      $3_1 = 0;
      break block3;
     }
     $0_1 = +$16(+($0_1 * 18446744073709551615.0), $1_1 | 0);
     $3_1 = (HEAP32[$1_1 >> 2] | 0) + -64 | 0;
    }
    HEAP32[$1_1 >> 2] = $3_1;
    return +$0_1;
   }
   HEAP32[$1_1 >> 2] = $3_1 + -1022 | 0;
   i64toi32_i32$1 = $2$hi;
   i64toi32_i32$0 = $2_1;
   i64toi32_i32$2 = -2146435073;
   i64toi32_i32$3 = -1;
   i64toi32_i32$2 = i64toi32_i32$1 & i64toi32_i32$2 | 0;
   i64toi32_i32$1 = i64toi32_i32$0 & i64toi32_i32$3 | 0;
   i64toi32_i32$0 = 1071644672;
   i64toi32_i32$3 = 0;
   i64toi32_i32$0 = i64toi32_i32$2 | i64toi32_i32$0 | 0;
   wasm2js_scratch_store_i32(0 | 0, i64toi32_i32$1 | i64toi32_i32$3 | 0 | 0);
   wasm2js_scratch_store_i32(1 | 0, i64toi32_i32$0 | 0);
   $0_1 = +wasm2js_scratch_load_f64();
  }
  return +$0_1;
 }
 
 function $17($0_1, $1_1, $2_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  $2_1 = $2_1 | 0;
  if ($2_1) {
   wasm2js_memory_copy($0_1, $1_1, $2_1)
  }
  return $0_1 | 0;
 }
 
 function $18($0_1, $1_1, $2_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  $2_1 = $2_1 | 0;
  var $3_1 = 0, $4_1 = 0, $5_1 = 0;
  block : {
   if ($2_1 >>> 0 < 512 >>> 0) {
    break block
   }
   return $17($0_1 | 0, $1_1 | 0, $2_1 | 0) | 0 | 0;
  }
  $3_1 = $0_1 + $2_1 | 0;
  block6 : {
   block1 : {
    if (($1_1 ^ $0_1 | 0) & 3 | 0) {
     break block1
    }
    block3 : {
     block2 : {
      if ($0_1 & 3 | 0) {
       break block2
      }
      $2_1 = $0_1;
      break block3;
     }
     block4 : {
      if ($2_1) {
       break block4
      }
      $2_1 = $0_1;
      break block3;
     }
     $2_1 = $0_1;
     label : while (1) {
      HEAP8[$2_1 >> 0] = HEAPU8[$1_1 >> 0] | 0;
      $1_1 = $1_1 + 1 | 0;
      $2_1 = $2_1 + 1 | 0;
      if (!($2_1 & 3 | 0)) {
       break block3
      }
      if ($2_1 >>> 0 < $3_1 >>> 0) {
       continue label
      }
      break label;
     };
    }
    $4_1 = $3_1 & -4 | 0;
    block5 : {
     if ($3_1 >>> 0 < 64 >>> 0) {
      break block5
     }
     $5_1 = $4_1 + -64 | 0;
     if ($2_1 >>> 0 > $5_1 >>> 0) {
      break block5
     }
     label1 : while (1) {
      HEAP32[$2_1 >> 2] = HEAP32[$1_1 >> 2] | 0;
      HEAP32[($2_1 + 4 | 0) >> 2] = HEAP32[($1_1 + 4 | 0) >> 2] | 0;
      HEAP32[($2_1 + 8 | 0) >> 2] = HEAP32[($1_1 + 8 | 0) >> 2] | 0;
      HEAP32[($2_1 + 12 | 0) >> 2] = HEAP32[($1_1 + 12 | 0) >> 2] | 0;
      HEAP32[($2_1 + 16 | 0) >> 2] = HEAP32[($1_1 + 16 | 0) >> 2] | 0;
      HEAP32[($2_1 + 20 | 0) >> 2] = HEAP32[($1_1 + 20 | 0) >> 2] | 0;
      HEAP32[($2_1 + 24 | 0) >> 2] = HEAP32[($1_1 + 24 | 0) >> 2] | 0;
      HEAP32[($2_1 + 28 | 0) >> 2] = HEAP32[($1_1 + 28 | 0) >> 2] | 0;
      HEAP32[($2_1 + 32 | 0) >> 2] = HEAP32[($1_1 + 32 | 0) >> 2] | 0;
      HEAP32[($2_1 + 36 | 0) >> 2] = HEAP32[($1_1 + 36 | 0) >> 2] | 0;
      HEAP32[($2_1 + 40 | 0) >> 2] = HEAP32[($1_1 + 40 | 0) >> 2] | 0;
      HEAP32[($2_1 + 44 | 0) >> 2] = HEAP32[($1_1 + 44 | 0) >> 2] | 0;
      HEAP32[($2_1 + 48 | 0) >> 2] = HEAP32[($1_1 + 48 | 0) >> 2] | 0;
      HEAP32[($2_1 + 52 | 0) >> 2] = HEAP32[($1_1 + 52 | 0) >> 2] | 0;
      HEAP32[($2_1 + 56 | 0) >> 2] = HEAP32[($1_1 + 56 | 0) >> 2] | 0;
      HEAP32[($2_1 + 60 | 0) >> 2] = HEAP32[($1_1 + 60 | 0) >> 2] | 0;
      $1_1 = $1_1 + 64 | 0;
      $2_1 = $2_1 + 64 | 0;
      if ($2_1 >>> 0 <= $5_1 >>> 0) {
       continue label1
      }
      break label1;
     };
    }
    if ($2_1 >>> 0 >= $4_1 >>> 0) {
     break block6
    }
    label2 : while (1) {
     HEAP32[$2_1 >> 2] = HEAP32[$1_1 >> 2] | 0;
     $1_1 = $1_1 + 4 | 0;
     $2_1 = $2_1 + 4 | 0;
     if ($2_1 >>> 0 < $4_1 >>> 0) {
      continue label2
     }
     break block6;
    };
   }
   block7 : {
    if ($3_1 >>> 0 >= 4 >>> 0) {
     break block7
    }
    $2_1 = $0_1;
    break block6;
   }
   block8 : {
    if ($2_1 >>> 0 >= 4 >>> 0) {
     break block8
    }
    $2_1 = $0_1;
    break block6;
   }
   $4_1 = $3_1 + -4 | 0;
   $2_1 = $0_1;
   label3 : while (1) {
    HEAP8[$2_1 >> 0] = HEAPU8[$1_1 >> 0] | 0;
    HEAP8[($2_1 + 1 | 0) >> 0] = HEAPU8[($1_1 + 1 | 0) >> 0] | 0;
    HEAP8[($2_1 + 2 | 0) >> 0] = HEAPU8[($1_1 + 2 | 0) >> 0] | 0;
    HEAP8[($2_1 + 3 | 0) >> 0] = HEAPU8[($1_1 + 3 | 0) >> 0] | 0;
    $1_1 = $1_1 + 4 | 0;
    $2_1 = $2_1 + 4 | 0;
    if ($2_1 >>> 0 <= $4_1 >>> 0) {
     continue label3
    }
    break label3;
   };
  }
  block9 : {
   if ($2_1 >>> 0 >= $3_1 >>> 0) {
    break block9
   }
   label4 : while (1) {
    HEAP8[$2_1 >> 0] = HEAPU8[$1_1 >> 0] | 0;
    $1_1 = $1_1 + 1 | 0;
    $2_1 = $2_1 + 1 | 0;
    if (($2_1 | 0) != ($3_1 | 0)) {
     continue label4
    }
    break label4;
   };
  }
  return $0_1 | 0;
 }
 
 function $19($0_1, $1_1, $2_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  $2_1 = $2_1 | 0;
  var $3_1 = 0, $4_1 = 0, $5_1 = 0;
  block1 : {
   block : {
    $3_1 = HEAP32[($2_1 + 16 | 0) >> 2] | 0;
    if ($3_1) {
     break block
    }
    $4_1 = 0;
    if ($12($2_1 | 0) | 0) {
     break block1
    }
    $3_1 = HEAP32[($2_1 + 16 | 0) >> 2] | 0;
   }
   block2 : {
    $4_1 = HEAP32[($2_1 + 20 | 0) >> 2] | 0;
    if ($1_1 >>> 0 <= ($3_1 - $4_1 | 0) >>> 0) {
     break block2
    }
    return FUNCTION_TABLE[HEAP32[($2_1 + 36 | 0) >> 2] | 0 | 0]($2_1, $0_1, $1_1) | 0 | 0;
   }
   block5 : {
    block3 : {
     if ((HEAP32[($2_1 + 80 | 0) >> 2] | 0 | 0) < (0 | 0)) {
      break block3
     }
     if (!$1_1) {
      break block3
     }
     $3_1 = $1_1;
     block4 : {
      label : while (1) {
       $5_1 = $0_1 + $3_1 | 0;
       if ((HEAPU8[($5_1 + -1 | 0) >> 0] | 0 | 0) == (10 | 0)) {
        break block4
       }
       $3_1 = $3_1 + -1 | 0;
       if (!$3_1) {
        break block3
       }
       continue label;
      };
     }
     $4_1 = FUNCTION_TABLE[HEAP32[($2_1 + 36 | 0) >> 2] | 0 | 0]($2_1, $0_1, $3_1) | 0;
     if ($4_1 >>> 0 < $3_1 >>> 0) {
      break block1
     }
     $1_1 = $1_1 - $3_1 | 0;
     $4_1 = HEAP32[($2_1 + 20 | 0) >> 2] | 0;
     break block5;
    }
    $5_1 = $0_1;
    $3_1 = 0;
   }
   $18($4_1 | 0, $5_1 | 0, $1_1 | 0) | 0;
   HEAP32[($2_1 + 20 | 0) >> 2] = (HEAP32[($2_1 + 20 | 0) >> 2] | 0) + $1_1 | 0;
   $4_1 = $3_1 + $1_1 | 0;
  }
  return $4_1 | 0;
 }
 
 function $20($0_1, $1_1, $2_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  $2_1 = $2_1 | 0;
  var $3_1 = 0, i64toi32_i32$0 = 0, $4_1 = 0, i64toi32_i32$1 = 0, $6_1 = 0, $5_1 = 0, $6$hi = 0;
  block : {
   if (!$2_1) {
    break block
   }
   HEAP8[$0_1 >> 0] = $1_1;
   $3_1 = $0_1 + $2_1 | 0;
   HEAP8[($3_1 + -1 | 0) >> 0] = $1_1;
   if ($2_1 >>> 0 < 3 >>> 0) {
    break block
   }
   HEAP8[($0_1 + 2 | 0) >> 0] = $1_1;
   HEAP8[($0_1 + 1 | 0) >> 0] = $1_1;
   HEAP8[($3_1 + -3 | 0) >> 0] = $1_1;
   HEAP8[($3_1 + -2 | 0) >> 0] = $1_1;
   if ($2_1 >>> 0 < 7 >>> 0) {
    break block
   }
   HEAP8[($0_1 + 3 | 0) >> 0] = $1_1;
   HEAP8[($3_1 + -4 | 0) >> 0] = $1_1;
   if ($2_1 >>> 0 < 9 >>> 0) {
    break block
   }
   $4_1 = (0 - $0_1 | 0) & 3 | 0;
   $3_1 = $0_1 + $4_1 | 0;
   $1_1 = Math_imul($1_1 & 255 | 0, 16843009);
   HEAP32[$3_1 >> 2] = $1_1;
   $4_1 = ($2_1 - $4_1 | 0) & -4 | 0;
   $2_1 = $3_1 + $4_1 | 0;
   HEAP32[($2_1 + -4 | 0) >> 2] = $1_1;
   if ($4_1 >>> 0 < 9 >>> 0) {
    break block
   }
   HEAP32[($3_1 + 8 | 0) >> 2] = $1_1;
   HEAP32[($3_1 + 4 | 0) >> 2] = $1_1;
   HEAP32[($2_1 + -8 | 0) >> 2] = $1_1;
   HEAP32[($2_1 + -12 | 0) >> 2] = $1_1;
   if ($4_1 >>> 0 < 25 >>> 0) {
    break block
   }
   HEAP32[($3_1 + 24 | 0) >> 2] = $1_1;
   HEAP32[($3_1 + 20 | 0) >> 2] = $1_1;
   HEAP32[($3_1 + 16 | 0) >> 2] = $1_1;
   HEAP32[($3_1 + 12 | 0) >> 2] = $1_1;
   HEAP32[($2_1 + -16 | 0) >> 2] = $1_1;
   HEAP32[($2_1 + -20 | 0) >> 2] = $1_1;
   HEAP32[($2_1 + -24 | 0) >> 2] = $1_1;
   HEAP32[($2_1 + -28 | 0) >> 2] = $1_1;
   $5_1 = $3_1 & 4 | 0 | 24 | 0;
   $2_1 = $4_1 - $5_1 | 0;
   if ($2_1 >>> 0 < 32 >>> 0) {
    break block
   }
   i64toi32_i32$0 = 0;
   i64toi32_i32$1 = 1;
   i64toi32_i32$1 = __wasm_i64_mul($1_1 | 0, i64toi32_i32$0 | 0, 1 | 0, i64toi32_i32$1 | 0) | 0;
   i64toi32_i32$0 = i64toi32_i32$HIGH_BITS;
   $6_1 = i64toi32_i32$1;
   $6$hi = i64toi32_i32$0;
   $1_1 = $3_1 + $5_1 | 0;
   label : while (1) {
    i64toi32_i32$0 = $6$hi;
    i64toi32_i32$1 = $1_1;
    HEAP32[($1_1 + 24 | 0) >> 2] = $6_1;
    HEAP32[($1_1 + 28 | 0) >> 2] = i64toi32_i32$0;
    i64toi32_i32$1 = $1_1;
    HEAP32[($1_1 + 16 | 0) >> 2] = $6_1;
    HEAP32[($1_1 + 20 | 0) >> 2] = i64toi32_i32$0;
    i64toi32_i32$1 = $1_1;
    HEAP32[($1_1 + 8 | 0) >> 2] = $6_1;
    HEAP32[($1_1 + 12 | 0) >> 2] = i64toi32_i32$0;
    i64toi32_i32$1 = $1_1;
    HEAP32[$1_1 >> 2] = $6_1;
    HEAP32[($1_1 + 4 | 0) >> 2] = i64toi32_i32$0;
    $1_1 = $1_1 + 32 | 0;
    $2_1 = $2_1 + -32 | 0;
    if ($2_1 >>> 0 > 31 >>> 0) {
     continue label
    }
    break label;
   };
  }
  return $0_1 | 0;
 }
 
 function $21($0_1, $1_1, $2_1, $3_1, $4_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  $2_1 = $2_1 | 0;
  $3_1 = $3_1 | 0;
  $4_1 = $4_1 | 0;
  var $5_1 = 0, i64toi32_i32$0 = 0, $8_1 = 0, $6_1 = 0, $7_1 = 0;
  $5_1 = global$0 - 208 | 0;
  global$0 = $5_1;
  HEAP32[($5_1 + 204 | 0) >> 2] = $2_1;
  block : {
   if (!40) {
    break block
   }
   wasm2js_memory_fill($5_1 + 160 | 0, 0, 40);
  }
  HEAP32[($5_1 + 200 | 0) >> 2] = HEAP32[($5_1 + 204 | 0) >> 2] | 0;
  block2 : {
   block1 : {
    if (($22(0 | 0, $1_1 | 0, $5_1 + 200 | 0 | 0, $5_1 + 80 | 0 | 0, $5_1 + 160 | 0 | 0, $3_1 | 0, $4_1 | 0) | 0 | 0) >= (0 | 0)) {
     break block1
    }
    $4_1 = -1;
    break block2;
   }
   block4 : {
    block3 : {
     if ((HEAP32[($0_1 + 76 | 0) >> 2] | 0 | 0) >= (0 | 0)) {
      break block3
     }
     $6_1 = 1;
     break block4;
    }
    $6_1 = !($6($0_1 | 0) | 0);
   }
   $7_1 = HEAP32[$0_1 >> 2] | 0;
   HEAP32[$0_1 >> 2] = $7_1 & -33 | 0;
   block8 : {
    block7 : {
     block6 : {
      block5 : {
       if (HEAP32[($0_1 + 48 | 0) >> 2] | 0) {
        break block5
       }
       HEAP32[($0_1 + 48 | 0) >> 2] = 80;
       HEAP32[($0_1 + 28 | 0) >> 2] = 0;
       i64toi32_i32$0 = 0;
       HEAP32[($0_1 + 16 | 0) >> 2] = 0;
       HEAP32[($0_1 + 20 | 0) >> 2] = i64toi32_i32$0;
       $8_1 = HEAP32[($0_1 + 44 | 0) >> 2] | 0;
       HEAP32[($0_1 + 44 | 0) >> 2] = $5_1;
       break block6;
      }
      $8_1 = 0;
      if (HEAP32[($0_1 + 16 | 0) >> 2] | 0) {
       break block7
      }
     }
     $2_1 = -1;
     if ($12($0_1 | 0) | 0) {
      break block8
     }
    }
    $2_1 = $22($0_1 | 0, $1_1 | 0, $5_1 + 200 | 0 | 0, $5_1 + 80 | 0 | 0, $5_1 + 160 | 0 | 0, $3_1 | 0, $4_1 | 0) | 0;
   }
   $4_1 = $7_1 & 32 | 0;
   block9 : {
    if (!$8_1) {
     break block9
    }
    FUNCTION_TABLE[HEAP32[($0_1 + 36 | 0) >> 2] | 0 | 0]($0_1, 0, 0) | 0;
    HEAP32[($0_1 + 48 | 0) >> 2] = 0;
    HEAP32[($0_1 + 44 | 0) >> 2] = $8_1;
    HEAP32[($0_1 + 28 | 0) >> 2] = 0;
    $3_1 = HEAP32[($0_1 + 20 | 0) >> 2] | 0;
    i64toi32_i32$0 = 0;
    HEAP32[($0_1 + 16 | 0) >> 2] = 0;
    HEAP32[($0_1 + 20 | 0) >> 2] = i64toi32_i32$0;
    $2_1 = $3_1 ? $2_1 : -1;
   }
   $3_1 = HEAP32[$0_1 >> 2] | 0;
   HEAP32[$0_1 >> 2] = $3_1 | $4_1 | 0;
   $4_1 = $3_1 & 32 | 0 ? -1 : $2_1;
   if ($6_1) {
    break block2
   }
   $7($0_1 | 0);
  }
  global$0 = $5_1 + 208 | 0;
  return $4_1 | 0;
 }
 
 function $22($0_1, $1_1, $2_1, $3_1, $4_1, $5_1, $6_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  $2_1 = $2_1 | 0;
  $3_1 = $3_1 | 0;
  $4_1 = $4_1 | 0;
  $5_1 = $5_1 | 0;
  $6_1 = $6_1 | 0;
  var $13_1 = 0, $7_1 = 0, $16_1 = 0, $21_1 = 0, $18_1 = 0, $15_1 = 0, i64toi32_i32$0 = 0, i64toi32_i32$1 = 0, $14_1 = 0, $12_1 = 0, i64toi32_i32$2 = 0, $17_1 = 0, $20_1 = 0, $23_1 = 0, $19_1 = 0, i64toi32_i32$5 = 0, $26_1 = 0, $26$hi = 0, $10_1 = 0, $25_1 = 0, $11_1 = 0, i64toi32_i32$3 = 0, $22_1 = 0, $24_1 = 0, $34_1 = 0, $35_1 = 0, $36_1 = 0, $8_1 = 0, $9_1 = 0, $270 = 0;
  $7_1 = global$0 - 64 | 0;
  global$0 = $7_1;
  HEAP32[($7_1 + 60 | 0) >> 2] = $1_1;
  $8_1 = $7_1 + 41 | 0;
  $9_1 = $7_1 + 39 | 0;
  $10_1 = $7_1 + 40 | 0;
  $11_1 = 0;
  $12_1 = 0;
  block68 : {
   block32 : {
    block26 : {
     block : {
      label4 : while (1) {
       $13_1 = 0;
       label1 : while (1) {
        $14_1 = $1_1;
        if (($13_1 | 0) > ($12_1 ^ 2147483647 | 0 | 0)) {
         break block
        }
        $12_1 = $13_1 + $12_1 | 0;
        $13_1 = $1_1;
        block31 : {
         block34 : {
          block47 : {
           block60 : {
            block15 : {
             block1 : {
              $15_1 = HEAPU8[$13_1 >> 0] | 0;
              if (!$15_1) {
               break block1
              }
              label7 : while (1) {
               block4 : {
                block3 : {
                 block2 : {
                  $15_1 = $15_1 & 255 | 0;
                  if ($15_1) {
                   break block2
                  }
                  $1_1 = $13_1;
                  break block3;
                 }
                 if (($15_1 | 0) != (37 | 0)) {
                  break block4
                 }
                 $15_1 = $13_1;
                 label : while (1) {
                  block5 : {
                   if ((HEAPU8[($15_1 + 1 | 0) >> 0] | 0 | 0) == (37 | 0)) {
                    break block5
                   }
                   $1_1 = $15_1;
                   break block3;
                  }
                  $13_1 = $13_1 + 1 | 0;
                  $16_1 = HEAPU8[($15_1 + 2 | 0) >> 0] | 0;
                  $1_1 = $15_1 + 2 | 0;
                  $15_1 = $1_1;
                  if (($16_1 | 0) == (37 | 0)) {
                   continue label
                  }
                  break label;
                 };
                }
                $13_1 = $13_1 - $14_1 | 0;
                $15_1 = $12_1 ^ 2147483647 | 0;
                if (($13_1 | 0) > ($15_1 | 0)) {
                 break block
                }
                block6 : {
                 if (!$0_1) {
                  break block6
                 }
                 $23($0_1 | 0, $14_1 | 0, $13_1 | 0);
                }
                if ($13_1) {
                 continue label1
                }
                HEAP32[($7_1 + 60 | 0) >> 2] = $1_1;
                $13_1 = $1_1 + 1 | 0;
                $17_1 = -1;
                block7 : {
                 $16_1 = (HEAP8[($1_1 + 1 | 0) >> 0] | 0) + -48 | 0;
                 if ($16_1 >>> 0 > 9 >>> 0) {
                  break block7
                 }
                 if ((HEAPU8[($1_1 + 2 | 0) >> 0] | 0 | 0) != (36 | 0)) {
                  break block7
                 }
                 $13_1 = $1_1 + 3 | 0;
                 $11_1 = 1;
                 $17_1 = $16_1;
                }
                HEAP32[($7_1 + 60 | 0) >> 2] = $13_1;
                $18_1 = 0;
                block9 : {
                 block8 : {
                  $19_1 = HEAP8[$13_1 >> 0] | 0;
                  $1_1 = $19_1 + -32 | 0;
                  if ($1_1 >>> 0 <= 31 >>> 0) {
                   break block8
                  }
                  $16_1 = $13_1;
                  break block9;
                 }
                 $18_1 = 0;
                 $16_1 = $13_1;
                 $1_1 = 1 << $1_1 | 0;
                 if (!($1_1 & 75913 | 0)) {
                  break block9
                 }
                 label2 : while (1) {
                  $16_1 = $13_1 + 1 | 0;
                  HEAP32[($7_1 + 60 | 0) >> 2] = $16_1;
                  $18_1 = $1_1 | $18_1 | 0;
                  $19_1 = HEAP8[($13_1 + 1 | 0) >> 0] | 0;
                  $1_1 = $19_1 + -32 | 0;
                  if ($1_1 >>> 0 >= 32 >>> 0) {
                   break block9
                  }
                  $13_1 = $16_1;
                  $1_1 = 1 << $1_1 | 0;
                  if ($1_1 & 75913 | 0) {
                   continue label2
                  }
                  break label2;
                 };
                }
                block17 : {
                 block10 : {
                  if (($19_1 | 0) != (42 | 0)) {
                   break block10
                  }
                  block14 : {
                   block11 : {
                    $13_1 = (HEAP8[($16_1 + 1 | 0) >> 0] | 0) + -48 | 0;
                    if ($13_1 >>> 0 > 9 >>> 0) {
                     break block11
                    }
                    if ((HEAPU8[($16_1 + 2 | 0) >> 0] | 0 | 0) != (36 | 0)) {
                     break block11
                    }
                    block13 : {
                     block12 : {
                      if ($0_1) {
                       break block12
                      }
                      HEAP32[($4_1 + ($13_1 << 2 | 0) | 0) >> 2] = 10;
                      $20_1 = 0;
                      break block13;
                     }
                     $20_1 = HEAP32[($3_1 + ($13_1 << 3 | 0) | 0) >> 2] | 0;
                    }
                    $1_1 = $16_1 + 3 | 0;
                    $11_1 = 1;
                    break block14;
                   }
                   if ($11_1) {
                    break block15
                   }
                   $1_1 = $16_1 + 1 | 0;
                   block16 : {
                    if ($0_1) {
                     break block16
                    }
                    HEAP32[($7_1 + 60 | 0) >> 2] = $1_1;
                    $11_1 = 0;
                    $20_1 = 0;
                    break block17;
                   }
                   $13_1 = HEAP32[$2_1 >> 2] | 0;
                   HEAP32[$2_1 >> 2] = $13_1 + 4 | 0;
                   $20_1 = HEAP32[$13_1 >> 2] | 0;
                   $11_1 = 0;
                  }
                  HEAP32[($7_1 + 60 | 0) >> 2] = $1_1;
                  if (($20_1 | 0) > (-1 | 0)) {
                   break block17
                  }
                  $20_1 = 0 - $20_1 | 0;
                  $18_1 = $18_1 | 8192 | 0;
                  break block17;
                 }
                 $20_1 = $24($7_1 + 60 | 0 | 0) | 0;
                 if (($20_1 | 0) < (0 | 0)) {
                  break block
                 }
                 $1_1 = HEAP32[($7_1 + 60 | 0) >> 2] | 0;
                }
                $13_1 = 0;
                $21_1 = -1;
                block19 : {
                 block18 : {
                  if ((HEAPU8[$1_1 >> 0] | 0 | 0) == (46 | 0)) {
                   break block18
                  }
                  $22_1 = 0;
                  break block19;
                 }
                 block20 : {
                  if ((HEAPU8[($1_1 + 1 | 0) >> 0] | 0 | 0) != (42 | 0)) {
                   break block20
                  }
                  block24 : {
                   block21 : {
                    $16_1 = (HEAP8[($1_1 + 2 | 0) >> 0] | 0) + -48 | 0;
                    if ($16_1 >>> 0 > 9 >>> 0) {
                     break block21
                    }
                    if ((HEAPU8[($1_1 + 3 | 0) >> 0] | 0 | 0) != (36 | 0)) {
                     break block21
                    }
                    block23 : {
                     block22 : {
                      if ($0_1) {
                       break block22
                      }
                      HEAP32[($4_1 + ($16_1 << 2 | 0) | 0) >> 2] = 10;
                      $21_1 = 0;
                      break block23;
                     }
                     $21_1 = HEAP32[($3_1 + ($16_1 << 3 | 0) | 0) >> 2] | 0;
                    }
                    $1_1 = $1_1 + 4 | 0;
                    break block24;
                   }
                   if ($11_1) {
                    break block15
                   }
                   $1_1 = $1_1 + 2 | 0;
                   block25 : {
                    if ($0_1) {
                     break block25
                    }
                    $21_1 = 0;
                    break block24;
                   }
                   $16_1 = HEAP32[$2_1 >> 2] | 0;
                   HEAP32[$2_1 >> 2] = $16_1 + 4 | 0;
                   $21_1 = HEAP32[$16_1 >> 2] | 0;
                  }
                  HEAP32[($7_1 + 60 | 0) >> 2] = $1_1;
                  $22_1 = ($21_1 | 0) > (-1 | 0);
                  break block19;
                 }
                 HEAP32[($7_1 + 60 | 0) >> 2] = $1_1 + 1 | 0;
                 $22_1 = 1;
                 $21_1 = $24($7_1 + 60 | 0 | 0) | 0;
                 $1_1 = HEAP32[($7_1 + 60 | 0) >> 2] | 0;
                }
                label3 : while (1) {
                 $16_1 = $13_1;
                 $23_1 = 28;
                 $19_1 = $1_1;
                 $13_1 = HEAP8[$1_1 >> 0] | 0;
                 if (($13_1 + -123 | 0) >>> 0 < -58 >>> 0) {
                  break block26
                 }
                 $1_1 = $1_1 + 1 | 0;
                 $13_1 = HEAPU8[((Math_imul($16_1, 58) + $13_1 | 0) + 65551 | 0) >> 0] | 0;
                 if ((($13_1 + -1 | 0) & 255 | 0) >>> 0 < 8 >>> 0) {
                  continue label3
                 }
                 break label3;
                };
                HEAP32[($7_1 + 60 | 0) >> 2] = $1_1;
                block30 : {
                 block27 : {
                  if (($13_1 | 0) == (27 | 0)) {
                   break block27
                  }
                  if (!$13_1) {
                   break block26
                  }
                  block28 : {
                   if (($17_1 | 0) < (0 | 0)) {
                    break block28
                   }
                   block29 : {
                    if ($0_1) {
                     break block29
                    }
                    HEAP32[($4_1 + ($17_1 << 2 | 0) | 0) >> 2] = $13_1;
                    continue label4;
                   }
                   i64toi32_i32$2 = $3_1 + ($17_1 << 3 | 0) | 0;
                   i64toi32_i32$0 = HEAP32[i64toi32_i32$2 >> 2] | 0;
                   i64toi32_i32$1 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
                   $270 = i64toi32_i32$0;
                   i64toi32_i32$0 = $7_1;
                   HEAP32[($7_1 + 48 | 0) >> 2] = $270;
                   HEAP32[($7_1 + 52 | 0) >> 2] = i64toi32_i32$1;
                   break block30;
                  }
                  if (!$0_1) {
                   break block31
                  }
                  $25($7_1 + 48 | 0 | 0, $13_1 | 0, $2_1 | 0, $6_1 | 0);
                  break block30;
                 }
                 if (($17_1 | 0) > (-1 | 0)) {
                  break block26
                 }
                 $13_1 = 0;
                 if (!$0_1) {
                  continue label1
                 }
                }
                if ((HEAPU8[$0_1 >> 0] | 0) & 32 | 0) {
                 break block32
                }
                $24_1 = $18_1 & -65537 | 0;
                $18_1 = $18_1 & 8192 | 0 ? $24_1 : $18_1;
                $17_1 = 0;
                $25_1 = 65536;
                $23_1 = $10_1;
                block35 : {
                 block65 : {
                  block64 : {
                   block62 : {
                    block46 : {
                     block44 : {
                      block41 : {
                       block36 : {
                        block56 : {
                         block48 : {
                          block37 : {
                           block39 : {
                            block33 : {
                             block40 : {
                              block38 : {
                               block42 : {
                                block43 : {
                                 $19_1 = HEAPU8[$19_1 >> 0] | 0;
                                 $13_1 = $19_1 << 24 >> 24;
                                 $13_1 = $16_1 ? (($19_1 & 15 | 0 | 0) == (3 | 0) ? $13_1 & -45 | 0 : $13_1) : $13_1;
                                 switch ($13_1 + -88 | 0 | 0) {
                                 case 0:
                                 case 32:
                                  break block33;
                                 case 1:
                                 case 2:
                                 case 3:
                                 case 4:
                                 case 5:
                                 case 6:
                                 case 7:
                                 case 8:
                                 case 10:
                                 case 16:
                                 case 18:
                                 case 19:
                                 case 20:
                                 case 21:
                                 case 25:
                                 case 26:
                                 case 28:
                                 case 30:
                                 case 31:
                                  break block34;
                                 case 9:
                                 case 13:
                                 case 14:
                                 case 15:
                                  break block35;
                                 case 11:
                                  break block36;
                                 case 12:
                                 case 17:
                                  break block37;
                                 case 22:
                                  break block38;
                                 case 23:
                                  break block39;
                                 case 24:
                                  break block40;
                                 case 27:
                                  break block41;
                                 case 29:
                                  break block42;
                                 default:
                                  break block43;
                                 };
                                }
                                $23_1 = $10_1;
                                block45 : {
                                 switch ($13_1 + -65 | 0 | 0) {
                                 case 1:
                                 case 3:
                                  break block34;
                                 case 0:
                                 case 4:
                                 case 5:
                                 case 6:
                                  break block35;
                                 case 2:
                                  break block44;
                                 default:
                                  break block45;
                                 };
                                }
                                if (($13_1 | 0) == (83 | 0)) {
                                 break block46
                                }
                                break block47;
                               }
                               $17_1 = 0;
                               $25_1 = 65536;
                               i64toi32_i32$2 = $7_1;
                               i64toi32_i32$1 = HEAP32[($7_1 + 48 | 0) >> 2] | 0;
                               i64toi32_i32$0 = HEAP32[($7_1 + 52 | 0) >> 2] | 0;
                               $26_1 = i64toi32_i32$1;
                               $26$hi = i64toi32_i32$0;
                               break block48;
                              }
                              $13_1 = 0;
                              block55 : {
                               switch ($16_1 | 0) {
                               case 0:
                                HEAP32[(HEAP32[($7_1 + 48 | 0) >> 2] | 0) >> 2] = $12_1;
                                continue label1;
                               case 1:
                                HEAP32[(HEAP32[($7_1 + 48 | 0) >> 2] | 0) >> 2] = $12_1;
                                continue label1;
                               case 2:
                                i64toi32_i32$1 = $12_1;
                                i64toi32_i32$0 = i64toi32_i32$1 >> 31 | 0;
                                i64toi32_i32$1 = HEAP32[($7_1 + 48 | 0) >> 2] | 0;
                                HEAP32[i64toi32_i32$1 >> 2] = $12_1;
                                HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
                                continue label1;
                               case 3:
                                HEAP16[(HEAP32[($7_1 + 48 | 0) >> 2] | 0) >> 1] = $12_1;
                                continue label1;
                               case 4:
                                HEAP8[(HEAP32[($7_1 + 48 | 0) >> 2] | 0) >> 0] = $12_1;
                                continue label1;
                               case 6:
                                HEAP32[(HEAP32[($7_1 + 48 | 0) >> 2] | 0) >> 2] = $12_1;
                                continue label1;
                               case 7:
                                break block55;
                               default:
                                continue label1;
                               };
                              }
                              i64toi32_i32$1 = $12_1;
                              i64toi32_i32$0 = i64toi32_i32$1 >> 31 | 0;
                              i64toi32_i32$1 = HEAP32[($7_1 + 48 | 0) >> 2] | 0;
                              HEAP32[i64toi32_i32$1 >> 2] = $12_1;
                              HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
                              continue label1;
                             }
                             $21_1 = $21_1 >>> 0 > 8 >>> 0 ? $21_1 : 8;
                             $18_1 = $18_1 | 8 | 0;
                             $13_1 = 120;
                            }
                            $17_1 = 0;
                            $25_1 = 65536;
                            i64toi32_i32$2 = $7_1;
                            i64toi32_i32$0 = HEAP32[($7_1 + 48 | 0) >> 2] | 0;
                            i64toi32_i32$1 = HEAP32[($7_1 + 52 | 0) >> 2] | 0;
                            $26_1 = i64toi32_i32$0;
                            $26$hi = i64toi32_i32$1;
                            $14_1 = $26(i64toi32_i32$0 | 0, i64toi32_i32$1 | 0, $10_1 | 0, $13_1 & 32 | 0 | 0) | 0;
                            if (!(i64toi32_i32$0 | i64toi32_i32$1 | 0)) {
                             break block56
                            }
                            if (!($18_1 & 8 | 0)) {
                             break block56
                            }
                            $25_1 = ($13_1 >>> 4 | 0) + 65536 | 0;
                            $17_1 = 2;
                            break block56;
                           }
                           $17_1 = 0;
                           $25_1 = 65536;
                           i64toi32_i32$2 = $7_1;
                           i64toi32_i32$1 = HEAP32[($7_1 + 48 | 0) >> 2] | 0;
                           i64toi32_i32$0 = HEAP32[($7_1 + 52 | 0) >> 2] | 0;
                           $26_1 = i64toi32_i32$1;
                           $26$hi = i64toi32_i32$0;
                           $14_1 = $27(i64toi32_i32$1 | 0, i64toi32_i32$0 | 0, $10_1 | 0) | 0;
                           if (!($18_1 & 8 | 0)) {
                            break block56
                           }
                           $13_1 = $8_1 - $14_1 | 0;
                           $21_1 = ($21_1 | 0) > ($13_1 | 0) ? $21_1 : $13_1;
                           break block56;
                          }
                          block57 : {
                           i64toi32_i32$2 = $7_1;
                           i64toi32_i32$0 = HEAP32[($7_1 + 48 | 0) >> 2] | 0;
                           i64toi32_i32$1 = HEAP32[($7_1 + 52 | 0) >> 2] | 0;
                           $26_1 = i64toi32_i32$0;
                           $26$hi = i64toi32_i32$1;
                           i64toi32_i32$2 = i64toi32_i32$0;
                           i64toi32_i32$0 = -1;
                           i64toi32_i32$3 = -1;
                           if ((i64toi32_i32$1 | 0) > (i64toi32_i32$0 | 0)) {
                            $34_1 = 1
                           } else {
                            if ((i64toi32_i32$1 | 0) >= (i64toi32_i32$0 | 0)) {
                             if (i64toi32_i32$2 >>> 0 <= i64toi32_i32$3 >>> 0) {
                              $35_1 = 0
                             } else {
                              $35_1 = 1
                             }
                             $36_1 = $35_1;
                            } else {
                             $36_1 = 0
                            }
                            $34_1 = $36_1;
                           }
                           if ($34_1) {
                            break block57
                           }
                           i64toi32_i32$2 = $26$hi;
                           i64toi32_i32$2 = 0;
                           i64toi32_i32$3 = 0;
                           i64toi32_i32$1 = $26$hi;
                           i64toi32_i32$0 = $26_1;
                           i64toi32_i32$5 = (i64toi32_i32$3 >>> 0 < i64toi32_i32$0 >>> 0) + i64toi32_i32$1 | 0;
                           i64toi32_i32$5 = i64toi32_i32$2 - i64toi32_i32$5 | 0;
                           $26_1 = i64toi32_i32$3 - i64toi32_i32$0 | 0;
                           $26$hi = i64toi32_i32$5;
                           i64toi32_i32$3 = $7_1;
                           HEAP32[($7_1 + 48 | 0) >> 2] = $26_1;
                           HEAP32[($7_1 + 52 | 0) >> 2] = i64toi32_i32$5;
                           $17_1 = 1;
                           $25_1 = 65536;
                           break block48;
                          }
                          block58 : {
                           if (!($18_1 & 2048 | 0)) {
                            break block58
                           }
                           $17_1 = 1;
                           $25_1 = 65537;
                           break block48;
                          }
                          $17_1 = $18_1 & 1 | 0;
                          $25_1 = $17_1 ? 65538 : 65536;
                         }
                         i64toi32_i32$5 = $26$hi;
                         $14_1 = $28($26_1 | 0, i64toi32_i32$5 | 0, $10_1 | 0) | 0;
                        }
                        if ($22_1 & ($21_1 | 0) < (0 | 0) | 0) {
                         break block
                        }
                        $18_1 = $22_1 ? $18_1 & -65537 | 0 : $18_1;
                        block59 : {
                         i64toi32_i32$5 = $26$hi;
                         i64toi32_i32$2 = $26_1;
                         i64toi32_i32$3 = 0;
                         i64toi32_i32$0 = 0;
                         if ((i64toi32_i32$2 | 0) != (i64toi32_i32$0 | 0) | (i64toi32_i32$5 | 0) != (i64toi32_i32$3 | 0) | 0) {
                          break block59
                         }
                         if ($21_1) {
                          break block59
                         }
                         $14_1 = $10_1;
                         $23_1 = $14_1;
                         $21_1 = 0;
                         break block34;
                        }
                        i64toi32_i32$2 = $26$hi;
                        $13_1 = ($10_1 - $14_1 | 0) + !($26_1 | i64toi32_i32$2 | 0) | 0;
                        $21_1 = ($21_1 | 0) > ($13_1 | 0) ? $21_1 : $13_1;
                        break block47;
                       }
                       $13_1 = HEAPU8[($7_1 + 48 | 0) >> 0] | 0;
                       break block60;
                      }
                      $13_1 = HEAP32[($7_1 + 48 | 0) >> 2] | 0;
                      $14_1 = $13_1 ? $13_1 : 65583;
                      $13_1 = $14($14_1 | 0, ($21_1 >>> 0 < 2147483647 >>> 0 ? $21_1 : 2147483647) | 0) | 0;
                      $23_1 = $14_1 + $13_1 | 0;
                      block61 : {
                       if (($21_1 | 0) <= (-1 | 0)) {
                        break block61
                       }
                       $18_1 = $24_1;
                       $21_1 = $13_1;
                       break block34;
                      }
                      $18_1 = $24_1;
                      $21_1 = $13_1;
                      if (HEAPU8[$23_1 >> 0] | 0) {
                       break block
                      }
                      break block34;
                     }
                     i64toi32_i32$0 = $7_1;
                     i64toi32_i32$2 = HEAP32[($7_1 + 48 | 0) >> 2] | 0;
                     i64toi32_i32$5 = HEAP32[($7_1 + 52 | 0) >> 2] | 0;
                     $26_1 = i64toi32_i32$2;
                     $26$hi = i64toi32_i32$5;
                     if (!!(i64toi32_i32$2 | i64toi32_i32$5 | 0)) {
                      break block62
                     }
                     $13_1 = 0;
                     break block60;
                    }
                    block63 : {
                     if (!$21_1) {
                      break block63
                     }
                     $15_1 = HEAP32[($7_1 + 48 | 0) >> 2] | 0;
                     break block64;
                    }
                    $13_1 = 0;
                    $29($0_1 | 0, 32 | 0, $20_1 | 0, 0 | 0, $18_1 | 0);
                    break block65;
                   }
                   HEAP32[($7_1 + 12 | 0) >> 2] = 0;
                   i64toi32_i32$5 = $26$hi;
                   HEAP32[($7_1 + 8 | 0) >> 2] = $26_1;
                   HEAP32[($7_1 + 48 | 0) >> 2] = $7_1 + 8 | 0;
                   $15_1 = $7_1 + 8 | 0;
                   $21_1 = -1;
                  }
                  $13_1 = 0;
                  block66 : {
                   label5 : while (1) {
                    $16_1 = HEAP32[$15_1 >> 2] | 0;
                    if (!$16_1) {
                     break block66
                    }
                    $16_1 = $40($7_1 + 4 | 0 | 0, $16_1 | 0) | 0;
                    if (($16_1 | 0) < (0 | 0)) {
                     break block32
                    }
                    if ($16_1 >>> 0 > ($21_1 - $13_1 | 0) >>> 0) {
                     break block66
                    }
                    $15_1 = $15_1 + 4 | 0;
                    $13_1 = $16_1 + $13_1 | 0;
                    if ($13_1 >>> 0 < $21_1 >>> 0) {
                     continue label5
                    }
                    break label5;
                   };
                  }
                  $23_1 = 61;
                  if (($13_1 | 0) < (0 | 0)) {
                   break block26
                  }
                  $29($0_1 | 0, 32 | 0, $20_1 | 0, $13_1 | 0, $18_1 | 0);
                  block67 : {
                   if ($13_1) {
                    break block67
                   }
                   $13_1 = 0;
                   break block65;
                  }
                  $16_1 = 0;
                  $15_1 = HEAP32[($7_1 + 48 | 0) >> 2] | 0;
                  label6 : while (1) {
                   $14_1 = HEAP32[$15_1 >> 2] | 0;
                   if (!$14_1) {
                    break block65
                   }
                   $14_1 = $40($7_1 + 4 | 0 | 0, $14_1 | 0) | 0;
                   $16_1 = $14_1 + $16_1 | 0;
                   if ($16_1 >>> 0 > $13_1 >>> 0) {
                    break block65
                   }
                   $23($0_1 | 0, $7_1 + 4 | 0 | 0, $14_1 | 0);
                   $15_1 = $15_1 + 4 | 0;
                   if ($16_1 >>> 0 < $13_1 >>> 0) {
                    continue label6
                   }
                   break label6;
                  };
                 }
                 $29($0_1 | 0, 32 | 0, $20_1 | 0, $13_1 | 0, $18_1 ^ 8192 | 0 | 0);
                 $13_1 = ($20_1 | 0) > ($13_1 | 0) ? $20_1 : $13_1;
                 continue label1;
                }
                if ($22_1 & ($21_1 | 0) < (0 | 0) | 0) {
                 break block
                }
                $23_1 = 61;
                $13_1 = FUNCTION_TABLE[$5_1 | 0]($0_1, +HEAPF64[($7_1 + 48 | 0) >> 3], $20_1, $21_1, $18_1, $13_1) | 0;
                if (($13_1 | 0) >= (0 | 0)) {
                 continue label1
                }
                break block26;
               }
               $15_1 = HEAPU8[($13_1 + 1 | 0) >> 0] | 0;
               $13_1 = $13_1 + 1 | 0;
               continue label7;
              };
             }
             if ($0_1) {
              break block68
             }
             if (!$11_1) {
              break block31
             }
             $13_1 = 1;
             block69 : {
              label8 : while (1) {
               $15_1 = HEAP32[($4_1 + ($13_1 << 2 | 0) | 0) >> 2] | 0;
               if (!$15_1) {
                break block69
               }
               $25($3_1 + ($13_1 << 3 | 0) | 0 | 0, $15_1 | 0, $2_1 | 0, $6_1 | 0);
               $12_1 = 1;
               $13_1 = $13_1 + 1 | 0;
               if (($13_1 | 0) != (10 | 0)) {
                continue label8
               }
               break block68;
              };
             }
             block70 : {
              if ($13_1 >>> 0 < 10 >>> 0) {
               break block70
              }
              $12_1 = 1;
              break block68;
             }
             label9 : while (1) {
              if (HEAP32[($4_1 + ($13_1 << 2 | 0) | 0) >> 2] | 0) {
               break block15
              }
              $12_1 = 1;
              $13_1 = $13_1 + 1 | 0;
              if (($13_1 | 0) == (10 | 0)) {
               break block68
              }
              continue label9;
             };
            }
            $23_1 = 28;
            break block26;
           }
           HEAP8[($7_1 + 39 | 0) >> 0] = $13_1;
           $21_1 = 1;
           $14_1 = $9_1;
           $23_1 = $10_1;
           $18_1 = $24_1;
           break block34;
          }
          $23_1 = $10_1;
         }
         $1_1 = $23_1 - $14_1 | 0;
         $19_1 = ($21_1 | 0) > ($1_1 | 0) ? $21_1 : $1_1;
         if (($19_1 | 0) > ($17_1 ^ 2147483647 | 0 | 0)) {
          break block
         }
         $23_1 = 61;
         $16_1 = $17_1 + $19_1 | 0;
         $13_1 = ($20_1 | 0) > ($16_1 | 0) ? $20_1 : $16_1;
         if ($13_1 >>> 0 > $15_1 >>> 0) {
          break block26
         }
         $29($0_1 | 0, 32 | 0, $13_1 | 0, $16_1 | 0, $18_1 | 0);
         $23($0_1 | 0, $25_1 | 0, $17_1 | 0);
         $29($0_1 | 0, 48 | 0, $13_1 | 0, $16_1 | 0, $18_1 ^ 65536 | 0 | 0);
         $29($0_1 | 0, 48 | 0, $19_1 | 0, $1_1 | 0, 0 | 0);
         $23($0_1 | 0, $14_1 | 0, $1_1 | 0);
         $29($0_1 | 0, 32 | 0, $13_1 | 0, $16_1 | 0, $18_1 ^ 8192 | 0 | 0);
         $1_1 = HEAP32[($7_1 + 60 | 0) >> 2] | 0;
         continue label1;
        }
        break label1;
       };
       break label4;
      };
      $12_1 = 0;
      break block68;
     }
     $23_1 = 61;
    }
    HEAP32[($15() | 0) >> 2] = $23_1;
   }
   $12_1 = -1;
  }
  global$0 = $7_1 + 64 | 0;
  return $12_1 | 0;
 }
 
 function $23($0_1, $1_1, $2_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  $2_1 = $2_1 | 0;
  block : {
   if ((HEAPU8[$0_1 >> 0] | 0) & 32 | 0) {
    break block
   }
   $19($1_1 | 0, $2_1 | 0, $0_1 | 0) | 0;
  }
 }
 
 function $24($0_1) {
  $0_1 = $0_1 | 0;
  var $3_1 = 0, $1_1 = 0, $2_1 = 0, $4_1 = 0, $5_1 = 0;
  $1_1 = 0;
  block : {
   $2_1 = HEAP32[$0_1 >> 2] | 0;
   $3_1 = (HEAP8[$2_1 >> 0] | 0) + -48 | 0;
   if ($3_1 >>> 0 <= 9 >>> 0) {
    break block
   }
   return 0 | 0;
  }
  label : while (1) {
   $4_1 = -1;
   block1 : {
    if ($1_1 >>> 0 > 214748364 >>> 0) {
     break block1
    }
    $1_1 = Math_imul($1_1, 10);
    $4_1 = $3_1 >>> 0 > ($1_1 ^ 2147483647 | 0) >>> 0 ? -1 : $3_1 + $1_1 | 0;
   }
   $3_1 = $2_1 + 1 | 0;
   HEAP32[$0_1 >> 2] = $3_1;
   $5_1 = HEAP8[($2_1 + 1 | 0) >> 0] | 0;
   $1_1 = $4_1;
   $2_1 = $3_1;
   $3_1 = $5_1 + -48 | 0;
   if ($3_1 >>> 0 < 10 >>> 0) {
    continue label
   }
   break label;
  };
  return $1_1 | 0;
 }
 
 function $25($0_1, $1_1, $2_1, $3_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  $2_1 = $2_1 | 0;
  $3_1 = $3_1 | 0;
  var i64toi32_i32$0 = 0, i64toi32_i32$1 = 0, $21_1 = 0, $29_1 = 0, $37_1 = 0, $45_1 = 0, $55_1 = 0, $63 = 0, $71 = 0, $79 = 0, $87 = 0, $97 = 0, $105 = 0, $115 = 0, $125 = 0, $133 = 0, $141 = 0;
  block18 : {
   switch ($1_1 + -9 | 0 | 0) {
   case 0:
    $1_1 = HEAP32[$2_1 >> 2] | 0;
    HEAP32[$2_1 >> 2] = $1_1 + 4 | 0;
    HEAP32[$0_1 >> 2] = HEAP32[$1_1 >> 2] | 0;
    return;
   case 1:
    $1_1 = HEAP32[$2_1 >> 2] | 0;
    HEAP32[$2_1 >> 2] = $1_1 + 4 | 0;
    i64toi32_i32$0 = HEAP32[$1_1 >> 2] | 0;
    i64toi32_i32$1 = i64toi32_i32$0 >> 31 | 0;
    $21_1 = i64toi32_i32$0;
    i64toi32_i32$0 = $0_1;
    HEAP32[i64toi32_i32$0 >> 2] = $21_1;
    HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
    return;
   case 2:
    $1_1 = HEAP32[$2_1 >> 2] | 0;
    HEAP32[$2_1 >> 2] = $1_1 + 4 | 0;
    i64toi32_i32$1 = HEAP32[$1_1 >> 2] | 0;
    i64toi32_i32$0 = 0;
    $29_1 = i64toi32_i32$1;
    i64toi32_i32$1 = $0_1;
    HEAP32[i64toi32_i32$1 >> 2] = $29_1;
    HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
    return;
   case 4:
    $1_1 = HEAP32[$2_1 >> 2] | 0;
    HEAP32[$2_1 >> 2] = $1_1 + 4 | 0;
    i64toi32_i32$0 = HEAP32[$1_1 >> 2] | 0;
    i64toi32_i32$1 = i64toi32_i32$0 >> 31 | 0;
    $37_1 = i64toi32_i32$0;
    i64toi32_i32$0 = $0_1;
    HEAP32[i64toi32_i32$0 >> 2] = $37_1;
    HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
    return;
   case 5:
    $1_1 = HEAP32[$2_1 >> 2] | 0;
    HEAP32[$2_1 >> 2] = $1_1 + 4 | 0;
    i64toi32_i32$1 = HEAP32[$1_1 >> 2] | 0;
    i64toi32_i32$0 = 0;
    $45_1 = i64toi32_i32$1;
    i64toi32_i32$1 = $0_1;
    HEAP32[i64toi32_i32$1 >> 2] = $45_1;
    HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
    return;
   case 3:
    $1_1 = ((HEAP32[$2_1 >> 2] | 0) + 7 | 0) & -8 | 0;
    HEAP32[$2_1 >> 2] = $1_1 + 8 | 0;
    i64toi32_i32$0 = HEAP32[$1_1 >> 2] | 0;
    i64toi32_i32$1 = HEAP32[($1_1 + 4 | 0) >> 2] | 0;
    $55_1 = i64toi32_i32$0;
    i64toi32_i32$0 = $0_1;
    HEAP32[i64toi32_i32$0 >> 2] = $55_1;
    HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
    return;
   case 6:
    $1_1 = HEAP32[$2_1 >> 2] | 0;
    HEAP32[$2_1 >> 2] = $1_1 + 4 | 0;
    i64toi32_i32$1 = HEAP16[$1_1 >> 1] | 0;
    i64toi32_i32$0 = i64toi32_i32$1 >> 31 | 0;
    $63 = i64toi32_i32$1;
    i64toi32_i32$1 = $0_1;
    HEAP32[i64toi32_i32$1 >> 2] = $63;
    HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
    return;
   case 7:
    $1_1 = HEAP32[$2_1 >> 2] | 0;
    HEAP32[$2_1 >> 2] = $1_1 + 4 | 0;
    i64toi32_i32$0 = HEAPU16[$1_1 >> 1] | 0;
    i64toi32_i32$1 = 0;
    $71 = i64toi32_i32$0;
    i64toi32_i32$0 = $0_1;
    HEAP32[i64toi32_i32$0 >> 2] = $71;
    HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
    return;
   case 8:
    $1_1 = HEAP32[$2_1 >> 2] | 0;
    HEAP32[$2_1 >> 2] = $1_1 + 4 | 0;
    i64toi32_i32$1 = HEAP8[$1_1 >> 0] | 0;
    i64toi32_i32$0 = i64toi32_i32$1 >> 31 | 0;
    $79 = i64toi32_i32$1;
    i64toi32_i32$1 = $0_1;
    HEAP32[i64toi32_i32$1 >> 2] = $79;
    HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
    return;
   case 9:
    $1_1 = HEAP32[$2_1 >> 2] | 0;
    HEAP32[$2_1 >> 2] = $1_1 + 4 | 0;
    i64toi32_i32$0 = HEAPU8[$1_1 >> 0] | 0;
    i64toi32_i32$1 = 0;
    $87 = i64toi32_i32$0;
    i64toi32_i32$0 = $0_1;
    HEAP32[i64toi32_i32$0 >> 2] = $87;
    HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
    return;
   case 10:
    $1_1 = ((HEAP32[$2_1 >> 2] | 0) + 7 | 0) & -8 | 0;
    HEAP32[$2_1 >> 2] = $1_1 + 8 | 0;
    i64toi32_i32$1 = HEAP32[$1_1 >> 2] | 0;
    i64toi32_i32$0 = HEAP32[($1_1 + 4 | 0) >> 2] | 0;
    $97 = i64toi32_i32$1;
    i64toi32_i32$1 = $0_1;
    HEAP32[i64toi32_i32$1 >> 2] = $97;
    HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
    return;
   case 11:
    $1_1 = HEAP32[$2_1 >> 2] | 0;
    HEAP32[$2_1 >> 2] = $1_1 + 4 | 0;
    i64toi32_i32$0 = HEAP32[$1_1 >> 2] | 0;
    i64toi32_i32$1 = 0;
    $105 = i64toi32_i32$0;
    i64toi32_i32$0 = $0_1;
    HEAP32[i64toi32_i32$0 >> 2] = $105;
    HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
    return;
   case 12:
    $1_1 = ((HEAP32[$2_1 >> 2] | 0) + 7 | 0) & -8 | 0;
    HEAP32[$2_1 >> 2] = $1_1 + 8 | 0;
    i64toi32_i32$1 = HEAP32[$1_1 >> 2] | 0;
    i64toi32_i32$0 = HEAP32[($1_1 + 4 | 0) >> 2] | 0;
    $115 = i64toi32_i32$1;
    i64toi32_i32$1 = $0_1;
    HEAP32[i64toi32_i32$1 >> 2] = $115;
    HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
    return;
   case 13:
    $1_1 = ((HEAP32[$2_1 >> 2] | 0) + 7 | 0) & -8 | 0;
    HEAP32[$2_1 >> 2] = $1_1 + 8 | 0;
    i64toi32_i32$0 = HEAP32[$1_1 >> 2] | 0;
    i64toi32_i32$1 = HEAP32[($1_1 + 4 | 0) >> 2] | 0;
    $125 = i64toi32_i32$0;
    i64toi32_i32$0 = $0_1;
    HEAP32[i64toi32_i32$0 >> 2] = $125;
    HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
    return;
   case 14:
    $1_1 = HEAP32[$2_1 >> 2] | 0;
    HEAP32[$2_1 >> 2] = $1_1 + 4 | 0;
    i64toi32_i32$1 = HEAP32[$1_1 >> 2] | 0;
    i64toi32_i32$0 = i64toi32_i32$1 >> 31 | 0;
    $133 = i64toi32_i32$1;
    i64toi32_i32$1 = $0_1;
    HEAP32[i64toi32_i32$1 >> 2] = $133;
    HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
    return;
   case 15:
    $1_1 = HEAP32[$2_1 >> 2] | 0;
    HEAP32[$2_1 >> 2] = $1_1 + 4 | 0;
    i64toi32_i32$0 = HEAP32[$1_1 >> 2] | 0;
    i64toi32_i32$1 = 0;
    $141 = i64toi32_i32$0;
    i64toi32_i32$0 = $0_1;
    HEAP32[i64toi32_i32$0 >> 2] = $141;
    HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
    return;
   case 16:
    $1_1 = ((HEAP32[$2_1 >> 2] | 0) + 7 | 0) & -8 | 0;
    HEAP32[$2_1 >> 2] = $1_1 + 8 | 0;
    HEAPF64[$0_1 >> 3] = +HEAPF64[$1_1 >> 3];
    return;
   case 17:
    FUNCTION_TABLE[$3_1 | 0]($0_1, $2_1);
    break;
   default:
    break block18;
   };
  }
 }
 
 function $26($0_1, $0$hi, $1_1, $2_1) {
  $0_1 = $0_1 | 0;
  $0$hi = $0$hi | 0;
  $1_1 = $1_1 | 0;
  $2_1 = $2_1 | 0;
  var i64toi32_i32$0 = 0, i64toi32_i32$2 = 0, i64toi32_i32$1 = 0, i64toi32_i32$4 = 0, i64toi32_i32$3 = 0, $10_1 = 0, $3_1 = 0;
  block : {
   i64toi32_i32$0 = $0$hi;
   if (!($0_1 | i64toi32_i32$0 | 0)) {
    break block
   }
   label : while (1) {
    $1_1 = $1_1 + -1 | 0;
    i64toi32_i32$0 = $0$hi;
    HEAP8[$1_1 >> 0] = HEAPU8[(($0_1 & 15 | 0) + 66080 | 0) >> 0] | 0 | $2_1 | 0;
    i64toi32_i32$2 = $0_1;
    i64toi32_i32$1 = 0;
    i64toi32_i32$3 = 15;
    $3_1 = i64toi32_i32$0 >>> 0 > i64toi32_i32$1 >>> 0 | ((i64toi32_i32$0 | 0) == (i64toi32_i32$1 | 0) & i64toi32_i32$2 >>> 0 > i64toi32_i32$3 >>> 0 | 0) | 0;
    i64toi32_i32$2 = i64toi32_i32$0;
    i64toi32_i32$2 = i64toi32_i32$0;
    i64toi32_i32$3 = $0_1;
    i64toi32_i32$0 = 0;
    i64toi32_i32$1 = 4;
    i64toi32_i32$4 = i64toi32_i32$1 & 31 | 0;
    if (32 >>> 0 <= (i64toi32_i32$1 & 63 | 0) >>> 0) {
     i64toi32_i32$0 = 0;
     $10_1 = i64toi32_i32$2 >>> i64toi32_i32$4 | 0;
    } else {
     i64toi32_i32$0 = i64toi32_i32$2 >>> i64toi32_i32$4 | 0;
     $10_1 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$2 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$3 >>> i64toi32_i32$4 | 0) | 0;
    }
    $0_1 = $10_1;
    $0$hi = i64toi32_i32$0;
    if ($3_1) {
     continue label
    }
    break label;
   };
  }
  return $1_1 | 0;
 }
 
 function $27($0_1, $0$hi, $1_1) {
  $0_1 = $0_1 | 0;
  $0$hi = $0$hi | 0;
  $1_1 = $1_1 | 0;
  var i64toi32_i32$0 = 0, i64toi32_i32$2 = 0, i64toi32_i32$1 = 0, i64toi32_i32$4 = 0, i64toi32_i32$3 = 0, $9_1 = 0, $2_1 = 0;
  block : {
   i64toi32_i32$0 = $0$hi;
   if (!($0_1 | i64toi32_i32$0 | 0)) {
    break block
   }
   label : while (1) {
    $1_1 = $1_1 + -1 | 0;
    i64toi32_i32$0 = $0$hi;
    HEAP8[$1_1 >> 0] = $0_1 & 7 | 0 | 48 | 0;
    i64toi32_i32$2 = $0_1;
    i64toi32_i32$1 = 0;
    i64toi32_i32$3 = 7;
    $2_1 = i64toi32_i32$0 >>> 0 > i64toi32_i32$1 >>> 0 | ((i64toi32_i32$0 | 0) == (i64toi32_i32$1 | 0) & i64toi32_i32$2 >>> 0 > i64toi32_i32$3 >>> 0 | 0) | 0;
    i64toi32_i32$2 = i64toi32_i32$0;
    i64toi32_i32$2 = i64toi32_i32$0;
    i64toi32_i32$3 = $0_1;
    i64toi32_i32$0 = 0;
    i64toi32_i32$1 = 3;
    i64toi32_i32$4 = i64toi32_i32$1 & 31 | 0;
    if (32 >>> 0 <= (i64toi32_i32$1 & 63 | 0) >>> 0) {
     i64toi32_i32$0 = 0;
     $9_1 = i64toi32_i32$2 >>> i64toi32_i32$4 | 0;
    } else {
     i64toi32_i32$0 = i64toi32_i32$2 >>> i64toi32_i32$4 | 0;
     $9_1 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$2 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$3 >>> i64toi32_i32$4 | 0) | 0;
    }
    $0_1 = $9_1;
    $0$hi = i64toi32_i32$0;
    if ($2_1) {
     continue label
    }
    break label;
   };
  }
  return $1_1 | 0;
 }
 
 function $28($0_1, $0$hi, $1_1) {
  $0_1 = $0_1 | 0;
  $0$hi = $0$hi | 0;
  $1_1 = $1_1 | 0;
  var i64toi32_i32$2 = 0, i64toi32_i32$0 = 0, i64toi32_i32$1 = 0, i64toi32_i32$5 = 0, $3_1 = 0, i64toi32_i32$3 = 0, $2_1 = 0, $2$hi = 0, $4_1 = 0, $16_1 = 0, $16$hi = 0, $5_1 = 0;
  block1 : {
   block : {
    i64toi32_i32$0 = $0$hi;
    i64toi32_i32$2 = $0_1;
    i64toi32_i32$1 = 1;
    i64toi32_i32$3 = 0;
    if (i64toi32_i32$0 >>> 0 > i64toi32_i32$1 >>> 0 | ((i64toi32_i32$0 | 0) == (i64toi32_i32$1 | 0) & i64toi32_i32$2 >>> 0 >= i64toi32_i32$3 >>> 0 | 0) | 0) {
     break block
    }
    i64toi32_i32$2 = i64toi32_i32$0;
    $2_1 = $0_1;
    $2$hi = i64toi32_i32$2;
    break block1;
   }
   label : while (1) {
    $1_1 = $1_1 + -1 | 0;
    i64toi32_i32$2 = $0$hi;
    i64toi32_i32$0 = 0;
    i64toi32_i32$0 = __wasm_i64_udiv($0_1 | 0, i64toi32_i32$2 | 0, 10 | 0, i64toi32_i32$0 | 0) | 0;
    i64toi32_i32$2 = i64toi32_i32$HIGH_BITS;
    $2_1 = i64toi32_i32$0;
    $2$hi = i64toi32_i32$2;
    i64toi32_i32$0 = 0;
    i64toi32_i32$0 = __wasm_i64_mul($2_1 | 0, i64toi32_i32$2 | 0, 10 | 0, i64toi32_i32$0 | 0) | 0;
    i64toi32_i32$2 = i64toi32_i32$HIGH_BITS;
    $16_1 = i64toi32_i32$0;
    $16$hi = i64toi32_i32$2;
    i64toi32_i32$2 = $0$hi;
    i64toi32_i32$3 = $0_1;
    i64toi32_i32$0 = $16$hi;
    i64toi32_i32$1 = $16_1;
    i64toi32_i32$5 = ($0_1 >>> 0 < i64toi32_i32$1 >>> 0) + i64toi32_i32$0 | 0;
    i64toi32_i32$5 = i64toi32_i32$2 - i64toi32_i32$5 | 0;
    HEAP8[$1_1 >> 0] = $0_1 - i64toi32_i32$1 | 0 | 48 | 0;
    i64toi32_i32$5 = i64toi32_i32$2;
    i64toi32_i32$5 = i64toi32_i32$2;
    i64toi32_i32$2 = $0_1;
    i64toi32_i32$3 = 9;
    i64toi32_i32$1 = -1;
    $3_1 = i64toi32_i32$5 >>> 0 > i64toi32_i32$3 >>> 0 | ((i64toi32_i32$5 | 0) == (i64toi32_i32$3 | 0) & i64toi32_i32$2 >>> 0 > i64toi32_i32$1 >>> 0 | 0) | 0;
    i64toi32_i32$2 = $2$hi;
    $0_1 = $2_1;
    $0$hi = i64toi32_i32$2;
    if ($3_1) {
     continue label
    }
    break label;
   };
  }
  block2 : {
   i64toi32_i32$2 = $2$hi;
   if (!($2_1 | i64toi32_i32$2 | 0)) {
    break block2
   }
   $3_1 = $2_1;
   label1 : while (1) {
    $1_1 = $1_1 + -1 | 0;
    $4_1 = ($3_1 >>> 0) / (10 >>> 0) | 0;
    HEAP8[$1_1 >> 0] = $3_1 - Math_imul($4_1, 10) | 0 | 48 | 0;
    $5_1 = $3_1 >>> 0 > 9 >>> 0;
    $3_1 = $4_1;
    if ($5_1) {
     continue label1
    }
    break label1;
   };
  }
  return $1_1 | 0;
 }
 
 function $29($0_1, $1_1, $2_1, $3_1, $4_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  $2_1 = $2_1 | 0;
  $3_1 = $3_1 | 0;
  $4_1 = $4_1 | 0;
  var $5_1 = 0;
  $5_1 = global$0 - 256 | 0;
  global$0 = $5_1;
  block : {
   if (($2_1 | 0) <= ($3_1 | 0)) {
    break block
   }
   if ($4_1 & 73728 | 0) {
    break block
   }
   $3_1 = $2_1 - $3_1 | 0;
   $2_1 = $3_1 >>> 0 < 256 >>> 0;
   $20($5_1 | 0, $1_1 | 0, ($2_1 ? $3_1 : 256) | 0) | 0;
   block1 : {
    if ($2_1) {
     break block1
    }
    label : while (1) {
     $23($0_1 | 0, $5_1 | 0, 256 | 0);
     $3_1 = $3_1 + -256 | 0;
     if ($3_1 >>> 0 > 255 >>> 0) {
      continue label
     }
     break label;
    };
   }
   $23($0_1 | 0, $5_1 | 0, $3_1 | 0);
  }
  global$0 = $5_1 + 256 | 0;
 }
 
 function $30($0_1, $1_1, $2_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  $2_1 = $2_1 | 0;
  return $21($0_1 | 0, $1_1 | 0, $2_1 | 0, 4 | 0, 5 | 0) | 0 | 0;
 }
 
 function $31($0_1, $1_1, $2_1, $3_1, $4_1, $5_1) {
  $0_1 = $0_1 | 0;
  $1_1 = +$1_1;
  $2_1 = $2_1 | 0;
  $3_1 = $3_1 | 0;
  $4_1 = $4_1 | 0;
  $5_1 = $5_1 | 0;
  var $10_1 = 0, $11_1 = 0, $18_1 = 0, $19_1 = 0, $12_1 = 0, $15_1 = 0, $6_1 = 0, i64toi32_i32$1 = 0, i64toi32_i32$2 = 0, i64toi32_i32$4 = 0, i64toi32_i32$5 = 0, $22_1 = 0, i64toi32_i32$3 = 0, i64toi32_i32$0 = 0, $23_1 = 0, $20_1 = 0, $17_1 = 0, $8_1 = 0, $27_1 = 0.0, $13_1 = 0, $24_1 = 0, $24$hi = 0, $14_1 = 0, $16_1 = 0, $9_1 = 0, $21_1 = 0, $7_1 = 0, $46_1 = 0, $47_1 = 0, $48_1 = 0, $142 = 0, $25$hi = 0, $49 = 0, $897 = 0, $133 = 0, $25_1 = 0, $172 = 0, $174$hi = 0, $176$hi = 0, $26$hi = 0, $183 = 0, $183$hi = 0, $389 = 0.0, $890 = 0;
  $6_1 = global$0 - 560 | 0;
  global$0 = $6_1;
  $7_1 = 0;
  HEAP32[($6_1 + 44 | 0) >> 2] = 0;
  block1 : {
   block : {
    i64toi32_i32$0 = $33(+$1_1) | 0;
    i64toi32_i32$1 = i64toi32_i32$HIGH_BITS;
    $24_1 = i64toi32_i32$0;
    $24$hi = i64toi32_i32$1;
    i64toi32_i32$2 = i64toi32_i32$0;
    i64toi32_i32$0 = -1;
    i64toi32_i32$3 = -1;
    if ((i64toi32_i32$1 | 0) > (i64toi32_i32$0 | 0)) {
     $46_1 = 1
    } else {
     if ((i64toi32_i32$1 | 0) >= (i64toi32_i32$0 | 0)) {
      if (i64toi32_i32$2 >>> 0 <= i64toi32_i32$3 >>> 0) {
       $47_1 = 0
      } else {
       $47_1 = 1
      }
      $48_1 = $47_1;
     } else {
      $48_1 = 0
     }
     $46_1 = $48_1;
    }
    if ($46_1) {
     break block
    }
    $8_1 = 1;
    $9_1 = 65546;
    $1_1 = -$1_1;
    i64toi32_i32$2 = $33(+$1_1) | 0;
    i64toi32_i32$1 = i64toi32_i32$HIGH_BITS;
    $24_1 = i64toi32_i32$2;
    $24$hi = i64toi32_i32$1;
    break block1;
   }
   block2 : {
    if (!($4_1 & 2048 | 0)) {
     break block2
    }
    $8_1 = 1;
    $9_1 = 65549;
    break block1;
   }
   $8_1 = $4_1 & 1 | 0;
   $9_1 = $8_1 ? 65552 : 65547;
   $7_1 = !$8_1;
  }
  block4 : {
   block3 : {
    i64toi32_i32$1 = $24$hi;
    i64toi32_i32$3 = $24_1;
    i64toi32_i32$2 = 2146435072;
    i64toi32_i32$0 = 0;
    i64toi32_i32$2 = i64toi32_i32$1 & i64toi32_i32$2 | 0;
    i64toi32_i32$1 = i64toi32_i32$3 & i64toi32_i32$0 | 0;
    i64toi32_i32$3 = 2146435072;
    i64toi32_i32$0 = 0;
    if ((i64toi32_i32$1 | 0) != (i64toi32_i32$0 | 0) | (i64toi32_i32$2 | 0) != (i64toi32_i32$3 | 0) | 0) {
     break block3
    }
    $10_1 = $8_1 + 3 | 0;
    $29($0_1 | 0, 32 | 0, $2_1 | 0, $10_1 | 0, $4_1 & -65537 | 0 | 0);
    $23($0_1 | 0, $9_1 | 0, $8_1 | 0);
    $11_1 = $5_1 & 32 | 0;
    $23($0_1 | 0, ($1_1 != $1_1 ? ($11_1 ? 65565 : 65573) : $11_1 ? 65569 : 65577) | 0, 3 | 0);
    $29($0_1 | 0, 32 | 0, $2_1 | 0, $10_1 | 0, $4_1 ^ 8192 | 0 | 0);
    $12_1 = ($2_1 | 0) > ($10_1 | 0) ? $2_1 : $10_1;
    break block4;
   }
   $13_1 = $6_1 + 16 | 0;
   block7 : {
    block8 : {
     block6 : {
      block5 : {
       $1_1 = +$16(+$1_1, $6_1 + 44 | 0 | 0);
       $1_1 = $1_1 + $1_1;
       if ($1_1 == 0.0) {
        break block5
       }
       $10_1 = HEAP32[($6_1 + 44 | 0) >> 2] | 0;
       HEAP32[($6_1 + 44 | 0) >> 2] = $10_1 + -1 | 0;
       $14_1 = $5_1 | 32 | 0;
       if (($14_1 | 0) != (97 | 0)) {
        break block6
       }
       break block7;
      }
      $14_1 = $5_1 | 32 | 0;
      if (($14_1 | 0) == (97 | 0)) {
       break block7
      }
      $15_1 = ($3_1 | 0) < (0 | 0) ? 6 : $3_1;
      $16_1 = HEAP32[($6_1 + 44 | 0) >> 2] | 0;
      break block8;
     }
     $16_1 = $10_1 + -29 | 0;
     HEAP32[($6_1 + 44 | 0) >> 2] = $16_1;
     $15_1 = ($3_1 | 0) < (0 | 0) ? 6 : $3_1;
     $1_1 = $1_1 * 268435456.0;
    }
    $17_1 = ($6_1 + 48 | 0) + (($16_1 | 0) < (0 | 0) ? 0 : 288) | 0;
    $11_1 = $17_1;
    label : while (1) {
     $133 = $11_1;
     if ($1_1 < 4294967295.0 & $1_1 >= 0.0 | 0) {
      $142 = ~~$1_1 >>> 0
     } else {
      $142 = 0
     }
     $10_1 = $142;
     HEAP32[$133 >> 2] = $10_1;
     $11_1 = $11_1 + 4 | 0;
     $1_1 = ($1_1 - +($10_1 >>> 0)) * 1.0e9;
     if ($1_1 != 0.0) {
      continue label
     }
     break label;
    };
    block10 : {
     block9 : {
      if (($16_1 | 0) >= (1 | 0)) {
       break block9
      }
      $18_1 = $16_1;
      $10_1 = $11_1;
      $19_1 = $17_1;
      break block10;
     }
     $19_1 = $17_1;
     $18_1 = $16_1;
     label3 : while (1) {
      $18_1 = $18_1 >>> 0 < 29 >>> 0 ? $18_1 : 29;
      block11 : {
       $10_1 = $11_1 + -4 | 0;
       if ($10_1 >>> 0 < $19_1 >>> 0) {
        break block11
       }
       i64toi32_i32$1 = 0;
       $25_1 = $18_1;
       $25$hi = i64toi32_i32$1;
       i64toi32_i32$1 = 0;
       $24_1 = 0;
       $24$hi = i64toi32_i32$1;
       label1 : while (1) {
        $172 = $10_1;
        i64toi32_i32$0 = $10_1;
        i64toi32_i32$1 = HEAP32[$10_1 >> 2] | 0;
        i64toi32_i32$2 = 0;
        $174$hi = i64toi32_i32$2;
        i64toi32_i32$2 = $25$hi;
        i64toi32_i32$2 = $174$hi;
        i64toi32_i32$0 = i64toi32_i32$1;
        i64toi32_i32$1 = $25$hi;
        i64toi32_i32$3 = $25_1;
        i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
        if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
         i64toi32_i32$1 = i64toi32_i32$0 << i64toi32_i32$4 | 0;
         $49 = 0;
        } else {
         i64toi32_i32$1 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$0 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$2 << i64toi32_i32$4 | 0) | 0;
         $49 = i64toi32_i32$0 << i64toi32_i32$4 | 0;
        }
        $176$hi = i64toi32_i32$1;
        i64toi32_i32$1 = $24$hi;
        i64toi32_i32$1 = $176$hi;
        i64toi32_i32$2 = $49;
        i64toi32_i32$0 = $24$hi;
        i64toi32_i32$3 = $24_1;
        i64toi32_i32$4 = i64toi32_i32$2 + i64toi32_i32$3 | 0;
        i64toi32_i32$5 = i64toi32_i32$1 + i64toi32_i32$0 | 0;
        if (i64toi32_i32$4 >>> 0 < i64toi32_i32$3 >>> 0) {
         i64toi32_i32$5 = i64toi32_i32$5 + 1 | 0
        }
        $26$hi = i64toi32_i32$5;
        i64toi32_i32$2 = 0;
        i64toi32_i32$2 = __wasm_i64_udiv(i64toi32_i32$4 | 0, i64toi32_i32$5 | 0, 1e9 | 0, i64toi32_i32$2 | 0) | 0;
        i64toi32_i32$5 = i64toi32_i32$HIGH_BITS;
        $24_1 = i64toi32_i32$2;
        $24$hi = i64toi32_i32$5;
        i64toi32_i32$2 = 0;
        i64toi32_i32$2 = __wasm_i64_mul($24_1 | 0, i64toi32_i32$5 | 0, 1e9 | 0, i64toi32_i32$2 | 0) | 0;
        i64toi32_i32$5 = i64toi32_i32$HIGH_BITS;
        $183 = i64toi32_i32$2;
        $183$hi = i64toi32_i32$5;
        i64toi32_i32$5 = $26$hi;
        i64toi32_i32$1 = i64toi32_i32$4;
        i64toi32_i32$2 = $183$hi;
        i64toi32_i32$3 = $183;
        i64toi32_i32$0 = i64toi32_i32$1 - i64toi32_i32$3 | 0;
        i64toi32_i32$4 = (i64toi32_i32$1 >>> 0 < i64toi32_i32$3 >>> 0) + i64toi32_i32$2 | 0;
        i64toi32_i32$4 = i64toi32_i32$5 - i64toi32_i32$4 | 0;
        HEAP32[$172 >> 2] = i64toi32_i32$0;
        $10_1 = $10_1 + -4 | 0;
        if ($10_1 >>> 0 >= $19_1 >>> 0) {
         continue label1
        }
        break label1;
       };
       i64toi32_i32$4 = i64toi32_i32$5;
       i64toi32_i32$4 = i64toi32_i32$5;
       i64toi32_i32$5 = i64toi32_i32$1;
       i64toi32_i32$1 = 0;
       i64toi32_i32$3 = 1e9;
       if (i64toi32_i32$4 >>> 0 < i64toi32_i32$1 >>> 0 | ((i64toi32_i32$4 | 0) == (i64toi32_i32$1 | 0) & i64toi32_i32$5 >>> 0 < i64toi32_i32$3 >>> 0 | 0) | 0) {
        break block11
       }
       $19_1 = $19_1 + -4 | 0;
       i64toi32_i32$5 = $24$hi;
       HEAP32[$19_1 >> 2] = $24_1;
      }
      block12 : {
       label2 : while (1) {
        $10_1 = $11_1;
        if ($10_1 >>> 0 <= $19_1 >>> 0) {
         break block12
        }
        $11_1 = $10_1 + -4 | 0;
        if (!(HEAP32[$11_1 >> 2] | 0)) {
         continue label2
        }
        break label2;
       };
      }
      $18_1 = (HEAP32[($6_1 + 44 | 0) >> 2] | 0) - $18_1 | 0;
      HEAP32[($6_1 + 44 | 0) >> 2] = $18_1;
      $11_1 = $10_1;
      if (($18_1 | 0) > (0 | 0)) {
       continue label3
      }
      break label3;
     };
    }
    block13 : {
     if (($18_1 | 0) > (-1 | 0)) {
      break block13
     }
     $20_1 = ((($15_1 + 25 | 0) >>> 0) / (9 >>> 0) | 0) + 1 | 0;
     $21_1 = ($14_1 | 0) == (102 | 0);
     label5 : while (1) {
      $11_1 = 0 - $18_1 | 0;
      $12_1 = $11_1 >>> 0 < 9 >>> 0 ? $11_1 : 9;
      block15 : {
       block14 : {
        if ($19_1 >>> 0 < $10_1 >>> 0) {
         break block14
        }
        $11_1 = HEAP32[$19_1 >> 2] | 0 ? 0 : 4;
        break block15;
       }
       $22_1 = 1e9 >>> $12_1 | 0;
       $23_1 = (-1 << $12_1 | 0) ^ -1 | 0;
       $18_1 = 0;
       $11_1 = $19_1;
       label4 : while (1) {
        $3_1 = HEAP32[$11_1 >> 2] | 0;
        HEAP32[$11_1 >> 2] = ($3_1 >>> $12_1 | 0) + $18_1 | 0;
        $18_1 = Math_imul($3_1 & $23_1 | 0, $22_1);
        $11_1 = $11_1 + 4 | 0;
        if ($11_1 >>> 0 < $10_1 >>> 0) {
         continue label4
        }
        break label4;
       };
       $11_1 = HEAP32[$19_1 >> 2] | 0 ? 0 : 4;
       if (!$18_1) {
        break block15
       }
       HEAP32[$10_1 >> 2] = $18_1;
       $10_1 = $10_1 + 4 | 0;
      }
      $18_1 = (HEAP32[($6_1 + 44 | 0) >> 2] | 0) + $12_1 | 0;
      HEAP32[($6_1 + 44 | 0) >> 2] = $18_1;
      $19_1 = $19_1 + $11_1 | 0;
      $11_1 = $21_1 ? $17_1 : $19_1;
      $10_1 = (($10_1 - $11_1 | 0) >> 2 | 0 | 0) > ($20_1 | 0) ? $11_1 + ($20_1 << 2 | 0) | 0 : $10_1;
      if (($18_1 | 0) < (0 | 0)) {
       continue label5
      }
      break label5;
     };
    }
    $18_1 = 0;
    block16 : {
     if ($19_1 >>> 0 >= $10_1 >>> 0) {
      break block16
     }
     $18_1 = Math_imul(($17_1 - $19_1 | 0) >> 2 | 0, 9);
     $11_1 = 10;
     $3_1 = HEAP32[$19_1 >> 2] | 0;
     if ($3_1 >>> 0 < 10 >>> 0) {
      break block16
     }
     label6 : while (1) {
      $18_1 = $18_1 + 1 | 0;
      $11_1 = Math_imul($11_1, 10);
      if ($3_1 >>> 0 >= $11_1 >>> 0) {
       continue label6
      }
      break label6;
     };
    }
    block17 : {
     $11_1 = ($15_1 - (($14_1 | 0) == (102 | 0) ? 0 : $18_1) | 0) - (($15_1 | 0) != (0 | 0) & ($14_1 | 0) == (103 | 0) | 0) | 0;
     if (($11_1 | 0) >= (Math_imul(($10_1 - $17_1 | 0) >> 2 | 0, 9) + -9 | 0 | 0)) {
      break block17
     }
     $3_1 = $11_1 + 9216 | 0;
     $22_1 = ($3_1 | 0) / (9 | 0) | 0;
     $12_1 = (($6_1 + 48 | 0) + (($16_1 | 0) < (0 | 0) ? -4092 : -3804) | 0) + ($22_1 << 2 | 0) | 0;
     $11_1 = 10;
     block18 : {
      $3_1 = $3_1 - Math_imul($22_1, 9) | 0;
      if (($3_1 | 0) > (7 | 0)) {
       break block18
      }
      label7 : while (1) {
       $11_1 = Math_imul($11_1, 10);
       $3_1 = $3_1 + 1 | 0;
       if (($3_1 | 0) != (8 | 0)) {
        continue label7
       }
       break label7;
      };
     }
     $23_1 = $12_1 + 4 | 0;
     block20 : {
      block19 : {
       $3_1 = HEAP32[$12_1 >> 2] | 0;
       $20_1 = ($3_1 >>> 0) / ($11_1 >>> 0) | 0;
       $22_1 = $3_1 - Math_imul($20_1, $11_1) | 0;
       if ($22_1) {
        break block19
       }
       if (($23_1 | 0) == ($10_1 | 0)) {
        break block20
       }
      }
      block22 : {
       block21 : {
        if ($20_1 & 1 | 0) {
         break block21
        }
        $1_1 = 9007199254740992.0;
        if (($11_1 | 0) != (1e9 | 0)) {
         break block22
        }
        if ($12_1 >>> 0 <= $19_1 >>> 0) {
         break block22
        }
        if (!((HEAPU8[($12_1 + -4 | 0) >> 0] | 0) & 1 | 0)) {
         break block22
        }
       }
       $1_1 = 9007199254740994.0;
      }
      $389 = ($23_1 | 0) == ($10_1 | 0) ? 1.0 : 1.5;
      $23_1 = $11_1 >>> 1 | 0;
      $27_1 = $22_1 >>> 0 < $23_1 >>> 0 ? .5 : ($22_1 | 0) == ($23_1 | 0) ? $389 : 1.5;
      block23 : {
       if ($7_1) {
        break block23
       }
       if ((HEAPU8[$9_1 >> 0] | 0 | 0) != (45 | 0)) {
        break block23
       }
       $27_1 = -$27_1;
       $1_1 = -$1_1;
      }
      $3_1 = $3_1 - $22_1 | 0;
      HEAP32[$12_1 >> 2] = $3_1;
      if ($1_1 + $27_1 == $1_1) {
       break block20
      }
      $11_1 = $3_1 + $11_1 | 0;
      HEAP32[$12_1 >> 2] = $11_1;
      block24 : {
       if ($11_1 >>> 0 < 1e9 >>> 0) {
        break block24
       }
       label8 : while (1) {
        HEAP32[$12_1 >> 2] = 0;
        block25 : {
         $12_1 = $12_1 + -4 | 0;
         if ($12_1 >>> 0 >= $19_1 >>> 0) {
          break block25
         }
         $19_1 = $19_1 + -4 | 0;
         HEAP32[$19_1 >> 2] = 0;
        }
        $11_1 = (HEAP32[$12_1 >> 2] | 0) + 1 | 0;
        HEAP32[$12_1 >> 2] = $11_1;
        if ($11_1 >>> 0 > 999999999 >>> 0) {
         continue label8
        }
        break label8;
       };
      }
      $18_1 = Math_imul(($17_1 - $19_1 | 0) >> 2 | 0, 9);
      $11_1 = 10;
      $3_1 = HEAP32[$19_1 >> 2] | 0;
      if ($3_1 >>> 0 < 10 >>> 0) {
       break block20
      }
      label9 : while (1) {
       $18_1 = $18_1 + 1 | 0;
       $11_1 = Math_imul($11_1, 10);
       if ($3_1 >>> 0 >= $11_1 >>> 0) {
        continue label9
       }
       break label9;
      };
     }
     $11_1 = $12_1 + 4 | 0;
     $10_1 = $10_1 >>> 0 > $11_1 >>> 0 ? $11_1 : $10_1;
    }
    block26 : {
     label10 : while (1) {
      $11_1 = $10_1;
      $3_1 = $10_1 >>> 0 <= $19_1 >>> 0;
      if ($3_1) {
       break block26
      }
      $10_1 = $10_1 + -4 | 0;
      if (!(HEAP32[$10_1 >> 2] | 0)) {
       continue label10
      }
      break label10;
     };
    }
    block28 : {
     block27 : {
      if (($14_1 | 0) == (103 | 0)) {
       break block27
      }
      $22_1 = $4_1 & 8 | 0;
      break block28;
     }
     $10_1 = $15_1 ? $15_1 : 1;
     $12_1 = ($10_1 | 0) > ($18_1 | 0) & ($18_1 | 0) > (-5 | 0) | 0;
     $15_1 = ($12_1 ? $18_1 ^ -1 | 0 : -1) + $10_1 | 0;
     $5_1 = ($12_1 ? -1 : -2) + $5_1 | 0;
     $22_1 = $4_1 & 8 | 0;
     if ($22_1) {
      break block28
     }
     $10_1 = -9;
     block29 : {
      if ($3_1) {
       break block29
      }
      $12_1 = HEAP32[($11_1 + -4 | 0) >> 2] | 0;
      if (!$12_1) {
       break block29
      }
      $3_1 = 10;
      $10_1 = 0;
      if (($12_1 >>> 0) % (10 >>> 0) | 0) {
       break block29
      }
      label11 : while (1) {
       $22_1 = $10_1;
       $10_1 = $10_1 + 1 | 0;
       $3_1 = Math_imul($3_1, 10);
       if (!(($12_1 >>> 0) % ($3_1 >>> 0) | 0)) {
        continue label11
       }
       break label11;
      };
      $10_1 = $22_1 ^ -1 | 0;
     }
     $3_1 = Math_imul(($11_1 - $17_1 | 0) >> 2 | 0, 9);
     block30 : {
      if (($5_1 & -33 | 0 | 0) != (70 | 0)) {
       break block30
      }
      $22_1 = 0;
      $10_1 = ($3_1 + $10_1 | 0) + -9 | 0;
      $10_1 = ($10_1 | 0) > (0 | 0) ? $10_1 : 0;
      $15_1 = ($15_1 | 0) < ($10_1 | 0) ? $15_1 : $10_1;
      break block28;
     }
     $22_1 = 0;
     $10_1 = (($18_1 + $3_1 | 0) + $10_1 | 0) + -9 | 0;
     $10_1 = ($10_1 | 0) > (0 | 0) ? $10_1 : 0;
     $15_1 = ($15_1 | 0) < ($10_1 | 0) ? $15_1 : $10_1;
    }
    $12_1 = -1;
    $23_1 = $15_1 | $22_1 | 0;
    if (($15_1 | 0) > (($23_1 ? 2147483645 : 2147483646) | 0)) {
     break block4
    }
    $3_1 = ($15_1 + (($23_1 | 0) != (0 | 0)) | 0) + 1 | 0;
    block32 : {
     block31 : {
      $21_1 = $5_1 & -33 | 0;
      if (($21_1 | 0) != (70 | 0)) {
       break block31
      }
      if (($18_1 | 0) > ($3_1 ^ 2147483647 | 0 | 0)) {
       break block4
      }
      $10_1 = ($18_1 | 0) > (0 | 0) ? $18_1 : 0;
      break block32;
     }
     block33 : {
      $10_1 = $18_1 >> 31 | 0;
      i64toi32_i32$5 = 0;
      $10_1 = $28(($18_1 ^ $10_1 | 0) - $10_1 | 0 | 0, i64toi32_i32$5 | 0, $13_1 | 0) | 0;
      if (($13_1 - $10_1 | 0 | 0) > (1 | 0)) {
       break block33
      }
      label12 : while (1) {
       $10_1 = $10_1 + -1 | 0;
       HEAP8[$10_1 >> 0] = 48;
       if (($13_1 - $10_1 | 0 | 0) < (2 | 0)) {
        continue label12
       }
       break label12;
      };
     }
     $20_1 = $10_1 + -2 | 0;
     HEAP8[$20_1 >> 0] = $5_1;
     $12_1 = -1;
     HEAP8[($10_1 + -1 | 0) >> 0] = ($18_1 | 0) < (0 | 0) ? 45 : 43;
     $10_1 = $13_1 - $20_1 | 0;
     if (($10_1 | 0) > ($3_1 ^ 2147483647 | 0 | 0)) {
      break block4
     }
    }
    $12_1 = -1;
    $10_1 = $10_1 + $3_1 | 0;
    if (($10_1 | 0) > ($8_1 ^ 2147483647 | 0 | 0)) {
     break block4
    }
    $5_1 = $10_1 + $8_1 | 0;
    $29($0_1 | 0, 32 | 0, $2_1 | 0, $5_1 | 0, $4_1 | 0);
    $23($0_1 | 0, $9_1 | 0, $8_1 | 0);
    $29($0_1 | 0, 48 | 0, $2_1 | 0, $5_1 | 0, $4_1 ^ 65536 | 0 | 0);
    block45 : {
     block40 : {
      block38 : {
       block34 : {
        if (($21_1 | 0) != (70 | 0)) {
         break block34
        }
        $18_1 = $6_1 + 16 | 0 | 9 | 0;
        $3_1 = $19_1 >>> 0 > $17_1 >>> 0 ? $17_1 : $19_1;
        $19_1 = $3_1;
        label14 : while (1) {
         i64toi32_i32$3 = $19_1;
         i64toi32_i32$5 = HEAP32[$19_1 >> 2] | 0;
         i64toi32_i32$4 = 0;
         $10_1 = $28(i64toi32_i32$5 | 0, i64toi32_i32$4 | 0, $18_1 | 0) | 0;
         block36 : {
          block35 : {
           if (($19_1 | 0) == ($3_1 | 0)) {
            break block35
           }
           if ($10_1 >>> 0 <= ($6_1 + 16 | 0) >>> 0) {
            break block36
           }
           label13 : while (1) {
            $10_1 = $10_1 + -1 | 0;
            HEAP8[$10_1 >> 0] = 48;
            if ($10_1 >>> 0 > ($6_1 + 16 | 0) >>> 0) {
             continue label13
            }
            break block36;
           };
          }
          if (($10_1 | 0) != ($18_1 | 0)) {
           break block36
          }
          $10_1 = $10_1 + -1 | 0;
          HEAP8[$10_1 >> 0] = 48;
         }
         $23($0_1 | 0, $10_1 | 0, $18_1 - $10_1 | 0 | 0);
         $19_1 = $19_1 + 4 | 0;
         if ($19_1 >>> 0 <= $17_1 >>> 0) {
          continue label14
         }
         break label14;
        };
        block37 : {
         if (!$23_1) {
          break block37
         }
         $23($0_1 | 0, 65581 | 0, 1 | 0);
        }
        if ($19_1 >>> 0 >= $11_1 >>> 0) {
         break block38
        }
        if (($15_1 | 0) < (1 | 0)) {
         break block38
        }
        label16 : while (1) {
         block39 : {
          i64toi32_i32$3 = $19_1;
          i64toi32_i32$4 = HEAP32[$19_1 >> 2] | 0;
          i64toi32_i32$5 = 0;
          $10_1 = $28(i64toi32_i32$4 | 0, i64toi32_i32$5 | 0, $18_1 | 0) | 0;
          if ($10_1 >>> 0 <= ($6_1 + 16 | 0) >>> 0) {
           break block39
          }
          label15 : while (1) {
           $10_1 = $10_1 + -1 | 0;
           HEAP8[$10_1 >> 0] = 48;
           if ($10_1 >>> 0 > ($6_1 + 16 | 0) >>> 0) {
            continue label15
           }
           break label15;
          };
         }
         $23($0_1 | 0, $10_1 | 0, (($15_1 | 0) < (9 | 0) ? $15_1 : 9) | 0);
         $10_1 = $15_1 + -9 | 0;
         $19_1 = $19_1 + 4 | 0;
         if ($19_1 >>> 0 >= $11_1 >>> 0) {
          break block40
         }
         $3_1 = ($15_1 | 0) > (9 | 0);
         $15_1 = $10_1;
         if ($3_1) {
          continue label16
         }
         break block40;
        };
       }
       block41 : {
        if (($15_1 | 0) < (0 | 0)) {
         break block41
        }
        $12_1 = $11_1 >>> 0 > $19_1 >>> 0 ? $11_1 : $19_1 + 4 | 0;
        $18_1 = $6_1 + 16 | 0 | 9 | 0;
        $11_1 = $19_1;
        label18 : while (1) {
         block42 : {
          i64toi32_i32$3 = $11_1;
          i64toi32_i32$5 = HEAP32[$11_1 >> 2] | 0;
          i64toi32_i32$4 = 0;
          $10_1 = $28(i64toi32_i32$5 | 0, i64toi32_i32$4 | 0, $18_1 | 0) | 0;
          if (($10_1 | 0) != ($18_1 | 0)) {
           break block42
          }
          $10_1 = $10_1 + -1 | 0;
          HEAP8[$10_1 >> 0] = 48;
         }
         block44 : {
          block43 : {
           if (($11_1 | 0) == ($19_1 | 0)) {
            break block43
           }
           if ($10_1 >>> 0 <= ($6_1 + 16 | 0) >>> 0) {
            break block44
           }
           label17 : while (1) {
            $10_1 = $10_1 + -1 | 0;
            HEAP8[$10_1 >> 0] = 48;
            if ($10_1 >>> 0 > ($6_1 + 16 | 0) >>> 0) {
             continue label17
            }
            break block44;
           };
          }
          $23($0_1 | 0, $10_1 | 0, 1 | 0);
          $10_1 = $10_1 + 1 | 0;
          if (!($15_1 | $22_1 | 0)) {
           break block44
          }
          $23($0_1 | 0, 65581 | 0, 1 | 0);
         }
         $3_1 = $18_1 - $10_1 | 0;
         $23($0_1 | 0, $10_1 | 0, (($15_1 | 0) > ($3_1 | 0) ? $3_1 : $15_1) | 0);
         $15_1 = $15_1 - $3_1 | 0;
         $11_1 = $11_1 + 4 | 0;
         if ($11_1 >>> 0 >= $12_1 >>> 0) {
          break block41
         }
         if (($15_1 | 0) > (-1 | 0)) {
          continue label18
         }
         break label18;
        };
       }
       $29($0_1 | 0, 48 | 0, $15_1 + 18 | 0 | 0, 18 | 0, 0 | 0);
       $23($0_1 | 0, $20_1 | 0, $13_1 - $20_1 | 0 | 0);
       break block45;
      }
      $10_1 = $15_1;
     }
     $29($0_1 | 0, 48 | 0, $10_1 + 9 | 0 | 0, 9 | 0, 0 | 0);
    }
    $29($0_1 | 0, 32 | 0, $2_1 | 0, $5_1 | 0, $4_1 ^ 8192 | 0 | 0);
    $12_1 = ($2_1 | 0) > ($5_1 | 0) ? $2_1 : $5_1;
    break block4;
   }
   $20_1 = $9_1 + ((($5_1 << 26 | 0) >> 31 | 0) & 9 | 0) | 0;
   block46 : {
    if ($3_1 >>> 0 > 11 >>> 0) {
     break block46
    }
    $10_1 = 12 - $3_1 | 0;
    $27_1 = 16.0;
    label19 : while (1) {
     $27_1 = $27_1 * 16.0;
     $10_1 = $10_1 + -1 | 0;
     if ($10_1) {
      continue label19
     }
     break label19;
    };
    block47 : {
     if ((HEAPU8[$20_1 >> 0] | 0 | 0) != (45 | 0)) {
      break block47
     }
     $1_1 = -($27_1 + (-$1_1 - $27_1));
     break block46;
    }
    $1_1 = $1_1 + $27_1 - $27_1;
   }
   block48 : {
    $11_1 = HEAP32[($6_1 + 44 | 0) >> 2] | 0;
    $10_1 = $11_1 >> 31 | 0;
    i64toi32_i32$4 = 0;
    $10_1 = $28(($11_1 ^ $10_1 | 0) - $10_1 | 0 | 0, i64toi32_i32$4 | 0, $13_1 | 0) | 0;
    if (($10_1 | 0) != ($13_1 | 0)) {
     break block48
    }
    $10_1 = $10_1 + -1 | 0;
    HEAP8[$10_1 >> 0] = 48;
    $11_1 = HEAP32[($6_1 + 44 | 0) >> 2] | 0;
   }
   $22_1 = $8_1 | 2 | 0;
   $19_1 = $5_1 & 32 | 0;
   $23_1 = $10_1 + -2 | 0;
   HEAP8[$23_1 >> 0] = $5_1 + 15 | 0;
   HEAP8[($10_1 + -1 | 0) >> 0] = ($11_1 | 0) < (0 | 0) ? 45 : 43;
   $18_1 = ($3_1 | 0) < (1 | 0) & !($4_1 & 8 | 0) | 0;
   $11_1 = $6_1 + 16 | 0;
   label20 : while (1) {
    $10_1 = $11_1;
    $890 = $10_1;
    if (Math_abs($1_1) < 2147483647.0) {
     $897 = ~~$1_1
    } else {
     $897 = -2147483648
    }
    $11_1 = $897;
    HEAP8[$890 >> 0] = HEAPU8[($11_1 + 66080 | 0) >> 0] | 0 | $19_1 | 0;
    $1_1 = ($1_1 - +($11_1 | 0)) * 16.0;
    block49 : {
     $11_1 = $10_1 + 1 | 0;
     if (($11_1 - ($6_1 + 16 | 0) | 0 | 0) != (1 | 0)) {
      break block49
     }
     if ($1_1 == 0.0 & $18_1 | 0) {
      break block49
     }
     HEAP8[($10_1 + 1 | 0) >> 0] = 46;
     $11_1 = $10_1 + 2 | 0;
    }
    if ($1_1 != 0.0) {
     continue label20
    }
    break label20;
   };
   $12_1 = -1;
   $19_1 = $13_1 - $23_1 | 0;
   $18_1 = $22_1 + $19_1 | 0;
   if (($3_1 | 0) > (2147483645 - $18_1 | 0 | 0)) {
    break block4
   }
   $10_1 = $11_1 - ($6_1 + 16 | 0) | 0;
   $3_1 = $3_1 ? (($10_1 + -2 | 0 | 0) < ($3_1 | 0) ? $3_1 + 2 | 0 : $10_1) : $10_1;
   $11_1 = $18_1 + $3_1 | 0;
   $29($0_1 | 0, 32 | 0, $2_1 | 0, $11_1 | 0, $4_1 | 0);
   $23($0_1 | 0, $20_1 | 0, $22_1 | 0);
   $29($0_1 | 0, 48 | 0, $2_1 | 0, $11_1 | 0, $4_1 ^ 65536 | 0 | 0);
   $23($0_1 | 0, $6_1 + 16 | 0 | 0, $10_1 | 0);
   $29($0_1 | 0, 48 | 0, $3_1 - $10_1 | 0 | 0, 0 | 0, 0 | 0);
   $23($0_1 | 0, $23_1 | 0, $19_1 | 0);
   $29($0_1 | 0, 32 | 0, $2_1 | 0, $11_1 | 0, $4_1 ^ 8192 | 0 | 0);
   $12_1 = ($2_1 | 0) > ($11_1 | 0) ? $2_1 : $11_1;
  }
  global$0 = $6_1 + 560 | 0;
  return $12_1 | 0;
 }
 
 function $32($0_1, $1_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  var i64toi32_i32$0 = 0, i64toi32_i32$1 = 0, i64toi32_i32$2 = 0, $2_1 = 0, $12_1 = 0, $12$hi = 0, $14_1 = 0, $14$hi = 0;
  $2_1 = ((HEAP32[$1_1 >> 2] | 0) + 7 | 0) & -8 | 0;
  HEAP32[$1_1 >> 2] = $2_1 + 16 | 0;
  i64toi32_i32$2 = $2_1;
  i64toi32_i32$0 = HEAP32[i64toi32_i32$2 >> 2] | 0;
  i64toi32_i32$1 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
  $12_1 = i64toi32_i32$0;
  $12$hi = i64toi32_i32$1;
  i64toi32_i32$1 = HEAP32[(i64toi32_i32$2 + 8 | 0) >> 2] | 0;
  i64toi32_i32$0 = HEAP32[(i64toi32_i32$2 + 12 | 0) >> 2] | 0;
  $14_1 = i64toi32_i32$1;
  $14$hi = i64toi32_i32$0;
  i64toi32_i32$0 = $12$hi;
  i64toi32_i32$1 = $14$hi;
  HEAPF64[$0_1 >> 3] = +$47($12_1 | 0, i64toi32_i32$0 | 0, $14_1 | 0, i64toi32_i32$1 | 0);
 }
 
 function $33($0_1) {
  $0_1 = +$0_1;
  var i64toi32_i32$0 = 0, i64toi32_i32$1 = 0;
  wasm2js_scratch_store_f64(+$0_1);
  i64toi32_i32$0 = wasm2js_scratch_load_i32(1 | 0) | 0;
  i64toi32_i32$1 = wasm2js_scratch_load_i32(0 | 0) | 0;
  i64toi32_i32$HIGH_BITS = i64toi32_i32$0;
  return i64toi32_i32$1 | 0;
 }
 
 function $34($0_1) {
  $0_1 = $0_1 | 0;
  block : {
   if ($0_1) {
    break block
   }
   return 0 | 0;
  }
  HEAP32[($15() | 0) >> 2] = $0_1;
  return -1 | 0;
 }
 
 function $35() {
  return 42 | 0;
 }
 
 function $36() {
  return $35() | 0 | 0;
 }
 
 function $37() {
  return 69568 | 0;
 }
 
 function $38() {
  var $0_1 = 0;
  HEAP32[(0 + 69664 | 0) >> 2] = 69544;
  $0_1 = $36() | 0;
  HEAP32[(0 + 69624 | 0) >> 2] = 65536 - 0 | 0;
  HEAP32[(0 + 69620 | 0) >> 2] = 65536;
  HEAP32[(0 + 69592 | 0) >> 2] = $0_1;
  HEAP32[(0 + 69628 | 0) >> 2] = HEAP32[(0 + 68460 | 0) >> 2] | 0;
 }
 
 function $39($0_1, $1_1, $2_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  $2_1 = $2_1 | 0;
  var $3_1 = 0;
  $3_1 = 1;
  block1 : {
   block : {
    if (!$0_1) {
     break block
    }
    if ($1_1 >>> 0 <= 127 >>> 0) {
     break block1
    }
    block3 : {
     block2 : {
      if (HEAP32[(HEAP32[(($37() | 0) + 96 | 0) >> 2] | 0) >> 2] | 0) {
       break block2
      }
      if (($1_1 & -128 | 0 | 0) == (57216 | 0)) {
       break block1
      }
      HEAP32[($15() | 0) >> 2] = 25;
      break block3;
     }
     block4 : {
      if ($1_1 >>> 0 > 2047 >>> 0) {
       break block4
      }
      HEAP8[($0_1 + 1 | 0) >> 0] = $1_1 & 63 | 0 | 128 | 0;
      HEAP8[$0_1 >> 0] = $1_1 >>> 6 | 0 | 192 | 0;
      return 2 | 0;
     }
     block6 : {
      block5 : {
       if ($1_1 >>> 0 < 55296 >>> 0) {
        break block5
       }
       if (($1_1 & -8192 | 0 | 0) != (57344 | 0)) {
        break block6
       }
      }
      HEAP8[($0_1 + 2 | 0) >> 0] = $1_1 & 63 | 0 | 128 | 0;
      HEAP8[$0_1 >> 0] = $1_1 >>> 12 | 0 | 224 | 0;
      HEAP8[($0_1 + 1 | 0) >> 0] = ($1_1 >>> 6 | 0) & 63 | 0 | 128 | 0;
      return 3 | 0;
     }
     block7 : {
      if (($1_1 + -65536 | 0) >>> 0 > 1048575 >>> 0) {
       break block7
      }
      HEAP8[($0_1 + 3 | 0) >> 0] = $1_1 & 63 | 0 | 128 | 0;
      HEAP8[$0_1 >> 0] = $1_1 >>> 18 | 0 | 240 | 0;
      HEAP8[($0_1 + 2 | 0) >> 0] = ($1_1 >>> 6 | 0) & 63 | 0 | 128 | 0;
      HEAP8[($0_1 + 1 | 0) >> 0] = ($1_1 >>> 12 | 0) & 63 | 0 | 128 | 0;
      return 4 | 0;
     }
     HEAP32[($15() | 0) >> 2] = 25;
    }
    $3_1 = -1;
   }
   return $3_1 | 0;
  }
  HEAP8[$0_1 >> 0] = $1_1;
  return 1 | 0;
 }
 
 function $40($0_1, $1_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  block : {
   if ($0_1) {
    break block
   }
   return 0 | 0;
  }
  return $39($0_1 | 0, $1_1 | 0, 0 | 0) | 0 | 0;
 }
 
 function $41() {
  global$2 = 65536;
  global$1 = (0 + 15 | 0) & -16 | 0;
 }
 
 function $42() {
  return global$0 - global$1 | 0 | 0;
 }
 
 function $43() {
  return global$2 | 0;
 }
 
 function $44() {
  return global$1 | 0;
 }
 
 function $45($0_1, $1_1, $1$hi, $2_1, $2$hi, $3_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  $1$hi = $1$hi | 0;
  $2_1 = $2_1 | 0;
  $2$hi = $2$hi | 0;
  $3_1 = $3_1 | 0;
  var i64toi32_i32$1 = 0, i64toi32_i32$4 = 0, i64toi32_i32$2 = 0, i64toi32_i32$0 = 0, i64toi32_i32$3 = 0, $4$hi = 0, $18_1 = 0, $20_1 = 0, $21_1 = 0, $22_1 = 0, $11$hi = 0, $18$hi = 0, $19_1 = 0, $19$hi = 0, $4_1 = 0, $24$hi = 0;
  block1 : {
   block : {
    if (!($3_1 & 64 | 0)) {
     break block
    }
    i64toi32_i32$0 = $1$hi;
    i64toi32_i32$0 = 0;
    $11$hi = i64toi32_i32$0;
    i64toi32_i32$0 = $1$hi;
    i64toi32_i32$2 = $1_1;
    i64toi32_i32$1 = $11$hi;
    i64toi32_i32$3 = $3_1 + -64 | 0;
    i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
    if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
     i64toi32_i32$1 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
     $18_1 = 0;
    } else {
     i64toi32_i32$1 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$2 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$0 << i64toi32_i32$4 | 0) | 0;
     $18_1 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
    }
    $2_1 = $18_1;
    $2$hi = i64toi32_i32$1;
    i64toi32_i32$1 = 0;
    $1_1 = 0;
    $1$hi = i64toi32_i32$1;
    break block1;
   }
   if (!$3_1) {
    break block1
   }
   i64toi32_i32$1 = $1$hi;
   i64toi32_i32$1 = 0;
   $18$hi = i64toi32_i32$1;
   i64toi32_i32$1 = $1$hi;
   i64toi32_i32$0 = $1_1;
   i64toi32_i32$2 = $18$hi;
   i64toi32_i32$3 = 64 - $3_1 | 0;
   i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
   if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
    i64toi32_i32$2 = 0;
    $20_1 = i64toi32_i32$1 >>> i64toi32_i32$4 | 0;
   } else {
    i64toi32_i32$2 = i64toi32_i32$1 >>> i64toi32_i32$4 | 0;
    $20_1 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$1 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$0 >>> i64toi32_i32$4 | 0) | 0;
   }
   $19_1 = $20_1;
   $19$hi = i64toi32_i32$2;
   i64toi32_i32$2 = $2$hi;
   i64toi32_i32$2 = 0;
   $4_1 = $3_1;
   $4$hi = i64toi32_i32$2;
   i64toi32_i32$2 = $2$hi;
   i64toi32_i32$1 = $2_1;
   i64toi32_i32$0 = $4$hi;
   i64toi32_i32$3 = $3_1;
   i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
   if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
    i64toi32_i32$0 = i64toi32_i32$1 << i64toi32_i32$4 | 0;
    $21_1 = 0;
   } else {
    i64toi32_i32$0 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$1 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$2 << i64toi32_i32$4 | 0) | 0;
    $21_1 = i64toi32_i32$1 << i64toi32_i32$4 | 0;
   }
   $24$hi = i64toi32_i32$0;
   i64toi32_i32$0 = $19$hi;
   i64toi32_i32$2 = $19_1;
   i64toi32_i32$1 = $24$hi;
   i64toi32_i32$3 = $21_1;
   i64toi32_i32$1 = i64toi32_i32$0 | i64toi32_i32$1 | 0;
   $2_1 = i64toi32_i32$2 | i64toi32_i32$3 | 0;
   $2$hi = i64toi32_i32$1;
   i64toi32_i32$1 = $1$hi;
   i64toi32_i32$1 = $4$hi;
   i64toi32_i32$1 = $1$hi;
   i64toi32_i32$0 = $1_1;
   i64toi32_i32$2 = $4$hi;
   i64toi32_i32$3 = $4_1;
   i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
   if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
    i64toi32_i32$2 = i64toi32_i32$0 << i64toi32_i32$4 | 0;
    $22_1 = 0;
   } else {
    i64toi32_i32$2 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$0 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$1 << i64toi32_i32$4 | 0) | 0;
    $22_1 = i64toi32_i32$0 << i64toi32_i32$4 | 0;
   }
   $1_1 = $22_1;
   $1$hi = i64toi32_i32$2;
  }
  i64toi32_i32$2 = $1$hi;
  i64toi32_i32$0 = $0_1;
  HEAP32[i64toi32_i32$0 >> 2] = $1_1;
  HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$2;
  i64toi32_i32$2 = $2$hi;
  HEAP32[(i64toi32_i32$0 + 8 | 0) >> 2] = $2_1;
  HEAP32[(i64toi32_i32$0 + 12 | 0) >> 2] = i64toi32_i32$2;
 }
 
 function $46($0_1, $1_1, $1$hi, $2_1, $2$hi, $3_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  $1$hi = $1$hi | 0;
  $2_1 = $2_1 | 0;
  $2$hi = $2$hi | 0;
  $3_1 = $3_1 | 0;
  var i64toi32_i32$0 = 0, i64toi32_i32$4 = 0, i64toi32_i32$2 = 0, i64toi32_i32$1 = 0, i64toi32_i32$3 = 0, $4$hi = 0, $18_1 = 0, $20_1 = 0, $21_1 = 0, $22_1 = 0, $11$hi = 0, $18$hi = 0, $19_1 = 0, $19$hi = 0, $4_1 = 0, $24$hi = 0;
  block1 : {
   block : {
    if (!($3_1 & 64 | 0)) {
     break block
    }
    i64toi32_i32$0 = $2$hi;
    i64toi32_i32$0 = 0;
    $11$hi = i64toi32_i32$0;
    i64toi32_i32$0 = $2$hi;
    i64toi32_i32$2 = $2_1;
    i64toi32_i32$1 = $11$hi;
    i64toi32_i32$3 = $3_1 + -64 | 0;
    i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
    if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
     i64toi32_i32$1 = 0;
     $18_1 = i64toi32_i32$0 >>> i64toi32_i32$4 | 0;
    } else {
     i64toi32_i32$1 = i64toi32_i32$0 >>> i64toi32_i32$4 | 0;
     $18_1 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$0 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$2 >>> i64toi32_i32$4 | 0) | 0;
    }
    $1_1 = $18_1;
    $1$hi = i64toi32_i32$1;
    i64toi32_i32$1 = 0;
    $2_1 = 0;
    $2$hi = i64toi32_i32$1;
    break block1;
   }
   if (!$3_1) {
    break block1
   }
   i64toi32_i32$1 = $2$hi;
   i64toi32_i32$1 = 0;
   $18$hi = i64toi32_i32$1;
   i64toi32_i32$1 = $2$hi;
   i64toi32_i32$0 = $2_1;
   i64toi32_i32$2 = $18$hi;
   i64toi32_i32$3 = 64 - $3_1 | 0;
   i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
   if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
    i64toi32_i32$2 = i64toi32_i32$0 << i64toi32_i32$4 | 0;
    $20_1 = 0;
   } else {
    i64toi32_i32$2 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$0 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$1 << i64toi32_i32$4 | 0) | 0;
    $20_1 = i64toi32_i32$0 << i64toi32_i32$4 | 0;
   }
   $19_1 = $20_1;
   $19$hi = i64toi32_i32$2;
   i64toi32_i32$2 = $1$hi;
   i64toi32_i32$2 = 0;
   $4_1 = $3_1;
   $4$hi = i64toi32_i32$2;
   i64toi32_i32$2 = $1$hi;
   i64toi32_i32$1 = $1_1;
   i64toi32_i32$0 = $4$hi;
   i64toi32_i32$3 = $3_1;
   i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
   if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
    i64toi32_i32$0 = 0;
    $21_1 = i64toi32_i32$2 >>> i64toi32_i32$4 | 0;
   } else {
    i64toi32_i32$0 = i64toi32_i32$2 >>> i64toi32_i32$4 | 0;
    $21_1 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$2 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$1 >>> i64toi32_i32$4 | 0) | 0;
   }
   $24$hi = i64toi32_i32$0;
   i64toi32_i32$0 = $19$hi;
   i64toi32_i32$2 = $19_1;
   i64toi32_i32$1 = $24$hi;
   i64toi32_i32$3 = $21_1;
   i64toi32_i32$1 = i64toi32_i32$0 | i64toi32_i32$1 | 0;
   $1_1 = i64toi32_i32$2 | i64toi32_i32$3 | 0;
   $1$hi = i64toi32_i32$1;
   i64toi32_i32$1 = $2$hi;
   i64toi32_i32$1 = $4$hi;
   i64toi32_i32$1 = $2$hi;
   i64toi32_i32$0 = $2_1;
   i64toi32_i32$2 = $4$hi;
   i64toi32_i32$3 = $4_1;
   i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
   if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
    i64toi32_i32$2 = 0;
    $22_1 = i64toi32_i32$1 >>> i64toi32_i32$4 | 0;
   } else {
    i64toi32_i32$2 = i64toi32_i32$1 >>> i64toi32_i32$4 | 0;
    $22_1 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$1 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$0 >>> i64toi32_i32$4 | 0) | 0;
   }
   $2_1 = $22_1;
   $2$hi = i64toi32_i32$2;
  }
  i64toi32_i32$2 = $1$hi;
  i64toi32_i32$0 = $0_1;
  HEAP32[i64toi32_i32$0 >> 2] = $1_1;
  HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$2;
  i64toi32_i32$2 = $2$hi;
  HEAP32[(i64toi32_i32$0 + 8 | 0) >> 2] = $2_1;
  HEAP32[(i64toi32_i32$0 + 12 | 0) >> 2] = i64toi32_i32$2;
 }
 
 function $47($0_1, $0$hi, $1_1, $1$hi) {
  $0_1 = $0_1 | 0;
  $0$hi = $0$hi | 0;
  $1_1 = $1_1 | 0;
  $1$hi = $1$hi | 0;
  var i64toi32_i32$3 = 0, i64toi32_i32$2 = 0, i64toi32_i32$0 = 0, i64toi32_i32$1 = 0, i64toi32_i32$4 = 0, i64toi32_i32$5 = 0, $7_1 = 0, $7$hi = 0, $3_1 = 0, $2_1 = 0, $8_1 = 0, $8$hi = 0, $4_1 = 0, $6_1 = 0, $45_1 = 0, $46_1 = 0, $47_1 = 0, $48_1 = 0, $49 = 0, $5_1 = 0, $50_1 = 0, $51_1 = 0, $52_1 = 0, $23_1 = 0, $23$hi = 0, $25$hi = 0, $39$hi = 0, $48$hi = 0, $58 = 0, $58$hi = 0, $60$hi = 0, $76 = 0, $76$hi = 0, $89 = 0, $89$hi = 0, $91 = 0, $91$hi = 0, $101 = 0, $101$hi = 0, $104$hi = 0, $107$hi = 0, $109$hi = 0, $118$hi = 0, $122 = 0, $122$hi = 0, $133$hi = 0, $135 = 0, $135$hi = 0, $136$hi = 0;
  $2_1 = global$0 - 32 | 0;
  global$0 = $2_1;
  i64toi32_i32$0 = $1$hi;
  i64toi32_i32$2 = $1_1;
  i64toi32_i32$1 = 65535;
  i64toi32_i32$3 = -1;
  i64toi32_i32$1 = i64toi32_i32$0 & i64toi32_i32$1 | 0;
  $7_1 = i64toi32_i32$2 & i64toi32_i32$3 | 0;
  $7$hi = i64toi32_i32$1;
  block3 : {
   block : {
    i64toi32_i32$1 = i64toi32_i32$0;
    i64toi32_i32$1 = i64toi32_i32$0;
    i64toi32_i32$0 = i64toi32_i32$2;
    i64toi32_i32$2 = 0;
    i64toi32_i32$3 = 48;
    i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
    if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
     i64toi32_i32$2 = 0;
     $45_1 = i64toi32_i32$1 >>> i64toi32_i32$4 | 0;
    } else {
     i64toi32_i32$2 = i64toi32_i32$1 >>> i64toi32_i32$4 | 0;
     $45_1 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$1 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$0 >>> i64toi32_i32$4 | 0) | 0;
    }
    i64toi32_i32$1 = $45_1;
    i64toi32_i32$0 = 0;
    i64toi32_i32$3 = 32767;
    i64toi32_i32$0 = i64toi32_i32$2 & i64toi32_i32$0 | 0;
    $8_1 = i64toi32_i32$1 & i64toi32_i32$3 | 0;
    $8$hi = i64toi32_i32$0;
    $3_1 = $8_1;
    if (($3_1 + -15361 | 0) >>> 0 > 2045 >>> 0) {
     break block
    }
    i64toi32_i32$0 = $0$hi;
    i64toi32_i32$2 = $0_1;
    i64toi32_i32$1 = 0;
    i64toi32_i32$3 = 60;
    i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
    if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
     i64toi32_i32$1 = 0;
     $46_1 = i64toi32_i32$0 >>> i64toi32_i32$4 | 0;
    } else {
     i64toi32_i32$1 = i64toi32_i32$0 >>> i64toi32_i32$4 | 0;
     $46_1 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$0 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$2 >>> i64toi32_i32$4 | 0) | 0;
    }
    $23_1 = $46_1;
    $23$hi = i64toi32_i32$1;
    i64toi32_i32$1 = $7$hi;
    i64toi32_i32$0 = $7_1;
    i64toi32_i32$2 = 0;
    i64toi32_i32$3 = 4;
    i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
    if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
     i64toi32_i32$2 = i64toi32_i32$0 << i64toi32_i32$4 | 0;
     $47_1 = 0;
    } else {
     i64toi32_i32$2 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$0 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$1 << i64toi32_i32$4 | 0) | 0;
     $47_1 = i64toi32_i32$0 << i64toi32_i32$4 | 0;
    }
    $25$hi = i64toi32_i32$2;
    i64toi32_i32$2 = $23$hi;
    i64toi32_i32$1 = $23_1;
    i64toi32_i32$0 = $25$hi;
    i64toi32_i32$3 = $47_1;
    i64toi32_i32$0 = i64toi32_i32$2 | i64toi32_i32$0 | 0;
    $7_1 = i64toi32_i32$1 | i64toi32_i32$3 | 0;
    $7$hi = i64toi32_i32$0;
    i64toi32_i32$0 = 0;
    $8_1 = $3_1 + -15360 | 0;
    $8$hi = i64toi32_i32$0;
    block2 : {
     block1 : {
      i64toi32_i32$0 = $0$hi;
      i64toi32_i32$2 = $0_1;
      i64toi32_i32$1 = 268435455;
      i64toi32_i32$3 = -1;
      i64toi32_i32$1 = i64toi32_i32$0 & i64toi32_i32$1 | 0;
      $0_1 = i64toi32_i32$2 & i64toi32_i32$3 | 0;
      $0$hi = i64toi32_i32$1;
      i64toi32_i32$0 = $0_1;
      i64toi32_i32$2 = 134217728;
      i64toi32_i32$3 = 1;
      if (i64toi32_i32$1 >>> 0 < i64toi32_i32$2 >>> 0 | ((i64toi32_i32$1 | 0) == (i64toi32_i32$2 | 0) & i64toi32_i32$0 >>> 0 < i64toi32_i32$3 >>> 0 | 0) | 0) {
       break block1
      }
      i64toi32_i32$0 = $7$hi;
      i64toi32_i32$3 = $7_1;
      i64toi32_i32$1 = 0;
      i64toi32_i32$2 = 1;
      i64toi32_i32$4 = i64toi32_i32$3 + i64toi32_i32$2 | 0;
      i64toi32_i32$5 = i64toi32_i32$0 + i64toi32_i32$1 | 0;
      if (i64toi32_i32$4 >>> 0 < i64toi32_i32$2 >>> 0) {
       i64toi32_i32$5 = i64toi32_i32$5 + 1 | 0
      }
      $7_1 = i64toi32_i32$4;
      $7$hi = i64toi32_i32$5;
      break block2;
     }
     i64toi32_i32$5 = $0$hi;
     i64toi32_i32$0 = $0_1;
     i64toi32_i32$3 = 134217728;
     i64toi32_i32$2 = 0;
     if ((i64toi32_i32$0 | 0) != (i64toi32_i32$2 | 0) | (i64toi32_i32$5 | 0) != (i64toi32_i32$3 | 0) | 0) {
      break block2
     }
     i64toi32_i32$0 = $7$hi;
     i64toi32_i32$2 = $7_1;
     i64toi32_i32$5 = 0;
     i64toi32_i32$3 = 1;
     i64toi32_i32$5 = i64toi32_i32$0 & i64toi32_i32$5 | 0;
     $39$hi = i64toi32_i32$5;
     i64toi32_i32$5 = i64toi32_i32$0;
     i64toi32_i32$5 = $39$hi;
     i64toi32_i32$0 = i64toi32_i32$2 & i64toi32_i32$3 | 0;
     i64toi32_i32$2 = $7$hi;
     i64toi32_i32$3 = $7_1;
     i64toi32_i32$1 = i64toi32_i32$0 + i64toi32_i32$3 | 0;
     i64toi32_i32$4 = i64toi32_i32$5 + i64toi32_i32$2 | 0;
     if (i64toi32_i32$1 >>> 0 < i64toi32_i32$3 >>> 0) {
      i64toi32_i32$4 = i64toi32_i32$4 + 1 | 0
     }
     $7_1 = i64toi32_i32$1;
     $7$hi = i64toi32_i32$4;
    }
    i64toi32_i32$4 = $7$hi;
    i64toi32_i32$5 = $7_1;
    i64toi32_i32$0 = 1048575;
    i64toi32_i32$3 = -1;
    $3_1 = i64toi32_i32$4 >>> 0 > i64toi32_i32$0 >>> 0 | ((i64toi32_i32$4 | 0) == (i64toi32_i32$0 | 0) & i64toi32_i32$5 >>> 0 > i64toi32_i32$3 >>> 0 | 0) | 0;
    i64toi32_i32$2 = $3_1;
    i64toi32_i32$5 = 0;
    i64toi32_i32$0 = i64toi32_i32$2 ? 0 : $7_1;
    i64toi32_i32$3 = i64toi32_i32$2 ? i64toi32_i32$5 : i64toi32_i32$4;
    $0_1 = i64toi32_i32$0;
    $0$hi = i64toi32_i32$3;
    i64toi32_i32$3 = 0;
    $48$hi = i64toi32_i32$3;
    i64toi32_i32$3 = $8$hi;
    i64toi32_i32$3 = $48$hi;
    i64toi32_i32$0 = $8$hi;
    i64toi32_i32$4 = $8_1;
    i64toi32_i32$5 = i64toi32_i32$2 + i64toi32_i32$4 | 0;
    i64toi32_i32$1 = i64toi32_i32$3 + i64toi32_i32$0 | 0;
    if (i64toi32_i32$5 >>> 0 < i64toi32_i32$4 >>> 0) {
     i64toi32_i32$1 = i64toi32_i32$1 + 1 | 0
    }
    $7_1 = i64toi32_i32$5;
    $7$hi = i64toi32_i32$1;
    break block3;
   }
   block4 : {
    i64toi32_i32$1 = $0$hi;
    i64toi32_i32$1 = $7$hi;
    i64toi32_i32$1 = $0$hi;
    i64toi32_i32$3 = $0_1;
    i64toi32_i32$2 = $7$hi;
    i64toi32_i32$4 = $7_1;
    i64toi32_i32$2 = i64toi32_i32$1 | i64toi32_i32$2 | 0;
    if (!(i64toi32_i32$3 | i64toi32_i32$4 | 0 | i64toi32_i32$2 | 0)) {
     break block4
    }
    i64toi32_i32$2 = $8$hi;
    i64toi32_i32$1 = $8_1;
    i64toi32_i32$3 = 0;
    i64toi32_i32$4 = 32767;
    if ((i64toi32_i32$1 | 0) != (i64toi32_i32$4 | 0) | (i64toi32_i32$2 | 0) != (i64toi32_i32$3 | 0) | 0) {
     break block4
    }
    i64toi32_i32$1 = $0$hi;
    i64toi32_i32$4 = $0_1;
    i64toi32_i32$2 = 0;
    i64toi32_i32$3 = 60;
    i64toi32_i32$0 = i64toi32_i32$3 & 31 | 0;
    if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
     i64toi32_i32$2 = 0;
     $48_1 = i64toi32_i32$1 >>> i64toi32_i32$0 | 0;
    } else {
     i64toi32_i32$2 = i64toi32_i32$1 >>> i64toi32_i32$0 | 0;
     $48_1 = (((1 << i64toi32_i32$0 | 0) - 1 | 0) & i64toi32_i32$1 | 0) << (32 - i64toi32_i32$0 | 0) | 0 | (i64toi32_i32$4 >>> i64toi32_i32$0 | 0) | 0;
    }
    $58 = $48_1;
    $58$hi = i64toi32_i32$2;
    i64toi32_i32$2 = $7$hi;
    i64toi32_i32$1 = $7_1;
    i64toi32_i32$4 = 0;
    i64toi32_i32$3 = 4;
    i64toi32_i32$0 = i64toi32_i32$3 & 31 | 0;
    if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
     i64toi32_i32$4 = i64toi32_i32$1 << i64toi32_i32$0 | 0;
     $49 = 0;
    } else {
     i64toi32_i32$4 = ((1 << i64toi32_i32$0 | 0) - 1 | 0) & (i64toi32_i32$1 >>> (32 - i64toi32_i32$0 | 0) | 0) | 0 | (i64toi32_i32$2 << i64toi32_i32$0 | 0) | 0;
     $49 = i64toi32_i32$1 << i64toi32_i32$0 | 0;
    }
    $60$hi = i64toi32_i32$4;
    i64toi32_i32$4 = $58$hi;
    i64toi32_i32$2 = $58;
    i64toi32_i32$1 = $60$hi;
    i64toi32_i32$3 = $49;
    i64toi32_i32$1 = i64toi32_i32$4 | i64toi32_i32$1 | 0;
    i64toi32_i32$4 = i64toi32_i32$2 | i64toi32_i32$3 | 0;
    i64toi32_i32$2 = 524288;
    i64toi32_i32$3 = 0;
    i64toi32_i32$2 = i64toi32_i32$1 | i64toi32_i32$2 | 0;
    $0_1 = i64toi32_i32$4 | i64toi32_i32$3 | 0;
    $0$hi = i64toi32_i32$2;
    i64toi32_i32$2 = 0;
    $7_1 = 2047;
    $7$hi = i64toi32_i32$2;
    break block3;
   }
   block5 : {
    if ($3_1 >>> 0 <= 17406 >>> 0) {
     break block5
    }
    i64toi32_i32$2 = 0;
    $7_1 = 2047;
    $7$hi = i64toi32_i32$2;
    i64toi32_i32$2 = 0;
    $0_1 = 0;
    $0$hi = i64toi32_i32$2;
    break block3;
   }
   block6 : {
    i64toi32_i32$2 = $8$hi;
    $4_1 = !($8_1 | i64toi32_i32$2 | 0);
    $5_1 = $4_1 ? 15360 : 15361;
    $6_1 = $5_1 - $3_1 | 0;
    if (($6_1 | 0) <= (112 | 0)) {
     break block6
    }
    i64toi32_i32$2 = 0;
    $0_1 = 0;
    $0$hi = i64toi32_i32$2;
    i64toi32_i32$2 = 0;
    $7_1 = 0;
    $7$hi = i64toi32_i32$2;
    break block3;
   }
   i64toi32_i32$2 = $7$hi;
   i64toi32_i32$1 = $7_1;
   i64toi32_i32$4 = 65536;
   i64toi32_i32$3 = 0;
   i64toi32_i32$4 = i64toi32_i32$2 | i64toi32_i32$4 | 0;
   $76 = i64toi32_i32$1 | i64toi32_i32$3 | 0;
   $76$hi = i64toi32_i32$4;
   i64toi32_i32$0 = $4_1;
   i64toi32_i32$4 = i64toi32_i32$2;
   i64toi32_i32$1 = $76$hi;
   i64toi32_i32$3 = i64toi32_i32$0 ? $7_1 : $76;
   i64toi32_i32$2 = i64toi32_i32$0 ? i64toi32_i32$2 : i64toi32_i32$1;
   $7_1 = i64toi32_i32$3;
   $7$hi = i64toi32_i32$2;
   $4_1 = 0;
   block7 : {
    if (($5_1 | 0) == ($3_1 | 0)) {
     break block7
    }
    i64toi32_i32$2 = $0$hi;
    i64toi32_i32$2 = $7$hi;
    i64toi32_i32$2 = $0$hi;
    i64toi32_i32$3 = $7$hi;
    $45($2_1 + 16 | 0 | 0, $0_1 | 0, i64toi32_i32$2 | 0, $7_1 | 0, i64toi32_i32$3 | 0, 128 - $6_1 | 0 | 0);
    i64toi32_i32$0 = $2_1;
    i64toi32_i32$3 = HEAP32[(i64toi32_i32$0 + 16 | 0) >> 2] | 0;
    i64toi32_i32$2 = HEAP32[(i64toi32_i32$0 + 20 | 0) >> 2] | 0;
    $89 = i64toi32_i32$3;
    $89$hi = i64toi32_i32$2;
    i64toi32_i32$2 = HEAP32[(i64toi32_i32$0 + 24 | 0) >> 2] | 0;
    i64toi32_i32$3 = HEAP32[(i64toi32_i32$0 + 28 | 0) >> 2] | 0;
    $91 = i64toi32_i32$2;
    $91$hi = i64toi32_i32$3;
    i64toi32_i32$3 = $89$hi;
    i64toi32_i32$0 = $89;
    i64toi32_i32$2 = $91$hi;
    i64toi32_i32$1 = $91;
    i64toi32_i32$2 = i64toi32_i32$3 | i64toi32_i32$2 | 0;
    i64toi32_i32$3 = i64toi32_i32$0 | i64toi32_i32$1 | 0;
    i64toi32_i32$0 = 0;
    i64toi32_i32$1 = 0;
    $4_1 = (i64toi32_i32$3 | 0) != (i64toi32_i32$1 | 0) | (i64toi32_i32$2 | 0) != (i64toi32_i32$0 | 0) | 0;
   }
   i64toi32_i32$3 = $0$hi;
   i64toi32_i32$3 = $7$hi;
   i64toi32_i32$3 = $0$hi;
   i64toi32_i32$2 = $7$hi;
   $46($2_1 | 0, $0_1 | 0, i64toi32_i32$3 | 0, $7_1 | 0, i64toi32_i32$2 | 0, $6_1 | 0);
   i64toi32_i32$1 = $2_1;
   i64toi32_i32$2 = HEAP32[i64toi32_i32$1 >> 2] | 0;
   i64toi32_i32$3 = HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] | 0;
   $7_1 = i64toi32_i32$2;
   $7$hi = i64toi32_i32$3;
   i64toi32_i32$1 = i64toi32_i32$2;
   i64toi32_i32$2 = 0;
   i64toi32_i32$0 = 60;
   i64toi32_i32$4 = i64toi32_i32$0 & 31 | 0;
   if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
    i64toi32_i32$2 = 0;
    $50_1 = i64toi32_i32$3 >>> i64toi32_i32$4 | 0;
   } else {
    i64toi32_i32$2 = i64toi32_i32$3 >>> i64toi32_i32$4 | 0;
    $50_1 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$3 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$1 >>> i64toi32_i32$4 | 0) | 0;
   }
   $101 = $50_1;
   $101$hi = i64toi32_i32$2;
   i64toi32_i32$3 = $2_1;
   i64toi32_i32$2 = HEAP32[(i64toi32_i32$3 + 8 | 0) >> 2] | 0;
   i64toi32_i32$1 = HEAP32[(i64toi32_i32$3 + 12 | 0) >> 2] | 0;
   i64toi32_i32$3 = i64toi32_i32$2;
   i64toi32_i32$2 = 0;
   i64toi32_i32$0 = 4;
   i64toi32_i32$4 = i64toi32_i32$0 & 31 | 0;
   if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
    i64toi32_i32$2 = i64toi32_i32$3 << i64toi32_i32$4 | 0;
    $51_1 = 0;
   } else {
    i64toi32_i32$2 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$3 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$1 << i64toi32_i32$4 | 0) | 0;
    $51_1 = i64toi32_i32$3 << i64toi32_i32$4 | 0;
   }
   $104$hi = i64toi32_i32$2;
   i64toi32_i32$2 = $101$hi;
   i64toi32_i32$1 = $101;
   i64toi32_i32$3 = $104$hi;
   i64toi32_i32$0 = $51_1;
   i64toi32_i32$3 = i64toi32_i32$2 | i64toi32_i32$3 | 0;
   $0_1 = i64toi32_i32$1 | i64toi32_i32$0 | 0;
   $0$hi = i64toi32_i32$3;
   block9 : {
    block8 : {
     i64toi32_i32$3 = $7$hi;
     i64toi32_i32$2 = $7_1;
     i64toi32_i32$1 = 268435455;
     i64toi32_i32$0 = -1;
     i64toi32_i32$1 = i64toi32_i32$3 & i64toi32_i32$1 | 0;
     $107$hi = i64toi32_i32$1;
     i64toi32_i32$1 = 0;
     $109$hi = i64toi32_i32$1;
     i64toi32_i32$1 = $107$hi;
     i64toi32_i32$3 = i64toi32_i32$2 & i64toi32_i32$0 | 0;
     i64toi32_i32$2 = $109$hi;
     i64toi32_i32$0 = $4_1;
     i64toi32_i32$2 = i64toi32_i32$1 | i64toi32_i32$2 | 0;
     $7_1 = i64toi32_i32$3 | i64toi32_i32$0 | 0;
     $7$hi = i64toi32_i32$2;
     i64toi32_i32$1 = $7_1;
     i64toi32_i32$3 = 134217728;
     i64toi32_i32$0 = 1;
     if (i64toi32_i32$2 >>> 0 < i64toi32_i32$3 >>> 0 | ((i64toi32_i32$2 | 0) == (i64toi32_i32$3 | 0) & i64toi32_i32$1 >>> 0 < i64toi32_i32$0 >>> 0 | 0) | 0) {
      break block8
     }
     i64toi32_i32$1 = $0$hi;
     i64toi32_i32$0 = $0_1;
     i64toi32_i32$2 = 0;
     i64toi32_i32$3 = 1;
     i64toi32_i32$4 = i64toi32_i32$0 + i64toi32_i32$3 | 0;
     i64toi32_i32$5 = i64toi32_i32$1 + i64toi32_i32$2 | 0;
     if (i64toi32_i32$4 >>> 0 < i64toi32_i32$3 >>> 0) {
      i64toi32_i32$5 = i64toi32_i32$5 + 1 | 0
     }
     $0_1 = i64toi32_i32$4;
     $0$hi = i64toi32_i32$5;
     break block9;
    }
    i64toi32_i32$5 = $7$hi;
    i64toi32_i32$1 = $7_1;
    i64toi32_i32$0 = 134217728;
    i64toi32_i32$3 = 0;
    if ((i64toi32_i32$1 | 0) != (i64toi32_i32$3 | 0) | (i64toi32_i32$5 | 0) != (i64toi32_i32$0 | 0) | 0) {
     break block9
    }
    i64toi32_i32$1 = $0$hi;
    i64toi32_i32$3 = $0_1;
    i64toi32_i32$5 = 0;
    i64toi32_i32$0 = 1;
    i64toi32_i32$5 = i64toi32_i32$1 & i64toi32_i32$5 | 0;
    $118$hi = i64toi32_i32$5;
    i64toi32_i32$5 = i64toi32_i32$1;
    i64toi32_i32$5 = $118$hi;
    i64toi32_i32$1 = i64toi32_i32$3 & i64toi32_i32$0 | 0;
    i64toi32_i32$3 = $0$hi;
    i64toi32_i32$0 = $0_1;
    i64toi32_i32$2 = i64toi32_i32$1 + i64toi32_i32$0 | 0;
    i64toi32_i32$4 = i64toi32_i32$5 + i64toi32_i32$3 | 0;
    if (i64toi32_i32$2 >>> 0 < i64toi32_i32$0 >>> 0) {
     i64toi32_i32$4 = i64toi32_i32$4 + 1 | 0
    }
    $0_1 = i64toi32_i32$2;
    $0$hi = i64toi32_i32$4;
   }
   i64toi32_i32$4 = $0$hi;
   i64toi32_i32$5 = $0_1;
   i64toi32_i32$1 = 1048576;
   i64toi32_i32$0 = 0;
   i64toi32_i32$1 = i64toi32_i32$4 ^ i64toi32_i32$1 | 0;
   $122 = i64toi32_i32$5 ^ i64toi32_i32$0 | 0;
   $122$hi = i64toi32_i32$1;
   i64toi32_i32$1 = i64toi32_i32$4;
   i64toi32_i32$4 = i64toi32_i32$5;
   i64toi32_i32$5 = 1048575;
   i64toi32_i32$0 = -1;
   $3_1 = i64toi32_i32$1 >>> 0 > i64toi32_i32$5 >>> 0 | ((i64toi32_i32$1 | 0) == (i64toi32_i32$5 | 0) & i64toi32_i32$4 >>> 0 > i64toi32_i32$0 >>> 0 | 0) | 0;
   i64toi32_i32$3 = $3_1;
   i64toi32_i32$4 = $122$hi;
   i64toi32_i32$5 = i64toi32_i32$3 ? $122 : $0_1;
   i64toi32_i32$0 = i64toi32_i32$3 ? i64toi32_i32$4 : i64toi32_i32$1;
   $0_1 = i64toi32_i32$5;
   $0$hi = i64toi32_i32$0;
   i64toi32_i32$0 = 0;
   $7_1 = i64toi32_i32$3;
   $7$hi = i64toi32_i32$0;
  }
  global$0 = $2_1 + 32 | 0;
  i64toi32_i32$0 = $7$hi;
  i64toi32_i32$3 = $7_1;
  i64toi32_i32$5 = 0;
  i64toi32_i32$1 = 52;
  i64toi32_i32$4 = i64toi32_i32$1 & 31 | 0;
  if (32 >>> 0 <= (i64toi32_i32$1 & 63 | 0) >>> 0) {
   i64toi32_i32$5 = i64toi32_i32$3 << i64toi32_i32$4 | 0;
   $52_1 = 0;
  } else {
   i64toi32_i32$5 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$3 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$0 << i64toi32_i32$4 | 0) | 0;
   $52_1 = i64toi32_i32$3 << i64toi32_i32$4 | 0;
  }
  $133$hi = i64toi32_i32$5;
  i64toi32_i32$5 = $1$hi;
  i64toi32_i32$0 = $1_1;
  i64toi32_i32$3 = -2147483648;
  i64toi32_i32$1 = 0;
  i64toi32_i32$3 = i64toi32_i32$5 & i64toi32_i32$3 | 0;
  $135 = i64toi32_i32$0 & i64toi32_i32$1 | 0;
  $135$hi = i64toi32_i32$3;
  i64toi32_i32$3 = $133$hi;
  i64toi32_i32$5 = $52_1;
  i64toi32_i32$0 = $135$hi;
  i64toi32_i32$1 = $135;
  i64toi32_i32$0 = i64toi32_i32$3 | i64toi32_i32$0 | 0;
  $136$hi = i64toi32_i32$0;
  i64toi32_i32$0 = $0$hi;
  i64toi32_i32$0 = $136$hi;
  i64toi32_i32$3 = i64toi32_i32$5 | i64toi32_i32$1 | 0;
  i64toi32_i32$5 = $0$hi;
  i64toi32_i32$1 = $0_1;
  i64toi32_i32$5 = i64toi32_i32$0 | i64toi32_i32$5 | 0;
  wasm2js_scratch_store_i32(0 | 0, i64toi32_i32$3 | i64toi32_i32$1 | 0 | 0);
  wasm2js_scratch_store_i32(1 | 0, i64toi32_i32$5 | 0);
  return +(+wasm2js_scratch_load_f64());
 }
 
 function $48($0_1) {
  $0_1 = $0_1 | 0;
  global$3 = $0_1;
 }
 
 function $50($0_1) {
  $0_1 = $0_1 | 0;
  var $1_1 = 0, i64toi32_i32$1 = 0, $2_1 = 0, i64toi32_i32$0 = 0, $3_1 = 0;
  block : {
   if ($0_1) {
    break block
   }
   $1_1 = 0;
   block1 : {
    if (!(HEAP32[(0 + 68456 | 0) >> 2] | 0)) {
     break block1
    }
    $1_1 = $50(HEAP32[(0 + 68456 | 0) >> 2] | 0 | 0) | 0;
   }
   block2 : {
    if (!(HEAP32[(0 + 69504 | 0) >> 2] | 0)) {
     break block2
    }
    $1_1 = $50(HEAP32[(0 + 69504 | 0) >> 2] | 0 | 0) | 0 | $1_1 | 0;
   }
   block3 : {
    $0_1 = HEAP32[($10() | 0) >> 2] | 0;
    if (!$0_1) {
     break block3
    }
    label : while (1) {
     block5 : {
      block4 : {
       if ((HEAP32[($0_1 + 76 | 0) >> 2] | 0 | 0) >= (0 | 0)) {
        break block4
       }
       $2_1 = 1;
       break block5;
      }
      $2_1 = !($6($0_1 | 0) | 0);
     }
     block6 : {
      if ((HEAP32[($0_1 + 20 | 0) >> 2] | 0 | 0) == (HEAP32[($0_1 + 28 | 0) >> 2] | 0 | 0)) {
       break block6
      }
      $1_1 = $50($0_1 | 0) | 0 | $1_1 | 0;
     }
     block7 : {
      if ($2_1) {
       break block7
      }
      $7($0_1 | 0);
     }
     $0_1 = HEAP32[($0_1 + 56 | 0) >> 2] | 0;
     if ($0_1) {
      continue label
     }
     break label;
    };
   }
   $11();
   return $1_1 | 0;
  }
  block9 : {
   block8 : {
    if ((HEAP32[($0_1 + 76 | 0) >> 2] | 0 | 0) >= (0 | 0)) {
     break block8
    }
    $2_1 = 1;
    break block9;
   }
   $2_1 = !($6($0_1 | 0) | 0);
  }
  block12 : {
   block11 : {
    block10 : {
     if ((HEAP32[($0_1 + 20 | 0) >> 2] | 0 | 0) == (HEAP32[($0_1 + 28 | 0) >> 2] | 0 | 0)) {
      break block10
     }
     FUNCTION_TABLE[HEAP32[($0_1 + 36 | 0) >> 2] | 0 | 0]($0_1, 0, 0) | 0;
     if (HEAP32[($0_1 + 20 | 0) >> 2] | 0) {
      break block10
     }
     $1_1 = -1;
     if (!$2_1) {
      break block11
     }
     break block12;
    }
    block13 : {
     $1_1 = HEAP32[($0_1 + 4 | 0) >> 2] | 0;
     $3_1 = HEAP32[($0_1 + 8 | 0) >> 2] | 0;
     if (($1_1 | 0) == ($3_1 | 0)) {
      break block13
     }
     i64toi32_i32$1 = $1_1 - $3_1 | 0;
     i64toi32_i32$0 = i64toi32_i32$1 >> 31 | 0;
     i64toi32_i32$0 = FUNCTION_TABLE[HEAP32[($0_1 + 40 | 0) >> 2] | 0 | 0]($0_1, i64toi32_i32$1, i64toi32_i32$0, 1) | 0;
     i64toi32_i32$1 = i64toi32_i32$HIGH_BITS;
    }
    $1_1 = 0;
    HEAP32[($0_1 + 28 | 0) >> 2] = 0;
    i64toi32_i32$0 = $0_1;
    i64toi32_i32$1 = 0;
    HEAP32[($0_1 + 16 | 0) >> 2] = 0;
    HEAP32[($0_1 + 20 | 0) >> 2] = i64toi32_i32$1;
    i64toi32_i32$0 = $0_1;
    i64toi32_i32$1 = 0;
    HEAP32[($0_1 + 4 | 0) >> 2] = 0;
    HEAP32[($0_1 + 8 | 0) >> 2] = i64toi32_i32$1;
    if ($2_1) {
     break block12
    }
   }
   $7($0_1 | 0);
  }
  return $1_1 | 0;
 }
 
 function $51($0_1) {
  $0_1 = $0_1 | 0;
  global$0 = $0_1;
 }
 
 function $52($0_1) {
  $0_1 = $0_1 | 0;
  var $1_1 = 0;
  $1_1 = (global$0 - $0_1 | 0) & -16 | 0;
  global$0 = $1_1;
  return $1_1 | 0;
 }
 
 function $53() {
  return global$0 | 0;
 }
 
 function $54($0_1, $1_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  return (HEAPU16[((($0_1 >>> 0 > 153 >>> 0 ? 0 : $0_1) << 1 | 0) + 68e3 | 0) >> 1] | 0) + 66096 | 0 | 0;
 }
 
 function $55($0_1) {
  $0_1 = $0_1 | 0;
  return $54($0_1 | 0, $0_1 | 0) | 0 | 0;
 }
 
 function $56($0_1, $1_1, $2_1, $2$hi, $3_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  $2_1 = $2_1 | 0;
  $2$hi = $2$hi | 0;
  $3_1 = $3_1 | 0;
  var i64toi32_i32$0 = 0, i64toi32_i32$1 = 0;
  i64toi32_i32$0 = $2$hi;
  i64toi32_i32$0 = FUNCTION_TABLE[$0_1 | 0]($1_1, $2_1, i64toi32_i32$0, $3_1) | 0;
  i64toi32_i32$1 = i64toi32_i32$HIGH_BITS;
  i64toi32_i32$HIGH_BITS = i64toi32_i32$1;
  return i64toi32_i32$0 | 0;
 }
 
 function $57($0_1, $1_1, $2_1, $3_1, $4_1) {
  $0_1 = $0_1 | 0;
  $1_1 = $1_1 | 0;
  $2_1 = $2_1 | 0;
  $3_1 = $3_1 | 0;
  $4_1 = $4_1 | 0;
  var i64toi32_i32$2 = 0, i64toi32_i32$4 = 0, i64toi32_i32$0 = 0, i64toi32_i32$1 = 0, i64toi32_i32$3 = 0, $17_1 = 0, $18_1 = 0, $6_1 = 0, $7_1 = 0, $9_1 = 0, $9$hi = 0, $12$hi = 0, $5_1 = 0, $5$hi = 0;
  $6_1 = $0_1;
  $7_1 = $1_1;
  i64toi32_i32$0 = 0;
  $9_1 = $2_1;
  $9$hi = i64toi32_i32$0;
  i64toi32_i32$0 = 0;
  i64toi32_i32$2 = $3_1;
  i64toi32_i32$1 = 0;
  i64toi32_i32$3 = 32;
  i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
  if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
   i64toi32_i32$1 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
   $17_1 = 0;
  } else {
   i64toi32_i32$1 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$2 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$0 << i64toi32_i32$4 | 0) | 0;
   $17_1 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
  }
  $12$hi = i64toi32_i32$1;
  i64toi32_i32$1 = $9$hi;
  i64toi32_i32$0 = $9_1;
  i64toi32_i32$2 = $12$hi;
  i64toi32_i32$3 = $17_1;
  i64toi32_i32$2 = i64toi32_i32$1 | i64toi32_i32$2 | 0;
  i64toi32_i32$2 = $56($6_1 | 0, $7_1 | 0, i64toi32_i32$0 | i64toi32_i32$3 | 0 | 0, i64toi32_i32$2 | 0, $4_1 | 0) | 0;
  i64toi32_i32$0 = i64toi32_i32$HIGH_BITS;
  $5_1 = i64toi32_i32$2;
  $5$hi = i64toi32_i32$0;
  i64toi32_i32$1 = i64toi32_i32$2;
  i64toi32_i32$2 = 0;
  i64toi32_i32$3 = 32;
  i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
  if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
   i64toi32_i32$2 = 0;
   $18_1 = i64toi32_i32$0 >>> i64toi32_i32$4 | 0;
  } else {
   i64toi32_i32$2 = i64toi32_i32$0 >>> i64toi32_i32$4 | 0;
   $18_1 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$0 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$1 >>> i64toi32_i32$4 | 0) | 0;
  }
  $48($18_1 | 0);
  i64toi32_i32$2 = $5$hi;
  return $5_1 | 0;
 }
 
 function _ZN17compiler_builtins3int3mul3Mul3mul17h070e9a1c69faec5bE(var$0, var$0$hi, var$1, var$1$hi) {
  var$0 = var$0 | 0;
  var$0$hi = var$0$hi | 0;
  var$1 = var$1 | 0;
  var$1$hi = var$1$hi | 0;
  var i64toi32_i32$4 = 0, i64toi32_i32$0 = 0, i64toi32_i32$1 = 0, var$2 = 0, i64toi32_i32$2 = 0, i64toi32_i32$3 = 0, var$3 = 0, var$4 = 0, var$5 = 0, $21_1 = 0, $22_1 = 0, var$6 = 0, $24_1 = 0, $17_1 = 0, $18_1 = 0, $23_1 = 0, $29_1 = 0, $45_1 = 0, $56$hi = 0, $62$hi = 0;
  i64toi32_i32$0 = var$1$hi;
  var$2 = var$1;
  var$4 = var$2 >>> 16 | 0;
  i64toi32_i32$0 = var$0$hi;
  var$3 = var$0;
  var$5 = var$3 >>> 16 | 0;
  $17_1 = Math_imul(var$4, var$5);
  $18_1 = var$2;
  i64toi32_i32$2 = var$3;
  i64toi32_i32$1 = 0;
  i64toi32_i32$3 = 32;
  i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
  if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
   i64toi32_i32$1 = 0;
   $21_1 = i64toi32_i32$0 >>> i64toi32_i32$4 | 0;
  } else {
   i64toi32_i32$1 = i64toi32_i32$0 >>> i64toi32_i32$4 | 0;
   $21_1 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$0 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$2 >>> i64toi32_i32$4 | 0) | 0;
  }
  $23_1 = $17_1 + Math_imul($18_1, $21_1) | 0;
  i64toi32_i32$1 = var$1$hi;
  i64toi32_i32$0 = var$1;
  i64toi32_i32$2 = 0;
  i64toi32_i32$3 = 32;
  i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
  if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
   i64toi32_i32$2 = 0;
   $22_1 = i64toi32_i32$1 >>> i64toi32_i32$4 | 0;
  } else {
   i64toi32_i32$2 = i64toi32_i32$1 >>> i64toi32_i32$4 | 0;
   $22_1 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$1 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$0 >>> i64toi32_i32$4 | 0) | 0;
  }
  $29_1 = $23_1 + Math_imul($22_1, var$3) | 0;
  var$2 = var$2 & 65535 | 0;
  var$3 = var$3 & 65535 | 0;
  var$6 = Math_imul(var$2, var$3);
  var$2 = (var$6 >>> 16 | 0) + Math_imul(var$2, var$5) | 0;
  $45_1 = $29_1 + (var$2 >>> 16 | 0) | 0;
  var$2 = (var$2 & 65535 | 0) + Math_imul(var$4, var$3) | 0;
  i64toi32_i32$2 = 0;
  i64toi32_i32$1 = $45_1 + (var$2 >>> 16 | 0) | 0;
  i64toi32_i32$0 = 0;
  i64toi32_i32$3 = 32;
  i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
  if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
   i64toi32_i32$0 = i64toi32_i32$1 << i64toi32_i32$4 | 0;
   $24_1 = 0;
  } else {
   i64toi32_i32$0 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$1 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$2 << i64toi32_i32$4 | 0) | 0;
   $24_1 = i64toi32_i32$1 << i64toi32_i32$4 | 0;
  }
  $56$hi = i64toi32_i32$0;
  i64toi32_i32$0 = 0;
  $62$hi = i64toi32_i32$0;
  i64toi32_i32$0 = $56$hi;
  i64toi32_i32$2 = $24_1;
  i64toi32_i32$1 = $62$hi;
  i64toi32_i32$3 = var$2 << 16 | 0 | (var$6 & 65535 | 0) | 0;
  i64toi32_i32$1 = i64toi32_i32$0 | i64toi32_i32$1 | 0;
  i64toi32_i32$2 = i64toi32_i32$2 | i64toi32_i32$3 | 0;
  i64toi32_i32$HIGH_BITS = i64toi32_i32$1;
  return i64toi32_i32$2 | 0;
 }
 
 function _ZN17compiler_builtins3int4udiv10divmod_u6417h6026910b5ed08e40E(var$0, var$0$hi, var$1, var$1$hi) {
  var$0 = var$0 | 0;
  var$0$hi = var$0$hi | 0;
  var$1 = var$1 | 0;
  var$1$hi = var$1$hi | 0;
  var i64toi32_i32$2 = 0, i64toi32_i32$3 = 0, i64toi32_i32$4 = 0, i64toi32_i32$1 = 0, i64toi32_i32$0 = 0, i64toi32_i32$5 = 0, var$2 = 0, var$3 = 0, var$4 = 0, var$5 = 0, var$5$hi = 0, var$6 = 0, var$6$hi = 0, i64toi32_i32$6 = 0, $37_1 = 0, $38_1 = 0, $39_1 = 0, $40_1 = 0, $41_1 = 0, $42_1 = 0, $43_1 = 0, $44_1 = 0, var$8$hi = 0, $45_1 = 0, $46_1 = 0, $47_1 = 0, $48_1 = 0, var$7$hi = 0, $49 = 0, $63$hi = 0, $65 = 0, $65$hi = 0, $120$hi = 0, $129$hi = 0, $134$hi = 0, var$8 = 0, $140 = 0, $140$hi = 0, $142$hi = 0, $144 = 0, $144$hi = 0, $151 = 0, $151$hi = 0, $154$hi = 0, var$7 = 0, $165$hi = 0;
  label$1 : {
   label$2 : {
    label$3 : {
     label$4 : {
      label$5 : {
       label$6 : {
        label$7 : {
         label$8 : {
          label$9 : {
           label$10 : {
            label$11 : {
             i64toi32_i32$0 = var$0$hi;
             i64toi32_i32$2 = var$0;
             i64toi32_i32$1 = 0;
             i64toi32_i32$3 = 32;
             i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
             if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
              i64toi32_i32$1 = 0;
              $37_1 = i64toi32_i32$0 >>> i64toi32_i32$4 | 0;
             } else {
              i64toi32_i32$1 = i64toi32_i32$0 >>> i64toi32_i32$4 | 0;
              $37_1 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$0 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$2 >>> i64toi32_i32$4 | 0) | 0;
             }
             var$2 = $37_1;
             if (var$2) {
              i64toi32_i32$1 = var$1$hi;
              var$3 = var$1;
              if (!var$3) {
               break label$11
              }
              i64toi32_i32$0 = var$3;
              i64toi32_i32$2 = 0;
              i64toi32_i32$3 = 32;
              i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
              if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
               i64toi32_i32$2 = 0;
               $38_1 = i64toi32_i32$1 >>> i64toi32_i32$4 | 0;
              } else {
               i64toi32_i32$2 = i64toi32_i32$1 >>> i64toi32_i32$4 | 0;
               $38_1 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$1 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$0 >>> i64toi32_i32$4 | 0) | 0;
              }
              var$4 = $38_1;
              if (!var$4) {
               break label$9
              }
              var$2 = Math_clz32(var$4) - Math_clz32(var$2) | 0;
              if (var$2 >>> 0 <= 31 >>> 0) {
               break label$8
              }
              break label$2;
             }
             i64toi32_i32$2 = var$1$hi;
             i64toi32_i32$1 = var$1;
             i64toi32_i32$0 = 1;
             i64toi32_i32$3 = 0;
             if (i64toi32_i32$2 >>> 0 > i64toi32_i32$0 >>> 0 | ((i64toi32_i32$2 | 0) == (i64toi32_i32$0 | 0) & i64toi32_i32$1 >>> 0 >= i64toi32_i32$3 >>> 0 | 0) | 0) {
              break label$2
             }
             i64toi32_i32$1 = var$0$hi;
             var$2 = var$0;
             i64toi32_i32$1 = i64toi32_i32$2;
             i64toi32_i32$1 = i64toi32_i32$2;
             var$3 = var$1;
             var$2 = (var$2 >>> 0) / (var$3 >>> 0) | 0;
             i64toi32_i32$1 = 0;
             __wasm_intrinsics_temp_i64 = var$0 - Math_imul(var$2, var$3) | 0;
             __wasm_intrinsics_temp_i64$hi = i64toi32_i32$1;
             i64toi32_i32$1 = 0;
             i64toi32_i32$2 = var$2;
             i64toi32_i32$HIGH_BITS = i64toi32_i32$1;
             return i64toi32_i32$2 | 0;
            }
            i64toi32_i32$2 = var$1$hi;
            i64toi32_i32$3 = var$1;
            i64toi32_i32$1 = 0;
            i64toi32_i32$0 = 32;
            i64toi32_i32$4 = i64toi32_i32$0 & 31 | 0;
            if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
             i64toi32_i32$1 = 0;
             $39_1 = i64toi32_i32$2 >>> i64toi32_i32$4 | 0;
            } else {
             i64toi32_i32$1 = i64toi32_i32$2 >>> i64toi32_i32$4 | 0;
             $39_1 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$2 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$3 >>> i64toi32_i32$4 | 0) | 0;
            }
            var$3 = $39_1;
            i64toi32_i32$1 = var$0$hi;
            if (!var$0) {
             break label$7
            }
            if (!var$3) {
             break label$6
            }
            var$4 = var$3 + -1 | 0;
            if (var$4 & var$3 | 0) {
             break label$6
            }
            i64toi32_i32$1 = 0;
            i64toi32_i32$2 = var$4 & var$2 | 0;
            i64toi32_i32$3 = 0;
            i64toi32_i32$0 = 32;
            i64toi32_i32$4 = i64toi32_i32$0 & 31 | 0;
            if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
             i64toi32_i32$3 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
             $40_1 = 0;
            } else {
             i64toi32_i32$3 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$2 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$1 << i64toi32_i32$4 | 0) | 0;
             $40_1 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
            }
            $63$hi = i64toi32_i32$3;
            i64toi32_i32$3 = var$0$hi;
            i64toi32_i32$1 = var$0;
            i64toi32_i32$2 = 0;
            i64toi32_i32$0 = -1;
            i64toi32_i32$2 = i64toi32_i32$3 & i64toi32_i32$2 | 0;
            $65 = i64toi32_i32$1 & i64toi32_i32$0 | 0;
            $65$hi = i64toi32_i32$2;
            i64toi32_i32$2 = $63$hi;
            i64toi32_i32$3 = $40_1;
            i64toi32_i32$1 = $65$hi;
            i64toi32_i32$0 = $65;
            i64toi32_i32$1 = i64toi32_i32$2 | i64toi32_i32$1 | 0;
            __wasm_intrinsics_temp_i64 = i64toi32_i32$3 | i64toi32_i32$0 | 0;
            __wasm_intrinsics_temp_i64$hi = i64toi32_i32$1;
            i64toi32_i32$1 = 0;
            i64toi32_i32$3 = var$2 >>> ((__wasm_ctz_i32(var$3 | 0) | 0) & 31 | 0) | 0;
            i64toi32_i32$HIGH_BITS = i64toi32_i32$1;
            return i64toi32_i32$3 | 0;
           }
          }
          var$4 = var$3 + -1 | 0;
          if (!(var$4 & var$3 | 0)) {
           break label$5
          }
          var$2 = (Math_clz32(var$3) + 33 | 0) - Math_clz32(var$2) | 0;
          var$3 = 0 - var$2 | 0;
          break label$3;
         }
         var$3 = 63 - var$2 | 0;
         var$2 = var$2 + 1 | 0;
         break label$3;
        }
        var$4 = (var$2 >>> 0) / (var$3 >>> 0) | 0;
        i64toi32_i32$3 = 0;
        i64toi32_i32$2 = var$2 - Math_imul(var$4, var$3) | 0;
        i64toi32_i32$1 = 0;
        i64toi32_i32$0 = 32;
        i64toi32_i32$4 = i64toi32_i32$0 & 31 | 0;
        if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
         i64toi32_i32$1 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
         $41_1 = 0;
        } else {
         i64toi32_i32$1 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$2 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$3 << i64toi32_i32$4 | 0) | 0;
         $41_1 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
        }
        __wasm_intrinsics_temp_i64 = $41_1;
        __wasm_intrinsics_temp_i64$hi = i64toi32_i32$1;
        i64toi32_i32$1 = 0;
        i64toi32_i32$2 = var$4;
        i64toi32_i32$HIGH_BITS = i64toi32_i32$1;
        return i64toi32_i32$2 | 0;
       }
       var$2 = Math_clz32(var$3) - Math_clz32(var$2) | 0;
       if (var$2 >>> 0 < 31 >>> 0) {
        break label$4
       }
       break label$2;
      }
      i64toi32_i32$2 = var$0$hi;
      i64toi32_i32$2 = 0;
      __wasm_intrinsics_temp_i64 = var$4 & var$0 | 0;
      __wasm_intrinsics_temp_i64$hi = i64toi32_i32$2;
      if ((var$3 | 0) == (1 | 0)) {
       break label$1
      }
      i64toi32_i32$2 = var$0$hi;
      i64toi32_i32$2 = 0;
      $120$hi = i64toi32_i32$2;
      i64toi32_i32$2 = var$0$hi;
      i64toi32_i32$3 = var$0;
      i64toi32_i32$1 = $120$hi;
      i64toi32_i32$0 = __wasm_ctz_i32(var$3 | 0) | 0;
      i64toi32_i32$4 = i64toi32_i32$0 & 31 | 0;
      if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
       i64toi32_i32$1 = 0;
       $42_1 = i64toi32_i32$2 >>> i64toi32_i32$4 | 0;
      } else {
       i64toi32_i32$1 = i64toi32_i32$2 >>> i64toi32_i32$4 | 0;
       $42_1 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$2 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$3 >>> i64toi32_i32$4 | 0) | 0;
      }
      i64toi32_i32$3 = $42_1;
      i64toi32_i32$HIGH_BITS = i64toi32_i32$1;
      return i64toi32_i32$3 | 0;
     }
     var$3 = 63 - var$2 | 0;
     var$2 = var$2 + 1 | 0;
    }
    i64toi32_i32$3 = var$0$hi;
    i64toi32_i32$3 = 0;
    $129$hi = i64toi32_i32$3;
    i64toi32_i32$3 = var$0$hi;
    i64toi32_i32$2 = var$0;
    i64toi32_i32$1 = $129$hi;
    i64toi32_i32$0 = var$2 & 63 | 0;
    i64toi32_i32$4 = i64toi32_i32$0 & 31 | 0;
    if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
     i64toi32_i32$1 = 0;
     $43_1 = i64toi32_i32$3 >>> i64toi32_i32$4 | 0;
    } else {
     i64toi32_i32$1 = i64toi32_i32$3 >>> i64toi32_i32$4 | 0;
     $43_1 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$3 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$2 >>> i64toi32_i32$4 | 0) | 0;
    }
    var$5 = $43_1;
    var$5$hi = i64toi32_i32$1;
    i64toi32_i32$1 = var$0$hi;
    i64toi32_i32$1 = 0;
    $134$hi = i64toi32_i32$1;
    i64toi32_i32$1 = var$0$hi;
    i64toi32_i32$3 = var$0;
    i64toi32_i32$2 = $134$hi;
    i64toi32_i32$0 = var$3 & 63 | 0;
    i64toi32_i32$4 = i64toi32_i32$0 & 31 | 0;
    if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
     i64toi32_i32$2 = i64toi32_i32$3 << i64toi32_i32$4 | 0;
     $44_1 = 0;
    } else {
     i64toi32_i32$2 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$3 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$1 << i64toi32_i32$4 | 0) | 0;
     $44_1 = i64toi32_i32$3 << i64toi32_i32$4 | 0;
    }
    var$0 = $44_1;
    var$0$hi = i64toi32_i32$2;
    label$13 : {
     if (var$2) {
      i64toi32_i32$2 = var$1$hi;
      i64toi32_i32$1 = var$1;
      i64toi32_i32$3 = -1;
      i64toi32_i32$0 = -1;
      i64toi32_i32$4 = i64toi32_i32$1 + i64toi32_i32$0 | 0;
      i64toi32_i32$5 = i64toi32_i32$2 + i64toi32_i32$3 | 0;
      if (i64toi32_i32$4 >>> 0 < i64toi32_i32$0 >>> 0) {
       i64toi32_i32$5 = i64toi32_i32$5 + 1 | 0
      }
      var$8 = i64toi32_i32$4;
      var$8$hi = i64toi32_i32$5;
      label$15 : while (1) {
       i64toi32_i32$5 = var$5$hi;
       i64toi32_i32$2 = var$5;
       i64toi32_i32$1 = 0;
       i64toi32_i32$0 = 1;
       i64toi32_i32$3 = i64toi32_i32$0 & 31 | 0;
       if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
        i64toi32_i32$1 = i64toi32_i32$2 << i64toi32_i32$3 | 0;
        $45_1 = 0;
       } else {
        i64toi32_i32$1 = ((1 << i64toi32_i32$3 | 0) - 1 | 0) & (i64toi32_i32$2 >>> (32 - i64toi32_i32$3 | 0) | 0) | 0 | (i64toi32_i32$5 << i64toi32_i32$3 | 0) | 0;
        $45_1 = i64toi32_i32$2 << i64toi32_i32$3 | 0;
       }
       $140 = $45_1;
       $140$hi = i64toi32_i32$1;
       i64toi32_i32$1 = var$0$hi;
       i64toi32_i32$5 = var$0;
       i64toi32_i32$2 = 0;
       i64toi32_i32$0 = 63;
       i64toi32_i32$3 = i64toi32_i32$0 & 31 | 0;
       if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
        i64toi32_i32$2 = 0;
        $46_1 = i64toi32_i32$1 >>> i64toi32_i32$3 | 0;
       } else {
        i64toi32_i32$2 = i64toi32_i32$1 >>> i64toi32_i32$3 | 0;
        $46_1 = (((1 << i64toi32_i32$3 | 0) - 1 | 0) & i64toi32_i32$1 | 0) << (32 - i64toi32_i32$3 | 0) | 0 | (i64toi32_i32$5 >>> i64toi32_i32$3 | 0) | 0;
       }
       $142$hi = i64toi32_i32$2;
       i64toi32_i32$2 = $140$hi;
       i64toi32_i32$1 = $140;
       i64toi32_i32$5 = $142$hi;
       i64toi32_i32$0 = $46_1;
       i64toi32_i32$5 = i64toi32_i32$2 | i64toi32_i32$5 | 0;
       var$5 = i64toi32_i32$1 | i64toi32_i32$0 | 0;
       var$5$hi = i64toi32_i32$5;
       $144 = var$5;
       $144$hi = i64toi32_i32$5;
       i64toi32_i32$5 = var$8$hi;
       i64toi32_i32$5 = var$5$hi;
       i64toi32_i32$5 = var$8$hi;
       i64toi32_i32$2 = var$8;
       i64toi32_i32$1 = var$5$hi;
       i64toi32_i32$0 = var$5;
       i64toi32_i32$3 = i64toi32_i32$2 - i64toi32_i32$0 | 0;
       i64toi32_i32$6 = i64toi32_i32$2 >>> 0 < i64toi32_i32$0 >>> 0;
       i64toi32_i32$4 = i64toi32_i32$6 + i64toi32_i32$1 | 0;
       i64toi32_i32$4 = i64toi32_i32$5 - i64toi32_i32$4 | 0;
       i64toi32_i32$5 = i64toi32_i32$3;
       i64toi32_i32$2 = 0;
       i64toi32_i32$0 = 63;
       i64toi32_i32$1 = i64toi32_i32$0 & 31 | 0;
       if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
        i64toi32_i32$2 = i64toi32_i32$4 >> 31 | 0;
        $47_1 = i64toi32_i32$4 >> i64toi32_i32$1 | 0;
       } else {
        i64toi32_i32$2 = i64toi32_i32$4 >> i64toi32_i32$1 | 0;
        $47_1 = (((1 << i64toi32_i32$1 | 0) - 1 | 0) & i64toi32_i32$4 | 0) << (32 - i64toi32_i32$1 | 0) | 0 | (i64toi32_i32$5 >>> i64toi32_i32$1 | 0) | 0;
       }
       var$6 = $47_1;
       var$6$hi = i64toi32_i32$2;
       i64toi32_i32$2 = var$1$hi;
       i64toi32_i32$2 = var$6$hi;
       i64toi32_i32$4 = var$6;
       i64toi32_i32$5 = var$1$hi;
       i64toi32_i32$0 = var$1;
       i64toi32_i32$5 = i64toi32_i32$2 & i64toi32_i32$5 | 0;
       $151 = i64toi32_i32$4 & i64toi32_i32$0 | 0;
       $151$hi = i64toi32_i32$5;
       i64toi32_i32$5 = $144$hi;
       i64toi32_i32$2 = $144;
       i64toi32_i32$4 = $151$hi;
       i64toi32_i32$0 = $151;
       i64toi32_i32$1 = i64toi32_i32$2 - i64toi32_i32$0 | 0;
       i64toi32_i32$6 = i64toi32_i32$2 >>> 0 < i64toi32_i32$0 >>> 0;
       i64toi32_i32$3 = i64toi32_i32$6 + i64toi32_i32$4 | 0;
       i64toi32_i32$3 = i64toi32_i32$5 - i64toi32_i32$3 | 0;
       var$5 = i64toi32_i32$1;
       var$5$hi = i64toi32_i32$3;
       i64toi32_i32$3 = var$0$hi;
       i64toi32_i32$5 = var$0;
       i64toi32_i32$2 = 0;
       i64toi32_i32$0 = 1;
       i64toi32_i32$4 = i64toi32_i32$0 & 31 | 0;
       if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
        i64toi32_i32$2 = i64toi32_i32$5 << i64toi32_i32$4 | 0;
        $48_1 = 0;
       } else {
        i64toi32_i32$2 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$5 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$3 << i64toi32_i32$4 | 0) | 0;
        $48_1 = i64toi32_i32$5 << i64toi32_i32$4 | 0;
       }
       $154$hi = i64toi32_i32$2;
       i64toi32_i32$2 = var$7$hi;
       i64toi32_i32$2 = $154$hi;
       i64toi32_i32$3 = $48_1;
       i64toi32_i32$5 = var$7$hi;
       i64toi32_i32$0 = var$7;
       i64toi32_i32$5 = i64toi32_i32$2 | i64toi32_i32$5 | 0;
       var$0 = i64toi32_i32$3 | i64toi32_i32$0 | 0;
       var$0$hi = i64toi32_i32$5;
       i64toi32_i32$5 = var$6$hi;
       i64toi32_i32$2 = var$6;
       i64toi32_i32$3 = 0;
       i64toi32_i32$0 = 1;
       i64toi32_i32$3 = i64toi32_i32$5 & i64toi32_i32$3 | 0;
       var$6 = i64toi32_i32$2 & i64toi32_i32$0 | 0;
       var$6$hi = i64toi32_i32$3;
       var$7 = var$6;
       var$7$hi = i64toi32_i32$3;
       var$2 = var$2 + -1 | 0;
       if (var$2) {
        continue label$15
       }
       break label$15;
      };
      break label$13;
     }
    }
    i64toi32_i32$3 = var$5$hi;
    __wasm_intrinsics_temp_i64 = var$5;
    __wasm_intrinsics_temp_i64$hi = i64toi32_i32$3;
    i64toi32_i32$3 = var$0$hi;
    i64toi32_i32$5 = var$0;
    i64toi32_i32$2 = 0;
    i64toi32_i32$0 = 1;
    i64toi32_i32$4 = i64toi32_i32$0 & 31 | 0;
    if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
     i64toi32_i32$2 = i64toi32_i32$5 << i64toi32_i32$4 | 0;
     $49 = 0;
    } else {
     i64toi32_i32$2 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$5 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$3 << i64toi32_i32$4 | 0) | 0;
     $49 = i64toi32_i32$5 << i64toi32_i32$4 | 0;
    }
    $165$hi = i64toi32_i32$2;
    i64toi32_i32$2 = var$6$hi;
    i64toi32_i32$2 = $165$hi;
    i64toi32_i32$3 = $49;
    i64toi32_i32$5 = var$6$hi;
    i64toi32_i32$0 = var$6;
    i64toi32_i32$5 = i64toi32_i32$2 | i64toi32_i32$5 | 0;
    i64toi32_i32$3 = i64toi32_i32$3 | i64toi32_i32$0 | 0;
    i64toi32_i32$HIGH_BITS = i64toi32_i32$5;
    return i64toi32_i32$3 | 0;
   }
   i64toi32_i32$3 = var$0$hi;
   __wasm_intrinsics_temp_i64 = var$0;
   __wasm_intrinsics_temp_i64$hi = i64toi32_i32$3;
   i64toi32_i32$3 = 0;
   var$0 = 0;
   var$0$hi = i64toi32_i32$3;
  }
  i64toi32_i32$3 = var$0$hi;
  i64toi32_i32$5 = var$0;
  i64toi32_i32$HIGH_BITS = i64toi32_i32$3;
  return i64toi32_i32$5 | 0;
 }
 
 function __wasm_i64_mul(var$0, var$0$hi, var$1, var$1$hi) {
  var$0 = var$0 | 0;
  var$0$hi = var$0$hi | 0;
  var$1 = var$1 | 0;
  var$1$hi = var$1$hi | 0;
  var i64toi32_i32$0 = 0, i64toi32_i32$1 = 0;
  i64toi32_i32$0 = var$0$hi;
  i64toi32_i32$0 = var$1$hi;
  i64toi32_i32$0 = var$0$hi;
  i64toi32_i32$1 = var$1$hi;
  i64toi32_i32$1 = _ZN17compiler_builtins3int3mul3Mul3mul17h070e9a1c69faec5bE(var$0 | 0, i64toi32_i32$0 | 0, var$1 | 0, i64toi32_i32$1 | 0) | 0;
  i64toi32_i32$0 = i64toi32_i32$HIGH_BITS;
  i64toi32_i32$HIGH_BITS = i64toi32_i32$0;
  return i64toi32_i32$1 | 0;
 }
 
 function __wasm_i64_udiv(var$0, var$0$hi, var$1, var$1$hi) {
  var$0 = var$0 | 0;
  var$0$hi = var$0$hi | 0;
  var$1 = var$1 | 0;
  var$1$hi = var$1$hi | 0;
  var i64toi32_i32$0 = 0, i64toi32_i32$1 = 0;
  i64toi32_i32$0 = var$0$hi;
  i64toi32_i32$0 = var$1$hi;
  i64toi32_i32$0 = var$0$hi;
  i64toi32_i32$1 = var$1$hi;
  i64toi32_i32$1 = _ZN17compiler_builtins3int4udiv10divmod_u6417h6026910b5ed08e40E(var$0 | 0, i64toi32_i32$0 | 0, var$1 | 0, i64toi32_i32$1 | 0) | 0;
  i64toi32_i32$0 = i64toi32_i32$HIGH_BITS;
  i64toi32_i32$HIGH_BITS = i64toi32_i32$0;
  return i64toi32_i32$1 | 0;
 }
 
 function __wasm_ctz_i32(var$0) {
  var$0 = var$0 | 0;
  if (var$0) {
   return 31 - Math_clz32((var$0 + -1 | 0) ^ var$0 | 0) | 0 | 0
  }
  return 32 | 0;
 }
 
 // EMSCRIPTEN_END_FUNCS
;
 bufferView = HEAPU8;
 initActiveSegments(imports);
 var FUNCTION_TABLE = Table([null, $4, $3, $5, $31, $32]);
 function __wasm_memory_size() {
  return buffer.byteLength / 65536 | 0;
 }
 
 return {
  "memory": Object.create(Object.prototype, {
   "grow": {
    
   }, 
   "buffer": {
    "get": function () {
     return buffer;
    }
    
   }
  }), 
  "__wasm_call_ctors": $0, 
  "__main_argc_argv": $1, 
  "fflush": $50, 
  "__indirect_function_table": FUNCTION_TABLE, 
  "strerror": $55, 
  "emscripten_stack_get_end": $44, 
  "emscripten_stack_get_base": $43, 
  "emscripten_stack_init": $41, 
  "emscripten_stack_get_free": $42, 
  "_emscripten_stack_restore": $51, 
  "_emscripten_stack_alloc": $52, 
  "emscripten_stack_get_current": $53, 
  "dynCall_jiji": $57
 };
}

  return asmFunc(info);
}

)(info);
  },

  instantiate: /** @suppress{checkTypes} */ function(binary, info) {
    return {
      then: function(ok) {
        var module = new WebAssembly.Module(binary);
        ok({
          'instance': new WebAssembly.Instance(module, info)
        });
        // Emulate a simple WebAssembly.instantiate(..).then(()=>{}).catch(()=>{}) syntax.
        return { catch: function() {} };
      }
    };
  },

  RuntimeError: Error,

  isWasm2js: true,
};
