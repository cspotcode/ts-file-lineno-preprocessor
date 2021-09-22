Quick idea to use find-and-replace preprocessing to implement FILE and LINENO macros in TypeScript.

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

## Caveats

This preprocessing is accomplished with find-and-replace *before* any sourcemaps are generated.  The replacements are always one-liners so they never affect line numbers.  However, they do vary in width, so the sourcemapped column positions of anything to the *right* of `__SOURCE_POSITION__` will be wrong.  In the example above, this is not a problem because there is nothing interesting to the right.

The benefits of this limitation are a *much* simpler preprocessor.

## Future ideas

Play nice with webpack/esbuild/etc "define" and other features meant to eliminate unnecessary code from production builds.

Support inlining LINENO *only*; no filename

Instead of inlining the filename and line number, inline a unique identifier which can be translated to filename and line number elsewhere.  For example `__SOURCE_POSITIONS__.hash_f8eb382` and then emit the `__SOURCE_POSITIONS__` dictionary into another file, so it can be no-op'd for prod or preprocessed with additional info.
