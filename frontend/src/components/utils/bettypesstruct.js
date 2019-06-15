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

    console.log("BETTYPES", data)

    let tr = {
        name: 'Regular Time',
        bettypes: []
    }

    verifyAndAdd(bettypesByName['TR 1'], tr, 'TR 1', '1');
    verifyAndAdd(bettypesByName['TR X'], tr, 'TR X', 'X');
    verifyAndAdd(bettypesByName['TR 2'], tr, 'TR 2', '2');

    let homeGoals = {
        name: 'Home Team Goal Difference',
        bettypes: []
    }

    verifyAndAdd(bettypesByName['H +0.5'], homeGoals, 'H +0.5', '+0.5');
    verifyAndAdd(bettypesByName['H +1.5'], homeGoals, 'H +1.5', '+1.5');
    verifyAndAdd(bettypesByName['H +2.5'], homeGoals, 'H +2.5', '+2.5');

    let awayGoals = {
        name: 'Away Team Goals Difference',
        bettypes: []
    }

    verifyAndAdd(bettypesByName['A +0.5'], awayGoals, 'A +0.5', '+0.5');
    verifyAndAdd(bettypesByName['A +1.5'], awayGoals, 'A +1.5', '+1.5');
    verifyAndAdd(bettypesByName['A +2.5'], awayGoals, 'A +2.5', '+2.5');

    let all = [];
    if (tr.bettypes.length > 0) all.push(tr);
    if (homeGoals.bettypes.length > 0) all.push(homeGoals);
    if (awayGoals.bettypes.length > 0) all.push(awayGoals);

    console.log(all)

    return all;
}

BetTypeStruct.organizeByBasketball = (data) => {

    let bettypesByName = [];
    data.forEach(b => {
        bettypesByName[b.bettypeName] = { ...b };
    })

    let tr = {
        name: 'Regular Time',
        bettypes: []
    }

    verifyAndAdd(bettypesByName['TR 1'], tr, 'TR 1', '1');
    verifyAndAdd(bettypesByName['TR X'], tr, 'TR X', 'X');
    verifyAndAdd(bettypesByName['TR 2'], tr, 'TR 2', '2');

    let triples = {
        name: 'Most Triples',
        bettypes: []
    }

    verifyAndAdd(bettypesByName['TRIPLE 1'], tr, 'TRIPLE 1', '1');
    verifyAndAdd(bettypesByName['TRIPLE X'], tr, 'TRIPLE X', 'X');
    verifyAndAdd(bettypesByName['TRIPLE 2'], tr, 'TRIPLE 2', '2');

    let all = [];

    if (tr.bettypes.length > 0) all.push(tr);
    if (triples.bettypes.length > 0) all.push(triples);

    return all;
}

BetTypeStruct.organize = (data) => {

    console.log("PRINTING DATA")
    console.log(data);

    switch (data.event.sport.name.toUpperCase()) {
        case 'FOOTBALL':
            return BetTypeStruct.organizeByFootball(data.bettypes);

        case 'BASKETBALL':
            return BetTypeStruct.organizeByBasketball(data.bettypes);

        default:

            return data;
    }

}

BetTypeStruct.organizeEventsByTR = (data) => {


    // Percorrer a lista de eventos
    data = data.map(event => {
        let available = event.availablebettypes;

        available = available.filter(av => ['TR 1', 'TR 2', 'TR X'].includes(av.bettypeName)).map(av => {
            return {
                odd: av.odd,
                bettypeOid: av.bettypeOid,
                bettypeName: av.bettypeName.replace('TR ', '')
            }
        })

        delete event.availablebettypes;

        return {
            ...event,
            available
        };

    })

    return data;
}

BetTypeStruct.organize = (data) => {

    console.log("PRINTING DATA")
    console.log(data);

    switch (data.event.sport.name.toUpperCase()) {
        case 'FOOTBALL':
            return BetTypeStruct.organizeByFootball(data.bettypes);

        case 'BASKETBALL':
            return BetTypeStruct.organizeByBasketball(data.bettypes);
        default:

            return data;
    }

}

BetTypeStruct.organizeEventsSummary = (data) => {


    if (!data)
        return

    let final = data.map(d => {
        let av = JSON.parse(d.availablebettypes);

        // console.log("Available", av)
        let unified = [];
        av.forEach(a => {
            unified.push({
                odd: a.odd,
                bettypeOid: a.bettypeOid,
                bettypeName: a.bettypeName,
                availableOid: a.oid
            })
        })

        return {
            ...d,
            availablebettypes: unified
        }
    })

    console.log("FINALLL", final)
    // TODO : alterar dos Ids para os nomes

    return BetTypeStruct.organizeEventsByTR(final);

    // switch (data.event.sport.name.toUpperCase()) {
    //     case '1':
    //         return BetTypeStruct.organizeEventsByTR(data.bettypes);

    //     case '2':

    //     default:

    //         return data;
    // }

}


export default BetTypeStruct;