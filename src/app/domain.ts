//Database objects
export class User {
    id      : number;
    userType: UserType;
    name    : string;
    comment : string;
    active  :boolean;
}

export class AuthenticatedUser {
    id       : number;
    username : string;
    password : string;
}

export class UserType {
    id          : number;
    description : string;
}

export class Company {
    id       : number;
    userId   : number;
    name     : string;
    vatNumber: string;
    departmentIds: Array<number>;
}

export class Department {
    id        : number;
    name      : string;
    company   : Company;
}
export class PersonEntity {
    id           : number;
    userId       : number;
    forename     : string;
    givenName    : string;
    jobTitle     : string;
    webSite      : string;
    isTranslator :boolean;
    department   : Department;
}
//end database objects
//wrapper object
export class Person {

    id 			    : number;
    forename 	    : string;
    familyName	    : string;
    jobTitle	    : string;
    company		    : string;
    department	    : string;
    companyVatNumber: string;
    userType	    : string;
    userComment     : string;
    userName	    : string;
    userPassword	: string;
    passwordConfirm : string;
    isTranslator    :boolean;
    isCompany       :boolean;
    changed		    :boolean;
}
//end wrapper object

export class UserWrapper {
    user       : User;
    authUser   : AuthenticatedUser;
    person     ?: PersonEntity;
    company    ?: Company;
    isCompany  : boolean;
    changed    : boolean = false;
}


//temp database objects, to be completed
export class Phone {

    id             : number;
    countryCode    : string;
    areaCode       : string;
    localNumber    : string;
    type           : PhoneType;
    userId         : number;
    comment        : string;
    changed        :boolean = false;
}

export class PhoneType {
    id             : number;
    description    : string;
}


export class Role {
    id                   : number;
    systemAccess         : boolean;
    ROLE_BRANDT_ENG      : boolean;
    ROLE_BRANDT_PM       : boolean;
    ROLE_BRANDT_ADMIN    : boolean;
    ROLE_CLIENT          : boolean;
    ROLE_SUPPLIER        : boolean;

}

export class Language {
    id      : number;
    code    : string;
}

export class Category {
    id              : number;
    description     : string;
    task            : Array<Task>
}

export class Task {
    id             : number;
    description    : string;
}

export class SupportedLanguage {
    id               : number;
    languageCode     : string;
    countryCode      : string;
    displayValue     : string;
    isStillSupported : boolean;
}

export class Project {
    id                : number;
    owner             : User;
    createdBy         : User;
    customer          : User;
    customerContact   : User;
    status            : Status;
    currency          : Array<Currency>;
    currencyConverter : CurrencyConverter;
    projectCode       : number;
    title             : string;
    description       : string;
    createdOn         : Date;
    lastUpdated       : Date;
    comment           : string;
    dollarExRate      : number;
    allowExpenses     : boolean;
    languages         : Array<SupportedLanguage>;
    path              : string; 
    modules           : Array<Module>;
}

export class Module {
    id  : number;
    projectId : number;
    customerTeam : CustomerProjectTeam;
    description : string;
}

export class CustomerProjectTeamMember {
    id : number;
    language : SupportedLanguage;
    user : User;
    category : Category;
    isDefault : boolean;
}

export class CustomerProjectTeam
{
    id : number;
    projectId : number;
    name : string;
    members : Array<CustomerProjectTeamMember>;
}
export class Status {
    id : number;
    name : string;
}

export class Currency {
    id          : number;
    code        : string;
    symbol      : string;
    description : string;
}

export class CurrencyConverter {
    id : number;
    description : string;
    currencyMaps : Array<CurrencyMap>;
}

export class CurrencyMap {
    id : number;
    currencyTo : Currency;
    currencyFrom : Currency;
    inUse : boolean;
    rate : number;
    isInverse : boolean;
    editable : boolean;
}

export class ProjectPriority {
    id : number;
    name : string;
}


export class ProjectStatusLog {
    id : number;
    user : User;
    project : Project;
    status : Status;
    updateDate : Date;
}