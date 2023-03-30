export const registerTemplate = (data) => {
    return `<!DOCTYPE html>
    <html>
      <head>
        <title>Registration Confirmation</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
    
      <body style="background-color: #f2f2f2; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #fff; padding: 20px; border-radius: 5px;">
            <h2 style="font-size: 24px; color: #333;">Thank you for registering!</h2>
            <p style="font-size: 16px; color: #333;">Dear ${data.name},</p>
            <p style="font-size: 16px; color: #333;">Thank you for registering on our website. To complete your registration, please click on the link below to confirm your email address:</p>
            <p style="font-size: 16px; color: #333;"><a href="${data.link}" style="background-color: #008CBA; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirm Email Address</a></p>
            <p style="font-size: 16px; color: #333;">If you did not register on our website, please disregard this email.</p>
            <p style="font-size: 16px; color: #333;">Thank you!</p>
          </div>
        </div>
      </body>
    </html>`;
};