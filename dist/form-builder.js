/*
formBuilder - https://formbuilder.online/
Version: 1.24.2
Author: Kevin Chappell <kevin.b.chappell@gmail.com>
*/
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Form Builder events
 * @return {Object} various events to be trigger
 */
// function fbEvents(){
var events = {};

events.loaded = new Event('loaded');
events.viewData = new Event('viewData');
events.userDeclined = new Event('userDeclined');
events.modalClosed = new Event('modalClosed');
events.modalOpened = new Event('modalOpened');
events.formSaved = new Event('formSaved');
events.fieldAdded = new Event('fieldAdded');
events.fieldRemoved = new Event('fieldRemoved');

//   return events;
// }

module.exports = events;

},{}],2:[function(require,module,exports){
'use strict';

require('./kc-toggle.js');
require('./polyfills.js');

(function ($) {
  var FormBuilder = function FormBuilder(options, element) {
    var _this = this;

    var formBuilder = this;

    var defaults = {
      controlPosition: 'right',
      controlOrder: ['autocomplete', 'button', 'checkbox', 'checkbox-group', 'date', 'file', 'header', 'hidden', 'paragraph', 'number', 'radio-group', 'select', 'text', 'textarea'],
      dataType: 'json',
      // Array of fields to disable
      disableFields: [],
      editOnAdd: false,
      // Uneditable fields or other content you would like to appear
      // before and after regular fields:
      append: false,
      prepend: false,
      // array of objects with fields values
      // ex:
      // defaultFields: [{
      //   label: 'First Name',
      //   name: 'first-name',
      //   required: 'true',
      //   description: 'Your first name',
      //   type: 'text'
      // }, {
      //   label: 'Phone',
      //   name: 'phone',
      //   description: 'How can we reach you?',
      //   type: 'text'
      // }],
      defaultFields: [],
      inputSets: [],
      fieldRemoveWarn: false,
      roles: {
        1: 'Administrator'
      },
      messages: {
        addOption: 'Add Option +',
        allFieldsRemoved: 'All fields were removed.',
        allowMultipleFiles: 'Allow users to upload multiple files',
        autocomplete: 'Autocomplete',
        button: 'Button',
        cannotBeEmpty: 'This field cannot be empty',
        checkboxGroup: 'Checkbox Group',
        checkbox: 'Checkbox',
        checkboxes: 'Checkboxes',
        className: 'Class',
        clearAllMessage: 'Are you sure you want to clear all fields?',
        clearAll: 'Clear',
        close: 'Close',
        content: 'Content',
        copy: 'Copy To Clipboard',
        copyButton: '&#43;',
        copyButtonTooltip: 'Copy',
        dateField: 'Date Field',
        description: 'Help Text',
        descriptionField: 'Description',
        devMode: 'Developer Mode',
        editNames: 'Edit Names',
        editorTitle: 'Form Elements',
        editXML: 'Edit XML',
        enableOther: 'Enable &quot;Other&quot;',
        enableOtherMsg: 'Let users to enter an unlisted option',
        fieldDeleteWarning: false,
        fieldVars: 'Field Variables',
        fieldNonEditable: 'This field cannot be edited.',
        fieldRemoveWarning: 'Are you sure you want to remove this field?',
        fileUpload: 'File Upload',
        formUpdated: 'Form Updated',
        getStarted: 'Drag a field from the right to this area',
        header: 'Header',
        hide: 'Edit',
        hidden: 'Hidden Input',
        label: 'Label',
        labelEmpty: 'Field Label cannot be empty',
        limitRole: 'Limit access to one or more of the following roles:',
        mandatory: 'Mandatory',
        maxlength: 'Max Length',
        minOptionMessage: 'This field requires a minimum of 2 options',
        multipleFiles: 'Multiple Files',
        name: 'Name',
        no: 'No',
        number: 'Number',
        off: 'Off',
        on: 'On',
        option: 'Option',
        optional: 'optional',
        optionLabelPlaceholder: 'Label',
        optionValuePlaceholder: 'Value',
        optionEmpty: 'Option value required',
        other: 'Other',
        paragraph: 'Paragraph',
        placeholder: 'Placeholder',
        placeholders: {
          value: 'Value',
          label: 'Label',
          text: '',
          textarea: '',
          email: 'Enter you email',
          placeholder: '',
          className: 'space separated classes',
          password: 'Enter your password'
        },
        preview: 'Preview',
        radioGroup: 'Radio Group',
        radio: 'Radio',
        removeMessage: 'Remove Element',
        removeOption: 'Remove Option',
        remove: '&#215;',
        required: 'Required',
        richText: 'Rich Text Editor',
        roles: 'Access',
        rows: 'Rows',
        save: 'Save',
        selectOptions: 'Options',
        select: 'Select',
        selectColor: 'Select Color',
        selectionsMessage: 'Allow Multiple Selections',
        size: 'Size',
        sizes: {
          xs: 'Extra Small',
          sm: 'Small',
          m: 'Default',
          lg: 'Large'
        },
        style: 'Style',
        styles: {
          btn: {
            'default': 'Default',
            danger: 'Danger',
            info: 'Info',
            primary: 'Primary',
            success: 'Success',
            warning: 'Warning'
          }
        },
        subtype: 'Type',
        text: 'Text Field',
        textArea: 'Text Area',
        toggle: 'Toggle',
        warning: 'Warning!',
        value: 'Value',
        viewJSON: '{  }',
        viewXML: '&lt;/&gt;',
        yes: 'Yes'
      },
      notify: {
        error: function error(message) {
          return console.error(message);
        },
        success: function success(message) {
          return console.log(message);
        },
        warning: function warning(message) {
          return console.warn(message);
        }
      },
      sortableControls: false,
      stickyControls: false,
      showActionButtons: true,
      typeUserAttrs: {},
      typeUserEvents: {},
      prefix: 'form-builder-'
    };

    var utils = require('./utils.js');

    defaults.messages.subtypes = function () {
      var subtypeDefault = function subtypeDefault(subtype) {
        return {
          label: subtype,
          value: subtype
        };
      };

      return {
        text: ['text', 'password', 'email', 'color', 'tel'].map(subtypeDefault),
        header: ['h1', 'h2', 'h3'].map(subtypeDefault),
        button: ['button', 'submit', 'reset'].map(subtypeDefault),
        paragraph: ['p', 'address', 'blockquote', 'canvas', 'output'].map(subtypeDefault)
      };
    }();

    var opts = Object.assign({}, defaults, options);
    var frmbID = 'frmb-' + $('ul[id^=frmb-]').length++;

    if (options.messages) {
      opts.messages = Object.assign({}, defaults.messages, options.messages);
    }

    formBuilder.formID = frmbID;

    var $sortableFields = $('<ul/>').attr('id', frmbID).addClass('frmb');
    var _helpers = require('./helpers.js')(opts, formBuilder);

    formBuilder.layout = _helpers.editorLayout(opts.controlPosition);
    formBuilder.stage = $sortableFields[0];

    var lastID = frmbID + '-fld-1';
    var boxID = frmbID + '-control-box';

    // create array of field objects to cycle through
    var frmbFields = [{
      label: opts.messages.autocomplete,
      attrs: {
        type: 'autocomplete',
        className: 'autocomplete',
        name: 'autocomplete'
      }
    }, {
      label: opts.messages.button,
      attrs: {
        type: 'button',
        className: 'button-input',
        name: 'button'
      }
    }, {
      label: opts.messages.checkbox,
      attrs: {
        type: 'checkbox',
        className: 'checkbox',
        name: 'checkbox'
      }
    }, {
      label: opts.messages.checkboxGroup,
      attrs: {
        type: 'checkbox-group',
        className: 'checkbox-group',
        name: 'checkbox-group'
      }
    }, {
      label: opts.messages.dateField,
      attrs: {
        type: 'date',
        className: 'calendar',
        name: 'date-input'
      }
    }, {
      label: opts.messages.fileUpload,
      attrs: {
        type: 'file',
        className: 'file-input',
        name: 'file-input'
      }
    }, {
      label: opts.messages.header,
      attrs: {
        type: 'header',
        className: 'header'
      }
    }, {
      label: opts.messages.hidden,
      attrs: {
        type: 'hidden',
        className: 'hidden-input',
        name: 'hidden-input'
      }
    }, {
      label: opts.messages.number,
      attrs: {
        type: 'number',
        className: 'number',
        name: 'number'
      }
    }, {
      label: opts.messages.paragraph,
      attrs: {
        type: 'paragraph',
        className: 'paragraph'
      }
    }, {
      label: opts.messages.radioGroup,
      attrs: {
        type: 'radio-group',
        className: 'radio-group',
        name: 'radio-group'
      }
    }, {
      label: opts.messages.select,
      attrs: {
        type: 'select',
        className: 'select',
        name: 'select'
      }
    }, {
      label: opts.messages.text,
      attrs: {
        type: 'text',
        className: 'text-input',
        name: 'text-input'
      }
    }, {
      label: opts.messages.textArea,
      attrs: {
        type: 'textarea',
        className: 'text-area',
        name: 'textarea'
      }
    }];

    frmbFields = _helpers.orderFields(frmbFields);

    if (opts.disableFields) {
      // remove disabledFields
      frmbFields = frmbFields.filter(function (field) {
        return !utils.inArray(field.attrs.type, opts.disableFields);
      });
    }

    // Create draggable fields for formBuilder
    var cbUl = utils.markup('ul', null, { id: boxID, className: 'frmb-control' });
    formBuilder.controls = cbUl;

    if (opts.sortableControls) {
      cbUl.classList.add('sort-enabled');
    }

    var $cbUL = $(cbUl);

    // Loop through
    utils.forEach(frmbFields, function (i) {
      var $field = $('<li/>', {
        'class': 'icon-' + frmbFields[i].attrs.className,
        'type': frmbFields[i].type,
        'name': frmbFields[i].className,
        'label': frmbFields[i].label
      });

      $field.data('newFieldData', frmbFields[i]);

      var typeLabel = utils.markup('span', frmbFields[i].label);
      $field.html(typeLabel).appendTo($cbUL);
    });

    if (opts.inputSets.length) {
      $('<li/>', { 'class': 'fb-separator' }).html('<hr>').appendTo($cbUL);
      opts.inputSets.forEach(function (set) {
        set.name = set.name || _helpers.makeClassName(set.label);
        var $set = $('<li/>', { 'class': 'input-set-control', type: set.name });
        $set.html(set.label).appendTo($cbUL);
      });
    }

    // Sortable fields
    $sortableFields.sortable({
      cursor: 'move',
      opacity: 0.9,
      revert: 150,
      beforeStop: _helpers.beforeStop,
      start: _helpers.startMoving,
      stop: _helpers.stopMoving,
      cancel: 'input, select, .disabled, .form-group, .btn',
      placeholder: 'frmb-placeholder'
    });

    // ControlBox with different fields
    $cbUL.sortable({
      helper: 'clone',
      opacity: 0.9,
      connectWith: $sortableFields,
      cancel: '.fb-separator',
      cursor: 'move',
      scroll: false,
      placeholder: 'ui-state-highlight',
      start: _helpers.startMoving,
      stop: _helpers.stopMoving,
      revert: 150,
      beforeStop: _helpers.beforeStop,
      distance: 3,
      update: function update(event, ui) {
        if (_helpers.doCancel) {
          return false;
        }
        if (ui.item.parent()[0] === $sortableFields[0]) {
          processControl(ui.item);
          _helpers.doCancel = true;
        } else {
          _helpers.setFieldOrder($cbUL);
          _helpers.doCancel = !opts.sortableControls;
        }
      }
    });

    var processControl = function processControl(control) {
      if (control[0].classList.contains('input-set-control')) {
        var inputSet = opts.inputSets.filter(function (set) {
          return set.name === control[0].type;
        })[0];
        if (inputSet.showHeader) {
          var header = {
            type: 'header',
            subtype: 'h2',
            id: inputSet.name,
            label: inputSet.label
          };
          prepFieldVars(header, true);
        }
        inputSet.fields.forEach(function (field) {
          prepFieldVars(field, true);
        });
      } else {
        prepFieldVars(control, true);
      }
    };

    var $formWrap = $('<div/>', {
      id: frmbID + '-form-wrap',
      'class': 'form-wrap form-builder' + _helpers.mobileClass()
    });

    formBuilder.editor = $formWrap[0];

    var $stageWrap = $('<div/>', {
      id: frmbID + '-stage-wrap',
      'class': 'stage-wrap ' + formBuilder.layout.stage
    });

    var cbWrap = $('<div/>', {
      id: frmbID + '-cb-wrap',
      'class': 'cb-wrap ' + formBuilder.layout.controls
    }).append($cbUL[0]);

    if (opts.showActionButtons) {
      // Build our headers and action links
      var viewDataText = void 0;
      if (opts.dataType === 'xml') {
        viewDataText = opts.messages.viewXML;
      } else {
        viewDataText = opts.messages.viewJSON;
      }
      var viewData = utils.markup('button', viewDataText, {
        id: frmbID + '-view-data',
        type: 'button',
        className: 'view-data btn btn-default'
      });
      var clearAll = utils.markup('button', opts.messages.clearAll, {
        id: frmbID + '-clear-all',
        type: 'button',
        className: 'clear-all btn btn-default'
      });
      var saveAll = utils.markup('button', opts.messages.save, {
        className: 'btn btn-primary ' + opts.prefix + 'save',
        id: frmbID + '-save',
        type: 'button'
      });
      var formActions = utils.markup('div', [clearAll, viewData, saveAll], {
        className: 'form-actions btn-group'
      });

      cbWrap.append(formActions);
    }

    $stageWrap.append($sortableFields, cbWrap);
    $stageWrap.before($formWrap);
    $formWrap.append($stageWrap, cbWrap);

    if (element.type !== 'textarea') {
      $(element).append($formWrap);
    } else {
      $(element).replaceWith($formWrap);
    }

    var saveAndUpdate = _helpers.debounce(function (evt) {
      if (evt) {
        if (evt.type === 'keyup' && evt.target.name === 'className') {
          return false;
        }

        var $field = $(evt.target).closest('.form-field');
        _helpers.updatePreview($field);
        _helpers.save();
      }
    });

    // Save field on change
    $sortableFields.on('change blur keyup', '.form-elements input, .form-elements select, .form-elements textarea', saveAndUpdate);

    $('li', $cbUL).click(function (evt) {
      var $control = $(evt.target).closest('.ui-sortable-handle');
      _helpers.stopIndex = undefined;
      processControl($control);
      _helpers.save();
    });

    // Add append and prepend options if necessary
    var nonEditableFields = function nonEditableFields() {
      var cancelArray = [];

      if (opts.prepend && !$('.disabled.prepend', $sortableFields).length) {
        var prependedField = utils.markup('li', opts.prepend, { className: 'disabled prepend' });
        cancelArray.push(true);
        $sortableFields.prepend(prependedField);
      }

      if (opts.append && !$('.disabled.append', $sortableFields).length) {
        var appendedField = utils.markup('li', opts.append, { className: 'disabled append' });
        cancelArray.push(true);
        $sortableFields.append(appendedField);
      }

      if (cancelArray.some(function (elem) {
        return elem === true;
      })) {
        $stageWrap.removeClass('empty');
      }
    };

    var prepFieldVars = function prepFieldVars($field) {
      var isNew = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var field = {};
      if ($field instanceof jQuery) {
        var fieldData = $field.data('newFieldData');
        if (fieldData) {
          field = fieldData.attrs;
          field.label = fieldData.label;
        } else {
          var attrs = $field[0].attributes;
          if (!isNew) {
            field.values = $field.children().map(function (index, elem) {
              return {
                label: $(elem).text(),
                value: $(elem).attr('value'),
                selected: Boolean($(elem).attr('selected'))
              };
            });
          }

          for (var i = attrs.length - 1; i >= 0; i--) {
            field[attrs[i].name] = attrs[i].value;
          }
        }
      } else {
        field = Object.assign({}, $field);
      }

      field.name = isNew ? nameAttr(field) : field.name || nameAttr(field);

      if (isNew && utils.inArray(field.type, ['text', 'number', 'file', 'select', 'textarea'])) {
        field.className = 'form-control'; // backwards compatibility
      } else {
        field.className = field.class || field.className; // backwards compatibility
      }

      var match = /(?:^|\s)btn-(.*?)(?:\s|$)/g.exec(field.className);
      if (match) {
        field.style = match[1];
      }

      utils.escapeAttrs(field);

      appendNewField(field);
      if (isNew) {
        document.dispatchEvent(formBuilder.events.fieldAdded);
      }
      $stageWrap.removeClass('empty');
    };

    // Parse saved XML template data
    var loadFields = function loadFields() {
      var formData = formBuilder.formData;
      if (formData && formData.length) {
        for (var i = 0; i < formData.length; i++) {
          prepFieldVars(formData[i]);
        }
        $stageWrap.removeClass('empty');
      } else if (opts.defaultFields && opts.defaultFields.length) {
        // Load default fields if none are set
        opts.defaultFields.forEach(function (field) {
          return prepFieldVars(field);
        });
        $stageWrap.removeClass('empty');
      } else if (!opts.prepend && !opts.append) {
        $stageWrap.addClass('empty').attr('data-content', opts.messages.getStarted);
      }
      _helpers.save();

      var $fields = $('li.form-field:not(.disabled)', $sortableFields);

      $fields.each(function (i) {
        return _helpers.updatePreview($($fields[i]));
      });

      nonEditableFields();
    };

    // callback to track disabled tooltips
    $sortableFields.on('mousemove', 'li.disabled', function (e) {
      $('.frmb-tt', _this).css({
        left: e.offsetX - 16,
        top: e.offsetY - 34
      });
    });

    // callback to call disabled tooltips
    $sortableFields.on('mouseenter', 'li.disabled', function (e) {
      return _helpers.disabledTT.add($(_this));
    });

    // callback to call disabled tooltips
    $sortableFields.on('mouseleave', 'li.disabled', function (e) {
      return _helpers.disabledTT.remove($(_this));
    });

    var nameAttr = function nameAttr(field) {
      var epoch = new Date().getTime();
      return field.type + '-' + epoch;
    };

    /**
     * Add data for field with options [select, checkbox-group, radio-group]
     *
     * @todo   refactor this nasty ~crap~ code, its actually painful to look at
     * @param  {Object} values
     * @return {String} field options markup
     */
    var fieldOptions = function fieldOptions(values) {
      var optionActions = [utils.markup('a', opts.messages.addOption, { className: 'add add-opt' })];
      var fieldOptions = ['<label class="false-label">' + opts.messages.selectOptions + '</label>'];
      var isMultiple = values.multiple || values.type === 'checkbox-group';

      if (!values.values || !values.values.length) {
        values.values = [1, 2, 3].map(function (index) {
          var label = opts.messages.option + ' ' + index;
          var option = {
            selected: false,
            label: label,
            value: utils.hyphenCase(label)
          };
          return option;
        });
        values.values[0].selected = true;
      } else {
        // ensure option data is has all required keys
        values.values.forEach(function (option) {
          return Object.assign({}, { selected: false }, option);
        });
      }

      fieldOptions.push('<div class="sortable-options-wrap">');

      fieldOptions.push('<ol class="sortable-options">');
      utils.forEach(values.values, function (i) {
        fieldOptions.push(selectFieldOptions(values.name, values.values[i], isMultiple));
      });
      fieldOptions.push('</ol>');
      fieldOptions.push(utils.markup('div', optionActions, { className: 'option-actions' }).outerHTML);
      fieldOptions.push('</div>');

      return utils.markup('div', fieldOptions.join(''), { className: 'form-group field-options' }).outerHTML;
    };

    /**
     * Build the editable properties for the field
     * @param  {object} values configuration object for advanced fields
     * @return {String}        markup for advanced fields
     */
    var advFields = function advFields(values) {
      var advFields = [];
      var key = void 0;
      var optionFields = ['select', 'checkbox-group', 'radio-group'];
      var isOptionField = function () {
        return optionFields.indexOf(values.type) !== -1;
      }();
      var valueField = !utils.inArray(values.type, ['header', 'paragraph', 'file'].concat(optionFields));
      var roles = values.role !== undefined ? values.role.split(',') : [];

      advFields.push(requiredField(values));

      if (values.type === 'checkbox') {
        advFields.push(boolAttribute('toggle', values, { first: opts.messages.toggle }));
      }

      advFields.push(textAttribute('label', values));

      values.size = values.size || 'm';
      values.style = values.style || 'default';

      // Help Text / Description Field
      if (!utils.inArray(values.type, ['header', 'paragraph', 'button'])) {
        advFields.push(textAttribute('description', values));
      }

      if (opts.messages.subtypes[values.type]) {
        var optionData = opts.messages.subtypes[values.type];
        advFields.push(selectAttribute('subtype', values, optionData));
      }

      if (values.type === 'button') {
        advFields.push(btnStyles(values.style, values.type));
      }

      if (values.type === 'number') {
        advFields.push(numberAttribute('min', values));
        advFields.push(numberAttribute('max', values));
        advFields.push(numberAttribute('step', values));
      }

      // Placeholder
      advFields.push(textAttribute('placeholder', values));

      // TextArea Rows Attribute
      if (values.type === 'textarea') {
        advFields.push(numberAttribute('rows', values));
      }

      // Class
      advFields.push(textAttribute('className', values));

      advFields.push(textAttribute('name', values));

      if (valueField) {
        advFields.push(textAttribute('value', values));
      }

      if (values.type === 'file') {
        var labels = {
          first: opts.messages.multipleFiles,
          second: opts.messages.allowMultipleFiles
        };
        advFields.push(boolAttribute('multiple', values, labels));
      }

      var rolesDisplay = values.role !== undefined ? 'style="display:block"' : '';
      var availableRoles = ['<div class="available-roles" ' + rolesDisplay + '>'];
      for (key in opts.roles) {
        if (opts.roles.hasOwnProperty(key)) {
          var checked = utils.inArray(key, roles) ? 'checked' : '';
          var roleId = 'fld-' + lastID + '-roles-' + key;
          availableRoles.push('<input type="checkbox" name="roles[]" value="' + key + '" id="' + roleId + '" ' + checked + ' class="roles-field" /> <label for="' + roleId + '">' + opts.roles[key] + '</label><br/>');
        }
      }

      availableRoles.push('</div>');

      var accessLabels = { first: opts.messages.roles, second: opts.messages.limitRole, content: availableRoles.join('') };

      advFields.push(boolAttribute('access', values, accessLabels));

      if (values.type === 'checkbox-group' || values.type === 'radio-group') {
        advFields.push(boolAttribute('other', values, { first: opts.messages.enableOther, second: opts.messages.enableOtherMsg }));
      }

      if (values.type === 'select') {
        advFields.push(boolAttribute('multiple', values, { first: ' ', second: opts.messages.selectionsMessage }));
      }

      if (isOptionField) {
        advFields.push(fieldOptions(values));
      }

      if (utils.inArray(values.type, ['text', 'textarea'])) {
        advFields.push(numberAttribute('maxlength', values));
      }

      // Append custom attributes as defined in typeUserAttrs option
      if (opts.typeUserAttrs[values.type]) {
        advFields.push(processTypeUserAttrs(opts.typeUserAttrs[values.type], values));
      }

      return advFields.join('');
    };

    /**
     * Processes typeUserAttrs
     * @param  {Object} typeUserAttr option
     * @param  {Object} values       field attributes
     * @return {String}              markup for custom user attributes
     */
    function processTypeUserAttrs(typeUserAttr, values) {
      var advField = [];

      for (var attribute in typeUserAttr) {
        if (typeUserAttr.hasOwnProperty(attribute)) {
          var orig = opts.messages[attribute];
          var origValue = typeUserAttr[attribute].value;
          typeUserAttr[attribute].value = values[attribute] || typeUserAttr[attribute].value || '';

          if (typeUserAttr[attribute].label) {
            opts.messages[attribute] = typeUserAttr[attribute].label;
          }

          if (typeUserAttr[attribute].options) {
            advField.push(selectUserAttrs(attribute, typeUserAttr[attribute]));
          } else {
            advField.push(inputUserAttrs(attribute, typeUserAttr[attribute]));
          }

          opts.messages[attribute] = orig;
          typeUserAttr[attribute].value = origValue;
        }
      }

      return advField.join('');
    }

    /**
     * Text input value for attribute
     * @param  {String} name
     * @param  {Object} attrs also known as values
     * @return {String}       input markup
     */
    function inputUserAttrs(name, attrs) {
      var textAttrs = {
        id: name + '-' + lastID,
        title: attrs.description || attrs.label || name.toUpperCase(),
        name: name,
        type: attrs.type || 'text',
        className: ['fld-' + name]
      };
      var label = '<label for="' + textAttrs.id + '">' + opts.messages[name] + '</label>';

      if (!utils.inArray(textAttrs.type, ['checkbox', 'checkbox-group', 'radio-group'])) {
        textAttrs.className.push('form-control');
      }

      textAttrs = Object.assign({}, attrs, textAttrs);
      var textInput = '<input ' + utils.attrString(textAttrs) + '>';
      var inputWrap = '<div class="input-wrap">' + textInput + '</div>';
      return '<div class="form-group ' + name + '-wrap">' + label + inputWrap + '</div>';
    }

    /**
     * Select input for multiple choice user attributes
     * @todo  replace with selectAttr
     * @param  {String} name
     * @param  {Object} options
     * @return {String}         select markup
     */
    function selectUserAttrs(name, options) {
      var optis = Object.keys(options.options).map(function (val) {
        var attrs = { value: val };
        if (val === options.value) {
          attrs.selected = null;
        }
        return '<option ' + utils.attrString(attrs) + '>' + options.options[val] + '</option>';
      });
      var selectAttrs = {
        id: name + '-' + lastID,
        title: options.description || options.label || name.toUpperCase(),
        name: name,
        className: 'fld-' + name + ' form-control'
      };
      var label = '<label for="' + selectAttrs.id + '">' + opts.messages[name] + '</label>';

      Object.keys(options).filter(function (prop) {
        return !utils.inArray(prop, ['value', 'options', 'label']);
      }).forEach(function (attr) {
        selectAttrs[attr] = options[attr];
      });

      var select = '<select ' + utils.attrString(selectAttrs) + '>' + optis.join('') + '</select>';
      var inputWrap = '<div class="input-wrap">' + select + '</div>';
      return '<div class="form-group ' + name + '-wrap">' + label + inputWrap + '</div>';
    }

    var boolAttribute = function boolAttribute(name, values, labels) {
      if (opts.typeUserAttrs[values.type] && opts.typeUserAttrs[values.type][name]) {
        return;
      }

      var label = function label(txt) {
        return '<label for="' + name + '-' + lastID + '">' + txt + '</label>';
      };
      var checked = values[name] !== undefined ? 'checked' : '';
      var input = '<input type="checkbox" class="fld-' + name + '" name="' + name + '" value="true" ' + checked + ' id="' + name + '-' + lastID + '"/> ';
      var left = [];
      var right = [input];

      if (labels.first) {
        left.unshift(label(labels.first));
      }

      if (labels.second) {
        right.push(label(labels.second));
      }

      if (labels.content) {
        right.push(labels.content);
      }

      right.unshift('<div class="input-wrap">');
      right.push('</div>');

      return '<div class="form-group ' + name + '-wrap">' + left.concat(right).join('') + '</div>';
    };

    var btnStyles = function btnStyles(style, type) {
      var tags = {
        button: 'btn'
      };
      var styles = opts.messages.styles[tags[type]];
      var styleField = '';

      if (styles) {
        var styleLabel = '<label>' + opts.messages.style + '</label>';
        styleField += '<input value="' + style + '" name="style" type="hidden" class="btn-style">';
        styleField += '<div class="btn-group" role="group">';

        Object.keys(opts.messages.styles[tags[type]]).forEach(function (element) {
          var active = style === element ? 'active' : '';
          styleField += '<button value="' + element + '" type="' + type + '" class="' + active + ' btn-xs ' + tags[type] + ' ' + tags[type] + '-' + element + '">' + opts.messages.styles[tags[type]][element] + '</button>';
        });

        styleField += '</div>';

        styleField = '<div class="form-group style-wrap">' + styleLabel + ' ' + styleField + '</div>';
      }

      return styleField;
    };

    /**
     * Add a number attribute to a field.
     * @param  {String} attribute
     * @param  {Object} values
     * @return {String} markup for number attribute
     */
    var numberAttribute = function numberAttribute(attribute, values) {
      if (opts.typeUserAttrs[values.type] && opts.typeUserAttrs[values.type][attribute]) {
        return;
      }

      var attrVal = values[attribute];
      var attrLabel = opts.messages[attribute] || attribute;
      var placeholder = opts.messages.placeholders[attribute];
      var inputConfig = {
        type: 'number',
        value: attrVal,
        name: attribute,
        min: '0',
        placeholder: placeholder,
        className: 'fld-' + attribute + ' form-control',
        id: attribute + '-' + lastID
      };
      var numberAttribute = '<input ' + utils.attrString(utils.trimObj(inputConfig)) + '>';
      var inputWrap = '<div class="input-wrap">' + numberAttribute + '</div>';

      return '<div class="form-group ' + attribute + '-wrap"><label for="' + inputConfig.id + '">' + attrLabel + '</label> ' + inputWrap + '</div>';
    };

    /**
     * selectAttribute
     * @param  {String} attribute  attribute name
     * @param  {Object} values     aka attrs
     * @param  {Array} optionData  select field option data
     * @return {String}            select input makrup
     */
    var selectAttribute = function selectAttribute(attribute, values, optionData) {
      if (opts.typeUserAttrs[values.type] && opts.typeUserAttrs[values.type][attribute]) {
        return;
      }
      var selectOptions = optionData.map(function (option, i) {
        var optionAttrs = Object.assign({
          label: opts.messages.option + ' ' + i,
          value: undefined
        }, option);
        if (option.value === values[attribute]) {
          optionAttrs.selected = true;
        }
        return '<option ' + utils.attrString(utils.trimObj(optionAttrs)) + '>' + optionAttrs.label + '</option>';
      });
      var selectAttrs = {
        id: attribute + '-' + lastID,
        name: attribute,
        className: 'fld-' + attribute + ' form-control'
      };
      var label = '<label for="' + selectAttrs.id + '">' + (opts.messages[attribute] || utils.capitalize(attribute)) + '</label>';
      var select = '<select ' + utils.attrString(selectAttrs) + '>' + selectOptions.join('') + '</select>';
      var inputWrap = '<div class="input-wrap">' + select + '</div>';

      return '<div class="form-group ' + selectAttrs.name + '-wrap">' + label + inputWrap + '</div>';
    };

    /**
     * Generate some text inputs for field attributes, **will be replaced**
     * @param  {String} attribute
     * @param  {Object} values
     * @return {String}
     */
    var textAttribute = function textAttribute(attribute, values) {
      if (opts.typeUserAttrs[values.type] && opts.typeUserAttrs[values.type][attribute]) {
        return;
      }

      var placeholderFields = ['text', 'textarea', 'select'];

      var noName = ['header'];

      var textArea = ['paragraph'];

      var attrVal = values[attribute] || '';
      var attrLabel = opts.messages[attribute];
      if (attribute === 'label' && utils.inArray(values.type, textArea)) {
        attrLabel = opts.messages.content;
      }

      noName = noName.concat(opts.messages.subtypes.header, textArea);

      var placeholders = opts.messages.placeholders;
      var placeholder = placeholders[attribute] || '';
      var attributefield = '';
      var noMakeAttr = [];

      // Field has placeholder attribute
      if (attribute === 'placeholder' && !utils.inArray(values.type, placeholderFields)) {
        noMakeAttr.push(true);
      }

      // Field has name attribute
      if (attribute === 'name' && utils.inArray(values.type, noName)) {
        noMakeAttr.push(true);
      }

      if (!noMakeAttr.some(function (elem) {
        return elem === true;
      })) {
        var inputConfig = {
          name: attribute,
          placeholder: placeholder,
          className: 'fld-' + attribute + ' form-control',
          id: attribute + '-' + lastID
        };
        var attributeLabel = '<label for="' + inputConfig.id + '">' + attrLabel + '</label>';

        if (attribute === 'label' && utils.inArray(values.type, textArea) || attribute === 'value' && values.type === 'textarea') {
          attributefield += '<textarea ' + utils.attrString(inputConfig) + '>' + attrVal + '</textarea>';
        } else {
          inputConfig.value = attrVal;
          inputConfig.type = 'text';
          attributefield += '<input ' + utils.attrString(inputConfig) + '>';
        }

        var inputWrap = '<div class="input-wrap">' + attributefield + '</div>';

        attributefield = '<div class="form-group ' + attribute + '-wrap">' + attributeLabel + ' ' + inputWrap + '</div>';
      }

      return attributefield;
    };

    var requiredField = function requiredField(values) {
      var noRequire = ['header', 'paragraph', 'button'];
      var noMake = [];
      var requireField = '';

      if (utils.inArray(values.type, noRequire)) {
        noMake.push(true);
      }
      if (!noMake.some(function (elem) {
        return elem === true;
      })) {
        requireField = boolAttribute('required', values, { first: opts.messages.required });
      }

      return requireField;
    };

    // Append the new field to the editor
    var appendNewField = function appendNewField(values) {
      var m = utils.markup;
      var type = values.type || 'text';
      var label = values.label || opts.messages[type] || opts.messages.label;
      var delBtn = m('a', opts.messages.remove, {
        id: 'del_' + lastID,
        className: 'del-button btn delete-confirm',
        title: opts.messages.removeMessage
      });
      var toggleBtn = m('a', null, {
        id: lastID + '-edit',
        className: 'toggle-form btn icon-pencil',
        title: opts.messages.hide
      });
      var copyBtn = m('a', opts.messages.copyButton, {
        id: lastID + '-copy',
        className: 'copy-button btn icon-copy',
        title: opts.messages.copyButtonTooltip
      });

      var liContents = m('div', [toggleBtn, copyBtn, delBtn], { className: 'field-actions' }).outerHTML;

      // Field preview Label
      liContents += '<label class="field-label">' + label + '</label>';

      if (values.description) {
        var attrs = {
          className: 'tooltip-element',
          tooltip: values.description
        };
        liContents += '<span ' + utils.attrsString(attrs) + '>?</span>';
      }

      var requiredDisplay = values.required ? 'style="display:inline"' : '';
      liContents += '<span class="required-asterisk" ' + requiredDisplay + '> *</span>';

      liContents += m('div', '', { className: 'prev-holder' }).outerHTML;
      liContents += '<div id="' + lastID + '-holder" class="frm-holder">';
      liContents += '<div class="form-elements">';

      liContents += advFields(values);
      liContents += m('a', opts.messages.close, { className: 'close-field' }).outerHTML;

      liContents += '</div>';
      liContents += '</div>';

      var field = m('li', liContents, {
        'class': type + '-field form-field',
        'type': type,
        id: lastID
      });
      var $li = $(field);

      $li.data('fieldData', { attrs: values });

      if (typeof _helpers.stopIndex !== 'undefined') {
        $('> li', $sortableFields).eq(_helpers.stopIndex).before($li);
      } else {
        $sortableFields.append($li);
      }

      $('.sortable-options', $li).sortable({ update: function update() {
          return _helpers.updatePreview($li);
        } });

      _helpers.updatePreview($li);

      if (opts.typeUserEvents[type] && opts.typeUserEvents[type].onadd) {
        opts.typeUserEvents[type].onadd(field);
      }

      if (opts.editOnAdd) {
        _helpers.closeAllEdit();
        _helpers.toggleEdit(lastID, false);
      }

      lastID = _helpers.incrementId(lastID);
    };

    // Select field html, since there may be multiple
    var selectFieldOptions = function selectFieldOptions(name, optionData, multipleSelect) {
      var optionInputType = {
        selected: multipleSelect ? 'checkbox' : 'radio'
      };
      var optionDataOrder = ['value', 'label', 'selected'];
      var optionInputs = [];
      var optionTemplate = { selected: false, label: '', value: '' };

      optionData = Object.assign(optionTemplate, optionData);

      for (var i = optionDataOrder.length - 1; i >= 0; i--) {
        var prop = optionDataOrder[i];
        if (optionData.hasOwnProperty(prop)) {
          var attrs = {
            type: optionInputType[prop] || 'text',
            'class': 'option-' + prop,
            value: optionData[prop],
            name: name + '-option'
          };

          if (opts.messages.placeholders[prop]) {
            attrs.placeholder = opts.messages.placeholders[prop];
          }

          if (prop === 'selected' && optionData.selected === true) {
            attrs.checked = optionData.selected;
          }

          optionInputs.push(utils.markup('input', null, attrs));
        }
      }

      var removeAttrs = {
        className: 'remove btn',
        title: opts.messages.removeMessage
      };
      optionInputs.push(utils.markup('a', opts.messages.remove, removeAttrs));

      var field = utils.markup('li', optionInputs);

      return field.outerHTML;
    };

    var cloneItem = function cloneItem(currentItem) {
      var currentId = currentItem.attr('id');
      var type = currentItem.attr('type');
      var ts = new Date().getTime();
      var cloneName = type + '-' + ts;
      var $clone = currentItem.clone();

      $clone.find('[id]').each(function () {
        this.id = this.id.replace(currentId, lastID);
      });

      $clone.find('[for]').each(function () {
        this.setAttribute('for', this.getAttribute('for').replace(currentId, lastID));
      });

      $clone.each(function () {
        $('e:not(.form-elements)').each(function () {
          var newName = this.getAttribute('name');
          newName = newName.substring(0, newName.lastIndexOf('-') + 1);
          newName = newName + ts.toString();
          this.setAttribute('name', newName);
        });
      });

      $clone.find('.form-elements').find(':input').each(function () {
        if (this.getAttribute('name') === 'name') {
          var newVal = this.getAttribute('value');
          newVal = newVal.substring(0, newVal.lastIndexOf('-') + 1);
          newVal = newVal + ts.toString();
          this.setAttribute('value', newVal);
        }
      });

      $clone.attr('id', lastID);
      $clone.attr('name', cloneName);
      $clone.addClass('cloned');
      $('.sortable-options', $clone).sortable();

      if (opts.typeUserEvents[type] && opts.typeUserEvents[type].onclone) {
        opts.typeUserEvents[type].onclone($clone[0]);
      }

      lastID = _helpers.incrementId(lastID);
      return $clone;
    };

    // ---------------------- UTILITIES ---------------------- //

    // delete options
    $sortableFields.on('click touchstart', '.remove', function (e) {
      var $field = $(this).parents('.form-field:eq(0)');
      e.preventDefault();
      var optionsCount = $(this).parents('.sortable-options:eq(0)').children('li').length;
      if (optionsCount <= 2) {
        opts.notify.error('Error: ' + opts.messages.minOptionMessage);
      } else {
        $(this).parent('li').slideUp('250', function () {
          $(this).remove();
          _helpers.updatePreview($field);
          _helpers.save();
        });
      }
    });

    // touch focus
    $sortableFields.on('touchstart', 'input', function (e) {
      var $input = $(this);
      if (e.handled !== true) {
        if ($input.attr('type') === 'checkbox') {
          $input.trigger('click');
        } else {
          $input.focus();
          var fieldVal = $input.val();
          $input.val(fieldVal);
        }
      } else {
        return false;
      }
    });

    // toggle fields
    $sortableFields.on('click touchstart', '.toggle-form, .close-field', function (e) {
      e.stopPropagation();
      e.preventDefault();
      if (e.handled !== true) {
        var targetID = $(e.target).parents('.form-field:eq(0)').attr('id');
        _helpers.toggleEdit(targetID);
        e.handled = true;
      } else {
        return false;
      }
    });

    $sortableFields.on('change', '.prev-holder input, .prev-holder select', function (e) {
      if (e.target.classList.contains('other-option')) {
        return;
      }
      var field = $(e.target).closest('li.form-field')[0];
      if (utils.inArray(field.type, ['select', 'checkbox-group', 'radio-group'])) {
        field.querySelector('[class="option-value"][value="' + e.target.value + '"]').parentElement.childNodes[0].checked = true;
      } else {
        document.getElementById('value-' + field.id).value = e.target.value;
      }

      _helpers.save();
    });

    // update preview to label
    $sortableFields.on('keyup change', '[name="label"]', function (e) {
      $('.field-label', $(e.target).closest('li')).text($(e.target).val());
    });

    // remove error styling when users tries to correct mistake
    $sortableFields.delegate('input.error', 'keyup', function (e) {
      $(e.target).removeClass('error');
    });

    // update preview for description
    $sortableFields.on('keyup', 'input[name="description"]', function (e) {
      var $field = $(e.target).parents('.form-field:eq(0)');
      var closestToolTip = $('.tooltip-element', $field);
      var ttVal = $(e.target).val();
      if (ttVal !== '') {
        if (!closestToolTip.length) {
          var tt = '<span class="tooltip-element" tooltip="' + ttVal + '">?</span>';
          $('.field-label', $field).after(tt);
        } else {
          closestToolTip.attr('tooltip', ttVal).css('display', 'inline-block');
        }
      } else {
        if (closestToolTip.length) {
          closestToolTip.css('display', 'none');
        }
      }
    });

    $sortableFields.on('change', '.fld-multiple', function (e) {
      var newType = e.target.checked ? 'checkbox' : 'radio';

      $(e.target).parents('.form-elements:eq(0)').find('.sortable-options input.option-selected').each(function () {
        e.target.type = newType;
      });
    });

    // format name attribute
    $sortableFields.on('blur', 'input.fld-name', function (e) {
      e.target.value = _helpers.safename(e.target.value);
      if (e.target.value === '') {
        $(e.target).addClass('field-error').attr('placeholder', opts.messages.cannotBeEmpty);
      } else {
        $(e.target).removeClass('field-error');
      }
    });

    $sortableFields.on('blur', 'input.fld-maxlength', function (e) {
      e.target.value = _helpers.forceNumber(e.target.value);
    });

    // Copy field
    $sortableFields.on('click touchstart', '.icon-copy', function (e) {
      e.preventDefault();
      var currentItem = $(e.target).parent().parent('li');
      var $clone = cloneItem(currentItem);
      $clone.insertAfter(currentItem);
      _helpers.updatePreview($clone);
      _helpers.save();
    });

    // Delete field
    $sortableFields.on('click touchstart', '.delete-confirm', function (e) {
      e.preventDefault();

      var buttonPosition = e.target.getBoundingClientRect();
      var bodyRect = document.body.getBoundingClientRect();
      var coords = {
        pageX: buttonPosition.left + buttonPosition.width / 2,
        pageY: buttonPosition.top - bodyRect.top - 12
      };

      var deleteID = $(e.target).parents('.form-field:eq(0)').attr('id');
      var $field = $(document.getElementById(deleteID));

      document.addEventListener('modalClosed', function () {
        $field.removeClass('deleting');
      }, false);

      // Check if user is sure they want to remove the field
      if (opts.fieldRemoveWarn) {
        var warnH3 = utils.markup('h3', opts.messages.warning);
        var warnMessage = utils.markup('p', opts.messages.fieldRemoveWarning);
        _helpers.confirm([warnH3, warnMessage], function () {
          return _helpers.removeField(deleteID);
        }, coords);
        $field.addClass('deleting');
      } else {
        _helpers.removeField(deleteID);
      }
    });

    // Update button style selection
    $sortableFields.on('click', '.style-wrap button', function (e) {
      var $button = $(e.target);
      var styleVal = $button.val();
      var $btnStyle = $button.parent().prev('.btn-style');
      $btnStyle.val(styleVal);
      $button.siblings('.btn').removeClass('active');
      $button.addClass('active');
      _helpers.updatePreview($btnStyle.closest('.form-field'));
      _helpers.save();
    });

    // Attach a callback to toggle required asterisk
    $sortableFields.on('click', '.fld-required', function (e) {
      $(e.target).closest('.form-field').find('.required-asterisk').toggle();
    });

    // Attach a callback to toggle roles visibility
    $sortableFields.on('click', 'input.fld-access', function (e) {
      var roles = $(e.target).closest('.form-field').find('.available-roles');
      var enableRolesCB = $(e.target);
      roles.slideToggle(250, function () {
        if (!enableRolesCB.is(':checked')) {
          $('input[type="checkbox"]', roles).removeAttr('checked');
        }
      });
    });

    // Attach a callback to add new options
    $sortableFields.on('click', '.add-opt', function (e) {
      e.preventDefault();
      var $optionWrap = $(e.target).closest('.field-options');
      var $multiple = $('[name="multiple"]', $optionWrap);
      var $firstOption = $('.option-selected:eq(0)', $optionWrap);
      var isMultiple = false;

      if ($multiple.length) {
        isMultiple = $multiple.prop('checked');
      } else {
        isMultiple = $firstOption.attr('type') === 'checkbox';
      }

      var name = $firstOption.attr('name');

      $('.sortable-options', $optionWrap).append(selectFieldOptions(name, false, isMultiple));
    });

    $sortableFields.on('mouseover mouseout', '.remove, .del-button', function (e) {
      return $(e.target).closest('.form-field').toggleClass('delete');
    });

    if (opts.showActionButtons) {
      // View XML
      var xmlButton = $(document.getElementById(frmbID + '-view-data'));
      xmlButton.click(function (e) {
        e.preventDefault();
        _helpers.showData();
      });

      // Clear all fields in form editor
      var clearButton = $(document.getElementById(frmbID + '-clear-all'));
      clearButton.click(function (e) {
        var fields = $('li.form-field');
        var buttonPosition = e.target.getBoundingClientRect();
        var bodyRect = document.body.getBoundingClientRect();
        var coords = {
          pageX: buttonPosition.left + buttonPosition.width / 2,
          pageY: buttonPosition.top - bodyRect.top - 12
        };

        if (fields.length) {
          _helpers.confirm(opts.messages.clearAllMessage, function () {
            _helpers.removeAllfields();
            opts.notify.success(opts.messages.allFieldsRemoved);
            _helpers.save();
          }, coords);
        } else {
          _helpers.dialog('There are no fields to clear', coords);
        }
      });

      // Save Idea Template
      $(document.getElementById(frmbID + '-save')).click(function (e) {
        e.preventDefault();
        _helpers.save();
      });
    }

    _helpers.getData();
    loadFields();

    $sortableFields.css('min-height', $cbUL.height());

    // If option set, controls will remain in view in editor
    if (opts.stickyControls) {
      _helpers.stickyControls($sortableFields);
    }

    document.dispatchEvent(formBuilder.events.loaded);

    // Make actions accessible
    formBuilder.actions = {
      clearFields: _helpers.removeAllfields,
      showData: _helpers.showData,
      save: _helpers.save,
      addField: function addField(field, index) {
        _helpers.stopIndex = formBuilder.stage.children.length ? index : undefined;
        prepFieldVars(field);
        document.dispatchEvent(formBuilder.events.fieldAdded);
      },
      removeField: _helpers.removeField,
      setData: function setData(formData) {
        _helpers.removeAllfields();
        _helpers.getData(formData);
        loadFields();
      }
    };

    return formBuilder;
  };

  $.fn.formBuilder = function (options) {
    if (!options) {
      options = {};
    }
    var elems = this;
    return elems.each(function (i) {
      var formBuilder = new FormBuilder(options, elems[i]);
      $(elems[i]).data('formBuilder', formBuilder);

      return formBuilder;
    });
  };
})(jQuery);

},{"./helpers.js":3,"./kc-toggle.js":4,"./polyfills.js":5,"./utils.js":6}],3:[function(require,module,exports){
'use strict';

/**
 * Helper functions specific to formBuilder.
 * Called form formBuilder
 * @param  {Object}   opts
 * @param  {Instance} formBuilder
 * @return {Object} helper functions
 */
function helpers(opts, formBuilder) {
  var _helpers = {
    doCancel: false
  };

  var utils = require('./utils.js');
  formBuilder.events = require('./events.js');

  /**
   * Convert converts messy `cl#ssNames` into valid `class-names`
   *
   * @param  {String} str
   * @return {String} hyphenated string
   */
  _helpers.makeClassName = function (str) {
    str = str.replace(/[^\w\s\-]/gi, '');
    return utils.hyphenCase(str);
  };

  /**
   * Add a mobile class
   * @todo find css only solution
   * @return {String} Mobile class added to formBuilder
   */
  _helpers.mobileClass = function () {
    var mobileClass = '';
    (function (a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
        mobileClass = ' fb-mobile';
      }
    })(navigator.userAgent || navigator.vendor || window.opera);
    return mobileClass;
  };

  /**
   * Callback for when a drag begins
   *
   * @param  {Object} event
   * @param  {Object} ui
   */
  _helpers.startMoving = function (event, ui) {
    ui.item.show().addClass('moving');
    _helpers.startIndex = $('li', this).index(ui.item);
  };

  /**
   * Callback for when a drag ends
   *
   * @param  {Object} event
   * @param  {Object} ui
   */
  _helpers.stopMoving = function (event, ui) {
    ui.item.removeClass('moving');
    if (_helpers.doCancel) {
      $(ui.sender).sortable('cancel');
      $(this).sortable('cancel');
    }
    _helpers.save();
    _helpers.doCancel = false;
  };

  /**
   * jQuery UI sortable beforeStop callback used for both lists.
   * Logic for canceling the sort or drop.
   * @param  {Object} event
   * @param  {Object} ui
   * @return {void}
   */
  _helpers.beforeStop = function (event, ui) {
    var form = document.getElementById(formBuilder.formID);
    var lastIndex = form.children.length - 1;
    var cancelArray = [];
    _helpers.stopIndex = ui.placeholder.index() - 1;

    if (!opts.sortableControls && ui.item.parent().hasClass('frmb-control')) {
      cancelArray.push(true);
    }

    if (opts.prepend) {
      cancelArray.push(_helpers.stopIndex === 0);
    }

    if (opts.append) {
      cancelArray.push(_helpers.stopIndex + 1 === lastIndex);
    }

    _helpers.doCancel = cancelArray.some(function (elem) {
      return elem === true;
    });
  };

  /**
   * Make strings safe to be used as classes
   *
   * @param  {String} str string to be converted
   * @return {String}     converter string
   */
  _helpers.safename = function (str) {
    return str.replace(/\s/g, '-').replace(/[^a-zA-Z0-9\-]/g, '').toLowerCase();
  };

  /**
   * Strips non-numbers from a number only input
   *
   * @param  {string} str string with possible number
   * @return {string}     string without numbers
   */
  _helpers.forceNumber = function (str) {
    return str.replace(/[^0-9]/g, '');
  };

  /**
   * hide and show mouse tracking tooltips, only used for disabled
   * fields in the editor.
   *
   * @todo   remove or refactor to make better use
   * @param  {Object} tt jQuery option with nexted tooltip
   * @return {void}
   */
  _helpers.initTooltip = function (tt) {
    var tooltip = tt.find('.tooltip');
    tt.mouseenter(function () {
      if (tooltip.outerWidth() > 200) {
        tooltip.addClass('max-width');
      }
      tooltip.css('left', tt.width() + 14);
      tooltip.stop(true, true).fadeIn('fast');
    }).mouseleave(function () {
      tt.find('.tooltip').stop(true, true).fadeOut('fast');
    });
    tooltip.hide();
  };

  /**
   * Attempts to get element type and subtype
   *
   * @param  {Object} $field
   * @return {Object} {type: 'fieldType', subtype: 'fieldSubType'}
   */
  _helpers.getTypes = function ($field) {
    var types = {
      type: $field.attr('type')
    };
    var subtype = $('.fld-subtype', $field).val();

    if (subtype !== types.type) {
      types.subtype = subtype;
    }

    return types;
  };

  /**
   * Get option data for a field
   * @param  {Object} field jQuery field object
   * @return {Array}        Array of option values
   */
  _helpers.fieldOptionData = function (field) {
    var options = [];

    $('.sortable-options li', field).each(function () {
      var $option = $(this);
      var selected = $('.option-selected', $option).is(':checked');
      var attrs = {
        label: $('.option-label', $option).val(),
        value: $('.option-value', $option).val()
      };

      if (selected) {
        attrs.selected = selected;
      }

      options.push(attrs);
    });

    return options;
  };

  /**
   * XML save
   *
   * @param  {Object} form sortableFields node
   * @return {String} xml in string
   */
  _helpers.xmlSave = function (form) {
    var m = utils.markup;
    var formData = _helpers.prepData(form);
    var xml = ['<form-template>\n\t<fields>'];

    utils.forEach(formData, function (fieldIndex, field) {
      var fieldContent = null;

      // Handle options
      if (field.type.match(/(select|checkbox-group|radio-group)/)) {
        var optionData = field.values;
        var options = [];

        for (var i = 0; i < optionData.length; i++) {
          var option = m('option', optionData[i].label, optionData[i]).outerHTML;
          options.push('\n\t\t\t' + option);
        }
        options.push('\n\t\t');

        fieldContent = options.join('');
        delete field.values;
      }

      var xmlField = m('field', fieldContent, field);
      xml.push('\n\t\t' + xmlField.outerHTML);
    });

    xml.push('\n\t</fields>\n</form-template>');

    return xml.join('');
  };

  _helpers.prepData = function (form) {
    var formData = [];

    if (form.childNodes.length !== 0) {
      // build data object
      utils.forEach(form.childNodes, function (index, field) {
        var $field = $(field);

        if (!$field.hasClass('disabled')) {
          (function () {
            var fieldData = _helpers.getTypes($field);
            var roleVals = $('.roles-field:checked', field).map(function () {
              return this.value;
            }).get();

            $('[class*="fld-"]', field).each(function () {
              var attr = this;
              var name = utils.camelCase(attr.name);
              fieldData[name] = attr.type === 'checkbox' ? attr.checked : attr.value;
            });

            if (roleVals.length) {
              fieldData.role = roleVals.join(',');
            }

            fieldData.className = fieldData.className || fieldData.class;

            var match = /(?:^|\s)btn-(.*?)(?:\s|$)/g.exec(fieldData.className);
            if (match) {
              fieldData.style = match[1];
            }

            fieldData = utils.trimObj(fieldData);
            fieldData = utils.escapeAttrs(fieldData);

            var multipleField = fieldData.type.match(/(select|checkbox-group|radio-group)/);

            if (multipleField) {
              fieldData.values = _helpers.fieldOptionData($field);
            }

            formData.push(fieldData);
          })();
        }
      });
    }

    return formData;
  };

  _helpers.jsonSave = function (form) {
    return window.JSON.stringify(_helpers.prepData(form), null, '\t');
  };

  _helpers.getData = function (formData) {
    var data = formData || opts.formData;

    if (!data) {
      return false;
    }

    var setData = {
      xml: function xml(formData) {
        return utils.parseXML(formData);
      },
      json: function json(formData) {
        return window.JSON.parse(formData);
      }
    };

    formBuilder.formData = setData[opts.dataType](data) || [];

    return formBuilder.formData;
  };

  /**
   * Saves and returns formData
   * @return {XML|JSON} formData
   */
  _helpers.save = function () {
    var form = document.getElementById(formBuilder.formID);

    var doSave = {
      xml: _helpers.xmlSave,
      json: _helpers.jsonSave
    };

    // save action for current `dataType`
    formBuilder.formData = doSave[opts.dataType](form);

    // trigger formSaved event
    document.dispatchEvent(formBuilder.events.formSaved);
    return formBuilder.formData;
  };

  /**
   * increments the field ids with support for multiple editors
   * @param  {String} id field ID
   * @return {String}    incremented field ID
   */
  _helpers.incrementId = function (id) {
    var split = id.lastIndexOf('-');
    var newFieldNumber = parseInt(id.substring(split + 1)) + 1;
    var baseString = id.substring(0, split);

    return baseString + '-' + newFieldNumber;
  };

  /**
   * Collect field attribute values and call fieldPreview to generate preview
   * @param  {Object} field DOM element
   */
  _helpers.updatePreview = function (field) {
    var fieldClass = field.attr('class');
    if (fieldClass.indexOf('ui-sortable-handle') !== -1) {
      return;
    }

    var fieldType = $(field).attr('type');
    var $prevHolder = $('.prev-holder', field);
    var previewData = {
      type: fieldType
    };
    var preview = void 0;

    $('[class*="fld-"]', field).each(function () {
      var name = utils.camelCase(this.name);
      previewData[name] = this.type === 'checkbox' ? this.checked : this.value;
    });

    var style = $('.btn-style', field).val();
    if (style) {
      previewData.style = style;
    }

    if (fieldType.match(/(select|checkbox-group|radio-group)/)) {
      previewData.values = [];
      previewData.multiple = $('[name="multiple"]', field).is(':checked');

      $('.sortable-options li', field).each(function () {
        var option = {};
        option.selected = $('.option-selected', this).is(':checked');
        option.value = $('.option-value', this).val();
        option.label = $('.option-label', this).val();
        previewData.values.push(option);
      });
    }

    previewData = utils.trimObj(previewData);

    previewData.className = _helpers.classNames(field, previewData);
    $('.fld-className', field).val(previewData.className);

    field.data('fieldData', previewData);
    preview = utils.fieldRender(previewData, opts, true);

    $prevHolder.html(preview);

    $('input[toggle]', $prevHolder).kcToggle();
  };

  _helpers.debounce = function (func) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
    var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var timeout = void 0;
    return function () {
      var context = this;
      var args = arguments;
      var later = function later() {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  };

  /**
   * Display a custom tooltip for disabled fields.
   *
   * @param  {Object} field
   */
  _helpers.disabledTT = {
    className: 'frmb-tt',
    add: function add(field) {
      var title = opts.messages.fieldNonEditable;

      if (title) {
        var tt = utils.markup('p', title, { className: _helpers.disabledTT.className });
        field.append(tt);
      }
    },
    remove: function remove(field) {
      $('.frmb-tt', field).remove();
    }
  };

  _helpers.classNames = function (field, previewData) {
    var i = void 0;
    var type = previewData.type;
    var style = previewData.style;
    var className = field[0].querySelector('.fld-className').value;
    var classes = className.split(' ');
    var types = {
      button: 'btn',
      submit: 'btn'
    };

    var primaryType = types[type];

    if (primaryType) {
      if (style) {
        for (i = 0; i < classes.length; i++) {
          var re = new RegExp('(?:^|s)' + primaryType + '-(.*?)(?:s|$)+', 'g');
          var match = classes[i].match(re);
          if (match) {
            classes.splice(i, 1);
          }
        }
        classes.push(primaryType + '-' + style);
      }
      classes.push(primaryType);
    }

    // reverse the array to put custom classes at end,
    // remove any duplicates, convert to string, remove whitespace
    return utils.unique(classes).join(' ').trim();
  };

  /**
   * Closes and open dialog
   *
   * @param  {Object} overlay Existing overlay if there is one
   * @param  {Object} dialog  Existing dialog
   */
  _helpers.closeConfirm = function (overlay, dialog) {
    if (!overlay) {
      overlay = document.getElementsByClassName('form-builder-overlay')[0];
    }
    if (!dialog) {
      dialog = document.getElementsByClassName('form-builder-dialog')[0];
    }
    overlay.classList.remove('visible');
    dialog.remove();
    overlay.remove();
    document.dispatchEvent(formBuilder.events.modalClosed);
  };

  /**
   * Returns the layout data based on controlPosition option
   * @param  {String} controlPosition 'left' or 'right'
   * @return {Object} layout object
   */
  _helpers.editorLayout = function (controlPosition) {
    var layoutMap = {
      left: {
        stage: 'pull-right',
        controls: 'pull-left'
      },
      right: {
        stage: 'pull-left',
        controls: 'pull-right'
      }
    };

    return layoutMap[controlPosition] ? layoutMap[controlPosition] : '';
  };

  /**
   * Adds overlay to the page. Used for modals.
   * @return {Object} DOM Object
   */
  _helpers.showOverlay = function () {
    var overlay = utils.markup('div', null, {
      className: 'form-builder-overlay'
    });
    document.body.appendChild(overlay);
    overlay.classList.add('visible');

    overlay.onclick = function () {
      _helpers.closeConfirm(overlay);
    };

    return overlay;
  };

  /**
   * Custom confirmation dialog
   *
   * @param  {Object}  message   Content to be displayed in the dialog
   * @param  {Func}  yesAction callback to fire if they confirm
   * @param  {Boolean} coords    location to put the dialog
   * @param  {String}  className Custom class to be added to the dialog
   * @return {Object}            Reference to the modal
   */
  _helpers.confirm = function (message, yesAction) {
    var coords = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var className = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    var m = utils.markup;
    var overlay = _helpers.showOverlay();
    var yes = m('button', opts.messages.yes, {
      className: 'yes btn btn-success btn-sm'
    });
    var no = m('button', opts.messages.no, {
      className: 'no btn btn-danger btn-sm'
    });

    no.onclick = function () {
      _helpers.closeConfirm(overlay);
    };

    yes.onclick = function () {
      yesAction();
      _helpers.closeConfirm(overlay);
    };

    var btnWrap = m('div', [no, yes], { className: 'button-wrap' });

    className = 'form-builder-dialog ' + className;

    var miniModal = m('div', [message, btnWrap], { className: className });
    if (!coords) {
      coords = {
        pageX: Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 2,
        pageY: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 2
      };
      miniModal.style.position = 'fixed';
    } else {
      miniModal.classList.add('positioned');
    }

    miniModal.style.left = coords.pageX + 'px';
    miniModal.style.top = coords.pageY + 'px';

    document.body.appendChild(miniModal);

    yes.focus();
    return miniModal;
  };

  /**
   * Popup dialog the does not require confirmation.
   * @param  {String|DOM|Array}  content
   * @param  {Boolean} coords    false if no coords are provided. Without coordinates
   *                             the popup will appear center screen.
   * @param  {String}  className classname to be added to the dialog
   * @return {Object}            dom
   */
  _helpers.dialog = function (content) {
    var coords = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    _helpers.showOverlay();

    className = 'form-builder-dialog ' + className;

    var miniModal = utils.markup('div', content, { className: className });
    if (!coords) {
      coords = {
        pageX: Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 2,
        pageY: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 2
      };
      miniModal.style.position = 'fixed';
    } else {
      miniModal.classList.add('positioned');
    }

    miniModal.style.left = coords.pageX + 'px';
    miniModal.style.top = coords.pageY + 'px';

    document.body.appendChild(miniModal);

    document.dispatchEvent(formBuilder.events.modalOpened);

    if (className.indexOf('data-dialog') !== -1) {
      document.dispatchEvent(formBuilder.events.viewData);
    }

    return miniModal;
  };

  /**
   * Removes all fields from the form
   */
  _helpers.removeAllfields = function () {
    var form = document.getElementById(formBuilder.formID);
    var fields = form.querySelectorAll('li.form-field');
    var $fields = $(fields);
    var markEmptyArray = [];

    if (!fields.length) {
      return false;
    }

    if (opts.prepend) {
      markEmptyArray.push(true);
    }

    if (opts.append) {
      markEmptyArray.push(true);
    }

    if (!markEmptyArray.some(function (elem) {
      return elem === true;
    })) {
      form.parentElement.classList.add('empty');
      form.parentElement.dataset.content = opts.messages.getStarted;
    }

    form.classList.add('removing');

    var outerHeight = 0;
    $fields.each(function (i) {
      outerHeight += $($fields[i]).outerHeight() + 3;
    });

    fields[0].style.marginTop = -outerHeight + 'px';

    setTimeout(function () {
      $fields.remove();
      document.getElementById(formBuilder.formID).classList.remove('removing');
      _helpers.save();
    }, 400);
  };

  /**
   * If user re-orders the elements their order should be saved.
   *
   * @param {Object} $cbUL our list of elements
   */
  _helpers.setFieldOrder = function ($cbUL) {
    if (!opts.sortableControls) {
      return false;
    }
    var fieldOrder = {};
    $cbUL.children().each(function (index, element) {
      fieldOrder[index] = $(element).data('attrs').type;
    });
    if (window.sessionStorage) {
      window.sessionStorage.setItem('fieldOrder', window.JSON.stringify(fieldOrder));
    }
  };

  /**
   * Reorder the controls if the user has previously ordered them.
   *
   * @param  {Array} frmbFields
   * @return {Array} ordered fields
   */
  _helpers.orderFields = function (frmbFields) {
    var fieldOrder = false;
    var newOrderFields = [];

    if (window.sessionStorage) {
      if (opts.sortableControls) {
        fieldOrder = window.sessionStorage.getItem('fieldOrder');
      } else {
        window.sessionStorage.removeItem('fieldOrder');
      }
    }

    if (!fieldOrder) {
      var controlOrder = opts.controlOrder.concat(frmbFields.map(function (field) {
        return field.attrs.type;
      }));
      fieldOrder = utils.unique(controlOrder);
    } else {
      fieldOrder = window.JSON.parse(fieldOrder);
      fieldOrder = Object.keys(fieldOrder).map(function (i) {
        return fieldOrder[i];
      });
    }

    fieldOrder.forEach(function (fieldType) {
      var field = frmbFields.filter(function (field) {
        return field.attrs.type === fieldType;
      })[0];
      newOrderFields.push(field);
    });

    return newOrderFields.filter(Boolean);
  };

  /**
   * Close fields being editing
   * @param  {Object} stage
   */
  _helpers.closeAllEdit = function () {
    var fields = $('> li.editing', formBuilder.stage);
    var toggleBtns = $('.toggle-form', formBuilder.stage);
    var editPanels = $('.frm-holder', fields);

    toggleBtns.removeClass('open');
    fields.removeClass('editing');
    $('.prev-holder', fields).show();
    editPanels.hide();
  };

  /**
   * Toggles the edit mode for the given field
   * @param  {String} fieldId
   * @param  {Boolean} animate
   */
  _helpers.toggleEdit = function (fieldId) {
    var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var field = document.getElementById(fieldId);
    var toggleBtn = $('.toggle-form', field);
    var editPanel = $('.frm-holder', field);
    field.classList.toggle('editing');
    toggleBtn.toggleClass('open');
    if (animate) {
      $('.prev-holder', field).slideToggle(250);
      editPanel.slideToggle(250);
    } else {
      $('.prev-holder', field).toggle();
      editPanel.toggle();
    }
  };

  /**
   * Controls follow scroll to the bottom of the editor
   */
  _helpers.stickyControls = function () {
    var $cbWrap = $(formBuilder.controls).parent();
    var $stageWrap = $(formBuilder.stage).parent();
    var cbWidth = $cbWrap.width();
    var cbPosition = formBuilder.controls.getBoundingClientRect();

    $(window).scroll(function (evt) {
      var scrollTop = $(evt.target).scrollTop();

      if (scrollTop > $stageWrap.offset().top) {
        var cbStyle = {
          position: 'fixed',
          width: cbWidth,
          top: '5px',
          bottom: 'auto',
          right: 'auto',
          left: cbPosition.left
        };

        var cbOffset = $cbWrap.offset();
        var stageOffset = $stageWrap.offset();
        var cbBottom = cbOffset.top + $cbWrap.height();
        var stageBottom = stageOffset.top + $stageWrap.height();

        if (cbBottom > stageBottom && cbOffset.top !== stageOffset.top) {
          $cbWrap.css({
            position: 'absolute',
            top: 'auto',
            bottom: 0,
            right: 0,
            left: 'auto'
          });
        }

        if (cbBottom < stageBottom || cbBottom === stageBottom && cbOffset.top > scrollTop) {
          $cbWrap.css(cbStyle);
        }
      } else {
        formBuilder.controls.parentElement.removeAttribute('style');
      }
    });
  };

  /**
   * Open a dialog with the form's data
   */
  _helpers.showData = function () {
    var m = utils.markup;
    var data = utils.escapeHtml(formBuilder.formData);
    var code = m('code', data, { className: 'formData-' + opts.dataType });

    _helpers.dialog(m('pre', code), null, 'data-dialog');
  };

  /**
   * Remove a field from the stage
   * @param  {String}  fieldID ID of the field to be removed
   * @return {Boolean} fieldRemoved returns true if field is removed
   */
  _helpers.removeField = function (fieldID) {
    var fieldRemoved = false;
    var form = document.getElementById(formBuilder.formID);
    var fields = form.getElementsByClassName('form-field');

    if (!fields.length) {
      console.warn('No fields to remove');
      return false;
    }

    if (!fieldID) {
      var availableIds = [].slice.call(fields).map(function (field) {
        return field.id;
      });
      console.warn('fieldID required to use `removeField` action.');
      console.warn('Available IDs: ' + availableIds.join(', '));
    }

    var field = document.getElementById(fieldID);
    var $field = $(document.getElementById(fieldID));
    if (!field) {
      console.warn('Field not found');
      return false;
    }

    $field.slideUp(250, function () {
      $field.removeClass('deleting');
      $field.remove();
      fieldRemoved = true;
      _helpers.save();
      if (!form.childNodes.length) {
        var stageWrap = form.parentElement;
        stageWrap.classList.add('empty');
        stageWrap.dataset.content = opts.messages.getStarted;
      }
    });

    document.dispatchEvent(formBuilder.events.fieldRemoved);
    return fieldRemoved;
  };

  return _helpers;
}

module.exports = helpers;

},{"./events.js":1,"./utils.js":6}],4:[function(require,module,exports){
'use strict';

var kcToggle = function kcToggle() {
  var Toggle = function Toggle(element, options) {
    var defaults = {
      theme: 'fresh',
      messages: {
        off: 'Off',
        on: 'On'
      }
    };

    var opts = $.extend(defaults, options);
    var $kcToggle = $('<div class="kc-toggle"/>').insertAfter(element).append(element);

    $kcToggle.toggleClass('on', element.is(':checked'));

    var kctOn = '<div class="kct-on">' + opts.messages.on + '</div>';
    var kctOff = '<div class="kct-off">' + opts.messages.off + '</div>';
    var kctHandle = '<div class="kct-handle"></div>';
    var kctInner = '<div class="kct-inner">' + kctOn + kctHandle + kctOff + '</div>';

    $kcToggle.append(kctInner);

    $kcToggle.click(function (evt) {
      element.attr('checked', !element.attr('checked'));
      $kcToggle.toggleClass('on');
    });
  };

  jQuery.fn.kcToggle = function (options) {
    var toggle = this;
    return toggle.each(function (i) {
      var element = $(toggle[i]);
      if (element.data('kcToggle')) {
        return;
      }
      var kcToggle = new Toggle(element, options);
      element.data('kcToggle', kcToggle);
    });
  };
};

module.exports = kcToggle();

},{}],5:[function(require,module,exports){
'use strict';

/**
 * Polyfills for older browsers and added functionality
 * @return {void}
 */
function polyfills() {
  // Element.remove() polyfill
  if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  }

  // Event polyfill
  if (typeof Event !== 'function') {
    (function () {
      window.Event = function (evt) {
        var event = document.createEvent('Event');
        event.initEvent(evt, true, true);
        return event;
      };
    })();
  }

  // Object.assign polyfill
  if (typeof Object.assign != 'function') {
    Object.assign = function (target) {
      'use strict';

      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      target = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source != null) {
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
      }
      return target;
    };
  }
}

module.exports = polyfills();

},{}],6:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Cross file utilities for working with arrays,
 * sorting and other fun stuff
 * @return {Object} fbUtils
 */
// function utils() {
var fbUtils = {};

// cleaner syntax for testing indexOf element
fbUtils.inArray = function (needle, haystack) {
  return haystack.indexOf(needle) !== -1;
};

/**
 * Remove null or undefined values
 * @param  {Object} attrs {attrName: attrValue}
 * @return {Object}       Object trimmed of null or undefined values
 */
fbUtils.trimObj = function (attrs) {
  var xmlRemove = [null, undefined, '', false, 'false'];
  for (var attr in attrs) {
    if (fbUtils.inArray(attrs[attr], xmlRemove)) {
      delete attrs[attr];
    } else if (Array.isArray(attrs[attr])) {
      if (!attrs[attr].length) {
        delete attrs[attr];
      }
    }
  }

  return attrs;
};

/**
 * Test if attribute is a valid HTML attribute
 * @param  {String} attr
 * @return {Boolean}
 */
fbUtils.validAttr = function (attr) {
  var invalid = ['values', 'enableOther', 'other', 'label',
  // 'style',
  'subtype'];
  return !fbUtils.inArray(attr, invalid);
};

/**
 * Convert an attrs object into a string
 *
 * @param  {Object} attrs object of attributes for markup
 * @return {string}
 */
fbUtils.attrString = function (attrs) {
  var attributes = [];

  for (var attr in attrs) {
    if (attrs.hasOwnProperty(attr) && fbUtils.validAttr(attr)) {
      attr = fbUtils.safeAttr(attr, attrs[attr]);
      attributes.push(attr.name + attr.value);
    }
  }
  return attributes.join(' ');
};

/**
 * Convert attributes to markup safe strings
 * @param  {String} name  attribute name
 * @param  {String} value attribute value
 * @return {Object}       {attrName: attrValue}
 */
fbUtils.safeAttr = function (name, value) {
  name = fbUtils.safeAttrName(name);
  var valString = void 0;

  if (value) {
    if (Array.isArray(value)) {
      valString = fbUtils.escapeAttr(value.join(' '));
    } else {
      if (typeof value === 'boolean') {
        value = value.toString();
      }
      valString = fbUtils.escapeAttr(value.replace(',', ' ').trim());
    }
  }

  value = value ? '="' + valString + '"' : '';
  return {
    name: name,
    value: value
  };
};

fbUtils.safeAttrName = function (name) {
  var safeAttr = {
    className: 'class'
  };

  return safeAttr[name] || fbUtils.hyphenCase(name);
};

/**
 * Convert strings into lowercase-hyphen
 *
 * @param  {String} str
 * @return {String}
 */
fbUtils.hyphenCase = function (str) {
  str = str.replace(/[^\w\s\-]/gi, '');
  str = str.replace(/([A-Z])/g, function ($1) {
    return '-' + $1.toLowerCase();
  });

  return str.replace(/\s/g, '-').replace(/^-+/g, '');
};

/**
 * convert a hyphenated string to camelCase
 * @param  {String} str
 * @return {String}
 */
fbUtils.camelCase = function (str) {
  return str.replace(/-([a-z])/g, function (m, w) {
    return w.toUpperCase();
  });
};

/**
 * Generate markup wrapper where needed
 *
 * @param  {string}              tag
 * @param  {String|Array|Object} content we wrap this
 * @param  {Object}              attrs
 * @return {String}
 */
fbUtils.markup = function (tag) {
  var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var contentType = void 0,
      field = document.createElement(tag),
      getContentType = function getContentType(content) {
    return Array.isArray(content) ? 'array' : typeof content === 'undefined' ? 'undefined' : _typeof(content);
  },
      appendContent = {
    string: function string(content) {
      field.innerHTML = content;
    },
    object: function object(content) {
      return field.appendChild(content);
    },
    array: function array(content) {
      for (var i = 0; i < content.length; i++) {
        contentType = getContentType(content[i]);
        appendContent[contentType](content[i]);
      }
    }
  };

  for (var attr in attrs) {
    if (attrs.hasOwnProperty(attr)) {
      var name = fbUtils.safeAttrName(attr);
      field.setAttribute(name, attrs[attr]);
    }
  }

  contentType = getContentType(content);

  if (content) {
    appendContent[contentType].call(this, content);
  }

  return field;
};

/**
 * Convert html element attributes to key/value object
 * @param  {Object} DOM element
 * @return {Object} ex: {attrName: attrValue}
 */
fbUtils.parseAttrs = function (elem) {
  var attrs = elem.attributes;
  var data = {};
  fbUtils.forEach(attrs, function (attr) {
    var attrVal = attrs[attr].value;
    if (attrVal.match(/false|true/g)) {
      attrVal = attrVal === 'true';
    } else if (attrVal.match(/undefined/g)) {
      attrVal = undefined;
    }

    if (attrVal) {
      data[attrs[attr].name] = attrVal;
    }
  });

  return data;
};

/**
 * Convert field options to optionData
 * @param  {Object} DOM element
 * @return {Array}      optionData array
 */
fbUtils.parseOptions = function (field) {
  var options = field.getElementsByTagName('option'),
      optionData = {},
      data = [];

  if (options.length) {
    for (var i = 0; i < options.length; i++) {
      optionData = fbUtils.parseAttrs(options[i]);
      optionData.label = options[i].textContent;
      data.push(optionData);
    }
  }

  return data;
};

/**
 * Parse XML formData
 * @param  {String} xmlString
 * @return {Array}            formData array
 */
fbUtils.parseXML = function (xmlString) {
  var parser = new window.DOMParser();
  var xml = parser.parseFromString(xmlString, 'text/xml'),
      formData = [];

  if (xml) {
    var fields = xml.getElementsByTagName('field');
    for (var i = 0; i < fields.length; i++) {
      var fieldData = fbUtils.parseAttrs(fields[i]);

      if (fields[i].children.length) {
        fieldData.values = fbUtils.parseOptions(fields[i]);
      }

      formData.push(fieldData);
    }
  }

  return formData;
};

/**
 * Escape markup so it can be displayed rather than rendered
 * @param  {String} html markup
 * @return {String}      escaped html
 */
fbUtils.escapeHtml = function (html) {
  var escapeElement = document.createElement('textarea');
  escapeElement.textContent = html;
  return escapeElement.innerHTML;
};

// Escape an attribute
fbUtils.escapeAttr = function (str) {
  var match = {
    '"': '&quot;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  };

  var replaceTag = function replaceTag(tag) {
    return match[tag] || tag;
  };

  return typeof str === 'string' ? str.replace(/["&<>]/g, replaceTag) : str;
};

// Escape attributes
fbUtils.escapeAttrs = function (attrs) {
  for (var attr in attrs) {
    if (attrs.hasOwnProperty(attr)) {
      attrs[attr] = fbUtils.escapeAttr(attrs[attr]);
    }
  }

  return attrs;
};

// forEach that can be used on nodeList
fbUtils.forEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]); // passes back stuff we need
  }
};

/**
 * Remove duplicates from an array of elements
 * @param  {Array} arrArg array with possible duplicates
 * @return {Array}        array with only unique values
 */
fbUtils.unique = function (array) {
  return array.filter(function (elem, pos, arr) {
    return arr.indexOf(elem) === pos;
  });
};

/**
 * Generate preview markup
 * @param  {Object}  fieldData
 * @param  {Object}  opts
 * @param  {Boolean} preview
 * @return {String}  preview markup for field
 */
fbUtils.fieldRender = function (fieldData, opts) {
  var preview = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var fieldMarkup = '';
  var fieldLabel = '';
  var optionsMarkup = '';
  var fieldLabelText = fieldData.label || '';
  var fieldDesc = fieldData.description || '';
  var fieldRequired = '';
  var fieldOptions = fieldData.values;

  fieldData.name = preview ? fieldData.name + '-preview' : fieldData.name;
  fieldData.id = fieldData.name;
  if (fieldData.multiple) {
    fieldData.name = fieldData.name + '[]';
  }

  fieldData.type = fieldData.subtype || fieldData.type;

  if (fieldData.required) {
    fieldData.required = null;
    fieldData['aria-required'] = 'true';
    fieldRequired = '<span class="required">*</span>';
  }

  if (fieldData.type !== 'hidden') {
    if (fieldDesc) {
      fieldDesc = '<span class="tooltip-element" tooltip="' + fieldDesc + '">?</span>';
    }
    fieldLabel = '<label for="' + fieldData.id + '" class="fb-' + fieldData.type + '-label">' + fieldLabelText + ' ' + fieldRequired + ' ' + fieldDesc + '</label>';
  }

  var fieldLabelVal = fieldData.label;

  delete fieldData.label;
  delete fieldData.description;

  var fieldDataString = fbUtils.attrString(fieldData);

  switch (fieldData.type) {
    case 'textarea':
    case 'rich-text':
      delete fieldData.type;
      var fieldVal = fieldData.value || '';
      fieldMarkup = fieldLabel + '<textarea ' + fieldDataString + '>' + fieldVal + '</textarea>';
      break;
    case 'select':
      var optionAttrsString = void 0;
      fieldData.type = fieldData.type.replace('-group', '');

      if (fieldOptions) {
        if (fieldData.placeholder) {
          optionsMarkup += '<option disabled selected>' + fieldData.placeholder + '</option>';
        }

        for (var i = 0; i < fieldOptions.length; i++) {
          if (!fieldOptions[i].selected || fieldData.placeholder) {
            delete fieldOptions[i].selected;
          }
          if (!fieldOptions[i].label) {
            fieldOptions[i].label = '';
          }
          optionAttrsString = fbUtils.attrString(fieldOptions[i]);
          optionsMarkup += '<option ' + optionAttrsString + '>' + fieldOptions[i].label + '</option>';
        }
      }

      fieldMarkup = fieldLabel + '<select ' + fieldDataString + '>' + optionsMarkup + '</select>';
      break;
    case 'checkbox-group':
    case 'radio-group':
      var optionAttrs = void 0;
      fieldData.type = fieldData.type.replace('-group', '');

      if (fieldData.type === 'checkbox') {
        fieldData.name = fieldData.name + '[]';
      }

      if (fieldOptions) {
        var _optionAttrsString = void 0;

        for (var _i = 0; _i < fieldOptions.length; _i++) {
          optionAttrs = Object.assign({ value: '', label: '' }, fieldData, fieldOptions[_i]);

          if (optionAttrs.selected) {
            delete optionAttrs.selected;
            optionAttrs.checked = null;
          }

          optionAttrs.id = fieldData.id + '-' + _i;
          _optionAttrsString = fbUtils.attrString(optionAttrs);
          optionsMarkup += '<input ' + _optionAttrsString + ' /> <label for="' + optionAttrs.id + '">' + optionAttrs.label + '</label><br>';
        }

        if (fieldData.other) {
          var otherOptionAttrs = {
            id: fieldData.id + '-' + 'other',
            className: fieldData.className + ' other-option',
            onclick: 'fbUtils.otherOptionCB(\'' + fieldData.id + '-other\')'
          };

          _optionAttrsString = fbUtils.attrString(Object.assign({}, fieldData, otherOptionAttrs));

          optionsMarkup += '<input ' + _optionAttrsString + ' /> <label for="' + otherOptionAttrs.id + '">' + opts.messages.other + '</label> <input type="text" name="' + fieldData.name + '" id="' + otherOptionAttrs.id + '-value" style="display:none;" />';
        }
      }
      fieldMarkup = fieldLabel + '<div class="' + fieldData.type + '-group">' + optionsMarkup + '</div>';
      break;
    case 'text':
    case 'password':
    case 'email':
    case 'number':
    case 'file':
    case 'hidden':
    case 'date':
    case 'tel':
    case 'autocomplete':
      fieldMarkup = fieldLabel + ' <input ' + fieldDataString + '>';
      break;
    case 'color':
      fieldMarkup = fieldLabel + ' <input ' + fieldDataString + '> ' + opts.messages.selectColor;
      break;
    case 'button':
    case 'submit':
      fieldMarkup = '<button ' + fieldDataString + '>' + fieldLabelVal + '</button>';
      break;
    case 'checkbox':
      fieldMarkup = '<input ' + fieldDataString + '> ' + fieldLabel;

      if (fieldData.toggle) {
        setTimeout(function () {
          $(document.getElementById(fieldData.id)).kcToggle();
        }, 100);
      }
      break;
    default:
      fieldMarkup = '<' + fieldData.type + ' ' + fieldDataString + '>' + fieldLabelVal + '</' + fieldData.type + '>';
  }

  if (fieldData.type !== 'hidden') {
    var className = fieldData.id ? 'fb-' + fieldData.type + ' form-group field-' + fieldData.id : '';
    fieldMarkup = fbUtils.markup('div', fieldMarkup, {
      className: className
    });
  } else {
    fieldMarkup = fbUtils.markup('input', null, fieldData);
  }

  return fieldMarkup;
};

/**
 * Callback for other option.
 * Toggles the hidden text area for "other" option.
 * @param  {String} otherId id of the "other" option input
 */
fbUtils.otherOptionCB = function (otherId) {
  var otherInput = document.getElementById(otherId);
  var otherInputValue = document.getElementById(otherId + '-value');

  if (otherInput.checked) {
    otherInput.style.display = 'none';
    otherInputValue.style.display = 'inline-block';
  } else {
    otherInput.style.display = 'inline-block';
    otherInputValue.style.display = 'none';
  }
};

/**
 * Capitalizes a string
 * @param  {String} str uncapitalized string
 * @return {String} str capitalized string
 */
fbUtils.capitalize = function (str) {
  return str.replace(/\b\w/g, function (m) {
    return m.toUpperCase();
  });
};
//   return fbUtils;
// }

module.exports = fbUtils;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZXZlbnRzLmpzIiwic3JjL2pzL2Zvcm0tYnVpbGRlci5qcyIsInNyYy9qcy9oZWxwZXJzLmpzIiwic3JjL2pzL2tjLXRvZ2dsZS5qcyIsInNyYy9qcy9wb2x5ZmlsbHMuanMiLCJzcmMvanMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBSUE7QUFDRSxJQUFNLFNBQVMsRUFBZjs7QUFFQSxPQUFPLE1BQVAsR0FBZ0IsSUFBSSxLQUFKLENBQVUsUUFBVixDQUFoQjtBQUNBLE9BQU8sUUFBUCxHQUFrQixJQUFJLEtBQUosQ0FBVSxVQUFWLENBQWxCO0FBQ0EsT0FBTyxZQUFQLEdBQXNCLElBQUksS0FBSixDQUFVLGNBQVYsQ0FBdEI7QUFDQSxPQUFPLFdBQVAsR0FBcUIsSUFBSSxLQUFKLENBQVUsYUFBVixDQUFyQjtBQUNBLE9BQU8sV0FBUCxHQUFxQixJQUFJLEtBQUosQ0FBVSxhQUFWLENBQXJCO0FBQ0EsT0FBTyxTQUFQLEdBQW1CLElBQUksS0FBSixDQUFVLFdBQVYsQ0FBbkI7QUFDQSxPQUFPLFVBQVAsR0FBb0IsSUFBSSxLQUFKLENBQVUsWUFBVixDQUFwQjtBQUNBLE9BQU8sWUFBUCxHQUFzQixJQUFJLEtBQUosQ0FBVSxjQUFWLENBQXRCOztBQUVGO0FBQ0E7O0FBRUEsT0FBTyxPQUFQLEdBQWlCLE1BQWpCOzs7OztBQ25CQSxRQUFRLGdCQUFSO0FBQ0EsUUFBUSxnQkFBUjs7QUFFQSxDQUFDLFVBQVMsQ0FBVCxFQUFZO0FBQ1gsTUFBTSxjQUFjLFNBQWQsV0FBYyxDQUFTLE9BQVQsRUFBa0IsT0FBbEIsRUFBMkI7QUFBQTs7QUFDN0MsUUFBSSxjQUFjLElBQWxCOztBQUVBLFFBQUksV0FBVztBQUNiLHVCQUFpQixPQURKO0FBRWIsb0JBQWMsQ0FDWixjQURZLEVBRVosUUFGWSxFQUdaLFVBSFksRUFJWixnQkFKWSxF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bGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEZvcm0gQnVpbGRlciBldmVudHNcbiAqIEByZXR1cm4ge09iamVjdH0gdmFyaW91cyBldmVudHMgdG8gYmUgdHJpZ2dlclxuICovXG4vLyBmdW5jdGlvbiBmYkV2ZW50cygpe1xuICBjb25zdCBldmVudHMgPSB7fTtcblxuICBldmVudHMubG9hZGVkID0gbmV3IEV2ZW50KCdsb2FkZWQnKTtcbiAgZXZlbnRzLnZpZXdEYXRhID0gbmV3IEV2ZW50KCd2aWV3RGF0YScpO1xuICBldmVudHMudXNlckRlY2xpbmVkID0gbmV3IEV2ZW50KCd1c2VyRGVjbGluZWQnKTtcbiAgZXZlbnRzLm1vZGFsQ2xvc2VkID0gbmV3IEV2ZW50KCdtb2RhbENsb3NlZCcpO1xuICBldmVudHMubW9kYWxPcGVuZWQgPSBuZXcgRXZlbnQoJ21vZGFsT3BlbmVkJyk7XG4gIGV2ZW50cy5mb3JtU2F2ZWQgPSBuZXcgRXZlbnQoJ2Zvcm1TYXZlZCcpO1xuICBldmVudHMuZmllbGRBZGRlZCA9IG5ldyBFdmVudCgnZmllbGRBZGRlZCcpO1xuICBldmVudHMuZmllbGRSZW1vdmVkID0gbmV3IEV2ZW50KCdmaWVsZFJlbW92ZWQnKTtcblxuLy8gICByZXR1cm4gZXZlbnRzO1xuLy8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV2ZW50cztcbiIsInJlcXVpcmUoJy4va2MtdG9nZ2xlLmpzJyk7XG5yZXF1aXJlKCcuL3BvbHlmaWxscy5qcycpO1xuXG4oZnVuY3Rpb24oJCkge1xuICBjb25zdCBGb3JtQnVpbGRlciA9IGZ1bmN0aW9uKG9wdGlvbnMsIGVsZW1lbnQpIHtcbiAgICBsZXQgZm9ybUJ1aWxkZXIgPSB0aGlzO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgY29udHJvbFBvc2l0aW9uOiAncmlnaHQnLFxuICAgICAgY29udHJvbE9yZGVyOiBbXG4gICAgICAgICdhdXRvY29tcGxldGUnLFxuICAgICAgICAnYnV0dG9uJyxcbiAgICAgICAgJ2NoZWNrYm94JyxcbiAgICAgICAgJ2NoZWNrYm94LWdyb3VwJyxcbiAgICAgICAgJ2RhdGUnLFxuICAgICAgICAnZmlsZScsXG4gICAgICAgICdoZWFkZXInLFxuICAgICAgICAnaGlkZGVuJyxcbiAgICAgICAgJ3BhcmFncmFwaCcsXG4gICAgICAgICdudW1iZXInLFxuICAgICAgICAncmFkaW8tZ3JvdXAnLFxuICAgICAgICAnc2VsZWN0JyxcbiAgICAgICAgJ3RleHQnLFxuICAgICAgICAndGV4dGFyZWEnXG4gICAgICBdLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIC8vIEFycmF5IG9mIGZpZWxkcyB0byBkaXNhYmxlXG4gICAgICBkaXNhYmxlRmllbGRzOiBbXSxcbiAgICAgIGVkaXRPbkFkZDogZmFsc2UsXG4gICAgICAvLyBVbmVkaXRhYmxlIGZpZWxkcyBvciBvdGhlciBjb250ZW50IHlvdSB3b3VsZCBsaWtlIHRvIGFwcGVhclxuICAgICAgLy8gYmVmb3JlIGFuZCBhZnRlciByZWd1bGFyIGZpZWxkczpcbiAgICAgIGFwcGVuZDogZmFsc2UsXG4gICAgICBwcmVwZW5kOiBmYWxzZSxcbiAgICAgIC8vIGFycmF5IG9mIG9iamVjdHMgd2l0aCBmaWVsZHMgdmFsdWVzXG4gICAgICAvLyBleDpcbiAgICAgIC8vIGRlZmF1bHRGaWVsZHM6IFt7XG4gICAgICAvLyAgIGxhYmVsOiAnRmlyc3QgTmFtZScsXG4gICAgICAvLyAgIG5hbWU6ICdmaXJzdC1uYW1lJyxcbiAgICAgIC8vICAgcmVxdWlyZWQ6ICd0cnVlJyxcbiAgICAgIC8vICAgZGVzY3JpcHRpb246ICdZb3VyIGZpcnN0IG5hbWUnLFxuICAgICAgLy8gICB0eXBlOiAndGV4dCdcbiAgICAgIC8vIH0sIHtcbiAgICAgIC8vICAgbGFiZWw6ICdQaG9uZScsXG4gICAgICAvLyAgIG5hbWU6ICdwaG9uZScsXG4gICAgICAvLyAgIGRlc2NyaXB0aW9uOiAnSG93IGNhbiB3ZSByZWFjaCB5b3U/JyxcbiAgICAgIC8vICAgdHlwZTogJ3RleHQnXG4gICAgICAvLyB9XSxcbiAgICAgIGRlZmF1bHRGaWVsZHM6IFtdLFxuICAgICAgaW5wdXRTZXRzOiBbXSxcbiAgICAgIGZpZWxkUmVtb3ZlV2FybjogZmFsc2UsXG4gICAgICByb2xlczoge1xuICAgICAgICAxOiAnQWRtaW5pc3RyYXRvcidcbiAgICAgIH0sXG4gICAgICBtZXNzYWdlczoge1xuICAgICAgICBhZGRPcHRpb246ICdBZGQgT3B0aW9uICsnLFxuICAgICAgICBhbGxGaWVsZHNSZW1vdmVkOiAnQWxsIGZpZWxkcyB3ZXJlIHJlbW92ZWQuJyxcbiAgICAgICAgYWxsb3dNdWx0aXBsZUZpbGVzOiAnQWxsb3cgdXNlcnMgdG8gdXBsb2FkIG11bHRpcGxlIGZpbGVzJyxcbiAgICAgICAgYXV0b2NvbXBsZXRlOiAnQXV0b2NvbXBsZXRlJyxcbiAgICAgICAgYnV0dG9uOiAnQnV0dG9uJyxcbiAgICAgICAgY2Fubm90QmVFbXB0eTogJ1RoaXMgZmllbGQgY2Fubm90IGJlIGVtcHR5JyxcbiAgICAgICAgY2hlY2tib3hHcm91cDogJ0NoZWNrYm94IEdyb3VwJyxcbiAgICAgICAgY2hlY2tib3g6ICdDaGVja2JveCcsXG4gICAgICAgIGNoZWNrYm94ZXM6ICdDaGVja2JveGVzJyxcbiAgICAgICAgY2xhc3NOYW1lOiAnQ2xhc3MnLFxuICAgICAgICBjbGVhckFsbE1lc3NhZ2U6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2xlYXIgYWxsIGZpZWxkcz8nLFxuICAgICAgICBjbGVhckFsbDogJ0NsZWFyJyxcbiAgICAgICAgY2xvc2U6ICdDbG9zZScsXG4gICAgICAgIGNvbnRlbnQ6ICdDb250ZW50JyxcbiAgICAgICAgY29weTogJ0NvcHkgVG8gQ2xpcGJvYXJkJyxcbiAgICAgICAgY29weUJ1dHRvbjogJyYjNDM7JyxcbiAgICAgICAgY29weUJ1dHRvblRvb2x0aXA6ICdDb3B5JyxcbiAgICAgICAgZGF0ZUZpZWxkOiAnRGF0ZSBGaWVsZCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnSGVscCBUZXh0JyxcbiAgICAgICAgZGVzY3JpcHRpb25GaWVsZDogJ0Rlc2NyaXB0aW9uJyxcbiAgICAgICAgZGV2TW9kZTogJ0RldmVsb3BlciBNb2RlJyxcbiAgICAgICAgZWRpdE5hbWVzOiAnRWRpdCBOYW1lcycsXG4gICAgICAgIGVkaXRvclRpdGxlOiAnRm9ybSBFbGVtZW50cycsXG4gICAgICAgIGVkaXRYTUw6ICdFZGl0IFhNTCcsXG4gICAgICAgIGVuYWJsZU90aGVyOiAnRW5hYmxlICZxdW90O090aGVyJnF1b3Q7JyxcbiAgICAgICAgZW5hYmxlT3RoZXJNc2c6ICdMZXQgdXNlcnMgdG8gZW50ZXIgYW4gdW5saXN0ZWQgb3B0aW9uJyxcbiAgICAgICAgZmllbGREZWxldGVXYXJuaW5nOiBmYWxzZSxcbiAgICAgICAgZmllbGRWYXJzOiAnRmllbGQgVmFyaWFibGVzJyxcbiAgICAgICAgZmllbGROb25FZGl0YWJsZTogJ1RoaXMgZmllbGQgY2Fubm90IGJlIGVkaXRlZC4nLFxuICAgICAgICBmaWVsZFJlbW92ZVdhcm5pbmc6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcmVtb3ZlIHRoaXMgZmllbGQ/JyxcbiAgICAgICAgZmlsZVVwbG9hZDogJ0ZpbGUgVXBsb2FkJyxcbiAgICAgICAgZm9ybVVwZGF0ZWQ6ICdGb3JtIFVwZGF0ZWQnLFxuICAgICAgICBnZXRTdGFydGVkOiAnRHJhZyBhIGZpZWxkIGZyb20gdGhlIHJpZ2h0IHRvIHRoaXMgYXJlYScsXG4gICAgICAgIGhlYWRlcjogJ0hlYWRlcicsXG4gICAgICAgIGhpZGU6ICdFZGl0JyxcbiAgICAgICAgaGlkZGVuOiAnSGlkZGVuIElucHV0JyxcbiAgICAgICAgbGFiZWw6ICdMYWJlbCcsXG4gICAgICAgIGxhYmVsRW1wdHk6ICdGaWVsZCBMYWJlbCBjYW5ub3QgYmUgZW1wdHknLFxuICAgICAgICBsaW1pdFJvbGU6ICdMaW1pdCBhY2Nlc3MgdG8gb25lIG9yIG1vcmUgb2YgdGhlIGZvbGxvd2luZyByb2xlczonLFxuICAgICAgICBtYW5kYXRvcnk6ICdNYW5kYXRvcnknLFxuICAgICAgICBtYXhsZW5ndGg6ICdNYXggTGVuZ3RoJyxcbiAgICAgICAgbWluT3B0aW9uTWVzc2FnZTogJ1RoaXMgZmllbGQgcmVxdWlyZXMgYSBtaW5pbXVtIG9mIDIgb3B0aW9ucycsXG4gICAgICAgIG11bHRpcGxlRmlsZXM6ICdNdWx0aXBsZSBGaWxlcycsXG4gICAgICAgIG5hbWU6ICdOYW1lJyxcbiAgICAgICAgbm86ICdObycsXG4gICAgICAgIG51bWJlcjogJ051bWJlcicsXG4gICAgICAgIG9mZjogJ09mZicsXG4gICAgICAgIG9uOiAnT24nLFxuICAgICAgICBvcHRpb246ICdPcHRpb24nLFxuICAgICAgICBvcHRpb25hbDogJ29wdGlvbmFsJyxcbiAgICAgICAgb3B0aW9uTGFiZWxQbGFjZWhvbGRlcjogJ0xhYmVsJyxcbiAgICAgICAgb3B0aW9uVmFsdWVQbGFjZWhvbGRlcjogJ1ZhbHVlJyxcbiAgICAgICAgb3B0aW9uRW1wdHk6ICdPcHRpb24gdmFsdWUgcmVxdWlyZWQnLFxuICAgICAgICBvdGhlcjogJ090aGVyJyxcbiAgICAgICAgcGFyYWdyYXBoOiAnUGFyYWdyYXBoJyxcbiAgICAgICAgcGxhY2Vob2xkZXI6ICdQbGFjZWhvbGRlcicsXG4gICAgICAgIHBsYWNlaG9sZGVyczoge1xuICAgICAgICAgIHZhbHVlOiAnVmFsdWUnLFxuICAgICAgICAgIGxhYmVsOiAnTGFiZWwnLFxuICAgICAgICAgIHRleHQ6ICcnLFxuICAgICAgICAgIHRleHRhcmVhOiAnJyxcbiAgICAgICAgICBlbWFpbDogJ0VudGVyIHlvdSBlbWFpbCcsXG4gICAgICAgICAgcGxhY2Vob2xkZXI6ICcnLFxuICAgICAgICAgIGNsYXNzTmFtZTogJ3NwYWNlIHNlcGFyYXRlZCBjbGFzc2VzJyxcbiAgICAgICAgICBwYXNzd29yZDogJ0VudGVyIHlvdXIgcGFzc3dvcmQnXG4gICAgICAgIH0sXG4gICAgICAgIHByZXZpZXc6ICdQcmV2aWV3JyxcbiAgICAgICAgcmFkaW9Hcm91cDogJ1JhZGlvIEdyb3VwJyxcbiAgICAgICAgcmFkaW86ICdSYWRpbycsXG4gICAgICAgIHJlbW92ZU1lc3NhZ2U6ICdSZW1vdmUgRWxlbWVudCcsXG4gICAgICAgIHJlbW92ZU9wdGlvbjogJ1JlbW92ZSBPcHRpb24nLFxuICAgICAgICByZW1vdmU6ICcmIzIxNTsnLFxuICAgICAgICByZXF1aXJlZDogJ1JlcXVpcmVkJyxcbiAgICAgICAgcmljaFRleHQ6ICdSaWNoIFRleHQgRWRpdG9yJyxcbiAgICAgICAgcm9sZXM6ICdBY2Nlc3MnLFxuICAgICAgICByb3dzOiAnUm93cycsXG4gICAgICAgIHNhdmU6ICdTYXZlJyxcbiAgICAgICAgc2VsZWN0T3B0aW9uczogJ09wdGlvbnMnLFxuICAgICAgICBzZWxlY3Q6ICdTZWxlY3QnLFxuICAgICAgICBzZWxlY3RDb2xvcjogJ1NlbGVjdCBDb2xvcicsXG4gICAgICAgIHNlbGVjdGlvbnNNZXNzYWdlOiAnQWxsb3cgTXVsdGlwbGUgU2VsZWN0aW9ucycsXG4gICAgICAgIHNpemU6ICdTaXplJyxcbiAgICAgICAgc2l6ZXM6IHtcbiAgICAgICAgICB4czogJ0V4dHJhIFNtYWxsJyxcbiAgICAgICAgICBzbTogJ1NtYWxsJyxcbiAgICAgICAgICBtOiAnRGVmYXVsdCcsXG4gICAgICAgICAgbGc6ICdMYXJnZSdcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6ICdTdHlsZScsXG4gICAgICAgIHN0eWxlczoge1xuICAgICAgICAgIGJ0bjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiAnRGVmYXVsdCcsXG4gICAgICAgICAgICBkYW5nZXI6ICdEYW5nZXInLFxuICAgICAgICAgICAgaW5mbzogJ0luZm8nLFxuICAgICAgICAgICAgcHJpbWFyeTogJ1ByaW1hcnknLFxuICAgICAgICAgICAgc3VjY2VzczogJ1N1Y2Nlc3MnLFxuICAgICAgICAgICAgd2FybmluZzogJ1dhcm5pbmcnXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzdWJ0eXBlOiAnVHlwZScsXG4gICAgICAgIHRleHQ6ICdUZXh0IEZpZWxkJyxcbiAgICAgICAgdGV4dEFyZWE6ICdUZXh0IEFyZWEnLFxuICAgICAgICB0b2dnbGU6ICdUb2dnbGUnLFxuICAgICAgICB3YXJuaW5nOiAnV2FybmluZyEnLFxuICAgICAgICB2YWx1ZTogJ1ZhbHVlJyxcbiAgICAgICAgdmlld0pTT046ICd7ICB9JyxcbiAgICAgICAgdmlld1hNTDogJyZsdDsvJmd0OycsXG4gICAgICAgIHllczogJ1llcydcbiAgICAgIH0sXG4gICAgICBub3RpZnk6IHtcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2FybmluZzogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgICAgIHJldHVybiBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzb3J0YWJsZUNvbnRyb2xzOiBmYWxzZSxcbiAgICAgIHN0aWNreUNvbnRyb2xzOiBmYWxzZSxcbiAgICAgIHNob3dBY3Rpb25CdXR0b25zOiB0cnVlLFxuICAgICAgdHlwZVVzZXJBdHRyczoge30sXG4gICAgICB0eXBlVXNlckV2ZW50czoge30sXG4gICAgICBwcmVmaXg6ICdmb3JtLWJ1aWxkZXItJ1xuICAgIH07XG5cbiAgICBjb25zdCB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMuanMnKTtcblxuICAgIGRlZmF1bHRzLm1lc3NhZ2VzLnN1YnR5cGVzID0gKCgpID0+IHtcbiAgICAgIGNvbnN0IHN1YnR5cGVEZWZhdWx0ID0gKHN1YnR5cGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBsYWJlbDogc3VidHlwZSxcbiAgICAgICAgICB2YWx1ZTogc3VidHlwZVxuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0ZXh0OiBbJ3RleHQnLCAncGFzc3dvcmQnLCAnZW1haWwnLCAnY29sb3InLCAndGVsJ11cbiAgICAgICAgICAubWFwKHN1YnR5cGVEZWZhdWx0KSxcbiAgICAgICAgICBoZWFkZXI6IFsnaDEnLCAnaDInLCAnaDMnXVxuICAgICAgICAgIC5tYXAoc3VidHlwZURlZmF1bHQpLFxuICAgICAgICAgIGJ1dHRvbjogWydidXR0b24nLCAnc3VibWl0JywgJ3Jlc2V0J11cbiAgICAgICAgICAubWFwKHN1YnR5cGVEZWZhdWx0KSxcbiAgICAgICAgICBwYXJhZ3JhcGg6IFsncCcsICdhZGRyZXNzJywgJ2Jsb2NrcXVvdGUnLCAnY2FudmFzJywgJ291dHB1dCddXG4gICAgICAgICAgLm1hcChzdWJ0eXBlRGVmYXVsdClcbiAgICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgbGV0IG9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgbGV0IGZybWJJRCA9ICdmcm1iLScgKyAkKCd1bFtpZF49ZnJtYi1dJykubGVuZ3RoKys7XG5cbiAgICBpZiAob3B0aW9ucy5tZXNzYWdlcykge1xuICAgICAgb3B0cy5tZXNzYWdlcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLm1lc3NhZ2VzLCBvcHRpb25zLm1lc3NhZ2VzKTtcbiAgICB9XG5cbiAgICBmb3JtQnVpbGRlci5mb3JtSUQgPSBmcm1iSUQ7XG5cbiAgICBsZXQgJHNvcnRhYmxlRmllbGRzID0gJCgnPHVsLz4nKS5hdHRyKCdpZCcsIGZybWJJRCkuYWRkQ2xhc3MoJ2ZybWInKTtcbiAgICBsZXQgX2hlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMuanMnKShvcHRzLCBmb3JtQnVpbGRlcik7XG5cbiAgICBmb3JtQnVpbGRlci5sYXlvdXQgPSBfaGVscGVycy5lZGl0b3JMYXlvdXQob3B0cy5jb250cm9sUG9zaXRpb24pO1xuICAgIGZvcm1CdWlsZGVyLnN0YWdlID0gJHNvcnRhYmxlRmllbGRzWzBdO1xuXG4gICAgbGV0IGxhc3RJRCA9IGZybWJJRCArICctZmxkLTEnO1xuICAgIGxldCBib3hJRCA9IGZybWJJRCArICctY29udHJvbC1ib3gnO1xuXG4gICAgLy8gY3JlYXRlIGFycmF5IG9mIGZpZWxkIG9iamVjdHMgdG8gY3ljbGUgdGhyb3VnaFxuICAgIGxldCBmcm1iRmllbGRzID0gW3tcbiAgICAgIGxhYmVsOiBvcHRzLm1lc3NhZ2VzLmF1dG9jb21wbGV0ZSxcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIHR5cGU6ICdhdXRvY29tcGxldGUnLFxuICAgICAgICBjbGFzc05hbWU6ICdhdXRvY29tcGxldGUnLFxuICAgICAgICBuYW1lOiAnYXV0b2NvbXBsZXRlJ1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGxhYmVsOiBvcHRzLm1lc3NhZ2VzLmJ1dHRvbixcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICBjbGFzc05hbWU6ICdidXR0b24taW5wdXQnLFxuICAgICAgICBuYW1lOiAnYnV0dG9uJ1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGxhYmVsOiBvcHRzLm1lc3NhZ2VzLmNoZWNrYm94LFxuICAgICAgYXR0cnM6IHtcbiAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAgICAgY2xhc3NOYW1lOiAnY2hlY2tib3gnLFxuICAgICAgICBuYW1lOiAnY2hlY2tib3gnXG4gICAgICB9XG4gICAgfSwge1xuICAgICAgbGFiZWw6IG9wdHMubWVzc2FnZXMuY2hlY2tib3hHcm91cCxcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIHR5cGU6ICdjaGVja2JveC1ncm91cCcsXG4gICAgICAgIGNsYXNzTmFtZTogJ2NoZWNrYm94LWdyb3VwJyxcbiAgICAgICAgbmFtZTogJ2NoZWNrYm94LWdyb3VwJ1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGxhYmVsOiBvcHRzLm1lc3NhZ2VzLmRhdGVGaWVsZCxcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIHR5cGU6ICdkYXRlJyxcbiAgICAgICAgY2xhc3NOYW1lOiAnY2FsZW5kYXInLFxuICAgICAgICBuYW1lOiAnZGF0ZS1pbnB1dCdcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBsYWJlbDogb3B0cy5tZXNzYWdlcy5maWxlVXBsb2FkLFxuICAgICAgYXR0cnM6IHtcbiAgICAgICAgdHlwZTogJ2ZpbGUnLFxuICAgICAgICBjbGFzc05hbWU6ICdmaWxlLWlucHV0JyxcbiAgICAgICAgbmFtZTogJ2ZpbGUtaW5wdXQnXG4gICAgICB9XG4gICAgfSwge1xuICAgICAgbGFiZWw6IG9wdHMubWVzc2FnZXMuaGVhZGVyLFxuICAgICAgYXR0cnM6IHtcbiAgICAgICAgdHlwZTogJ2hlYWRlcicsXG4gICAgICAgIGNsYXNzTmFtZTogJ2hlYWRlcidcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBsYWJlbDogb3B0cy5tZXNzYWdlcy5oaWRkZW4sXG4gICAgICBhdHRyczoge1xuICAgICAgICB0eXBlOiAnaGlkZGVuJyxcbiAgICAgICAgY2xhc3NOYW1lOiAnaGlkZGVuLWlucHV0JyxcbiAgICAgICAgbmFtZTogJ2hpZGRlbi1pbnB1dCdcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBsYWJlbDogb3B0cy5tZXNzYWdlcy5udW1iZXIsXG4gICAgICBhdHRyczoge1xuICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgY2xhc3NOYW1lOiAnbnVtYmVyJyxcbiAgICAgICAgbmFtZTogJ251bWJlcidcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBsYWJlbDogb3B0cy5tZXNzYWdlcy5wYXJhZ3JhcGgsXG4gICAgICBhdHRyczoge1xuICAgICAgICB0eXBlOiAncGFyYWdyYXBoJyxcbiAgICAgICAgY2xhc3NOYW1lOiAncGFyYWdyYXBoJ1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGxhYmVsOiBvcHRzLm1lc3NhZ2VzLnJhZGlvR3JvdXAsXG4gICAgICBhdHRyczoge1xuICAgICAgICB0eXBlOiAncmFkaW8tZ3JvdXAnLFxuICAgICAgICBjbGFzc05hbWU6ICdyYWRpby1ncm91cCcsXG4gICAgICAgIG5hbWU6ICdyYWRpby1ncm91cCdcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBsYWJlbDogb3B0cy5tZXNzYWdlcy5zZWxlY3QsXG4gICAgICBhdHRyczoge1xuICAgICAgICB0eXBlOiAnc2VsZWN0JyxcbiAgICAgICAgY2xhc3NOYW1lOiAnc2VsZWN0JyxcbiAgICAgICAgbmFtZTogJ3NlbGVjdCdcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBsYWJlbDogb3B0cy5tZXNzYWdlcy50ZXh0LFxuICAgICAgYXR0cnM6IHtcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICBjbGFzc05hbWU6ICd0ZXh0LWlucHV0JyxcbiAgICAgICAgbmFtZTogJ3RleHQtaW5wdXQnXG4gICAgICB9XG4gICAgfSwge1xuICAgICAgbGFiZWw6IG9wdHMubWVzc2FnZXMudGV4dEFyZWEsXG4gICAgICBhdHRyczoge1xuICAgICAgICB0eXBlOiAndGV4dGFyZWEnLFxuICAgICAgICBjbGFzc05hbWU6ICd0ZXh0LWFyZWEnLFxuICAgICAgICBuYW1lOiAndGV4dGFyZWEnXG4gICAgICB9XG4gICAgfV07XG5cbiAgICBmcm1iRmllbGRzID0gX2hlbHBlcnMub3JkZXJGaWVsZHMoZnJtYkZpZWxkcyk7XG5cbiAgICBpZiAob3B0cy5kaXNhYmxlRmllbGRzKSB7XG4gICAgICAvLyByZW1vdmUgZGlzYWJsZWRGaWVsZHNcbiAgICAgIGZybWJGaWVsZHMgPSBmcm1iRmllbGRzLmZpbHRlcihmdW5jdGlvbihmaWVsZCkge1xuICAgICAgICByZXR1cm4gIXV0aWxzLmluQXJyYXkoZmllbGQuYXR0cnMudHlwZSwgb3B0cy5kaXNhYmxlRmllbGRzKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBkcmFnZ2FibGUgZmllbGRzIGZvciBmb3JtQnVpbGRlclxuICAgIGxldCBjYlVsID0gdXRpbHMubWFya3VwKCd1bCcsIG51bGwsIHtpZDogYm94SUQsIGNsYXNzTmFtZTogJ2ZybWItY29udHJvbCd9KTtcbiAgICBmb3JtQnVpbGRlci5jb250cm9scyA9IGNiVWw7XG5cbiAgICBpZiAob3B0cy5zb3J0YWJsZUNvbnRyb2xzKSB7XG4gICAgICBjYlVsLmNsYXNzTGlzdC5hZGQoJ3NvcnQtZW5hYmxlZCcpO1xuICAgIH1cblxuICAgIGxldCAkY2JVTCA9ICQoY2JVbCk7XG5cbiAgICAvLyBMb29wIHRocm91Z2hcbiAgICB1dGlscy5mb3JFYWNoKGZybWJGaWVsZHMsIChpKSA9PiB7XG4gICAgICBsZXQgJGZpZWxkID0gJCgnPGxpLz4nLCB7XG4gICAgICAgICdjbGFzcyc6ICdpY29uLScgKyBmcm1iRmllbGRzW2ldLmF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgJ3R5cGUnOiBmcm1iRmllbGRzW2ldLnR5cGUsXG4gICAgICAgICduYW1lJzogZnJtYkZpZWxkc1tpXS5jbGFzc05hbWUsXG4gICAgICAgICdsYWJlbCc6IGZybWJGaWVsZHNbaV0ubGFiZWxcbiAgICAgIH0pO1xuXG4gICAgICAkZmllbGQuZGF0YSgnbmV3RmllbGREYXRhJywgZnJtYkZpZWxkc1tpXSk7XG5cbiAgICAgIGxldCB0eXBlTGFiZWwgPSB1dGlscy5tYXJrdXAoJ3NwYW4nLCBmcm1iRmllbGRzW2ldLmxhYmVsKTtcbiAgICAgICRmaWVsZC5odG1sKHR5cGVMYWJlbCkuYXBwZW5kVG8oJGNiVUwpO1xuICAgIH0pO1xuXG4gICAgaWYgKG9wdHMuaW5wdXRTZXRzLmxlbmd0aCkge1xuICAgICAgJCgnPGxpLz4nLCB7J2NsYXNzJzogJ2ZiLXNlcGFyYXRvcid9KS5odG1sKCc8aHI+JykuYXBwZW5kVG8oJGNiVUwpO1xuICAgICAgb3B0cy5pbnB1dFNldHMuZm9yRWFjaCgoc2V0KSA9PiB7XG4gICAgICAgIHNldC5uYW1lID0gc2V0Lm5hbWUgfHwgX2hlbHBlcnMubWFrZUNsYXNzTmFtZShzZXQubGFiZWwpO1xuICAgICAgICBsZXQgJHNldCA9ICQoJzxsaS8+JywgeydjbGFzcyc6ICdpbnB1dC1zZXQtY29udHJvbCcsIHR5cGU6IHNldC5uYW1lfSk7XG4gICAgICAgICRzZXQuaHRtbChzZXQubGFiZWwpLmFwcGVuZFRvKCRjYlVMKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFNvcnRhYmxlIGZpZWxkc1xuICAgICRzb3J0YWJsZUZpZWxkcy5zb3J0YWJsZSh7XG4gICAgICBjdXJzb3I6ICdtb3ZlJyxcbiAgICAgIG9wYWNpdHk6IDAuOSxcbiAgICAgIHJldmVydDogMTUwLFxuICAgICAgYmVmb3JlU3RvcDogX2hlbHBlcnMuYmVmb3JlU3RvcCxcbiAgICAgIHN0YXJ0OiBfaGVscGVycy5zdGFydE1vdmluZyxcbiAgICAgIHN0b3A6IF9oZWxwZXJzLnN0b3BNb3ZpbmcsXG4gICAgICBjYW5jZWw6ICdpbnB1dCwgc2VsZWN0LCAuZGlzYWJsZWQsIC5mb3JtLWdyb3VwLCAuYnRuJyxcbiAgICAgIHBsYWNlaG9sZGVyOiAnZnJtYi1wbGFjZWhvbGRlcidcbiAgICB9KTtcblxuICAgIC8vIENvbnRyb2xCb3ggd2l0aCBkaWZmZXJlbnQgZmllbGRzXG4gICAgJGNiVUwuc29ydGFibGUoe1xuICAgICAgaGVscGVyOiAnY2xvbmUnLFxuICAgICAgb3BhY2l0eTogMC45LFxuICAgICAgY29ubmVjdFdpdGg6ICRzb3J0YWJsZUZpZWxkcyxcbiAgICAgIGNhbmNlbDogJy5mYi1zZXBhcmF0b3InLFxuICAgICAgY3Vyc29yOiAnbW92ZScsXG4gICAgICBzY3JvbGw6IGZhbHNlLFxuICAgICAgcGxhY2Vob2xkZXI6ICd1aS1zdGF0ZS1oaWdobGlnaHQnLFxuICAgICAgc3RhcnQ6IF9oZWxwZXJzLnN0YXJ0TW92aW5nLFxuICAgICAgc3RvcDogX2hlbHBlcnMuc3RvcE1vdmluZyxcbiAgICAgIHJldmVydDogMTUwLFxuICAgICAgYmVmb3JlU3RvcDogX2hlbHBlcnMuYmVmb3JlU3RvcCxcbiAgICAgIGRpc3RhbmNlOiAzLFxuICAgICAgdXBkYXRlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcbiAgICAgICAgaWYgKF9oZWxwZXJzLmRvQ2FuY2VsKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1aS5pdGVtLnBhcmVudCgpWzBdID09PSAkc29ydGFibGVGaWVsZHNbMF0pIHtcbiAgICAgICAgICBwcm9jZXNzQ29udHJvbCh1aS5pdGVtKTtcbiAgICAgICAgICBfaGVscGVycy5kb0NhbmNlbCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX2hlbHBlcnMuc2V0RmllbGRPcmRlcigkY2JVTCk7XG4gICAgICAgICAgX2hlbHBlcnMuZG9DYW5jZWwgPSAhb3B0cy5zb3J0YWJsZUNvbnRyb2xzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgcHJvY2Vzc0NvbnRyb2wgPSAoY29udHJvbCkgPT4ge1xuICAgICAgaWYgKGNvbnRyb2xbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnB1dC1zZXQtY29udHJvbCcpKSB7XG4gICAgICAgIGxldCBpbnB1dFNldCA9IG9wdHMuaW5wdXRTZXRzLmZpbHRlcigoc2V0KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHNldC5uYW1lID09PSBjb250cm9sWzBdLnR5cGU7XG4gICAgICAgIH0pWzBdO1xuICAgICAgICBpZiAoaW5wdXRTZXQuc2hvd0hlYWRlcikge1xuICAgICAgICAgIGxldCBoZWFkZXIgPSB7XG4gICAgICAgICAgICAgIHR5cGU6ICdoZWFkZXInLFxuICAgICAgICAgICAgICBzdWJ0eXBlOiAnaDInLFxuICAgICAgICAgICAgICBpZDogaW5wdXRTZXQubmFtZSxcbiAgICAgICAgICAgICAgbGFiZWw6IGlucHV0U2V0LmxhYmVsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIHByZXBGaWVsZFZhcnMoaGVhZGVyLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpbnB1dFNldC5maWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IHtcbiAgICAgICAgICBwcmVwRmllbGRWYXJzKGZpZWxkLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcmVwRmllbGRWYXJzKGNvbnRyb2wsIHRydWUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsZXQgJGZvcm1XcmFwID0gJCgnPGRpdi8+Jywge1xuICAgICAgaWQ6IGZybWJJRCArICctZm9ybS13cmFwJyxcbiAgICAgICdjbGFzcyc6ICdmb3JtLXdyYXAgZm9ybS1idWlsZGVyJyArIF9oZWxwZXJzLm1vYmlsZUNsYXNzKClcbiAgICB9KTtcblxuICAgIGZvcm1CdWlsZGVyLmVkaXRvciA9ICRmb3JtV3JhcFswXTtcblxuICAgIGxldCAkc3RhZ2VXcmFwID0gJCgnPGRpdi8+Jywge1xuICAgICAgaWQ6IGZybWJJRCArICctc3RhZ2Utd3JhcCcsXG4gICAgICAnY2xhc3MnOiAnc3RhZ2Utd3JhcCAnICsgZm9ybUJ1aWxkZXIubGF5b3V0LnN0YWdlXG4gICAgfSk7XG5cbiAgICBsZXQgY2JXcmFwID0gJCgnPGRpdi8+Jywge1xuICAgICAgaWQ6IGZybWJJRCArICctY2Itd3JhcCcsXG4gICAgICAnY2xhc3MnOiAnY2Itd3JhcCAnICsgZm9ybUJ1aWxkZXIubGF5b3V0LmNvbnRyb2xzXG4gICAgfSkuYXBwZW5kKCRjYlVMWzBdKTtcblxuICAgIGlmIChvcHRzLnNob3dBY3Rpb25CdXR0b25zKSB7XG4gICAgICAvLyBCdWlsZCBvdXIgaGVhZGVycyBhbmQgYWN0aW9uIGxpbmtzXG4gICAgICBsZXQgdmlld0RhdGFUZXh0O1xuICAgICAgaWYob3B0cy5kYXRhVHlwZSA9PT0gJ3htbCcpIHtcbiAgICAgICAgdmlld0RhdGFUZXh0ID0gb3B0cy5tZXNzYWdlcy52aWV3WE1MO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmlld0RhdGFUZXh0ID0gb3B0cy5tZXNzYWdlcy52aWV3SlNPTjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHZpZXdEYXRhID0gdXRpbHMubWFya3VwKCdidXR0b24nLCB2aWV3RGF0YVRleHQsIHtcbiAgICAgICAgaWQ6IGZybWJJRCArICctdmlldy1kYXRhJyxcbiAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgIGNsYXNzTmFtZTogJ3ZpZXctZGF0YSBidG4gYnRuLWRlZmF1bHQnXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGNsZWFyQWxsID0gdXRpbHMubWFya3VwKCdidXR0b24nLCBvcHRzLm1lc3NhZ2VzLmNsZWFyQWxsLCB7XG4gICAgICAgIGlkOiBmcm1iSUQgKyAnLWNsZWFyLWFsbCcsXG4gICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICBjbGFzc05hbWU6ICdjbGVhci1hbGwgYnRuIGJ0bi1kZWZhdWx0J1xuICAgICAgfSk7XG4gICAgICBjb25zdCBzYXZlQWxsID0gdXRpbHMubWFya3VwKCdidXR0b24nLCBvcHRzLm1lc3NhZ2VzLnNhdmUsIHtcbiAgICAgICAgY2xhc3NOYW1lOiBgYnRuIGJ0bi1wcmltYXJ5ICR7b3B0cy5wcmVmaXh9c2F2ZWAsXG4gICAgICAgIGlkOiBmcm1iSUQgKyAnLXNhdmUnLFxuICAgICAgICB0eXBlOiAnYnV0dG9uJ1xuICAgICAgfSk7XG4gICAgICBjb25zdCBmb3JtQWN0aW9ucyA9IHV0aWxzLm1hcmt1cCgnZGl2JywgW2NsZWFyQWxsLCB2aWV3RGF0YSwgc2F2ZUFsbF0sIHtcbiAgICAgICAgY2xhc3NOYW1lOiAnZm9ybS1hY3Rpb25zIGJ0bi1ncm91cCdcbiAgICAgIH0pO1xuXG4gICAgICBjYldyYXAuYXBwZW5kKGZvcm1BY3Rpb25zKTtcbiAgICB9XG5cbiAgICAkc3RhZ2VXcmFwLmFwcGVuZCgkc29ydGFibGVGaWVsZHMsIGNiV3JhcCk7XG4gICAgJHN0YWdlV3JhcC5iZWZvcmUoJGZvcm1XcmFwKTtcbiAgICAkZm9ybVdyYXAuYXBwZW5kKCRzdGFnZVdyYXAsIGNiV3JhcCk7XG5cbiAgICBpZiAoZWxlbWVudC50eXBlICE9PSAndGV4dGFyZWEnKSB7XG4gICAgICAkKGVsZW1lbnQpLmFwcGVuZCgkZm9ybVdyYXApO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKGVsZW1lbnQpLnJlcGxhY2VXaXRoKCRmb3JtV3JhcCk7XG4gICAgfVxuXG4gICAgbGV0IHNhdmVBbmRVcGRhdGUgPSBfaGVscGVycy5kZWJvdW5jZShldnQgPT4ge1xuICAgICAgaWYgKGV2dCkge1xuICAgICAgICBpZiAoZXZ0LnR5cGUgPT09ICdrZXl1cCcgJiYgZXZ0LnRhcmdldC5uYW1lID09PSAnY2xhc3NOYW1lJykge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCAkZmllbGQgPSAkKGV2dC50YXJnZXQpLmNsb3Nlc3QoJy5mb3JtLWZpZWxkJyk7XG4gICAgICAgIF9oZWxwZXJzLnVwZGF0ZVByZXZpZXcoJGZpZWxkKTtcbiAgICAgICAgX2hlbHBlcnMuc2F2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gU2F2ZSBmaWVsZCBvbiBjaGFuZ2VcbiAgICAkc29ydGFibGVGaWVsZHMub24oJ2NoYW5nZSBibHVyIGtleXVwJywgJy5mb3JtLWVsZW1lbnRzIGlucHV0LCAuZm9ybS1lbGVtZW50cyBzZWxlY3QsIC5mb3JtLWVsZW1lbnRzIHRleHRhcmVhJywgc2F2ZUFuZFVwZGF0ZSk7XG5cbiAgICAkKCdsaScsICRjYlVMKS5jbGljayhmdW5jdGlvbihldnQpIHtcbiAgICAgIGxldCAkY29udHJvbCA9ICQoZXZ0LnRhcmdldCkuY2xvc2VzdCgnLnVpLXNvcnRhYmxlLWhhbmRsZScpO1xuICAgICAgX2hlbHBlcnMuc3RvcEluZGV4ID0gdW5kZWZpbmVkO1xuICAgICAgcHJvY2Vzc0NvbnRyb2woJGNvbnRyb2wpO1xuICAgICAgX2hlbHBlcnMuc2F2ZSgpO1xuICAgIH0pO1xuXG4gICAgLy8gQWRkIGFwcGVuZCBhbmQgcHJlcGVuZCBvcHRpb25zIGlmIG5lY2Vzc2FyeVxuICAgIGxldCBub25FZGl0YWJsZUZpZWxkcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgbGV0IGNhbmNlbEFycmF5ID0gW107XG5cbiAgICAgIGlmIChvcHRzLnByZXBlbmQgJiYgISQoJy5kaXNhYmxlZC5wcmVwZW5kJywgJHNvcnRhYmxlRmllbGRzKS5sZW5ndGgpIHtcbiAgICAgICAgbGV0IHByZXBlbmRlZEZpZWxkID0gdXRpbHMubWFya3VwKCdsaScsIG9wdHMucHJlcGVuZCwge2NsYXNzTmFtZTogJ2Rpc2FibGVkIHByZXBlbmQnfSk7XG4gICAgICAgIGNhbmNlbEFycmF5LnB1c2godHJ1ZSk7XG4gICAgICAgICRzb3J0YWJsZUZpZWxkcy5wcmVwZW5kKHByZXBlbmRlZEZpZWxkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdHMuYXBwZW5kICYmICEkKCcuZGlzYWJsZWQuYXBwZW5kJywgJHNvcnRhYmxlRmllbGRzKS5sZW5ndGgpIHtcbiAgICAgICAgbGV0IGFwcGVuZGVkRmllbGQgPSB1dGlscy5tYXJrdXAoJ2xpJywgb3B0cy5hcHBlbmQsIHtjbGFzc05hbWU6ICdkaXNhYmxlZCBhcHBlbmQnfSk7XG4gICAgICAgIGNhbmNlbEFycmF5LnB1c2godHJ1ZSk7XG4gICAgICAgICRzb3J0YWJsZUZpZWxkcy5hcHBlbmQoYXBwZW5kZWRGaWVsZCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjYW5jZWxBcnJheS5zb21lKGVsZW0gPT4gZWxlbSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgJHN0YWdlV3JhcC5yZW1vdmVDbGFzcygnZW1wdHknKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbGV0IHByZXBGaWVsZFZhcnMgPSBmdW5jdGlvbigkZmllbGQsIGlzTmV3ID0gZmFsc2UpIHtcbiAgICAgIGxldCBmaWVsZCA9IHt9O1xuICAgICAgaWYgKCRmaWVsZCBpbnN0YW5jZW9mIGpRdWVyeSkge1xuICAgICAgICBsZXQgZmllbGREYXRhID0gJGZpZWxkLmRhdGEoJ25ld0ZpZWxkRGF0YScpO1xuICAgICAgICBpZiAoZmllbGREYXRhKSB7XG4gICAgICAgICAgZmllbGQgPSBmaWVsZERhdGEuYXR0cnM7XG4gICAgICAgICAgZmllbGQubGFiZWwgPSBmaWVsZERhdGEubGFiZWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGF0dHJzID0gJGZpZWxkWzBdLmF0dHJpYnV0ZXM7XG4gICAgICAgICAgaWYgKCFpc05ldykge1xuICAgICAgICAgICAgZmllbGQudmFsdWVzID0gJGZpZWxkLmNoaWxkcmVuKCkubWFwKChpbmRleCwgZWxlbSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAkKGVsZW0pLnRleHQoKSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJChlbGVtKS5hdHRyKCd2YWx1ZScpLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBCb29sZWFuKCQoZWxlbSkuYXR0cignc2VsZWN0ZWQnKSlcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvciAobGV0IGkgPSBhdHRycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgZmllbGRbYXR0cnNbaV0ubmFtZV0gPSBhdHRyc1tpXS52YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpZWxkID0gT2JqZWN0LmFzc2lnbih7fSwgJGZpZWxkKTtcbiAgICAgIH1cblxuICAgICAgZmllbGQubmFtZSA9IGlzTmV3ID8gbmFtZUF0dHIoZmllbGQpIDogKCBmaWVsZC5uYW1lIHx8IG5hbWVBdHRyKGZpZWxkKSApO1xuXG4gICAgICBpZiAoaXNOZXcgJiYgdXRpbHMuaW5BcnJheShmaWVsZC50eXBlLCBbJ3RleHQnLCAnbnVtYmVyJywgJ2ZpbGUnLCAnc2VsZWN0JywgJ3RleHRhcmVhJ10pKSB7XG4gICAgICAgIGZpZWxkLmNsYXNzTmFtZSA9ICdmb3JtLWNvbnRyb2wnOyAvLyBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmllbGQuY2xhc3NOYW1lID0gZmllbGQuY2xhc3MgfHwgZmllbGQuY2xhc3NOYW1lOyAvLyBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAgICAgfVxuXG4gICAgICBsZXQgbWF0Y2ggPSAvKD86XnxcXHMpYnRuLSguKj8pKD86XFxzfCQpL2cuZXhlYyhmaWVsZC5jbGFzc05hbWUpO1xuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGZpZWxkLnN0eWxlID0gbWF0Y2hbMV07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmVzY2FwZUF0dHJzKGZpZWxkKTtcblxuICAgICAgYXBwZW5kTmV3RmllbGQoZmllbGQpO1xuICAgICAgaWYgKGlzTmV3KSB7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZm9ybUJ1aWxkZXIuZXZlbnRzLmZpZWxkQWRkZWQpO1xuICAgICAgfVxuICAgICAgJHN0YWdlV3JhcC5yZW1vdmVDbGFzcygnZW1wdHknKTtcbiAgICB9O1xuXG4gICAgLy8gUGFyc2Ugc2F2ZWQgWE1MIHRlbXBsYXRlIGRhdGFcbiAgICBsZXQgbG9hZEZpZWxkcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgbGV0IGZvcm1EYXRhID0gZm9ybUJ1aWxkZXIuZm9ybURhdGE7XG4gICAgICBpZiAoZm9ybURhdGEgJiYgZm9ybURhdGEubGVuZ3RoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybURhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBwcmVwRmllbGRWYXJzKGZvcm1EYXRhW2ldKTtcbiAgICAgICAgfVxuICAgICAgICAkc3RhZ2VXcmFwLnJlbW92ZUNsYXNzKCdlbXB0eScpO1xuICAgICAgfSBlbHNlIGlmIChvcHRzLmRlZmF1bHRGaWVsZHMgJiYgb3B0cy5kZWZhdWx0RmllbGRzLmxlbmd0aCkge1xuICAgICAgICAvLyBMb2FkIGRlZmF1bHQgZmllbGRzIGlmIG5vbmUgYXJlIHNldFxuICAgICAgICBvcHRzLmRlZmF1bHRGaWVsZHMuZm9yRWFjaChmaWVsZCA9PiBwcmVwRmllbGRWYXJzKGZpZWxkKSk7XG4gICAgICAgICRzdGFnZVdyYXAucmVtb3ZlQ2xhc3MoJ2VtcHR5Jyk7XG4gICAgICB9IGVsc2UgaWYgKCFvcHRzLnByZXBlbmQgJiYgIW9wdHMuYXBwZW5kKSB7XG4gICAgICAgICRzdGFnZVdyYXAuYWRkQ2xhc3MoJ2VtcHR5JylcbiAgICAgICAgLmF0dHIoJ2RhdGEtY29udGVudCcsIG9wdHMubWVzc2FnZXMuZ2V0U3RhcnRlZCk7XG4gICAgICB9XG4gICAgICBfaGVscGVycy5zYXZlKCk7XG5cbiAgICAgIGxldCAkZmllbGRzID0gJCgnbGkuZm9ybS1maWVsZDpub3QoLmRpc2FibGVkKScsICRzb3J0YWJsZUZpZWxkcyk7XG5cbiAgICAgICRmaWVsZHMuZWFjaChpID0+IF9oZWxwZXJzLnVwZGF0ZVByZXZpZXcoJCgkZmllbGRzW2ldKSkpO1xuXG4gICAgICBub25FZGl0YWJsZUZpZWxkcygpO1xuICAgIH07XG5cbiAgICAvLyBjYWxsYmFjayB0byB0cmFjayBkaXNhYmxlZCB0b29sdGlwc1xuICAgICRzb3J0YWJsZUZpZWxkcy5vbignbW91c2Vtb3ZlJywgJ2xpLmRpc2FibGVkJywgZSA9PiB7XG4gICAgICAkKCcuZnJtYi10dCcsIHRoaXMpLmNzcyh7XG4gICAgICAgIGxlZnQ6IGUub2Zmc2V0WCAtIDE2LFxuICAgICAgICB0b3A6IGUub2Zmc2V0WSAtIDM0XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGNhbGxiYWNrIHRvIGNhbGwgZGlzYWJsZWQgdG9vbHRpcHNcbiAgICAkc29ydGFibGVGaWVsZHMub24oJ21vdXNlZW50ZXInLCAnbGkuZGlzYWJsZWQnLCBlID0+XG4gICAgICBfaGVscGVycy5kaXNhYmxlZFRULmFkZCgkKHRoaXMpKSk7XG5cbiAgICAvLyBjYWxsYmFjayB0byBjYWxsIGRpc2FibGVkIHRvb2x0aXBzXG4gICAgJHNvcnRhYmxlRmllbGRzLm9uKCdtb3VzZWxlYXZlJywgJ2xpLmRpc2FibGVkJywgZSA9PlxuICAgICAgX2hlbHBlcnMuZGlzYWJsZWRUVC5yZW1vdmUoJCh0aGlzKSkpO1xuXG4gICAgbGV0IG5hbWVBdHRyID0gZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgIGxldCBlcG9jaCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgcmV0dXJuIGZpZWxkLnR5cGUgKyAnLScgKyBlcG9jaDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkIGRhdGEgZm9yIGZpZWxkIHdpdGggb3B0aW9ucyBbc2VsZWN0LCBjaGVja2JveC1ncm91cCwgcmFkaW8tZ3JvdXBdXG4gICAgICpcbiAgICAgKiBAdG9kbyAgIHJlZmFjdG9yIHRoaXMgbmFzdHkgfmNyYXB+IGNvZGUsIGl0cyBhY3R1YWxseSBwYWluZnVsIHRvIGxvb2sgYXRcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IHZhbHVlc1xuICAgICAqIEByZXR1cm4ge1N0cmluZ30gZmllbGQgb3B0aW9ucyBtYXJrdXBcbiAgICAgKi9cbiAgICBsZXQgZmllbGRPcHRpb25zID0gZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICBsZXQgb3B0aW9uQWN0aW9ucyA9IFtcbiAgICAgICAgICB1dGlscy5tYXJrdXAoJ2EnLCBvcHRzLm1lc3NhZ2VzLmFkZE9wdGlvbiwge2NsYXNzTmFtZTogJ2FkZCBhZGQtb3B0J30pXG4gICAgICAgIF07XG4gICAgICBsZXQgZmllbGRPcHRpb25zID0gW1xuICAgICAgICBgPGxhYmVsIGNsYXNzPVwiZmFsc2UtbGFiZWxcIj4ke29wdHMubWVzc2FnZXMuc2VsZWN0T3B0aW9uc308L2xhYmVsPmBcbiAgICAgIF07XG4gICAgICBjb25zdCBpc011bHRpcGxlID0gdmFsdWVzLm11bHRpcGxlIHx8ICh2YWx1ZXMudHlwZSA9PT0gJ2NoZWNrYm94LWdyb3VwJyk7XG5cbiAgICAgIGlmICghdmFsdWVzLnZhbHVlcyB8fCAhdmFsdWVzLnZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgdmFsdWVzLnZhbHVlcyA9IFsxLCAyLCAzXS5tYXAoZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICBsZXQgbGFiZWwgPSBgJHtvcHRzLm1lc3NhZ2VzLm9wdGlvbn0gJHtpbmRleH1gO1xuICAgICAgICAgIGxldCBvcHRpb24gPSB7XG4gICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBsYWJlbDogbGFiZWwsXG4gICAgICAgICAgICB2YWx1ZTogdXRpbHMuaHlwaGVuQ2FzZShsYWJlbClcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICAgIH0pO1xuICAgICAgICB2YWx1ZXMudmFsdWVzWzBdLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGVuc3VyZSBvcHRpb24gZGF0YSBpcyBoYXMgYWxsIHJlcXVpcmVkIGtleXNcbiAgICAgICAgdmFsdWVzLnZhbHVlcy5mb3JFYWNoKG9wdGlvbiA9PiBPYmplY3QuYXNzaWduKHt9LCB7c2VsZWN0ZWQ6IGZhbHNlfSwgb3B0aW9uKSk7XG4gICAgICB9XG5cbiAgICAgIGZpZWxkT3B0aW9ucy5wdXNoKCc8ZGl2IGNsYXNzPVwic29ydGFibGUtb3B0aW9ucy13cmFwXCI+Jyk7XG5cbiAgICAgIGZpZWxkT3B0aW9ucy5wdXNoKCc8b2wgY2xhc3M9XCJzb3J0YWJsZS1vcHRpb25zXCI+Jyk7XG4gICAgICB1dGlscy5mb3JFYWNoKHZhbHVlcy52YWx1ZXMsIChpKSA9PiB7XG4gICAgICAgIGZpZWxkT3B0aW9ucy5wdXNoKHNlbGVjdEZpZWxkT3B0aW9ucyh2YWx1ZXMubmFtZSwgdmFsdWVzLnZhbHVlc1tpXSwgaXNNdWx0aXBsZSkpO1xuICAgICAgfSk7XG4gICAgICBmaWVsZE9wdGlvbnMucHVzaCgnPC9vbD4nKTtcbiAgICAgIGZpZWxkT3B0aW9ucy5wdXNoKHV0aWxzLm1hcmt1cCgnZGl2Jywgb3B0aW9uQWN0aW9ucywge2NsYXNzTmFtZTogJ29wdGlvbi1hY3Rpb25zJ30pLm91dGVySFRNTCk7XG4gICAgICBmaWVsZE9wdGlvbnMucHVzaCgnPC9kaXY+Jyk7XG5cbiAgICAgIHJldHVybiB1dGlscy5tYXJrdXAoJ2RpdicsIGZpZWxkT3B0aW9ucy5qb2luKCcnKSwge2NsYXNzTmFtZTogJ2Zvcm0tZ3JvdXAgZmllbGQtb3B0aW9ucyd9KS5vdXRlckhUTUw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEJ1aWxkIHRoZSBlZGl0YWJsZSBwcm9wZXJ0aWVzIGZvciB0aGUgZmllbGRcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IHZhbHVlcyBjb25maWd1cmF0aW9uIG9iamVjdCBmb3IgYWR2YW5jZWQgZmllbGRzXG4gICAgICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgbWFya3VwIGZvciBhZHZhbmNlZCBmaWVsZHNcbiAgICAgKi9cbiAgICBsZXQgYWR2RmllbGRzID0gZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICBsZXQgYWR2RmllbGRzID0gW107XG4gICAgICBsZXQga2V5O1xuICAgICAgbGV0IG9wdGlvbkZpZWxkcyA9IFtcbiAgICAgICAgJ3NlbGVjdCcsXG4gICAgICAgICdjaGVja2JveC1ncm91cCcsXG4gICAgICAgICdyYWRpby1ncm91cCdcbiAgICAgIF07XG4gICAgICBsZXQgaXNPcHRpb25GaWVsZCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChvcHRpb25GaWVsZHMuaW5kZXhPZih2YWx1ZXMudHlwZSkgIT09IC0xKTtcbiAgICAgIH0pKCk7XG4gICAgICBsZXQgdmFsdWVGaWVsZCA9ICF1dGlscy5pbkFycmF5KHZhbHVlcy50eXBlLCBbJ2hlYWRlcicsICdwYXJhZ3JhcGgnLCAnZmlsZSddLmNvbmNhdChvcHRpb25GaWVsZHMpKTtcbiAgICAgIGxldCByb2xlcyA9IHZhbHVlcy5yb2xlICE9PSB1bmRlZmluZWQgPyB2YWx1ZXMucm9sZS5zcGxpdCgnLCcpIDogW107XG5cbiAgICAgIGFkdkZpZWxkcy5wdXNoKHJlcXVpcmVkRmllbGQodmFsdWVzKSk7XG5cbiAgICAgIGlmICh2YWx1ZXMudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICBhZHZGaWVsZHMucHVzaChib29sQXR0cmlidXRlKCd0b2dnbGUnLCB2YWx1ZXMsIHtmaXJzdDogb3B0cy5tZXNzYWdlcy50b2dnbGV9KSk7XG4gICAgICB9XG5cbiAgICAgIGFkdkZpZWxkcy5wdXNoKHRleHRBdHRyaWJ1dGUoJ2xhYmVsJywgdmFsdWVzKSk7XG5cbiAgICAgIHZhbHVlcy5zaXplID0gdmFsdWVzLnNpemUgfHwgJ20nO1xuICAgICAgdmFsdWVzLnN0eWxlID0gdmFsdWVzLnN0eWxlIHx8ICdkZWZhdWx0JztcblxuICAgICAgLy8gSGVscCBUZXh0IC8gRGVzY3JpcHRpb24gRmllbGRcbiAgICAgIGlmICghdXRpbHMuaW5BcnJheSh2YWx1ZXMudHlwZSwgWydoZWFkZXInLCAncGFyYWdyYXBoJywgJ2J1dHRvbiddKSkge1xuICAgICAgICBhZHZGaWVsZHMucHVzaCh0ZXh0QXR0cmlidXRlKCdkZXNjcmlwdGlvbicsIHZhbHVlcykpO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0cy5tZXNzYWdlcy5zdWJ0eXBlc1t2YWx1ZXMudHlwZV0pIHtcbiAgICAgICAgbGV0IG9wdGlvbkRhdGEgPSBvcHRzLm1lc3NhZ2VzLnN1YnR5cGVzW3ZhbHVlcy50eXBlXTtcbiAgICAgICAgYWR2RmllbGRzLnB1c2goc2VsZWN0QXR0cmlidXRlKCdzdWJ0eXBlJywgdmFsdWVzLCBvcHRpb25EYXRhKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh2YWx1ZXMudHlwZSA9PT0gJ2J1dHRvbicpIHtcbiAgICAgICAgYWR2RmllbGRzLnB1c2goYnRuU3R5bGVzKHZhbHVlcy5zdHlsZSwgdmFsdWVzLnR5cGUpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHZhbHVlcy50eXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICBhZHZGaWVsZHMucHVzaChudW1iZXJBdHRyaWJ1dGUoJ21pbicsIHZhbHVlcykpO1xuICAgICAgICBhZHZGaWVsZHMucHVzaChudW1iZXJBdHRyaWJ1dGUoJ21heCcsIHZhbHVlcykpO1xuICAgICAgICBhZHZGaWVsZHMucHVzaChudW1iZXJBdHRyaWJ1dGUoJ3N0ZXAnLCB2YWx1ZXMpKTtcbiAgICAgIH1cblxuICAgICAgLy8gUGxhY2Vob2xkZXJcbiAgICAgIGFkdkZpZWxkcy5wdXNoKHRleHRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgdmFsdWVzKSk7XG5cbiAgICAgIC8vIFRleHRBcmVhIFJvd3MgQXR0cmlidXRlXG4gICAgICBpZiAodmFsdWVzLnR5cGUgPT09ICd0ZXh0YXJlYScpIHtcbiAgICAgICAgYWR2RmllbGRzLnB1c2gobnVtYmVyQXR0cmlidXRlKCdyb3dzJywgdmFsdWVzKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIENsYXNzXG4gICAgICBhZHZGaWVsZHMucHVzaCh0ZXh0QXR0cmlidXRlKCdjbGFzc05hbWUnLCB2YWx1ZXMpKTtcblxuICAgICAgYWR2RmllbGRzLnB1c2godGV4dEF0dHJpYnV0ZSgnbmFtZScsIHZhbHVlcykpO1xuXG4gICAgICBpZiAodmFsdWVGaWVsZCkge1xuICAgICAgICBhZHZGaWVsZHMucHVzaCh0ZXh0QXR0cmlidXRlKCd2YWx1ZScsIHZhbHVlcykpO1xuICAgICAgfVxuXG4gICAgICBpZiAodmFsdWVzLnR5cGUgPT09ICdmaWxlJykge1xuICAgICAgICBsZXQgbGFiZWxzID0ge1xuICAgICAgICAgIGZpcnN0OiBvcHRzLm1lc3NhZ2VzLm11bHRpcGxlRmlsZXMsXG4gICAgICAgICAgc2Vjb25kOiBvcHRzLm1lc3NhZ2VzLmFsbG93TXVsdGlwbGVGaWxlc1xuICAgICAgICB9O1xuICAgICAgICBhZHZGaWVsZHMucHVzaChib29sQXR0cmlidXRlKCdtdWx0aXBsZScsIHZhbHVlcywgbGFiZWxzKSk7XG4gICAgICB9XG5cbiAgICAgIGxldCByb2xlc0Rpc3BsYXkgPSB2YWx1ZXMucm9sZSAhPT0gdW5kZWZpbmVkID8gJ3N0eWxlPVwiZGlzcGxheTpibG9ja1wiJyA6ICcnO1xuICAgICAgbGV0IGF2YWlsYWJsZVJvbGVzID0gW1xuICAgICAgICBgPGRpdiBjbGFzcz1cImF2YWlsYWJsZS1yb2xlc1wiICR7cm9sZXNEaXNwbGF5fT5gXG4gICAgICBdO1xuICAgICAgZm9yIChrZXkgaW4gb3B0cy5yb2xlcykge1xuICAgICAgICBpZiAob3B0cy5yb2xlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgbGV0IGNoZWNrZWQgPSB1dGlscy5pbkFycmF5KGtleSwgcm9sZXMpID8gJ2NoZWNrZWQnIDogJyc7XG4gICAgICAgICAgbGV0IHJvbGVJZCA9IGBmbGQtJHtsYXN0SUR9LXJvbGVzLSR7a2V5fWA7XG4gICAgICAgICAgYXZhaWxhYmxlUm9sZXMucHVzaChgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJyb2xlc1tdXCIgdmFsdWU9XCIke2tleX1cIiBpZD1cIiR7cm9sZUlkfVwiICR7Y2hlY2tlZH0gY2xhc3M9XCJyb2xlcy1maWVsZFwiIC8+IDxsYWJlbCBmb3I9XCIke3JvbGVJZH1cIj4ke29wdHMucm9sZXNba2V5XX08L2xhYmVsPjxici8+YCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYXZhaWxhYmxlUm9sZXMucHVzaCgnPC9kaXY+Jyk7XG5cbiAgICAgIGxldCBhY2Nlc3NMYWJlbHMgPSB7Zmlyc3Q6IG9wdHMubWVzc2FnZXMucm9sZXMsIHNlY29uZDogb3B0cy5tZXNzYWdlcy5saW1pdFJvbGUsIGNvbnRlbnQ6IGF2YWlsYWJsZVJvbGVzLmpvaW4oJycpfTtcblxuICAgICAgYWR2RmllbGRzLnB1c2goYm9vbEF0dHJpYnV0ZSgnYWNjZXNzJywgdmFsdWVzLCBhY2Nlc3NMYWJlbHMpKTtcblxuICAgICAgaWYgKHZhbHVlcy50eXBlID09PSAnY2hlY2tib3gtZ3JvdXAnIHx8IHZhbHVlcy50eXBlID09PSAncmFkaW8tZ3JvdXAnKSB7XG4gICAgICAgIGFkdkZpZWxkcy5wdXNoKGJvb2xBdHRyaWJ1dGUoJ290aGVyJywgdmFsdWVzLCB7Zmlyc3Q6IG9wdHMubWVzc2FnZXMuZW5hYmxlT3RoZXIsIHNlY29uZDogb3B0cy5tZXNzYWdlcy5lbmFibGVPdGhlck1zZ30pKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHZhbHVlcy50eXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgICBhZHZGaWVsZHMucHVzaChib29sQXR0cmlidXRlKCdtdWx0aXBsZScsIHZhbHVlcywge2ZpcnN0OiAnICcsIHNlY29uZDogb3B0cy5tZXNzYWdlcy5zZWxlY3Rpb25zTWVzc2FnZX0pKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzT3B0aW9uRmllbGQpIHtcbiAgICAgICAgYWR2RmllbGRzLnB1c2goZmllbGRPcHRpb25zKHZhbHVlcykpO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaW5BcnJheSh2YWx1ZXMudHlwZSwgWyd0ZXh0JywgJ3RleHRhcmVhJ10pKSB7XG4gICAgICAgIGFkdkZpZWxkcy5wdXNoKG51bWJlckF0dHJpYnV0ZSgnbWF4bGVuZ3RoJywgdmFsdWVzKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFwcGVuZCBjdXN0b20gYXR0cmlidXRlcyBhcyBkZWZpbmVkIGluIHR5cGVVc2VyQXR0cnMgb3B0aW9uXG4gICAgICBpZiAob3B0cy50eXBlVXNlckF0dHJzW3ZhbHVlcy50eXBlXSkge1xuICAgICAgICBhZHZGaWVsZHMucHVzaChwcm9jZXNzVHlwZVVzZXJBdHRycyhvcHRzLnR5cGVVc2VyQXR0cnNbdmFsdWVzLnR5cGVdLCB2YWx1ZXMpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFkdkZpZWxkcy5qb2luKCcnKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHJvY2Vzc2VzIHR5cGVVc2VyQXR0cnNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IHR5cGVVc2VyQXR0ciBvcHRpb25cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IHZhbHVlcyAgICAgICBmaWVsZCBhdHRyaWJ1dGVzXG4gICAgICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgICAgICAgbWFya3VwIGZvciBjdXN0b20gdXNlciBhdHRyaWJ1dGVzXG4gICAgICovXG4gICAgZnVuY3Rpb24gcHJvY2Vzc1R5cGVVc2VyQXR0cnModHlwZVVzZXJBdHRyLCB2YWx1ZXMpIHtcbiAgICAgIGxldCBhZHZGaWVsZCA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBhdHRyaWJ1dGUgaW4gdHlwZVVzZXJBdHRyKSB7XG4gICAgICAgIGlmICh0eXBlVXNlckF0dHIuaGFzT3duUHJvcGVydHkoYXR0cmlidXRlKSkge1xuICAgICAgICAgIGxldCBvcmlnID0gb3B0cy5tZXNzYWdlc1thdHRyaWJ1dGVdO1xuICAgICAgICAgIGxldCBvcmlnVmFsdWUgPSB0eXBlVXNlckF0dHJbYXR0cmlidXRlXS52YWx1ZTtcbiAgICAgICAgICB0eXBlVXNlckF0dHJbYXR0cmlidXRlXS52YWx1ZSA9IHZhbHVlc1thdHRyaWJ1dGVdIHx8IHR5cGVVc2VyQXR0clthdHRyaWJ1dGVdLnZhbHVlIHx8ICcnO1xuXG4gICAgICAgICAgaWYgKHR5cGVVc2VyQXR0clthdHRyaWJ1dGVdLmxhYmVsKSB7XG4gICAgICAgICAgICBvcHRzLm1lc3NhZ2VzW2F0dHJpYnV0ZV0gPSB0eXBlVXNlckF0dHJbYXR0cmlidXRlXS5sYWJlbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZVVzZXJBdHRyW2F0dHJpYnV0ZV0ub3B0aW9ucykge1xuICAgICAgICAgICAgYWR2RmllbGQucHVzaChzZWxlY3RVc2VyQXR0cnMoYXR0cmlidXRlLCB0eXBlVXNlckF0dHJbYXR0cmlidXRlXSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZHZGaWVsZC5wdXNoKGlucHV0VXNlckF0dHJzKGF0dHJpYnV0ZSwgdHlwZVVzZXJBdHRyW2F0dHJpYnV0ZV0pKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvcHRzLm1lc3NhZ2VzW2F0dHJpYnV0ZV0gPSBvcmlnO1xuICAgICAgICAgIHR5cGVVc2VyQXR0clthdHRyaWJ1dGVdLnZhbHVlID0gb3JpZ1ZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhZHZGaWVsZC5qb2luKCcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUZXh0IGlucHV0IHZhbHVlIGZvciBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGF0dHJzIGFsc28ga25vd24gYXMgdmFsdWVzXG4gICAgICogQHJldHVybiB7U3RyaW5nfSAgICAgICBpbnB1dCBtYXJrdXBcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbnB1dFVzZXJBdHRycyhuYW1lLCBhdHRycykge1xuICAgICAgbGV0IHRleHRBdHRycyA9IHtcbiAgICAgICAgICBpZDogbmFtZSArICctJyArIGxhc3RJRCxcbiAgICAgICAgICB0aXRsZTogYXR0cnMuZGVzY3JpcHRpb24gfHwgYXR0cnMubGFiZWwgfHwgbmFtZS50b1VwcGVyQ2FzZSgpLFxuICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgdHlwZTogYXR0cnMudHlwZSB8fCAndGV4dCcsXG4gICAgICAgICAgY2xhc3NOYW1lOiBbYGZsZC0ke25hbWV9YF1cbiAgICAgICAgfTtcbiAgICAgIGxldCBsYWJlbCA9IGA8bGFiZWwgZm9yPVwiJHt0ZXh0QXR0cnMuaWR9XCI+JHtvcHRzLm1lc3NhZ2VzW25hbWVdfTwvbGFiZWw+YDtcblxuICAgICAgaWYgKCF1dGlscy5pbkFycmF5KHRleHRBdHRycy50eXBlLCBbJ2NoZWNrYm94JywgJ2NoZWNrYm94LWdyb3VwJywgJ3JhZGlvLWdyb3VwJ10pKSB7XG4gICAgICAgIHRleHRBdHRycy5jbGFzc05hbWUucHVzaCgnZm9ybS1jb250cm9sJyk7XG4gICAgICB9XG5cbiAgICAgIHRleHRBdHRycyA9IE9iamVjdC5hc3NpZ24oe30sIGF0dHJzLCB0ZXh0QXR0cnMpO1xuICAgICAgbGV0IHRleHRJbnB1dCA9IGA8aW5wdXQgJHt1dGlscy5hdHRyU3RyaW5nKHRleHRBdHRycyl9PmA7XG4gICAgICBsZXQgaW5wdXRXcmFwID0gYDxkaXYgY2xhc3M9XCJpbnB1dC13cmFwXCI+JHt0ZXh0SW5wdXR9PC9kaXY+YDtcbiAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgJHtuYW1lfS13cmFwXCI+JHtsYWJlbH0ke2lucHV0V3JhcH08L2Rpdj5gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbGVjdCBpbnB1dCBmb3IgbXVsdGlwbGUgY2hvaWNlIHVzZXIgYXR0cmlidXRlc1xuICAgICAqIEB0b2RvICByZXBsYWNlIHdpdGggc2VsZWN0QXR0clxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge1N0cmluZ30gICAgICAgICBzZWxlY3QgbWFya3VwXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2VsZWN0VXNlckF0dHJzKG5hbWUsIG9wdGlvbnMpIHtcbiAgICAgIGxldCBvcHRpcyA9IE9iamVjdC5rZXlzKG9wdGlvbnMub3B0aW9ucykubWFwKHZhbCA9PiB7XG4gICAgICAgIGxldCBhdHRycyA9IHt2YWx1ZTogdmFsfTtcbiAgICAgICAgaWYgKHZhbCA9PT0gb3B0aW9ucy52YWx1ZSkge1xuICAgICAgICAgIGF0dHJzLnNlbGVjdGVkID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYDxvcHRpb24gJHt1dGlscy5hdHRyU3RyaW5nKGF0dHJzKX0+JHtvcHRpb25zLm9wdGlvbnNbdmFsXX08L29wdGlvbj5gO1xuICAgICAgfSk7XG4gICAgICBsZXQgc2VsZWN0QXR0cnMgPSB7XG4gICAgICAgIGlkOiBuYW1lICsgJy0nICsgbGFzdElELFxuICAgICAgICB0aXRsZTogb3B0aW9ucy5kZXNjcmlwdGlvbiB8fCBvcHRpb25zLmxhYmVsIHx8IG5hbWUudG9VcHBlckNhc2UoKSxcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgY2xhc3NOYW1lOiBgZmxkLSR7bmFtZX0gZm9ybS1jb250cm9sYFxuICAgICAgfTtcbiAgICAgIGxldCBsYWJlbCA9IGA8bGFiZWwgZm9yPVwiJHtzZWxlY3RBdHRycy5pZH1cIj4ke29wdHMubWVzc2FnZXNbbmFtZV19PC9sYWJlbD5gO1xuXG4gICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5maWx0ZXIocHJvcCA9PiB7XG4gICAgICAgIHJldHVybiAhdXRpbHMuaW5BcnJheShwcm9wLCBbJ3ZhbHVlJywgJ29wdGlvbnMnLCAnbGFiZWwnXSk7XG4gICAgICB9KS5mb3JFYWNoKGZ1bmN0aW9uKGF0dHIpIHtcbiAgICAgICAgc2VsZWN0QXR0cnNbYXR0cl0gPSBvcHRpb25zW2F0dHJdO1xuICAgICAgfSk7XG5cbiAgICAgIGxldCBzZWxlY3QgPSBgPHNlbGVjdCAke3V0aWxzLmF0dHJTdHJpbmcoc2VsZWN0QXR0cnMpfT4ke29wdGlzLmpvaW4oJycpfTwvc2VsZWN0PmA7XG4gICAgICBsZXQgaW5wdXRXcmFwID0gYDxkaXYgY2xhc3M9XCJpbnB1dC13cmFwXCI+JHtzZWxlY3R9PC9kaXY+YDtcbiAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgJHtuYW1lfS13cmFwXCI+JHtsYWJlbH0ke2lucHV0V3JhcH08L2Rpdj5gO1xuICAgIH1cblxuICAgIGxldCBib29sQXR0cmlidXRlID0gZnVuY3Rpb24obmFtZSwgdmFsdWVzLCBsYWJlbHMpIHtcbiAgICAgIGlmIChvcHRzLnR5cGVVc2VyQXR0cnNbdmFsdWVzLnR5cGVdICYmIG9wdHMudHlwZVVzZXJBdHRyc1t2YWx1ZXMudHlwZV1bbmFtZV0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsZXQgbGFiZWwgPSAodHh0KSA9PiB7XG4gICAgICAgIHJldHVybiBgPGxhYmVsIGZvcj1cIiR7bmFtZX0tJHtsYXN0SUR9XCI+JHt0eHR9PC9sYWJlbD5gO1xuICAgICAgfTtcbiAgICAgIGxldCBjaGVja2VkID0gKHZhbHVlc1tuYW1lXSAhPT0gdW5kZWZpbmVkID8gJ2NoZWNrZWQnIDogJycpO1xuICAgICAgbGV0IGlucHV0ID0gYDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cImZsZC0ke25hbWV9XCIgbmFtZT1cIiR7bmFtZX1cIiB2YWx1ZT1cInRydWVcIiAke2NoZWNrZWR9IGlkPVwiJHtuYW1lfS0ke2xhc3RJRH1cIi8+IGA7XG4gICAgICBsZXQgbGVmdCA9IFtdO1xuICAgICAgbGV0IHJpZ2h0ID0gW1xuICAgICAgICBpbnB1dFxuICAgICAgXTtcblxuICAgICAgaWYgKGxhYmVscy5maXJzdCkge1xuICAgICAgICBsZWZ0LnVuc2hpZnQobGFiZWwobGFiZWxzLmZpcnN0KSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChsYWJlbHMuc2Vjb25kKSB7XG4gICAgICAgIHJpZ2h0LnB1c2gobGFiZWwobGFiZWxzLnNlY29uZCkpO1xuICAgICAgfVxuXG4gICAgICBpZiAobGFiZWxzLmNvbnRlbnQpIHtcbiAgICAgICAgcmlnaHQucHVzaChsYWJlbHMuY29udGVudCk7XG4gICAgICB9XG5cbiAgICAgIHJpZ2h0LnVuc2hpZnQoJzxkaXYgY2xhc3M9XCJpbnB1dC13cmFwXCI+Jyk7XG4gICAgICByaWdodC5wdXNoKCc8L2Rpdj4nKTtcblxuICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCAke25hbWV9LXdyYXBcIj4ke2xlZnQuY29uY2F0KHJpZ2h0KS5qb2luKCcnKX08L2Rpdj5gO1xuICAgIH07XG5cbiAgICBsZXQgYnRuU3R5bGVzID0gZnVuY3Rpb24oc3R5bGUsIHR5cGUpIHtcbiAgICAgIGxldCB0YWdzID0ge1xuICAgICAgICAgIGJ1dHRvbjogJ2J0bidcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHN0eWxlcyA9IG9wdHMubWVzc2FnZXMuc3R5bGVzW3RhZ3NbdHlwZV1dO1xuICAgICAgICBsZXQgc3R5bGVGaWVsZCA9ICcnO1xuXG4gICAgICBpZiAoc3R5bGVzKSB7XG4gICAgICAgIGxldCBzdHlsZUxhYmVsID0gYDxsYWJlbD4ke29wdHMubWVzc2FnZXMuc3R5bGV9PC9sYWJlbD5gO1xuICAgICAgICBzdHlsZUZpZWxkICs9IGA8aW5wdXQgdmFsdWU9XCIke3N0eWxlfVwiIG5hbWU9XCJzdHlsZVwiIHR5cGU9XCJoaWRkZW5cIiBjbGFzcz1cImJ0bi1zdHlsZVwiPmA7XG4gICAgICAgIHN0eWxlRmllbGQgKz0gJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIj4nO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKG9wdHMubWVzc2FnZXMuc3R5bGVzW3RhZ3NbdHlwZV1dKS5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgICBsZXQgYWN0aXZlID0gc3R5bGUgPT09IGVsZW1lbnQgPyAnYWN0aXZlJyA6ICcnO1xuICAgICAgICAgIHN0eWxlRmllbGQgKz0gYDxidXR0b24gdmFsdWU9XCIke2VsZW1lbnR9XCIgdHlwZT1cIiR7dHlwZX1cIiBjbGFzcz1cIiR7YWN0aXZlfSBidG4teHMgJHt0YWdzW3R5cGVdfSAke3RhZ3NbdHlwZV19LSR7ZWxlbWVudH1cIj4ke29wdHMubWVzc2FnZXMuc3R5bGVzW3RhZ3NbdHlwZV1dW2VsZW1lbnRdfTwvYnV0dG9uPmA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN0eWxlRmllbGQgKz0gJzwvZGl2Pic7XG5cbiAgICAgICAgc3R5bGVGaWVsZCA9IGA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBzdHlsZS13cmFwXCI+JHtzdHlsZUxhYmVsfSAke3N0eWxlRmllbGR9PC9kaXY+YDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0eWxlRmllbGQ7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZCBhIG51bWJlciBhdHRyaWJ1dGUgdG8gYSBmaWVsZC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gdmFsdWVzXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBtYXJrdXAgZm9yIG51bWJlciBhdHRyaWJ1dGVcbiAgICAgKi9cbiAgICBsZXQgbnVtYmVyQXR0cmlidXRlID0gZnVuY3Rpb24oYXR0cmlidXRlLCB2YWx1ZXMpIHtcbiAgICAgIGlmIChvcHRzLnR5cGVVc2VyQXR0cnNbdmFsdWVzLnR5cGVdICYmIG9wdHMudHlwZVVzZXJBdHRyc1t2YWx1ZXMudHlwZV1bYXR0cmlidXRlXSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBhdHRyVmFsID0gdmFsdWVzW2F0dHJpYnV0ZV07XG4gICAgICBsZXQgYXR0ckxhYmVsID0gb3B0cy5tZXNzYWdlc1thdHRyaWJ1dGVdIHx8IGF0dHJpYnV0ZTtcbiAgICAgIGxldCBwbGFjZWhvbGRlciA9IG9wdHMubWVzc2FnZXMucGxhY2Vob2xkZXJzW2F0dHJpYnV0ZV07XG4gICAgICBsZXQgaW5wdXRDb25maWcgPSB7XG4gICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICB2YWx1ZTogYXR0clZhbCxcbiAgICAgICAgbmFtZTogYXR0cmlidXRlLFxuICAgICAgICBtaW46ICcwJyxcbiAgICAgICAgcGxhY2Vob2xkZXI6IHBsYWNlaG9sZGVyLFxuICAgICAgICBjbGFzc05hbWU6IGBmbGQtJHthdHRyaWJ1dGV9IGZvcm0tY29udHJvbGAsXG4gICAgICAgIGlkOiBgJHthdHRyaWJ1dGV9LSR7bGFzdElEfWBcbiAgICAgIH07XG4gICAgICBsZXQgbnVtYmVyQXR0cmlidXRlID0gYDxpbnB1dCAke3V0aWxzLmF0dHJTdHJpbmcodXRpbHMudHJpbU9iaihpbnB1dENvbmZpZykpfT5gO1xuICAgICAgbGV0IGlucHV0V3JhcCA9IGA8ZGl2IGNsYXNzPVwiaW5wdXQtd3JhcFwiPiR7bnVtYmVyQXR0cmlidXRlfTwvZGl2PmA7XG5cbiAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgJHthdHRyaWJ1dGV9LXdyYXBcIj48bGFiZWwgZm9yPVwiJHtpbnB1dENvbmZpZy5pZH1cIj4ke2F0dHJMYWJlbH08L2xhYmVsPiAke2lucHV0V3JhcH08L2Rpdj5gO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBzZWxlY3RBdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGF0dHJpYnV0ZSAgYXR0cmlidXRlIG5hbWVcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IHZhbHVlcyAgICAgYWthIGF0dHJzXG4gICAgICogQHBhcmFtICB7QXJyYXl9IG9wdGlvbkRhdGEgIHNlbGVjdCBmaWVsZCBvcHRpb24gZGF0YVxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gICAgICAgICAgICBzZWxlY3QgaW5wdXQgbWFrcnVwXG4gICAgICovXG4gICAgbGV0IHNlbGVjdEF0dHJpYnV0ZSA9IGZ1bmN0aW9uKGF0dHJpYnV0ZSwgdmFsdWVzLCBvcHRpb25EYXRhKSB7XG4gICAgICBpZiAob3B0cy50eXBlVXNlckF0dHJzW3ZhbHVlcy50eXBlXSAmJiBvcHRzLnR5cGVVc2VyQXR0cnNbdmFsdWVzLnR5cGVdW2F0dHJpYnV0ZV0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgbGV0IHNlbGVjdE9wdGlvbnMgPSBvcHRpb25EYXRhLm1hcCgob3B0aW9uLCBpKSA9PiB7XG4gICAgICAgIGxldCBvcHRpb25BdHRycyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgIGxhYmVsOiBgJHtvcHRzLm1lc3NhZ2VzLm9wdGlvbn0gJHtpfWAsXG4gICAgICAgICAgdmFsdWU6IHVuZGVmaW5lZFxuICAgICAgICB9LCBvcHRpb24pO1xuICAgICAgICBpZiAob3B0aW9uLnZhbHVlID09PSB2YWx1ZXNbYXR0cmlidXRlXSkge1xuICAgICAgICAgIG9wdGlvbkF0dHJzLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYDxvcHRpb24gJHt1dGlscy5hdHRyU3RyaW5nKHV0aWxzLnRyaW1PYmoob3B0aW9uQXR0cnMpKX0+JHtvcHRpb25BdHRycy5sYWJlbH08L29wdGlvbj5gO1xuICAgICAgfSk7XG4gICAgICBsZXQgc2VsZWN0QXR0cnMgPSB7XG4gICAgICAgICAgaWQ6IGF0dHJpYnV0ZSArICctJyArIGxhc3RJRCxcbiAgICAgICAgICBuYW1lOiBhdHRyaWJ1dGUsXG4gICAgICAgICAgY2xhc3NOYW1lOiBgZmxkLSR7YXR0cmlidXRlfSBmb3JtLWNvbnRyb2xgXG4gICAgICAgIH07XG4gICAgICBsZXQgbGFiZWwgPSBgPGxhYmVsIGZvcj1cIiR7c2VsZWN0QXR0cnMuaWR9XCI+JHtvcHRzLm1lc3NhZ2VzW2F0dHJpYnV0ZV0gfHwgdXRpbHMuY2FwaXRhbGl6ZShhdHRyaWJ1dGUpfTwvbGFiZWw+YDtcbiAgICAgIGxldCBzZWxlY3QgPSBgPHNlbGVjdCAke3V0aWxzLmF0dHJTdHJpbmcoc2VsZWN0QXR0cnMpfT4ke3NlbGVjdE9wdGlvbnMuam9pbignJyl9PC9zZWxlY3Q+YDtcbiAgICAgIGxldCBpbnB1dFdyYXAgPSBgPGRpdiBjbGFzcz1cImlucHV0LXdyYXBcIj4ke3NlbGVjdH08L2Rpdj5gO1xuXG4gICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwICR7c2VsZWN0QXR0cnMubmFtZX0td3JhcFwiPiR7bGFiZWx9JHtpbnB1dFdyYXB9PC9kaXY+YDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgc29tZSB0ZXh0IGlucHV0cyBmb3IgZmllbGQgYXR0cmlidXRlcywgKip3aWxsIGJlIHJlcGxhY2VkKipcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gdmFsdWVzXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGxldCB0ZXh0QXR0cmlidXRlID0gZnVuY3Rpb24oYXR0cmlidXRlLCB2YWx1ZXMpIHtcbiAgICAgIGlmIChvcHRzLnR5cGVVc2VyQXR0cnNbdmFsdWVzLnR5cGVdICYmIG9wdHMudHlwZVVzZXJBdHRyc1t2YWx1ZXMudHlwZV1bYXR0cmlidXRlXSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBwbGFjZWhvbGRlckZpZWxkcyA9IFtcbiAgICAgICAgJ3RleHQnLFxuICAgICAgICAndGV4dGFyZWEnLFxuICAgICAgICAnc2VsZWN0J1xuICAgICAgXTtcblxuICAgICAgbGV0IG5vTmFtZSA9IFtcbiAgICAgICAgJ2hlYWRlcidcbiAgICAgIF07XG5cbiAgICAgIGxldCB0ZXh0QXJlYSA9IFsncGFyYWdyYXBoJ107XG5cbiAgICAgIGxldCBhdHRyVmFsID0gdmFsdWVzW2F0dHJpYnV0ZV0gfHwgJyc7XG4gICAgICBsZXQgYXR0ckxhYmVsID0gb3B0cy5tZXNzYWdlc1thdHRyaWJ1dGVdO1xuICAgICAgaWYgKGF0dHJpYnV0ZSA9PT0gJ2xhYmVsJyAmJiB1dGlscy5pbkFycmF5KHZhbHVlcy50eXBlLCB0ZXh0QXJlYSkpIHtcbiAgICAgICAgYXR0ckxhYmVsID0gb3B0cy5tZXNzYWdlcy5jb250ZW50O1xuICAgICAgfVxuXG4gICAgICBub05hbWUgPSBub05hbWUuY29uY2F0KG9wdHMubWVzc2FnZXMuc3VidHlwZXMuaGVhZGVyLCB0ZXh0QXJlYSk7XG5cbiAgICAgIGxldCBwbGFjZWhvbGRlcnMgPSBvcHRzLm1lc3NhZ2VzLnBsYWNlaG9sZGVycztcbiAgICAgIGxldCBwbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyc1thdHRyaWJ1dGVdIHx8ICcnO1xuICAgICAgbGV0IGF0dHJpYnV0ZWZpZWxkID0gJyc7XG4gICAgICBsZXQgbm9NYWtlQXR0ciA9IFtdO1xuXG4gICAgICAvLyBGaWVsZCBoYXMgcGxhY2Vob2xkZXIgYXR0cmlidXRlXG4gICAgICBpZiAoYXR0cmlidXRlID09PSAncGxhY2Vob2xkZXInICYmICF1dGlscy5pbkFycmF5KHZhbHVlcy50eXBlLCBwbGFjZWhvbGRlckZpZWxkcykpIHtcbiAgICAgICAgbm9NYWtlQXR0ci5wdXNoKHRydWUpO1xuICAgICAgfVxuXG4gICAgICAvLyBGaWVsZCBoYXMgbmFtZSBhdHRyaWJ1dGVcbiAgICAgIGlmIChhdHRyaWJ1dGUgPT09ICduYW1lJyAmJiB1dGlscy5pbkFycmF5KHZhbHVlcy50eXBlLCBub05hbWUpKSB7XG4gICAgICAgIG5vTWFrZUF0dHIucHVzaCh0cnVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFub01ha2VBdHRyLnNvbWUoZWxlbSA9PiBlbGVtID09PSB0cnVlKSkge1xuICAgICAgICBsZXQgaW5wdXRDb25maWcgPSB7XG4gICAgICAgICAgbmFtZTogYXR0cmlidXRlLFxuICAgICAgICAgIHBsYWNlaG9sZGVyOiBwbGFjZWhvbGRlcixcbiAgICAgICAgICBjbGFzc05hbWU6IGBmbGQtJHthdHRyaWJ1dGV9IGZvcm0tY29udHJvbGAsXG4gICAgICAgICAgaWQ6IGAke2F0dHJpYnV0ZX0tJHtsYXN0SUR9YFxuICAgICAgICB9O1xuICAgICAgICBsZXQgYXR0cmlidXRlTGFiZWwgPSBgPGxhYmVsIGZvcj1cIiR7aW5wdXRDb25maWcuaWR9XCI+JHthdHRyTGFiZWx9PC9sYWJlbD5gO1xuXG4gICAgICAgIGlmIChhdHRyaWJ1dGUgPT09ICdsYWJlbCcgJiYgdXRpbHMuaW5BcnJheSh2YWx1ZXMudHlwZSwgdGV4dEFyZWEpIHx8IChhdHRyaWJ1dGUgPT09ICd2YWx1ZScgJiYgdmFsdWVzLnR5cGUgPT09ICd0ZXh0YXJlYScpKSB7XG4gICAgICAgICAgYXR0cmlidXRlZmllbGQgKz0gYDx0ZXh0YXJlYSAke3V0aWxzLmF0dHJTdHJpbmcoaW5wdXRDb25maWcpfT4ke2F0dHJWYWx9PC90ZXh0YXJlYT5gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlucHV0Q29uZmlnLnZhbHVlID0gYXR0clZhbDtcbiAgICAgICAgICBpbnB1dENvbmZpZy50eXBlID0gJ3RleHQnO1xuICAgICAgICAgIGF0dHJpYnV0ZWZpZWxkICs9IGA8aW5wdXQgJHt1dGlscy5hdHRyU3RyaW5nKGlucHV0Q29uZmlnKX0+YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbnB1dFdyYXAgPSBgPGRpdiBjbGFzcz1cImlucHV0LXdyYXBcIj4ke2F0dHJpYnV0ZWZpZWxkfTwvZGl2PmA7XG5cbiAgICAgICAgYXR0cmlidXRlZmllbGQgPSBgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgJHthdHRyaWJ1dGV9LXdyYXBcIj4ke2F0dHJpYnV0ZUxhYmVsfSAke2lucHV0V3JhcH08L2Rpdj5gO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXR0cmlidXRlZmllbGQ7XG4gICAgfTtcblxuICAgIGxldCByZXF1aXJlZEZpZWxkID0gZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICBsZXQgbm9SZXF1aXJlID0gW1xuICAgICAgICAgICdoZWFkZXInLFxuICAgICAgICAgICdwYXJhZ3JhcGgnLFxuICAgICAgICAgICdidXR0b24nXG4gICAgICAgIF07XG4gICAgICBsZXQgbm9NYWtlID0gW107XG4gICAgICBsZXQgcmVxdWlyZUZpZWxkID0gJyc7XG5cbiAgICAgIGlmICh1dGlscy5pbkFycmF5KHZhbHVlcy50eXBlLCBub1JlcXVpcmUpKSB7XG4gICAgICAgIG5vTWFrZS5wdXNoKHRydWUpO1xuICAgICAgfVxuICAgICAgaWYgKCFub01ha2Uuc29tZShlbGVtID0+IGVsZW0gPT09IHRydWUpKSB7XG4gICAgICAgIHJlcXVpcmVGaWVsZCA9IGJvb2xBdHRyaWJ1dGUoJ3JlcXVpcmVkJywgdmFsdWVzLCB7Zmlyc3Q6IG9wdHMubWVzc2FnZXMucmVxdWlyZWR9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlcXVpcmVGaWVsZDtcbiAgICB9O1xuXG4gICAgLy8gQXBwZW5kIHRoZSBuZXcgZmllbGQgdG8gdGhlIGVkaXRvclxuICAgIGxldCBhcHBlbmROZXdGaWVsZCA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgY29uc3QgbSA9IHV0aWxzLm1hcmt1cDtcbiAgICAgIGxldCB0eXBlID0gdmFsdWVzLnR5cGUgfHwgJ3RleHQnO1xuICAgICAgbGV0IGxhYmVsID0gdmFsdWVzLmxhYmVsIHx8IG9wdHMubWVzc2FnZXNbdHlwZV0gfHwgb3B0cy5tZXNzYWdlcy5sYWJlbDtcbiAgICAgIGxldCBkZWxCdG4gPSBtKCdhJywgb3B0cy5tZXNzYWdlcy5yZW1vdmUsIHtcbiAgICAgICAgICBpZDogJ2RlbF8nICsgbGFzdElELFxuICAgICAgICAgIGNsYXNzTmFtZTogJ2RlbC1idXR0b24gYnRuIGRlbGV0ZS1jb25maXJtJyxcbiAgICAgICAgICB0aXRsZTogb3B0cy5tZXNzYWdlcy5yZW1vdmVNZXNzYWdlXG4gICAgICAgIH0pO1xuICAgICAgbGV0IHRvZ2dsZUJ0biA9IG0oJ2EnLCBudWxsLCB7XG4gICAgICAgIGlkOiBsYXN0SUQgKyAnLWVkaXQnLFxuICAgICAgICBjbGFzc05hbWU6ICd0b2dnbGUtZm9ybSBidG4gaWNvbi1wZW5jaWwnLFxuICAgICAgICB0aXRsZTogb3B0cy5tZXNzYWdlcy5oaWRlXG4gICAgICB9KTtcbiAgICAgIGxldCBjb3B5QnRuID0gbSgnYScsIG9wdHMubWVzc2FnZXMuY29weUJ1dHRvbiwge1xuICAgICAgICBpZDogbGFzdElEICsgJy1jb3B5JyxcbiAgICAgICAgY2xhc3NOYW1lOiAnY29weS1idXR0b24gYnRuIGljb24tY29weScsXG4gICAgICAgIHRpdGxlOiBvcHRzLm1lc3NhZ2VzLmNvcHlCdXR0b25Ub29sdGlwXG4gICAgICB9KTtcblxuICAgICAgbGV0IGxpQ29udGVudHMgPSBtKFxuICAgICAgICAnZGl2JywgW3RvZ2dsZUJ0biwgY29weUJ0biwgZGVsQnRuXSwge2NsYXNzTmFtZTogJ2ZpZWxkLWFjdGlvbnMnfVxuICAgICAgKS5vdXRlckhUTUw7XG5cbiAgICAgIC8vIEZpZWxkIHByZXZpZXcgTGFiZWxcbiAgICAgIGxpQ29udGVudHMgKz0gYDxsYWJlbCBjbGFzcz1cImZpZWxkLWxhYmVsXCI+JHtsYWJlbH08L2xhYmVsPmA7XG5cbiAgICAgIGlmICh2YWx1ZXMuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgbGV0IGF0dHJzID0ge1xuICAgICAgICAgIGNsYXNzTmFtZTogJ3Rvb2x0aXAtZWxlbWVudCcsXG4gICAgICAgICAgdG9vbHRpcDogdmFsdWVzLmRlc2NyaXB0aW9uXG4gICAgICAgIH07XG4gICAgICAgIGxpQ29udGVudHMgKz0gYDxzcGFuICR7dXRpbHMuYXR0cnNTdHJpbmcoYXR0cnMpfT4/PC9zcGFuPmA7XG4gICAgICB9XG5cbiAgICAgIGxldCByZXF1aXJlZERpc3BsYXkgPSB2YWx1ZXMucmVxdWlyZWQgPyAnc3R5bGU9XCJkaXNwbGF5OmlubGluZVwiJyA6ICcnO1xuICAgICAgbGlDb250ZW50cyArPSBgPHNwYW4gY2xhc3M9XCJyZXF1aXJlZC1hc3Rlcmlza1wiICR7cmVxdWlyZWREaXNwbGF5fT4gKjwvc3Bhbj5gO1xuXG4gICAgICBsaUNvbnRlbnRzICs9IG0oJ2RpdicsICcnLCB7Y2xhc3NOYW1lOiAncHJldi1ob2xkZXInfSkub3V0ZXJIVE1MO1xuICAgICAgbGlDb250ZW50cyArPSBgPGRpdiBpZD1cIiR7bGFzdElEfS1ob2xkZXJcIiBjbGFzcz1cImZybS1ob2xkZXJcIj5gO1xuICAgICAgbGlDb250ZW50cyArPSAnPGRpdiBjbGFzcz1cImZvcm0tZWxlbWVudHNcIj4nO1xuXG4gICAgICBsaUNvbnRlbnRzICs9IGFkdkZpZWxkcyh2YWx1ZXMpO1xuICAgICAgbGlDb250ZW50cyArPSBtKCdhJywgb3B0cy5tZXNzYWdlcy5jbG9zZSwge2NsYXNzTmFtZTogJ2Nsb3NlLWZpZWxkJ30pLm91dGVySFRNTDtcblxuICAgICAgbGlDb250ZW50cyArPSAnPC9kaXY+JztcbiAgICAgIGxpQ29udGVudHMgKz0gJzwvZGl2Pic7XG5cbiAgICAgIGxldCBmaWVsZCA9IG0oJ2xpJywgbGlDb250ZW50cywge1xuICAgICAgICAgICdjbGFzcyc6IHR5cGUgKyAnLWZpZWxkIGZvcm0tZmllbGQnLFxuICAgICAgICAgICd0eXBlJzogdHlwZSxcbiAgICAgICAgICBpZDogbGFzdElEXG4gICAgICAgIH0pO1xuICAgICAgbGV0ICRsaSA9ICQoZmllbGQpO1xuXG4gICAgICAkbGkuZGF0YSgnZmllbGREYXRhJywge2F0dHJzOiB2YWx1ZXN9KTtcblxuICAgICAgaWYgKHR5cGVvZiBfaGVscGVycy5zdG9wSW5kZXggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICQoJz4gbGknLCAkc29ydGFibGVGaWVsZHMpLmVxKF9oZWxwZXJzLnN0b3BJbmRleCkuYmVmb3JlKCRsaSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkc29ydGFibGVGaWVsZHMuYXBwZW5kKCRsaSk7XG4gICAgICB9XG5cbiAgICAgICQoJy5zb3J0YWJsZS1vcHRpb25zJywgJGxpKVxuICAgICAgLnNvcnRhYmxlKHt1cGRhdGU6ICgpID0+IF9oZWxwZXJzLnVwZGF0ZVByZXZpZXcoJGxpKX0pO1xuXG4gICAgICBfaGVscGVycy51cGRhdGVQcmV2aWV3KCRsaSk7XG5cbiAgICAgIGlmIChvcHRzLnR5cGVVc2VyRXZlbnRzW3R5cGVdICYmIG9wdHMudHlwZVVzZXJFdmVudHNbdHlwZV0ub25hZGQpIHtcbiAgICAgICAgb3B0cy50eXBlVXNlckV2ZW50c1t0eXBlXS5vbmFkZChmaWVsZCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRzLmVkaXRPbkFkZCkge1xuICAgICAgICBfaGVscGVycy5jbG9zZUFsbEVkaXQoKTtcbiAgICAgICAgX2hlbHBlcnMudG9nZ2xlRWRpdChsYXN0SUQsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgbGFzdElEID0gX2hlbHBlcnMuaW5jcmVtZW50SWQobGFzdElEKTtcbiAgICB9O1xuXG4gICAgLy8gU2VsZWN0IGZpZWxkIGh0bWwsIHNpbmNlIHRoZXJlIG1heSBiZSBtdWx0aXBsZVxuICAgIGxldCBzZWxlY3RGaWVsZE9wdGlvbnMgPSBmdW5jdGlvbihuYW1lLCBvcHRpb25EYXRhLCBtdWx0aXBsZVNlbGVjdCkge1xuICAgICAgbGV0IG9wdGlvbklucHV0VHlwZSA9IHtcbiAgICAgICAgICBzZWxlY3RlZDogKG11bHRpcGxlU2VsZWN0ID8gJ2NoZWNrYm94JyA6ICdyYWRpbycpXG4gICAgICAgIH07XG4gICAgICBsZXQgb3B0aW9uRGF0YU9yZGVyID0gW1xuICAgICAgICAndmFsdWUnLFxuICAgICAgICAnbGFiZWwnLFxuICAgICAgICAnc2VsZWN0ZWQnXG4gICAgICBdO1xuICAgICAgbGV0IG9wdGlvbklucHV0cyA9IFtdO1xuICAgICAgbGV0IG9wdGlvblRlbXBsYXRlID0ge3NlbGVjdGVkOiBmYWxzZSwgbGFiZWw6ICcnLCB2YWx1ZTogJyd9O1xuXG4gICAgICBvcHRpb25EYXRhID0gT2JqZWN0LmFzc2lnbihvcHRpb25UZW1wbGF0ZSwgb3B0aW9uRGF0YSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSBvcHRpb25EYXRhT3JkZXIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgbGV0IHByb3AgPSBvcHRpb25EYXRhT3JkZXJbaV07XG4gICAgICAgIGlmIChvcHRpb25EYXRhLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgbGV0IGF0dHJzID0ge1xuICAgICAgICAgICAgdHlwZTogb3B0aW9uSW5wdXRUeXBlW3Byb3BdIHx8ICd0ZXh0JyxcbiAgICAgICAgICAgICdjbGFzcyc6ICdvcHRpb24tJyArIHByb3AsXG4gICAgICAgICAgICB2YWx1ZTogb3B0aW9uRGF0YVtwcm9wXSxcbiAgICAgICAgICAgIG5hbWU6IG5hbWUgKyAnLW9wdGlvbidcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKG9wdHMubWVzc2FnZXMucGxhY2Vob2xkZXJzW3Byb3BdKSB7XG4gICAgICAgICAgICBhdHRycy5wbGFjZWhvbGRlciA9IG9wdHMubWVzc2FnZXMucGxhY2Vob2xkZXJzW3Byb3BdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwcm9wID09PSAnc2VsZWN0ZWQnICYmIG9wdGlvbkRhdGEuc2VsZWN0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGF0dHJzLmNoZWNrZWQgPSBvcHRpb25EYXRhLnNlbGVjdGVkO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG9wdGlvbklucHV0cy5wdXNoKHV0aWxzLm1hcmt1cCgnaW5wdXQnLCBudWxsLCBhdHRycykpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCByZW1vdmVBdHRycyA9IHtcbiAgICAgICAgY2xhc3NOYW1lOiAncmVtb3ZlIGJ0bicsXG4gICAgICAgIHRpdGxlOiBvcHRzLm1lc3NhZ2VzLnJlbW92ZU1lc3NhZ2VcbiAgICAgIH07XG4gICAgICBvcHRpb25JbnB1dHMucHVzaCh1dGlscy5tYXJrdXAoJ2EnLCBvcHRzLm1lc3NhZ2VzLnJlbW92ZSwgcmVtb3ZlQXR0cnMpKTtcblxuICAgICAgbGV0IGZpZWxkID0gdXRpbHMubWFya3VwKCdsaScsIG9wdGlvbklucHV0cyk7XG5cbiAgICAgIHJldHVybiBmaWVsZC5vdXRlckhUTUw7XG4gICAgfTtcblxuICAgIGxldCBjbG9uZUl0ZW0gPSBmdW5jdGlvbiBjbG9uZUl0ZW0oY3VycmVudEl0ZW0pIHtcbiAgICAgIGxldCBjdXJyZW50SWQgPSBjdXJyZW50SXRlbS5hdHRyKCdpZCcpO1xuICAgICAgbGV0IHR5cGUgPSBjdXJyZW50SXRlbS5hdHRyKCd0eXBlJyk7XG4gICAgICBsZXQgdHMgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIGxldCBjbG9uZU5hbWUgPSB0eXBlICsgJy0nICsgdHM7XG4gICAgICBsZXQgJGNsb25lID0gY3VycmVudEl0ZW0uY2xvbmUoKTtcblxuICAgICAgJGNsb25lLmZpbmQoJ1tpZF0nKS5lYWNoKGZ1bmN0aW9uKCkgeyB0aGlzLmlkID0gdGhpcy5pZC5yZXBsYWNlKGN1cnJlbnRJZCwgbGFzdElEKTsgfSk7XG5cbiAgICAgICRjbG9uZS5maW5kKCdbZm9yXScpLmVhY2goZnVuY3Rpb24oKSB7IHRoaXMuc2V0QXR0cmlidXRlKCdmb3InLCB0aGlzLmdldEF0dHJpYnV0ZSgnZm9yJykucmVwbGFjZShjdXJyZW50SWQsIGxhc3RJRCkpOyB9KTtcblxuICAgICAgJGNsb25lLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJ2U6bm90KC5mb3JtLWVsZW1lbnRzKScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbGV0IG5ld05hbWUgPSB0aGlzLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuICAgICAgICAgIG5ld05hbWUgPSBuZXdOYW1lLnN1YnN0cmluZygwLCAobmV3TmFtZS5sYXN0SW5kZXhPZignLScpICsgMSkpO1xuICAgICAgICAgIG5ld05hbWUgPSBuZXdOYW1lICsgdHMudG9TdHJpbmcoKTtcbiAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnbmFtZScsIG5ld05hbWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAkY2xvbmUuZmluZCgnLmZvcm0tZWxlbWVudHMnKS5maW5kKCc6aW5wdXQnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ25hbWUnKSA9PT0gJ25hbWUnKSB7XG4gICAgICAgICAgbGV0IG5ld1ZhbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgICAgIG5ld1ZhbCA9IG5ld1ZhbC5zdWJzdHJpbmcoMCwgKG5ld1ZhbC5sYXN0SW5kZXhPZignLScpICsgMSkpO1xuICAgICAgICAgIG5ld1ZhbCA9IG5ld1ZhbCArIHRzLnRvU3RyaW5nKCk7XG4gICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgbmV3VmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICRjbG9uZS5hdHRyKCdpZCcsIGxhc3RJRCk7XG4gICAgICAkY2xvbmUuYXR0cignbmFtZScsIGNsb25lTmFtZSk7XG4gICAgICAkY2xvbmUuYWRkQ2xhc3MoJ2Nsb25lZCcpO1xuICAgICAgJCgnLnNvcnRhYmxlLW9wdGlvbnMnLCAkY2xvbmUpLnNvcnRhYmxlKCk7XG5cbiAgICAgIGlmIChvcHRzLnR5cGVVc2VyRXZlbnRzW3R5cGVdICYmIG9wdHMudHlwZVVzZXJFdmVudHNbdHlwZV0ub25jbG9uZSkge1xuICAgICAgICBvcHRzLnR5cGVVc2VyRXZlbnRzW3R5cGVdLm9uY2xvbmUoJGNsb25lWzBdKTtcbiAgICAgIH1cblxuICAgICAgbGFzdElEID0gX2hlbHBlcnMuaW5jcmVtZW50SWQobGFzdElEKTtcbiAgICAgIHJldHVybiAkY2xvbmU7XG4gICAgfTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gVVRJTElUSUVTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuICAgIC8vIGRlbGV0ZSBvcHRpb25zXG4gICAgJHNvcnRhYmxlRmllbGRzLm9uKCdjbGljayB0b3VjaHN0YXJ0JywgJy5yZW1vdmUnLCBmdW5jdGlvbihlKSB7XG4gICAgICBsZXQgJGZpZWxkID0gJCh0aGlzKS5wYXJlbnRzKCcuZm9ybS1maWVsZDplcSgwKScpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IG9wdGlvbnNDb3VudCA9ICQodGhpcykucGFyZW50cygnLnNvcnRhYmxlLW9wdGlvbnM6ZXEoMCknKS5jaGlsZHJlbignbGknKS5sZW5ndGg7XG4gICAgICBpZiAob3B0aW9uc0NvdW50IDw9IDIpIHtcbiAgICAgICAgb3B0cy5ub3RpZnkuZXJyb3IoJ0Vycm9yOiAnICsgb3B0cy5tZXNzYWdlcy5taW5PcHRpb25NZXNzYWdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcykucGFyZW50KCdsaScpLnNsaWRlVXAoJzI1MCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICAgICAgX2hlbHBlcnMudXBkYXRlUHJldmlldygkZmllbGQpO1xuICAgICAgICAgIF9oZWxwZXJzLnNhdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyB0b3VjaCBmb2N1c1xuICAgICRzb3J0YWJsZUZpZWxkcy5vbigndG91Y2hzdGFydCcsICdpbnB1dCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGxldCAkaW5wdXQgPSAkKHRoaXMpO1xuICAgICAgaWYgKGUuaGFuZGxlZCAhPT0gdHJ1ZSkge1xuICAgICAgICBpZiAoJGlucHV0LmF0dHIoJ3R5cGUnKSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICRpbnB1dC50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRpbnB1dC5mb2N1cygpO1xuICAgICAgICAgIGxldCBmaWVsZFZhbCA9ICRpbnB1dC52YWwoKTtcbiAgICAgICAgICAkaW5wdXQudmFsKGZpZWxkVmFsKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gdG9nZ2xlIGZpZWxkc1xuICAgICRzb3J0YWJsZUZpZWxkcy5vbignY2xpY2sgdG91Y2hzdGFydCcsICcudG9nZ2xlLWZvcm0sIC5jbG9zZS1maWVsZCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoZS5oYW5kbGVkICE9PSB0cnVlKSB7XG4gICAgICAgIGxldCB0YXJnZXRJRCA9ICQoZS50YXJnZXQpLnBhcmVudHMoJy5mb3JtLWZpZWxkOmVxKDApJykuYXR0cignaWQnKTtcbiAgICAgICAgX2hlbHBlcnMudG9nZ2xlRWRpdCh0YXJnZXRJRCk7XG4gICAgICAgIGUuaGFuZGxlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkc29ydGFibGVGaWVsZHMub24oJ2NoYW5nZScsICcucHJldi1ob2xkZXIgaW5wdXQsIC5wcmV2LWhvbGRlciBzZWxlY3QnLCBlID0+IHtcbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ290aGVyLW9wdGlvbicpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGxldCBmaWVsZCA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJ2xpLmZvcm0tZmllbGQnKVswXTtcbiAgICAgIGlmICh1dGlscy5pbkFycmF5KGZpZWxkLnR5cGUsIFsnc2VsZWN0JywgJ2NoZWNrYm94LWdyb3VwJywgJ3JhZGlvLWdyb3VwJ10pKSB7XG4gICAgICAgIGZpZWxkLnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcz1cIm9wdGlvbi12YWx1ZVwiXVt2YWx1ZT1cIicgKyBlLnRhcmdldC52YWx1ZSArICdcIl0nKS5wYXJlbnRFbGVtZW50LmNoaWxkTm9kZXNbMF0uY2hlY2tlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmFsdWUtJyArIGZpZWxkLmlkKS52YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgfVxuXG4gICAgICBfaGVscGVycy5zYXZlKCk7XG4gICAgfSk7XG5cbiAgICAvLyB1cGRhdGUgcHJldmlldyB0byBsYWJlbFxuICAgICRzb3J0YWJsZUZpZWxkcy5vbigna2V5dXAgY2hhbmdlJywgJ1tuYW1lPVwibGFiZWxcIl0nLCBmdW5jdGlvbihlKSB7XG4gICAgICAkKCcuZmllbGQtbGFiZWwnLCAkKGUudGFyZ2V0KS5jbG9zZXN0KCdsaScpKS50ZXh0KCQoZS50YXJnZXQpLnZhbCgpKTtcbiAgICB9KTtcblxuICAgIC8vIHJlbW92ZSBlcnJvciBzdHlsaW5nIHdoZW4gdXNlcnMgdHJpZXMgdG8gY29ycmVjdCBtaXN0YWtlXG4gICAgJHNvcnRhYmxlRmllbGRzLmRlbGVnYXRlKCdpbnB1dC5lcnJvcicsICdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICQoZS50YXJnZXQpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgIH0pO1xuXG4gICAgLy8gdXBkYXRlIHByZXZpZXcgZm9yIGRlc2NyaXB0aW9uXG4gICAgJHNvcnRhYmxlRmllbGRzLm9uKCdrZXl1cCcsICdpbnB1dFtuYW1lPVwiZGVzY3JpcHRpb25cIl0nLCBmdW5jdGlvbihlKSB7XG4gICAgICBsZXQgJGZpZWxkID0gJChlLnRhcmdldCkucGFyZW50cygnLmZvcm0tZmllbGQ6ZXEoMCknKTtcbiAgICAgIGxldCBjbG9zZXN0VG9vbFRpcCA9ICQoJy50b29sdGlwLWVsZW1lbnQnLCAkZmllbGQpO1xuICAgICAgbGV0IHR0VmFsID0gJChlLnRhcmdldCkudmFsKCk7XG4gICAgICBpZiAodHRWYWwgIT09ICcnKSB7XG4gICAgICAgIGlmICghY2xvc2VzdFRvb2xUaXAubGVuZ3RoKSB7XG4gICAgICAgICAgbGV0IHR0ID0gYDxzcGFuIGNsYXNzPVwidG9vbHRpcC1lbGVtZW50XCIgdG9vbHRpcD1cIiR7dHRWYWx9XCI+Pzwvc3Bhbj5gO1xuICAgICAgICAgICQoJy5maWVsZC1sYWJlbCcsICRmaWVsZCkuYWZ0ZXIodHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNsb3Nlc3RUb29sVGlwLmF0dHIoJ3Rvb2x0aXAnLCB0dFZhbCkuY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY2xvc2VzdFRvb2xUaXAubGVuZ3RoKSB7XG4gICAgICAgICAgY2xvc2VzdFRvb2xUaXAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJHNvcnRhYmxlRmllbGRzLm9uKCdjaGFuZ2UnLCAnLmZsZC1tdWx0aXBsZScsIGUgPT4ge1xuICAgICAgbGV0IG5ld1R5cGUgPSBlLnRhcmdldC5jaGVja2VkID8gJ2NoZWNrYm94JyA6ICdyYWRpbyc7XG5cbiAgICAgICQoZS50YXJnZXQpXG4gICAgICAucGFyZW50cygnLmZvcm0tZWxlbWVudHM6ZXEoMCknKVxuICAgICAgLmZpbmQoJy5zb3J0YWJsZS1vcHRpb25zIGlucHV0Lm9wdGlvbi1zZWxlY3RlZCcpXG4gICAgICAuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgZS50YXJnZXQudHlwZSA9IG5ld1R5cGU7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGZvcm1hdCBuYW1lIGF0dHJpYnV0ZVxuICAgICRzb3J0YWJsZUZpZWxkcy5vbignYmx1cicsICdpbnB1dC5mbGQtbmFtZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUudGFyZ2V0LnZhbHVlID0gX2hlbHBlcnMuc2FmZW5hbWUoZS50YXJnZXQudmFsdWUpO1xuICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlID09PSAnJykge1xuICAgICAgICAkKGUudGFyZ2V0KVxuICAgICAgICAuYWRkQ2xhc3MoJ2ZpZWxkLWVycm9yJylcbiAgICAgICAgLmF0dHIoJ3BsYWNlaG9sZGVyJywgb3B0cy5tZXNzYWdlcy5jYW5ub3RCZUVtcHR5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoZS50YXJnZXQpLnJlbW92ZUNsYXNzKCdmaWVsZC1lcnJvcicpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJHNvcnRhYmxlRmllbGRzLm9uKCdibHVyJywgJ2lucHV0LmZsZC1tYXhsZW5ndGgnLCBlID0+IHtcbiAgICAgIGUudGFyZ2V0LnZhbHVlID0gX2hlbHBlcnMuZm9yY2VOdW1iZXIoZS50YXJnZXQudmFsdWUpO1xuICAgIH0pO1xuXG4gICAgLy8gQ29weSBmaWVsZFxuICAgICRzb3J0YWJsZUZpZWxkcy5vbignY2xpY2sgdG91Y2hzdGFydCcsICcuaWNvbi1jb3B5JywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IGN1cnJlbnRJdGVtID0gJChlLnRhcmdldCkucGFyZW50KCkucGFyZW50KCdsaScpO1xuICAgICAgbGV0ICRjbG9uZSA9IGNsb25lSXRlbShjdXJyZW50SXRlbSk7XG4gICAgICAkY2xvbmUuaW5zZXJ0QWZ0ZXIoY3VycmVudEl0ZW0pO1xuICAgICAgX2hlbHBlcnMudXBkYXRlUHJldmlldygkY2xvbmUpO1xuICAgICAgX2hlbHBlcnMuc2F2ZSgpO1xuICAgIH0pO1xuXG4gICAgLy8gRGVsZXRlIGZpZWxkXG4gICAgJHNvcnRhYmxlRmllbGRzLm9uKCdjbGljayB0b3VjaHN0YXJ0JywgJy5kZWxldGUtY29uZmlybScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgY29uc3QgYnV0dG9uUG9zaXRpb24gPSBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IGJvZHlSZWN0ID0gZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IGNvb3JkcyA9IHtcbiAgICAgICAgICBwYWdlWDogYnV0dG9uUG9zaXRpb24ubGVmdCArIChidXR0b25Qb3NpdGlvbi53aWR0aCAvIDIpLFxuICAgICAgICAgIHBhZ2VZOiAoYnV0dG9uUG9zaXRpb24udG9wIC0gYm9keVJlY3QudG9wKSAtIDEyXG4gICAgICAgIH07XG5cbiAgICAgIGxldCBkZWxldGVJRCA9ICQoZS50YXJnZXQpLnBhcmVudHMoJy5mb3JtLWZpZWxkOmVxKDApJykuYXR0cignaWQnKTtcbiAgICAgIGNvbnN0ICRmaWVsZCA9ICQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGVsZXRlSUQpKTtcblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW9kYWxDbG9zZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJGZpZWxkLnJlbW92ZUNsYXNzKCdkZWxldGluZycpO1xuICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAvLyBDaGVjayBpZiB1c2VyIGlzIHN1cmUgdGhleSB3YW50IHRvIHJlbW92ZSB0aGUgZmllbGRcbiAgICAgIGlmIChvcHRzLmZpZWxkUmVtb3ZlV2Fybikge1xuICAgICAgICBsZXQgd2FybkgzID0gdXRpbHMubWFya3VwKCdoMycsIG9wdHMubWVzc2FnZXMud2FybmluZyk7XG4gICAgICAgIGxldCB3YXJuTWVzc2FnZSA9IHV0aWxzLm1hcmt1cCgncCcsIG9wdHMubWVzc2FnZXMuZmllbGRSZW1vdmVXYXJuaW5nKTtcbiAgICAgICAgX2hlbHBlcnMuY29uZmlybShbd2FybkgzLCB3YXJuTWVzc2FnZV0sICgpID0+XG4gICAgICAgICAgX2hlbHBlcnMucmVtb3ZlRmllbGQoZGVsZXRlSUQpLCBjb29yZHMpO1xuICAgICAgICAkZmllbGQuYWRkQ2xhc3MoJ2RlbGV0aW5nJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfaGVscGVycy5yZW1vdmVGaWVsZChkZWxldGVJRCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBVcGRhdGUgYnV0dG9uIHN0eWxlIHNlbGVjdGlvblxuICAgICRzb3J0YWJsZUZpZWxkcy5vbignY2xpY2snLCAnLnN0eWxlLXdyYXAgYnV0dG9uJywgZSA9PiB7XG4gICAgICBjb25zdCAkYnV0dG9uID0gJChlLnRhcmdldCk7XG4gICAgICBsZXQgc3R5bGVWYWwgPSAkYnV0dG9uLnZhbCgpO1xuICAgICAgbGV0ICRidG5TdHlsZSA9ICRidXR0b24ucGFyZW50KCkucHJldignLmJ0bi1zdHlsZScpO1xuICAgICAgJGJ0blN0eWxlLnZhbChzdHlsZVZhbCk7XG4gICAgICAkYnV0dG9uLnNpYmxpbmdzKCcuYnRuJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJGJ1dHRvbi5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICBfaGVscGVycy51cGRhdGVQcmV2aWV3KCRidG5TdHlsZS5jbG9zZXN0KCcuZm9ybS1maWVsZCcpKTtcbiAgICAgIF9oZWxwZXJzLnNhdmUoKTtcbiAgICB9KTtcblxuICAgIC8vIEF0dGFjaCBhIGNhbGxiYWNrIHRvIHRvZ2dsZSByZXF1aXJlZCBhc3Rlcmlza1xuICAgICRzb3J0YWJsZUZpZWxkcy5vbignY2xpY2snLCAnLmZsZC1yZXF1aXJlZCcsIGUgPT4ge1xuICAgICAgJChlLnRhcmdldCkuY2xvc2VzdCgnLmZvcm0tZmllbGQnKS5maW5kKCcucmVxdWlyZWQtYXN0ZXJpc2snKS50b2dnbGUoKTtcbiAgICB9KTtcblxuICAgIC8vIEF0dGFjaCBhIGNhbGxiYWNrIHRvIHRvZ2dsZSByb2xlcyB2aXNpYmlsaXR5XG4gICAgJHNvcnRhYmxlRmllbGRzLm9uKCdjbGljaycsICdpbnB1dC5mbGQtYWNjZXNzJywgZnVuY3Rpb24oZSkge1xuICAgICAgbGV0IHJvbGVzID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLmZvcm0tZmllbGQnKS5maW5kKCcuYXZhaWxhYmxlLXJvbGVzJyk7XG4gICAgICBsZXQgZW5hYmxlUm9sZXNDQiA9ICQoZS50YXJnZXQpO1xuICAgICAgcm9sZXMuc2xpZGVUb2dnbGUoMjUwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFlbmFibGVSb2xlc0NCLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgJCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJywgcm9sZXMpLnJlbW92ZUF0dHIoJ2NoZWNrZWQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBBdHRhY2ggYSBjYWxsYmFjayB0byBhZGQgbmV3IG9wdGlvbnNcbiAgICAkc29ydGFibGVGaWVsZHMub24oJ2NsaWNrJywgJy5hZGQtb3B0JywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0ICRvcHRpb25XcmFwID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLmZpZWxkLW9wdGlvbnMnKTtcbiAgICAgIGxldCAkbXVsdGlwbGUgPSAkKCdbbmFtZT1cIm11bHRpcGxlXCJdJywgJG9wdGlvbldyYXApO1xuICAgICAgbGV0ICRmaXJzdE9wdGlvbiA9ICQoJy5vcHRpb24tc2VsZWN0ZWQ6ZXEoMCknLCAkb3B0aW9uV3JhcCk7XG4gICAgICBsZXQgaXNNdWx0aXBsZSA9IGZhbHNlO1xuXG4gICAgICBpZiAoJG11bHRpcGxlLmxlbmd0aCkge1xuICAgICAgICBpc011bHRpcGxlID0gJG11bHRpcGxlLnByb3AoJ2NoZWNrZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzTXVsdGlwbGUgPSAoJGZpcnN0T3B0aW9uLmF0dHIoJ3R5cGUnKSA9PT0gJ2NoZWNrYm94Jyk7XG4gICAgICB9XG5cbiAgICAgIGxldCBuYW1lID0gJGZpcnN0T3B0aW9uLmF0dHIoJ25hbWUnKTtcblxuICAgICAgJCgnLnNvcnRhYmxlLW9wdGlvbnMnLCAkb3B0aW9uV3JhcCkuYXBwZW5kKHNlbGVjdEZpZWxkT3B0aW9ucyhuYW1lLCBmYWxzZSwgaXNNdWx0aXBsZSkpO1xuICAgIH0pO1xuXG4gICAgJHNvcnRhYmxlRmllbGRzLm9uKCdtb3VzZW92ZXIgbW91c2VvdXQnLCAnLnJlbW92ZSwgLmRlbC1idXR0b24nLCBlID0+XG4gICAgICAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuZm9ybS1maWVsZCcpLnRvZ2dsZUNsYXNzKCdkZWxldGUnKSk7XG5cbiAgICBpZiAob3B0cy5zaG93QWN0aW9uQnV0dG9ucykge1xuICAgICAgLy8gVmlldyBYTUxcbiAgICAgIGxldCB4bWxCdXR0b24gPSAkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGZybWJJRCArICctdmlldy1kYXRhJykpO1xuICAgICAgeG1sQnV0dG9uLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBfaGVscGVycy5zaG93RGF0YSgpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIENsZWFyIGFsbCBmaWVsZHMgaW4gZm9ybSBlZGl0b3JcbiAgICAgIGxldCBjbGVhckJ1dHRvbiA9ICQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZnJtYklEICsgJy1jbGVhci1hbGwnKSk7XG4gICAgICBjbGVhckJ1dHRvbi5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGxldCBmaWVsZHMgPSAkKCdsaS5mb3JtLWZpZWxkJyk7XG4gICAgICAgIGxldCBidXR0b25Qb3NpdGlvbiA9IGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBsZXQgYm9keVJlY3QgPSBkb2N1bWVudC5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBsZXQgY29vcmRzID0ge1xuICAgICAgICAgIHBhZ2VYOiBidXR0b25Qb3NpdGlvbi5sZWZ0ICsgKGJ1dHRvblBvc2l0aW9uLndpZHRoIC8gMiksXG4gICAgICAgICAgcGFnZVk6IChidXR0b25Qb3NpdGlvbi50b3AgLSBib2R5UmVjdC50b3ApIC0gMTJcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgIF9oZWxwZXJzLmNvbmZpcm0ob3B0cy5tZXNzYWdlcy5jbGVhckFsbE1lc3NhZ2UsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX2hlbHBlcnMucmVtb3ZlQWxsZmllbGRzKCk7XG4gICAgICAgICAgICBvcHRzLm5vdGlmeS5zdWNjZXNzKG9wdHMubWVzc2FnZXMuYWxsRmllbGRzUmVtb3ZlZCk7XG4gICAgICAgICAgICBfaGVscGVycy5zYXZlKCk7XG4gICAgICAgICAgfSwgY29vcmRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfaGVscGVycy5kaWFsb2coJ1RoZXJlIGFyZSBubyBmaWVsZHMgdG8gY2xlYXInLCBjb29yZHMpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gU2F2ZSBJZGVhIFRlbXBsYXRlXG4gICAgICAkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGZybWJJRCArICctc2F2ZScpKS5jbGljayhlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBfaGVscGVycy5zYXZlKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBfaGVscGVycy5nZXREYXRhKCk7XG4gICAgbG9hZEZpZWxkcygpO1xuXG4gICAgJHNvcnRhYmxlRmllbGRzLmNzcygnbWluLWhlaWdodCcsICRjYlVMLmhlaWdodCgpKTtcblxuICAgIC8vIElmIG9wdGlvbiBzZXQsIGNvbnRyb2xzIHdpbGwgcmVtYWluIGluIHZpZXcgaW4gZWRpdG9yXG4gICAgaWYgKG9wdHMuc3RpY2t5Q29udHJvbHMpIHtcbiAgICAgIF9oZWxwZXJzLnN0aWNreUNvbnRyb2xzKCRzb3J0YWJsZUZpZWxkcyk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChmb3JtQnVpbGRlci5ldmVudHMubG9hZGVkKTtcblxuICAgIC8vIE1ha2UgYWN0aW9ucyBhY2Nlc3NpYmxlXG4gICAgZm9ybUJ1aWxkZXIuYWN0aW9ucyA9IHtcbiAgICAgIGNsZWFyRmllbGRzOiBfaGVscGVycy5yZW1vdmVBbGxmaWVsZHMsXG4gICAgICBzaG93RGF0YTogX2hlbHBlcnMuc2hvd0RhdGEsXG4gICAgICBzYXZlOiBfaGVscGVycy5zYXZlLFxuICAgICAgYWRkRmllbGQ6IChmaWVsZCwgaW5kZXgpID0+IHtcbiAgICAgICAgX2hlbHBlcnMuc3RvcEluZGV4ID0gZm9ybUJ1aWxkZXIuc3RhZ2UuY2hpbGRyZW4ubGVuZ3RoID8gaW5kZXggOiB1bmRlZmluZWQ7XG4gICAgICAgIHByZXBGaWVsZFZhcnMoZmllbGQpO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGZvcm1CdWlsZGVyLmV2ZW50cy5maWVsZEFkZGVkKTtcbiAgICAgIH0sXG4gICAgICByZW1vdmVGaWVsZDogX2hlbHBlcnMucmVtb3ZlRmllbGQsXG4gICAgICBzZXREYXRhOiBmb3JtRGF0YSA9PiB7XG4gICAgICAgIF9oZWxwZXJzLnJlbW92ZUFsbGZpZWxkcygpO1xuICAgICAgICBfaGVscGVycy5nZXREYXRhKGZvcm1EYXRhKTtcbiAgICAgICAgbG9hZEZpZWxkcygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gZm9ybUJ1aWxkZXI7XG4gIH07XG5cbiAgJC5mbi5mb3JtQnVpbGRlciA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgbGV0IGVsZW1zID0gdGhpcztcbiAgICByZXR1cm4gZWxlbXMuZWFjaCgoaSkgPT4ge1xuICAgICAgbGV0IGZvcm1CdWlsZGVyID0gbmV3IEZvcm1CdWlsZGVyKG9wdGlvbnMsIGVsZW1zW2ldKTtcbiAgICAgICQoZWxlbXNbaV0pLmRhdGEoJ2Zvcm1CdWlsZGVyJywgZm9ybUJ1aWxkZXIpO1xuXG4gICAgICByZXR1cm4gZm9ybUJ1aWxkZXI7XG4gICAgfSk7XG4gIH07XG59KShqUXVlcnkpO1xuIiwiLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb25zIHNwZWNpZmljIHRvIGZvcm1CdWlsZGVyLlxuICogQ2FsbGVkIGZvcm0gZm9ybUJ1aWxkZXJcbiAqIEBwYXJhbSAge09iamVjdH0gICBvcHRzXG4gKiBAcGFyYW0gIHtJbnN0YW5jZX0gZm9ybUJ1aWxkZXJcbiAqIEByZXR1cm4ge09iamVjdH0gaGVscGVyIGZ1bmN0aW9uc1xuICovXG5mdW5jdGlvbiBoZWxwZXJzKG9wdHMsIGZvcm1CdWlsZGVyKSB7XG4gIGxldCBfaGVscGVycyA9IHtcbiAgICBkb0NhbmNlbDogZmFsc2VcbiAgfTtcblxuICBjb25zdCB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMuanMnKTtcbiAgZm9ybUJ1aWxkZXIuZXZlbnRzID0gcmVxdWlyZSgnLi9ldmVudHMuanMnKTtcblxuICAvKipcbiAgICogQ29udmVydCBjb252ZXJ0cyBtZXNzeSBgY2wjc3NOYW1lc2AgaW50byB2YWxpZCBgY2xhc3MtbmFtZXNgXG4gICAqXG4gICAqIEBwYXJhbSAge1N0cmluZ30gc3RyXG4gICAqIEByZXR1cm4ge1N0cmluZ30gaHlwaGVuYXRlZCBzdHJpbmdcbiAgICovXG4gIF9oZWxwZXJzLm1ha2VDbGFzc05hbWUgPSAoc3RyKSA9PiB7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL1teXFx3XFxzXFwtXS9naSwgJycpO1xuICAgIHJldHVybiB1dGlscy5oeXBoZW5DYXNlKHN0cik7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBhIG1vYmlsZSBjbGFzc1xuICAgKiBAdG9kbyBmaW5kIGNzcyBvbmx5IHNvbHV0aW9uXG4gICAqIEByZXR1cm4ge1N0cmluZ30gTW9iaWxlIGNsYXNzIGFkZGVkIHRvIGZvcm1CdWlsZGVyXG4gICAqL1xuICBfaGVscGVycy5tb2JpbGVDbGFzcyA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBtb2JpbGVDbGFzcyA9ICcnO1xuICAgIChmdW5jdGlvbihhKSB7XG4gICAgICBpZiAoLyhhbmRyb2lkfGJiXFxkK3xtZWVnbykuK21vYmlsZXxhdmFudGdvfGJhZGFcXC98YmxhY2tiZXJyeXxibGF6ZXJ8Y29tcGFsfGVsYWluZXxmZW5uZWN8aGlwdG9wfGllbW9iaWxlfGlwKGhvbmV8b2QpfGlyaXN8a2luZGxlfGxnZSB8bWFlbW98bWlkcHxtbXB8bW9iaWxlLitmaXJlZm94fG5ldGZyb250fG9wZXJhIG0ob2J8aW4paXxwYWxtKCBvcyk/fHBob25lfHAoaXhpfHJlKVxcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFxcLihicm93c2VyfGxpbmspfHZvZGFmb25lfHdhcHx3aW5kb3dzIGNlfHhkYXx4aWluby9pLnRlc3QoYSkgfHwgLzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2kudGVzdChhLnN1YnN0cigwLCA0KSkpIHtcbiAgICAgICAgbW9iaWxlQ2xhc3MgPSAnIGZiLW1vYmlsZSc7XG4gICAgICB9XG4gICAgfSkobmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvdy5vcGVyYSk7XG4gICAgcmV0dXJuIG1vYmlsZUNsYXNzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBmb3Igd2hlbiBhIGRyYWcgYmVnaW5zXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gZXZlbnRcbiAgICogQHBhcmFtICB7T2JqZWN0fSB1aVxuICAgKi9cbiAgX2hlbHBlcnMuc3RhcnRNb3ZpbmcgPSBmdW5jdGlvbihldmVudCwgdWkpIHtcbiAgICB1aS5pdGVtLnNob3coKS5hZGRDbGFzcygnbW92aW5nJyk7XG4gICAgX2hlbHBlcnMuc3RhcnRJbmRleCA9ICQoJ2xpJywgdGhpcykuaW5kZXgodWkuaXRlbSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGZvciB3aGVuIGEgZHJhZyBlbmRzXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gZXZlbnRcbiAgICogQHBhcmFtICB7T2JqZWN0fSB1aVxuICAgKi9cbiAgX2hlbHBlcnMuc3RvcE1vdmluZyA9IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuICAgIHVpLml0ZW0ucmVtb3ZlQ2xhc3MoJ21vdmluZycpO1xuICAgIGlmIChfaGVscGVycy5kb0NhbmNlbCkge1xuICAgICAgJCh1aS5zZW5kZXIpLnNvcnRhYmxlKCdjYW5jZWwnKTtcbiAgICAgICQodGhpcykuc29ydGFibGUoJ2NhbmNlbCcpO1xuICAgIH1cbiAgICBfaGVscGVycy5zYXZlKCk7XG4gICAgX2hlbHBlcnMuZG9DYW5jZWwgPSBmYWxzZTtcbiAgfTtcblxuICAvKipcbiAgICogalF1ZXJ5IFVJIHNvcnRhYmxlIGJlZm9yZVN0b3AgY2FsbGJhY2sgdXNlZCBmb3IgYm90aCBsaXN0cy5cbiAgICogTG9naWMgZm9yIGNhbmNlbGluZyB0aGUgc29ydCBvciBkcm9wLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IGV2ZW50XG4gICAqIEBwYXJhbSAge09iamVjdH0gdWlcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIF9oZWxwZXJzLmJlZm9yZVN0b3AgPSBmdW5jdGlvbihldmVudCwgdWkpIHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZm9ybUJ1aWxkZXIuZm9ybUlEKTtcbiAgICBsZXQgbGFzdEluZGV4ID0gZm9ybS5jaGlsZHJlbi5sZW5ndGggLSAxO1xuICAgIGxldCBjYW5jZWxBcnJheSA9IFtdO1xuICAgIF9oZWxwZXJzLnN0b3BJbmRleCA9IHVpLnBsYWNlaG9sZGVyLmluZGV4KCkgLSAxO1xuXG4gICAgaWYgKCFvcHRzLnNvcnRhYmxlQ29udHJvbHMgJiYgdWkuaXRlbS5wYXJlbnQoKS5oYXNDbGFzcygnZnJtYi1jb250cm9sJykpIHtcbiAgICAgIGNhbmNlbEFycmF5LnB1c2godHJ1ZSk7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMucHJlcGVuZCkge1xuICAgICAgY2FuY2VsQXJyYXkucHVzaChfaGVscGVycy5zdG9wSW5kZXggPT09IDApO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmFwcGVuZCkge1xuICAgICAgY2FuY2VsQXJyYXkucHVzaCgoX2hlbHBlcnMuc3RvcEluZGV4ICsgMSkgPT09IGxhc3RJbmRleCk7XG4gICAgfVxuXG4gICAgX2hlbHBlcnMuZG9DYW5jZWwgPSBjYW5jZWxBcnJheS5zb21lKGVsZW0gPT4gZWxlbSA9PT0gdHJ1ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIE1ha2Ugc3RyaW5ncyBzYWZlIHRvIGJlIHVzZWQgYXMgY2xhc3Nlc1xuICAgKlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHN0ciBzdHJpbmcgdG8gYmUgY29udmVydGVkXG4gICAqIEByZXR1cm4ge1N0cmluZ30gICAgIGNvbnZlcnRlciBzdHJpbmdcbiAgICovXG4gIF9oZWxwZXJzLnNhZmVuYW1lID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHMvZywgJy0nKS5yZXBsYWNlKC9bXmEtekEtWjAtOVxcLV0vZywgJycpLnRvTG93ZXJDYXNlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFN0cmlwcyBub24tbnVtYmVycyBmcm9tIGEgbnVtYmVyIG9ubHkgaW5wdXRcbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSBzdHIgc3RyaW5nIHdpdGggcG9zc2libGUgbnVtYmVyXG4gICAqIEByZXR1cm4ge3N0cmluZ30gICAgIHN0cmluZyB3aXRob3V0IG51bWJlcnNcbiAgICovXG4gIF9oZWxwZXJzLmZvcmNlTnVtYmVyID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXjAtOV0vZywgJycpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBoaWRlIGFuZCBzaG93IG1vdXNlIHRyYWNraW5nIHRvb2x0aXBzLCBvbmx5IHVzZWQgZm9yIGRpc2FibGVkXG4gICAqIGZpZWxkcyBpbiB0aGUgZWRpdG9yLlxuICAgKlxuICAgKiBAdG9kbyAgIHJlbW92ZSBvciByZWZhY3RvciB0byBtYWtlIGJldHRlciB1c2VcbiAgICogQHBhcmFtICB7T2JqZWN0fSB0dCBqUXVlcnkgb3B0aW9uIHdpdGggbmV4dGVkIHRvb2x0aXBcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIF9oZWxwZXJzLmluaXRUb29sdGlwID0gZnVuY3Rpb24odHQpIHtcbiAgICBjb25zdCB0b29sdGlwID0gdHQuZmluZCgnLnRvb2x0aXAnKTtcbiAgICB0dC5tb3VzZWVudGVyKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRvb2x0aXAub3V0ZXJXaWR0aCgpID4gMjAwKSB7XG4gICAgICAgIHRvb2x0aXAuYWRkQ2xhc3MoJ21heC13aWR0aCcpO1xuICAgICAgfVxuICAgICAgdG9vbHRpcC5jc3MoJ2xlZnQnLCB0dC53aWR0aCgpICsgMTQpO1xuICAgICAgdG9vbHRpcC5zdG9wKHRydWUsIHRydWUpLmZhZGVJbignZmFzdCcpO1xuICAgIH0pLm1vdXNlbGVhdmUoZnVuY3Rpb24oKSB7XG4gICAgICB0dC5maW5kKCcudG9vbHRpcCcpLnN0b3AodHJ1ZSwgdHJ1ZSkuZmFkZU91dCgnZmFzdCcpO1xuICAgIH0pO1xuICAgIHRvb2x0aXAuaGlkZSgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBdHRlbXB0cyB0byBnZXQgZWxlbWVudCB0eXBlIGFuZCBzdWJ0eXBlXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gJGZpZWxkXG4gICAqIEByZXR1cm4ge09iamVjdH0ge3R5cGU6ICdmaWVsZFR5cGUnLCBzdWJ0eXBlOiAnZmllbGRTdWJUeXBlJ31cbiAgICovXG4gIF9oZWxwZXJzLmdldFR5cGVzID0gZnVuY3Rpb24oJGZpZWxkKSB7XG4gICAgbGV0IHR5cGVzID0ge1xuICAgICAgICB0eXBlOiAkZmllbGQuYXR0cigndHlwZScpXG4gICAgICB9O1xuICAgIGxldCBzdWJ0eXBlID0gJCgnLmZsZC1zdWJ0eXBlJywgJGZpZWxkKS52YWwoKTtcblxuICAgIGlmIChzdWJ0eXBlICE9PSB0eXBlcy50eXBlKSB7XG4gICAgICB0eXBlcy5zdWJ0eXBlID0gc3VidHlwZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHlwZXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBvcHRpb24gZGF0YSBmb3IgYSBmaWVsZFxuICAgKiBAcGFyYW0gIHtPYmplY3R9IGZpZWxkIGpRdWVyeSBmaWVsZCBvYmplY3RcbiAgICogQHJldHVybiB7QXJyYXl9ICAgICAgICBBcnJheSBvZiBvcHRpb24gdmFsdWVzXG4gICAqL1xuICBfaGVscGVycy5maWVsZE9wdGlvbkRhdGEgPSBmdW5jdGlvbihmaWVsZCkge1xuICAgIGxldCBvcHRpb25zID0gW107XG5cbiAgICAkKCcuc29ydGFibGUtb3B0aW9ucyBsaScsIGZpZWxkKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgbGV0ICRvcHRpb24gPSAkKHRoaXMpO1xuICAgICAgY29uc3Qgc2VsZWN0ZWQgPSAkKCcub3B0aW9uLXNlbGVjdGVkJywgJG9wdGlvbikuaXMoJzpjaGVja2VkJyk7XG4gICAgICBsZXQgYXR0cnMgPSB7XG4gICAgICAgICAgbGFiZWw6ICQoJy5vcHRpb24tbGFiZWwnLCAkb3B0aW9uKS52YWwoKSxcbiAgICAgICAgICB2YWx1ZTogJCgnLm9wdGlvbi12YWx1ZScsICRvcHRpb24pLnZhbCgpXG4gICAgICAgIH07XG5cbiAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICBhdHRycy5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgICAgfVxuXG4gICAgICBvcHRpb25zLnB1c2goYXR0cnMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFhNTCBzYXZlXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gZm9ybSBzb3J0YWJsZUZpZWxkcyBub2RlXG4gICAqIEByZXR1cm4ge1N0cmluZ30geG1sIGluIHN0cmluZ1xuICAgKi9cbiAgX2hlbHBlcnMueG1sU2F2ZSA9IGZ1bmN0aW9uKGZvcm0pIHtcbiAgICBjb25zdCBtID0gdXRpbHMubWFya3VwO1xuICAgIGxldCBmb3JtRGF0YSA9IF9oZWxwZXJzLnByZXBEYXRhKGZvcm0pO1xuICAgIGxldCB4bWwgPSBbJzxmb3JtLXRlbXBsYXRlPlxcblxcdDxmaWVsZHM+J107XG5cbiAgICB1dGlscy5mb3JFYWNoKGZvcm1EYXRhLCBmdW5jdGlvbihmaWVsZEluZGV4LCBmaWVsZCkge1xuICAgICAgbGV0IGZpZWxkQ29udGVudCA9IG51bGw7XG5cbiAgICAgIC8vIEhhbmRsZSBvcHRpb25zXG4gICAgICBpZiAoZmllbGQudHlwZS5tYXRjaCgvKHNlbGVjdHxjaGVja2JveC1ncm91cHxyYWRpby1ncm91cCkvKSkge1xuICAgICAgICBsZXQgb3B0aW9uRGF0YSA9IGZpZWxkLnZhbHVlcztcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbkRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBsZXQgb3B0aW9uID0gbSgnb3B0aW9uJywgb3B0aW9uRGF0YVtpXS5sYWJlbCwgb3B0aW9uRGF0YVtpXSkub3V0ZXJIVE1MO1xuICAgICAgICAgIG9wdGlvbnMucHVzaCgnXFxuXFx0XFx0XFx0JyArIG9wdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy5wdXNoKCdcXG5cXHRcXHQnKTtcblxuICAgICAgICBmaWVsZENvbnRlbnQgPSBvcHRpb25zLmpvaW4oJycpO1xuICAgICAgICBkZWxldGUgZmllbGQudmFsdWVzO1xuICAgICAgfVxuXG4gICAgICBsZXQgeG1sRmllbGQgPSBtKCdmaWVsZCcsIGZpZWxkQ29udGVudCwgZmllbGQpO1xuICAgICAgeG1sLnB1c2goJ1xcblxcdFxcdCcgKyB4bWxGaWVsZC5vdXRlckhUTUwpO1xuICAgIH0pO1xuXG4gICAgeG1sLnB1c2goJ1xcblxcdDwvZmllbGRzPlxcbjwvZm9ybS10ZW1wbGF0ZT4nKTtcblxuICAgIHJldHVybiB4bWwuam9pbignJyk7XG4gIH07XG5cbiAgX2hlbHBlcnMucHJlcERhdGEgPSBmdW5jdGlvbihmb3JtKSB7XG4gICAgbGV0IGZvcm1EYXRhID0gW107XG5cbiAgICBpZiAoZm9ybS5jaGlsZE5vZGVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgLy8gYnVpbGQgZGF0YSBvYmplY3RcbiAgICAgIHV0aWxzLmZvckVhY2goZm9ybS5jaGlsZE5vZGVzLCBmdW5jdGlvbihpbmRleCwgZmllbGQpIHtcbiAgICAgICAgbGV0ICRmaWVsZCA9ICQoZmllbGQpO1xuXG4gICAgICAgIGlmICghKCRmaWVsZC5oYXNDbGFzcygnZGlzYWJsZWQnKSkpIHtcbiAgICAgICAgICBsZXQgZmllbGREYXRhID0gX2hlbHBlcnMuZ2V0VHlwZXMoJGZpZWxkKTtcbiAgICAgICAgICBsZXQgcm9sZVZhbHMgPSAkKCcucm9sZXMtZmllbGQ6Y2hlY2tlZCcsIGZpZWxkKS5tYXAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgfSkuZ2V0KCk7XG5cbiAgICAgICAgICAkKCdbY2xhc3MqPVwiZmxkLVwiXScsIGZpZWxkKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgYXR0ciA9IHRoaXM7XG4gICAgICAgICAgICBsZXQgbmFtZSA9IHV0aWxzLmNhbWVsQ2FzZShhdHRyLm5hbWUpO1xuICAgICAgICAgICAgZmllbGREYXRhW25hbWVdID0gYXR0ci50eXBlID09PSAnY2hlY2tib3gnID8gYXR0ci5jaGVja2VkIDogYXR0ci52YWx1ZTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmIChyb2xlVmFscy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZpZWxkRGF0YS5yb2xlID0gcm9sZVZhbHMuam9pbignLCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZpZWxkRGF0YS5jbGFzc05hbWUgPSBmaWVsZERhdGEuY2xhc3NOYW1lIHx8IGZpZWxkRGF0YS5jbGFzcztcblxuICAgICAgICAgIGxldCBtYXRjaCA9IC8oPzpefFxccylidG4tKC4qPykoPzpcXHN8JCkvZy5leGVjKGZpZWxkRGF0YS5jbGFzc05hbWUpO1xuICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgZmllbGREYXRhLnN0eWxlID0gbWF0Y2hbMV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmllbGREYXRhID0gdXRpbHMudHJpbU9iaihmaWVsZERhdGEpO1xuICAgICAgICAgIGZpZWxkRGF0YSA9IHV0aWxzLmVzY2FwZUF0dHJzKGZpZWxkRGF0YSk7XG5cbiAgICAgICAgICBsZXQgbXVsdGlwbGVGaWVsZCA9IGZpZWxkRGF0YVxuICAgICAgICAgIC50eXBlLm1hdGNoKC8oc2VsZWN0fGNoZWNrYm94LWdyb3VwfHJhZGlvLWdyb3VwKS8pO1xuXG4gICAgICAgICAgaWYgKG11bHRpcGxlRmllbGQpIHtcbiAgICAgICAgICAgIGZpZWxkRGF0YS52YWx1ZXMgPSBfaGVscGVycy5maWVsZE9wdGlvbkRhdGEoJGZpZWxkKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3JtRGF0YS5wdXNoKGZpZWxkRGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBmb3JtRGF0YTtcbiAgfTtcblxuICBfaGVscGVycy5qc29uU2F2ZSA9IGZvcm0gPT5cbiAgICB3aW5kb3cuSlNPTi5zdHJpbmdpZnkoX2hlbHBlcnMucHJlcERhdGEoZm9ybSksIG51bGwsICdcXHQnKTtcblxuICBfaGVscGVycy5nZXREYXRhID0gZm9ybURhdGEgPT4ge1xuICAgIGxldCBkYXRhID0gZm9ybURhdGEgfHwgb3B0cy5mb3JtRGF0YTtcblxuICAgIGlmICghZGF0YSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGxldCBzZXREYXRhID0ge1xuICAgICAgeG1sOiBmb3JtRGF0YSA9PiB1dGlscy5wYXJzZVhNTChmb3JtRGF0YSksXG4gICAgICBqc29uOiBmb3JtRGF0YSA9PiB3aW5kb3cuSlNPTi5wYXJzZShmb3JtRGF0YSlcbiAgICB9O1xuXG4gICAgZm9ybUJ1aWxkZXIuZm9ybURhdGEgPSBzZXREYXRhW29wdHMuZGF0YVR5cGVdKGRhdGEpIHx8IFtdO1xuXG4gICAgcmV0dXJuIGZvcm1CdWlsZGVyLmZvcm1EYXRhO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTYXZlcyBhbmQgcmV0dXJucyBmb3JtRGF0YVxuICAgKiBAcmV0dXJuIHtYTUx8SlNPTn0gZm9ybURhdGFcbiAgICovXG4gIF9oZWxwZXJzLnNhdmUgPSBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZm9ybUJ1aWxkZXIuZm9ybUlEKTtcblxuICAgIGxldCBkb1NhdmUgPSB7XG4gICAgICB4bWw6IF9oZWxwZXJzLnhtbFNhdmUsXG4gICAgICBqc29uOiBfaGVscGVycy5qc29uU2F2ZVxuICAgIH07XG5cbiAgICAvLyBzYXZlIGFjdGlvbiBmb3IgY3VycmVudCBgZGF0YVR5cGVgXG4gICAgZm9ybUJ1aWxkZXIuZm9ybURhdGEgPSBkb1NhdmVbb3B0cy5kYXRhVHlwZV0oZm9ybSk7XG5cbiAgICAvLyB0cmlnZ2VyIGZvcm1TYXZlZCBldmVudFxuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZm9ybUJ1aWxkZXIuZXZlbnRzLmZvcm1TYXZlZCk7XG4gICAgcmV0dXJuIGZvcm1CdWlsZGVyLmZvcm1EYXRhO1xuICB9O1xuXG4gIC8qKlxuICAgKiBpbmNyZW1lbnRzIHRoZSBmaWVsZCBpZHMgd2l0aCBzdXBwb3J0IGZvciBtdWx0aXBsZSBlZGl0b3JzXG4gICAqIEBwYXJhbSAge1N0cmluZ30gaWQgZmllbGQgSURcbiAgICogQHJldHVybiB7U3RyaW5nfSAgICBpbmNyZW1lbnRlZCBmaWVsZCBJRFxuICAgKi9cbiAgX2hlbHBlcnMuaW5jcmVtZW50SWQgPSBmdW5jdGlvbihpZCkge1xuICAgIGxldCBzcGxpdCA9IGlkLmxhc3RJbmRleE9mKCctJyk7XG4gICAgbGV0IG5ld0ZpZWxkTnVtYmVyID0gcGFyc2VJbnQoaWQuc3Vic3RyaW5nKHNwbGl0ICsgMSkpICsgMTtcbiAgICBsZXQgYmFzZVN0cmluZyA9IGlkLnN1YnN0cmluZygwLCBzcGxpdCk7XG5cbiAgICByZXR1cm4gYCR7YmFzZVN0cmluZ30tJHtuZXdGaWVsZE51bWJlcn1gO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDb2xsZWN0IGZpZWxkIGF0dHJpYnV0ZSB2YWx1ZXMgYW5kIGNhbGwgZmllbGRQcmV2aWV3IHRvIGdlbmVyYXRlIHByZXZpZXdcbiAgICogQHBhcmFtICB7T2JqZWN0fSBmaWVsZCBET00gZWxlbWVudFxuICAgKi9cbiAgX2hlbHBlcnMudXBkYXRlUHJldmlldyA9IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgY29uc3QgZmllbGRDbGFzcyA9IGZpZWxkLmF0dHIoJ2NsYXNzJyk7XG4gICAgaWYgKGZpZWxkQ2xhc3MuaW5kZXhPZigndWktc29ydGFibGUtaGFuZGxlJykgIT09IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGZpZWxkVHlwZSA9ICQoZmllbGQpLmF0dHIoJ3R5cGUnKTtcbiAgICBsZXQgJHByZXZIb2xkZXIgPSAkKCcucHJldi1ob2xkZXInLCBmaWVsZCk7XG4gICAgbGV0IHByZXZpZXdEYXRhID0ge1xuICAgICAgdHlwZTogZmllbGRUeXBlXG4gICAgfTtcbiAgICBsZXQgcHJldmlldztcblxuICAgICQoJ1tjbGFzcyo9XCJmbGQtXCJdJywgZmllbGQpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBsZXQgbmFtZSA9IHV0aWxzLmNhbWVsQ2FzZSh0aGlzLm5hbWUpO1xuICAgICAgcHJldmlld0RhdGFbbmFtZV0gPSB0aGlzLnR5cGUgPT09ICdjaGVja2JveCcgPyB0aGlzLmNoZWNrZWQgOiB0aGlzLnZhbHVlO1xuICAgIH0pO1xuXG4gICAgbGV0IHN0eWxlID0gJCgnLmJ0bi1zdHlsZScsIGZpZWxkKS52YWwoKTtcbiAgICBpZiAoc3R5bGUpIHtcbiAgICAgIHByZXZpZXdEYXRhLnN0eWxlID0gc3R5bGU7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkVHlwZS5tYXRjaCgvKHNlbGVjdHxjaGVja2JveC1ncm91cHxyYWRpby1ncm91cCkvKSkge1xuICAgICAgcHJldmlld0RhdGEudmFsdWVzID0gW107XG4gICAgICBwcmV2aWV3RGF0YS5tdWx0aXBsZSA9ICQoJ1tuYW1lPVwibXVsdGlwbGVcIl0nLCBmaWVsZCkuaXMoJzpjaGVja2VkJyk7XG5cbiAgICAgICQoJy5zb3J0YWJsZS1vcHRpb25zIGxpJywgZmllbGQpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBvcHRpb24gPSB7fTtcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gJCgnLm9wdGlvbi1zZWxlY3RlZCcsIHRoaXMpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgICBvcHRpb24udmFsdWUgPSAkKCcub3B0aW9uLXZhbHVlJywgdGhpcykudmFsKCk7XG4gICAgICAgIG9wdGlvbi5sYWJlbCA9ICQoJy5vcHRpb24tbGFiZWwnLCB0aGlzKS52YWwoKTtcbiAgICAgICAgcHJldmlld0RhdGEudmFsdWVzLnB1c2gob3B0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHByZXZpZXdEYXRhID0gdXRpbHMudHJpbU9iaihwcmV2aWV3RGF0YSk7XG5cbiAgICBwcmV2aWV3RGF0YS5jbGFzc05hbWUgPSBfaGVscGVycy5jbGFzc05hbWVzKGZpZWxkLCBwcmV2aWV3RGF0YSk7XG4gICAgJCgnLmZsZC1jbGFzc05hbWUnLCBmaWVsZCkudmFsKHByZXZpZXdEYXRhLmNsYXNzTmFtZSk7XG5cbiAgICBmaWVsZC5kYXRhKCdmaWVsZERhdGEnLCBwcmV2aWV3RGF0YSk7XG4gICAgcHJldmlldyA9IHV0aWxzLmZpZWxkUmVuZGVyKHByZXZpZXdEYXRhLCBvcHRzLCB0cnVlKTtcblxuICAgICRwcmV2SG9sZGVyLmh0bWwocHJldmlldyk7XG5cbiAgICAkKCdpbnB1dFt0b2dnbGVdJywgJHByZXZIb2xkZXIpLmtjVG9nZ2xlKCk7XG4gIH07XG5cbiAgX2hlbHBlcnMuZGVib3VuY2UgPSBmdW5jdGlvbihmdW5jLCB3YWl0ID0gMjUwLCBpbW1lZGlhdGUgPSBmYWxzZSkge1xuICAgIGxldCB0aW1lb3V0O1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGxldCBjb250ZXh0ID0gdGhpcztcbiAgICAgIGxldCBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgbGV0IGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBsZXQgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICAvKipcbiAgICogRGlzcGxheSBhIGN1c3RvbSB0b29sdGlwIGZvciBkaXNhYmxlZCBmaWVsZHMuXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gZmllbGRcbiAgICovXG4gIF9oZWxwZXJzLmRpc2FibGVkVFQgPSB7XG4gICAgY2xhc3NOYW1lOiAnZnJtYi10dCcsXG4gICAgYWRkOiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgbGV0IHRpdGxlID0gb3B0cy5tZXNzYWdlcy5maWVsZE5vbkVkaXRhYmxlO1xuXG4gICAgICBpZiAodGl0bGUpIHtcbiAgICAgICAgbGV0IHR0ID0gdXRpbHMubWFya3VwKCdwJywgdGl0bGUsIHtjbGFzc05hbWU6IF9oZWxwZXJzLmRpc2FibGVkVFQuY2xhc3NOYW1lfSk7XG4gICAgICAgIGZpZWxkLmFwcGVuZCh0dCk7XG4gICAgICB9XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAkKCcuZnJtYi10dCcsIGZpZWxkKS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgX2hlbHBlcnMuY2xhc3NOYW1lcyA9IGZ1bmN0aW9uKGZpZWxkLCBwcmV2aWV3RGF0YSkge1xuICAgIGxldCBpO1xuICAgIGxldCB0eXBlID0gcHJldmlld0RhdGEudHlwZTtcbiAgICBsZXQgc3R5bGUgPSBwcmV2aWV3RGF0YS5zdHlsZTtcbiAgICBsZXQgY2xhc3NOYW1lID0gZmllbGRbMF0ucXVlcnlTZWxlY3RvcignLmZsZC1jbGFzc05hbWUnKS52YWx1ZTtcbiAgICBsZXQgY2xhc3NlcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICAgIGxldCB0eXBlcyA9IHtcbiAgICAgIGJ1dHRvbjogJ2J0bicsXG4gICAgICBzdWJtaXQ6ICdidG4nXG4gICAgfTtcblxuICAgIGxldCBwcmltYXJ5VHlwZSA9IHR5cGVzW3R5cGVdO1xuXG4gICAgaWYgKHByaW1hcnlUeXBlKSB7XG4gICAgICBpZiAoc3R5bGUpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBsZXQgcmUgPSBuZXcgUmVnRXhwKGAoPzpefFxccykke3ByaW1hcnlUeXBlfS0oLio/KSg/Olxcc3wkKStgLCAnZycpO1xuICAgICAgICAgIGxldCBtYXRjaCA9IGNsYXNzZXNbaV0ubWF0Y2gocmUpO1xuICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgY2xhc3Nlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNsYXNzZXMucHVzaChwcmltYXJ5VHlwZSArICctJyArIHN0eWxlKTtcbiAgICAgIH1cbiAgICAgIGNsYXNzZXMucHVzaChwcmltYXJ5VHlwZSk7XG4gICAgfVxuXG4gICAgLy8gcmV2ZXJzZSB0aGUgYXJyYXkgdG8gcHV0IGN1c3RvbSBjbGFzc2VzIGF0IGVuZCxcbiAgICAvLyByZW1vdmUgYW55IGR1cGxpY2F0ZXMsIGNvbnZlcnQgdG8gc3RyaW5nLCByZW1vdmUgd2hpdGVzcGFjZVxuICAgIHJldHVybiB1dGlscy51bmlxdWUoY2xhc3Nlcykuam9pbignICcpLnRyaW0oKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2xvc2VzIGFuZCBvcGVuIGRpYWxvZ1xuICAgKlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG92ZXJsYXkgRXhpc3Rpbmcgb3ZlcmxheSBpZiB0aGVyZSBpcyBvbmVcbiAgICogQHBhcmFtICB7T2JqZWN0fSBkaWFsb2cgIEV4aXN0aW5nIGRpYWxvZ1xuICAgKi9cbiAgX2hlbHBlcnMuY2xvc2VDb25maXJtID0gZnVuY3Rpb24ob3ZlcmxheSwgZGlhbG9nKSB7XG4gICAgaWYgKCFvdmVybGF5KSB7XG4gICAgICBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZm9ybS1idWlsZGVyLW92ZXJsYXknKVswXTtcbiAgICB9XG4gICAgaWYgKCFkaWFsb2cpIHtcbiAgICAgIGRpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Zvcm0tYnVpbGRlci1kaWFsb2cnKVswXTtcbiAgICB9XG4gICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCd2aXNpYmxlJyk7XG4gICAgZGlhbG9nLnJlbW92ZSgpO1xuICAgIG92ZXJsYXkucmVtb3ZlKCk7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChmb3JtQnVpbGRlci5ldmVudHMubW9kYWxDbG9zZWQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsYXlvdXQgZGF0YSBiYXNlZCBvbiBjb250cm9sUG9zaXRpb24gb3B0aW9uXG4gICAqIEBwYXJhbSAge1N0cmluZ30gY29udHJvbFBvc2l0aW9uICdsZWZ0JyBvciAncmlnaHQnXG4gICAqIEByZXR1cm4ge09iamVjdH0gbGF5b3V0IG9iamVjdFxuICAgKi9cbiAgX2hlbHBlcnMuZWRpdG9yTGF5b3V0ID0gZnVuY3Rpb24oY29udHJvbFBvc2l0aW9uKSB7XG4gICAgbGV0IGxheW91dE1hcCA9IHtcbiAgICAgIGxlZnQ6IHtcbiAgICAgICAgc3RhZ2U6ICdwdWxsLXJpZ2h0JyxcbiAgICAgICAgY29udHJvbHM6ICdwdWxsLWxlZnQnXG4gICAgICB9LFxuICAgICAgcmlnaHQ6IHtcbiAgICAgICAgc3RhZ2U6ICdwdWxsLWxlZnQnLFxuICAgICAgICBjb250cm9sczogJ3B1bGwtcmlnaHQnXG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBsYXlvdXRNYXBbY29udHJvbFBvc2l0aW9uXSA/IGxheW91dE1hcFtjb250cm9sUG9zaXRpb25dIDogJyc7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgb3ZlcmxheSB0byB0aGUgcGFnZS4gVXNlZCBmb3IgbW9kYWxzLlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IERPTSBPYmplY3RcbiAgICovXG4gIF9oZWxwZXJzLnNob3dPdmVybGF5ID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IG92ZXJsYXkgPSB1dGlscy5tYXJrdXAoJ2RpdicsIG51bGwsIHtcbiAgICAgIGNsYXNzTmFtZTogJ2Zvcm0tYnVpbGRlci1vdmVybGF5J1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XG4gICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XG5cbiAgICBvdmVybGF5Lm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIF9oZWxwZXJzLmNsb3NlQ29uZmlybShvdmVybGF5KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIG92ZXJsYXk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEN1c3RvbSBjb25maXJtYXRpb24gZGlhbG9nXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gIG1lc3NhZ2UgICBDb250ZW50IHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgZGlhbG9nXG4gICAqIEBwYXJhbSAge0Z1bmN9ICB5ZXNBY3Rpb24gY2FsbGJhY2sgdG8gZmlyZSBpZiB0aGV5IGNvbmZpcm1cbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gY29vcmRzICAgIGxvY2F0aW9uIHRvIHB1dCB0aGUgZGlhbG9nXG4gICAqIEBwYXJhbSAge1N0cmluZ30gIGNsYXNzTmFtZSBDdXN0b20gY2xhc3MgdG8gYmUgYWRkZWQgdG8gdGhlIGRpYWxvZ1xuICAgKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgUmVmZXJlbmNlIHRvIHRoZSBtb2RhbFxuICAgKi9cbiAgX2hlbHBlcnMuY29uZmlybSA9IChtZXNzYWdlLCB5ZXNBY3Rpb24sIGNvb3JkcyA9IGZhbHNlLCBjbGFzc05hbWUgPSAnJykgPT4ge1xuICAgIGNvbnN0IG0gPSB1dGlscy5tYXJrdXA7XG4gICAgbGV0IG92ZXJsYXkgPSBfaGVscGVycy5zaG93T3ZlcmxheSgpO1xuICAgIGxldCB5ZXMgPSBtKCdidXR0b24nLCBvcHRzLm1lc3NhZ2VzLnllcywge1xuICAgICAgY2xhc3NOYW1lOiAneWVzIGJ0biBidG4tc3VjY2VzcyBidG4tc20nXG4gICAgfSk7XG4gICAgbGV0IG5vID0gbSgnYnV0dG9uJywgb3B0cy5tZXNzYWdlcy5ubywge1xuICAgICAgY2xhc3NOYW1lOiAnbm8gYnRuIGJ0bi1kYW5nZXIgYnRuLXNtJ1xuICAgIH0pO1xuXG4gICAgbm8ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgX2hlbHBlcnMuY2xvc2VDb25maXJtKG92ZXJsYXkpO1xuICAgIH07XG5cbiAgICB5ZXMub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgeWVzQWN0aW9uKCk7XG4gICAgICBfaGVscGVycy5jbG9zZUNvbmZpcm0ob3ZlcmxheSk7XG4gICAgfTtcblxuICAgIGxldCBidG5XcmFwID0gbSgnZGl2JywgW25vLCB5ZXNdLCB7Y2xhc3NOYW1lOiAnYnV0dG9uLXdyYXAnfSk7XG5cbiAgICBjbGFzc05hbWUgPSAnZm9ybS1idWlsZGVyLWRpYWxvZyAnICsgY2xhc3NOYW1lO1xuXG4gICAgbGV0IG1pbmlNb2RhbCA9IG0oJ2RpdicsIFttZXNzYWdlLCBidG5XcmFwXSwge2NsYXNzTmFtZTogY2xhc3NOYW1lfSk7XG4gICAgaWYgKCFjb29yZHMpIHtcbiAgICAgIGNvb3JkcyA9IHtcbiAgICAgICAgcGFnZVg6IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCkgLyAyLFxuICAgICAgICBwYWdlWTogTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCwgd2luZG93LmlubmVySGVpZ2h0IHx8IDApIC8gMlxuICAgICAgfTtcbiAgICAgIG1pbmlNb2RhbC5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1pbmlNb2RhbC5jbGFzc0xpc3QuYWRkKCdwb3NpdGlvbmVkJyk7XG4gICAgfVxuXG4gICAgbWluaU1vZGFsLnN0eWxlLmxlZnQgPSBjb29yZHMucGFnZVggKyAncHgnO1xuICAgIG1pbmlNb2RhbC5zdHlsZS50b3AgPSBjb29yZHMucGFnZVkgKyAncHgnO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtaW5pTW9kYWwpO1xuXG4gICAgeWVzLmZvY3VzKCk7XG4gICAgcmV0dXJuIG1pbmlNb2RhbDtcbiAgfTtcblxuICAvKipcbiAgICogUG9wdXAgZGlhbG9nIHRoZSBkb2VzIG5vdCByZXF1aXJlIGNvbmZpcm1hdGlvbi5cbiAgICogQHBhcmFtICB7U3RyaW5nfERPTXxBcnJheX0gIGNvbnRlbnRcbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gY29vcmRzICAgIGZhbHNlIGlmIG5vIGNvb3JkcyBhcmUgcHJvdmlkZWQuIFdpdGhvdXQgY29vcmRpbmF0ZXNcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBwb3B1cCB3aWxsIGFwcGVhciBjZW50ZXIgc2NyZWVuLlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBjbGFzc05hbWUgY2xhc3NuYW1lIHRvIGJlIGFkZGVkIHRvIHRoZSBkaWFsb2dcbiAgICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgIGRvbVxuICAgKi9cbiAgX2hlbHBlcnMuZGlhbG9nID0gZnVuY3Rpb24oY29udGVudCwgY29vcmRzID0gZmFsc2UsIGNsYXNzTmFtZSA9ICcnKSB7XG4gICAgX2hlbHBlcnMuc2hvd092ZXJsYXkoKTtcblxuICAgIGNsYXNzTmFtZSA9ICdmb3JtLWJ1aWxkZXItZGlhbG9nICcgKyBjbGFzc05hbWU7XG5cbiAgICBsZXQgbWluaU1vZGFsID0gdXRpbHMubWFya3VwKCdkaXYnLCBjb250ZW50LCB7Y2xhc3NOYW1lOiBjbGFzc05hbWV9KTtcbiAgICBpZiAoIWNvb3Jkcykge1xuICAgICAgY29vcmRzID0ge1xuICAgICAgICBwYWdlWDogTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKSAvIDIsXG4gICAgICAgIHBhZ2VZOiBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCkgLyAyXG4gICAgICB9O1xuICAgICAgbWluaU1vZGFsLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICB9IGVsc2Uge1xuICAgICAgbWluaU1vZGFsLmNsYXNzTGlzdC5hZGQoJ3Bvc2l0aW9uZWQnKTtcbiAgICB9XG5cbiAgICBtaW5pTW9kYWwuc3R5bGUubGVmdCA9IGNvb3Jkcy5wYWdlWCArICdweCc7XG4gICAgbWluaU1vZGFsLnN0eWxlLnRvcCA9IGNvb3Jkcy5wYWdlWSArICdweCc7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1pbmlNb2RhbCk7XG5cbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGZvcm1CdWlsZGVyLmV2ZW50cy5tb2RhbE9wZW5lZCk7XG5cbiAgICBpZiAoY2xhc3NOYW1lLmluZGV4T2YoJ2RhdGEtZGlhbG9nJykgIT09IC0xKSB7XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGZvcm1CdWlsZGVyLmV2ZW50cy52aWV3RGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1pbmlNb2RhbDtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgZmllbGRzIGZyb20gdGhlIGZvcm1cbiAgICovXG4gIF9oZWxwZXJzLnJlbW92ZUFsbGZpZWxkcyA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZm9ybUJ1aWxkZXIuZm9ybUlEKTtcbiAgICBsZXQgZmllbGRzID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdsaS5mb3JtLWZpZWxkJyk7XG4gICAgbGV0ICRmaWVsZHMgPSAkKGZpZWxkcyk7XG4gICAgbGV0IG1hcmtFbXB0eUFycmF5ID0gW107XG5cbiAgICBpZiAoIWZpZWxkcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAob3B0cy5wcmVwZW5kKSB7XG4gICAgICBtYXJrRW1wdHlBcnJheS5wdXNoKHRydWUpO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmFwcGVuZCkge1xuICAgICAgbWFya0VtcHR5QXJyYXkucHVzaCh0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAoIW1hcmtFbXB0eUFycmF5LnNvbWUoZWxlbSA9PiBlbGVtID09PSB0cnVlKSkge1xuICAgICAgZm9ybS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2VtcHR5Jyk7XG4gICAgICBmb3JtLnBhcmVudEVsZW1lbnQuZGF0YXNldC5jb250ZW50ID0gb3B0cy5tZXNzYWdlcy5nZXRTdGFydGVkO1xuICAgIH1cblxuICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgncmVtb3ZpbmcnKTtcblxuICAgIGxldCBvdXRlckhlaWdodCA9IDA7XG4gICAgJGZpZWxkcy5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgIG91dGVySGVpZ2h0ICs9ICQoJGZpZWxkc1tpXSkub3V0ZXJIZWlnaHQoKSArIDM7XG4gICAgfSk7XG5cbiAgICBmaWVsZHNbMF0uc3R5bGUubWFyZ2luVG9wID0gKC1vdXRlckhlaWdodCkgKyAncHgnO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICRmaWVsZHMucmVtb3ZlKCk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChmb3JtQnVpbGRlci5mb3JtSUQpLmNsYXNzTGlzdC5yZW1vdmUoJ3JlbW92aW5nJyk7XG4gICAgICBfaGVscGVycy5zYXZlKCk7XG4gICAgfSwgNDAwKTtcbiAgfTtcblxuICAvKipcbiAgICogSWYgdXNlciByZS1vcmRlcnMgdGhlIGVsZW1lbnRzIHRoZWlyIG9yZGVyIHNob3VsZCBiZSBzYXZlZC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9ICRjYlVMIG91ciBsaXN0IG9mIGVsZW1lbnRzXG4gICAqL1xuICBfaGVscGVycy5zZXRGaWVsZE9yZGVyID0gZnVuY3Rpb24oJGNiVUwpIHtcbiAgICBpZiAoIW9wdHMuc29ydGFibGVDb250cm9scykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgZmllbGRPcmRlciA9IHt9O1xuICAgICRjYlVMLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbihpbmRleCwgZWxlbWVudCkge1xuICAgICAgZmllbGRPcmRlcltpbmRleF0gPSAkKGVsZW1lbnQpLmRhdGEoJ2F0dHJzJykudHlwZTtcbiAgICB9KTtcbiAgICBpZiAod2luZG93LnNlc3Npb25TdG9yYWdlKSB7XG4gICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnZmllbGRPcmRlcicsIHdpbmRvdy5KU09OLnN0cmluZ2lmeShmaWVsZE9yZGVyKSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBSZW9yZGVyIHRoZSBjb250cm9scyBpZiB0aGUgdXNlciBoYXMgcHJldmlvdXNseSBvcmRlcmVkIHRoZW0uXG4gICAqXG4gICAqIEBwYXJhbSAge0FycmF5fSBmcm1iRmllbGRzXG4gICAqIEByZXR1cm4ge0FycmF5fSBvcmRlcmVkIGZpZWxkc1xuICAgKi9cbiAgX2hlbHBlcnMub3JkZXJGaWVsZHMgPSBmdW5jdGlvbihmcm1iRmllbGRzKSB7XG4gICAgbGV0IGZpZWxkT3JkZXIgPSBmYWxzZTtcbiAgICBsZXQgbmV3T3JkZXJGaWVsZHMgPSBbXTtcblxuICAgIGlmICh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UpIHtcbiAgICAgIGlmIChvcHRzLnNvcnRhYmxlQ29udHJvbHMpIHtcbiAgICAgICAgZmllbGRPcmRlciA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdmaWVsZE9yZGVyJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgnZmllbGRPcmRlcicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZmllbGRPcmRlcikge1xuICAgICAgbGV0IGNvbnRyb2xPcmRlciA9IG9wdHMuY29udHJvbE9yZGVyLmNvbmNhdChmcm1iRmllbGRzLm1hcChmaWVsZCA9PlxuICAgICAgICBmaWVsZC5hdHRycy50eXBlKSk7XG4gICAgICBmaWVsZE9yZGVyID0gdXRpbHMudW5pcXVlKGNvbnRyb2xPcmRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpZWxkT3JkZXIgPSB3aW5kb3cuSlNPTi5wYXJzZShmaWVsZE9yZGVyKTtcbiAgICAgIGZpZWxkT3JkZXIgPSBPYmplY3Qua2V5cyhmaWVsZE9yZGVyKS5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgICByZXR1cm4gZmllbGRPcmRlcltpXTtcbiAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgZmllbGRPcmRlci5mb3JFYWNoKChmaWVsZFR5cGUpID0+IHtcbiAgICAgIGxldCBmaWVsZCA9IGZybWJGaWVsZHMuZmlsdGVyKGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgIHJldHVybiBmaWVsZC5hdHRycy50eXBlID09PSBmaWVsZFR5cGU7XG4gICAgICB9KVswXTtcbiAgICAgIG5ld09yZGVyRmllbGRzLnB1c2goZmllbGQpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ld09yZGVyRmllbGRzLmZpbHRlcihCb29sZWFuKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2xvc2UgZmllbGRzIGJlaW5nIGVkaXRpbmdcbiAgICogQHBhcmFtICB7T2JqZWN0fSBzdGFnZVxuICAgKi9cbiAgX2hlbHBlcnMuY2xvc2VBbGxFZGl0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGZpZWxkcyA9ICQoJz4gbGkuZWRpdGluZycsIGZvcm1CdWlsZGVyLnN0YWdlKTtcbiAgICBjb25zdCB0b2dnbGVCdG5zID0gJCgnLnRvZ2dsZS1mb3JtJywgZm9ybUJ1aWxkZXIuc3RhZ2UpO1xuICAgIGNvbnN0IGVkaXRQYW5lbHMgPSAkKCcuZnJtLWhvbGRlcicsIGZpZWxkcyk7XG5cbiAgICB0b2dnbGVCdG5zLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgZmllbGRzLnJlbW92ZUNsYXNzKCdlZGl0aW5nJyk7XG4gICAgJCgnLnByZXYtaG9sZGVyJywgZmllbGRzKS5zaG93KCk7XG4gICAgZWRpdFBhbmVscy5oaWRlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIGVkaXQgbW9kZSBmb3IgdGhlIGdpdmVuIGZpZWxkXG4gICAqIEBwYXJhbSAge1N0cmluZ30gZmllbGRJZFxuICAgKiBAcGFyYW0gIHtCb29sZWFufSBhbmltYXRlXG4gICAqL1xuICBfaGVscGVycy50b2dnbGVFZGl0ID0gZnVuY3Rpb24oZmllbGRJZCwgYW5pbWF0ZSA9IHRydWUpIHtcbiAgICBjb25zdCBmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGZpZWxkSWQpO1xuICAgIGNvbnN0IHRvZ2dsZUJ0biA9ICQoJy50b2dnbGUtZm9ybScsIGZpZWxkKTtcbiAgICBjb25zdCBlZGl0UGFuZWwgPSAkKCcuZnJtLWhvbGRlcicsIGZpZWxkKTtcbiAgICBmaWVsZC5jbGFzc0xpc3QudG9nZ2xlKCdlZGl0aW5nJyk7XG4gICAgdG9nZ2xlQnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgaWYgKGFuaW1hdGUpIHtcbiAgICAgICQoJy5wcmV2LWhvbGRlcicsIGZpZWxkKS5zbGlkZVRvZ2dsZSgyNTApO1xuICAgICAgZWRpdFBhbmVsLnNsaWRlVG9nZ2xlKDI1MCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJy5wcmV2LWhvbGRlcicsIGZpZWxkKS50b2dnbGUoKTtcbiAgICAgIGVkaXRQYW5lbC50b2dnbGUoKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENvbnRyb2xzIGZvbGxvdyBzY3JvbGwgdG8gdGhlIGJvdHRvbSBvZiB0aGUgZWRpdG9yXG4gICAqL1xuICBfaGVscGVycy5zdGlja3lDb250cm9scyA9ICgpID0+IHtcbiAgICBjb25zdCAkY2JXcmFwID0gJChmb3JtQnVpbGRlci5jb250cm9scykucGFyZW50KCk7XG4gICAgY29uc3QgJHN0YWdlV3JhcCA9ICQoZm9ybUJ1aWxkZXIuc3RhZ2UpLnBhcmVudCgpO1xuICAgIGNvbnN0IGNiV2lkdGggPSAkY2JXcmFwLndpZHRoKCk7XG4gICAgY29uc3QgY2JQb3NpdGlvbiA9IGZvcm1CdWlsZGVyLmNvbnRyb2xzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbihldnQpIHtcbiAgICAgIGxldCBzY3JvbGxUb3AgPSAkKGV2dC50YXJnZXQpLnNjcm9sbFRvcCgpO1xuXG4gICAgICBpZiAoc2Nyb2xsVG9wID4gJHN0YWdlV3JhcC5vZmZzZXQoKS50b3ApIHtcbiAgICAgICAgbGV0IGNiU3R5bGUgPSB7XG4gICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgICAgd2lkdGg6IGNiV2lkdGgsXG4gICAgICAgICAgdG9wOiAnNXB4JyxcbiAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgIGxlZnQ6IGNiUG9zaXRpb24ubGVmdFxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBjYk9mZnNldCA9ICRjYldyYXAub2Zmc2V0KCk7XG4gICAgICAgIGxldCBzdGFnZU9mZnNldCA9ICRzdGFnZVdyYXAub2Zmc2V0KCk7XG4gICAgICAgIGxldCBjYkJvdHRvbSA9IGNiT2Zmc2V0LnRvcCArICRjYldyYXAuaGVpZ2h0KCk7XG4gICAgICAgIGxldCBzdGFnZUJvdHRvbSA9IHN0YWdlT2Zmc2V0LnRvcCArICRzdGFnZVdyYXAuaGVpZ2h0KCk7XG5cbiAgICAgICAgaWYgKGNiQm90dG9tID4gc3RhZ2VCb3R0b20gJiYgKGNiT2Zmc2V0LnRvcCAhPT0gc3RhZ2VPZmZzZXQudG9wKSkge1xuICAgICAgICAgICRjYldyYXAuY3NzKHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgdG9wOiAnYXV0bycsXG4gICAgICAgICAgICBib3R0b206IDAsXG4gICAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICAgIGxlZnQ6ICdhdXRvJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNiQm90dG9tIDwgc3RhZ2VCb3R0b20gfHwgKGNiQm90dG9tID09PSBzdGFnZUJvdHRvbSAmJiBjYk9mZnNldC50b3AgPiBzY3JvbGxUb3ApKSB7XG4gICAgICAgICAgJGNiV3JhcC5jc3MoY2JTdHlsZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcm1CdWlsZGVyLmNvbnRyb2xzLnBhcmVudEVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBPcGVuIGEgZGlhbG9nIHdpdGggdGhlIGZvcm0ncyBkYXRhXG4gICAqL1xuICBfaGVscGVycy5zaG93RGF0YSA9ICgpID0+IHtcbiAgICBjb25zdCBtID0gdXRpbHMubWFya3VwO1xuICAgIGNvbnN0IGRhdGEgPSB1dGlscy5lc2NhcGVIdG1sKGZvcm1CdWlsZGVyLmZvcm1EYXRhKTtcbiAgICBjb25zdCBjb2RlID0gbSgnY29kZScsIGRhdGEsIHtjbGFzc05hbWU6IGBmb3JtRGF0YS0ke29wdHMuZGF0YVR5cGV9YH0pO1xuXG4gICAgX2hlbHBlcnMuZGlhbG9nKG0oJ3ByZScsIGNvZGUpLCBudWxsLCAnZGF0YS1kaWFsb2cnKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIGEgZmllbGQgZnJvbSB0aGUgc3RhZ2VcbiAgICogQHBhcmFtICB7U3RyaW5nfSAgZmllbGRJRCBJRCBvZiB0aGUgZmllbGQgdG8gYmUgcmVtb3ZlZFxuICAgKiBAcmV0dXJuIHtCb29sZWFufSBmaWVsZFJlbW92ZWQgcmV0dXJucyB0cnVlIGlmIGZpZWxkIGlzIHJlbW92ZWRcbiAgICovXG4gIF9oZWxwZXJzLnJlbW92ZUZpZWxkID0gKGZpZWxkSUQpID0+IHtcbiAgICBsZXQgZmllbGRSZW1vdmVkID0gZmFsc2U7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGZvcm1CdWlsZGVyLmZvcm1JRCk7XG4gICAgY29uc3QgZmllbGRzID0gZm9ybS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmb3JtLWZpZWxkJyk7XG5cbiAgICBpZiAoIWZpZWxkcy5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUud2FybignTm8gZmllbGRzIHRvIHJlbW92ZScpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghZmllbGRJRCkge1xuICAgICAgbGV0IGF2YWlsYWJsZUlkcyA9IFtdLnNsaWNlLmNhbGwoZmllbGRzKS5tYXAoKGZpZWxkKSA9PiB7XG4gICAgICAgIHJldHVybiBmaWVsZC5pZDtcbiAgICAgIH0pO1xuICAgICAgY29uc29sZS53YXJuKCdmaWVsZElEIHJlcXVpcmVkIHRvIHVzZSBgcmVtb3ZlRmllbGRgIGFjdGlvbi4nKTtcbiAgICAgIGNvbnNvbGUud2FybignQXZhaWxhYmxlIElEczogJyArIGF2YWlsYWJsZUlkcy5qb2luKCcsICcpKTtcbiAgICB9XG5cbiAgICBjb25zdCBmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGZpZWxkSUQpO1xuICAgIGNvbnN0ICRmaWVsZCA9ICQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZmllbGRJRCkpO1xuICAgIGlmICghZmllbGQpIHtcbiAgICAgIGNvbnNvbGUud2FybignRmllbGQgbm90IGZvdW5kJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgJGZpZWxkLnNsaWRlVXAoMjUwLCBmdW5jdGlvbigpIHtcbiAgICAgICRmaWVsZC5yZW1vdmVDbGFzcygnZGVsZXRpbmcnKTtcbiAgICAgICRmaWVsZC5yZW1vdmUoKTtcbiAgICAgIGZpZWxkUmVtb3ZlZCA9IHRydWU7XG4gICAgICBfaGVscGVycy5zYXZlKCk7XG4gICAgICBpZiAoIWZvcm0uY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgbGV0IHN0YWdlV3JhcCA9IGZvcm0ucGFyZW50RWxlbWVudDtcbiAgICAgICAgc3RhZ2VXcmFwLmNsYXNzTGlzdC5hZGQoJ2VtcHR5Jyk7XG4gICAgICAgIHN0YWdlV3JhcC5kYXRhc2V0LmNvbnRlbnQgPSBvcHRzLm1lc3NhZ2VzLmdldFN0YXJ0ZWQ7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGZvcm1CdWlsZGVyLmV2ZW50cy5maWVsZFJlbW92ZWQpO1xuICAgIHJldHVybiBmaWVsZFJlbW92ZWQ7XG4gIH07XG5cbiAgcmV0dXJuIF9oZWxwZXJzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhlbHBlcnM7XG4iLCJjb25zdCBrY1RvZ2dsZSA9ICgpID0+IHtcbiAgY29uc3QgVG9nZ2xlID0gZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgICAgdGhlbWU6ICdmcmVzaCcsXG4gICAgICBtZXNzYWdlczoge1xuICAgICAgICBvZmY6ICdPZmYnLFxuICAgICAgICBvbjogJ09uJ1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsZXQgb3B0cyA9ICQuZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICBsZXQgJGtjVG9nZ2xlID0gJCgnPGRpdiBjbGFzcz1cImtjLXRvZ2dsZVwiLz4nKVxuICAgICAgICAuaW5zZXJ0QWZ0ZXIoZWxlbWVudClcbiAgICAgICAgLmFwcGVuZChlbGVtZW50KTtcblxuICAgICRrY1RvZ2dsZS50b2dnbGVDbGFzcygnb24nLCBlbGVtZW50LmlzKCc6Y2hlY2tlZCcpKTtcblxuICAgIGxldCBrY3RPbiA9IGA8ZGl2IGNsYXNzPVwia2N0LW9uXCI+JHtvcHRzLm1lc3NhZ2VzLm9ufTwvZGl2PmA7XG4gICAgbGV0IGtjdE9mZiA9IGA8ZGl2IGNsYXNzPVwia2N0LW9mZlwiPiR7b3B0cy5tZXNzYWdlcy5vZmZ9PC9kaXY+YDtcbiAgICBsZXQga2N0SGFuZGxlID0gJzxkaXYgY2xhc3M9XCJrY3QtaGFuZGxlXCI+PC9kaXY+JztcbiAgICBsZXQga2N0SW5uZXIgPSBgPGRpdiBjbGFzcz1cImtjdC1pbm5lclwiPiR7a2N0T259JHtrY3RIYW5kbGV9JHtrY3RPZmZ9PC9kaXY+YDtcblxuICAgICRrY1RvZ2dsZS5hcHBlbmQoa2N0SW5uZXIpO1xuXG4gICAgJGtjVG9nZ2xlLmNsaWNrKGZ1bmN0aW9uKGV2dCkge1xuICAgICAgZWxlbWVudC5hdHRyKCdjaGVja2VkJywgIWVsZW1lbnQuYXR0cignY2hlY2tlZCcpKTtcbiAgICAgICRrY1RvZ2dsZS50b2dnbGVDbGFzcygnb24nKTtcbiAgICB9KTtcbiAgfTtcblxuICBqUXVlcnkuZm4ua2NUb2dnbGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgY29uc3QgdG9nZ2xlID0gdGhpcztcbiAgICByZXR1cm4gdG9nZ2xlLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgbGV0IGVsZW1lbnQgPSAkKHRvZ2dsZVtpXSk7XG4gICAgICBpZiAoZWxlbWVudC5kYXRhKCdrY1RvZ2dsZScpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGxldCBrY1RvZ2dsZSA9IG5ldyBUb2dnbGUoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICBlbGVtZW50LmRhdGEoJ2tjVG9nZ2xlJywga2NUb2dnbGUpO1xuICAgIH0pO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrY1RvZ2dsZSgpO1xuIiwiLyoqXG4gKiBQb2x5ZmlsbHMgZm9yIG9sZGVyIGJyb3dzZXJzIGFuZCBhZGRlZCBmdW5jdGlvbmFsaXR5XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiBwb2x5ZmlsbHMoKSB7XG4gIC8vIEVsZW1lbnQucmVtb3ZlKCkgcG9seWZpbGxcbiAgaWYgKCEoJ3JlbW92ZScgaW4gRWxlbWVudC5wcm90b3R5cGUpKSB7XG4gICAgRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5wYXJlbnROb2RlKSB7XG4gICAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gRXZlbnQgcG9seWZpbGxcbiAgaWYgKHR5cGVvZiBFdmVudCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIChmdW5jdGlvbigpIHtcbiAgICAgIHdpbmRvdy5FdmVudCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICBsZXQgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICAgICAgZXZlbnQuaW5pdEV2ZW50KGV2dCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBldmVudDtcbiAgICAgIH07XG4gICAgfSkoKTtcbiAgfVxuXG4gIC8vIE9iamVjdC5hc3NpZ24gcG9seWZpbGxcbiAgaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9ICdmdW5jdGlvbicpIHtcbiAgICBPYmplY3QuYXNzaWduID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAndXNlIHN0cmljdCc7XG4gICAgICBpZiAodGFyZ2V0ID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgICB9XG5cbiAgICAgIHRhcmdldCA9IE9iamVjdCh0YXJnZXQpO1xuICAgICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgbGV0IHNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF07XG4gICAgICAgIGlmIChzb3VyY2UgIT0gbnVsbCkge1xuICAgICAgICAgIGZvciAobGV0IGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwb2x5ZmlsbHMoKTtcbiIsIi8qKlxuICogQ3Jvc3MgZmlsZSB1dGlsaXRpZXMgZm9yIHdvcmtpbmcgd2l0aCBhcnJheXMsXG4gKiBzb3J0aW5nIGFuZCBvdGhlciBmdW4gc3R1ZmZcbiAqIEByZXR1cm4ge09iamVjdH0gZmJVdGlsc1xuICovXG4vLyBmdW5jdGlvbiB1dGlscygpIHtcbiAgY29uc3QgZmJVdGlscyA9IHt9O1xuXG4gIC8vIGNsZWFuZXIgc3ludGF4IGZvciB0ZXN0aW5nIGluZGV4T2YgZWxlbWVudFxuICBmYlV0aWxzLmluQXJyYXkgPSBmdW5jdGlvbihuZWVkbGUsIGhheXN0YWNrKSB7XG4gICAgcmV0dXJuIGhheXN0YWNrLmluZGV4T2YobmVlZGxlKSAhPT0gLTE7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBudWxsIG9yIHVuZGVmaW5lZCB2YWx1ZXNcbiAgICogQHBhcmFtICB7T2JqZWN0fSBhdHRycyB7YXR0ck5hbWU6IGF0dHJWYWx1ZX1cbiAgICogQHJldHVybiB7T2JqZWN0fSAgICAgICBPYmplY3QgdHJpbW1lZCBvZiBudWxsIG9yIHVuZGVmaW5lZCB2YWx1ZXNcbiAgICovXG4gIGZiVXRpbHMudHJpbU9iaiA9IGZ1bmN0aW9uKGF0dHJzKSB7XG4gICAgbGV0IHhtbFJlbW92ZSA9IFtcbiAgICAgIG51bGwsXG4gICAgICB1bmRlZmluZWQsXG4gICAgICAnJyxcbiAgICAgIGZhbHNlLFxuICAgICAgJ2ZhbHNlJ1xuICAgIF07XG4gICAgZm9yIChsZXQgYXR0ciBpbiBhdHRycykge1xuICAgICAgaWYgKGZiVXRpbHMuaW5BcnJheShhdHRyc1thdHRyXSwgeG1sUmVtb3ZlKSkge1xuICAgICAgICBkZWxldGUgYXR0cnNbYXR0cl07XG4gICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXR0cnNbYXR0cl0pKSB7XG4gICAgICAgIGlmICghYXR0cnNbYXR0cl0ubGVuZ3RoKSB7XG4gICAgICAgICAgZGVsZXRlIGF0dHJzW2F0dHJdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGF0dHJzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUZXN0IGlmIGF0dHJpYnV0ZSBpcyBhIHZhbGlkIEhUTUwgYXR0cmlidXRlXG4gICAqIEBwYXJhbSAge1N0cmluZ30gYXR0clxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgZmJVdGlscy52YWxpZEF0dHIgPSBmdW5jdGlvbihhdHRyKSB7XG4gICAgbGV0IGludmFsaWQgPSBbXG4gICAgICAndmFsdWVzJyxcbiAgICAgICdlbmFibGVPdGhlcicsXG4gICAgICAnb3RoZXInLFxuICAgICAgJ2xhYmVsJyxcbiAgICAgIC8vICdzdHlsZScsXG4gICAgICAnc3VidHlwZSdcbiAgICBdO1xuICAgIHJldHVybiAhZmJVdGlscy5pbkFycmF5KGF0dHIsIGludmFsaWQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGFuIGF0dHJzIG9iamVjdCBpbnRvIGEgc3RyaW5nXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gYXR0cnMgb2JqZWN0IG9mIGF0dHJpYnV0ZXMgZm9yIG1hcmt1cFxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBmYlV0aWxzLmF0dHJTdHJpbmcgPSBmdW5jdGlvbihhdHRycykge1xuICAgIGxldCBhdHRyaWJ1dGVzID0gW107XG5cbiAgICBmb3IgKGxldCBhdHRyIGluIGF0dHJzKSB7XG4gICAgICBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoYXR0cikgJiYgZmJVdGlscy52YWxpZEF0dHIoYXR0cikpIHtcbiAgICAgICAgYXR0ciA9IGZiVXRpbHMuc2FmZUF0dHIoYXR0ciwgYXR0cnNbYXR0cl0pO1xuICAgICAgICBhdHRyaWJ1dGVzLnB1c2goYXR0ci5uYW1lICsgYXR0ci52YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhdHRyaWJ1dGVzLmpvaW4oJyAnKTtcbiAgfTtcblxuICAvKipcbiAgICogQ29udmVydCBhdHRyaWJ1dGVzIHRvIG1hcmt1cCBzYWZlIHN0cmluZ3NcbiAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lICBhdHRyaWJ1dGUgbmFtZVxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHZhbHVlIGF0dHJpYnV0ZSB2YWx1ZVxuICAgKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgIHthdHRyTmFtZTogYXR0clZhbHVlfVxuICAgKi9cbiAgZmJVdGlscy5zYWZlQXR0ciA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgbmFtZSA9IGZiVXRpbHMuc2FmZUF0dHJOYW1lKG5hbWUpO1xuICAgIGxldCB2YWxTdHJpbmc7XG5cbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICB2YWxTdHJpbmcgPSBmYlV0aWxzLmVzY2FwZUF0dHIodmFsdWUuam9pbignICcpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0eXBlb2YodmFsdWUpID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFsU3RyaW5nID0gZmJVdGlscy5lc2NhcGVBdHRyKHZhbHVlLnJlcGxhY2UoJywnLCAnICcpLnRyaW0oKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFsdWUgPSB2YWx1ZSA/IGA9XCIke3ZhbFN0cmluZ31cImAgOiAnJztcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSxcbiAgICAgIHZhbHVlXG4gICAgfTtcbiAgfTtcblxuICBmYlV0aWxzLnNhZmVBdHRyTmFtZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBsZXQgc2FmZUF0dHIgPSB7XG4gICAgICBjbGFzc05hbWU6ICdjbGFzcydcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNhZmVBdHRyW25hbWVdIHx8IGZiVXRpbHMuaHlwaGVuQ2FzZShuYW1lKTtcbiAgfTtcblxuICAvKipcbiAgICogQ29udmVydCBzdHJpbmdzIGludG8gbG93ZXJjYXNlLWh5cGhlblxuICAgKlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHN0clxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuICBmYlV0aWxzLmh5cGhlbkNhc2UgPSAoc3RyKSA9PiB7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL1teXFx3XFxzXFwtXS9naSwgJycpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8oW0EtWl0pL2csIGZ1bmN0aW9uKCQxKSB7XG4gICAgICByZXR1cm4gJy0nICsgJDEudG9Mb3dlckNhc2UoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFxzL2csICctJykucmVwbGFjZSgvXi0rL2csICcnKTtcbiAgfTtcblxuICAvKipcbiAgICogY29udmVydCBhIGh5cGhlbmF0ZWQgc3RyaW5nIHRvIGNhbWVsQ2FzZVxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHN0clxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuICBmYlV0aWxzLmNhbWVsQ2FzZSA9IChzdHIpID0+IHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLy0oW2Etel0pL2csIGZ1bmN0aW9uKG0sIHcpIHtcbiAgICAgIHJldHVybiB3LnRvVXBwZXJDYXNlKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIG1hcmt1cCB3cmFwcGVyIHdoZXJlIG5lZWRlZFxuICAgKlxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgICAgICB0YWdcbiAgICogQHBhcmFtICB7U3RyaW5nfEFycmF5fE9iamVjdH0gY29udGVudCB3ZSB3cmFwIHRoaXNcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgICAgICAgYXR0cnNcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cbiAgZmJVdGlscy5tYXJrdXAgPSBmdW5jdGlvbih0YWcsIGNvbnRlbnQgPSAnJywgYXR0cnMgPSB7fSkge1xuICAgIGxldCBjb250ZW50VHlwZSxcbiAgICAgIGZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpLFxuICAgICAgZ2V0Q29udGVudFR5cGUgPSBmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KGNvbnRlbnQpID8gJ2FycmF5JyA6IHR5cGVvZiBjb250ZW50O1xuICAgICAgfSxcbiAgICAgIGFwcGVuZENvbnRlbnQgPSB7XG4gICAgICAgIHN0cmluZzogZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgICAgIGZpZWxkLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIG9iamVjdDogZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgICAgIHJldHVybiBmaWVsZC5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgYXJyYXk6IGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlID0gZ2V0Q29udGVudFR5cGUoY29udGVudFtpXSk7XG4gICAgICAgICAgICBhcHBlbmRDb250ZW50W2NvbnRlbnRUeXBlXShjb250ZW50W2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICBmb3IgKGxldCBhdHRyIGluIGF0dHJzKSB7XG4gICAgICBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoYXR0cikpIHtcbiAgICAgICAgbGV0IG5hbWUgPSBmYlV0aWxzLnNhZmVBdHRyTmFtZShhdHRyKTtcbiAgICAgICAgZmllbGQuc2V0QXR0cmlidXRlKG5hbWUsIGF0dHJzW2F0dHJdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb250ZW50VHlwZSA9IGdldENvbnRlbnRUeXBlKGNvbnRlbnQpO1xuXG4gICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgIGFwcGVuZENvbnRlbnRbY29udGVudFR5cGVdLmNhbGwodGhpcywgY29udGVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpZWxkO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGh0bWwgZWxlbWVudCBhdHRyaWJ1dGVzIHRvIGtleS92YWx1ZSBvYmplY3RcbiAgICogQHBhcmFtICB7T2JqZWN0fSBET00gZWxlbWVudFxuICAgKiBAcmV0dXJuIHtPYmplY3R9IGV4OiB7YXR0ck5hbWU6IGF0dHJWYWx1ZX1cbiAgICovXG4gIGZiVXRpbHMucGFyc2VBdHRycyA9IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICBsZXQgYXR0cnMgPSBlbGVtLmF0dHJpYnV0ZXM7XG4gICAgbGV0IGRhdGEgPSB7fTtcbiAgICBmYlV0aWxzLmZvckVhY2goYXR0cnMsIGF0dHIgPT4ge1xuICAgICAgbGV0IGF0dHJWYWwgPSBhdHRyc1thdHRyXS52YWx1ZTtcbiAgICAgIGlmIChhdHRyVmFsLm1hdGNoKC9mYWxzZXx0cnVlL2cpKSB7XG4gICAgICAgIGF0dHJWYWwgPSAoYXR0clZhbCA9PT0gJ3RydWUnKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0clZhbC5tYXRjaCgvdW5kZWZpbmVkL2cpKSB7XG4gICAgICAgIGF0dHJWYWwgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChhdHRyVmFsKSB7XG4gICAgICAgIGRhdGFbYXR0cnNbYXR0cl0ubmFtZV0gPSBhdHRyVmFsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH07XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgZmllbGQgb3B0aW9ucyB0byBvcHRpb25EYXRhXG4gICAqIEBwYXJhbSAge09iamVjdH0gRE9NIGVsZW1lbnRcbiAgICogQHJldHVybiB7QXJyYXl9ICAgICAgb3B0aW9uRGF0YSBhcnJheVxuICAgKi9cbiAgZmJVdGlscy5wYXJzZU9wdGlvbnMgPSBmdW5jdGlvbihmaWVsZCkge1xuICAgIGxldCBvcHRpb25zID0gZmllbGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ29wdGlvbicpLFxuICAgICAgb3B0aW9uRGF0YSA9IHt9LFxuICAgICAgZGF0YSA9IFtdO1xuXG4gICAgaWYgKG9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgb3B0aW9uRGF0YSA9IGZiVXRpbHMucGFyc2VBdHRycyhvcHRpb25zW2ldKTtcbiAgICAgICAgb3B0aW9uRGF0YS5sYWJlbCA9IG9wdGlvbnNbaV0udGV4dENvbnRlbnQ7XG4gICAgICAgIGRhdGEucHVzaChvcHRpb25EYXRhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfTtcblxuICAvKipcbiAgICogUGFyc2UgWE1MIGZvcm1EYXRhXG4gICAqIEBwYXJhbSAge1N0cmluZ30geG1sU3RyaW5nXG4gICAqIEByZXR1cm4ge0FycmF5fSAgICAgICAgICAgIGZvcm1EYXRhIGFycmF5XG4gICAqL1xuICBmYlV0aWxzLnBhcnNlWE1MID0gZnVuY3Rpb24oeG1sU3RyaW5nKSB7XG4gICAgY29uc3QgcGFyc2VyID0gbmV3IHdpbmRvdy5ET01QYXJzZXIoKTtcbiAgICBsZXQgeG1sID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyh4bWxTdHJpbmcsICd0ZXh0L3htbCcpLFxuICAgICAgZm9ybURhdGEgPSBbXTtcblxuICAgIGlmICh4bWwpIHtcbiAgICAgIGxldCBmaWVsZHMgPSB4bWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ZpZWxkJyk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgZmllbGREYXRhID0gZmJVdGlscy5wYXJzZUF0dHJzKGZpZWxkc1tpXSk7XG5cbiAgICAgICAgaWYgKGZpZWxkc1tpXS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICBmaWVsZERhdGEudmFsdWVzID0gZmJVdGlscy5wYXJzZU9wdGlvbnMoZmllbGRzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm1EYXRhLnB1c2goZmllbGREYXRhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZm9ybURhdGE7XG4gIH07XG5cbiAgLyoqXG4gICAqIEVzY2FwZSBtYXJrdXAgc28gaXQgY2FuIGJlIGRpc3BsYXllZCByYXRoZXIgdGhhbiByZW5kZXJlZFxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IGh0bWwgbWFya3VwXG4gICAqIEByZXR1cm4ge1N0cmluZ30gICAgICBlc2NhcGVkIGh0bWxcbiAgICovXG4gIGZiVXRpbHMuZXNjYXBlSHRtbCA9IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICBsZXQgZXNjYXBlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgZXNjYXBlRWxlbWVudC50ZXh0Q29udGVudCA9IGh0bWw7XG4gICAgcmV0dXJuIGVzY2FwZUVsZW1lbnQuaW5uZXJIVE1MO1xuICB9O1xuXG4gIC8vIEVzY2FwZSBhbiBhdHRyaWJ1dGVcbiAgZmJVdGlscy5lc2NhcGVBdHRyID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgbGV0IG1hdGNoID0ge1xuICAgICAgJ1wiJzogJyZxdW90OycsXG4gICAgICAnJic6ICcmYW1wOycsXG4gICAgICAnPCc6ICcmbHQ7JyxcbiAgICAgICc+JzogJyZndDsnXG4gICAgfTtcblxuICAgIGNvbnN0IHJlcGxhY2VUYWcgPSB0YWcgPT4gbWF0Y2hbdGFnXSB8fCB0YWc7XG5cbiAgICByZXR1cm4gKHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnKSA/IHN0ci5yZXBsYWNlKC9bXCImPD5dL2csIHJlcGxhY2VUYWcpIDogc3RyO1xuICB9O1xuXG4gIC8vIEVzY2FwZSBhdHRyaWJ1dGVzXG4gIGZiVXRpbHMuZXNjYXBlQXR0cnMgPSBmdW5jdGlvbihhdHRycykge1xuICAgIGZvciAobGV0IGF0dHIgaW4gYXR0cnMpIHtcbiAgICAgIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShhdHRyKSkge1xuICAgICAgICBhdHRyc1thdHRyXSA9IGZiVXRpbHMuZXNjYXBlQXR0cihhdHRyc1thdHRyXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGF0dHJzO1xuICB9O1xuXG4gIC8vIGZvckVhY2ggdGhhdCBjYW4gYmUgdXNlZCBvbiBub2RlTGlzdFxuICBmYlV0aWxzLmZvckVhY2ggPSBmdW5jdGlvbihhcnJheSwgY2FsbGJhY2ssIHNjb3BlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgY2FsbGJhY2suY2FsbChzY29wZSwgaSwgYXJyYXlbaV0pOyAvLyBwYXNzZXMgYmFjayBzdHVmZiB3ZSBuZWVkXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgZHVwbGljYXRlcyBmcm9tIGFuIGFycmF5IG9mIGVsZW1lbnRzXG4gICAqIEBwYXJhbSAge0FycmF5fSBhcnJBcmcgYXJyYXkgd2l0aCBwb3NzaWJsZSBkdXBsaWNhdGVzXG4gICAqIEByZXR1cm4ge0FycmF5fSAgICAgICAgYXJyYXkgd2l0aCBvbmx5IHVuaXF1ZSB2YWx1ZXNcbiAgICovXG4gIGZiVXRpbHMudW5pcXVlID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICByZXR1cm4gYXJyYXkuZmlsdGVyKChlbGVtLCBwb3MsIGFycikgPT4ge1xuICAgICAgcmV0dXJuIGFyci5pbmRleE9mKGVsZW0pID09PSBwb3M7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIHByZXZpZXcgbWFya3VwXG4gICAqIEBwYXJhbSAge09iamVjdH0gIGZpZWxkRGF0YVxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBvcHRzXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59IHByZXZpZXdcbiAgICogQHJldHVybiB7U3RyaW5nfSAgcHJldmlldyBtYXJrdXAgZm9yIGZpZWxkXG4gICAqL1xuICBmYlV0aWxzLmZpZWxkUmVuZGVyID0gZnVuY3Rpb24oZmllbGREYXRhLCBvcHRzLCBwcmV2aWV3ID0gZmFsc2UpIHtcbiAgICAgIGxldCBmaWVsZE1hcmt1cCA9ICcnO1xuICAgICAgbGV0IGZpZWxkTGFiZWwgPSAnJztcbiAgICAgIGxldCBvcHRpb25zTWFya3VwID0gJyc7XG4gICAgICBsZXQgZmllbGRMYWJlbFRleHQgPSBmaWVsZERhdGEubGFiZWwgfHwgJyc7XG4gICAgICBsZXQgZmllbGREZXNjID0gZmllbGREYXRhLmRlc2NyaXB0aW9uIHx8ICcnO1xuICAgICAgbGV0IGZpZWxkUmVxdWlyZWQgPSAnJztcbiAgICAgIGxldCBmaWVsZE9wdGlvbnMgPSBmaWVsZERhdGEudmFsdWVzO1xuXG4gICAgICBmaWVsZERhdGEubmFtZSA9IHByZXZpZXcgPyBmaWVsZERhdGEubmFtZSArICctcHJldmlldycgOiBmaWVsZERhdGEubmFtZTtcbiAgICAgIGZpZWxkRGF0YS5pZCA9IGZpZWxkRGF0YS5uYW1lO1xuICAgICAgaWYgKGZpZWxkRGF0YS5tdWx0aXBsZSkge1xuICAgICAgICBmaWVsZERhdGEubmFtZSA9IGZpZWxkRGF0YS5uYW1lICsgJ1tdJztcbiAgICAgIH1cblxuICAgICAgZmllbGREYXRhLnR5cGUgPSBmaWVsZERhdGEuc3VidHlwZSB8fCBmaWVsZERhdGEudHlwZTtcblxuICAgICAgaWYgKGZpZWxkRGF0YS5yZXF1aXJlZCkge1xuICAgICAgICBmaWVsZERhdGEucmVxdWlyZWQgPSBudWxsO1xuICAgICAgICBmaWVsZERhdGFbJ2FyaWEtcmVxdWlyZWQnXSA9ICd0cnVlJztcbiAgICAgICAgZmllbGRSZXF1aXJlZCA9ICc8c3BhbiBjbGFzcz1cInJlcXVpcmVkXCI+Kjwvc3Bhbj4nO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmllbGREYXRhLnR5cGUgIT09ICdoaWRkZW4nKSB7XG4gICAgICAgIGlmIChmaWVsZERlc2MpIHtcbiAgICAgICAgICBmaWVsZERlc2MgPSBgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWVsZW1lbnRcIiB0b29sdGlwPVwiJHtmaWVsZERlc2N9XCI+Pzwvc3Bhbj5gO1xuICAgICAgICB9XG4gICAgICAgIGZpZWxkTGFiZWwgPSBgPGxhYmVsIGZvcj1cIiR7ZmllbGREYXRhLmlkfVwiIGNsYXNzPVwiZmItJHtmaWVsZERhdGEudHlwZX0tbGFiZWxcIj4ke2ZpZWxkTGFiZWxUZXh0fSAke2ZpZWxkUmVxdWlyZWR9ICR7ZmllbGREZXNjfTwvbGFiZWw+YDtcbiAgICAgIH1cblxuICAgICAgbGV0IGZpZWxkTGFiZWxWYWwgPSBmaWVsZERhdGEubGFiZWw7XG5cbiAgICAgIGRlbGV0ZSBmaWVsZERhdGEubGFiZWw7XG4gICAgICBkZWxldGUgZmllbGREYXRhLmRlc2NyaXB0aW9uO1xuXG4gICAgICBsZXQgZmllbGREYXRhU3RyaW5nID0gZmJVdGlscy5hdHRyU3RyaW5nKGZpZWxkRGF0YSk7XG5cbiAgICAgIHN3aXRjaCAoZmllbGREYXRhLnR5cGUpIHtcbiAgICAgICAgY2FzZSAndGV4dGFyZWEnOlxuICAgICAgICBjYXNlICdyaWNoLXRleHQnOlxuICAgICAgICAgIGRlbGV0ZSBmaWVsZERhdGEudHlwZTtcbiAgICAgICAgICBsZXQgZmllbGRWYWwgPSBmaWVsZERhdGEudmFsdWUgfHwgJyc7XG4gICAgICAgICAgZmllbGRNYXJrdXAgPSBgJHtmaWVsZExhYmVsfTx0ZXh0YXJlYSAke2ZpZWxkRGF0YVN0cmluZ30+JHtmaWVsZFZhbH08L3RleHRhcmVhPmA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgICAgbGV0IG9wdGlvbkF0dHJzU3RyaW5nO1xuICAgICAgICAgIGZpZWxkRGF0YS50eXBlID0gZmllbGREYXRhLnR5cGUucmVwbGFjZSgnLWdyb3VwJywgJycpO1xuXG4gICAgICAgICAgaWYgKGZpZWxkT3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKGZpZWxkRGF0YS5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICBvcHRpb25zTWFya3VwICs9IGA8b3B0aW9uIGRpc2FibGVkIHNlbGVjdGVkPiR7ZmllbGREYXRhLnBsYWNlaG9sZGVyfTwvb3B0aW9uPmA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmllbGRPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGlmICghZmllbGRPcHRpb25zW2ldLnNlbGVjdGVkIHx8IGZpZWxkRGF0YS5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBmaWVsZE9wdGlvbnNbaV0uc2VsZWN0ZWQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFmaWVsZE9wdGlvbnNbaV0ubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBmaWVsZE9wdGlvbnNbaV0ubGFiZWwgPSAnJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBvcHRpb25BdHRyc1N0cmluZyA9IGZiVXRpbHMuYXR0clN0cmluZyhmaWVsZE9wdGlvbnNbaV0pO1xuICAgICAgICAgICAgICBvcHRpb25zTWFya3VwICs9IGA8b3B0aW9uICR7b3B0aW9uQXR0cnNTdHJpbmd9PiR7ZmllbGRPcHRpb25zW2ldLmxhYmVsfTwvb3B0aW9uPmA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmllbGRNYXJrdXAgPSBgJHtmaWVsZExhYmVsfTxzZWxlY3QgJHtmaWVsZERhdGFTdHJpbmd9PiR7b3B0aW9uc01hcmt1cH08L3NlbGVjdD5gO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjaGVja2JveC1ncm91cCc6XG4gICAgICAgIGNhc2UgJ3JhZGlvLWdyb3VwJzpcbiAgICAgICAgICBsZXQgb3B0aW9uQXR0cnM7XG4gICAgICAgICAgZmllbGREYXRhLnR5cGUgPSBmaWVsZERhdGEudHlwZS5yZXBsYWNlKCctZ3JvdXAnLCAnJyk7XG5cbiAgICAgICAgICBpZiAoZmllbGREYXRhLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgIGZpZWxkRGF0YS5uYW1lID0gZmllbGREYXRhLm5hbWUgKyAnW10nO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChmaWVsZE9wdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCBvcHRpb25BdHRyc1N0cmluZztcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWVsZE9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgb3B0aW9uQXR0cnMgPSBPYmplY3QuYXNzaWduKHt2YWx1ZTogJycsIGxhYmVsOiAnJ30sIGZpZWxkRGF0YSwgZmllbGRPcHRpb25zW2ldKTtcblxuICAgICAgICAgICAgICBpZiAob3B0aW9uQXR0cnMuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9uQXR0cnMuc2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgb3B0aW9uQXR0cnMuY2hlY2tlZCA9IG51bGw7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBvcHRpb25BdHRycy5pZCA9IGZpZWxkRGF0YS5pZCArICctJyArIGk7XG4gICAgICAgICAgICAgIG9wdGlvbkF0dHJzU3RyaW5nID0gZmJVdGlscy5hdHRyU3RyaW5nKG9wdGlvbkF0dHJzKTtcbiAgICAgICAgICAgICAgb3B0aW9uc01hcmt1cCArPSBgPGlucHV0ICR7b3B0aW9uQXR0cnNTdHJpbmd9IC8+IDxsYWJlbCBmb3I9XCIke29wdGlvbkF0dHJzLmlkfVwiPiR7b3B0aW9uQXR0cnMubGFiZWx9PC9sYWJlbD48YnI+YDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZpZWxkRGF0YS5vdGhlcikge1xuICAgICAgICAgICAgICBsZXQgb3RoZXJPcHRpb25BdHRycyA9IHtcbiAgICAgICAgICAgICAgICBpZDogZmllbGREYXRhLmlkICsgJy0nICsgJ290aGVyJyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGZpZWxkRGF0YS5jbGFzc05hbWUgKyAnIG90aGVyLW9wdGlvbicsXG4gICAgICAgICAgICAgICAgb25jbGljazogYGZiVXRpbHMub3RoZXJPcHRpb25DQignJHtmaWVsZERhdGEuaWR9LW90aGVyJylgXG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgb3B0aW9uQXR0cnNTdHJpbmcgPSBmYlV0aWxzLmF0dHJTdHJpbmcoT2JqZWN0LmFzc2lnbih7fSwgZmllbGREYXRhLCBvdGhlck9wdGlvbkF0dHJzKSk7XG5cbiAgICAgICAgICAgICAgb3B0aW9uc01hcmt1cCArPSBgPGlucHV0ICR7b3B0aW9uQXR0cnNTdHJpbmd9IC8+IDxsYWJlbCBmb3I9XCIke290aGVyT3B0aW9uQXR0cnMuaWR9XCI+JHtvcHRzLm1lc3NhZ2VzLm90aGVyfTwvbGFiZWw+IDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCIke2ZpZWxkRGF0YS5uYW1lfVwiIGlkPVwiJHtvdGhlck9wdGlvbkF0dHJzLmlkfS12YWx1ZVwiIHN0eWxlPVwiZGlzcGxheTpub25lO1wiIC8+YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZmllbGRNYXJrdXAgPSBgJHtmaWVsZExhYmVsfTxkaXYgY2xhc3M9XCIke2ZpZWxkRGF0YS50eXBlfS1ncm91cFwiPiR7b3B0aW9uc01hcmt1cH08L2Rpdj5gO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgY2FzZSAncGFzc3dvcmQnOlxuICAgICAgICBjYXNlICdlbWFpbCc6XG4gICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIGNhc2UgJ2ZpbGUnOlxuICAgICAgICBjYXNlICdoaWRkZW4nOlxuICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgY2FzZSAndGVsJzpcbiAgICAgICAgY2FzZSAnYXV0b2NvbXBsZXRlJzpcbiAgICAgICAgICBmaWVsZE1hcmt1cCA9IGAke2ZpZWxkTGFiZWx9IDxpbnB1dCAke2ZpZWxkRGF0YVN0cmluZ30+YDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY29sb3InOlxuICAgICAgICAgIGZpZWxkTWFya3VwID0gYCR7ZmllbGRMYWJlbH0gPGlucHV0ICR7ZmllbGREYXRhU3RyaW5nfT4gJHtvcHRzLm1lc3NhZ2VzLnNlbGVjdENvbG9yfWA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2J1dHRvbic6XG4gICAgICAgIGNhc2UgJ3N1Ym1pdCc6XG4gICAgICAgICAgZmllbGRNYXJrdXAgPSBgPGJ1dHRvbiAke2ZpZWxkRGF0YVN0cmluZ30+JHtmaWVsZExhYmVsVmFsfTwvYnV0dG9uPmA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICAgICAgICBmaWVsZE1hcmt1cCA9IGA8aW5wdXQgJHtmaWVsZERhdGFTdHJpbmd9PiAke2ZpZWxkTGFiZWx9YDtcblxuICAgICAgICAgIGlmIChmaWVsZERhdGEudG9nZ2xlKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGZpZWxkRGF0YS5pZCkpLmtjVG9nZ2xlKCk7XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBmaWVsZE1hcmt1cCA9IGA8JHtmaWVsZERhdGEudHlwZX0gJHtmaWVsZERhdGFTdHJpbmd9PiR7ZmllbGRMYWJlbFZhbH08LyR7ZmllbGREYXRhLnR5cGV9PmA7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWVsZERhdGEudHlwZSAhPT0gJ2hpZGRlbicpIHtcbiAgICAgICAgbGV0IGNsYXNzTmFtZSA9IGZpZWxkRGF0YS5pZCA/IGBmYi0ke2ZpZWxkRGF0YS50eXBlfSBmb3JtLWdyb3VwIGZpZWxkLSR7ZmllbGREYXRhLmlkfWAgOiAnJztcbiAgICAgICAgZmllbGRNYXJrdXAgPSBmYlV0aWxzLm1hcmt1cCgnZGl2JywgZmllbGRNYXJrdXAsIHtcbiAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpZWxkTWFya3VwID0gZmJVdGlscy5tYXJrdXAoJ2lucHV0JywgbnVsbCwgZmllbGREYXRhKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZpZWxkTWFya3VwO1xuICAgIH07XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGZvciBvdGhlciBvcHRpb24uXG4gICAqIFRvZ2dsZXMgdGhlIGhpZGRlbiB0ZXh0IGFyZWEgZm9yIFwib3RoZXJcIiBvcHRpb24uXG4gICAqIEBwYXJhbSAge1N0cmluZ30gb3RoZXJJZCBpZCBvZiB0aGUgXCJvdGhlclwiIG9wdGlvbiBpbnB1dFxuICAgKi9cbiAgZmJVdGlscy5vdGhlck9wdGlvbkNCID0gKG90aGVySWQpID0+IHtcbiAgICBjb25zdCBvdGhlcklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQob3RoZXJJZCk7XG4gICAgY29uc3Qgb3RoZXJJbnB1dFZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7b3RoZXJJZH0tdmFsdWVgKTtcblxuICAgIGlmIChvdGhlcklucHV0LmNoZWNrZWQpIHtcbiAgICAgIG90aGVySW5wdXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIG90aGVySW5wdXRWYWx1ZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gICAgfSBlbHNlIHtcbiAgICAgIG90aGVySW5wdXQuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICAgICAgb3RoZXJJbnB1dFZhbHVlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDYXBpdGFsaXplcyBhIHN0cmluZ1xuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHN0ciB1bmNhcGl0YWxpemVkIHN0cmluZ1xuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHN0ciBjYXBpdGFsaXplZCBzdHJpbmdcbiAgICovXG4gIGZiVXRpbHMuY2FwaXRhbGl6ZSA9IChzdHIpID0+IHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcYlxcdy9nLCBmdW5jdGlvbihtKSB7XG4gICAgICAgIHJldHVybiBtLnRvVXBwZXJDYXNlKCk7XG4gICAgICB9KTtcbiAgfTtcbi8vICAgcmV0dXJuIGZiVXRpbHM7XG4vLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZmJVdGlscztcbiJdfQ==
