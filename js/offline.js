function warp(){



datenew=new Date(srvTime()).getTime() / 1000
dateold= bonus["savetime"]

warping=datenew-dateold

if (warping>604800){
warping=604800
}

for(var w=0;w<warping;w++){

	var production =new Array()
	for(key in items){
		production[key]=0;
	}
	var consumption =new Array()
	for(key in items){
		consumption[key]=0;
	}
//buildings
production["wood"]+=buildings["lumbermill"]/5;
production["mineral"]+=buildings["mine"]/5;
production["water"]+=buildings["fountain"]/2.5;
production["gold"]+=buildings["casino"]/250;
production["knowledge"]+=buildings["scienceoutpost"]/50;
production["gold"]+=buildings["tradeoutpost"]/100;
production["clay"]+=buildings["quarry"]/100;

if (items["water"]>=buildings["pasture"]/5 && buildstatus["pasture"]==1)
{
	consumption["water"]+=buildings["pasture"]/5
	production["food"]=buildings["pasture"]/5;
}
if (items["mineral"]>=buildings["foundry"]/2 && buildstatus["foundry"]==1)
{
	consumption["mineral"]+=buildings["foundry"]/2
	production["iron"]=buildings["foundry"]/50;
	if(technologies["bronze"]>0){
		production["tin"]=buildings["foundry"]/200;
	}
}
if (items["wood"]>=buildings["kiln"]*2 && buildstatus["kiln"]==1)
{
	consumption["wood"]+=buildings["kiln"]*2
	production["coal"]=buildings["kiln"]/100;

}
if (items["wood"]>=buildings["shipyard"]*2.5 && buildstatus["shipyard"]==1)
{
	consumption["wood"]+=buildings["shipyard"]*2.5
	craft["plank"]+=buildings["shipyard"]/20;
}
if (items["gold"]>=buildings["bank"]/10 && buildstatus["bank"]==1)
{
	consumption["gold"]+=buildings["bank"]/10
	craft["coin"]+=buildings["bank"]/50;
}
if(buildings["library"]>=8){
	production["knowledge"]+=buildings["library"]/100;
}
if (items["mineral"]>=buildings["crusher"]*10 && buildstatus["crusher"]==1)
{
	consumption["mineral"]+=buildings["crusher"]*10;
	production["sand"]=buildings["crusher"]/2;

}
if (items["wood"]>=buildings["blockyard"] && items["mineral"]>=buildings["blockyard"]*8 && buildstatus["blockyard"]==1)
{
	consumption["wood"]+=buildings["blockyard"]*4
	consumption["mineral"]+=buildings["blockyard"]*8
	craft["block"]+=buildings["blockyard"]/25;
}

if (items["wood"]>=buildings["carpentry"]*5 && items["iron"]>=buildings["carpentry"]*0.1 && buildstatus["carpentry"]==1)
{
	consumption["wood"]+=buildings["carpentry"]*5
	consumption["iron"]+=buildings["carpentry"]*0.1
	craft["structure"]+=buildings["carpentry"]/200;
}
//people
production["food"]+=people["farmer"]/2.5;

if (items["food"]>=people["woodcutter"]/10)
{
	consumption["food"]+=people["woodcutter"]/10
	production["wood"]+=people["woodcutter"]/1
}
if (items["food"]>=people["miner"]/10)
{
	consumption["food"]+=people["miner"]/10
	production["mineral"]+=people["miner"]/1
	if(technologies["multitasking"]==1){
		production["clay"]+=people["miner"]/20
	}
}

if (items["food"]>=people["sailor"]/5)
{
	consumption["food"]+=people["sailor"]/5
}

if (items["mineral"]>=people["smelter"]/5 && items["food"]>=people["smelter"]/40)
{
	consumption["mineral"]+=people["smelter"]/5
	consumption["food"]+=people["smelter"]/10
	production["copper"]+=people["smelter"]/100
	if(technologies["metallurgy"]>0){
		production["gold"]+=people["smelter"]/1000
	}
}
if (craft["coin"]>=people["scientist"]/100 && items["food"]>=people["scientist"]/10)
{
	craft["coin"]-=people["scientist"]/100
	consumption["food"]+=people["scientist"]/5
	production["knowledge"]+=people["scientist"]/50

	if(buildings["laboratory"]>=1 && buildstatus["laboratory"]==1){
		if(craft["bottle"]>=(buildings["laboratory"]*people["scientist"]*0.001)){
			craft["bottle"]-=(buildings["laboratory"]*people["scientist"]*0.001)
			maximums["water"]-=(buildings["laboratory"]*people["scientist"]*0.001)
			production["knowledge"]+=(buildings["laboratory"]*people["scientist"]*0.005)
			production["chemicals"]+=(buildings["laboratory"]*people["scientist"]*0.001)
		}

	}
}

if (items["iron"]>=people["foundryman"]/20 && items["food"]>=people["foundryman"]/10 && items["coal"]>=people["foundryman"]/50)
{
	consumption["iron"]+=people["foundryman"]/20
	consumption["coal"]+=people["foundryman"]/50
	consumption["food"]+=people["foundryman"]/10
	production["steel"]+=people["foundryman"]/100

}

if (items["food"]>=people["pikeman"]/10)
{
	consumption["food"]+=people["pikeman"]/10
	production["morale"]+=people["pikeman"]/50
}

if (items["food"]>=people["swordman"]/2.5)
{
	consumption["food"]+=people["swordman"]/2.5
	production["morale"]+=people["swordman"]/100
}

if (items["food"]>=people["knight"]*2)
{
	consumption["food"]+=people["knight"]*2
	production["morale"]+=people["knight"]/25
}

consumption["food"]+=people["medic"]/2.5

if (items["food"]>=people["bersek"]/1.25 && items["gold"]>=people["bersek"]/100)
{
	consumption["food"]+=people["bersek"]/1.25
	consumption["gold"]+=people["bersek"]/100
	production["morale"]+=people["bersek"]/6.25
}

if (items["food"]>=people["warelephant"]*10 && items["water"]>=people["warelephant"]*2)
{
	consumption["food"]+=people["warelephant"]*10;
	consumption["water"]+=people["warelephant"]*2;
	production["morale"]+=people["warelephant"]*50;
}

if (bonus["invest"]>=0.125)
{
	bonus["invest"]-=0.125
	craft["coin"]+=0.125
}

for(key in items){

	var result=(production[key]*(bonus[key]+bonus["global"]+1))-consumption[key]

	if((items[key]+result)<(maximums[key]*(bonus["storage"]+1))){
		items[key]+=(production[key]*(bonus[key]+bonus["global"]+1))-consumption[key];
	}
	else
	{
		items[key]=(maximums[key]*(bonus["storage"]+1))
	}

}

}

}