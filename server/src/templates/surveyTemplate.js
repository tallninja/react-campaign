module.exports = (survey) => {
  return `
  
    <html>
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" integrity="sha512-8bHTC73gkZ7rZ7vpqUQThUDhqcNFyYi2xgDgPDHc+GXVGHXq+xPjynxIopALmOPqzo9JZj0k6OqqewdGO3EsrQ==" crossorigin="anonymous" />
        </head>
        <body>
            <div class="ui container">
                <h3>I'd like your input !</h3>
                <p>Please answer the following question...</p>
                <div class="ui segment">
                    <p>${survey.body}</p>
                    <div class="ui segment">

                        <a href="http://localhost:3000/api/surveys/${survey.id}/yes" class="ui left floated green button">
                            Yes
                        </a>
                        <br/>
                        <a href="http://localhost:3000/api/surveys/${survey.id}/no" class="ui right floated red button">
                            No
                        </a>
            
                    </div>
                </div>
            </div>
        </body>
    </html>

  `;
};
