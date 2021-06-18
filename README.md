![](https://badgen.net/badge/CodeX%20Editor/v2.0/blue)

# Query Url Tool

Provides Query Url Block for the [CodeX Editor](https://ifmo.su/editor). Block has Url and Method. It can be used, for example, for displaying methods and request URLs.

![](https://imgur.com/eWSbnnu.png)

## Installation

### Install via YARN

Get the package

```shell
yarn add yurgeman/query-url
```

Include module at your application

```javascript
const QueryUrl = require('yurgeman/query-url');
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

## Usage

Add a new Tool to the `tools` property of the CodeX Editor initial config.

```javascript
var editor = CodexEditor({
  ...
  
  tools: {
    ...
    queryUrl: QueryUrl,
  },
  
  ...
});
```

Or init Query Url Tool with additional settings

```javascript
var editor = CodexEditor({
  ...
  
  tools: {
    ...
      queryUrl: {
        class:         QueryUrl,
          inlineToolbar: false,
          shortcut:      'CMD+SHIFT+U',
          config:        {
          urlPlaceholder:   'Url',
            methodPlaceholder: 'Метод'
        }
      },
  },
  
  ...
});
```

## Config Params

| Field              | Type     | Description                       |
| ------------------ | -------- | ----------------------------------|
| urlPlaceholder   | `string` | Query Url Tool's url placeholder  |
| methodPlaceholder | `string` | Query Url Tool's method placeholder|

## Output data

| Field     | Type     | Description      |
| --------- | -------- | -----------------|
| method     | `string` | Query Url's method  |
| url   | `string` | Query Url's url|

```json
{
    "type" : "queryUrl",
    "data" : {
        "method" : "GET",
        "url" : "/api/users/{id}"
    }
}
```
