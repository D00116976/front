import { Component, OnInit, Input } from '@angular/core';
import {UserService} from '../../service/user.service';
import {Response} from '@angular/http';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import {
    Currency,
    CurrencyConverter,
    CurrencyMap,
    Project,
    ProjectLines,
    ProjectPriority,
    ProjectStatusLog,
    Status,
    SupportedLanguage,
    User,
    UserType,
    UserWrapper
} from '../../domain';
import {showLoading, hideLoading, doNothing} from '../../commons'

@Component({
  selector: 'app-project-creation-edit',
  templateUrl: './project-creation-edit.component.html',
  styleUrls: ['./project-creation-edit.component.css']
})
export class ProjectCreationEditComponent implements OnInit {

  //Variables
  @Input('projectId') id:number;
  user: User = new User();
	currentProject : Project = new Project();
	users : Array<User> = [];
	allStatus: Array<Status> = [];
	currencyArray: Array<Currency> = [];
	languages: Array<SupportedLanguage> = [];
  originalMaps: CurrencyConverter = new CurrencyConverter();
   editable : boolean;

  constructor(private userService : UserService) { }

  ngOnInit() 
  {
     this.initUsers();
      this.initStatus();
      this.initSupportedLanguages();
    console.log(this.id);
      //create function create project
      let project:Project = new Project();
      project.id = this.id; 
      
    
      project.status = this.allStatus[2];

      let currency:Array<Currency> = new Array<Currency>();
      currency.push({id: 1, code: "EUR", symbol: "", description: "Euro Converter"},
                    {id: 2, code: "STD", symbol: "", description: "English Sterling"},
                    {id: 3, code: "USD", symbol: "", description: "Us Doller"})
      this.currencyArray=currency;
      
      //Currency Converter
      project.currencyConverter = new CurrencyConverter();
      project.currencyConverter.id=1;
      project.currencyConverter.description="Converter!";
      project.currency = new Array<Currency>();
      project.currency[0] = currency[0];

      project.currencyConverter.currencyMaps = new Array<CurrencyMap>();
      project.currencyConverter.currencyMaps.push({id : 1, currencyTo: project.currency[0], currencyFrom: project.currency[0], 
                                                    inUse: true, rate: 1, isInverse:true, editable:true});

      project.projectCode = 20170302;
      project.title = "Brandt MIS Update";
      project.description = "Update Brandt MIS frontend & backend";
      project.createdOn = new Date;
      project.lastUpdated = new Date;

      project.allowExpenses = true;
      

      project.languages = [];
      project.languages.push(this.languages[0]);
      project.languages.push(this.languages[1]);

      this.originalMaps = project.currencyConverter;


      this.currentProject = project;
      setTimeout(()=>{
      this.currentProject.owner = this.users[1];
      this.currentProject.createdBy = this.users[2];
      this.currentProject.customer = this.users[3];
      this.currentProject.customerContact = this.users[2];
     },10);
  }

  debug(){
    console.log(this.currentProject);
  }
  ngOnChanges()
  {
      //

  }

  // toggleEditable(bool : boolean)
  // {
  //     console.log(bool);
  //     if(bool)
  //         this.editable = true; 
  //     else
  //         this.editable = false;   
  // }

  initUsers()
	{
		let observable: Rx.Observable<Array<User>> = this.userService.getAllUser();
        observable.subscribe(user => this.users = user);
	}

	initStatus()
	{
		this.allStatus.push({id: 1, name: "Status 1"},
							{id: 2, name: "Status 2"},
							{id: 3, name: "Active"},
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
			for(let m of this.currentProject.currencyConverter.currencyMaps)
			{
				if(map.currencyTo == m.currencyFrom && map.currencyFrom == m.currencyTo)
					m.rate = 1/map.rate;
			}
		}
	}

	currencyMapping(currencies)
	{
		this.currentProject.currencyConverter.currencyMaps = [];
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

						this.currentProject.currencyConverter.currencyMaps.push(currencyMap);
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

						this.currentProject.currencyConverter.currencyMaps.push(currencyMap);
					}
			}
		}
	}
}
