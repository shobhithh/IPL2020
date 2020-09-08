export interface labels{
    labels:[]
}


 export interface PlayerDTO{
    name:string;
    role:string;
    label:string;
    price:number;
}

export interface amountByRolename{
    rolename:string;
    amount:number
}

export interface teamstat{
    label:string;
    team:string;
    city:string;
    coach:string;
    home:string;
}

export interface TeamAmountDTO{
    teamName:string;
    amount:string
}

export interface RoleCountDTO{
    count:number;
    roleName:string;
}