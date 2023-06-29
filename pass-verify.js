const bcrypt = require('bcrypt');

async function verifyPassword(){
  const myPass = 'admin 123 ** 45';
  const hash = '$2b$10$n0/MgPh0o9eFaZ5EeNWUi.SnJyaqg0f3ZuCJUOP9i2rwCR.d8LLCa';
  const isMatch = await bcrypt.compare(myPass,hash);
  console.log(isMatch);
}
verifyPassword()
