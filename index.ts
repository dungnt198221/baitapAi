
// Infinity = 10000;

class priorityQueue {
    values;
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

class weightedGraph {
    adjacenyList;
    constructor() {
        this.adjacenyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacenyList[vertex]) {
            this.adjacenyList[vertex] = [];
        }
    }
    add(data) {
        this.addVertex(data);
    }
    addEdge(vertex1, vertex2, weight) {
        this.adjacenyList[vertex1].push({ node: vertex2, weight });
        this.adjacenyList[vertex2].push({ node: vertex1, weight });
    }

    removeEdge(vertex1, vertex2) {
        this.adjacenyList[vertex1] = this.adjacenyList[vertex1].filter(
            v => v !== vertex2
        );
        this.adjacenyList[vertex2] = this.adjacenyList[vertex2].filter(
            v => v !== vertex1
        );
    }

    removeVertex(vertex) {
        const edges = this.adjacenyList[vertex];
        edges.forEach(e => this.removeEdge(e, vertex));
        delete this.adjacenyList[vertex];
    }

    dijkstra(start, end) {
        const nodes = new priorityQueue();
        const distances = {};
        const previous = {};
        let smallest;
        let path = [];

        // build up initial state
        for (let vertex in this.adjacenyList) {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity; // Should be Infinity, but stackblitz seems to have issues with that
                nodes.enqueue(vertex, Infinity); // Should be Infinity, but stackblitz seems to have issues with that
            }
            previous[vertex] = null;
        }

        // as long as there is something to visit
        while (nodes.values.length) {
            smallest = nodes.dequeue().val;
            if (smallest === end) {
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }

            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjacenyList[smallest]) {
                    let nextNode = this.adjacenyList[smallest][neighbor];
                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;
                    if (candidate < distances[nextNeighbor]) {
                        // update new smallest distnace to neighbor
                        distances[nextNeighbor] = candidate;
                        // update previous = how we got to neighbor
                        previous[nextNeighbor] = smallest;
                        // enque in priority queue with new PriorityQueue
                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }

        return path.concat(smallest).reverse();
    }
}

console.clear();

const data = [
    { lat:  21.00171892770119,  lng:  105.84154390295836, name: "1" },
{ lat:  21.001834048330952, lng:  105.84259854810267, name: "2" },
{ lat:  21.001800723947245, lng:  105.84307232715211, name: "3" },
{ lat:  21.001132788696356, lng:  105.84175590185568, name: "4" },
{ lat:  21.001219403619682, lng:  105.84144072996152, name: "5" },
{ lat:  21.00143267903974, lng:  105.84271532931562, name: "6" },
{ lat:  21.001301655133076, lng:  105.84285727105545, name: "7" },
{ lat:  21.001073851930602, lng:  105.84278231305802, name: "8" },
{ lat:  21.001016974015, lng:  105.84290415887223, name: "9" },
{ lat:  21.000838818762137, lng:  105.84364456354245, name: "10" },
{ lat:  21.000774965633752, lng:  105.84384304700794, name: "11" },
{ lat:  21.0005976828263, lng:  105.84358042917091, name: "12" },
{ lat:  21.001113878589013, lng:  105.84234874400946, name: "13" },
{ lat:  21.00122067748773, lng:  105.84221146640748, name: "14" },
{ lat:  21.000394764005023, lng:  105.84142212019434, name: "15" },
{ lat:  21.000353824209668, lng:  105.84187208566752, name: "16" },
{ lat:  21.000401883968276, lng:  105.84205321583681, name: "17" },
{ lat:  21.000412347491036, lng:  105.84256901856133, name: "18" },
{ lat:  21.000645742505043, lng:  105.84244026240908, name: "19" },
{ lat:  21.000365778368696, lng:  105.84335580010895, name: "20" },
{ lat:  20.999654539190768, lng:  105.84192734947844, name: "21" },
{ lat:  20.99965030561414, lng:  105.84336260225815, name: "22" },
{ lat:  21.000128699014866, lng:  105.84339888036949, name: "23" },
{ lat:  21.000058845206812, lng:  105.84396799324108, name: "24" },
{ lat:  21.00010964797955, lng:  105.8441969988189, name: "25" },
{ lat:  21.001806092316166, lng:  105.843389176542, name: "26" },
{ lat:  21.001492816558653, lng:  105.8435455204776, name: "27" },
{ lat:  21.00184169179247, lng:  105.8438086358814, name: "28" },
{ lat:  21.001827452002964, lng:  105.84414420335294, name: "29" },
{ lat:  21.00150349642485, lng:  105.84414039008621, name: "30" },
{ lat:  21.001022901689428, lng:  105.84364466541237, name: "31" },
{ lat:  21.00091610264918, lng:  105.84400311248422, name: "32" },
{ lat:  21.001478576735867, lng:  105.8444378248905, name: "33" },
{ lat:  21.001809652264193, lng:  105.84498312203173, name: "34" },
{ lat:  21.000563665274157, lng:  105.84443401162379, name: "35" },
{ lat:  21.000517385557043, lng:  105.84525386396898, name: "36" },
{ lat:  21.000229026996337, lng:  105.84530724970308, name: "37" },
{ lat:  21.00006170755149, lng:  105.84145585031449, name: "38" },
{ lat:  20.99976266812045, lng:  105.84144822378104, name: "39" },
{ lat:  20.99978402809968, lng:  105.84160075444991, name: "40" },
{ lat:  20.999532666463185, lng:  105.84172145505137, name: "41" },
{ lat:  20.99861961774616, lng:  105.84142805459881, name: "42" },
{ lat:  20.998365160554695, lng:  105.84140881522491, name: "43" },
{ lat:  20.997922543438015, lng:  105.84136334767882, name: "44" },
{ lat:  20.997691,lng: 105.842454, name: "45" },
{ lat:  20.99752203831302, lng:  105.84307931770816, name: "46" },
{ lat:  20.997473977627166, lng:  105.84336721934567, name: "47" },
{ lat:  20.997213572474678, lng:  105.84437034603462, name: "48" },
{ lat:  20.997196043741926, lng:  105.84459028717205, name: "49" },
{ lat:  20.997461433997554, lng:  105.84447228265415, name: "50" },
{ lat:  20.99929281602394, lng:  105.84235449237428, name: "51" },
{ lat:  20.99910223302575, lng:  105.84232578505612, name: "52" },
{ lat:  20.998986096391906, lng:  105.84230983654604, name: "53" },
{ lat:  20.99900396357223, lng:  105.84214397204107, name: "54" },
{ lat:  20.99873775530554, lng:  105.84205986151942, name: "55" },
{ lat:  20.998809348103162, lng:  105.84240269142838, name: "56" },
{ lat:  20.99868090217708, lng:  105.8425718509229, name: "57" },
{ lat:  20.998038670874713, lng:  105.8429665564122, name: "58" },
{ lat:  20.997895484505893, lng:  105.84277935323823, name: "59" },
{ lat:  20.997569405707047, lng:  105.84335349960155, name: "60" },
{ lat:  20.997687032379872, lng:  105.84367406465906, name: "61" },
{ lat:  20.997749568045855, lng:  105.84346673402786, name: "62" },
{ lat:  20.997943130655457, lng:  105.84331043862895, name: "63" },
{ lat:  20.998054801286447, lng:  105.84372509989458, name: "64" },
{ lat:  20.997865705649218, lng:  105.84415411481814, name: "65" },
{ lat:  20.99812478149907, lng:  105.84457515548458, name: "66" },
{ lat:  20.99828856485032, lng:  105.84359751181591, name: "67" },
{ lat:  20.998199228499185, lng:  105.84427691834584, name: "68" },
{ lat:  20.99812329255868, lng:  105.8445815348886, name: "69" },
{ lat:  20.99836301176875, lng:  105.84432954842916, name: "70" },
{ lat:  20.998224540470773, lng:  105.84473304573449, name: "71" },
{ lat:  20.998589252031387, lng:  105.8437499694881, name: "72" },
{ lat:  20.998333835504567, lng:  105.84388407993775, name: "73" },
{ lat:  20.998606780605524, lng:  105.84437760639443, name: "74" },
{ lat:  20.9985266499869, lng:  105.84343883324689, name: "75" },
{ lat:  20.998967367857016, lng:  105.84379556704296, name: "76" },
{ lat:  20.998780985781718, lng:  105.84429388606019, name: "77" },
{ lat:  20.998904931279423, lng:  105.84403594734938, name: "78" },
{ lat:  20.99858798472945, lng:  105.84501649377704, name: "79" },
{ lat:  20.99849591074548, lng:  105.84546030008826, name: "80" },
{ lat:  20.998442791113515, lng:  105.84497856161369, name: "81" },
{ lat:  20.998407378015035, lng:  105.84511132418541, name: "82" },
{ lat:  20.998356029007326, lng:  105.84540719505955, name: "83" },
{ lat:  20.998140008850346, lng:  105.84492166336868, name: "84" },
{ lat:  20.998235624368224, lng:  105.84507718523841, name: "85" },
{ lat:  20.998194899247714, lng:  105.84536926289621, name: "86" },
{ lat:  20.998010750738075, lng:  105.84535977985537, name: "87" },
{ lat:  20.997831913982047, lng:  105.84484010921804, name: "88" },
{ lat:  20.997748692846717, lng:  105.84528581213739, name: "89" },
{ lat:  20.997622975724525, lng:  105.8455494406727, name: "90" },
{ lat:  20.997584021094287, lng:  105.84494442266768, name: "91" },
{ lat:  20.997367928394077, lng:  105.84487947728267, name: "92" },
{ lat:  20.997217682201978, lng:  105.8454078724543, name: "93" },
{ lat:  20.997440547332708, lng:  105.8454910209331, name: "94" },
{ lat:  20.99726275607547, lng:  105.8458745768191, name: "95" },
{ lat:  20.99688964415707, lng:  105.84577265287736, name: "96" },
{ lat:  20.997660908035282, lng:  105.84591212774681, name: "97" },
{ lat:  20.99764087525772, lng:  105.84593626762774, name: "98" },
{ lat:  20.99764087525772, lng:  105.84590944553781, name: "99" },
{ lat:  20.998281922813874, lng:  105.84586921240309, name: "100" },
{ lat:  20.998369565825087, lng:  105.84585311915046, name: "101" },
{ lat:  20.998574900665265, lng:  105.84582361485153, name: "102" },
{ lat:  20.998963032844674, lng:  105.84578338171758, name: "103" },
{ lat:  20.99920843201094, lng:  105.84565195347692, name: "104" },
{ lat:  20.9991633587309, lng:  105.84514501597758, name: "105" },
{ lat:  21.001791927971777, lng:  105.84548748262496, name: "106" },
{ lat:  21.001441363678694, lng:  105.84582544095808, name: "107" },
{ lat:  21.000800642433344, lng:  105.84571516810878, name: "108" },
{ lat:  21.000784465746662, lng:  105.84601784977085, name: "109" },
{ lat:  21.000587928989958, lng:  105.84578181182148, name: "110" },
{ lat:  21.000501571848364, lng:  105.84683122378554, name: "111" },
{ lat:  21.000854986031552, lng:  105.84722536910797, name: "112" },
{ lat:  21.00104557938072, lng:  105.84748413992256, name: "113" },
{ lat:  21.00115928381459, lng:  105.84763976665754, name: "114" },
{ lat:  21.000986621495112, lng:  105.84706687983764, name: "115" },
{ lat:  21.001074243203533, lng:  105.847162734998, name: "116" },
{ lat:  21.000690017409873, lng:  105.84665634061724, name: "117" },
{ lat:  21.000816216014176, lng:  105.84655224497557, name: "118" },
{ lat:  21.001127398616788, lng:  105.84694457832383, name: "119" },
{ lat:  21.00144155838522, lng:  105.84734010137412, name: "120" },
{ lat:  21.000933840136412, lng:  105.84637362166251, name: "121" },
{ lat:  21.001292667582142, lng:  105.84678509322289, name: "122" },
{ lat:  21.001611293719556, lng:  105.84718221112419, name: "123" },
{ lat:  21.001101038664572, lng:  105.84622791862975, name: "124" },
{ lat:  21.00144099792801, lng:  105.84663948260211, name: "125" },
{ lat:  21.00178449764729, lng:  105.8470434601418, name: "126" },
{ lat:  21.001761479649577, lng:  105.84629429991561, name: "127" },
{ lat:  21.001457798230756, lng:  105.8461867395096, name: "128" },
{ lat:  21.001625568371974, lng:  105.84646434814114, name: "129" },
{ lat:  21.001975448364387, lng:  105.84689350158003, name: "130" },
{ lat:  21.002083888038168, lng:  105.84675817398467, name: "131" },
{ lat:  21.003185941129377, lng:  105.848033565876, name: "132" },
{ lat:  21.002958140803027, lng:  105.84832223390865, name: "133" },
{ lat:  21.002742251283927, lng:  105.84851521088078, name: "134" },
{ lat:  21.003127874412534, lng:  105.84869542904481, name: "135" },
{ lat:  21.002815207087394, lng:  105.84904629626685, name: "136" },
{ lat:  21.002256553067934, lng:  105.84892549173394, name: "137" },
{ lat:  21.002338672279222, lng:  105.8495186776948, name: "138" },
{ lat:  21.00329117516133, lng:  105.84983813169626, name: "139" },
{ lat:  21.003086264666493, lng:  105.85086405388329, name: "140" },
{ lat:  21.002734627436443, lng:  105.8508505211237, name: "141" },
{ lat:  21.00281674638468, lng:  105.85004306646977, name: "142" },
{ lat:  21.00268619829195, lng:  105.84996638083224, name: "143" },
{ lat:  21.000653802676435, lng:  105.8505426933604, name: "144" },
{ lat:  21.000805671944118, lng:  105.84986647653247, name: "145" },
{ lat:  21.001240434091336, lng:  105.85020777464845, name: "146" },
{ lat:  21.001049583321773, lng:  105.8495411269266, name: "147" },
{ lat:  21.000663960636093, lng:  105.84910124465175, name: "148" },
{ lat:  21.001397644500777, lng:  105.84986030979675, name: "149" },
{ lat:  21.00126493062179, lng:  105.84937214776004, name: "150" },
{ lat:  21.00171064846496, lng:  105.8494231097309, name: "151" },
{ lat:  21.000293361264784, lng:  105.84823220893416, name: "152" },
{ lat:  21.0006539444419, lng:  105.84866136237305, name: "153" },
{ lat:  21.00077664268548, lng:  105.84858357831226, name: "154" },
{ lat:  21.00047527286489, lng:  105.84807924085767, name: "155" },
{ lat:  21.000698610236938, lng:  105.8478750999285, name: "156" },
{ lat:  21.00102319328851, lng:  105.84833122731712, name: "157" },
{ lat:  21.00147879950038, lng:  105.84805691294355, name: "158" },
{ lat:  21.001856981378065, lng:  105.84846838450393, name: "159" },
{ lat:  21.001684335247305, lng:  105.84864396285882, name: "160" },
{ lat:  21.002040356136813, lng:  105.84919305998169, name: "161" },
{ lat:  21.002047438584796, lng:  105.85001998114272, name: "162" },
{ lat:  21.00011907874747, lng:  105.84784988049483, name: "163" },
{ lat:  20.999045144985974, lng:  105.84596360399209, name: "164" },
{ lat:  20.99989505339937, lng:  105.8470788095946, name: "165" },
{ lat:  20.999512595212217, lng:  105.84755296163648, name: "166" },
{ lat:  20.998513949770157, lng:  105.84625947486623, name: "167" },
{ lat:  20.998287305902732, lng:  105.84629361381324, name: "168" },
{ lat:  20.998103157507067, lng:  105.84652500000968, name: "169" },
{ lat:  20.99803233114057, lng:  105.84664638293239, name: "170" },
{ lat:  20.998641271162793, lng:  105.84735528304014, name: "171" },
{ lat:  20.99904304702459, lng:  105.84781262380588, name: "172" },
{ lat:  21.00005916508394, lng:  105.84893443192385, name: "173" },
{ lat:  20.99845112165749, lng:  105.84754372184382, name: "174" },
{ lat:  20.998844200539242, lng:  105.84806364327282, name: "175" },
{ lat:  20.999091363245434, lng:  105.84837304436861, name: "176" },
{ lat:  20.998665798711077, lng:  105.84816854780624, name: "177" },
{ lat:  20.998626770647235, lng:  105.8482982142265, name: "178" },
{ lat:  20.998513448842196, lng:  105.84864719012934, name: "179" },
{ lat:  20.99830097022032, lng:  105.8477197487342, name: "180" },
{ lat:  20.99840012694557, lng:  105.84805165516354, name: "181" },
{ lat:  20.998474494446285, lng:  105.84816355504542, name: "182" },
{ lat:  20.99833148574268, lng:  105.84835836653552, name: "183" },
{ lat:  20.997843544384324, lng:  105.84839251459937, name: "184" },
{ lat:  20.997970099892257, lng:  105.84769546483314, name: "185" },
{ lat:  20.996540535841675, lng:  105.84731050620037, name: "186" },
{ lat:  20.996583032090285, lng:  105.84702222175892, name: "187" },
{ lat:  20.99704694868406, lng:  105.84714360468162, name: "188" },
{ lat:  20.99632097169782, lng:  105.84857364723996, name: "189" },
{ lat:  20.996816761241398, lng:  105.84869503016267, name: "190" },
{ lat:  20.996147444968578, lng:  105.84990885938991, name: "191" },
{ lat:  20.99780004650239, lng:  105.85016559107207, name: "192" },
{ lat:  20.998210994373846, lng:  105.84910342029993, name: "193" },
{ lat:  20.996942412517864, lng:  105.84883229562836, name: "194" },
{ lat:  20.99753501430405, lng:  105.84922462897661, name: "195" },
{ lat:  20.997889383092406, lng:  105.84890246907277, name: "196" },
{ lat:  20.997978719628982, lng:  105.84859625767899, name: "197" },
{ lat:  20.99780302438958, lng:  105.84872065605771, name: "198" },
{ lat:  20.999003108111424, lng:  105.84955954769404, name: "199" },
{ lat:  20.998246728935847, lng:  105.84889608967418, name: "200" },
{ lat:  20.9983033086131, lng:  105.84857711947235, name: "201" },
{ lat:  20.998199082875214, lng:  105.84857074006833, name: "202" },
{ lat:  20.99874998952787, lng:  105.84905238507189, name: "203" },
{ lat:  20.998866126345423, lng:  105.84915445553646, name: "204" },
{ lat:  20.99879763541267, lng:  105.84884505444069, name: "205" },
{ lat:  20.998978882474663, lng:  105.84889238252187, name: "206" },
{ lat:  20.999427487664097, lng:  105.85036950967053, name: "207" },
{ lat:  20.999672886066787, lng:  105.85036414525254, name: "208" },
{ lat:  20.999527650326165, lng:  105.84984647891689, name: "209" },
{ lat:  20.999722967323887, lng:  105.8500342335464, name: "210" },
{ lat:  20.999737991697735, lng:  105.84982502124495, name: "211" },
{ lat:  20.999963357124066, lng:  105.85007446668129, name: "212" },
{ lat:  20.9999784335964, lng:  105.84988023662645, name: "213" },
{ lat:  21.00004449983048, lng:  105.84949888315222, name: "214" },
{ lat:  20.997896207757606, lng:  105.84988026933542, name: "215" },
    
];


let g = new weightedGraph();

console.log("adding vertices -------------------------------");
data.forEach(e => {
    g.add(e.name)
});

console.log("adding edges -------------------------------");
g.addEdge("1", "2", 1);
g.addEdge("1", "5", 1);
g.addEdge("2", "4", 1);
g.addEdge("2", "3", 1);
g.addEdge("3", "6", 1);
g.addEdge("3", "26", 1);
g.addEdge("4", "5", 1);
g.addEdge("5", "15", 1);
g.addEdge("6", "7", 1);
g.addEdge("6", "13", 1);
g.addEdge("7", "8", 1);
g.addEdge("8", "9", 1);
g.addEdge("9", "10", 1);
g.addEdge("10", "11", 1);
g.addEdge("10", "12", 1);
g.addEdge("13", "14", 1);
g.addEdge("13", "15", 1);
g.addEdge("15", "16", 1);
g.addEdge("15", "38", 1);
g.addEdge("16", "17", 1);
g.addEdge("16", "21", 1);
g.addEdge("17", "18", 1);
g.addEdge("17", "19", 1);
g.addEdge("18", "19", 1);
g.addEdge("18", "20", 1);
g.addEdge("20", "23", 1);
g.addEdge("21", "22", 1);
g.addEdge("21", "41", 1);
g.addEdge("22", "23", 1);
g.addEdge("22", "24", 1);
g.addEdge("23", "24", 1);
g.addEdge("24", "25", 1);
g.addEdge("25", "105", 1);
g.addEdge("26", "27", 1);
g.addEdge("26", "28", 1);
g.addEdge("28", "29", 1);
g.addEdge("29", "30", 1);
g.addEdge("29", "34", 1);
g.addEdge("30", "31", 1);
g.addEdge("30", "33", 1);
g.addEdge("31", "32", 1);
g.addEdge("34", "36", 1);
g.addEdge("34", "106", 1);
g.addEdge("35", "36", 1);
g.addEdge("36", "37", 1);
g.addEdge("37", "104", 1);
g.addEdge("37", "163", 1);
g.addEdge("38", "39", 1);
g.addEdge("38", "40", 1);
g.addEdge("39", "40", 1);
g.addEdge("39", "42", 1);
g.addEdge("40", "41", 1);
g.addEdge("41", "51", 1);
g.addEdge("41", "55", 1);
g.addEdge("42", "43", 1);
g.addEdge("43", "44", 1);
g.addEdge("44", "45", 1);
g.addEdge("45", "46", 1);
g.addEdge("45", "55", 1);
g.addEdge("46", "47", 1);
g.addEdge("46", "58", 1);
g.addEdge("46", "60", 1);
g.addEdge("47", "48", 1);
g.addEdge("47", "60", 1);
g.addEdge("48", "49", 1);
g.addEdge("48", "50", 1);
g.addEdge("49", "92", 1);
g.addEdge("49", "96", 1);
g.addEdge("50", "61", 1);
g.addEdge("51", "52", 1);
g.addEdge("51", "75", 1);
g.addEdge("52", "53", 1);
g.addEdge("53", "54", 1);
g.addEdge("53", "56", 1);
g.addEdge("55", "56", 1);
g.addEdge("56", "57", 1);
g.addEdge("57", "58", 1);
g.addEdge("58", "59", 1);
g.addEdge("58", "60", 1);
g.addEdge("60", "61", 1);
g.addEdge("60", "62", 1);
g.addEdge("61", "65", 1);
g.addEdge("62", "63", 1);
g.addEdge("62", "64", 1);
g.addEdge("64", "67", 1);
g.addEdge("64", "68", 1);
g.addEdge("65", "66", 1);
g.addEdge("65", "68", 1);
g.addEdge("67", "73", 1);
g.addEdge("68", "69", 1);
g.addEdge("68", "70", 1);
g.addEdge("70", "71", 1);
g.addEdge("70", "74", 1);
g.addEdge("72", "73", 1);
g.addEdge("72", "75", 1);
g.addEdge("72", "77", 1);
g.addEdge("73", "74", 1);
g.addEdge("74", "77", 1);
g.addEdge("74", "79", 1);
g.addEdge("75", "76", 1);
g.addEdge("77", "78", 1);
g.addEdge("79", "80", 1);
g.addEdge("79", "81", 1);
g.addEdge("80", "83", 1);
g.addEdge("80", "102", 1);
g.addEdge("81", "82", 1);
g.addEdge("81", "84", 1);
g.addEdge("82", "83", 1);
g.addEdge("82", "85", 1);
g.addEdge("83", "86", 1);
g.addEdge("83", "100", 1);
g.addEdge("84", "85", 1);
g.addEdge("84", "87", 1);
g.addEdge("84", "88", 1);
g.addEdge("85", "86", 1);
g.addEdge("86", "87", 1);
g.addEdge("86", "99", 1);
g.addEdge("87", "89", 1);
g.addEdge("87", "98", 1);
g.addEdge("88", "89", 1);
g.addEdge("89", "90", 1);
g.addEdge("90", "94", 1);
g.addEdge("90", "97", 1);
g.addEdge("91", "92", 1);
g.addEdge("91", "94", 1);
g.addEdge("92", "93", 1);
g.addEdge("93", "94", 1);
g.addEdge("94", "95", 1);
g.addEdge("95", "96", 1);
g.addEdge("95", "97", 1);
g.addEdge("96", "170", 1);
g.addEdge("97", "98", 1);
g.addEdge("97", "169", 1);
g.addEdge("98", "99", 1);
g.addEdge("98", "168", 1);
g.addEdge("99", "100", 1);
g.addEdge("100", "101", 1);
g.addEdge("101", "102", 1);
g.addEdge("101", "168", 1);
g.addEdge("102", "103", 1);
g.addEdge("103", "104", 1);
g.addEdge("103", "164", 1);
g.addEdge("104", "105", 1);
g.addEdge("106", "107", 1);
g.addEdge("107", "108", 1);
g.addEdge("107", "127", 1);
g.addEdge("108", "109", 1);
g.addEdge("108", "110", 1);
g.addEdge("110", "111", 1);
g.addEdge("111", "112", 1);
g.addEdge("112", "113", 1);
g.addEdge("112", "115", 1);
g.addEdge("113", "114", 1);
g.addEdge("113", "156", 1);
g.addEdge("114", "120", 1);
g.addEdge("114", "158", 1);
g.addEdge("115", "116", 1);
g.addEdge("115", "117", 1);
g.addEdge("115", "119", 1);
g.addEdge("118", "119", 1);
g.addEdge("119", "120", 1);
g.addEdge("119", "122", 1);
g.addEdge("120", "123", 1);
g.addEdge("121", "122", 1);
g.addEdge("122", "123", 1);
g.addEdge("122", "125", 1);
g.addEdge("123", "126", 1);
g.addEdge("124", "125", 1);
g.addEdge("125", "126", 1);
g.addEdge("125", "129", 1);
g.addEdge("126", "130", 1);
g.addEdge("127", "129", 1);
g.addEdge("127", "131", 1);
g.addEdge("128", "129", 1);
g.addEdge("129", "130", 1);
g.addEdge("130", "131", 1);
g.addEdge("131", "132", 1);
g.addEdge("132", "133", 1);
g.addEdge("132", "139", 1);
g.addEdge("133", "134", 1);
g.addEdge("133", "135", 1);
g.addEdge("134", "136", 1);
g.addEdge("134", "137", 1);
g.addEdge("137", "138", 1);
g.addEdge("137", "159", 1);
g.addEdge("138", "139", 1);
g.addEdge("139", "140", 1);
g.addEdge("140", "141", 1);
g.addEdge("141", "142", 1);
g.addEdge("142", "143", 1);
g.addEdge("144", "145", 1);
g.addEdge("145", "146", 1);
g.addEdge("145", "147", 1);
g.addEdge("147", "148", 1);
g.addEdge("147", "149", 1);
g.addEdge("147", "150", 1);
g.addEdge("150", "151", 1);
g.addEdge("150", "153", 1);
g.addEdge("151", "161", 1);
g.addEdge("152", "153", 1);
g.addEdge("152", "155", 1);
g.addEdge("153", "154", 1);
g.addEdge("154", "155", 1);
g.addEdge("154", "157", 1);
g.addEdge("155", "156", 1);
g.addEdge("156", "157", 1);
g.addEdge("157", "158", 1);
g.addEdge("158", "159", 1);
g.addEdge("159", "160", 1);
g.addEdge("161", "162", 1);
g.addEdge("164", "165", 1);
g.addEdge("164", "167", 1);
g.addEdge("165", "166", 1);
g.addEdge("166", "167", 1);
g.addEdge("168", "169", 1);
g.addEdge("169", "170", 1);
g.addEdge("170", "171", 1);
g.addEdge("171", "172", 1);
g.addEdge("171", "174", 1);
g.addEdge("172", "173", 1);
g.addEdge("174", "175", 1);
g.addEdge("174", "180", 1);
g.addEdge("175", "176", 1);
g.addEdge("175", "177", 1);
g.addEdge("177", "178", 1);
g.addEdge("177", "180", 1);
g.addEdge("178", "179", 1);
g.addEdge("178", "182", 1);
g.addEdge("181", "182", 1);
g.addEdge("182", "183", 1);
g.addEdge("183", "184", 1);
g.addEdge("184", "185", 1);
g.addEdge("184", "198", 1);
g.addEdge("185", "186", 1);
g.addEdge("186", "187", 1);
g.addEdge("186", "189", 1);
g.addEdge("187", "188", 1);
g.addEdge("189", "190", 1);
g.addEdge("189", "191", 1);
g.addEdge("191", "192", 1);
g.addEdge("192", "207", 1);
g.addEdge("192", "215", 1);
g.addEdge("193", "196", 1);
g.addEdge("193", "199", 1);
g.addEdge("193", "200", 1);
g.addEdge("193", "210", 1);
g.addEdge("194", "196", 1);
g.addEdge("195", "196", 1);
g.addEdge("196", "197", 1);
g.addEdge("197", "198", 1);
g.addEdge("200", "201", 1);
g.addEdge("200", "202", 1);
g.addEdge("200", "203", 1);
g.addEdge("203", "204", 1);
g.addEdge("203", "205", 1);
g.addEdge("204", "206", 1);
g.addEdge("207", "208", 1);
g.addEdge("207", "209", 1);
g.addEdge("208", "210", 1);
g.addEdge("210", "211", 1);
g.addEdge("210", "212", 1);
g.addEdge("211", "213", 1);
g.addEdge("213", "214", 1);

// console.log())
// const a = g.dijkstra("A", "E")
// console.log(a)



const PATH_MAIN_MAP = {
    zoom: 15,
    center: {lat: 20.999850, lng: 105.846637 },
}


//loadamap
var map
const submit = document.getElementById('submit');
submit?.addEventListener('click', () => {
    const a = document.getElementById('start') as HTMLInputElement;
    const b = document.getElementById('mid') as HTMLInputElement;
    const c = document.getElementById('end') as HTMLInputElement;
    const x = a?.value.toLocaleUpperCase();
    const y = b?.value.toLocaleUpperCase();
    const z = c?.value.toLocaleUpperCase();
    const newData1 = [];
    const newData2 = [];
    const newData = [];
//   console.log(g.dijkstra(x,y))
    data.forEach(d => {
        g.dijkstra(x, y).find(d2 => {
            if (d2 === d.name) newData1.push(d);
        })
    })
    data.forEach(d => {
        g.dijkstra(y, z).find(d2 => {
            if (d2 === d.name) newData2.push(d);
        })
    })
    console.log(newData1.map(e=>e))
    console.log(newData2.map(e=>e))
    // console.log(JSON.stringify(newData))
    console.log(newData1.some(e=>e.name===z))
 
   
        const p=newData.concat(newData1,newData2)
          const flightPath = new google.maps.Polyline({
            path: p,
            geodesic: true,
            strokeColor: "black",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });
        
          flightPath.setMap(map);
    
    
    console.log(newData1.concat(newData2).map(e=>e))
    // console.log(JSON.stringify(newData))
    

})

function addMaker(data){
    data.forEach(e=>{

        new google.maps.Marker({
            position: e,
            map,
            title: e.name,
          });
    })
}
function initMap(): void {
     map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        PATH_MAIN_MAP
    );
    addMaker(data)
    const triangleCoords = [
        { lat: 21.001859, lng: 105.841424},

    { lat: 21.001837, lng: 105.846260 },

    { lat: 21.003319, lng: 105.848057 },

    { lat: 21.003186, lng: 105.850918 },

    { lat: 20.995811, lng: 105.849892 },

    {lat: 20.997501,lng: 105.841294}
    ];

    // Construct the polygon.
    const bermudaTriangle = new google.maps.Polygon({
        paths: triangleCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "white",
        fillOpacity: 0.35,
    });

    bermudaTriangle.setMap(map);


}
declare global {
    interface Window {
        initMap: () => void;
    }
}


window.initMap = initMap;
export { };
