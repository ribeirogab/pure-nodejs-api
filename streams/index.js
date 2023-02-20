import { Readable, Transform, Writable } from 'node:stream';

class OneToHundredStream extends Readable {
  constructor() {
    super();
    this.index = 0;
  }

  _read() {
    this.index += 1;

    setTimeout(() => {
      if (this.index > 100) {
        this.push(null);
      } else {
        // Streams do not receive primitive types, only buffers
        const chunk = Buffer.from(String(this.index));

        this.push(chunk);
      }
    }, 1000);
  }
}

class MultiplyByTenStream extends Writable {
  _write(
    chunk, // Piece of read stream (buffer)
    _encoding, // How the information is encoded
    callback, // Function called when the write stream completes
  ) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

class InverseNumberStream extends Transform {
  _transform(
    chunk, // Piece of read stream (buffer)
    _encoding, // How the information is encoded
    callback, // Function called when the write stream completes
  ) {
    const transformed = Buffer.from(String(-Number(chunk.toString())));

    callback(
      null, // Error
      transformed, // Data transformed
    );
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
