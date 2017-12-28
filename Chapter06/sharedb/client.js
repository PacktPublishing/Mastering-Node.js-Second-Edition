const sharedb = require('sharedb/lib/client');
const richText = require('rich-text');
const Quill = require('quill');

sharedb.types.register(richText.type);

const socket = new WebSocket('ws://' + window.location.host);
const connection = new sharedb.Connection(socket);

window.disconnect = () => connection.close();
window.connect = () => connection.bindToSocket(new WebSocket('ws://' + window.location.host));

// 0: Name of collection
// 1: ID of document
let doc = connection.get('examples', 'richtext');

doc.subscribe(err => {
  if(err) {
    throw err;
  }
  let quill = new Quill('#editor', {
    theme: 'snow'
  });
  quill.setContents(doc.data);
  quill.on('text-change', (delta, oldDelta, source) => {
    if (source !== 'user') {
      return;
    }
    doc.submitOp(delta, {
      source: quill
    });
  });
  doc.on('op', (op, source) => {
    if (source === quill) {
      return;
    }
    quill.updateContents(op);
  });
});
