const $moment = require('moment');
const $path = require('path');
const $fs = require('fs-extra');
$fs.ensureDirSync('./dist-zips')
module.exports = ({ clientType }) => {
    // su
    // sh docker-build.sh v6.1
    const destPath = $path.join('dist-zips', `minio-front-${$moment().format('YYYY-MM-DD_HH_mm_ss')}.zip`);
    const buildPath = $path.join('build')
    return zip({
        destPath,
        dirs: [
            $path.join(buildPath, 'scripts'),
            $path.join(buildPath, 'static'),
            $path.join(buildPath, 'styles'),
        ],
        filePaths: [
            $path.join(buildPath, 'index.html'),
        ]
    }).then(() => {
        console.log(`finished`)
        require('child_process').exec(`start "" "${$path.dirname(destPath)}"`);
        return {
            destPath
        }
    })

    function zip({ destPath, filePaths, files, dirs, dir }) {
        if (!destPath) throw new Error("打包方法未传入发布路径");
        return new Promise(async (resolve, reject) => {
            const output = $fs.createWriteStream(destPath);
            const $archiver = require("archiver");
            const archive = $archiver("zip", {
                zlib: { level: 9 }, // Sets the compression level.
            });
            output.on("close", function() {
                console.log(archive.pointer() + " total bytes");
                resolve({ destPath });
            });
            output.on("end", function() {
                console.log("Data has been drained");
            });
            archive.on("warning", function(err) {
                if (err.code === "ENOENT") {
                    console.error(err);
                } else {
                    reject(err);
                }
            });
            archive.on("finish", function() {
                console.log("archive finish");
            });
            archive.on("error", reject);
            archive.pipe(output);
            if (filePaths) {
                for (const filePath of filePaths) {
                    if (await $fs.exists(filePath))
                        archive.file(filePath, { name: $path.basename(filePath) });
                }
            }
            if (files) {
                for (const file of files) {
                    if (await $fs.exists(file.fromPath))
                        archive.file(file.fromPath, { name: file.name });
                }
            }
            if (dirs) {
                for (const dir of dirs) {
                    if (typeof dir === "string") {
                        if (await $fs.exists(dir))
                            archive.directory(dir, $path.basename(dir));
                    } else if (await $fs.exists(dir.fromPath))
                        archive.directory(dir.fromPath + '/', dir.name);
                }
            }
            if (dir && (await $fs.exists(dir))) archive.directory(dir, false);
            archive.finalize();
        });
    }
    
}
module.exports({})