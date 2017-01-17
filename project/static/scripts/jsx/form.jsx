import React, { Component } from "react";
import { render } from "react-dom";
import Form from "react-jsonschema-form";
import $ from 'jquery';

const log = (type) => console.log.bind(console, type);

function render_schema(data) {
render((
  <Form schema={data['schema']}
        uiSchema={data['uiSchema']}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")} />
), document.getElementById("form"));
}

$(document).ready(function () {
    $.ajax({
        dataType: 'json',
        url: '/form/schema',
        success: render_schema
    });
});
