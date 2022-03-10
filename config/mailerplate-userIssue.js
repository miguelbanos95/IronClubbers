module.exports.generateEmail = (userMessage, name) => {
    return `
    <!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <title>
        </title>
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
         p {
          font-size: large;
         }
        </style>
      </head>
      <body style="word-spacing:normal;background-color:#ffff;">
        <h1>${name}</h1>
        <hr>
        <p>${userMessage}</p>
      </body>
    </html>
    `
  }