import { checkPrimeSync } from 'node:crypto';
import http from 'node:http';
import url, { URLSearchParams } from 'node:url';

const server = http.createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }
  const parsedUrl = url.parse(req.url);

  if (parsedUrl.pathname !== '/api/classify-number') {
    res.statusCode = 404;
    return res.end(JSON.stringify({ error: true, message: 'Not Found' }));
  }

  const params = new URLSearchParams(parsedUrl.search);
  const numberFromQuery = params.get('number') ?? '';
  const parsedNumber = parseFloat(Number(numberFromQuery));
  const isValidNumber = Number.isInteger(parsedNumber);

  if (!isValidNumber) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: true, number: numberFromQuery }));
  }

  const result = await fetch(`http://numbersapi.com/${parsedNumber}/math`);

  const data = await result.text();

  res.statusCode = 200;
  return res.end(
    JSON.stringify({
      number: parsedNumber,
      is_prime: parsedNumber > 1 ? isPrimeNumber(parsedNumber) : false,
      is_perfect: isPerfectNumber(parsedNumber),
      properties: [
        checkIfArmstrongNumber(parsedNumber),
        checkIfEvenNumber(parsedNumber),
      ].filter(Boolean),
      digit_sum: calculateSumOfDigit(parsedNumber),
      fun_fact: data,
    })
  );
});

const PORT = process.env.PORT || 4300;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// HELPERS

const calculateSumOfDigit = (digit) =>
  Math.abs(digit)
    .toString()
    .split('')
    .reduce((acc, curr) => acc + Number(curr), 0);

const checkIfArmstrongNumber = (number) => {
  const numberToString = number.toString();
  const numberOfDigits = numberToString.length;
  return numberToString
    .split('')
    .reduce((acc, curr) => acc + Math.pow(curr, numberOfDigits), 0) === number
    ? 'armstrong'
    : null;
};

const checkIfEvenNumber = (number) => (number % 2 === 0 ? 'even' : 'odd');

const isPerfectNumber = (number) => {
  if (number < 2) return false;

  let sum = 1;
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      sum += i;
      if (i !== number / i) {
        sum += number / i;
      }
    }
  }

  return sum === number;
};

const isPrimeNumber = (number) => checkPrimeSync(BigInt(number));
