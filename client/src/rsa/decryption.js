const power = (x, n, mod) => {
  if(n == 0)
    return 1;
  if(n % 2 == 0)
    return power((x*x) % mod, n / 2, mod) % mod;
  else
    return x * power(x, n - 1, mod) % mod;
}

const decryptChar = (char, key) => {
  const [d, n] = key;    
  const decryptedChar = power(char, d, n);  
  return decryptedChar;
}

export const decryptText = (text, key) => {
  // decrypt each character
  console.log(text);
  console.log(typeof(text));
  const characters = text.split('');

  const decryptedText = [];

  // loop through each character and decrypt
  for (let char of characters)
    decryptedText.push(decryptChar(char.charCodeAt(0), key));

  console.log(decryptedText)

  let final = "";

  decryptedText.forEach(element => {
    final += String.fromCharCode(element);
  });

  console.log(final);

  return final;
}