export function processFile(FILE, text) {
    while(true) {
        replacePosition = text.indexOf(ident);
        if(replacePosition === -1) break;
        const before = text.substr(0, replacePosition);
        let LINE = 0;
        let lastNewlineAt = 0;
        while(lastNewlineAt !== -1) {
            LINE++;
            lastNewlineAt = before.indexOf('\n', lastNewlineAt);
        }
        text = before + '(' + JSON.stringify({
            FILE,
            LINE,
        }) + ')' + text.slice(replacePosition + ident.length);
    }
    return text;
}

const ident = '__SOURCE_POSITION__';

/**
 * For ts-node
 * @param {string} path
 */
export function readFile(path) {
    const fileContents = fs.readFileSync(path, 'utf8');
    // TODO obey ts-node's `ignore` option?
    // Should not be preprocessing third-party .d.ts
    // Should not be preprocessing .d.ts at all
    if(path.match(/\.(?:ts|js|tsx|jsx)/)) {
        return processFile(path, fileContents);
    }
    return fileContents;
}

/** For esbuild */
export const esbuildPlugin = {
    name: 'example',
    setup(build) {
        let fs = require('fs')

        // Load ".txt" files and return an array of words
        build.onLoad({ filter: /\.js$/ }, async (args) => {
            let text = await fs.promises.readFile(args.path, 'utf8');
            text = processFile(args.path, text);
            return {
                contents: text,
                loader: 'js',
            };
        })
    },
}
