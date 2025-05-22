# MVP Link Auto-Appender

A lightweight Chromium/Edge extension that automatically appends your unique MVP code (Eg. `wt.mc_id=MVP_12345`) to all Microsoft Learn links. Allowing for much easier sharing.

## How it works

- Intercepts navigation to learn.microsoft.com
- Adds your MVP Contributor ID if not already present

## Installation

1. Clone or download
2. Go to `edge://extensions`
3. Enable Developer Mode
4. Click "Load unpacked" and select this folder
5. Manage the extension and select Extension options.
6. Enter and save your own unique MCP ID.

## Usage
Once configured, all learn.microsoft.com links are appended with the correct given MVP Contributor ID. 
Clicking the Extension icon copies a link with localisation (en-GB, fr-fr, etc) removed as per guidelines to the clipboard.

## Configuration Example
Once installed, simply click the Extension to set your MVP ID. Once configured the extension will auto-append your unique MVP ContributorID to the url. Allowing for simple sharing.

![Configuration Example](https://swgeneralstorage001.blob.core.windows.net/images/mvpLinkAutoAppenderExample.webp)