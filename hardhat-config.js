const DOCUMENT_INFO = {
  title: 'This is a test PDF file',
  author: 'cdaily',
  creator: 'Microsoft Word 8.0',
  producer:
    'macOS Version 13.3 (Build 22E252) Quartz PDFContext, AppendMode 1.1',
  creationDate: "D:20000628232108Z00'00'",
  docLength: 1128,
}

const INVALID_DOCUMENT_INFO = {
  title: 'duplicate.pdf',
  author: 'Jovan Mwesigwa',
  creator: 'Canva',
  producer: 'Canva',
  creationDate: "D:20230511063025+00'00'",
  modDate: "D:20230511063025+00'00'",
  docLength: 1080,
}

module.exports = {
  DOCUMENT_INFO,
  INVALID_DOCUMENT_INFO,
}
