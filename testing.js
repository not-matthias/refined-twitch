// let elements = [0];
// let previousElements = [];

// const enabledFeatures = elements.filter((i) => {
//     console.log("[1] elements i: ", i);
//     console.log("[1] previousElements.indexOf(i): ", previousElements.indexOf(i));

//     return previousElements.indexOf(i) === -1;
// });
// const disabledFeatures = previousElements.filter((i) => {
//     console.log("[2] previousElements i: ", i);
//     console.log("[2] elements.indexOf(i): ", previousElements.indexOf(i));

//     return elements.indexOf(i) === -1;
// });

// console.log("enabledFeatures: ", enabledFeatures);
// console.log("disabledFeatures: ", disabledFeatures);

let e = [0];
let previousElements = [];


console.log("elements: ", e),
console.log("previousElements: ", previousElements),
n = e.filter((function(t) {
    return console.log("[1] elements i: ", t),
    console.log("[1] previousElements.indexOf(i): ", previousElements.indexOf(t)),
    -1 === previousElements.indexOf(t)
}
)),
r = previousElements.filter((function(t) {
    return console.log("[2] previousElements i: ", t),
    console.log("[2] elements.indexOf(i): ", previousElements.indexOf(t)),
    -1 === e.indexOf(t)
}
));


console.log(n);
console.log(r);