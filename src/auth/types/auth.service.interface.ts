export interface TokenItf {
  access_token: string;
  refresh_token: string;
  expires_in: string;
}

export const TokenItfExample: TokenItf = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbGljZUBleGFtcGxlLmNvbSIsInVzZXJSb2xlIjoiVVNFUiIsImlhdCI6MTc1Mzg5MDc0MCwiZXhwIjoxNzU2NDgyNzQwfQ.Njmf1JnQQjtJqD6IsgwYR9jmwrbXveGQbUmIL8y28zM',
  refresh_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJjaGFybGllQGV4YW1wbGUuY29tIiwidXNlclJvbGUiOiJBRE1JTiIsImlhdCI6MTc1Mzg5MDg5NCwiZXhwIjoxNzU2NDgyODk0fQ.LI37x1ZVVc9Ts3R0LS7SWuA7Dy3peZGjlA2ZbUE8Er0',
  expires_in: '900',
};
