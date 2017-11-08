const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () =>{
    it('should generate correct message object', ()=> {
        var res = generateMessage('from t', 'text t');
       expect(res.createdAt).toBeA('number');
      expect(res).toInclude({
        from:'from t',
        text: 'text t'
      });
    });
});

describe('generateLocationMessage', () =>{
  it('should generate correct message object', ()=> {
      var res = generateLocationMessage('from t', 20, 45.45);
     expect(res.createdAt).toBeA('number');
    expect(res).toInclude({
      from:'from t',
      url: 'https://www.google.com/maps?q=20,45.45'
    });
  });
});
