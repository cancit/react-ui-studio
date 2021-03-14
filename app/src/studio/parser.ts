const Babel = require('babel-standalone');
export function parseTransformedCode(transformedCode: string) {
  const requires = {
    react: require('react'),
    'react-native': require('react-native'),
  };
  (window as any).requires = requires;
  const res = eval(
    `function require(name){return window.requires[name]}` +
      transformedCode +
      '(()=>{return(exports)})()',
  );
  return res.default;
}
export function transformCode(code: string) {
  const transformed = Babel.transform(code, {
    presets: ['es2015', 'react'],
  }).code;
  return transformed;
}
export function strToFunction(code: string) {
  return parseTransformedCode(transformCode(code));
}
