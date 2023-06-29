const bcrypt = require('bcrypt');

async function hashPassword(){
  const myPass = 'admin 123 ** 45';
  const hash = await bcrypt.hash(myPass,10);
  console.log(hash);
}

hashPassword()
;
