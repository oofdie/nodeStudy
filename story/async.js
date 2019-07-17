const fs = require('fs');
const fileDir = `${__dirname}/text`;
let curTask = 0;
const res = {};

const complete = () => {
    fs.writeFile(`${fileDir}/result.json`, JSON.stringify(res), (err) => {
        if (err) throw err;
    });
}

const isComplete = (tasksSum) => {
    curTask ++;
    if (curTask === tasksSum) {
        complete();
    }
}

const countWords = (filename, str) => {
    const words = str.split(/\W+/g).filter(i => i);
    const obj = {};
    words.forEach(i => {
        if (obj[i]) {
            obj[i] ++;
        } else {
            obj[i] = 1;
        }
    });
    res[filename] = obj;
}

fs.readdir(fileDir, (error, files) => {
    console.info('read', files.length);
    if (error) {
        throw error;
        return;
    }
    const tasksSum = files.length;

    ((tasksSum, files) => {
        files.forEach(file => {
            fs.readFile(fileDir + '/' + file, (err, data) => {
                if (err) {
                    throw err;
                }
                const str = data.toString();
                countWords(file, str);
                isComplete(tasksSum);
            })
        })
    })(tasksSum, files);
})