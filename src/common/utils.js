const typesMap = new Map();
typesMap.set("ROAD", "Drumuri");
typesMap.set("LIGHTNING", "Iluminat public");
typesMap.set("GREEN_SPACES", "Spații verzi");
typesMap.set("PUBLIC_DOMAIN", "Domeniu public");
typesMap.set("PUBLIC_DISORDER", "Ordine publică");
typesMap.set("PUBLIC_TRANSPORT", "Transport public");
typesMap.set("BUILDINGS", "Clădiri");
typesMap.set("TRAFFIC_ROAD_SIGNS", "Semne de circulație");
typesMap.set("ANIMALS", "Animale");

const statesMap = new Map();
statesMap.set("REGISTERED", "Înregistrată");
statesMap.set("PLANNED", "Planificată");
statesMap.set("WORKING", "În lucru");
statesMap.set("REDIRECTED", "Redirecționată");
statesMap.set("SOLVED", "Rezolvată");

const sortDataMap = new Map();
sortDataMap.set("reported_date", "Data raportării");
sortDataMap.set("likes_number", "Like-uri");
sortDataMap.set("dislikes_number", "Dislike-uri");

const getBackgroundColorForState = (state) => {
    let backgroundColor;
    // return "#7895B2"
    switch (state) {
        case "REGISTERED":
            backgroundColor = "#7895B2";
            break;
        case "PLANNED":
            backgroundColor = "#628E90";
            break;
        case "WORKING":
            backgroundColor = "#917FB3";
            break;
        case "REDIRECTED":
            backgroundColor = "#D5B4B4";
            break;
        default:
            backgroundColor = "#9E7676";
    }
    return backgroundColor;
}


const getCurrentDate = () => {
    const currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    if (day.toString().length < 2)
        day = "0" + day;
    if (month.toString().length < 2)
        month = "0" + month;
    return `${year}-${month}-${day}`;
}

const getChatMessageFormat = (date) => {
    const parts = date.split("T");
    return parts[1].split(".")[0] + ", " + parts[0];
}

const convertUITypesToAPI = (type) => {
    // return type.split(' ').length < 2 ? type.toUpperCase() : type.replaceAll(' ', '_').toUpperCase();
    for (const [key, value] of typesMap) {
        if (type === value) {
            return key;
        }
    }
    if (type === "Toate categoriile") {
        return null;
    }
}

const replaceAt = (str, index, newCharacter) => {
    const replacer = (originalCharacter, strIndex) => {
        return strIndex === index ? newCharacter : originalCharacter;
    }
    return str.replace(/./g, replacer);
}

const convertAPITypesToUI = (type) => {
    return typesMap.get(type);
}

const convertUIStatesToAPI = (state) => {
    for (const [key, value] of statesMap) {
        if (state === value) {
            return key;
        }
    }
    if (state === "Toate stările") {
        return null;
    }
}

const convertUISortDataToAPI = (data) => {
    for (const [key, value] of sortDataMap) {
        if (data === value) {
            return key;
        }
    }
}

const convertAPIStatesToUI = (state) => {
    let value = statesMap.get(state);
    // const firstLetter = value.charAt(0);
    // value = replaceAt(value, 0, firstLetter.toLowerCase());
    return value;
}

const cutFromDescription = (description) => {
    return description.length > 75 ? description.substring(0, 75) + "..." : description;
}


const cityBoundary2 = [
    [47.0357540, 21.8959981], [47.0701130, 21.9360878], [47.0549163, 21.9285231], [46.8340892, 22.1795680], [46.8349951, 22.1684311],
    [46.8334192, 22.1771494], [47.0581685, 21.9323901]

]
const cityBoundary = [
    [
        47.0175202,
        21.8497744
    ],
    [


        47.0244375,
        21.8540094
    ],
    [


        47.0243733,
        21.8542923
    ],
    [


        47.0245029,
        21.8577427
    ],
    [


        47.0258198,
        21.8531131
    ],
    [


        47.0325807,
        21.8547117
    ],
    [


        47.0391826,
        21.8559232
    ],
    [


        47.0392173,
        21.8563773
    ],
    [


        47.0149629,
        21.8808725
    ],
    [


        47.0143010,
        21.8867620
    ],
    [


        47.0071603,
        21.8945149
    ],
    [


        47.0143357,
        21.8952314
    ],
    [


        47.0142924,
        21.8947762
    ],
    [


        47.0182365,
        21.8965385
    ],
    [


        47.0156260,
        21.8964420
    ],
    [


        47.0070293,
        21.9042922
    ],
    [


        47.0085819,
        21.9054630
    ],
    [


        47.0086264,
        21.9058346
    ],
    [


        47.0082645,
        21.9076698
    ],
    [


        47.0079366,
        21.9125206
    ],
    [


        47.0436115,
        21.8650517
    ],
    [


        47.0385716,
        21.8635340
    ],
    [


        47.0234663,
        21.8954434
    ],
    [


        47.0224932,
        21.8962226
    ],
    [


        47.0215531,
        21.8961549
    ],
    [


        47.0197265,
        21.8969013
    ],
    [


        47.0392117,
        21.9140603
    ],
    [


        47.0438282,
        21.9116231
    ],
    [


        47.0389524,
        21.9130159
    ],
    [


        47.0391649,
        21.9140201
    ],
    [


        47.0446470,
        21.9128676
    ],
    [


        47.0389558,
        21.9130321
    ],
    [


        47.0389723,
        21.9129202
    ],
    [


        47.0777213,
        21.8606721
    ],
    [


        47.0770900,
        21.8622490
    ],
    [


        47.0805857,
        21.8497584
    ],
    [


        47.0805415,
        21.8508622
    ],
    [


        47.0801062,
        21.8523586
    ],
    [


        47.0786771,
        21.8537249
    ],
    [


        47.0785231,
        21.8548263
    ],
    [


        47.0785375,
        21.8561050
    ],
    [


        47.0814873,
        21.8499336
    ],
    [


        47.0789115,
        21.8578267
    ],
    [


        47.0787171,
        21.8591325
    ],
    [


        47.0782980,
        21.8602644
    ],
    [


        47.0902257,
        21.8459380
    ],
    [


        47.0905120,
        21.8460259
    ],
    [


        47.0907598,
        21.8441092
    ],
    [


        47.0915110,
        21.8443173
    ],
    [


        47.0921951,
        21.8442651
    ],
    [


        47.0934981,
        21.8447038
    ],
    [


        47.0936146,
        21.8442182
    ],
    [


        47.0949459,
        21.8444019
    ],
    [


        47.0961269,
        21.8450196
    ],
    [


        47.0962902,
        21.8455791
    ],
    [


        47.0965170,
        21.8456501
    ],
    [


        47.0962913,
        21.8474845
    ],
    [


        47.0887405,
        21.8521620
    ],
    [


        47.0511921,
        21.8687671
    ],
    [


        47.0514659,
        21.8678744
    ],
    [


        47.0541838,
        21.8701818
    ],
    [


        47.0542375,
        21.8700354
    ],
    [


        47.0575269,
        21.8805928
    ],
    [


        47.0569682,
        21.8799020
    ],
    [


        47.0542381,
        21.8864318
    ],
    [


        47.0590692,
        21.8743179
    ],
    [


        47.0588967,
        21.8740304
    ],
    [


        47.0642259,
        21.8785294
    ],
    [


        47.0605242,
        21.8775340
    ],
    [


        47.0584094,
        21.8772013
    ],
    [


        47.0706988,
        21.8783903
    ],
    [


        47.0703721,
        21.8783964
    ],
    [


        47.0684554,
        21.8773776
    ],
    [


        47.0653683,
        21.8784463
    ],
    [


        47.0494023,
        21.9008151
    ],
    [


        47.0488287,
        21.9026538
    ],
    [


        47.0470157,
        21.9135972
    ],
    [


        47.0471175,
        21.9130946
    ],
    [


        47.0471448,
        21.9129280
    ],
    [


        47.0709891,
        21.9027825
    ],
    [


        47.0762256,
        21.8633781
    ],
    [


        47.0760410,
        21.8644888
    ],
    [


        47.0760758,
        21.8655792
    ],
    [


        47.0764938,
        21.8693035
    ],
    [


        47.0765750,
        21.8724863
    ],
    [


        47.0764237,
        21.8735052
    ],
    [


        47.0764625,
        21.8741838
    ],
    [


        47.0760561,
        21.8757862
    ],
    [


        47.0736578,
        21.8758172
    ],
    [


        47.0744853,
        21.8762751
    ],
    [


        47.0740516,
        21.8768824
    ],
    [


        47.0738443,
        21.8769224
    ],
    [


        47.0724287,
        21.8767466
    ],
    [


        47.0713922,
        21.8780042
    ],
    [


        47.0717783,
        21.9008513
    ],
    [


        47.0744965,
        21.9057437
    ],
    [


        47.0823289,
        21.9147130
    ],
    [


        47.0817736,
        21.9132968
    ],
    [


        47.0810430,
        21.9120951
    ],
    [


        47.0903594,
        21.9073514
    ],
    [


        47.0889474,
        21.9065239
    ],
    [


        47.0923186,
        21.9084181
    ],
    [


        47.0951855,
        21.9138118
    ],
    [


        47.0941337,
        21.9093915
    ],
    [


        47.0086496,
        21.9186022
    ],
    [


        47.0102843,
        21.9200231
    ],
    [


        47.0089967,
        21.9201260
    ],
    [


        47.0088314,
        21.9202424
    ],
    [


        47.0114167,
        21.9265678
    ],
    [


        47.0113912,
        21.9263971
    ],
    [


        47.0108633,
        21.9260662
    ],
    [


        47.0107808,
        21.9251923
    ],
    [


        47.0112725,
        21.9237454
    ],
    [


        47.0112585,
        21.9226086
    ],
    [


        47.0122792,
        21.9202486
    ],
    [


        47.0076933,
        21.9323863
    ],
    [


        47.0112733,
        21.9331184
    ],
    [


        47.0111450,
        21.9312109
    ],
    [


        47.0116004,
        21.9366246
    ],
    [


        47.0074118,
        21.9355599
    ],
    [


        47.0101501,
        21.9479859
    ],
    [


        47.0103064,
        21.9495049
    ],
    [


        47.0114442,
        21.9618893
    ],
    [


        47.0149879,
        21.9586736
    ],
    [


        47.0126199,
        21.9610807
    ],
    [


        47.0174083,
        21.9638304
    ],
    [


        47.0199889,
        21.9196482
    ],
    [


        47.0260740,
        21.9210966
    ],
    [


        47.0302864,
        21.9266434
    ],
    [


        47.0308746,
        21.9244987
    ],
    [


        47.0251086,
        21.9360419
    ],
    [


        47.0197703,
        21.9412596
    ],
    [


        47.0197110,
        21.9398368
    ],
    [


        47.0198555,
        21.9398188
    ],
    [


        47.0198451,
        21.9395988
    ],
    [


        47.0201632,
        21.9395492
    ],
    [


        47.0199807,
        21.9356988
    ],
    [


        47.0316612,
        21.9390031
    ],
    [


        47.0420642,
        21.9210952
    ],
    [


        47.0420916,
        21.9166851
    ],
    [


        47.0417319,
        21.9235891
    ],
    [


        47.0420514,
        21.9224471
    ],
    [


        47.0407725,
        21.9267854
    ],
    [


        47.0335918,
        21.9328662
    ],
    [


        47.0386517,
        21.9347974
    ],
    [


        47.0208168,
        21.9456395
    ],
    [


        47.0206945,
        21.9441697
    ],
    [


        47.0208392,
        21.9417833
    ],
    [


        47.0204763,
        21.9417092
    ],
    [


        47.0201705,
        21.9419198
    ],
    [


        47.0269224,
        21.9444962
    ],
    [


        47.0264836,
        21.9468995
    ],
    [


        47.0251768,
        21.9551469
    ],
    [


        47.0235912,
        21.9670708
    ],
    [


        47.0248777,
        21.9663093
    ],
    [


        47.0248059,
        21.9660670
    ],
    [


        47.0228901,
        21.9611445
    ],
    [


        47.0203783,
        21.9627551
    ],
    [


        47.0237372,
        21.9669844
    ],
    [


        47.0258828,
        21.9651521
    ],
    [


        47.0270008,
        21.9643951
    ],
    [


        47.0373648,
        21.9656106
    ],
    [


        47.0379498,
        21.9673701
    ],
    [


        47.0348102,
        21.9671826
    ],
    [


        47.0243242,
        21.9739770
    ],
    [


        47.0207540,
        21.9687069
    ],
    [


        47.0211414,
        21.9685210
    ],
    [


        47.0216588,
        21.9679089
    ],
    [


        47.0216294,
        21.9802425
    ],
    [


        47.0205284,
        21.9782433
    ],
    [


        47.0198001,
        21.9764808
    ],
    [


        47.0208332,
        21.9760255
    ],
    [


        47.0281554,
        21.9709691
    ],
    [


        47.0275319,
        21.9693192
    ],
    [


        47.0269298,
        21.9696117
    ],
    [


        47.0234596,
        21.9872444
    ],
    [


        47.0221344,
        21.9860745
    ],
    [


        47.0234381,
        21.9844864
    ],
    [


        47.0234245,
        21.9839685
    ],
    [


        47.0231537,
        21.9833864
    ],
    [


        47.0229596,
        21.9833977
    ],
    [


        47.0229482,
        21.9829811
    ],
    [


        47.0239647,
        21.9904068
    ],
    [


        47.0247043,
        21.9897312
    ],
    [


        47.0247794,
        21.9893753
    ],
    [


        47.0244049,
        21.9884263
    ],
    [


        47.0229926,
        21.9880413
    ],
    [


        47.0366921,
        21.9688721
    ],
    [


        47.0347617,
        21.9742795
    ],
    [


        47.0447060,
        21.9745737
    ],
    [


        47.0439458,
        21.9743612
    ],
    [


        47.0432405,
        21.9744301
    ],
    [


        47.0426906,
        21.9749230
    ],
    [


        47.0416056,
        21.9755669
    ],
    [


        47.0335333,
        21.9817897
    ],
    [


        47.0330360,
        21.9909306
    ],
    [


        47.0374233,
        21.9897290
    ],
    [


        47.0376166,
        21.9918102
    ],
    [


        47.0336253,
        21.9937976
    ],
    [


        47.0394706,
        21.9815322
    ],
    [


        47.0256427,
        21.9945603
    ],
    [


        47.0260738,
        21.9940761
    ],
    [


        47.0274677,
        21.9963751
    ],
    [


        47.0282279,
        21.9979679
    ],
    [


        47.0299800,
        22.0011243
    ],
    [


        47.0305743,
        22.0037592
    ],
    [


        47.0299720,
        22.0042362
    ],
    [


        47.0305691,
        22.0059983
    ],
    [


        47.0304846,
        22.0062755
    ],
    [


        47.0306497,
        22.0071462
    ],
    [


        47.0308843,
        22.0073720
    ],
    [


        47.0313918,
        22.0074254
    ],
    [


        47.0315307,
        22.0079572
    ],
    [


        47.0319199,
        22.0084152
    ],
    [


        47.0343958,
        21.9992530
    ],
    [


        47.0381746,
        21.9978197
    ],
    [


        47.0380062,
        21.9959859
    ],
    [


        47.0418424,
        22.0062415
    ],
    [


        47.0414357,
        22.0050760
    ],
    [


        47.0415189,
        22.0038274
    ],
    [


        47.0422963,
        22.0023085
    ],
    [


        47.0322067,
        22.0084971
    ],
    [


        47.0325769,
        22.0083618
    ],
    [


        47.0331419,
        22.0087021
    ],
    [


        47.0331861,
        22.0093477
    ],
    [


        47.0334146,
        22.0096590
    ],
    [


        47.0340137,
        22.0098041
    ],
    [


        47.0349366,
        22.0102717
    ],
    [


        47.0360615,
        22.0100065
    ],
    [


        47.0367420,
        22.0104494
    ],
    [


        47.0415885,
        22.0099802
    ],
    [


        47.0418089,
        22.0097367
    ],
    [


        47.0549163,
        21.9285231
    ],
    [


        47.0705539,
        21.9352186
    ],
    [


        47.0706143,
        21.9354112
    ],
    [


        47.0704718,
        21.9355200
    ],
    [


        47.0704752,
        21.9355485
    ],
    [


        47.0702916,
        21.9356841
    ],
    [


        47.0702813,
        21.9356556
    ],
    [


        47.0701285,
        21.9357560
    ],
    [


        47.0701365,
        21.9357795
    ],
    [


        47.0700316,
        21.9358515
    ],
    [


        47.0700236,
        21.9358364
    ],
    [


        47.0698788,
        21.9359302
    ],
    [


        47.0698845,
        21.9359620
    ],
    [


        47.0696930,
        21.9360892
    ],
    [


        47.0696884,
        21.9360691
    ],
    [


        47.0695379,
        21.9361746
    ],
    [


        47.0694768,
        21.9359588
    ],
    [


        47.0696264,
        21.9358616
    ],
    [


        47.0696183,
        21.9358316
    ],
    [


        47.0696673,
        21.9357944
    ],
    [


        47.0696632,
        21.9357644
    ],
    [


        47.0697319,
        21.9357176
    ],
    [


        47.0697393,
        21.9357404
    ],
    [


        47.0698030,
        21.9356972
    ],
    [


        47.0698267,
        21.9357860
    ],
    [


        47.0699355,
        21.9356996
    ],
    [


        47.0699150,
        21.9356203
    ],
    [


        47.0700769,
        21.9354979
    ],
    [


        47.0701047,
        21.9355963
    ],
    [


        47.0702314,
        21.9355039
    ],
    [


        47.0702094,
        21.9354223
    ],
    [


        47.0702625,
        21.9353875
    ],
    [


        47.0702527,
        21.9353479
    ],
    [


        47.0703238,
        21.9352963
    ],
    [


        47.0703369,
        21.9353323
    ],
    [


        47.0703941,
        21.9352926
    ],
    [


        47.0704047,
        21.9353347
    ],
    [


        47.0612037,
        21.9617643
    ],
    [


        47.0636448,
        21.9670429
    ],
    [


        47.0614360,
        21.9619915
    ],
    [


        47.0620240,
        21.9636960
    ],
    [


        47.0693815,
        21.9582291
    ],
    [


        47.0706384,
        21.9553109
    ],
    [


        47.0694399,
        21.9647952
    ],
    [


        47.0837900,
        21.9200774
    ],
    [


        47.0829426,
        21.9181891
    ],
    [


        47.0827672,
        21.9163008
    ],
    [


        47.0829718,
        21.9348832
    ],
    [


        47.0807800,
        21.9396468
    ],
    [


        47.0812768,
        21.9363423
    ],
    [


        47.0898679,
        21.9241544
    ],
    [


        47.0951563,
        21.9180604
    ],
    [


        47.0898971,
        21.9323083
    ],
    [


        47.0859232,
        21.9353123
    ],
    [


        47.0970491,
        21.9412320
    ],
    [


        47.0968720,
        21.9399768
    ],
    [


        47.0725675,
        21.9522210
    ],
    [


        47.0756656,
        21.9494315
    ],
    [


        47.0825334,
        21.9434663
    ],
    [


        47.0792311,
        21.9490453
    ],
    [


        47.0830887,
        21.9502469
    ],
    [


        47.0755406,
        21.9672604
    ],
    [


        47.0763054,
        21.9662291
    ],
    [


        47.0771949,
        21.9653297
    ],
    [


        47.0790622,
        21.9606964
    ],
    [


        47.0792665,
        21.9580474
    ],
    [


        47.0802489,
        21.9593840
    ],
    [


        47.0807098,
        21.9585625
    ],
    [


        47.0780927,
        21.9647771
    ],
    [


        47.0784913,
        21.9633431
    ],
    [


        47.0786072,
        21.9622833
    ],
    [


        47.0792293,
        21.9622914
    ],
    [


        47.0849589,
        21.9469424
    ],
    [


        47.0845432,
        21.9531942
    ],
    [


        47.0848835,
        21.9530218
    ],
    [


        47.0877884,
        21.9534912
    ],
    [


        47.0895407,
        21.9529964
    ],
    [


        47.0899585,
        21.9515317
    ],
    [


        47.0906882,
        21.9520834
    ],
    [


        47.0942567,
        21.9473328
    ],
    [


        47.0934896,
        21.9459504
    ],
    [


        47.0945443,
        21.9447419
    ],
    [


        47.0944430,
        21.9442801
    ],
    [


        47.0944913,
        21.9440219
    ],
    [


        47.0948068,
        21.9437230
    ],
    [


        47.0956638,
        21.9434003
    ],
    [


        47.0964419,
        21.9420505
    ],
    [


        47.0969068,
        21.9417692
    ],
    [


        47.0917575,
        21.9525407
    ],
    [


        47.0924174,
        21.9524219
    ],
    [


        47.0930405,
        21.9520506
    ],
    [


        47.0931132,
        21.9515139
    ],
    [


        47.0927999,
        21.9494407
    ],
    [


        47.0945048,
        21.9484992
    ],
    [


        47.0853865,
        21.9548583
    ],
    [


        47.0479089,
        21.9788887
    ],
    [


        47.0472401,
        21.9781662
    ],
    [


        47.0458910,
        21.9757094
    ],
    [


        47.0453873,
        21.9749895
    ],
    [


        47.0473942,
        21.9783923
    ],
    [


        47.0476411,
        21.9786636
    ],
    [


        47.0470251,
        21.9779683
    ],
    [


        47.0467621,
        21.9774504
    ],
    [


        47.0468113,
        21.9773218
    ],
    [


        47.0562263,
        21.9696875
    ],
    [


        47.0542966,
        21.9800730
    ],
    [


        47.0514019,
        21.9841500
    ],
    [


        47.0481417,
        21.9827873
    ],
    [


        47.0484486,
        21.9885703
    ],
    [


        47.0509341,
        21.9880553
    ],
    [


        47.0675400,
        21.9732495
    ],
    [


        47.0707845,
        21.9704600
    ],
    [


        47.0700830,
        21.9734993
    ],
    [


        47.0701545,
        21.9734035
    ],
    [


        47.0700009,
        21.9734086
    ],
    [


        47.0696662,
        21.9722806
    ],
    [


        47.0697372,
        21.9721096
    ],
    [


        47.0699492,
        21.9719557
    ],
    [


        47.0702207,
        21.9720938
    ],
    [


        47.0705403,
        21.9719823
    ],
    [


        47.0710516,
        21.9713731
    ],
    [


        47.0648694,
        21.9695001
    ],
    [


        47.0708722,
        21.9823476
    ],
    [


        47.0475444,
        22.0016521
    ],
    [


        47.0502305,
        22.0048304
    ],
    [


        47.0510128,
        22.0064350
    ],
    [


        47.0509019,
        22.0076654
    ],
    [


        47.0500564,
        22.0098156
    ],
    [


        47.0512058,
        22.0108457
    ],
    [


        47.0513770,
        22.0123977
    ],
    [


        47.0550651,
        22.0116657
    ],
    [


        47.0555337,
        22.0136702
    ],
    [


        47.0553506,
        22.0141240
    ],
    [


        47.0541041,
        22.0153542
    ],
    [


        47.0536492,
        22.0160175
    ],
    [


        47.0545471,
        22.0186932
    ],
    [


        47.0711972,
        21.9988319
    ],
    [


        47.0710858,
        21.9984507
    ],
    [


        47.0712061,
        22.0067391
    ],
    [


        47.0711601,
        22.0054878
    ],
    [


        47.0700537,
        22.0133785
    ],
    [


        47.0704297,
        22.0121247
    ],
    [


        47.0705984,
        22.0107747
    ],
    [


        47.0706630,
        22.0080418
    ],
    [


        47.0708490,
        22.0073233
    ],
    [


        47.0711180,
        22.0198016
    ],
    [


        47.0710691,
        22.0189013
    ],
    [


        47.0701783,
        22.0170326
    ],
    [


        47.0701445,
        22.0166596
    ],
    [


        47.0695723,
        22.0148169
    ],
    [


        47.0695890,
        22.0144780
    ],
    [


        47.0713658,
        21.9704604
    ],
    [


        47.0719389,
        21.9698314
    ],
    [


        47.0727361,
        21.9702471
    ],
    [


        47.0735584,
        21.9695102
    ],
    [


        47.0751846,
        21.9685155
    ],
    [


        47.0755326,
        21.9681110
    ],
    [


        47.0757636,
        21.9676840
    ],
    [


        47.0735905,
        21.9804164
    ],
    [


        47.0726844,
        21.9747945
    ],
    [


        47.0719440,
        21.9795660
    ],
    [


        47.0714517,
        21.9771306
    ],
    [


        47.0721601,
        21.9827254
    ],
    [


        47.0725283,
        21.9938781
    ],
    [


        47.0726382,
        21.9934325
    ],
    [


        47.0727957,
        21.9904023
    ],
    [


        47.0730479,
        21.9893237
    ],
    [


        47.0730715,
        21.9885215
    ],
    [


        47.0713529,
        21.9999487
    ],
    [


        47.0715828,
        21.9998691
    ],
    [


        47.0714319,
        21.9987855
    ],
    [


        47.0714913,
        21.9964993
    ],
    [


        47.0720125,
        21.9948733
    ],
    [


        47.0716243,
        22.0031430
    ],
    [


        47.0715539,
        22.0031126
    ],
    [


        47.0716577,
        22.0015045
    ],
    [


        47.0712795,
        22.0048847
    ],
    [


        47.0712462,
        22.0200842
    ],
    [


        47.1009863,
        21.8427530
    ],
    [


        47.0984658,
        21.8480615
    ],
    [


        47.0985137,
        21.8476703
    ],
    [


        47.0993028,
        21.8478639
    ],
    [


        47.0994375,
        21.8468641
    ],
    [


        47.1003489,
        21.8470390
    ],
    [


        47.1006375,
        21.8443278
    ],
    [


        47.1035735,
        21.8433853
    ],
    [


        47.1044175,
        21.8441665
    ],
    [


        47.1057486,
        21.8447070
    ],
    [


        47.1080016,
        21.8452480
    ],
    [


        47.1089418,
        21.8457736
    ],
    [


        47.1139424,
        21.8471471
    ],
    [


        47.1189770,
        21.8493543
    ],
    [


        47.1223595,
        21.8470023
    ],
    [


        47.1141635,
        21.8562198
    ],
    [


        47.1145559,
        21.8558331
    ],
    [


        47.1169795,
        21.8522230
    ],
    [


        47.1171146,
        21.8522435
    ],
    [


        47.1127587,
        21.8565948
    ],
    [


        47.1128974,
        21.8569964
    ],
    [


        47.1181343,
        21.8514850
    ],
    [


        47.1216009,
        21.8525531
    ],
    [


        47.1316731,
        21.8496078
    ],
    [


        47.1332887,
        21.8469814
    ],
    [


        47.1334260,
        21.8473010
    ],
    [


        47.1400360,
        21.8525972
    ],
    [


        47.1394441,
        21.8537083
    ],
    [


        47.1400563,
        21.8535924
    ],
    [


        47.1400407,
        21.8527577
    ],
    [


        47.1358252,
        21.8884974
    ],
    [


        47.1359473,
        21.8886311
    ],
    [


        47.1361888,
        21.8872972
    ],
    [


        47.1360935,
        21.8871906
    ],
    [


        47.1385751,
        21.8633369
    ],
    [


        47.1421315,
        21.8744620
    ],
    [


        47.1406050,
        21.8748239
    ],
    [


        47.1371647,
        21.8818377
    ],
    [


        47.1375420,
        21.8820698
    ],
    [


        47.1383111,
        21.8816562
    ],
    [


        47.1415172,
        21.8764478
    ],
    [


        47.1400840,
        21.8828973
    ],
    [


        47.1270383,
        21.8999796
    ],
    [


        47.1275411,
        21.8993857
    ],
    [


        47.1280709,
        21.8990812
    ],
    [


        47.1286407,
        21.8989717
    ],
    [


        47.1289344,
        21.8992385
    ],
    [


        47.1290962,
        21.8990457
    ],
    [


        47.1294371,
        21.8977956
    ],
    [


        47.1298576,
        21.8977064
    ],
    [


        47.1301826,
        21.8972593
    ],
    [


        47.1301786,
        21.8963126
    ],
    [


        47.1305683,
        21.8952998
    ],
    [


        47.1312409,
        21.8944429
    ],
    [


        47.1314561,
        21.8937108
    ],
    [


        47.1332015,
        21.8921929
    ],
    [


        47.1355677,
        21.8895978
    ],
    [


        47.1306342,
        21.8969649
    ],
    [


        47.1305249,
        21.8959427
    ],
    [


        47.1270493,
        21.9067088
    ],
    [


        47.1274364,
        21.9063149
    ],
    [


        47.1286071,
        21.9059639
    ],
    [


        47.1248247,
        21.9114520
    ],
    [


        47.1259584,
        21.9087704
    ],
    [


        47.1097948,
        21.9280183
    ],
    [


        47.1100735,
        21.9279756
    ],
    [


        47.1101199,
        21.9281748
    ],
    [


        47.0982559,
        21.9348183
    ],
    [


        47.1006799,
        21.9347915
    ],
    [


        47.1009204,
        21.9346090
    ],
    [


        47.1019133,
        21.9346939
    ],
    [


        47.1020721,
        21.9334020
    ],
    [


        47.1027023,
        21.9311260
    ],
    [


        47.1026952,
        21.9302344
    ],
    [


        47.1033962,
        21.9301732
    ],
    [


        47.1033119,
        21.9289563
    ],
    [


        47.0975005,
        21.9395400
    ],
    [


        47.0979425,
        21.9386173
    ],
    [


        47.0980372,
        21.9377907
    ],
    [


        47.0980009,
        21.9368774
    ],
    [


        47.0989067,
        21.9349633
    ],
    [


        47.1080983,
        21.9284203
    ],
    [


        47.1085300,
        21.9285733
    ],
    [


        47.1088458,
        21.9291319
    ],
    [


        47.1089892,
        21.9289713
    ],
    [


        47.1099863,
        21.9287986
    ],
    [


        47.1128144,
        21.9279355
    ],
    [


        47.1164002,
        21.9261769
    ],
    [


        47.1164346,
        21.9261572
    ],
    [


        47.1159909,
        21.9241336
    ],
    [


        47.1180281,
        21.9185862
    ],
    [


        47.1185951,
        21.9182499
    ],
    [


        47.1198614,
        21.9179919
    ],
    [


        47.1201175,
        21.9170735
    ],
    [


        47.1223436,
        21.9178662
    ],
    [


        47.1225739,
        21.9178003
    ],
    [


        47.1182355,
        21.9230777
    ],
    [


        47.0543009,
        22.0222657
    ],
    [


        47.0565795,
        22.0238805
    ],
    [


        47.0569407,
        22.0259364
    ],
    [


        47.0590330,
        22.0234293
    ],
    [


        47.0597036,
        22.0247562
    ],
    [


        47.0606422,
        22.0258822
    ],
    [


        47.0609888,
        22.0272024
    ],
    [


        47.0621698,
        22.0286360
    ],
    [


        47.0627894,
        22.0292664
    ],
    [


        47.0643849,
        22.0299320
    ],
    [


        47.0663292,
        22.0313765
    ],
    [


        47.0665553,
        22.0322088
    ],
    [


        47.0678431,
        22.0318613
    ],
    [


        47.0681270,
        22.0322626
    ],
    [


        47.0684244,
        22.0322352
    ],
    [


        47.0687592,
        22.0318857
    ],
    [


        47.0686664,
        22.0317787
    ],
    [


        47.0689651,
        22.0312569
    ],
    [


        47.0688666,
        22.0310221
    ],
    [


        47.0690104,
        22.0306745
    ],
    [


        47.0692378,
        22.0309023
    ],
    [


        47.0695949,
        22.0305661
    ],
    [


        47.0700539,
        22.0296288
    ],
    [


        47.0710790,
        22.0300997
    ],
    [


        47.0731406,
        22.0262967
    ],
    [


        47.0732462,
        22.0252178
    ],
    [


        47.0729714,
        22.0236780
    ],
    [


        47.0722667,
        22.0223322
    ],
    [


        47.0715174,
        22.0218339
    ],
    [


        47.0726697,
        22.0296994
    ],
    [
        47.0726744,
        22.0286583
    ],
    [
        47.0728166,
        22.0275989
    ],
    [
        47.0728221,
        22.0309004
    ],
];

const test = [
    [47.0438282, 21.9116231],
    [47.0389723, 21.9129202],
    [47.0389524, 21.9130159],
    [47.0389558, 21.9130321],
    [47.0391649, 21.9140201],
    [47.0392117, 21.9140603],
    [47.0420916, 21.9166851],
    [47.0420642, 21.9210952],
    [47.0420514, 21.9224471],
    [47.0417319, 21.9235891],
    [47.0407725, 21.9267854],
    [47.0386517, 21.9347974],
    [47.0335918, 21.9328662],
    [47.0302864, 21.9266434],
    [47.0308746, 21.9244987],
    [47.0260740, 21.9210966],
    [47.0199889, 21.9196482],
    [47.0251086, 21.9360419],
    [47.0316612, 21.9390031],
    [47.0269224, 21.9444962],
    [47.0264836, 21.9468995],
    [47.0251768, 21.9551469],
    [47.0270008, 21.9643951],
    [47.0258828, 21.9651521],
    [47.0269298, 21.9696117],
    [47.0275319, 21.9693192],
    [47.0281554, 21.9709691],
    [47.0348102, 21.9671826],
    [47.0373648, 21.9656106],
    [47.0379498, 21.9673701],
    [47.0366921, 21.9688721],
    [47.0347617, 21.9742795],
    [47.0335333, 21.9817897],
    [47.0330360, 21.9909306],
    [47.0336253, 21.9937976],
    [47.0343958, 21.9992530],
    [47.0381746, 21.9978197],
    [47.0380062, 21.9959859],
    [47.0376166, 21.9918102],
    [47.0374233, 21.9897290],
    [47.0394706, 21.9815322],
    [47.0416056, 21.9755669],
    [47.0426906, 21.9749230],
    [47.0432405, 21.9744301],
    [47.0439458, 21.9743612],
    [47.0447060, 21.9745737],
    [47.0453873, 21.9749895],
    [47.0458910, 21.9757094],
    [47.0468113, 21.9773218],
    [47.0467621, 21.9774504],
    [47.0470251, 21.9779683],
    [47.0472401, 21.9781662],
    [47.0473942, 21.9783923],
    [47.0476411, 21.9786636],
    [47.0479089, 21.9788887],
    [47.0481417, 21.9827873],
    [47.0484486, 21.9885703],
    [47.0509341, 21.9880553],
    [47.0514019, 21.9841500],
    [47.0542966, 21.9800730],
    [47.0562263, 21.9696875],
    [47.0612037, 21.9617643],
    [47.0614360, 21.9619915],
    [47.0620240, 21.9636960],
    [47.0636448, 21.9670429],
    [47.0648694, 21.9695001],
    [47.0675400, 21.9732495],
    [47.0708722, 21.9823476],
    [47.0735905, 21.9804164],
    [47.0726844, 21.9747945],
    [47.0707845, 21.9704600],
    [47.0694399, 21.9647952],
    [47.0693815, 21.9582291],
    [47.0706384, 21.9553109],
    [47.0725675, 21.9522210],
    [47.0756656, 21.9494315],
    [47.0792311, 21.9490453],
    [47.0830887, 21.9502469],
    [47.0849589, 21.9469424],
    [47.0825334, 21.9434663],
    [47.0807800, 21.9396468],
    [47.0812768, 21.9363423],
    [47.0829718, 21.9348832],
    [47.0859232, 21.9353123],
    [47.0898971, 21.9323083],
    [47.0898679, 21.9241544],
    [47.0951563, 21.9180604],
    [47.0951855, 21.9138118],
    [47.0941337, 21.9093915],
    [47.0923186, 21.9084181],
    [47.0903594, 21.9073514],
    [47.0889474, 21.9065239],
    [47.0837900, 21.9200774],
    [47.0829426, 21.9181891],
    [47.0827672, 21.9163008],
    [47.0823289, 21.9147130],
    [47.0817736, 21.9132968],
    [47.0810430, 21.9120951],
    [47.0744965, 21.9057437],
    [47.0709891, 21.9027825],
    [47.0717783, 21.9008513],
    [47.0542381, 21.8864318],
    [47.0494023, 21.9008151],
    [47.0488287, 21.9026538],
    [47.0471448, 21.9129280],
    [47.0471175, 21.9130946],
    [47.0470157, 21.9135972],
    [47.0446470, 21.9128676],
    [47.0438282, 21.9116231]
]

const test2 = [
    [47.0705539, 21.9352186],
    [47.0706143, 21.9354112],
    [47.0704718, 21.9355200],
    [47.0704752, 21.9355485],
    [47.0702916, 21.9356841],
    [47.0702813, 21.9356556],
    [47.0701285, 21.9357560],
    [47.0701365, 21.9357795],
    [47.0700316, 21.9358515],
    [47.0700236, 21.9358364],
    [47.0698788, 21.9359302],
    [47.0698845, 21.9359620],
    [47.0696930, 21.9360892],
    [47.0696884, 21.9360691],
    [47.0695379, 21.9361746],
    [47.0694768, 21.9359588],
    [47.0696264, 21.9358616],
    [47.0696183, 21.9358316],
    [47.0696673, 21.9357944],
    [47.0696632, 21.9357644],
    [47.0697319, 21.9357176],
    [47.0697393, 21.9357404],
    [47.0698030, 21.9356972],
    [47.0698267, 21.9357860],
    [47.0699355, 21.9356996],
    [47.0699150, 21.9356203],
    [47.0700769, 21.9354979],
    [47.0701047, 21.9355963],
    [47.0702314, 21.9355039],
    [47.0702094, 21.9354223],
    [47.0702625, 21.9353875],
    [47.0702527, 21.9353479],
    [47.0703238, 21.9352963],
    [47.0703369, 21.9353323],
    [47.0703941, 21.9352926],
    [47.0704047, 21.9353347],
    [47.0705539, 21.9352186]
]

const testTm = [
    [45.7430701, 21.2794704],
    [45.7436685, 21.2804227],
    [45.7433207, 21.2808714],
    [45.7434401, 21.2810570],
    [45.7430687, 21.2815262],
    [45.7431954, 21.2817261],
    [45.7431663, 21.2817671],
    [45.7432061, 21.2818380],
    [45.7429658, 21.2821504],
    [45.7429428, 21.2821150],
    [45.7428958, 21.2821738],
    [45.7428336, 21.2822564],
    [45.7428552, 21.2822924],
    [45.7422792, 21.2830237],
    [45.7421105, 21.2827349],
    [45.7415723, 21.2833983],
    [45.7414036, 21.2833730],
    [45.7411203, 21.2829178],
    [45.7413189, 21.2826573],
    [45.7408877, 21.2819247],
    [45.7426414, 21.2797651],
    [45.7427321, 21.2799118],
    [45.7430701, 21.2794704]
]

export {
    getCurrentDate,
    convertUITypesToAPI,
    convertUIStatesToAPI,
    convertAPITypesToUI,
    convertAPIStatesToUI,
    cutFromDescription,
    getBackgroundColorForState,
    convertUISortDataToAPI,
    getChatMessageFormat,
    cityBoundary,
    cityBoundary2,
    test,
    test2,
    testTm
}