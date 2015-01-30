# email-builder

Creates HTML emails. Inlines images and css. Can send testmails.

## Usage

Clone this repo

    git clone https://github.com/rnarian/email-builder.git
    cd email-builder

Install dependencies

    npm install

Run

    grunt build 				// to build mail
    grunt test  				// to send a testmail (adjust config.yml)
    grunt test:litmus		                // to test your mail with litmus (adjust config.yml)
    grunt      					// starts connect server for easy developing
