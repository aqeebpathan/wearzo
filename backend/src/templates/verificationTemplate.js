export function verificationEmailTemplate(name, code) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Email Verification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          padding: 0;
          margin: 0;
        }
        .container {
          max-width: 480px;
          margin: 40px auto;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          padding: 32px;
        }
        h1 {
          font-size: 20px;
          color: #333333;
          margin-bottom: 16px;
        }
        p {
          color: #555555;
          font-size: 14px;
          margin-bottom: 24px;
        }
        .code {
          display: inline-block;
          background: #111111;
          color: #ffffff;
          font-size: 24px;
          font-weight: bold;
          letter-spacing: 4px;
          padding: 12px 24px;
          margin: 16px 0;
        }
        .footer {
          margin-top: 24px;
          font-size: 12px;
          color: #888888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Verify Your Email</h1>
        <p>Hi <b>${name}</b>,</p>
        <p>Welcome to <b>WEARZO</b> 👗🛒<br />Use the code below to verify your email address.</p>
        <div class="code">${code}</div>
        <p>This code will expire in 10 minutes.<br/>If you didn’t create an account, please ignore this email.</p>
        <div class="footer">
          &copy; ${new Date().getFullYear()} WEARZO. All rights reserved.
        </div>
      </div>
    </body>
  </html>
  `;
}
