const configFileName = './rss_feeds.text';

const res = configFileName;
const error = false;

const fn1 = () => {
    //...do something
    console.info('fn1');
    if (error) next(error);
    next(null, res);
}
const fn2 = () => {
    //...do something
    console.info('fn2');
    if (error) next(error);
    next(null, res);
}
const fn3 = () => {
    //...do something
    console.info('fn3');
    if (error) next(error);
    next(null, res);
}
const fn4 = () => {
    //...do something
    console.info('fn4');
    if (error) next(error);
    next(null, res);
}

const taskList = [fn1, fn2, fn3, fn4];

const next = (error, res) => {
    if (error) {
        throw error;
        return;
    }
    const curTask = taskList.shift();
    if (curTask) {
        curTask(res);
    }
}

next();