# HCL Commerce and WhatsApp Share Asset

# WARRANTY & SUPPORT

HCL Software provides HCL Commerce open source assets “as-is” without obligation to support them nor warranties or any kind, either express or implied, including the warranty of title, non-infringement or non-interference, and the implied warranties and conditions of merchantability and fitness for a particular purpose. HCL Commerce open source assets are not covered under the HCL Commerce master license nor Support contracts.

If you have questions or encounter problems with an HCL Commerce open source asset, please open an issue in the asset's GitHub repository. For more information about GitHub issues, including creating an issue, please refer to GitHub Docs. The HCL Commerce Innovation Factory Team, who develops HCL Commerce open source assets, monitors GitHub issues and will do their best to address them.

# HCLC-WhatsApp-Share POC
This PoC is about the integration of WhatsApp Business Api with HCL Commerce. This asset provides the capabiity for a customer to share:
1. Product from  PDP page
2. Shooping Cart information from Cart Page (all the products in the cart)
3. Order confirmation, once order is submitted

with anyone on whatsapp.

## Set up a WhatsApp Business Account
First, you need to create a WhatsApp Business Account and obtain the necessary credentials, including the API key, phone number, and client ID.
For account creation go to https://developers.facebook.com

### Prerequisites
The project can be loaded on any environment supporting Node.js development. We recommend:
- Node.js LTS Version >= 16.9.1
- npm version >= 8.6.0

### Run NPM workspace build script

All NPM scripts can be run from workspace root. For reference see https://docs.npmjs.com/cli/v8/using-npm/workspaces
1. install `npm install` will install all deps for all project under workspace
2. build production bundle of packages `npm run build:production -ws --if-present`
3. build development build of packages `npm run build:dev -ws --if-present`
4. start store dev server: `npm start -w=react-store`

Note: `-ws` means all workspaces.

### Recommended Editor

We recommend to use Visual Studio Code.

Visual Studio Code editor extension
* Code formatting: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

# HCL Commerce Version compatibity
This asset has been tested with HCL Commerce v9.1.13 with React storefronts.
