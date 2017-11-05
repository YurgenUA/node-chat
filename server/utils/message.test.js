const expect = require('expect');

const {generateMessage} = require('./message');

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