let elements = [0];
let previousElements = [];

const enabledFeatures = elements.filter((i) => {
    console.log("[1] elements i: ", i);
    console.log("[1] previousElements.indexOf(i): ", previousElements.indexOf(i));

    return previousElements.indexOf(i) === -1;
});
const disabledFeatures = previousElements.filter((i) => {
    console.log("[2] previousElements i: ", i);
    console.log("[2] elements.indexOf(i): ", previousElements.indexOf(i));

    return elements.indexOf(i) === -1;
});

console.log("enabledFeatures: ", enabledFeatures);
console.log("disabledFeatures: ", disabledFeatures);