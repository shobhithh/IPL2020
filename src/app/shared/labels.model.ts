export interface Labels {
    labels: [];
}


export interface PlayerDTO {
    name: string;
    role: string;
    label: string;
    price: number;
}

export interface AmountByRolename {
    rolename: string;
    amount: number;
}

export interface TeamStat {
    label: string;
    team: string;
    city: string;
    coach: string;
    home: string;
}

export interface TeamAmountDTO {
    teamName: string;
    amount: string;
}

export interface RoleCountDTO {
    count: number;
    roleName: string;
}

export interface MaxAmountPlayerByRoleDTO {
    amount: string;
    players: {
        label: string;
        name: string;
        price: string;
        role: string;
    };
    role: string;
}
