# iOS App Metadata Finder
This is a Node.js script that obtains iOS app metadata from the App Store using [an API maintained by Apple for VPP customers](https://developer.apple.com/documentation/devicemanagement/app_and_book_management/service_configuration/getting_app_and_book_information).

## Guide
### Prerequisites
This script was written and tested on Node.js version 14.4.0 with packages installed using Yarn. If you use NPM or a different version of Node.js, it'll likely still work—but no promises.

### Installation
Clone this repository and navigate to the project directory.
```
git clone https://github.com/john-royal/ios-app-metadata.git ios-app-metadata && cd ios-app-metadata
```
Then, use Yarn to install dependencies.
```
yarn install
```

### Configuration
Create an `apps.txt` file in the project's root directory. 

Then, for each app you want information for, provide either the app's App Store ID number or the URL for its App Store listing. Each app ID or URL should be on its own line.

For an example, [see `example/apps.txt`](https://github.com/john-royal/ios-app-metadata/blob/main/example/apps.txt).

### Usage
Use the following command to run the script:
```
yarn start
```

When the script is finished, it will create a spreadsheet in the project's root directory with the information it has retrieved. The exact spreadsheet name will be printed to the console, but it should look like this: `output-1593223208901.xlsx`. The numbers represent the Unix timestamp from when you first ran `yarn start`.

For an example of what this spreadsheet will look like, [see `example/output.xlsx`](https://github.com/john-royal/ios-app-metadata/blob/main/example/output.xlsx).
