const Util = module.exports;

Util.randomInteger = (min, max) => {
    return Math.random() * (max - min) + min;
}