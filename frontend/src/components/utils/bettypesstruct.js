let BetTypeStruct = {};


const verifyAndAdd = (b, struct, search, replace) => {
    if (b) {
        b.bettypeName = b.bettypeName.replace(search, replace);
        struct.bettypes.push(b);
    }

    return struct;
}

BetTypeStruct.organizeByFootball = (data) => {

    let bettypesByName = [];
    data.forEach(b => {
        bettypesByName[b.bettypeName] = { ...b };
    })




    let tr = {
        name: 'Tempo Regulamentar',
        bettypes: []
    }

    verifyAndAdd(bettypesByName['TR 1'], tr, 'TR 1', '1');
    verifyAndAdd(bettypesByName['TR X'], tr, 'TR X', 'X');
    verifyAndAdd(bettypesByName['TR 2'], tr, 'TR 2', '2');


    console.log("Tempo Regulamentar")
    console.log(tr)

    let int = {
        name: 'Ao Intervalo',
        bettypes: []
    }

    verifyAndAdd(bettypesByName['INT 1'], int, 'INT 1', '1');
    verifyAndAdd(bettypesByName['INT X'], int, 'INT X', 'X');
    verifyAndAdd(bettypesByName['INT 2'], int, 'INT 2', '2');

    console.log("Ao intervalo")
    console.log(int)

    let all = [];
    if (tr.bettypes.length > 0) all.push(tr);
    if (int.bettypes.length > 0) all.push(int);

    console.log(all)

    // TODO : adicionar os golos

    return all;
}

BetTypeStruct.organize = (data) => {

    console.log("PRINTING DATA")
    console.log(data);

    switch (data.event.sport.name.toUpperCase()) {
        case 'FOOTBALL':
            return BetTypeStruct.organizeByFootball(data.bettypes);

        case 'BASKETBALL':

        default:

            return data;
    }

}

export default BetTypeStruct;