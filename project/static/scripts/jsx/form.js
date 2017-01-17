// import React, { Component } from "react";
// import { render } from "react-dom";

// import Form from "react-jsonschema-form";

var React = require('react');
var ReactDOM = require('react-dom');
var JsonSchema = require('react-jsonschema-form');
var JsonSchemaForm = JsonSchema.default;

const schema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: {type: "string", title: "Title", default: "A new task"},
    done: {type: "boolean", title: "Done?", default: false}
  }
};

const log = (type) => console.log.bind(console, type);

ReactDOM.render((
  <JsonSchemaForm schema={schema}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")} />
), document.getElementById("form"));