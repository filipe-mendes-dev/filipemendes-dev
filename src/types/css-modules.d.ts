declare module '*.module.css' {
  type CssModuleClasses = Readonly<Record<string, string>>;

  const classes: CssModuleClasses;

  export default classes;
}
