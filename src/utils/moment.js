/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
* Copyright 2019 Adobe
* All Rights Reserved.
*
* NOTICE: All information contained herein is, and remains
* the property of Adobe and its suppliers, if any. The intellectual
* and technical concepts contained herein are proprietary to Adobe
* and its suppliers and are protected by all applicable intellectual
* property laws, including trade secret and copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe.
**************************************************************************/

import {DateRange} from 'moment-range';
import moment from 'moment';

export const toMoment = (value, format) => {
  if (!value) {
    return null;
  }

  // if 'today'
  if (value === 'today') {
    return moment();
  }

  if (value instanceof DateRange) {
    return value;
  }

  if (Array.isArray(value)) {
    return new DateRange(value.map(v => toMoment(v, format)));
  }

  // If it's a moment object
  if (moment.isMoment(value)) {
    return value.isValid() ? value.clone() : null;
  }

  // Anything else
  const result = moment(value, value instanceof Date ? null : format, true);
  return result.isValid() ? result : null;
};

export const isDateInRange = (date, min, max) => {
  if (!min && !max) {
    return true;
  }
  if (!min) {
    return date <= max;
  }
  if (!max) {
    return date >= min;
  }
  return min <= date && date <= max;
};

export const formatMoment = (date, valueFormat) => {
  if (!date) {
    return '';
  }
  if (valueFormat === moment.ISO_8601) {
    return date.format();
  }
  if (typeof valueFormat === 'string') {
    return date.format(valueFormat);
  }

  throw new Error(
    `${valueFormat} is not valid, 'valueFormat' should be a moment format string ` +
    'or the moment.ISO_8601 constant.'
  );
};