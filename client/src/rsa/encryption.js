const power = (x, n, mod) => {
  if(n == 0)
    return 1;
  if(n % 2 == 0)
    return power((x*x) % mod, n / 2, mod) % mod;
  else
    return x * power(x, n - 1, mod) % mod;
}

const encryptChar = (char, key) => {
  const [e, n] = key;    
  const encryptedChar = power(char, e, n);  
  return encryptedChar;
}

export const encryptText = (text, key) => {
  // encrypt each character
  const characters = text.split('');

  const encryptedText = [];

  // loop through each character and encrypt
  for (let char of characters)
    encryptedText.push(encryptChar(char.charCodeAt(0), key));

  console.log(encryptedText)

  let final = "";

  encryptedText.forEach(element => {
    final += String.fromCharCode(element);
  });

  console.log(final);

  return final;
}