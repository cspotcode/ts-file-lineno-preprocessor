Quick idea to use find-and-replace proprocessing to implement FILE and LINENO macros in TypeScript.

Supports both esbuild, as a plugin, and ts-node, via a `readFile` implementation.

Use the identifier `__SOURCE_POSITION__` in code and it will be replaced with an object describing absolute file path and line number.
Note that file path is the *absolute* path at *build-time*.  If writing .ts, this will be the path to the .ts file,
and it may include the name of a user's home directory.

```
// comments
// the code happens on line 3
logger.reportDiagnostics('hello world', __SOURCE_POSITION__);
```

Becomes:

```
// comments
// the code happens on line 3
logger.reportDiagnostics('hello world', ({FILE: "/home/cspotcode/projects/example/index.ts", LINENO: 3}));
```