'use strict';

import DataType from './data-type';
import BinaryConverter from './binary-converter';

const debug = require('debug')('ibmi:types:bin8');
let error = require('debug')('ibmi:types:bin8:error');
error.color = 1;

export default class Bin4 {

  constructor() {
    this.type = DataType.BIN8;
    debug('Created bin8 type');
  }

  toBuffer(value, opts) {
    debug('Attempt to convert %d to buffer', value);

    opts = opts || { };

    let serverValue;
    let offset = 0;

    if (!opts.serverValue) {
      serverValue = new Buffer(8);
      serverValue.fill(0);
    } else {
      serverValue = opts.serverValue;
    }

    if (opts.offset) {
      offset = opts.offset;
    }

    let b = BinaryConverter.longToBuffer(value);
    b.copy(serverValue, offset, 0, b.length);

    return serverValue;
  }

  get length() {
    return 8;
  }

}
