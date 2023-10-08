const CloneSamples = require("./handle");

exports.HandleSamplesData = (option) => {
    const { clone, tool } = option;

    if (clone) CloneSamples.CloneData(clone);
    if (tool) CloneSamples.Tool();
    return;
};
