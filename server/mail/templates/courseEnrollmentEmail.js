exports.courseEnrollmentEmail = (courseName, name) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Course Registration Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #FFD60A;
                color: #000000;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="https://study-notion-kohl-pi.vercel.app/"><img class="logo" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fhotmart.com%2Fen%2Fmarketplace%2Fproducts%2Fnotion-study-organization-en-us%2FR81716932J&psig=AOvVaw3KzEuyAChtsKaoVOlNxgE4&ust=1741713735989000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKiUw7yDgIwDFQAAAAAdAAAAABAE"
                    alt="StudyNotion Logo"></a>
            <div class="message">Course Registration Confirmation</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>You have successfully registered for the course <span class="highlight">"${courseName}"</span>. We
                    are excited to have you as a participant!</p>
                <p>Please log in to your learning dashboard to access the course materials and start your learning journey.
                </p>
                <a class="cta" href="https://study-notion-kohl-pi.vercel.app/dashboard">Go to Dashboard</a>
            </div>
            <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                    href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!</div>
        </div>
    </body>
    
    </html>`;
};

exports.paymentSuccessMail = (name, amount, orderId, paymentId) => {
    return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Payment Confirmation</title>
        <style>
          body {
            background-color: #ffffff;
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.4;
            color: #333333;
            margin: 0;
            padding: 0;
          }
    
    
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
          }
  
          .logo {
            max-width: 200px;
            margin-bottom: 20px;
          }
  
          .message {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
          }
  
          .body {
            font-size: 16px;
            margin-bottom: 20px;
          }
  
          .cta {
            display: inline-block;
            padding: 10px 20px;
            background-color: #FFD60A;
            color: #000000;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
          }
  
          .support {
            font-size: 14px;
            color: #999999;
            margin-top: 20px;
          }
  
          .highlight {
            font-weight: bold;
          }
        </style>
    
      </head>
    
      <body>
        <div class="container">
          <a href="https://studynotion-edtech-project.vercel.app"><img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png"
            alt="StudyNotion Logo"></a>
          <div class="message">Course Payment Confirmation</div>
          <div class="body">
            <p>Dear ${name},</p>
            <p>We have received a payment of <span class='highlight'>₹${amount}</span></p>.
            <p>Your Payment ID is <b>${paymentId}</b></p>
            <p>Your Order ID is <b>${orderId}</b></p>
          </div>
          <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
            href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!</div>
        </div>
      </body>
    </html>`
  };