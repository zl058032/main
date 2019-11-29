import React from 'react';
import { connect } from 'dva';

function FormattedMessage({
  i18n, id, data = {}, className,
}) {
  let text = i18n[id];
  if (!text) {
    text = id;
    console.warn('Missing i18n tag: ' + id);
  }
  Object.keys(data).forEach((key) => {
    const reg = new RegExp(`{${key}}`, 'ig');
    text = text.replace(reg, data[key]);
  });
  return (
    <span className={className}>{text}</span>
  );
}


function mapStateToProps({ utils }) {
  return { i18n: utils.i18n };
}

export default connect(mapStateToProps)(FormattedMessage);

export function t(id) {
  const i18n = window._APP_ ? window._APP_._store.getState().utils.i18n : window.i18n;
  return i18n[id] || id;
}
