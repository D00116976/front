
import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {Response} from '@angular/http';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import {Project, Status, Currency, CurrencyConverter, CurrencyMap, ProjectPriority, ProjectLines, ProjectStatusLog, User, SupportedLanguage} from '../../domain';
@Component({
  selector: 'app-project-creation-add',
  templateUrl: './project-creation-add.component.html',
  styleUrls: ['./project-creation-add.component.css']
})
export class ProjectCreationAddComponent implements OnInit {

	//Variables
	newProject : Project = new Project();
	users : Array<User> = [];
	allStatus: Array<Status> = [];
	currencyArray: Array<Currency> = [];
	languages: Array<SupportedLanguage> = [];

  	constructor(private userService : UserService) { }

  	ngOnInit() 
	{
		let c = new CurrencyConverter();
		c.id=1;
		c.description="Test";
		c.currencyMaps = [];
		this.newProject.currencyConverter = c;
		this.newProject.currency = new Array<Currency>();
		this.newProject.languages = new Array<SupportedLanguage>();
		this.initUsers();
		this.initStatus();
		this.initCurrency();
		this.initSupportedLanguages();
  	}

  	add(){
		
		// this.newProject.createdOn = new Date;
  		console.log("Added Project");
  	}

	debug()
	{
		console.log(this.newProject);
	}
	initUsers()
	{
		let observable: Rx.Observable<Array<User>> = this.userService.getAllUser();
        observable.subscribe(user => this.users = user);
	}

	initStatus()
	{
		this.allStatus.push({id: 1, name: "Status 1"},
							{id: 2, name: "Status 2"},
							{id: 3, name: "Status 3"},
							{id: 4, name: "Status 4"},
							{id: 5, name: "Status 5"})	
	}

	initSupportedLanguages()
	{
		this.languages.push({id: 1, languageCode: "zh", countryCode: "CN", displayValue: "zh_CN",  isStillSupported: true},
							{id: 1, languageCode: "de", countryCode: "DE", displayValue: "de_DE",  isStillSupported: true},
							{id: 1, languageCode: "en", countryCode: "EN", displayValue: "en_EN",  isStillSupported: true},
							{id: 1, languageCode: "fr", countryCode: "FR", displayValue: "fr_FR",  isStillSupported: true},
							{id: 1, languageCode: "it", countryCode: "IT", displayValue: "it_IT",  isStillSupported: false},
							{id: 1, languageCode: "es", countryCode: "ES", displayValue: "es_ES",  isStillSupported: true},
							{id: 1, languageCode: "nl", countryCode: "NL", displayValue: "nl_NL",  isStillSupported: true})
	}

	initCurrency()
	{
		this.currencyArray.push({id: 1, code: "EUR", symbol: "", description: "Euro Converter"},
							{id: 2, code: "STD", symbol: "", description: "English Sterling"},
							{id: 3, code: "USD", symbol: "", description: "Us Doller"})
	}

	calcuateRate(map : CurrencyMap){
		console.log(map);
		if(map.rate!=null && map.rate != 0)
		{
			for(let m of this.newProject.currencyConverter.currencyMaps)
			{
				if(map.currencyTo == m.currencyFrom && map.currencyFrom == m.currencyTo)
					m.rate = 1/map.rate;
			}
		}
	}

	currencyMapping(currencies)
	{
		this.newProject.currencyConverter.currencyMaps = [];
		console.log("currencyMapping() called");
		let usedCurrencies : Array<Currency> = [];
		let notEditable :boolean = false;
		for(let cur1 of currencies)
		{
			usedCurrencies.push(cur1);
			for(let cur2 of currencies)
			{

					if(cur1.id == cur2.id)
					{
						let currencyMap : CurrencyMap = new CurrencyMap();
						currencyMap.currencyTo = cur1;
						currencyMap.currencyFrom = cur2;
						currencyMap.rate = 1; //not editable
						currencyMap.inUse = false;
						currencyMap.isInverse = false;

						this.newProject.currencyConverter.currencyMaps.push(currencyMap);
					}
					else
					{
						let currencyMap : CurrencyMap = new CurrencyMap();
						currencyMap.currencyTo = cur1;
						currencyMap.currencyFrom = cur2;
						for(let used of usedCurrencies)
						{
							if(cur2.id == used.id)
								notEditable = true;
						}
						if(!notEditable){
							currencyMap.rate = 0; //User Editable
							currencyMap.editable = true;
						}
							
						else{
							currencyMap.rate=0; // calculate
							currencyMap.editable = false;
						}
							
						notEditable=false;
						currencyMap.inUse = false;
						currencyMap.isInverse = false;

						this.newProject.currencyConverter.currencyMaps.push(currencyMap);
					}
			}
		}
	}
							
}
