# hngxii-stage1-number-classification

HNG Stage 1 Backend- Number Classification API

## Getting Started

To get started with the repository, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/tundealabi/hngxii-stage1-number-classification.git
```

2. Change into the project directory:

```bash
cd hngxii-stage1-number-classification
```

3. Start the Node JS server ensuring you have a Node version of 16 and above:

```bash
npm start | yarn start
```

## 📜 Endpoint

## `/api/classify-number?number=371` - Query with a valid integer

This endpoint returns basic information in a structured format as a JSON response.

- URL: http://localhost:4300/api/classify-number?number=371
- Method: GET
- Status Code: 200 (OK)
- Response:

```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

```json
{
  "error": true,
  "number": "<number query value>"
}
```
