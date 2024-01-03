"use strict";var loadPyodide=(()=>{var te=Object.create;var w=Object.defineProperty;var re=Object.getOwnPropertyDescriptor;var ne=Object.getOwnPropertyNames;var ie=Object.getPrototypeOf,oe=Object.prototype.hasOwnProperty;var m=(e,t)=>w(e,"name",{value:t,configurable:!0}),g=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,a)=>(typeof require<"u"?require:t)[a]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')});var U=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),ae=(e,t)=>{for(var a in t)w(e,a,{get:t[a],enumerable:!0})},$=(e,t,a,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of ne(t))!oe.call(e,o)&&o!==a&&w(e,o,{get:()=>t[o],enumerable:!(s=re(t,o))||s.enumerable});return e};var b=(e,t,a)=>(a=e!=null?te(ie(e)):{},$(t||!e||!e.__esModule?w(a,"default",{value:e,enumerable:!0}):a,e)),se=e=>$(w({},"__esModule",{value:!0}),e);var C=U((R,j)=>{(function(e,t){"use strict";typeof define=="function"&&define.amd?define("stackframe",[],t):typeof R=="object"?j.exports=t():e.StackFrame=t()})(R,function(){"use strict";function e(u){return!isNaN(parseFloat(u))&&isFinite(u)}m(e,"_isNumber");function t(u){return u.charAt(0).toUpperCase()+u.substring(1)}m(t,"_capitalize");function a(u){return function(){return this[u]}}m(a,"_getter");var s=["isConstructor","isEval","isNative","isToplevel"],o=["columnNumber","lineNumber"],r=["fileName","functionName","source"],n=["args"],c=["evalOrigin"],i=s.concat(o,r,n,c);function l(u){if(u)for(var y=0;y<i.length;y++)u[i[y]]!==void 0&&this["set"+t(i[y])](u[i[y]])}m(l,"StackFrame"),l.prototype={getArgs:function(){return this.args},setArgs:function(u){if(Object.prototype.toString.call(u)!=="[object Array]")throw new TypeError("Args must be an Array");this.args=u},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(u){if(u instanceof l)this.evalOrigin=u;else if(u instanceof Object)this.evalOrigin=new l(u);else throw new TypeError("Eval Origin must be an Object or StackFrame")},toString:function(){var u=this.getFileName()||"",y=this.getLineNumber()||"",h=this.getColumnNumber()||"",_=this.getFunctionName()||"";return this.getIsEval()?u?"[eval] ("+u+":"+y+":"+h+")":"[eval]:"+y+":"+h:_?_+" ("+u+":"+y+":"+h+")":u+":"+y+":"+h}},l.fromString=m(function(y){var h=y.indexOf("("),_=y.lastIndexOf(")"),Y=y.substring(0,h),J=y.substring(h+1,_).split(","),D=y.substring(_+1);if(D.indexOf("@")===0)var O=/@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(D,""),Q=O[1],Z=O[2],ee=O[3];return new l({functionName:Y,args:J||void 0,fileName:Q,lineNumber:Z||void 0,columnNumber:ee||void 0})},"StackFrame$$fromString");for(var d=0;d<s.length;d++)l.prototype["get"+t(s[d])]=a(s[d]),l.prototype["set"+t(s[d])]=function(u){return function(y){this[u]=!!y}}(s[d]);for(var p=0;p<o.length;p++)l.prototype["get"+t(o[p])]=a(o[p]),l.prototype["set"+t(o[p])]=function(u){return function(y){if(!e(y))throw new TypeError(u+" must be a Number");this[u]=Number(y)}}(o[p]);for(var f=0;f<r.length;f++)l.prototype["get"+t(r[f])]=a(r[f]),l.prototype["set"+t(r[f])]=function(u){return function(y){this[u]=String(y)}}(r[f]);return l})});var A=U((N,M)=>{(function(e,t){"use strict";typeof define=="function"&&define.amd?define("error-stack-parser",["stackframe"],t):typeof N=="object"?M.exports=t(C()):e.ErrorStackParser=t(e.StackFrame)})(N,m(function(t){"use strict";var a=/(^|@)\S+:\d+/,s=/^\s*at .*(\S+:\d+|\(native\))/m,o=/^(eval@)?(\[native code])?$/;return{parse:m(function(n){if(typeof n.stacktrace<"u"||typeof n["opera#sourceloc"]<"u")return this.parseOpera(n);if(n.stack&&n.stack.match(s))return this.parseV8OrIE(n);if(n.stack)return this.parseFFOrSafari(n);throw new Error("Cannot parse given Error object")},"ErrorStackParser$$parse"),extractLocation:m(function(n){if(n.indexOf(":")===-1)return[n];var c=/(.+?)(?::(\d+))?(?::(\d+))?$/,i=c.exec(n.replace(/[()]/g,""));return[i[1],i[2]||void 0,i[3]||void 0]},"ErrorStackParser$$extractLocation"),parseV8OrIE:m(function(n){var c=n.stack.split(`
`).filter(function(i){return!!i.match(s)},this);return c.map(function(i){i.indexOf("(eval ")>-1&&(i=i.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));var l=i.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),d=l.match(/ (\(.+\)$)/);l=d?l.replace(d[0],""):l;var p=this.extractLocation(d?d[1]:l),f=d&&l||void 0,u=["eval","<anonymous>"].indexOf(p[0])>-1?void 0:p[0];return new t({functionName:f,fileName:u,lineNumber:p[1],columnNumber:p[2],source:i})},this)},"ErrorStackParser$$parseV8OrIE"),parseFFOrSafari:m(function(n){var c=n.stack.split(`
`).filter(function(i){return!i.match(o)},this);return c.map(function(i){if(i.indexOf(" > eval")>-1&&(i=i.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),i.indexOf("@")===-1&&i.indexOf(":")===-1)return new t({functionName:i});var l=/((.*".+"[^@]*)?[^@]*)(?:@)/,d=i.match(l),p=d&&d[1]?d[1]:void 0,f=this.extractLocation(i.replace(l,""));return new t({functionName:p,fileName:f[0],lineNumber:f[1],columnNumber:f[2],source:i})},this)},"ErrorStackParser$$parseFFOrSafari"),parseOpera:m(function(n){return!n.stacktrace||n.message.indexOf(`
`)>-1&&n.message.split(`
`).length>n.stacktrace.split(`
`).length?this.parseOpera9(n):n.stack?this.parseOpera11(n):this.parseOpera10(n)},"ErrorStackParser$$parseOpera"),parseOpera9:m(function(n){for(var c=/Line (\d+).*script (?:in )?(\S+)/i,i=n.message.split(`
`),l=[],d=2,p=i.length;d<p;d+=2){var f=c.exec(i[d]);f&&l.push(new t({fileName:f[2],lineNumber:f[1],source:i[d]}))}return l},"ErrorStackParser$$parseOpera9"),parseOpera10:m(function(n){for(var c=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,i=n.stacktrace.split(`
`),l=[],d=0,p=i.length;d<p;d+=2){var f=c.exec(i[d]);f&&l.push(new t({functionName:f[3]||void 0,fileName:f[2],lineNumber:f[1],source:i[d]}))}return l},"ErrorStackParser$$parseOpera10"),parseOpera11:m(function(n){var c=n.stack.split(`
`).filter(function(i){return!!i.match(a)&&!i.match(/^Error created at/)},this);return c.map(function(i){var l=i.split("@"),d=this.extractLocation(l.pop()),p=l.shift()||"",f=p.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^)]*\)/g,"")||void 0,u;p.match(/\(([^)]*)\)/)&&(u=p.replace(/^[^(]+\(([^)]*)\)$/,"$1"));var y=u===void 0||u==="[arguments not available]"?void 0:u.split(",");return new t({functionName:f,args:y,fileName:d[0],lineNumber:d[1],columnNumber:d[2],source:i})},this)},"ErrorStackParser$$parseOpera11")}},"ErrorStackParser"))});var we={};ae(we,{loadPyodide:()=>T,version:()=>v});var X=b(A());var k=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&typeof process.browser=="undefined",B,F,L,W,H;async function I(){if(!k||(B=(await import("url")).default,H=await import("fs/promises"),globalThis.fetch?F=fetch:F=(await import("node-fetch")).default,W=(await import("vm")).default,L=await import("path"),x=L.sep,typeof g!="undefined"))return;let e=await import("fs"),t=await import("crypto"),a=await import("ws"),s=await import("child_process"),o={fs:e,crypto:t,ws:a,child_process:s};globalThis.require=function(r){return o[r]}}m(I,"initNodeModules");function le(e,t){return L.resolve(t||".",e)}m(le,"node_resolvePath");function de(e,t){return t===void 0&&(t=location),new URL(e,t).toString()}m(de,"browser_resolvePath");var P;k?P=le:P=de;var x;k||(x="/");function ce(e,t){return e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?{response:F(e)}:{binary:H.readFile(e).then(a=>new Uint8Array(a.buffer,a.byteOffset,a.byteLength))}}m(ce,"node_getBinaryResponse");function ue(e,t){let a=new URL(e,location);return{response:fetch(a,t?{integrity:t}:{})}}m(ue,"browser_getBinaryResponse");var E;k?E=ce:E=ue;

async function z(oe,t){let e=oe;if(oe.endsWith('.whl')){e=oe+'.zip';}let{response:a,binary:s}=E(e,t);if(s)return s;let o=await a;if(!o.ok)throw new Error(`Failed to load '${e}': request failed.`);return new Uint8Array(await o.arrayBuffer())}

m(z,"loadBinaryFile");var S;if(globalThis.document)S=m(async e=>await import(e),"loadScript");else if(globalThis.importScripts)S=m(async e=>{try{globalThis.importScripts(e)}catch(t){if(t instanceof TypeError)await import(e);else throw t}},"loadScript");else if(k)S=fe;else throw new Error("Cannot determine runtime environment");async function fe(e){e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?W.runInThisContext(await(await F(e)).text()):await import(B.pathToFileURL(e).href)}m(fe,"nodeLoadScript");function G(e){let t=e.FS,a=e.FS.filesystems.MEMFS,s=e.PATH,o={DIR_MODE:16895,FILE_MODE:33279,mount:function(r){if(!r.opts.fileSystemHandle)throw new Error("opts.fileSystemHandle is required");return a.mount.apply(null,arguments)},syncfs:async(r,n,c)=>{try{let i=o.getLocalSet(r),l=await o.getRemoteSet(r),d=n?l:i,p=n?i:l;await o.reconcile(r,d,p),c(null)}catch(i){c(i)}},getLocalSet:r=>{let n=Object.create(null);function c(d){return d!=="."&&d!==".."}m(c,"isRealDir");function i(d){return p=>s.join2(d,p)}m(i,"toAbsolute");let l=t.readdir(r.mountpoint).filter(c).map(i(r.mountpoint));for(;l.length;){let d=l.pop(),p=t.stat(d);t.isDir(p.mode)&&l.push.apply(l,t.readdir(d).filter(c).map(i(d))),n[d]={timestamp:p.mtime,mode:p.mode}}return{type:"local",entries:n}},getRemoteSet:async r=>{let n=Object.create(null),c=await me(r.opts.fileSystemHandle);for(let[i,l]of c)i!=="."&&(n[s.join2(r.mountpoint,i)]={timestamp:l.kind==="file"?(await l.getFile()).lastModifiedDate:new Date,mode:l.kind==="file"?o.FILE_MODE:o.DIR_MODE});return{type:"remote",entries:n,handles:c}},loadLocalEntry:r=>{let c=t.lookupPath(r).node,i=t.stat(r);if(t.isDir(i.mode))return{timestamp:i.mtime,mode:i.mode};if(t.isFile(i.mode))return c.contents=a.getFileDataAsTypedArray(c),{timestamp:i.mtime,mode:i.mode,contents:c.contents};throw new Error("node type not supported")},storeLocalEntry:(r,n)=>{if(t.isDir(n.mode))t.mkdirTree(r,n.mode);else if(t.isFile(n.mode))t.writeFile(r,n.contents,{canOwn:!0});else throw new Error("node type not supported");t.chmod(r,n.mode),t.utime(r,n.timestamp,n.timestamp)},removeLocalEntry:r=>{var n=t.stat(r);t.isDir(n.mode)?t.rmdir(r):t.isFile(n.mode)&&t.unlink(r)},loadRemoteEntry:async r=>{if(r.kind==="file"){let n=await r.getFile();return{contents:new Uint8Array(await n.arrayBuffer()),mode:o.FILE_MODE,timestamp:n.lastModifiedDate}}else{if(r.kind==="directory")return{mode:o.DIR_MODE,timestamp:new Date};throw new Error("unknown kind: "+r.kind)}},storeRemoteEntry:async(r,n,c)=>{let i=r.get(s.dirname(n)),l=t.isFile(c.mode)?await i.getFileHandle(s.basename(n),{create:!0}):await i.getDirectoryHandle(s.basename(n),{create:!0});if(l.kind==="file"){let d=await l.createWritable();await d.write(c.contents),await d.close()}r.set(n,l)},removeRemoteEntry:async(r,n)=>{await r.get(s.dirname(n)).removeEntry(s.basename(n)),r.delete(n)},reconcile:async(r,n,c)=>{let i=0,l=[];Object.keys(n.entries).forEach(function(f){let u=n.entries[f],y=c.entries[f];(!y||t.isFile(u.mode)&&u.timestamp.getTime()>y.timestamp.getTime())&&(l.push(f),i++)}),l.sort();let d=[];if(Object.keys(c.entries).forEach(function(f){n.entries[f]||(d.push(f),i++)}),d.sort().reverse(),!i)return;let p=n.type==="remote"?n.handles:c.handles;for(let f of l){let u=s.normalize(f.replace(r.mountpoint,"/")).substring(1);if(c.type==="local"){let y=p.get(u),h=await o.loadRemoteEntry(y);o.storeLocalEntry(f,h)}else{let y=o.loadLocalEntry(f);await o.storeRemoteEntry(p,u,y)}}for(let f of d)if(c.type==="local")o.removeLocalEntry(f);else{let u=s.normalize(f.replace(r.mountpoint,"/")).substring(1);await o.removeRemoteEntry(p,u)}}};e.FS.filesystems.NATIVEFS_ASYNC=o}m(G,"initializeNativeFS");var me=m(async e=>{let t=[];async function a(o){for await(let r of o.values())t.push(r),r.kind==="directory"&&await a(r)}m(a,"collect"),await a(e);let s=new Map;s.set(".",e);for(let o of t){let r=(await e.resolve(o)).join("/");s.set(r,o)}return s},"getFsHandles");function V(){let e={};return e.noImageDecoding=!0,e.noAudioDecoding=!0,e.noWasmDecoding=!1,e.preRun=[],e.quit=(t,a)=>{throw e.exited={status:t,toThrow:a},a},e}m(V,"createModule");function pe(e,t){e.preRun.push(function(){let a="/";try{e.FS.mkdirTree(t)}catch(s){console.error(`Error occurred while making a home directory '${t}':`),console.error(s),console.error(`Using '${a}' for a home directory instead`),t=a}e.FS.chdir(t)})}m(pe,"createHomeDirectory");function ye(e,t){e.preRun.push(function(){Object.assign(e.ENV,t)})}m(ye,"setEnvironment");function ge(e,t){e.preRun.push(()=>{for(let a of t)e.FS.mkdirTree(a),e.FS.mount(e.FS.filesystems.NODEFS,{root:a},a)})}m(ge,"mountLocalDirectories");function be(e,t){let a=z(t);e.preRun.push(()=>{let s=e._py_version_major(),o=e._py_version_minor();e.FS.mkdirTree("/lib"),e.FS.mkdirTree(`/lib/python${s}.${o}/site-packages`),e.addRunDependency("install-stdlib"),a.then(r=>{e.FS.writeFile(`/lib/python${s}${o}.zip`,r)}).catch(r=>{console.error("Error occurred while installing the standard library:"),console.error(r)}).finally(()=>{e.removeRunDependency("install-stdlib")})})}m(be,"installStdlib");function q(e,t){let a;t.stdLibURL!=null?a=t.stdLibURL:a=t.indexURL+"python_stdlib.zip",be(e,a),pe(e,t.env.HOME),ye(e,t.env),ge(e,t._node_mounts),e.preRun.push(()=>G(e))}m(q,"initializeFileSystem");function K(e,t){let{binary:a,response:s}=E(t+"pyodide.asm.wasm");e.instantiateWasm=function(o,r){return async function(){try{let n;s?n=await WebAssembly.instantiateStreaming(s,o):n=await WebAssembly.instantiate(await a,o);let{instance:c,module:i}=n;typeof WasmOffsetConverter!="undefined"&&(wasmOffsetConverter=new WasmOffsetConverter(wasmBinary,i)),r(c,i)}catch(n){console.warn("wasm instantiation failed!"),console.warn(n)}}(),{}}}m(K,"preloadWasm");var v="0.24.1";function he(e,t){return new Proxy(e,{get(a,s){return s==="get"?o=>{let r=a.get(o);return r===void 0&&(r=t.get(o)),r}:s==="has"?o=>a.has(o)||t.has(o):Reflect.get(a,s)}})}m(he,"wrapPythonGlobals");function ve(e,t){e.runPythonInternal_dict=e._pyodide._base.eval_code("{}"),e.importlib=e.runPythonInternal("import importlib; importlib");let a=e.importlib.import_module;e.sys=a("sys"),e.sys.path.insert(0,t.env.HOME),e.os=a("os");let s=e.runPythonInternal("import __main__; __main__.__dict__"),o=e.runPythonInternal("import builtins; builtins.__dict__");e.globals=he(s,o);let r=e._pyodide._importhook;function n(i){"__all__"in i||Object.defineProperty(i,"__all__",{get:()=>c.toPy(Object.getOwnPropertyNames(i).filter(l=>l!=="__all__")),enumerable:!1,configurable:!0})}m(n,"jsFinderHook"),r.register_js_finder.callKwargs({hook:n}),r.register_js_module("js",t.jsglobals);let c=e.makePublicAPI();return r.register_js_module("pyodide_js",c),e.pyodide_py=a("pyodide"),e.pyodide_code=a("pyodide.code"),e.pyodide_ffi=a("pyodide.ffi"),e.package_loader=a("pyodide._package_loader"),e.sitepackages=e.package_loader.SITE_PACKAGES.__str__(),e.dsodir=e.package_loader.DSO_DIR.__str__(),e.defaultLdLibraryPath=[e.dsodir,e.sitepackages],e.os.environ.__setitem__("LD_LIBRARY_PATH",e.defaultLdLibraryPath.join(":")),c.pyodide_py=e.pyodide_py,c.globals=e.globals,c}m(ve,"finalizeBootstrap");function _e(){if(typeof __dirname=="string")return __dirname;let e;try{throw new Error}catch(s){e=s}let t=X.default.parse(e)[0].fileName,a=t.lastIndexOf(x);if(a===-1)throw new Error("Could not extract indexURL path from pyodide module location");return t.slice(0,a)}m(_e,"calculateIndexURL");async function T(e={}){await I();let t=e.indexURL||_e();t=P(t),t.endsWith("/")||(t+="/"),e.indexURL=t;let a={fullStdLib:!1,jsglobals:globalThis,stdin:globalThis.prompt?globalThis.prompt:void 0,lockFileURL:t+"pyodide-lock.json",args:[],_node_mounts:[],env:{},packageCacheDir:t,packages:[]},s=Object.assign(a,e);if(e.homedir){if(console.warn("The homedir argument to loadPyodide is deprecated. Use 'env: { HOME: value }' instead of 'homedir: value'."),e.env&&e.env.HOME)throw new Error("Set both env.HOME and homedir arguments");s.env.HOME=s.homedir}s.env.HOME||(s.env.HOME="/home/pyodide");let o=V();o.print=s.stdout,o.printErr=s.stderr,o.arguments=s.args;let r={config:s};o.API=r,K(o,t),q(o,s);let n=new Promise(f=>o.postRun=f),c;if(r.bootstrapFinalizedPromise=new Promise(f=>c=f),o.locateFile=f=>s.indexURL+f,typeof _createPyodideModule!="function"){let f=`${s.indexURL}pyodide.asm.js`;await S(f)}if(await _createPyodideModule(o),await n,o.exited)throw o.exited.toThrow;if(r.version!==v)throw new Error(`Pyodide version does not match: '${v}' <==> '${r.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.`);o.locateFile=f=>{throw new Error("Didn't expect to load any more file_packager files!")};let[i,l]=r.rawRun("import _pyodide_core");i&&o.API.fatal_loading_error(`Failed to import _pyodide_core
`,l);let d=ve(r,s);if(c(),d.version.includes("dev")||r.setCdnUrl(`https://cdn.jsdelivr.net/pyodide/v${d.version}/full/`),await r.packageIndexReady,r._pyodide._importhook.register_module_not_found_hook(r._import_name_to_package_name,r.lockfile_unvendored_stdlibs_and_test),r.lockfile_info.version!==v)throw new Error("Lock file version doesn't match Pyodide version");return r.package_loader.init_loaded_packages(),s.fullStdLib&&await d.loadPackage(r.lockfile_unvendored_stdlibs),r.initializeStreams(s.stdin,s.stdout,s.stderr),d}m(T,"loadPyodide");globalThis.loadPyodide=T;return se(we);})();
try{Object.assign(exports,loadPyodide)}catch(_){}
globalThis.loadPyodide=loadPyodide.loadPyodide;
//# sourceMappingURL=pyodide.js.map
