var i = 0;

var heatmap1Data = [
{location: new google.maps.LatLng(43.27489417454499, -70.90371519327164), weight: 5.05740309297372},
{location: new google.maps.LatLng(43.274141348334346, -70.90360254049301), weight: 4.89174604951673},
{location: new google.maps.LatLng(43.27215329556971, -70.90143665671349), weight: 4.06637144624523}
];
var heatmap2Data = [
{location: new google.maps.LatLng(43.273598448426135, -70.90350598096848), weight: 3.71087217866703},
{location: new google.maps.LatLng(43.271232480952506, -70.90272277593613), weight: 3.68321562349132},
{location: new google.maps.LatLng(43.27505918968139, -70.90394586324692), weight: 3.62477446138193},
{location: new google.maps.LatLng(43.2715439775944, -70.90225338935852), weight: 3.53519774019053},
{location: new google.maps.LatLng(43.27170119002773, -70.90187519788742), weight: 3.41761351167493},
{location: new google.maps.LatLng(43.27187402558826, -70.90173706412315), weight: 3.41653013765142},
{location: new google.maps.LatLng(43.27309167237876, -70.90296819806099), weight: 3.40298033296392},
{location: new google.maps.LatLng(43.27166701344632, -70.90174376964569), weight: 3.39641905366703},
{location: new google.maps.LatLng(43.27150687149499, -70.901979804039), weight: 3.38049650728033},
{location: new google.maps.LatLng(43.27152933045258, -70.90158954262733), weight: 3.35361052095223},
{location: new google.maps.LatLng(43.271133856291584, -70.90248942375183), weight: 3.28232145845223},
{location: new google.maps.LatLng(43.27208103702605, -70.90132400393486), weight: 3.27731657563973},
{location: new google.maps.LatLng(43.27102644311274, -70.90252161026001), weight: 3.20853758394053},
{location: new google.maps.LatLng(43.27136430574474, -70.90237408876419), weight: 3.18894529878422},
{location: new google.maps.LatLng(43.27185059028677, -70.90137228369713), weight: 3.17839384614753},
{location: new google.maps.LatLng(43.27195604907238, -70.90146213769913), weight: 3.12771940767102},
{location: new google.maps.LatLng(43.27201073133368, -70.90157613158226), weight: 3.12528563081553},
{location: new google.maps.LatLng(43.271439494572455, -70.90150773525238), weight: 3.11896086274912},
{location: new google.maps.LatLng(43.27201756661291, -70.9017987549305), weight: 3.11603117524912},
{location: new google.maps.LatLng(43.27178516668904, -70.90146884322166), weight: 3.09691191255382},
{location: new google.maps.LatLng(43.27140727080051, -70.90215817093849), weight: 3.01880217134283},
{location: new google.maps.LatLng(43.271642601590706, -70.9013682603836), weight: 3.00847197114753},
{location: new google.maps.LatLng(43.271373094054084, -70.90178534388542), weight: 2.95788908540533},
{location: new google.maps.LatLng(43.27158303662195, -70.90177059173584), weight: 2.91955900728033},
{location: new google.maps.LatLng(43.27105378466716, -70.90286359190941), weight: 2.90327787935063},
{location: new google.maps.LatLng(43.27210935457366, -70.90166866779327), weight: 2.87962675630382},
{location: new google.maps.LatLng(43.2710830791761, -70.90226277709007), weight: 2.77459288179203},
{location: new google.maps.LatLng(43.27082235755066, -70.90280592441559), weight: 2.73176909028813},
{location: new google.maps.LatLng(43.27537554880994, -70.9039431810379), weight: 2.71441221772953},
{location: new google.maps.LatLng(43.270938559461754, -70.90319216251373), weight: 2.70766020356943},
{location: new google.maps.LatLng(43.27379764248014, -70.90314120054245), weight: 2.70148802339362},
{location: new google.maps.LatLng(43.27124810464648, -70.90210050344467), weight: 2.64451933442882},
{location: new google.maps.LatLng(43.27079403940424, -70.90303659439087), weight: 2.63624144136243},
{location: new google.maps.LatLng(43.27228804775974, -70.90135753154755), weight: 2.54246092378422},
{location: new google.maps.LatLng(43.272306600574126, -70.90221181511879), weight: 2.42225981294443},
{location: new google.maps.LatLng(43.2722138364456, -70.9016740322113), weight: 2.40957212983892},
{location: new google.maps.LatLng(43.27288661728751, -70.90285956859589), weight: 2.35462523042493},
{location: new google.maps.LatLng(43.272450140578535, -70.90225875377655), weight: 2.33433867036632},
{location: new google.maps.LatLng(43.27233394155344, -70.90159088373184), weight: 2.32212400972172},
{location: new google.maps.LatLng(43.27229683593567, -70.9015466272831), weight: 2.25458860933112},
{location: new google.maps.LatLng(43.27235054142777, -70.9014581143856), weight: 2.24908781587412},
{location: new google.maps.LatLng(43.270876064343845, -70.90342819690704), weight: 2.23085356294443},
{location: new google.maps.LatLng(43.27276358390115, -70.90263828635216), weight: 2.21301603853033},
{location: new google.maps.LatLng(43.27076572124464, -70.90320959687233), weight: 2.14771605073743},
{location: new google.maps.LatLng(43.27169923708072, -70.90166866779327), weight: 2.14035368501473},
{location: new google.maps.LatLng(43.2758715653673, -70.90456277132034), weight: 2.09912443696783}
];
var heatmap3Data = [
{location: new google.maps.LatLng(43.27253509266656, -70.90222522616386), weight: 1.71533537446783},
{location: new google.maps.LatLng(43.27569581193149, -70.90427577495575), weight: 1.65624571382332},
{location: new google.maps.LatLng(43.272622974012165, -70.90232044458389), weight: 1.61572599946783},
{location: new google.maps.LatLng(43.27591648005276, -70.90477332472801), weight: 1.33206511079602},
{location: new google.maps.LatLng(43.27222457756247, -70.90210318565369), weight: 1.18525267183112},
{location: new google.maps.LatLng(43.27077939208197, -70.90343222022057), weight: 1.12221098481943},
{location: new google.maps.LatLng(43.27599947449307, -70.90492486953735), weight: 0.479159837358523},
{location: new google.maps.LatLng(43.270677837217214, -70.90340539813042), weight: 0.190333848588921}
];
var heatmap4Data = [
{location: new google.maps.LatLng(43.2709297710897, -70.90370982885361), weight: 0.090328688032173},
{location: new google.maps.LatLng(43.27078232154669, -70.90364411473274), weight: 1.02310609281727},
{location: new google.maps.LatLng(43.26760474592673, -70.90379029512405), weight: 1.12176179350088},
{location: new google.maps.LatLng(43.26772778974185, -70.90348049998283), weight: 1.85438203275868}
];
var heatmap5Data = [
{location: new google.maps.LatLng(43.26753345852323, -70.90336248278618), weight: 2.23910188139148},
{location: new google.maps.LatLng(43.270846769735265, -70.9040142595768), weight: 2.66553925932118},
{location: new google.maps.LatLng(43.27069248456394, -70.90388685464859), weight: 2.68772553861807},
{location: new google.maps.LatLng(43.27070127297027, -70.90389356017113), weight: 2.69302796781727},
{location: new google.maps.LatLng(43.268010008346536, -70.90368166565895), weight: 2.80048036039547},
{location: new google.maps.LatLng(43.27033411180223, -70.90408265590668), weight: 2.94965028227047},
{location: new google.maps.LatLng(43.271021560691004, -70.90415373444557), weight: 3.34141206205557},
{location: new google.maps.LatLng(43.27088778218335, -70.90411752462387), weight: 3.72456025541497}
];
var heatmap6Data = [
{location: new google.maps.LatLng(43.27055675234931, -70.90418323874474), weight: 4.01707887113757},
{location: new google.maps.LatLng(43.26851389713428, -70.9037446975708), weight: 4.41785859525868},
{location: new google.maps.LatLng(43.268957237695545, -70.90443268418312), weight: 4.89034699857898},
{location: new google.maps.LatLng(43.2688117364136, -70.90402498841286), weight: 4.93292664945797},
{location: new google.maps.LatLng(43.27026185109874, -70.90424358844757), weight: 5.03677033842277},
{location: new google.maps.LatLng(43.27037707758528, -70.90420871973038), weight: 5.09600495756338},
{location: new google.maps.LatLng(43.26915547042602, -70.90438038110733), weight: 5.69349336088368},
{location: new google.maps.LatLng(43.2693312427504, -70.9045547246933), weight: 6.08292054594227},
{location: new google.maps.LatLng(43.26946697769801, -70.90480014681816), weight: 6.24645661771967},
{location: new google.maps.LatLng(43.26951287361902, -70.9046258032322), weight: 6.66131257475088},
{location: new google.maps.LatLng(43.270795015892254, -70.90429723262787), weight: 6.74749421537588},
{location: new google.maps.LatLng(43.270178848833424, -70.90440452098846), weight: 6.77943086088368},
{location: new google.maps.LatLng(43.26961150090664, -70.90450510382652), weight: 6.90510224760247},
{location: new google.maps.LatLng(43.269752117753214, -70.90492621064186), weight: 7.14048432768057},
{location: new google.maps.LatLng(43.26967497382899, -70.90474784374237), weight: 7.38982057035638},
{location: new google.maps.LatLng(43.269619312962206, -70.90469554066658), weight: 7.49898957670398},
{location: new google.maps.LatLng(43.26999526695053, -70.90519845485687), weight: 8.13425111234858},
{location: new google.maps.LatLng(43.26999526695053, -70.90487122535706), weight: 8.26992463529777},
{location: new google.maps.LatLng(43.26988199274653, -70.90506434440613), weight: 8.42281007230947},
{location: new google.maps.LatLng(43.27013588291049, -70.90537548065186), weight: 8.71786164701648}
];

var heatmap1 = new google.maps.visualization.HeatmapLayer({
    id: 'heatmap1',
    data: heatmap1Data
});
var heatmap2 = new google.maps.visualization.HeatmapLayer({
    data: heatmap2Data
});
var heatmap3 = new google.maps.visualization.HeatmapLayer({
    data: heatmap3Data
});
var heatmap4 = new google.maps.visualization.HeatmapLayer({
    data: heatmap4Data
});
var heatmap5 = new google.maps.visualization.HeatmapLayer({
    data: heatmap5Data
});
var heatmap6 = new google.maps.visualization.HeatmapLayer({
    data: heatmap6Data
});

var coolBlue = 'rgba(17, 0, 255, ';
var midBlue = 'rgba(0, 98, 255, ';
var lightBlue = 'rgba(0, 246, 255, ';
var coolGreen = 'rgba(0, 255, 106, ';
var midGreen = 'rgba(34, 255, 0, ';
var lightGreen = 'rgba(255, 251, 0, ';
var coolRed = 'rgba(255, 119, 0, ';
var midRed = 'rgba(255, 0, 0, ';
var lightRed = 'rgba(255, 0, 102, ';
    
var dissipate = true;
var myzoom = gMap.getZoom();
var myrad;
var myopac;

if (myzoom == 20){
    myrad = 200;
    myopac = 0.4;
}

function createHeatmap1(rad, opac){
        
        var colorInner = coolBlue + '0.6)';
        var colorMid = midBlue + '0.4)';
        var colorOuter = lightBlue + '0.1)';
        var colorEnd = lightBlue + '0)';
        
        var heatOpts = {
        dissipating: dissipate,
        radius: rad,
        opacity: opac,
        gradient: [colorEnd, colorOuter, colorMid, colorInner]
    };
    heatmap1.setOptions(heatOpts);

    return heatmap1;
}
function createHeatmap2(rad, opac){
    
        var colorInner = midBlue + '0.6)';
        var colorMid = lightBlue + '0.4)';
        var colorOuter = coolGreen + '0.1)';
        var colorEnd = coolGreen + '0)';
    
        var heatOpts = {
        dissipating: dissipate,
        radius: rad,
        opacity: opac,
        gradient: [colorEnd, colorOuter, colorMid, colorInner]
    };
    heatmap2.setOptions(heatOpts);
    return heatmap2;
}
function createHeatmap3(rad, opac){
    
        var colorInner = lightBlue + '0.6)';
        var colorMid = coolGreen + '0.4)';
        var colorOuter = midGreen + '0.1)';
        var colorEnd = midGreen + '0)';
    
        var heatOpts = {
        dissipating: dissipate,
        radius: rad,
        opacity: opac,
        gradient: [colorEnd, colorOuter, colorMid, colorInner]
    };
    heatmap3.setOptions(heatOpts);
    return heatmap3;
}
function createHeatmap4(rad, opac){
    
        var colorInner = midGreen + '0.6)';
        var colorMid = lightGreen + '0.4)';
        var colorOuter = coolRed + '0.1)';
        var colorEnd = coolRed + '0)';
    
        var heatOpts = {
        dissipating: dissipate,
        radius: rad,
        opacity: opac,
        gradient: [colorEnd, colorOuter, colorMid, colorInner]
    };
    heatmap4.setOptions(heatOpts);
    return heatmap4;
}
function createHeatmap5(rad, opac){
    
        var colorInner = lightGreen + '0.6)';
        var colorMid = coolRed + '0.4)';
        var colorOuter = midRed + '0.1)';
        var colorEnd = midRed + '0)';
    
        var heatOpts = {
        dissipating: dissipate,
        radius: rad,
        opacity: opac,
        gradient: [colorEnd, colorOuter, colorMid, colorInner]
    };
    heatmap5.setOptions(heatOpts);
    return heatmap5;
}
function createHeatmap6(rad, opac){
    
        var colorInner = coolRed + '0.6)';
        var colorMid = midRed + '0.4)';
        var colorOuter = lightRed + '0.1)';
        var colorEnd = lightRed + '0)';
    
        var heatOpts = {
        dissipating: dissipate,
        radius: rad,
        opacity: opac,
        gradient: [colorEnd, colorOuter, colorMid, colorInner]
    };
    heatmap6.setOptions(heatOpts);
    return heatmap6;
}

var hm1 = createHeatmap1(myrad, myopac);
    hm1.setMap(gMap);
var hm2 = createHeatmap2(myrad, myopac);
    hm2.setMap(gMap);
var hm3 = createHeatmap3(myrad, myopac);
    hm3.setMap(gMap);
var hm4 = createHeatmap4(myrad, myopac);
    hm4.setMap(gMap);
var hm5 = createHeatmap5(myrad, myopac);
    hm5.setMap(gMap);
var hm6 = createHeatmap6(myrad, myopac);
    hm6.setMap(gMap);

google.maps.event.addListener(gMap, 'zoom_changed', function(){

    var testBool = false;
    i++;
    console.log(i);
    myzoom = gMap.getZoom();

    if(testBool == true){
        myrad = 200;
        myopac = 0.4;
    } else {
        if(myzoom == 20){
            myrad = 200;
            myopac = 0.3;
        } else if(myzoom == 19){
            myrad = 100;
            myopac = 0.25;
        } else if(myzoom == 18){
            myrad = 50;
            myopac = 0.15;
        } else if(myzoom == 17){
            myrad = 25;
            myopac = 0.15;
        } else if(myzoom == 16){
            myrad = 5;
            myopac = 0.15;
        } else if(myzoom == 15){
            myrad = 1;
            myopac = 0.15;
        } else {
            myrad = 5;
            myopac = 0.05;
        }
    }
    
if(i == 1){    
    hm1 = createHeatmap1(myrad, myopac);
    hm1.setMap(gMap);
    hm2 = createHeatmap2(myrad, myopac);
    hm2.setMap(gMap);
    hm3 = createHeatmap3(myrad, myopac);
    hm3.setMap(gMap);
    hm4 = createHeatmap4(myrad, myopac);
    hm4.setMap(gMap);
    hm5 = createHeatmap5(myrad, myopac);
    hm5.setMap(gMap);
    hm6 = createHeatmap6(myrad, myopac);
    hm6.setMap(gMap);
} else {
    hm1.setMap(null);
    hm1.radius = myrad;
    hm1.opacity = myopac;
    hm1.setMap(gMap);
    hm2.radius = myrad;
    hm2.opacity = myopac;
    hm3.radius = myrad;
    hm3.opacity = myopac;
    hm4.radius = myrad;
    hm4.opacity = myopac;
    hm5.radius = myrad;
    hm5.opacity = myopac;
    hm6.radius = myrad;
    hm6.opacity = myopac;
}

});