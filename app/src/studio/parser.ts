const Babel = require('babel-standalone');
export function parseTransformedCode(transformedCode: string) {
  const requires = {
    react: require('react'),
    'react-native': require('react-native'),
  };
  (window as any).requires = requires;
  console.log('parseTransformedCode begin');
  const res = eval(
    `let exports = {}
    function require(name){return window.requires[name]}` +
      transformedCode +
      '(()=>{return(exports)})()',
  );
  console.log('parseTransformedCode end');

  return res.default;
}
export function transformCode(code: string) {
  const transformed = Babel.transform(code, {
    presets: ['es2015', 'react'],
  }).code;
  console.log('transformed', transformed);
  return transformed;
}
export function strToFunction(code: string) {
  return parseTransformedCode(transformCode(code));
}
