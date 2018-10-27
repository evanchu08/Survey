require('dotenv').config();

module.exports = survey => {
    return `
	    <html>
		    <body>
			    <div style="text-align: center;">
                    <h3>I'd like your input!</h3>
                    <p>Please answer the following question!</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${process.env.redirectDomain}/api/surveys/${survey.id}">Yes</a>
                    </div>
                    <div>
                        <a href="${process.env.redirectDomain}/api/surveys/${survey.id}">No</a>
                    </div>
                </div>
            </body>
        </html>
    `
}