

# Media-Api

Media-Api is a web-service for multimedia content management. This service web allows to get, add, update and delate users, multimedia content and multimedia content lists.
In addition the routes are securized through json-web-token and the data is stored in a database MongoDB. 

## Installation

Use the package manager [npm](https://nodejs.org/es/) to install media-api.

```bash
npm install 

npm install -g typescript

tsc
```

## Usage

For the use of the api consult the following [user manual](https://documenter.getpostman.com/view/15812128/UyxgKU6c).

## Environment variables

```bash
PORT=

# Json web token
PRIVATEKEY=

# MongoDB connection
MONGODB_CC=

# Google Sign in
GOOGLE_CLIENT_ID=
GOOGLE_SECRET_ID=

# Upload file
CLOUDINARY_URL=
CLOUD_NAME=
API_KEY_CLOUDINARY=
API_SECRET_CLOUDINARY=
```

## Links of interest

- https://developers.google.com/identity/gsi/web/guides/overview

- https://cloudinary.com/documentation/node_integration#overview

